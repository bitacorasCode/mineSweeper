import { GameStatusEnum } from '../../../types/game';
import type { CellProps } from './types';

function Cell(props: CellProps) {
  const { cell, coords, isFlagClicked, gameStatus, onCellClick } = props;

  return cell.isRevealed || gameStatus !== GameStatusEnum.Playing ? (
    <div
      className={`clicked-cell ${isFlagClicked ? 'flag-cursor' : 'pointer-cursor'}`}
    >
      <span>{cell.isBomb ? '💥' : cell.bombsAside}</span>
      {cell.isMarked && <span className='revealed-marked-cell'> 🚩</span>}
    </div>
  ) : (
    <div>
      <button
        onClick={() => onCellClick(coords.i, coords.j)}
        className={`cell-button ${isFlagClicked ? 'flag-cursor' : 'pointer-cursor'}`}
      >
        {cell.isMarked && '🚩'}
      </button>
    </div>
  );
}

export default Cell;
