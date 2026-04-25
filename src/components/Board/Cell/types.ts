import type { Cell } from "../../../types/board"
import type { GameStatusEnum } from "../../../types/game"

export type CellProps = {
    cell: Cell,
    coords: { i: number, j: number },
    isFlagClicked: boolean,
    gameStatus: GameStatusEnum,
    onCellClick: (i: number, j: number) => void
}