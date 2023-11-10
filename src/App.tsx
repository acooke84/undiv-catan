import './App.css';
import Board from './catan/Board';
import { DefaultDice } from './util/Dice';
import DiceRoller from './util/DiceRoller';

function App() {
  return (
    <div className="App">
      <Board size={2} dice={DefaultDice}></Board>
      <DiceRoller dice={DefaultDice}/>
    </div>
  );
}

export default App;
