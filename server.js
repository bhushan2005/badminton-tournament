const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = Number(process.env.PORT || 8080);
const HOST = process.env.HOST || '0.0.0.0';
const APP_FILE = path.join(__dirname, 'badminton_doubles_tournament_manager.html');
const DATA_FILE = path.join(__dirname, 'tournament_sessions.json');
const ACCESS_LOG_FILE = path.join(__dirname, 'access.log');
const sessions = new Map();
const subscribers = new Map();

function logAccess(req, parsed) {
  const forwarded = req.headers['x-forwarded-for'];
  const ip = (forwarded ? String(forwarded).split(',')[0].trim() : (req.socket.remoteAddress || 'unknown'));
  const timestamp = new Date().toISOString();
  const userAgent = String(req.headers['user-agent'] || 'unknown').replace(/[\r\n]+/g, ' ').slice(0, 300);
  const line = `${timestamp}\tIP=${ip}\tMETHOD=${req.method}\tPATH=${parsed.pathname}\tUA=${userAgent}\n`;
  fs.appendFile(ACCESS_LOG_FILE, line, err => { if (err) console.error('Could not write access.log:', err.message); });
}

try {
  if (fs.existsSync(DATA_FILE)) {
    const saved = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    Object.entries(saved).forEach(([id, value]) => sessions.set(id, value));
  }
} catch (err) {
  console.error('Could not load tournament_sessions.json:', err.message);
}

function validSessionId(id) {
  return /^[A-Za-z0-9_-]{4,64}$/.test(id);
}

function saveSessions() {
  const tmp = DATA_FILE + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(Object.fromEntries(sessions), null, 2));
  fs.renameSync(tmp, DATA_FILE);
}

function sendJson(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'Access-Control-Allow-Origin': '*'
  });
  res.end(body);
}

function broadcast(sessionId, payload) {
  const clients = subscribers.get(sessionId) || new Set();
  const message = `data: ${JSON.stringify(payload)}\n\n`;
  for (const res of clients) {
    try { res.write(message); } catch (_) { clients.delete(res); }
  }
}

function serveApp(res) {
  fs.readFile(APP_FILE, (err, data) => {
    if (err) {
      res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
      return res.end('Application file not found.');
    }
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store'
    });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true);
  const pathname = parsed.pathname || '/';

  logAccess(req, parsed);

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return res.end();
  }

  if (pathname === '/' || pathname === '/badminton_doubles_tournament_manager.html') {
    return serveApp(res);
  }

  const match = pathname.match(/^\/api\/session\/([^/]+)(\/events)?$/);
  if (!match) {
    res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
    return res.end('Not found');
  }

  const sessionId = decodeURIComponent(match[1]);
  const events = Boolean(match[2]);
  if (!validSessionId(sessionId)) return sendJson(res, 400, {error: 'Invalid session ID'});

  if (events && req.method === 'GET') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    });
    res.write(': connected\n\n');
    if (!subscribers.has(sessionId)) subscribers.set(sessionId, new Set());
    subscribers.get(sessionId).add(res);
    const heartbeat = setInterval(() => {
      try { res.write(': heartbeat\n\n'); } catch (_) {}
    }, 20000);
    req.on('close', () => {
      clearInterval(heartbeat);
      subscribers.get(sessionId)?.delete(res);
    });
    return;
  }

  if (pathname.startsWith('/api/session/') && req.method === 'GET') {
    const record = sessions.get(sessionId);
    return sendJson(res, 200, record || {state: null, revision: 0});
  }

  if (pathname.startsWith('/api/session/') && req.method === 'PUT') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 10 * 1024 * 1024) req.destroy();
    });
    req.on('end', () => {
      try {
        const input = JSON.parse(body);
        if (!input || !input.state) return sendJson(res, 400, {error: 'Missing state'});
        const current = sessions.get(sessionId);
        const suppliedRevision = Number(input.revision || 0);
        const currentRevision = current ? Number(current.revision || 0) : 0;
        if (current && suppliedRevision !== currentRevision) {
          return sendJson(res, 409, {error: 'Revision conflict', state: current.state, revision: currentRevision});
        }
        const next = {state: input.state, revision: currentRevision + 1, updatedAt: new Date().toISOString()};
        sessions.set(sessionId, next);
        saveSessions();
        broadcast(sessionId, next);
        return sendJson(res, 200, next);
      } catch (err) {
        return sendJson(res, 400, {error: 'Invalid JSON'});
      }
    });
    return;
  }

  res.writeHead(405, {'Content-Type': 'text/plain; charset=utf-8'});
  res.end('Method not allowed');
});

server.listen(PORT, HOST, () => {
  console.log(`SmashMaster v1.5 shared server running on http://localhost:${PORT}`);
  console.log(`For other devices on the same network, use this computer's LAN IP with port ${PORT}.`);
});
