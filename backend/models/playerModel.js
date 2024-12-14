class Player {
  constructor(avatar, experience, pokemon,id, health = 100) {
    this.id= id;
    this.avatar = avatar;
    this.pokemon = pokemon;
    this.experience = experience;
    this.health = health;
  }

  updateHealth(delta) {
    this.health = Math.max(this.health-delta,0);
    console.log(this.health);
    return this.health;
  }
}

module.exports = Player;
