class Player {
  constructor(avatar, experience, pokemon,id, health = 100) {
    this.id= id;
    this.avatar = avatar;
    this.pokemon = pokemon;
    this.experience = experience;
    this.health = health;
  }

  updateHealth(delta) {
    this.health += delta;
    return this.health;
  }
}

module.exports = Player;
