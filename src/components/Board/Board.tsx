import gameDificult, { DificultLevels } from '../../config/gameSettings';
import { useMineSweeper } from '../../hooks/useMineSweeper';
import { GameStatusEnum } from '../../types/game';
import Cell from './Cell/Cell';

const cellWidth = 30;

function Board() {
  const {
    board,
    difficult,
    markedBombs,
    gameStatus,
    isFlagMode,
    resetBoard,
    handleClickCell,
    finishGame,
    setIsFlagMode,
  } = useMineSweeper();

  return (
    <div className='mine-sweeper-container'>
      <div className='game-status'>
        {gameStatus === GameStatusEnum.Playing && <span>Good Luck!</span>}
        {gameStatus === GameStatusEnum.Won && (
          <span className='status-won'>🎉 You Won!</span>
        )}
        {gameStatus === GameStatusEnum.Lost && (
          <span className='status-lost'>💥 You Lost!</span>
        )}
      </div>

      <div className='choose-dificult-section'>
        Choose difficult:
        <div className='dificult-buttons'>
          <button onClick={() => resetBoard(DificultLevels.Easy)}>Easy</button>
          <button onClick={() => resetBoard(DificultLevels.Medium)}>
            Medium
          </button>
          <button onClick={() => resetBoard(DificultLevels.Hard)}>Hard</button>
        </div>
      </div>

      <span>
        Bombs marked: {markedBombs} / {gameDificult[difficult].bombs}
      </span>

      <div className='board-buttons'>
        <button
          className={`select-marker-button ${isFlagMode ? 'selected-button' : ''}`}
          onClick={() => setIsFlagMode(true)}
        >
          🚩
        </button>
        <button
          className={`select-marker-button ${!isFlagMode ? 'selected-button' : ''}`}
          onClick={() => setIsFlagMode(false)}
        >
          🔍
        </button>
      </div>

      <section
        className='board'
        style={{
          gridTemplateColumns: `repeat(${gameDificult[difficult].columns}, 1fr)`,
          gridTemplateRows: `repeat(${gameDificult[difficult].rows}, 1fr)`,
          width: cellWidth * gameDificult[difficult].columns + 'px',
          height: cellWidth * gameDificult[difficult].rows + 'px',
        }}
      >
        {board.cells
          .map((row, i) =>
            row.map((cell, j) => (
              <Cell
                gameStatus={gameStatus}
                isFlagClicked={isFlagMode}
                onCellClick={handleClickCell}
                coords={{ i, j }}
                key={`${i}-${j}`}
                cell={cell}
              />
            )),
          )
          .flat()}
      </section>

      <div className='action-buttons'>
        <button onClick={() => resetBoard(difficult)}>Reset</button>
        <button
          disabled={gameStatus !== GameStatusEnum.Playing}
          onClick={finishGame}
        >
          Finish Game
        </button>
      </div>
    </div>
  );
}

export default Board;
