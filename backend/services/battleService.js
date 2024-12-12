const battleBlow = require("../utils/battle");
const { players } = require("../services/configureService");
const { rooms } = require("../services/roomService");

// let player = 1;

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

  // attack

  socket.on("attack",({move})=>{
    const player= socket.id;
    const room_id= [...socket.rooms][1];
    const delta= battleBlow(player,move,room_id);
    const contestants= rooms.get(room_id)?.players;
    const contestant=  contestants.filter(c=> c!==socket.id)[0];
    io.of("/").to(room_id).emit("pokemon move",{
      player: contestant,
      delta,
    })
  })


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
