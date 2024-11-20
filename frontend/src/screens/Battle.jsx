import React, { useContext, useState } from "react";
import { UtilContext } from "../contexts/UtilContext";

function Battle() {
  const { pokemon, character, moves } = useContext(UtilContext);
  const [health1, setHealth1] = useState(100);
  const [health2, setHealth2] = useState(100);

  const decreaseHealth = (player, delta) => {
    delta = parseInt(window.prompt("Enter the change"));
    player = parseInt(window.prompt("Enter player"));
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

  return (
    <div>
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
          <div className="player">
            <div>
              <div className="health-bar">
                <div id="player1"></div>
              </div>
              <p>HP {health1}</p>
            </div>
            <div>
              <img
                height={300}
                src={require(`../assets/${character}.jpg`)}
                alt={character}
              />
              <img
                height={150}
                src={require(`../assets/${pokemon}.jpg`)}
                alt={pokemon}
              />
            </div>
          </div>
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
            </div>
            <div>
              <img
                height={150}
                src={require(`../assets/${pokemon}.jpg`)}
                alt={pokemon}
                style={{
                  transform: "rotateY(180deg)",
                }}
              />
              <img
                height={300}
                src={require(`../assets/${character}.jpg`)}
                alt={character}
                style={{
                  transform: "rotateY(180deg)",
                }}
              />
            </div>
          </div>
        </div>
        <div>
          <div
            style={{
              width: "100%",
            }}
          >
            <button className="attack" onClick={decreaseHealth}>
              {moves[0]}
            </button>
            <button className="attack" onClick={decreaseHealth}>
              {moves[1]}
            </button>
          </div>
          <div>
            <button className="attack" onClick={decreaseHealth}>
              {moves[2]}
            </button>
            <button className="attack" onClick={decreaseHealth}>
              {moves[3]}
            </button>
          </div>
        </div>
      </div>

      <div id="message-container">Let the battle begin!</div>
    </div>
  );
}

export default Battle;