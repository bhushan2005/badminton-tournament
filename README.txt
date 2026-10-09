SMASHMASTER v2.3 — SHARED DOUBLES BADMINTON TOURNAMENT MANAGER

FILES
- badminton_doubles_tournament_manager.html — browser interface
- server.js — Node.js shared-session server
- README.txt — instructions and complete update log
- badminton_doubles_tournament_manager_shared.zip — complete shared-server package

RUN THE SHARED VERSION
1. Install Node.js LTS.
2. Put the HTML file and server.js in the same folder.
3. Open a terminal in that folder and run: node server.js
4. Open http://localhost:8080/ in your browser.
5. Use the generated shared-session link to let other users join the same tournament.
6. For other devices on the same Wi-Fi, use the host computer's LAN IP and port 8080.

DATA AND LOGS
The Node server writes access.log and tournament_sessions.json beside server.js. Access logging includes request date/time, IP, method, path, and user agent. Tournament-start records include tournament/session details and the roster snapshot.

FULL UPDATE LOG

v2.3 — Custom colours and visible match movement
- Added a separate colour picker to each court; its selected colour is used for pending match tiles on that court.
- Added an app accent/green-layout colour picker.
- Added a completed-match colour picker, defaulting to light blue for completed tile borders, score values, and Update buttons.
- Completed matches use the selected completed colour; pending matches retain their court colour.
- Fixed the score-save movement using a position-based transition so the tile visibly travels from its old position to the completed-match area over three seconds.

v2.1 — Court colour and visibility update
- Court tiles use alternating bright red and bright yellow colours consistently on Setup and Match Schedule.
- Match-number and round badges use fluorescent lime green.

v2.0 — Scheduling, display, and workflow improvements
- Court setup and match schedule use consistent court colours.
- Tournament date is displayed as dd-Mon-yy while retaining a valid underlying date value.
- Compact Total, Completed, and Remaining counters are shown in Matches.
- Completed matches move to the bottom of the schedule after a score is saved; pending matches stay at the top.
- Saving a score triggers a short animation.
- Extra Matches can be added when each court has at most one scheduled match remaining, subject to player balance and court capacity.
- Leaderboard is displayed in a table.
- The tournament name can trigger the loading animation, which includes the tournament name.
- The date input is constrained to its setup card on narrow screens/iPhone.

v1.9 — About, loading, validation, and tournament logging
- About section includes author, contact email, and donation UPI.
- Loading animation enhanced.
- Score validation tightened: scores must be 0–11 and exactly one team must score 11.
- Tournament-start logging records start time, IP, session ID, tournament name/date, player count, names, and gender.

v1.8 — Player and reset safeguards
- Duplicate player names are rejected case-insensitively after trimming whitespace.
- Reset Tournament moved to the last tab and requires confirmation.
- Three-second loading animation added for first load.
- JavaScript obfuscation/minification used as a deterrent; it does not make client-side code impossible to inspect.
- Server access log records timestamp, IP, method, path, and user agent.

v1.7 — Extra-match and match-list improvements
- Extra-match balancing logic refined.
- Match counters reduced/condensed.
- Additional user-interface improvements.

v1.6 — Scoring and export improvements
- Quick score shortcuts removed.
- Score validation and export behaviour improved.

v1.5 — Version and export refinements
- Additional/refined variables, including version display and Excel export filename.

v1.4 — Rest scheduling
- Scheduling avoids assigning a player to more than two consecutive 8-minute planning slots when an alternative can be made; a slot can be advanced to create rest.
- Court start/end times remain enforced.

v1.3 — Shared tournament sessions
- Added shared-session API so multiple devices can work on one tournament instead of each browser keeping isolated localStorage data.
- Live server-sent updates and revision-conflict handling help reduce accidental overwrites.
- Add Extra Matches supports active rosters of at least four players and aims to give each player an extra match while keeping totals equal or within one when combinations and court capacity permit.
- Avoids adding a partial extra set when the required set cannot fit the remaining schedule.

v1.2 — Early scheduling and match-management refinements
- Refined the initial tournament setup and fixture workflow.
- Improved match schedule handling ahead of shared-session support.

v1.1 — Initial usability improvements
- Improved the first version’s player setup and tournament workflow.
- Made early interface and scheduling refinements.

v1.0 — Initial release
- First release of the badminton doubles tournament manager.
- Introduced the core tournament setup, doubles fixtures, match scoring, and results/leaderboard workflow.


REACT + SPRING BOOT VERSION
A separate React + Spring Boot + PostgreSQL version is provided in smashmaster-react-springboot.zip. Its styling has been brought closer to the dark emerald HTML app and includes app/court/completed-match colour controls. It is not yet feature-for-feature equivalent to the HTML app; see README.md for implemented API features and current limitations.
