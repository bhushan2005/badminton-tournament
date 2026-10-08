SmashMaster v1.5 - Shared Doubles Badminton Tournament Manager

Changes in v1.5:
- Court slots are kept occupied whenever a pending match can fit.
- Player rest is prioritized whenever enough rested players are available.
- A third consecutive match is used only as a fallback when no non-third-consecutive match can fill the current available slot.
- This avoids unnecessary vacant court slots while still giving players rest whenever the player pool/remaining fixtures allow it.
- Existing v1.4 features remain: shared sessions, balanced extra matches for unequal player counts, court start/end limits, and scoring sync.

Run:
1. Put badminton_doubles_tournament_manager.html and server.js in the same folder.
2. Run: node server.js
3. Open: http://localhost:8080/
4. Share the generated session link with other users on the same reachable server.

For LAN use, replace localhost with the host computer's LAN IP address.
