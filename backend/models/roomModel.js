
class Room {
  constructor(id, status,player) {
    this.id = id;
    this.status = status;
    this.players= [player];
  }

  updateStatus(status) {
    this.status = status;
  }

  addPlayer(player) {
    this.players = [...this.players, player];
  }
}

module.exports = Room;
