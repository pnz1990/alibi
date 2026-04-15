# ALIBI — Murder Mystery Deduction

**Play now:** [pnz1990.github.io/alibi](https://pnz1990.github.io/alibi/)

A browser-based murder mystery logic deduction game. Place suspects on an illustrated floor plan, satisfy witness alibis, and name the killer.

## How to Play

1. Read the clue cards on the right sidebar
2. Click grid cells to place suspects using the radial menu
3. Satisfy all clues — completed clues show strikethrough
4. When all suspects are placed, the victim cell highlights
5. Click the victim cell to name the killer

## Game Modes

| Mode | Description |
|---|---|
| **Campaign** | 12 escalating cases across all 10 themes |
| **Quick Play** | Pick any theme and difficulty for an instant puzzle |
| **Daily Case** | Same worldwide puzzle every day — build your streak |

## Themes

10 settings, each with 3 difficulty variants (Easy/Medium/Hard):

Coffee Shop • Bookstore • Backyard • Holiday Mall • Restaurant •
Gym • Office • Garden Party • Hospital • Carnival

## Rules

- One suspect per row, one per column *(Rule of One)*
- Suspects can only be placed on floor and seat tiles
- The killer is the suspect sharing a room with the victim cell
- All 14+ clue types evaluated by pure logic — no guessing required

## Technical

- TypeScript + Vite — static SPA, no server
- HTML5 Canvas for the game grid; DOM for the sidebar and overlays
- All progress stored in localStorage
- Procedural generation: same seed + theme + difficulty = same puzzle

Built with the [otherness autonomous team framework](https://github.com/anomalyco/otherness).
Inspired by [Murdoku](https://murdoku.com) by Manuel Garand.

## Development

```bash
npm install
npm run dev        # http://localhost:5173/alibi/
npm test           # Vitest unit tests
npm run test:e2e   # Playwright e2e tests
npm run build      # Production build
```
