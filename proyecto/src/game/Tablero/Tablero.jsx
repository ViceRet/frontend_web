import React, { useEffect, useState } from "react";
import Landscape from './Landscape';
import PCat from './Pcat';


function Board(playerId, gameId) {
  const { jugadorId } = playerId;
  const { salaId } = gameId;


  return(
    <>
    <div className="world">
      <Landscape />
      <PCat n_player={4} x={0} y={0}/>
      <PCat n_player={3} x={0} y={0}/>
      <PCat n_player={2} x={0} y={0}/>
      <PCat n_player={1} x={0} y={0}/>
    </div>
    </>
  );
}

export default Board;
