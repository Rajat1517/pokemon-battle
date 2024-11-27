const express = require("express");
const app = express();
const { createServer } = require("http");
const { Server } = require("socket.io");
const battleBlow = require("./battle");

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

let player = 1;
io.on("connection", (socket) => {
  socket.on("attackForServer", (attack) => {
    let delta = battleBlow(attack);
    player = player === 1 ? 2 : 1;
    if (delta < 0) player = player === 1 ? 2 : 1;
    if (delta == 0) delta = 10 + Math.ceil(Math.random() * 10);
    socket.emit("attackForClient", {
      player,
      delta: Math.abs(delta),
      message: " attacked ",
    });
  });
});

expressServer.listen(5000, () => {
  console.log("Server is listening on port 5000");
});
