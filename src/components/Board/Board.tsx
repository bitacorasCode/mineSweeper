import { useState } from 'react';

import gameDificult, { DificultLevels } from '../../config/gameSettings';
import Cell from './Cell/Cell';
import generateBoard from './logic/generateBoard';
import revealCells from './logic/revealCells';

const initialBoard = generateBoard(gameDificult[DificultLevels.Easy]);
const cellWidth = 30;

function Board() {
  const [board, setBoard] = useState(initialBoard);
  const [isGameFinished, setGameFinished] = useState(false);
  const [isFlagClicked, setIsFlagClicked] = useState(false);
  const [markedBombs, setMarkedBombs] = useState(0);
  const [dificult, setDificult] = useState(DificultLevels.Easy);

  const handleCellClick = (rowIndex: number, columnIndex: number) => {
    if (isGameFinished) return;

    const cell = board.cells[rowIndex][columnIndex];

    if (cell.isRevealed || (!isFlagClicked && cell.isMarked)) return;

    const boardCopy = { ...board };

    const cellsCopy = [...board.cells].map((row) => [...row]);

    const cellCopy = { ...cell };

    if (isFlagClicked) {
      cellCopy.isMarked = !cellCopy.isMarked;

      setMarkedBombs((x) => (cellCopy.isMarked ? x + 1 : x - 1));
    } else cellCopy.isRevealed = true;

    if (cellCopy.bombsAside === 0 && !isFlagClicked) {
      revealCells(cellsCopy, rowIndex, columnIndex);
    }

    cellsCopy[rowIndex][columnIndex] = cellCopy;

    boardCopy.cells = cellsCopy;

    setBoard(boardCopy);

    if (cellCopy.isBomb && cellCopy.isRevealed) {
      setTimeout(() => alert('explotaste'), 20);

      setGameFinished(true);
    }
  };

  const handleResetBoard = (level: DificultLevels) => {
    setDificult(level);

    const newBoard = generateBoard(gameDificult[level]);

    setBoard(newBoard);
    setGameFinished(false);
    setMarkedBombs(0);
  };

  const finishGameHandler = () => {
    const isGameWinned = !board.cells.some((row) =>
      row.some((cell) => cell.isBomb && !cell.isMarked),
    );

    if (isGameWinned) {
      setGameFinished(true);

      alert('Ganaste!');
    } else {
      setGameFinished(true);

      alert('Perdiste');
    }
  };

  return (
    <div className='mine-sweeper-container'>
      <div className='choose-dificult-section'>
        Choose dificult
        <div className='dificult-buttons'>
          <button onClick={() => handleResetBoard(0)}>Easy</button>
          <button onClick={() => handleResetBoard(1)}>Medium</button>
          <button onClick={() => handleResetBoard(2)}>Hard</button>
        </div>
      </div>
      <span>
        Bombs revealed: {markedBombs} / {gameDificult[dificult].bombs}
      </span>
      <div className='board-buttons'>
        <button
          className={`select-marker-button ${isFlagClicked ? 'selected-button' : ''}`}
          onClick={() => setIsFlagClicked(true)}
        >
          🚩
        </button>
        <button
          className={`select-marker-button ${!isFlagClicked ? 'selected-button' : ''}`}
          onClick={() => setIsFlagClicked(false)}
        >
          🔍
        </button>
      </div>

      <section
        className='board'
        style={{
          gridTemplateColumns: `repeat(${gameDificult[dificult].columns}, 1fr)`,
          gridTemplateRows: `repeat(${gameDificult[dificult].rows}, 1fr)`,
          width: cellWidth * gameDificult[dificult].columns + 'px',
          height: cellWidth * gameDificult[dificult].rows + 'px',
        }}
      >
        {board.cells
          .map((row, i) =>
            row.map((cell, j) => (
              <Cell
                isGameFinished={isGameFinished}
                isFlagClicked={isFlagClicked}
                onCellClick={handleCellClick}
                coords={{ i, j }}
                key={`${i}-${j}`}
                cell={cell}
              />
            )),
          )
          .flat()}
      </section>
      <div className='action-buttons'>
        <button onClick={() => handleResetBoard(dificult)}>Reset</button>
        <button
          disabled={
            markedBombs !== gameDificult[dificult].bombs || isGameFinished
          }
          onClick={finishGameHandler}
        >
          Finish Game
        </button>
      </div>
    </div>
  );
}

export default Board;
