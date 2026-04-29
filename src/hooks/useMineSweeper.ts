import { useCallback } from 'react';

import { DificultLevels } from '../config/gameSettings';
import { useBoardLogic } from './useBoardLogic';
import { useGameState } from './useGameState';

export function useMineSweeper() {
    const gameState = useGameState();
    const boardLogic = useBoardLogic(gameState.difficult);

    const resetBoard = useCallback((level: DificultLevels) => {
        gameState.resetGame(level);
        boardLogic.resetBoard(level);
    }, [gameState, boardLogic]);

    const handleClickCell = useCallback((rowIndex: number, columnIndex: number) => {
        boardLogic.handleClickCell(
            rowIndex,
            columnIndex,
            gameState.isFlagMode,
            gameState.gameStatus,
            gameState.setGameLost
        );
    }, [boardLogic, gameState]);

    const finishGame = useCallback(() => {
        if (boardLogic.checkWinCondition()) {
            gameState.setGameWon();
        } else {
            gameState.setGameLost();
        }
    }, [boardLogic, gameState]);

    return {
        board: boardLogic.board,
        difficult: gameState.difficult,
        markedBombs: boardLogic.markedBombs,
        gameStatus: gameState.gameStatus,
        isFlagMode: gameState.isFlagMode,
        resetBoard,
        handleClickCell,
        finishGame,
        setIsFlagMode: gameState.setIsFlagMode,
    };
}
