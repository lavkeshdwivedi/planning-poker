import React from "react";
import UserCard from "./UserCard";

const UserCircle = ({ users, votes, revealed }) => (
  <div className="relative w-64 h-64 flex items-center justify-center mt-8">
    {users.map((user, index) => (
      <UserCard
        key={user.username}
        username={user.username}
        vote={votes[user.username]}
        revealed={revealed}
        index={index}
        totalUsers={users.length}
      />
    ))}
  </div>
);

export default UserCircle;
