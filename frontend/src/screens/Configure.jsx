import React, { useContext, useState } from "react";
import "../App.css";
import Selection from "../components/Selection";
import { UtilContext } from "../contexts/UtilContext";
import Moves from "../components/Moves";

function Configure() {
  const [generatingExp, setGeneratingExp] = useState(false);
  const { experience, setExperience, setPokemon, setCharacter, room } =
    useContext(UtilContext);


  const generateExperience = () => {
    setGeneratingExp(true);
    setTimeout(() => {
      const exp = ~~(Math.random() * 50) + ~~(Math.random() * 50);
      setExperience(exp);
      setGeneratingExp(false);
    }, 2000);
  };

  return (
    <div
      style={{
        width: "100%",
        textAlign: "center",
        height: "fit-content",
        minHeight: "100vh",
        padding: "2% 0",
        backgroundColor: "rgba(200,200,200,1)",
        boxSizing: "content-box",
      }}
    >
      <h3>Room: {room}</h3>
      <div>
        <Selection
          selectables={["ash", "misty", "may", "brock"]}
          text="I will be "
          setItem={setCharacter}
        />
      </div>
      <div>
        <Selection
          selectables={["pikachu", "charmander", "squirtle", "bulbasaur"]}
          text="I choose you, "
          setItem={setPokemon}
        />
      </div>
      <div className={"path " + (generatingExp ? "" : "hidden")}>
        <img
          className="knob"
          src={require("../assets/pokeball.png")}
          width={30}
          alt="knob"
        />
      </div>
      <button disabled={experience} onClick={generateExperience}>
        Experience
      </button>
      {experience && <p style={{ margin: "0" }}>Experience : {experience}</p>}
      {experience && (
        <div style={{ padding: "0 35%", textAlign: "center" }}>
          <Moves/>
        </div>
      )}
    </div>
  );
}

export default Configure;
