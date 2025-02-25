# Planning Poker

A real-time Planning Poker application for agile teams. Single HTML file powered by Firebase Realtime Database with no build step required.

## Features

- **Real-time Collaboration**: Create a room, share the 6-character code, and vote simultaneously
- **Fibonacci Cards**: Vote using standard planning poker cards (0, 1, 2, 3, 5, 8, 13, 21, 34, ?, ☕)
- **Host Controls**: Room host reveals all votes at once to prevent anchoring bias
- **Smart Results**: Shows average estimate, highlights majority vs outliers
- **Story Tracking**: Add story descriptions for each estimation round
- **Auto-join**: Share full URL with hash for instant room access
- **Themes**: Light/dark mode with automatic detection
- **Mobile Friendly**: Responsive design works on all devices

## Quick Start

1. Open `index.html` in your browser
2. Click "Create room" and enter your name
3. Share the room code with your team
4. Start estimating!

## Tech Stack

- **Frontend**: Vanilla HTML, CSS, JavaScript (ES6+)
- **Database**: Firebase Realtime Database
- **Styling**: Custom CSS with CSS Variables for theming
- **Icons**: Inline SVG for crisp rendering

## Self-Hosting

### Option 1: Use the Demo (Recommended)

The app is already configured with a demo Firebase project. Just open `index.html` directly.

### Option 2: Host Your Own

1. **Create Firebase Project**
   - Visit [Firebase Console](https://console.firebase.google.com)
   - Create new project (Spark plan is free)
   - Add web app and copy config

2. **Enable Realtime Database**
   - Go to Realtime Database in sidebar
   - Create database in test mode

3. **Update Config**
   - Open `index.html`
   - Replace `firebaseConfig` object with your values

4. **Deploy**
   - Upload `index.html` to any static host
   - Or serve locally: `python3 -m http.server`

## Architecture

Single-file application with Firebase Realtime Database:

```
pp_rooms/
  {ROOM_CODE}/
    name: "Sprint Planning"
    host: "{hostPlayerId}"
    revealed: false
    story: "Implement user auth"
    players/
      {playerId}/
        name: "Alice"
        vote: "8"  // null if not voted
```

- All state managed in Firebase
- Real-time sync via `roomRef.on('value')`
- No server-side logic required
- Automatic cleanup on disconnect

## Development

- No build tools needed
- Edit `index.html` directly
- Test locally with any HTTP server
- Firebase handles all backend concerns

## License

MIT License - see LICENSE file
