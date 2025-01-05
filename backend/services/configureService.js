const Player = require("../models/playerModel");
const { verifyJWT } = require("../utils/authentication");

// Local players storage, update db later on
const players = new Map();

const handleConfigureEvents = (io, socket) => {
  socket.on("configure player", ({ avatar, experience, pokemon,token }) => {
    const {success,data,error}= verifyJWT(token);
    if(!success){
      socket.emit("session expired");
      return;
    }
    const socket_id= data.player_id;

    const player = new Player(avatar, experience, pokemon,socket_id,token);
    console.log(player);
    players.set(socket_id, player);
    socket.emit("player added");
    players.forEach(player=>console.log(player));
  }); 

};

module.exports = {
  handleConfigureEvents,
  players,
};
