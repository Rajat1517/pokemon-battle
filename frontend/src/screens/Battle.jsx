import React, { useContext, useState, useEffect } from "react";
import { UtilContext } from "../contexts/UtilContext";
import socket from "../utilities/socketConnection";
import { debouncefn } from "../utilities/utils";
import Alert from "../components/Alert";

function Battle() {
  const { pokemon, character, moves, room } = useContext(UtilContext);
  const [health1, setHealth1] = useState(100);
  const [health2, setHealth2] = useState(100);
  const [text, setText] = useState("Let the battle begin!");
  const [active, setActive] = useState(false);
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => { 
    socket.emit("joined battle", {
      room_id: room,
      token: localStorage.getItem("token"),
    });

    socket.on("players in room", ({ players, active }) => {
      const token = localStorage.getItem("token");
      console.log("token",token);
      console.log(players);
      const p1 = players?.find((player) => player.token === token);
      const p2 = players?.find((player) => player.token !== token);
      console.log("players",p1,p2);
      setPlayer1(p1);
      setPlayer2(p2);
      setActive(active=== token);
    });

    return () => {
      socket.off("players in room");
    };
  }, []);

  useEffect(() => {
    socket.on("pokemon move", ({ player, delta, active, victor }) => {
      const token = localStorage.getItem("token");
      const num = player === token ? 1 : 2;
      decreaseHealth(num, delta);
      setActive(active === token);
      console.log(victor);
      if (victor !== undefined) {
        const m =
          victor === token
            ? "You won!!! One step closer to becoming the Pokemon Master."
            : "You lost!!! Let's practice more.";
        setMessage(m);
        setVisible(true);
      }
    });

    return () => {
      socket.off("pokemon move");
    };
  }, [health1, health2]);

  const decreaseHealth = debouncefn((player, delta) => {
    delta = Math.min(player === 1 ? health1 : health2, delta);
    if (delta === 0) return;

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
        player === 1
          ? setHealth1((prev) => {
              return prev - delta;
            })
          : setHealth2((prev) => {
              return prev - delta;
            });
        clearInterval(id);
      }
      p.style.width = `${(player === 1 ? health1 : health2) - x}%`;
      x++;
    }, time);
  }, 200);

  const attack = (move) => {
    socket.emit("attack", {
      move,
      token: localStorage.getItem("token"),
      room_id: room,
    });
  };

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
          {player1 && (
            <div className="player">
              <div>
                <div className="health-bar">
                  <div id="player1"></div>
                </div>
                <p>HP {health1}</p>
                <p>Exp {player1.experience}</p>
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
            </div>
          )}
          {player2 && (
            <div className="player">
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
                <p>HP {health2}</p>
                <p>Exp {player2.experience}</p>
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
            </div>
          )}
        </div>
        {player1 && (
          <div>
            <div>
              <button
                className="attack"
                disabled={!active}
                onClick={() => {
                  const move = player1.pokemon.moves[0];
                  attack(move);
                }}
              >
                {player1?.pokemon.moves[0].name}
              </button>
              <button
                className="attack"
                disabled={!active}
                onClick={() => {
                  const move = player1.pokemon.moves[1];
                  attack(move);
                }}
              >
                {player1?.pokemon.moves[1].name}
              </button>
            </div>
            <div>
              <button
                className="attack"
                disabled={!active}
                onClick={() => {
                  const move = player1.pokemon.moves[2];
                  attack(move);
                }}
              >
                {player1?.pokemon.moves[2].name}
              </button>
              <button
                className="attack"
                disabled={!active}
                onClick={() => {
                  const move = player1.pokemon.moves[3];
                  attack(move);
                }}
              >
                {player1?.pokemon.moves[3].name}
              </button>
            </div>
          </div>
        )}
      </div>
      <div id="message-container">{text}</div>
      <Alert message={message} visible={visible} setVisible={setVisible} />
    </div>
  );
}

export default Battle;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF5ZXJfaWQiOiJjejhtNWpoNW1hciIsImlhdCI6MTczNjA3MzE5NCwiZXhwIjoxNzM2MDc2Nzk0fQ.JhrcX_qLu9ZkvqRM7BjqMOw33brFFqVs3JF1cZLoaWk

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF5ZXJfaWQiOiJjejhtNWpoNW1hciIsImlhdCI6MTczNjA3MzE5NCwiZXhwIjoxNzM2MDc2Nzk0fQ.JhrcX_qLu9ZkvqRM7BjqMOw33brFFqVs3JF1cZLoaWk
