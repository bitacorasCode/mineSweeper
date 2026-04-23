export type Cell = {
    isBomb: boolean;
    isRevealed: boolean;
    bombsAside: number;
    isMarked: boolean;
}

export type Board = {
    columns: number;
    rows: number;
    bombs: number;
    cellsQuantity: number;
    cells: Cell[][]
}