import React, { useState, useEffect } from "react";
import cat1 from "/assets/img/tablero_img/cat_1.png";
import cat2 from "/assets/img/tablero_img/cat_2.png";
import cat3 from "/assets/img/tablero_img/cat_3.png";
import cat4 from "/assets/img/tablero_img/cat_4.png";
import { WORLD_SIZE, TILE_ASPECT_RATIO, MAGIC_NUMBER, coordinates} from "./constants";
import axios from "axios";

function Pcat({x, y, n_player}) {
  // Estado local del componente
  const [cat, setCat] = useState({ x: 0, y: 0, dir: "right", n_player});

  let src;
  let xAjust = 0;
  let yAjust = 0;
  if (cat.n_player == 1){
    xAjust = +4;
    yAjust = -2;
    src = cat1;
  } else if (cat.n_player == 2){
    yAjust = 1;
    src = cat2;
  } else if (cat.n_player == 3){
    yAjust = -5;
    src = cat3;
  } else if (cat.n_player == 4){
    xAjust = -3;
    yAjust = -2;
    src = cat4;
  }

// Calcular la posición absoluta
  const yOffset = ((MAGIC_NUMBER / WORLD_SIZE) * TILE_ASPECT_RATIO) / 1.8;
  const yBase = yOffset * cat.y + yOffset / 1.8;
  const xBase = 50 - (100 / 18) * cat.y;
  const xAbs = xBase + (50 / 9) * cat.x +xAjust;
  const yAbs = yBase + yOffset * cat.x +yAjust;



  //Función de mmovimiento

    const modificarEstado = () => {
      const istheposition = (element) => element[0] == cat.x && element[1] == cat.y;
      let next_step = coordinates.findIndex(istheposition) + 1;
      let nex_x = coordinates[next_step][0]
      let nex_y = coordinates[next_step][1]
      setCat(prevCat => ({
        ...prevCat,
        x: nex_x,
        y: nex_y,
        dir: "down"
      }));
    }

  return (
    <img
      onClick={modificarEstado}
      alt="cat"
      className={"pcat"}
      style={{ top: `${yAbs}%`, left: `${xAbs}%` }}
      src={src}
    />
  );
}

export default Pcat;
