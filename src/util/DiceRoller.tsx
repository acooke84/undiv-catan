import React, { useState } from 'react';
import { Dice } from './Dice';


export interface DiceRollerProps {
  dice: Dice
}

function DiceRoller(props: DiceRollerProps) {
  const [previousRoll, setPreviousRoll] = useState<number>(0);
  const [rolls, setRolls] = useState<number[]>([]);

  const roll = () => {
    const newRoll = props.dice.roll();
    setRolls([...rolls, newRoll]);
    console.log(newRoll)
    setPreviousRoll(newRoll);
  }

  return (
    <div className='dice-roller flex justify-center m-8'>
      <div className='roll-button bg-gray-500 w-12'>
        <button onClick={roll}>{previousRoll}</button>
      </div>
    </div>
  );
};

export default DiceRoller;
