import { getNeighbors } from "../../../logic/getNeighbors";
import type { Cell } from "../../../types/board"

export default function revealCells(cells: Cell[][], row: number, column: number) {
    const neighbors = getNeighbors(cells, row, column)

    neighbors.forEach((cell) => {
        if (cell.isRevealed || cell.isBomb || cell.isMarked) return

        const { i, j } = cell.coords

        if (cell.bombsAside === 0 && !cell.isRevealed) {
            cell.isRevealed = true

            revealCells(cells, i, j)
        }

        else {
            cell.isRevealed = true
        }
    })
}