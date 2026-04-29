import type { Cell } from "../../../types/board"
import type { GameStatusEnum } from "../../../types/game"

export type CellProps = {
    cell: Cell,
    coords: { i: number, j: number },
    gameStatus: GameStatusEnum,
    onCellClick: (i: number, j: number) => void
}