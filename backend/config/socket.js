const { Server } = require("socket.io");
const { handleBattleEvents } = require("../services/battleService");
const { handleRoomEvents } = require("../services/roomService");
const { handleConfigureEvents } = require("../services/configureService");
const { generateJWT } = require("../utils/authentication");

const setupSocketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  //   event handlers
  io.on("connection", (socket) => {
    console.log("user connected", socket.id);
    const token = generateJWT();
    socket.emit("connection", {
      token,
    });

    handleBattleEvents(io, socket);
    handleRoomEvents(io, socket);
    handleConfigureEvents(io, socket);

    socket.on("disconnect", () => {
      console.log("user disconnected", socket.id);
    });
  });
};

module.exports = { setupSocketServer };
