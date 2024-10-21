import React, { useState } from "react";
import "../App.css";
function Configure() {
  const [pokemon, setPokemon] = useState("None");
  const [avatar, setAvatar] = useState("None");
  const [generatingExp, setGeneratingExp] = useState(false);
  const [experience, setExperience] = useState(null);

  const handlePokemon = async (e) => {
    // try{
    //     const res= await fetch(`https://pokeapi.co/api/v2/pokemon/${e.target.value}`);
    //     const data= await res.json();
    //     setPokemon(data?.sprites.front_default);
    // }catch(error){
    //     console.log(error);
    //     setPokemon(undefined)
    // }
    setPokemon(e.target.value);
  };

  const handleAvatar = (e) => {
    setAvatar(e.target.value);
  };

  const generateExperience = () => {
    setGeneratingExp(true);
    setTimeout(() => {
      const exp = ~~(Math.random() * 50) + ~~(Math.random() * 50);
      setExperience(exp);
      setGeneratingExp(false);
    }, 2000);
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <form>
        <label htmlFor="avatar">I will be </label>
        <select name="avatar" id="avatar" onChange={handleAvatar}>
          <option value="None">...</option>
          <option value="ash">Ash</option>
          <option value="may">May</option>
          <option value="misty">Misty</option>
          <option value="brock">Brock</option>
        </select>
      </form>
      {avatar !== "None" && (
        <img
          height={200}
          src={require(`../assets/${avatar}.jpg`)}
          alt={avatar}
        />
      )}
      <form>
        <label htmlFor="pokemon">I choose you, </label>
        <select name="pokemon" id="pokemon" onChange={handlePokemon}>
          <option value="None">...</option>
          <option value="pikachu">Pikachu</option>
          <option value="charmander">Charmander</option>
          <option value="bulbasaur">Bulbasaur</option>
          <option value="squirtle">Squirtle</option>
        </select>
      </form>
      {pokemon !== "None" && (
        <img
          height={150}
          src={require(`../assets/${pokemon}.jpg`)}
          alt={"pokemon"}
        />
      )}
      <div className={"path " + (generatingExp ? "" : "hidden")}>
        <img
          className="knob"
          src={require("../assets/pokeball.png")}
          width={30}
          alt="know"
        />
      </div>
      <button onClick={generateExperience}>Experience</button>
      {experience && <p>Exp: {experience}</p>}
    </div>
  );
}

export default Configure;
