import { createContext, useState } from "react";

export const UtilContext = createContext();

export const UtilProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [experience, setExperience] = useState(null);
  const [pokemon, setPokemon] = useState("pikachu");
  const [character, setCharacter] = useState("ash");
  const [room, setRoom] = useState("");
  const [moves, setMoves] = useState([
    {
      move: "Iron-tail",
      level: 3,
    },
    {
      move: "Thunderbolt",
      level: 3,
    },
    {
      move: "Quick-Attack",
      level: 3,
    },
    {
      move: "Body-Slam",
      level: 3,
    },
  ]);

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
        room,
        setRoom,
      }}
    >
      {children}
    </UtilContext.Provider>
  );
};
