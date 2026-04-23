import type { CellProps } from './types';

function Cell(props: CellProps) {
  const { cell, coords, isFlagClicked, isGameFinished, onCellClick } = props;

  if (cell.isRevealed || isGameFinished) {
    const elementToRender = () => {
      if (cell.isBomb) return '💥';
      return cell.bombsAside;
    };

    return (
      <div
        className={`clicked-cell ${isFlagClicked ? 'flag-cursor' : 'pointer-cursor'}`}
      >
        <span>{elementToRender()}</span>
        <span
          style={{
            position: 'absolute',
            opacity: 0.5,
          }}
        >
          {' '}
          {cell.isMarked && '🚩'}
        </span>
      </div>
    );
  } else {
    return (
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
}

export default Cell;
