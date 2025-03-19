const availableVotes = ["0", "1", "2", "3", "5", "8", "13", "20", "40", "100", "∞", "?"];

export const getRandomVote = () =>
  availableVotes[Math.floor(Math.random() * availableVotes.length)];
