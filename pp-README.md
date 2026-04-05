# Planning Poker

A minimal, real-time planning poker tool for agile teams — no login, no install, just share a room code and vote.

**Live demo:** [lavkesh.com/planning-poker](https://lavkesh.com/planning-poker.html)

![Planning Poker screenshot](https://lavkesh.com/images/planning-poker-preview.png)

---

## What it does

- Create a room in one click, share the 6-character code with your team
- Everyone votes simultaneously using Fibonacci-style cards (0, 1, 2, 3, 5, 8, 13, 21, 34, ?, ☕)
- The host reveals all votes at once — no anchoring bias
- Results show the average and highlight the majority vote vs outliers
- Auto-joins via URL hash (share the full URL and teammates land straight in the room)
- Light/dark mode, auto-detected by time of day

---

## Stack

- **Single HTML file** — no build step, no npm, no framework
- **Firebase Realtime Database** — for live room state sync
- **Google Fonts** — Fraunces (display), JetBrains Mono, DM Sans

---

## Self-hosting

1. **Create a Firebase project**
   - Go to [console.firebase.google.com](https://console.firebase.google.com)
   - Create a new project (free Spark plan works fine)
   - Add a web app and copy the SDK config snippet
   - Enable **Realtime Database** in the left sidebar (start in test mode)

2. **Paste your config into `index.html`**

   Find this block near the top of the `<script>` section and replace the placeholders:

   ```js
   const firebaseConfig = {
     apiKey:            "YOUR_API_KEY",
     authDomain:        "YOUR_PROJECT_ID.firebaseapp.com",
     databaseURL:       "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
     projectId:         "YOUR_PROJECT_ID",
     storageBucket:     "YOUR_PROJECT_ID.firebasestorage.app",
     messagingSenderId: "YOUR_SENDER_ID",
     appId:             "YOUR_APP_ID"
   };
   ```

3. **Deploy**

   Drop `index.html` anywhere that serves static files — GitHub Pages, Netlify, Vercel, or just open it locally in a browser.

   ```bash
   # GitHub Pages (simplest)
   # Push index.html to the root of a repo, enable Pages in Settings → Pages
   ```

---

## Firebase security rules

For a private or team deployment, tighten the default rules in **Firebase Console → Realtime Database → Rules**:

```json
{
  "rules": {
    "pp_rooms": {
      "$roomId": {
        ".read": true,
        ".write": true,
        ".indexOn": ["createdAt"]
      }
    }
  }
}
```

For public deployments it's fine to leave test mode on — rooms are ephemeral and contain no sensitive data.

---

## Architecture

Everything lives in a single `index.html`. The room state is a flat Firebase node:

```
pp_rooms/
  {ROOM_CODE}/
    name:      "Sprint 42 Planning"
    host:      "{hostId}"
    revealed:  false
    story:     "User can reset password"
    createdAt: 1712345678000
    players/
      {playerId}/
        name:     "Lavkesh"
        vote:     "5"          // null until voted
        joinedAt: 1712345679000
```

All clients subscribe to the same room ref via `roomRef.on('value', ...)` — Firebase handles the fan-out. There is no server-side logic.

---

## Previous version

The original v1 of this tool used Node.js + Socket.io + React: [planning-poker-v1](https://github.com/lavkeshdwivedi/planning-poker-v1). This rewrite replaces the server entirely with Firebase so the whole thing is a static file.

---

## License

MIT
