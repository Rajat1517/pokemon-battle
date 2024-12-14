
class Room {
  constructor(id, status,player) {
    this.id = id;
    this.status = status;
    this.players= [player];
    this.active= player;
  }

  updateStatus(status) {
    this.status = status;
  }

  addPlayer(player) {
    this.players = [...this.players, player];
  }

  toggleActive(){
    this.active= this.active === this.players[0]? this.players[1]:this.players[0];
    return this.active;
  }

  getActivePlayer(){
    return this.active;
  }
}

module.exports = Room;
