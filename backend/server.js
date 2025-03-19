const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

let rooms = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-room", ({ room, username, role }) => {
    socket.join(room);
    if (!rooms[room]) {
      rooms[room] = { users: {}, votes: {} };
    }
    rooms[room].users[socket.id] = { username, role };
    io.to(room).emit("room-update", rooms[room]);
  });  

  socket.on("vote", ({ room, vote }) => {
    if (rooms[room]) {
      rooms[room].votes[socket.id] = vote;
      io.to(room).emit("vote-update", rooms[room].votes);
    }
  });

  socket.on("reveal-votes", (room) => {
    io.to(room).emit("reveal", rooms[room].votes);
  });

  socket.on("disconnect", () => {
    for (const room in rooms) {
      delete rooms[room].users[socket.id];
      delete rooms[room].votes[socket.id];
      io.to(room).emit("room-update", rooms[room]);
    }
    console.log("User disconnected:", socket.id);
  });
});

server.listen(5000, () => console.log("Server running on port 5000"));
