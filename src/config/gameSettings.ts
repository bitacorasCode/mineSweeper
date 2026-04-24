import type { Board } from "../types/board"

export enum DificultLevels {
    Easy,
    Medium,
    Hard,
}


const gameDificult: Record<DificultLevels, Pick<Board, 'columns' | 'rows' | 'bombs'>> = {
    [DificultLevels.Easy]: { columns: 8, rows: 8, bombs: 10 },
    [DificultLevels.Medium]: { columns: 12, rows: 12, bombs: 25 },
    [DificultLevels.Hard]: { columns: 15, rows: 15, bombs: 40 },
}

export default gameDificult