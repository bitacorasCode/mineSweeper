export type Cell = {
    isBomb: boolean;
    isRevealed: boolean;
    bombsAside: number;
    isMarked: boolean;
    coords: { i: number, j: number }
}

export type Board = {
    columns: number;
    rows: number;
    bombs: number;
    cellsQuantity: number;
    cells: Cell[][]
}