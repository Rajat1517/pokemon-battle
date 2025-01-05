const uniqid = require("uniqid");
const Room = require("../models/roomModel");
const { verifyJWT } = require("../utils/authentication");
// local vairable storage, will be connected to db later on
const rooms = new Map();

const handleRoomEvents = (io, socket) => {
  // create room
  socket.on("create room", ({player_id}) => { 
    const {success, data, error}= verifyJWT(player_id);
    if(!success){
      socket.emit("Session expired");
      return;
    }
    console.log("Generated PLayer ID", data);
    console.log("Player ID who created room: ",player_id);
    const room_id = uniqid();
    const socket_id= data.player_id;

    const room = new Room(room_id, "created", socket_id,player_id);
    rooms.set(room_id, room);
    socket.join(room_id); 
    console.log(socket_id, "created room: ", room_id);
    socket.emit("room joined", {
      room_id,
    });
    console.log("rooms",rooms);
  });

  // join room
  socket.on("join room", ({room_id,player_id}) => {
    console.log(room_id,player_id);
    const {success, data, error}= verifyJWT(player_id);
    if(!success){
      socket.emit("Session expired");
      return;
    }
    console.log("Generated PLayer ID", data);
    console.log("Player ID who joined room",player_id);
    if (rooms.get(room_id).status === "full") {
      console.log("Room is full");
      socket.emit("full room");
    } 
    else {
      const socket_id= data.player_id;
      const room = rooms.get(room_id);
      room.updateStatus("full");
      room.addPlayer(socket_id,player_id);
      rooms.set(room_id, room);
      socket.join(room_id);
      console.log(socket_id + " joined room: " + room_id);
      socket.emit("room joined", {
        room_id,
      });
    }
    console.log(rooms);
  });
};

module.exports = {
  handleRoomEvents,
  rooms,
};
