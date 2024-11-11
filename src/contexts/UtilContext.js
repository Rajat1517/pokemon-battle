import { createContext, useState } from "react";

export const UtilContext = createContext();

export const UtilProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [experience, setExperience] = useState(null);
  const [pokemon, setPokemon] = useState("pikachu");
  const [character, setCharacter] = useState("ash");
  const [moves, setMoves] = useState(null);
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
