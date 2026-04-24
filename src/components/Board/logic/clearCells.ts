import { getNeighbors } from "../../../logic/getNeighbors";
import type { Cell } from "../../../types/board"

export default function clearCells(cells: Cell[][], rowIndex: number, columnIndex: number) {
    const neighbors = getNeighbors(cells, rowIndex, columnIndex)

    neighbors.forEach((cell) => {
        if (cell.isRevealed || cell.isBomb || cell.isMarked) return

        const { i, j } = cell.coords

        if (cell.bombsAside === 0 && !cell.isRevealed) {
            cell.isRevealed = true

            clearCells(cells, i, j)
        }

        else {
            cell.isRevealed = true
        }
    })
}