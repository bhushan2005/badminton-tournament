SmashMaster v1.8 - Shared Doubles Badminton Tournament Manager

Files (fixed names):
- badminton_doubles_tournament_manager.html
- server.js
- README.txt
- tournament_sessions.json (created automatically when shared sessions are used)
- access.log (created automatically by the server when the application is accessed)

Run locally:
1. Keep the HTML file and server.js in the same folder.
2. Install Node.js if needed.
3. Open a terminal in that folder.
4. Run: node server.js
5. Open: http://localhost:8080/

For use by other devices on the same network, open the host computer's LAN IP with port 8080, for example http://192.168.1.10:8080/.

v1.8 changes:
- Duplicate player names are rejected for both normal and late-player additions. Name matching ignores case and repeated/leading/trailing spaces.
- Reset Tournament moved to the last tab (Export & History) and protected by a stronger confirmation prompt.
- A badminton-themed animation plays for 3 seconds the first time the app is opened in a browser. It is skipped on later loads in that browser.
- The application code is kept in the HTML because browser-side JavaScript must be delivered to the browser to run. The client code is minified/obfuscated where practical, but this is deterrence, not true source-code protection. Anyone receiving the application can still inspect downloaded browser code.
- server.js now records application/API access in access.log with UTC timestamp, IP address, HTTP method, path and user-agent. This identifies the connecting device/network address, not a verified person.

Important:
- access.log is a normal text file in the same server folder.
- The server does not provide user authentication, so the log cannot prove which individual was using a device.
- Shared sessions remain accessible to anyone who has the session link.
