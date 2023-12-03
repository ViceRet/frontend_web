import React from "react";

function Casilla({ src, x, y, z }) {
  return (
    <img
      alt="piece of landscape"
      className="casilla"
      style={{ left: `${x}%`, top: `${y}%`, zIndex: z }}
      src={src}
    />
  );
}

export default Casilla;
