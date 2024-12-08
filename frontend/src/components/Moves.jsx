import React, { useContext, useState } from "react";
import { MOVES } from "../constants/pokemon";
import { UtilContext } from "../contexts/UtilContext";
import { useNavigate } from "react-router-dom";
import socket from "../utilities/socketConnection";


function Moves() {
  const { pokemon, setMoves, character, experience } = useContext(UtilContext);
  const [attacks, setAttacks] = useState(new Set());
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (attacks.size < 4) {
      window.alert(
        `${
          pokemon.slice(0, 1).toUpperCase() + pokemon.slice(1)
        } should learn 4 moves!`
      );
    } else if (attacks.size > 4) {
      window.alert(
        `${
          pokemon.slice(0, 1).toUpperCase() + pokemon.slice(1)
        } can learn 4 moves only!`
      );
    } 
    else {
      let temp = [];
      attacks.forEach((attack) => {
        temp.push({
          ...attack,
          level: Math.floor(Math.random() * 5) + 1,
        });
      });
      
      setMoves(temp);
      socket.emit("configure player",{
        avatar: character,
         experience,
         pokemon: {
          name: pokemon,
          moves:temp,
         }
      })
      navigate("/battle", { replace: true });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>{pokemon.slice(0, 1).toUpperCase() + pokemon.slice(1)} knows :</p>
      {MOVES[pokemon]?.map((move) => {
        return (
          <div key={move.name} className="row" style={{ width: "100%" }}>
            {move.name}
            <input
              style={{ width: "5%" }}
              type="checkbox"
              onClick={() => {
                if (!attacks.has(move)) {
                  setAttacks((prev) => {
                    let temp = prev;
                    temp.add(move);
                    return temp;
                  });
                } else {
                  setAttacks((prev) => {
                    let temp = prev;
                    temp.delete(move);
                    return temp;
                  });
                }
              }}
            />
          </div>
        );
      })}
      <button>Lets Battle</button>
    </form>
  );
}

export default Moves;
