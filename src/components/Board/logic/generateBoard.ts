import { getNeighbors } from "../../../logic/getNeighbors";
import type { Board, Cell } from "../../../types/board";

export default function generateBoard({ columns, rows, bombs }: Pick<Board, 'columns' | 'rows' | 'bombs'>) {
    const board: Board = {
        columns,
        rows,
        bombs,
        cellsQuantity: columns * rows,
        cells: new Array(rows)
    }

    for (let i = 0; i < board.cells.length; i++) {
        board.cells[i] = new Array(columns);

        for (let j = 0; j < board.cells[i].length; j++) {
            const cell: Cell = {
                isBomb: false,
                isRevealed: false,
                bombsAside: 0,
                isMarked: false,
                coords: { i, j }
            };

            board.cells[i][j] = cell
        }
    }

    const addBombsAside = (rowIndex: number, columnIndex: number) => {
        const neighbors = getNeighbors(board.cells, rowIndex, columnIndex)

        neighbors.forEach((cell) => {
            if (!cell.isBomb) cell.bombsAside++
        })
    }

    for (let i = 0; i < bombs; i++) {
        const bombIndex = Math.floor(Math.random() * board.cellsQuantity)

        const rowIndex = Math.floor(bombIndex / columns)
        const columnIndex = bombIndex % columns

        const cell = board.cells[rowIndex][columnIndex]

        if (!cell.isBomb) {
            cell.isBomb = true

            addBombsAside(rowIndex, columnIndex)
        } else {
            i--
        }
    }

    return board
}