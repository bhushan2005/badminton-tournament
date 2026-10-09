# SmashMaster activation setup (Render + Node.js)

## What this version does
- Each browser creates a persistent local activation-device ID.
- The first 3 tournament schedules are free for that browser.
- From tournament 4 onward, the app displays an activation screen.
- An activation code is single-use. Redeeming it unlocks that browser for 12 hours.
- The server keeps the usage count, activation expiry, and unused/redeemed codes in `activation_data.json`.
- The page checks activation status on load and every 60 seconds.

## Deploy to Render
1. Replace the deployed `server.js` and `badminton_doubles_tournament_manager.html` with the files in this package.
2. In Render, open your Web Service → Environment and add:
   - `ACTIVATION_ADMIN_KEY` = a long, random secret only you know (at least 32 characters recommended).
3. Deploy/restart the service.
4. Do not expose the admin key in the HTML or give it to app users.

## Generate a fresh activation code
Call the deployed app's admin endpoint using your secret. Replace `https://YOUR-APP.onrender.com` and `YOUR_LONG_ADMIN_SECRET`.

```bash
curl -X POST 'https://YOUR-APP.onrender.com/api/admin/activation-codes' \
  -H 'x-admin-key: YOUR_LONG_ADMIN_SECRET' \
  -H 'Content-Type: application/json' \
  -d '{}'
```

Example response:
```json
{
  "ok": true,
  "activationCode": "AB12-CD34-EF56",
  "validForHours": 12,
  "note": "Code activates 12 hours from first successful redemption and can be redeemed once."
}
```

Send the returned code to the user. The code can be redeemed once, and the 12-hour timer begins when the user successfully enters it.

## Render storage warning — important
Render's local filesystem is usually ephemeral. If the service restarts/redeploys, `activation_data.json` may be lost unless you attach a persistent disk and store this file on that disk. Without persistent storage, users could regain the 3 free tournaments after data loss, and existing codes/activations could be forgotten. For production, attach a Render persistent disk and put the data files on it, or move activation state to a managed database. The app's existing `tournament_sessions.json` has the same local-filesystem consideration.

## Important limitation
The free-use counter is tied to a browser-local ID. Clearing that browser's site data or switching browsers/devices creates a new ID and can reset the free counter. Preventing that reliably requires user accounts or another server-managed identity mechanism. This simple activation system is intended for lightweight access control, not high-assurance licensing.

## Endpoints
- `POST /api/admin/activation-codes` — admin only; requires `x-admin-key`.
- `GET /api/access/:deviceId` — returns current access status.
- `POST /api/access/redeem` — JSON `{ "deviceId": "...", "code": "..." }`.
- `POST /api/access/start-tournament` — JSON `{ "deviceId": "..." }`; called by the app when generating a schedule.
