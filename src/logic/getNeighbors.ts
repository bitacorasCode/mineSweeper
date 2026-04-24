import type { Cell } from "../types/board"

export function getNeighbors(cells: Cell[][], rowIndex: number, columnIndex: number) {
    const neighborsCoords = [
        { i: rowIndex, j: columnIndex - 1 },
        { i: rowIndex, j: columnIndex + 1 },
        { i: rowIndex - 1, j: columnIndex },
        { i: rowIndex + 1, j: columnIndex },
        { i: rowIndex - 1, j: columnIndex - 1 },
        { i: rowIndex - 1, j: columnIndex + 1 },
        { i: rowIndex + 1, j: columnIndex - 1 },
        { i: rowIndex + 1, j: columnIndex + 1 }
    ]


    const neighbors = neighborsCoords.reduce((acc, { i, j }) => {
        if (cells[i]?.[j]) {
            acc.push(cells[i][j])
        }
        return acc
    }, [] as Cell[])

    return neighbors
}   