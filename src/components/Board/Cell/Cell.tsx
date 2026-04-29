import { GameStatusEnum } from '../../../types/game';
import type { CellProps } from './types';

function Cell(props: CellProps) {
  const { cell, coords, gameStatus, onCellClick } = props;

  return cell.isRevealed || gameStatus !== GameStatusEnum.Playing ? (
    <div className={`clicked-cell ${''}`}>
      <span>{cell.isBomb ? '💥' : cell.bombsAside}</span>
      {cell.isMarked && <span className='revealed-marked-cell'> 🚩</span>}
    </div>
  ) : (
    <button
      onClick={() => onCellClick(coords.i, coords.j)}
      className={`cell-button ${''}`}
    >
      {cell.isMarked && '🚩'}
    </button>
  );
}

export default Cell;
