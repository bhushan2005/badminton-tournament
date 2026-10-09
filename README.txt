SmashMaster v2.0 - Shared Doubles Badminton Tournament Manager

Files
- badminton_doubles_tournament_manager.html: browser application
- server.js: Node.js shared-session server
- README.txt: these instructions

Run the shared version
1. Install Node.js (LTS).
2. Put the HTML file and server.js in the same folder.
3. Open a terminal in that folder and run: node server.js
4. Open http://localhost:8080/ in your browser.
5. Use the generated shared-session link to let other users join the same session.
6. For access from other devices on the same Wi-Fi, use the host computer's LAN IP and port 8080.

Recent UI improvements
- Tournament date input constrained to its card width on mobile/iPhone.
- Court tiles and match cards share consistent court colors.
- Round labels are highlighted.
- Saving a match moves completed matches to the bottom so pending matches remain at the top, with a short transition animation.
- About section updated with Bhushan T., feedback email and donation UPI.

The existing shared server writes access.log and tournament_sessions.json beside server.js.

For a separate React + Spring Boot starter and Render deployment instructions, see smashmaster-react-springboot.zip / its README.md. That starter currently uses in-memory backend state and is not feature-for-feature parity; follow its production checklist before using it for live tournaments.
