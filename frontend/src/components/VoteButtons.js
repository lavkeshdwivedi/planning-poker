import React from "react";
import { motion } from "framer-motion";

const availableVotes = ["0", "1", "2", "3", "5", "8", "13", "20", "40", "100", "∞", "?"];

const VoteButtons = ({ selectedVote, castVote }) => {
  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="grid grid-cols-6 gap-4 mb-4">
        {availableVotes.slice(0, 6).map((num) => (
          <motion.button key={num} whileHover={{ scale: 1.1 }} className="p-4 bg-blue-600 rounded text-xl font-bold" onClick={() => castVote(num)}>
            {num}
          </motion.button>
        ))}
      </div>
      <div className="grid grid-cols-6 gap-4">
        {availableVotes.slice(6).map((num) => (
          <motion.button key={num} whileHover={{ scale: 1.1 }} className="p-4 bg-blue-600 rounded text-xl font-bold" onClick={() => castVote(num)}>
            {num}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default VoteButtons;