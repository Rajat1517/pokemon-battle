import React, { useContext, useEffect } from "react";
import { UtilContext } from "../contexts/UtilContext";

function Splash() {
  const { loading, setLoading } = useContext(UtilContext);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });
  return (
    <div className="container" style={{height:"100%", width:"100%", backgroundColor: "rgba(200,200,200,1)"}}>
      {loading && (
        <img className="logo" src={require("../assets/pokemon_logo.png")} alt="Loading..." />
      )}
    </div>
  );
}

export default Splash;
