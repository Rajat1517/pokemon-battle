import React, { useState } from "react";

function Selection({ selectables, text }) {
  const [active, setActive] = useState(0);
  const len = selectables.length;
  const next = () => {
    setActive((prev) => {
      return (prev + 1 + len) % len;
    });
  };

  const previous = () => {
    setActive((prev) => {
      return (prev - 1 + len) % len;
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
        <button className="navigation" onClick={previous}>
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
              height={300}
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
        <button className="navigation" onClick={next}>
          ›
        </button>
      </div>
    </div>
  );
}

export default Selection;
