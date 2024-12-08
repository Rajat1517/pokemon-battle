const express = require("express");
const app = express();
const { createServer } = require("http");
const { setupSocketServer } = require("./config/socket");

const expressServer = createServer(app);

setupSocketServer(expressServer);

app.get("/", (req, res) => {
  res.send("Hello");
});

expressServer.listen(5000, () => {
  console.log("Server is listening on port 5000");
});
