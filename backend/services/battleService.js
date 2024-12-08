const battleBlow = require("../utils/battle");
const { players } = require("../services/configureService");
const { rooms } = require("../services/roomService");

let player = 1;

const handleBattleEvents = (io, socket) => {
  // socket.on("attackForServer", (attack) => {
  //   let delta = battleBlow(attack);
  //   player = player === 1 ? 2 : 1;
  //   if (delta < 0) player = player === 1 ? 2 : 1;
  //   if (delta == 0) delta = 10 + Math.ceil(Math.random() * 10);
  //   socket.emit("attackForClient", {
  //     player,
  //     delta: Math.abs(delta),
  //     message: " attacked ",
  //   });
  // });

  // joining battle 
  socket.on("joined battle",({room_id})=>{
    console.log("Room: ",room_id);
    let contestants= rooms.get(room_id)?.players;
    contestants= contestants?.map(contestant=>players.get(contestant));
    io.of("/").to(room_id).emit("players in room",{
      players:contestants,
    })
  })
};

module.exports = {
  handleBattleEvents,
};
