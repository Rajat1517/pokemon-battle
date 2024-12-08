const typeChart = [
  [0.5, 0.5, 1, 1, 2, 2, 0.5],
  [1, 0.5, 1, 1, 2, , 0.5, 2],
  [2, 1, 1, 1, 1, 1, 1],
  [1, 2, 1, 0.5, 0, 0.5, 1],
  [1, 1, 1, 2, 1, 0.5, 2],
  [1, 2, 1, 1, 2, 0.5, 0.5],
  [2, 1, 1, 1, 1, 2, 0.5],
];

const indices = new Map();

indices.set("ice", 0);
indices.set("water", 1);
indices.set("fighting", 2);
indices.set("electric", 3);
indices.set("ground", 4);
indices.set("grass", 5);
indices.set("fire", 6);

const calcAttack = (attacker, exp, strength, attack, defenderType) => {
  const attackerType = attacker.type;
  const attackType = attack.type;
  const attackLevel = attack.level;
  const intensity = attacker.intensity?.attack / 5;
  const c1 = typeChart[indices.get(attackType)][indices.get(defenderType)];
  const c2 = typeChart[indices.get(attackerType)][indices.get(defenderType)];

  let res = Math.ceil(
    ((exp/100) *
      (strength) *
      intensity *
      Math.sqrt((attackLevel * c1) + c2))
  );
  return res;
};

const calcDefend = (defender, exp, strength, attack, attackerType) => {
  const defenderType = defender.type;
  const attackType = attack.type;
  const intensity = defender.intensity?.defense / 5;
  const c1 = typeChart[indices.get(attackType)][indices.get(defenderType)];
  const c2 = typeChart[indices.get(attackerType)][indices.get(defenderType)];

  let res = ~~(
    ((exp/100) * (strength) * intensity * Math.sqrt(c1 + c2 ))
  );
  return res;
};

 const battleBlow = ({attackerDetails, attack, defenderDetails}) => {

    const {pokemon: attacker,exp: exp1, strength: strength1 }= attackerDetails;
    const {pokemon: defender,exp: exp2, strength: strength2 }= defenderDetails;

  return Math.max(0, calcAttack(attacker, exp1,strength1,attack,defender.type) - calcDefend(defender, exp2,strength2,attack,attacker.type));
};


module.exports= battleBlow;

