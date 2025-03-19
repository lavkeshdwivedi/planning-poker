import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import UserCircle from "./components/UserCircle";
import VoteButtons from "./components/VoteButtons";

const socket = io("http://localhost:5000");

const App = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [roomId, setRoomId] = useState(searchParams.get("room") || "");
  const [roomName, setRoomName] = useState(localStorage.getItem("roomName") || "");
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const [joined, setJoined] = useState(false);
  const [users, setUsers] = useState([]);
  const [votes, setVotes] = useState(JSON.parse(localStorage.getItem("votes")) || {});
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (roomId && username && role) {
      setJoined(true);
      socket.emit("join-room", { roomId, roomName, username, role });
    }
  }, [roomId, roomName, username, role]);

  useEffect(() => {
    socket.on("room-update", (data) => setUsers(Object.values(data.users)));
    socket.on("vote-update", (data) => {
      setVotes(data);
      localStorage.setItem("votes", JSON.stringify(data));
    });
    socket.on("reveal", (data) => {
      setVotes(data);
      setRevealed(true);
    });

    return () => socket.disconnect();
  }, []);

  const createRoom = () => {
    const newRoomId = `room-${Math.random().toString(36).substr(2, 8)}`;
    setRoomId(newRoomId);
    setSearchParams({ room: newRoomId });
    setRole("scrumMaster");
    localStorage.setItem("role", "scrumMaster");
    localStorage.setItem("roomName", roomName);
  };

  const joinRoom = () => {
    if (!username) return;
    localStorage.setItem("username", username);
    localStorage.setItem("role", "Participant");
    setRole("Participant");
    setJoined(true);
    socket.emit("join-room", { roomId, username, role: "Participant", roomName });
  };

  const castVote = (vote) => {
    setVotes((prev) => {
      const updatedVotes = { ...prev, [username]: vote };
      localStorage.setItem("votes", JSON.stringify(updatedVotes));
      return updatedVotes;
    });
    socket.emit("vote", { roomId, vote, username });
  };

  const revealVotes = () => socket.emit("reveal-votes", roomId);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <motion.h1 className="text-3xl font-bold text-blue-400 mb-8">
        Planning-Poker by Lavkesh Dwivedi
      </motion.h1>

      {roomName && (
        <div className="mb-4">
          <span className="text-lg">Room: </span>
          <span className="font-bold text-green-300">{roomName}</span>
        </div>
      )}

      {joined && (
        <div className="mb-4">
          <span className="text-lg">Participants: </span>
          <span className="font-bold">
            {users.map((user) => user.username).join(", ")}
          </span>
        </div>
      )}

      {!joined ? (
        <div className="space-y-4">
          {!roomId ? (
            <div>
              <input
                className="p-2 border rounded w-full"
                placeholder="Enter Room Name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              />
              <button className="mt-2 p-2 bg-green-500 rounded" onClick={createRoom}>
                Create New Room
              </button>
            </div>
          ) : (
            <div>
              <input
                className="p-2 border rounded w-full"
                placeholder="Enter Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <button className="mt-2 p-2 bg-blue-500 rounded" onClick={joinRoom} disabled={!username}>
                Join Room
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
          <UserCircle users={users} votes={votes} revealed={revealed} />
          <VoteButtons castVote={castVote} />
          {role === "scrumMaster" && (
            <button className="mt-6 p-2 bg-green-500 rounded" onClick={revealVotes}>
              Reveal Votes
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default App;