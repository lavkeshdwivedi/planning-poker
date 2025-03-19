import React from "react";
import { motion } from "framer-motion";

const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500"];

const UserCard = ({ username, vote, revealed, index }) => (
  <motion.div
    className={`absolute w-24 h-24 rounded-full flex flex-col items-center justify-center text-white shadow-lg ${colors[index % colors.length]}`}
    animate={{ rotateY: revealed ? 180 : 0 }}
    transition={{ duration: 0.6 }}
  >
    <div className="font-bold">{username}</div>
    {revealed && <div className="text-xl">{vote}</div>}
  </motion.div>
);

export default UserCard;
