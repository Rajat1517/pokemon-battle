const battleBlow = require("../utils/battle");
const { players } = require("../services/configureService");
const { rooms } = require("../services/roomService");
const { verifyJWT } = require("../utils/authentication");

const handleBattleEvents = (io, socket) => {
  // attack in battle 
  socket.on("attack", ({ move,token }) => {
    const { success,data,error}= verifyJWT(token);
    if(!success){
      socket.emit("session expired");
      return;
    }
    const player = data.player_id;
    const room_id = [...socket.rooms][1];
    const delta = battleBlow(player, move, room_id); 
    const contestants = rooms.get(room_id)?.players;
    const contestant = contestants.filter((c) => c.player !== player)[0].player;
    const active = rooms.get(room_id).toggleActive();
    io.of("/")
      .to(room_id)
      .emit("pokemon move", {
        player: token,
        delta,
        contestant: players.get(contestant),
        active,
        victor: players.get(contestant).health === 0 ? token : undefined,
      });
  });

  // joining battle
  socket.on("joined battle", ({ room_id, token }) => {
    console.log("Room: ", room_id);
    const {success,data,error}= verifyJWT(token);
    if(!success){
      socket.emit("session expired");
      return;
    }

    let contestants = rooms.get(room_id)?.players;
    contestants = contestants?.map((contestant) => players.get(contestant.player));
    console.log(contestants);

    io.of("/")
      .to(room_id)
      .emit("players in room", {
        players: contestants,
        active: rooms.get(room_id).getActivePlayer(),
      });
  });
};

module.exports = {
  handleBattleEvents,
};
