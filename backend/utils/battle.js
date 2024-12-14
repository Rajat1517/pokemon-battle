const { players } = require("../services/configureService");
const { rooms } = require("../services/roomService");

const typeChart = [
  [0.5, 0.5, 1, 1, 2, 2, 0.5],
  [1, 0.5, 1, 1, 2, , 0.5, 2],
  [2, 1, 1, 1, 1, 1, 1],
  [1, 2, 1, 0.5, 0, 0.5, 1],
  [1, 1, 1, 2, 1, 0.5, 2],
  [1, 2, 1, 1, 2, 0.5, 0.5],
  [2, 1, 1, 1, 1, 2, 0.5],
];

const pokemons = {
  pikachu: {
    type: "electric",
    intensity: {
      attack: 4,
      defense: 1,
    },
  },
  charmander: {
    type: "fire",
    intensity: { attack: 4, defense: 1 },
  },
  squirtle: {
    type: "water",
    intensity: { attack: 2, defense: 3 },
  },
  bulbasaur: {
    type: "grass",
    intensity: {
      attack: 3,
      defense: 2,
    },
  },
};



const indices = new Map();
indices.set("ice", 0);
indices.set("water", 1);
indices.set("fighting", 2);
indices.set("electric", 3);
indices.set("ground", 4);
indices.set("grass", 5);
indices.set("fire", 6);

const calcAttack = ({attacker, exp, strength}, attack, defender) => {
  const defenderType= pokemons[defender].type;
  const attackerType = pokemons[attacker.name].type;
  const attackType = attack.type;
  const attackLevel = attack.level;
  const intensity = pokemons[attacker.name].intensity?.attack / 5;
  const c1 = typeChart[indices.get(attackType)][indices.get(defenderType)];
  const c2 = typeChart[indices.get(attackerType)][indices.get(defenderType)];

  let res = Math.ceil(
    ((exp/100) *
      (strength/2) *
      intensity *
      Math.sqrt((attackLevel * c1) + c2))
  );
  return res;
};

const calcDefend = ({defender, exp, strength}, attack,attacker) => {
  const attackerType= pokemons[attacker].type;
  const defenderType = pokemons[defender.name].type;
  const attackType = attack.type;
  const intensity = pokemons[defender.name].intensity?.defense / 5;
  const c1 = typeChart[indices.get(defenderType)][indices.get(attackType)];
  const c2 = typeChart[indices.get(defenderType)][indices.get(attackerType)];

  let res = ~~(
    ((exp/100) * (strength/2) * intensity * Math.sqrt(c1 + c2 ))
  );
  return res;
};

 const battleBlow = (player,move,room_id) => {

    const attackerDetails= players.get(player);
    const defenderId= rooms.get(room_id)?.players.filter(p=>p!==player)[0];
    const defenderDetails= players.get(defenderId);
    const attack= move;
    const attackerData={
      attacker: attackerDetails.pokemon,
      exp: attackerDetails.experience,
      strength: attackerDetails.health,
    }
    const defenderData={
      defender: defenderDetails.pokemon,
      exp: defenderDetails.experience,
      strength: defenderDetails.health,
    }


  const delta= Math.max(4, calcAttack(attackerData,attack,defenderData.defender.name) - calcDefend(defenderData,attack,attackerData.attacker.name));
  if(defenderDetails.health===0 || attackerDetails.health === 0) delta=0;
  players.get(defenderId).updateHealth(delta);
  return delta;
};


module.exports= battleBlow;

