
class Room {
  constructor(id, status,player,token) {
    this.id = id;
    this.status = status;
    this.players= [{player,token}];
    this.active= token;
  }

  updateStatus(status) {
    this.status = status;
  }

  addPlayer(player,token) {
    this.players = [...this.players, {player,token}];
  }

  toggleActive(){
    this.active= this.active === this.players[0].token? this.players[1].token:this.players[0].token;
    return this.active;
  }

  getActivePlayer(){
    return this.active;
  }
}

module.exports = Room;
