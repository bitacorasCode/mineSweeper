# Mine Sweeper

A classic Minesweeper game implemented in React with TypeScript and Vite. The goal is to clear a minefield without detonating any mines, marking suspicious squares with flags.

## Features

- **Dynamic Board**: Generates boards of different sizes with random mines.
- **Clearing Logic**: Automatically clears safe areas when an empty square is revealed.
- **Mine Counter**: Shows the number of remaining mines to flag.
- **Quick Restart**: Button to restart the game at any time.

## Technologies Used

- **React**: For building the user interface.
- **TypeScript**: For static typing and better development.
- **Vite**: For bundling and fast development.
- **ESLint**: For code linting.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ignacio-nd37/mineSweeper
   cd mine-sweeper
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open your browser at `http://localhost:5173` to play.

## Usage

- **Left-click**: Reveal or flag a square.
- The number on each revealed square indicates how many mines are in the adjacent squares.
- If you reveal a mine, you lose the game.
- Flag all mines to win.

## Project Structure

```
src/
├── components/
│   ├── Board/
│   │   ├── Board.tsx                # Main board container
│   │   ├── Cell/
│   │   │   ├── Cell.tsx             # Individual cell component
│   │   │   └── types.ts             # Cell prop types
│   │   └── logic/
│   │       ├── generateBoard.ts     # Board generation
│   │       └── revealCells.ts       # Recursive cell reveal logic
│   └── Button/
│       ├── Button.tsx               # Reusable button component
│       └── types.ts                 # Button prop types
├── config/
│   └── gameSettings.ts              # Game difficulty levels configuration
├── hooks/
│   ├── useMineSweeper.ts            # Main game orchestrator hook
│   ├── useGameState.ts              # Game state management hook
│   └── useBoardLogic.ts             # Board logic and cell interaction hook
├── logic/
│   └── getNeighbors.ts              # Helper for finding adjacent cells
├── types/
│   ├── board.ts                     # Board and cell types
│   └── game.ts                      # Game status enum
├── App.tsx                          # Root component
├── main.tsx                         # Vite entry point
└── index.css                        # Global styles
```

## Contributing

If you want to contribute to the project:

1. Fork the repository.
2. Create a branch for your feature (`git checkout -b feature/new-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Open a Pull Request.
