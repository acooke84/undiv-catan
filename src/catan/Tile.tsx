import React, { useState } from 'react';
import { Resource } from './Common';
import { Dice } from '../util/Dice';

export interface TileProps {
  dice: Dice
};

function Tile({ dice }: TileProps) {
  const [resource, setResource] = useState(Resource.EMPTY);
  const [roll, setRoll] = useState(0)

  const changeResource = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setResource(event.target.value as Resource);
  }

  const changeRoll = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRoll(+event.target.value);
  }

  return (
    <div className='tile border-black border-2 w-20'>
      {(resource === Resource.EMPTY) && <select value={resource} onChange={changeResource}>
        {Object.entries(Resource).map(([_, res], index) => (
          <option value={res} key={res}>{res}</option>
        ))}
      </select>}
      <p>{resource}</p>
      {(resource !== Resource.EMPTY && roll === 0) && <select value={roll} onChange={changeRoll}>
        {dice.rolls.map((roll, _) => (
          <option value={roll} key={roll}>{roll}</option>
        ))}
      </select>}
      <h1>{roll !== 0 && roll}</h1>
    </div>
  )
};

export default Tile;
