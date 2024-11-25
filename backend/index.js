const express = require("express");
const app = express();
const { createServer } = require("http");
const { Server } = require("socket.io");

const expressServer = createServer(app);
const io = new Server(expressServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("Hello");
});

io.on("connection", (socket) => {
  socket.on("attackForServer", (attack) => {
    console.log("Attacked", attack);
    socket.emit("attackForClient", {
      player: 1,
      delta: 20,
    });
  });


});

expressServer.listen(5000, () => {
  console.log("Server is listening on port 5000");
});
