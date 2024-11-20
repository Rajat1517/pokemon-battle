import React, { useState,useContext } from "react";
import { UtilContext } from "../contexts/UtilContext";
function Selection({ selectables, text, setItem }) {
  const [active, setActive] = useState(0);
  const {experience}= useContext(UtilContext);

  const len = selectables.length;
  const next = () => {
    setActive((prev) => {
      let newIndex= (prev + 1 + len) % len;
      setItem(selectables[newIndex])
      return newIndex;
    });
  };

  const previous = () => {
    setActive((prev) => {
      let newIndex=(prev - 1 + len) % len;
      setItem(selectables[newIndex])
      return newIndex;
    });
  };

  return (
    <div className="selection-carousel">
      <p style={{margin:"0 0 2% 0"}}>
        {text +
          selectables[active].slice(0, 1).toUpperCase() +
          selectables[active].slice(1)}
        !
      </p>
      <div className="row">
        <button disabled={experience} className="navigation" onClick={previous}>
          ‹
        </button>
        <div>
          <img
            id="prev-image"
            src={require(`../assets/${
              selectables[(active - 1 + len) % len]
            }.jpg`)}
            alt={selectables[(active - 1 + len) % len]}
          />
          <div
            style={{
              display: "inline-flex",
              textAlign: "center",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              id="current-image"
              src={require(`../assets/${selectables[active]}.jpg`)}
              alt={selectables[active]}
            />
            <div className="shadow"></div>
          </div>
          <img
            id="next-image"
            src={require(`../assets/${
              selectables[(active + 1 + len) % len]
            }.jpg`)}
            alt={selectables[(active + 1 + len) % len]}
          />
        </div>
        <button disabled={experience} className="navigation" onClick={next}>
          ›
        </button>
      </div>
    </div>
  );
}

export default Selection;
