import type { Cell } from "../types/board/board"

export default function clearCells(cells: Cell[][], i: number, j: number) {
    const iterationCases = [
        { i: i, j: j - 1 },
        { i: i, j: j + 1 },
        { i: i - 1, j: j },
        { i: i + 1, j: j },
        { i: i - 1, j: j - 1 },
        { i: i - 1, j: j + 1 },
        { i: i + 1, j: j - 1 },
        { i: i + 1, j: j + 1 }
    ]

    iterationCases.forEach(({ i, j }) => {
        if (cells[i]?.[j]) {
            handleClearCell(cells, i, j)
        }
    })
}

function handleClearCell(cells: Cell[][], i: number, j: number) {
    const cell = cells[i][j];

    if (cell.isRevealed || cell.isBomb || cell.isMarked) return

    if (cell.bombsAside === 0 && !cell.isRevealed) {
        cell.isRevealed = true

        clearCells(cells, i, j)
    }

    else
        cell.isRevealed = true
}