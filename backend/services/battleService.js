const battleBlow = require("../utils/battle");
const { players } = require("../services/configureService");
const { rooms } = require("../services/roomService");

const handleBattleEvents = (io, socket) => {
  // attack in battle
  socket.on("attack", ({ move }) => {
    const player = socket.id;
    const room_id = [...socket.rooms][1];
    const delta = battleBlow(player, move, room_id);
    const contestants = rooms.get(room_id)?.players;
    const contestant = contestants.filter((c) => c !== socket.id)[0];
    const active = rooms.get(room_id).toggleActive();
    io.of("/")
      .to(room_id)
      .emit("pokemon move", {
        player: contestant,
        delta,
        contestant: players.get(contestant),
        active,
        victor: players.get(contestant).health === 0 ? socket.id : undefined,
      });
  });

  // joining battle
  socket.on("joined battle", ({ room_id }) => {
    console.log("Room: ", room_id);
    let contestants = rooms.get(room_id)?.players;
    contestants = contestants?.map((contestant) => players.get(contestant));
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
