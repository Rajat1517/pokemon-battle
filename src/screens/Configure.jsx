import React, { useState } from "react";
import "../App.css";
import Selection from "../components/Selection";

function Configure() {
  const [generatingExp, setGeneratingExp] = useState(false);
  const [experience, setExperience] = useState(null);

  const generateExperience = () => {
    setGeneratingExp(true);
    setTimeout(() => {
      const exp = ~~(Math.random() * 50) + ~~(Math.random() * 50);
      setExperience(exp);
      setGeneratingExp(false);
    }, 2000);
  };

  return (
    <div style={{ width: "100%",textAlign:"center", height: "fit-content", backgroundColor:"rgba(200,200,200,1)" }}>
      <Selection selectables={["ash","misty","may","brock"]} text="I will be "/>
      <br /><br />
      <Selection selectables={["pikachu","charmander","squirtle","bulbasaur"]} text="I choose you, "/>
      <br /><br />
      <div className={"path " + (generatingExp ? "" : "hidden")}>
        <img
          className="knob"
          src={require("../assets/pokeball.png")}
          width={30}
          alt="knob"
        />
      </div>
      <button disabled={experience} onClick={generateExperience}>Experience</button>
      {experience && <p style={{margin:"0"}}>Exp: {experience}</p>}
    </div>
  );
}

export default Configure;
