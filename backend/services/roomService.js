const uniqid = require("uniqid");
const Room = require("../models/roomModel");
// local vairable storage, will be connected to db later on
const rooms = new Map();

const handleRoomEvents = (io, socket) => {
  // create room
  socket.on("create room", () => {
    const room_id = uniqid();
    const room = new Room(room_id, "created",socket.id);
    rooms.set(room_id, room);
    socket.join(room_id);
    console.log(socket.id, "created room: ", room_id);
    socket.emit("room joined", {
      room_id,
    });
    console.log(rooms);
  });

  // join room
  socket.on("join room", (room_id) => {
    if (rooms.get(room_id).status === "full") {
      console.log("Room is full");
      socket.emit("full room");
    } else {
      const room = rooms.get(room_id);
      room.updateStatus("full");
      room.addPlayer(socket.id);
      rooms.set(room_id, room);
      socket.join(room_id);
      console.log(socket.id + " joined room: " + room_id);
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
