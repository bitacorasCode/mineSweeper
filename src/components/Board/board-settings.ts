import type { Board } from "../../types/board/board";
import { DificultLevels } from "./types";

const boardSettings: Record<DificultLevels, Pick<Board, 'columns' | 'rows' | 'bombs'>> = {
    [DificultLevels.Easy]: { columns: 8, rows: 8, bombs: 10 },
    [DificultLevels.Medium]: { columns: 12, rows: 12, bombs: 25 },
    [DificultLevels.Hard]: { columns: 15, rows: 15, bombs: 40 },
}

export default boardSettings