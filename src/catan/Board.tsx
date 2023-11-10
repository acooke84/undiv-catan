import { Dice } from '../util/Dice';
import Tile from './Tile';

export interface BoardProps {
  size: number,
  dice: Dice,
};

/**
 *   
 *  For board size n,
 *
 *  n |      tiles      |          roads          |        settlements        |
 *  ---------------------------------------------------------------------------
 *  1 |       1         |          2,2,2          |         1,2,2,1           |
 *  2 |     2,3,2       |      4,3,6,4,6,3,4      |     2,3,3,4,4,3,3,2       |
 *  3 |   3,4,5,4,3     | 6,4,8,5,10,6,10,5,8,4,6 | 3,4,4,5,5,6,6,5,5,4,4,3   |
 *
 */
function Board({ size, dice }: BoardProps) {
  const tiles = [];
  const BASE_TILES: number[] = [1];
  const BASE_ROADS: number[] = [2, 2, 2];
  const BASE_SETTLEMENTS: number[] = [1, 2, 2, 1];

  for (let i: number = 2; i <= size; i++) {
    // Tiles
    BASE_TILES.forEach((value, index, array) => { array[index] = value + 2; });
    BASE_TILES.unshift(i);
    BASE_TILES.push(i);

    //Roads


    // Settlements
    BASE_SETTLEMENTS.forEach((value, index, array) => { array[index] = value + 2; });
    BASE_SETTLEMENTS.unshift(i, i+1);
    BASE_SETTLEMENTS.push(i, i+1);
  }


  for (var rowCount of BASE_TILES) {
    const row = [];
    for (let i: number = 0; i < rowCount; i++) {
      row.push((<Tile dice={dice} key={rowCount + ',' + i}></Tile>));
    }

    tiles.push(row);
  }

  return (
    <div className='board flex-row'>
      {tiles.map((row, rowIndex) => (
        <div className='tileRow flex justify-center h-20' key={rowIndex}>
          {row}
        </div>
      ))}
    </div>
  )
};

export default Board;
