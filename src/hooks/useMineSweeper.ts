import { useState } from 'react';

import generateBoard from '../components/Board/logic/generateBoard';
import revealCells from '../components/Board/logic/revealCells';
import gameDificult, { DificultLevels } from '../config/gameSettings';
import type { Board } from '../types/board';
import { GameStatusEnum } from '../types/game';

export function useMineSweeper() {
    const [board, setBoard] = useState<Board>(
        generateBoard(gameDificult[DificultLevels.Easy])
    );
    const [difficult, setDifficult] = useState(DificultLevels.Easy);
    const [markedBombs, setMarkedBombs] = useState(0);
    const [gameStatus, setGameStatus] = useState<GameStatusEnum>(GameStatusEnum.Playing);
    const [isFlagMode, setIsFlagMode] = useState(false);

    const resetBoard = (level: DificultLevels) => {
        setDifficult(level);
        const newBoard = generateBoard(gameDificult[level]);
        setBoard(newBoard);
        setMarkedBombs(0);
        setGameStatus(GameStatusEnum.Playing);
    };

    const handleClickCell = (rowIndex: number, columnIndex: number) => {
        const cell = board.cells[rowIndex][columnIndex];

        if (gameStatus !== GameStatusEnum.Playing || cell.isRevealed || (!isFlagMode && cell.isMarked)) return;

        const cellsCopy = board.cells.map((row) => [...row]);
        const cellCopy = { ...cell };

        if (isFlagMode) {
            cellCopy.isMarked = !cellCopy.isMarked;
            setMarkedBombs((prev) => (cellCopy.isMarked ? prev + 1 : prev - 1));
        } else {
            cellCopy.isRevealed = true;

            if (cellCopy.isBomb) {
                setGameStatus(GameStatusEnum.Lost);
                cellsCopy[rowIndex][columnIndex] = cellCopy;
                setBoard({ ...board, cells: cellsCopy });
                return;
            }

            if (cellCopy.bombsAside === 0) {
                revealCells(cellsCopy, rowIndex, columnIndex);
            }
        }

        cellsCopy[rowIndex][columnIndex] = cellCopy;
        setBoard({ ...board, cells: cellsCopy });
    };

    const finishGame = () => {
        const allBombsMarked = !board.cells.some((row) =>
            row.some((cell) => cell.isBomb && !cell.isMarked),
        );
        const allSafeRevealed = !board.cells.some((row) =>
            row.some((cell) => !cell.isBomb && !cell.isRevealed),
        );

        if (allBombsMarked && allSafeRevealed) {
            setGameStatus(GameStatusEnum.Won);
        } else {
            setGameStatus(GameStatusEnum.Lost);
        }
    };

    return {
        board,
        difficult,
        markedBombs,
        gameStatus,
        isFlagMode,
        resetBoard,
        handleClickCell,
        finishGame,
        setIsFlagMode,
    };
}
