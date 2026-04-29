import { useState } from 'react';

import { DificultLevels } from '../config/gameSettings';
import { GameStatusEnum } from '../types/game';

export function useGameState() {
    const [difficult, setDifficult] = useState(DificultLevels.Easy);
    const [gameStatus, setGameStatus] = useState<GameStatusEnum>(GameStatusEnum.Playing);
    const [isFlagMode, setIsFlagMode] = useState(false);

    const resetGame = (level: DificultLevels) => {
        setDifficult(level);
        setGameStatus(GameStatusEnum.Playing);
    };

    const setGameWon = () => setGameStatus(GameStatusEnum.Won);
    const setGameLost = () => setGameStatus(GameStatusEnum.Lost);

    return {
        difficult,
        gameStatus,
        isFlagMode,
        resetGame,
        setGameWon,
        setGameLost,
        setIsFlagMode,
    };
}