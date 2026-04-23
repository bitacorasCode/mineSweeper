import type { Cell } from "../../../types/board/board"

export type CellProps = {
    cell: Cell,
    coords: { i: number, j: number },
    isFlagClicked: boolean,
    isGameFinished: boolean,
    onCellClick: (i: number, j: number) => void
}