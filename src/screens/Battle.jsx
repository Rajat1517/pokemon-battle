import React, { useContext } from "react";
import { UtilContext } from "../contexts/UtilContext";

function Battle() {
  const { pokemon, character, moves } = useContext(UtilContext);
  return (
    <div>
      <div style={{
        position: "absolute",
        bottom: "10%",
        width: "100%",
        height: "80%",
        display: "flex",
        justifyContent: "flex-end",
        flexDirection: "column"
      }}>
        <div className="row" style={{height: "100%", margin: "0 3%"}}>
          <div className="player">
            <div className="health-bar"><div id="player1"></div></div>
            <div>
              <img height={300} src={require(`../assets/${character}.jpg`)} alt={character} />
              <img height={150} src={require(`../assets/${pokemon}.jpg`)} alt={pokemon} />
            </div>
          </div>
          <div className="player">
          <div className="health-bar"><div id="player1"></div></div>
            <div>
            <img height={150} src={require(`../assets/${pokemon}.jpg`)} alt={pokemon} style={{
                transform: "rotateY(180deg)"
              }}/>
            <img height={300} src={require(`../assets/${character}.jpg`)} alt={character}style={{
                transform: "rotateY(180deg)"
              }}/>
            </div>
          </div>
        </div>
        <div>
          <div
            style={{
              width: "100%",
            }}
          >
            <button className="attack">{moves[0]}</button>
            <button className="attack">{moves[1]}</button>
          </div>
          <div>
            <button className="attack">{moves[2]}</button>
            <button className="attack">{moves[3]}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Battle;
