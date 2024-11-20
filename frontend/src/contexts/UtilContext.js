import { createContext, useState } from "react";

export const UtilContext = createContext();

export const UtilProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [experience, setExperience] = useState(null);
  const [pokemon, setPokemon] = useState("squirtle");
  const [character, setCharacter] = useState("misty");
  const [moves, setMoves] = useState(["Iron-tail","Thunderbolt","Quick-Attack","Body-Slam"]);
  return (
    <UtilContext.Provider
      value={{
        loading,
        setLoading,
        experience,
        setExperience,
        pokemon,
        setPokemon,
        character,
        setCharacter,
        moves,
        setMoves,
      }}
    >
      {children}
    </UtilContext.Provider>
  );
};