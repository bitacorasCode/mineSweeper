import { useCallback, useState } from 'react';

import generateBoard from '../components/Board/logic/generateBoard';
import revealCells from '../components/Board/logic/revealCells';
import gameDificult, { DificultLevels } from '../config/gameSettings';
import type { Board } from '../types/board';
import { GameStatusEnum } from '../types/game';

export function useBoardLogic(initialDifficulty: DificultLevels) {
    const [board, setBoard] = useState<Board>(
        generateBoard(gameDificult[initialDifficulty])
    );
    const [markedBombs, setMarkedBombs] = useState(0);

    const resetBoard = useCallback((level: DificultLevels) => {
        const newBoard = generateBoard(gameDificult[level]);
        setBoard(newBoard);
        setMarkedBombs(0);
    }, []);

    const handleClickCell = useCallback((
        rowIndex: number,
        columnIndex: number,
        isFlagMode: boolean,
        gameStatus: GameStatusEnum,
        onGameLost: () => void
    ) => {
        if (gameStatus !== GameStatusEnum.Playing) return;

        const cell = board.cells[rowIndex][columnIndex];
        if (cell.isRevealed || (!isFlagMode && cell.isMarked)) return;

        const cellsCopy = board.cells.map((row) => [...row]);
        const cellCopy = { ...cell };

        if (isFlagMode) {
            cellCopy.isMarked = !cellCopy.isMarked;
            setMarkedBombs((prev) => (cellCopy.isMarked ? prev + 1 : prev - 1));
        } else {
            cellCopy.isRevealed = true;

            if (cellCopy.isBomb) {
                onGameLost();
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
    }, [board]);

    const checkWinCondition = useCallback(() => {
        const allBombsMarked = !board.cells.some((row) =>
            row.some((cell) => cell.isBomb && !cell.isMarked),
        );
        const allSafeRevealed = !board.cells.some((row) =>
            row.some((cell) => !cell.isBomb && !cell.isRevealed),
        );

        return allBombsMarked && allSafeRevealed;
    }, [board]);

    return {
        board,
        markedBombs,
        resetBoard,
        handleClickCell,
        checkWinCondition,
    };
}