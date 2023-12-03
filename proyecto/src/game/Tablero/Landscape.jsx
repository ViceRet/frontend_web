import React from "react";
import { WORLD_SIZE, TILE_ASPECT_RATIO, MAGIC_NUMBER, zone_1, zone_2, zone_3, zone_4, zone_e } from "./constants";
import Casilla from "./Casilla";

import grass1 from "/assets/img/tablero_img/grass0.png";
import grass2 from "/assets/img/tablero_img/grass2.png";
import grass3 from "/assets/img/tablero_img/grass3.png";

import special_grass from "/assets/img/tablero_img/especial.png";
import end_grass from "/assets/img/tablero_img/end.png";

const yOffset = ((MAGIC_NUMBER / WORLD_SIZE) * TILE_ASPECT_RATIO) / 1.8;
const tiles = [];
for (let i = WORLD_SIZE; i > 0; i--) {
  tiles.push(Array(WORLD_SIZE).fill("grass"));
}

function Landscape() {
  return (
    <>
      {
      tiles.map((row, y) => {
        const yBase = yOffset * y;
        const xBase = 50 - (100 / 18) * y;
        return row.map((tile, x) => {
          const z = x + 100;
          const xAbs = xBase + (50 / 9) * x;
          const yAbs = yBase + yOffset * x;
          let src;


          if (zone_1.some(arr => arr[0] === x && arr[1] === y)) {
            src = grass1
          }
          else if (zone_2.some(arr => arr[0] === x && arr[1] === y)){
            src = grass2;
          }
          else if (zone_3.some(arr => arr[0] === x && arr[1] === y)){
            src = grass3;
          }
          else if (zone_4.some(arr => arr[0] === x && arr[1] === y)){
            src = grass1;
          }
          else{
            src = end_grass;
          }
          if (zone_e.some(arr => arr[0] === x && arr[1] === y)){
            src = special_grass;
          }
          return <Casilla key={`${x}${y}`} src={src} x={xAbs} y={yAbs} z={z} />;
        });
      })}
    </>
  );
}

export default React.memo(Landscape);
