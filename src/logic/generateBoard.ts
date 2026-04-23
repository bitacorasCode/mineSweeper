import type { Board, Cell } from "../types/board/board";

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
                isMarked: false
            };

            board.cells[i][j] = cell
        }
    }

    const addBombsAside = (rowIndex: number, columnIndex: number) => {
        const upperCell = board.cells[rowIndex][columnIndex - 1]
        const lowerCell = board.cells[rowIndex][columnIndex + 1]
        const leftCell = board.cells[rowIndex - 1]?.[columnIndex]
        const rightCell = board.cells[rowIndex + 1]?.[columnIndex]
        const upperLeftCell = board.cells[rowIndex - 1]?.[columnIndex - 1]
        const upperRightCell = board.cells[rowIndex - 1]?.[columnIndex + 1]
        const lowerLeftCell = board.cells[rowIndex + 1]?.[columnIndex - 1]
        const lowerRightCell = board.cells[rowIndex + 1]?.[columnIndex + 1]

        if (upperCell) upperCell.bombsAside++
        if (lowerCell) lowerCell.bombsAside++
        if (leftCell) leftCell.bombsAside++
        if (rightCell) rightCell.bombsAside++
        if (upperLeftCell) upperLeftCell.bombsAside++
        if (upperRightCell) upperRightCell.bombsAside++
        if (lowerLeftCell) lowerLeftCell.bombsAside++
        if (lowerRightCell) lowerRightCell.bombsAside++
    }

    for (let i = 0; i < bombs; i++) {
        const randomNumber = Math.floor(Math.random() * board.cellsQuantity - 1)
        const bombIndex = randomNumber > -1 ? randomNumber : 0

        const rowIndex = Math.floor(bombIndex / rows)
        const columnIndex = bombIndex % columns

        if (!board.cells[rowIndex][columnIndex].isBomb) {
            board.cells[rowIndex][columnIndex].isBomb = true
            addBombsAside(rowIndex, columnIndex)
        } else {
            i--
        }
    }

    return board
}