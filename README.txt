SmashMaster v1.9 - Shared Doubles Badminton Tournament Manager

FILES (fixed filenames)
- badminton_doubles_tournament_manager.html
- server.js
- README.txt
- access.log (created automatically by the server)
- tournament_sessions.json (created automatically by the server)

RUNNING THE SHARED VERSION
1. Put badminton_doubles_tournament_manager.html and server.js in the same folder.
2. Open a terminal in that folder.
3. Run: node server.js
4. Open: http://localhost:8080/
5. Use the Shared Tournament Session link to open the same tournament on multiple devices.
6. For other devices on the same network, use the server computer's LAN IP with port 8080.

v1.9 CHANGES
- Clicking the tournament name plays the 3-second badminton animation and shows the tournament name in the animation.
- Match scores are restricted to 0-11; when saving a completed match exactly one team must have 11.
- Added About section with author, feedback email and donation UPI details.
- Server access.log records normal HTTP access details.
- When a tournament is started for the first time, access.log also records UTC start time, IP, session ID, tournament name, tournament date and player names.
- Duplicate player names are blocked for both normal and late-player additions.
- Reset Tournament remains at the end of the last tab and requires confirmation.
- First browser load has a 3-second badminton animation.
- Existing shared-session, scheduling, rest, court timing, extra-match and export features are retained.

SERVER LOGGING
The server creates access.log automatically. It records requests with timestamp, IP, method, path and browser user-agent. A separate TOURNAMENT STARTED entry is written when fixtures are generated for a tournament that has not previously been generated in that browser/session state.

IMPORTANT
The browser must receive JavaScript to run the application, so client-side JavaScript cannot be made completely secret. Real protection of proprietary logic requires moving sensitive logic to the server.
