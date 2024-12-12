import React, { useContext, useState, useEffect } from "react";
import { UtilContext } from "../contexts/UtilContext";
import socket from "../utilities/socketConnection";


function Battle() {
  const { pokemon, character, moves,room } = useContext(UtilContext);
  const [health1, setHealth1] = useState(100);
  const [health2, setHealth2] = useState(100);
  const [text,setText]= useState("Let the battle begin!");

  const [player1,setPlayer1]= useState(null);
  const [player2,setPlayer2]= useState(null);

  useEffect(() => {

    socket.emit("joined battle",{
      room_id:room,
    });

    socket.on("players in room",({players})=>{
      console.log(players, socket.id);
      const p1= players?.find(player=>player.id===socket.id);
      const p2= players?.find(player=>player.id!==socket.id);
      setPlayer1(p1);
      setPlayer2(p2);
      console.log(p1,p2);
    })

    socket.on("pokemon move",({player,delta})=>{
      console.log(player,delta);
      decreaseHealth(player===socket.id?1:2,delta);
    })
    
    return () => {
  
    };
  }, []);

  const decreaseHealth = (player, delta) => {
    delta = Math.min(player === 1 ? health1 : health2, delta);
    const p = document.getElementById(player === 1 ? "player1" : "player2");
    let id = null,
      x = 0,
      time = ~~(500 / delta);
    clearInterval(id);
    id = setInterval(() => {
      let width = p.style.width;
      width = width.slice(0, -1);
      if (parseInt(width) <= 20) {
        p.style.backgroundColor = "red";
      } else if (parseInt(width) <= 60) {
        p.style.backgroundColor = "orange";
      }
      if (x === delta + 1) {
        console.log("help")
        player === 1
          ? setHealth1((prev) => prev - delta)
          : setHealth2((prev) => prev - delta);
        clearInterval(id);
      } else {
        p.style.width = `${(player === 1 ? health1 : health2) - x}%`;
        x++;
      }
    }, time);
  };

  const attack = (move)=>{
    socket.emit("attack",{
      move,
      player: socket.id,
      room_id:room,
    });
    // console.log(move);
  }

  return (
    <div>
    <h3>Room: {room}</h3>
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          width: "100%",
          height: "80%",
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: "column",
        }}
      >
        <div className="row" style={{ height: "100%", margin: "0 3%" }}>
          { player1 && <div className="player">
            <div>
              <div className="health-bar">
                <div id="player1"></div>
              </div>
              <p>HP {player1.health}</p>
            </div>
            <div>
              <img
                height={300}
                src={require(`../assets/${player1?.avatar}.jpg`)}
                alt={player1?.avatar}
              />
              <img
                height={150}
                src={require(`../assets/${player1?.pokemon.name}.jpg`)}
                alt={player1?.pokemon.name}
              />
            </div>
          </div>}
          { player2 && <div className="player">
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <div
                className="health-bar"
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <div id="player2"></div>
              </div>
              <p>HP {player2.health}</p>
            </div>
            <div>
              <img
                height={150}
                src={require(`../assets/${player2.pokemon.name}.jpg`)}
                alt={player2.pokemon.name}
                style={{
                  transform: "rotateY(180deg)",
                }}
              />
              <img
                height={300}
                src={require(`../assets/${player2.avatar}.jpg`)}
                alt={player2.avatar}
                style={{
                  transform: "rotateY(180deg)",
                }}
              />
            </div>
          </div>}
        </div>
        {
        player1 &&   
        <div>
          <div>
            <button className="attack" onClick={()=>{
              const move= player1.pokemon.moves[0];
              attack(move);
            }}>
              {player1?.pokemon.moves[0].name}
            </button>
            <button className="attack" onClick={()=>{
              const move= player1.pokemon.moves[1];
              attack(move);
            }}>
              {player1?.pokemon.moves[1].name}
            </button>
          </div>
          <div>
            <button className="attack" onClick={()=>{
              const move= player1.pokemon.moves[2];
              attack(move);
            }}>
              {player1?.pokemon.moves[2].name}
            </button>
            <button className="attack" onClick={()=>{
              const move= player1.pokemon.moves[3];
              attack(move);
            }}>
              {player1?.pokemon.moves[3].name}
            </button>
          </div>
        </div>}
      </div>
      <div id="message-container">{text}</div>
    </div>
  );
}

export default Battle;
