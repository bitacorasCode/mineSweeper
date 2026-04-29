import gameDificult, { DificultLevels } from '../../config/gameSettings';
import { useMineSweeper } from '../../hooks/useMineSweeper';
import { GameStatusEnum } from '../../types/game';
import Button from '../Button/Button';
import Cell from './Cell/Cell';

const cellWidth = 30;
const gameDifficultEnumArray = Object.values(DificultLevels).filter(
  (value) => typeof value === 'string',
);

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

  const cursorClass = isFlagMode ? 'flag-cursor' : 'pointer-cursor';

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
          {gameDifficultEnumArray.map((level, i) => (
            <Button
              key={level}
              variant={difficult === i ? 'primary' : 'secondary'}
              onClick={() => resetBoard(i)}
            >
              {level}
            </Button>
          ))}
        </div>
      </div>

      <span>
        Bombs marked: {markedBombs} / {gameDificult[difficult].bombs}
      </span>

      <div className='board-buttons'>
        <Button
          variant={isFlagMode ? 'primary' : 'outline'}
          className={isFlagMode ? 'selected-button' : ''}
          onClick={() => setIsFlagMode(true)}
        >
          🚩
        </Button>
        <Button
          variant={!isFlagMode ? 'primary' : 'outline'}
          className={!isFlagMode ? 'selected-button' : ''}
          onClick={() => setIsFlagMode(false)}
        >
          🔍
        </Button>
      </div>

      <section
        className={`board ${cursorClass}`}
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
        <Button variant='secondary' onClick={() => resetBoard(difficult)}>
          Reset
        </Button>
        <Button
          variant='secondary'
          onClick={finishGame}
          disabled={gameStatus !== GameStatusEnum.Playing}
        >
          Finish Game
        </Button>
      </div>
    </div>
  );
}

export default Board;
