const { Server } = require("socket.io");
const { handleBattleEvents } = require("../services/battleService");
const { handleRoomEvents } = require("../services/roomService");
const { handleConfigureEvents } = require("../services/configureService");
const { generateJWT, verifyJWT } = require("../utils/authentication");

const setupSocketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  //   event handlers
  io.on("connection", (socket) => {

    const token= socket.handshake.query.token;
    if(token === undefined){
      console.log("user connected", socket.id);
      const token = generateJWT();
      socket.emit("connection", {
        token,
      });
    }
    else{
      const validity= verifyJWT(token);
      if(!validity.success){
        console.log("user connected", socket.id);
        const token = generateJWT();
        socket.emit("connection", {
          token,
        });
      } 
      
      // io.of("/")
      // .to(room_id)
      // .emit("players in room", {
      //   players: contestants,
      //   active: rooms.get(room_id).getActivePlayer(),
      // });
      console.log("user reconnected", validity);
    }

    handleBattleEvents(io, socket);
    handleRoomEvents(io, socket);
    handleConfigureEvents(io, socket);

    socket.on("disconnect", () => {
      console.log("user disconnected", socket.id);
    });
  });
};

module.exports = { setupSocketServer };
