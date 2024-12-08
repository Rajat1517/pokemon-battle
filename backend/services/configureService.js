const Player = require("../models/playerModel");

// Local players storage, update db later on
const players = new Map();

const handleConfigureEvents = (io, socket) => {
  socket.on("configure player", ({ avatar, experience, pokemon }) => {
    const player = new Player(avatar, experience, pokemon,socket.id);
    players.set(socket.id, player);
    socket.emit("player added");
    players.forEach(player=>console.log(player.pokemon));
  });

};

module.exports = {
  handleConfigureEvents,
  players,
};
