/**
 * Copyright 2026 The alibi Authors. Apache-2.0.
 *
 * AUTHORITATIVE FLOOR PLAN DEFINITIONS — ALL 30 VARIANTS
 *
 * These are hand-authored, not generated. The generator fills suspects and
 * clues into these layouts. Agents MUST NOT modify these floor plans without
 * a [NEEDS HUMAN] escalation — they are the product's visual identity.
 *
 * Tile type legend:
 *   "F"  = floor          (placeable)
 *   "W"  = wall           (impassable, unplaceable)
 *   "C"  = chair          (placeable seat)
 *   "S"  = sofa           (placeable seat)
 *   "B"  = bed            (placeable seat)
 *   "pL" = object:plant
 *   "tB" = object:table
 *   "sH" = object:shelf
 *   "cR" = object:cash-register
 *   "bB" = object:bar-counter
 *   "tV" = object:tv
 *   "cT" = object:counter
 *   "dK" = object:desk
 *   "pC" = object:photocopier
 *   "fB" = object:flower-bed
 *   "hB" = object:hospital-bed
 *   "mC" = object:medicine-cabinet
 *   "tR" = object:tree
 *   "tD" = object:teddy-bear
 *   "cH" = object:carousel-horse
 *   "tM" = object:treadmill
 *   "wT" = object:weight-rack
 *   "sT" = object:stall
 *   "jZ" = object:jacuzzi-tile  (water tile, not placeable)
 *
 * Layout: tiles[y][x] where y=row (0=top), x=col (0=left).
 * North = smaller y. South = larger y.
 *
 * INVARIANTS (enforced by src/themes/index.test.ts):
 *   1. validCols >= 4 (columns with ≥1 placeable cell)
 *   2. validRows >= validCols
 *   3. Every room has ≥1 placeable cell
 *   4. At least 3 rooms
 *   5. At least 2 landmark objects
 *   6. At least 2 seat tiles (for Medium/Hard onSeatTile clues)
 */

export type Tile =
  | "F" | "W" | "C" | "S" | "B"
  | "pL" | "tB" | "sH" | "cR" | "bB" | "tV" | "cT"
  | "dK" | "pC" | "fB" | "hB" | "mC" | "tR" | "tD"
  | "cH" | "tM" | "wT" | "sT" | "jZ";

export interface RoomDef {
  id: string;
  name: string;
  cells: Array<[number, number]>; // [x, y]
}

export interface LandmarkDef {
  id: string;
  name: string; // used verbatim in clue text: "beside the cash register"
  x: number;
  y: number;
}

export interface FloorPlanDef {
  width: number;
  height: number;
  tiles: Tile[][];
  rooms: RoomDef[];
  landmarks: LandmarkDef[];
}

// ─────────────────────────────────────────────
// THEME 1: THE COFFEE SHOP
// ─────────────────────────────────────────────

/**
 * Coffee Shop EASY — 5 columns × 6 rows — N=5 suspects
 * Rooms: Bar (top), Main Area (middle/bottom), Restroom (corner)
 *
 *   0    1    2    3    4
 * [ bB | bB | bB | W  | W  ]  y=0  (bar counter objects, wall right)
 * [ F  | F  | F  | C  | F  ]  y=1  BAR
 * [ pL | F  | C  | F  | F  ]  y=2  MAIN AREA
 * [ F  | C  | F  | F  | pL ]  y=3  MAIN AREA
 * [ F  | F  | F  | C  | F  ]  y=4  MAIN AREA
 * [ W  | cR | W  | F  | C  ]  y=5  RESTROOM (cols 3-4)
 *
 * validCols: 0,1,2,3,4 (all) = 5
 * validRows: 1,2,3,4,5 (row 0 has only objects/walls) = 5
 * N = min(5,5) = 5 ✓
 */
export const coffeeShopEasy: FloorPlanDef = {
  width: 5, height: 6,
  tiles: [
    ["bB","bB","bB","W", "W" ],
    ["F", "F", "F", "C", "F" ],
    ["pL","F", "C", "F", "F" ],
    ["F", "C", "F", "F", "pL"],
    ["F", "F", "F", "C", "F" ],
    ["W", "cR","W", "F", "C" ],
  ],
  rooms: [
    { id:"bar",       name:"Bar",
      cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[3,1],[4,1]] },
    { id:"main-area", name:"Main Area",
      cells:[[0,2],[1,2],[2,2],[3,2],[4,2],
             [0,3],[1,3],[2,3],[3,3],[4,3],
             [0,4],[1,4],[2,4],[3,4],[4,4]] },
    { id:"restroom",  name:"Restroom",
      cells:[[1,5],[3,5],[4,5]] },
  ],
  landmarks: [
    { id:"bar-counter",    name:"the bar counter",   x:0, y:0 },
    { id:"plant-entrance", name:"the plant",          x:0, y:2 },
    { id:"plant-corner",   name:"the plant",          x:4, y:3 },
    { id:"cash-register",  name:"the cash register", x:1, y:5 },
  ],
};

/**
 * Coffee Shop MEDIUM — 6 columns × 7 rows — N=6 suspects
 * Rooms: Bar, Main Area, Restroom
 *
 *   0    1    2    3    4    5
 * [ bB | bB | bB | bB | W  | W  ]  y=0
 * [ F  | F  | F  | F  | C  | F  ]  y=1  BAR
 * [ pL | F  | C  | F  | F  | F  ]  y=2  MAIN AREA
 * [ F  | S  | F  | pL | F  | C  ]  y=3  MAIN AREA
 * [ F  | F  | tB | F  | F  | F  ]  y=4  MAIN AREA
 * [ C  | F  | F  | F  | W  | F  ]  y=5  MAIN AREA (0-3) | RESTROOM (5)
 * [ W  | cR | W  | W  | W  | C  ]  y=6  RESTROOM (1,5)
 *
 * validCols: 0,1,2,3,4,5 = 6
 * validRows: 1,2,3,4,5,6 = 6 (row 0 has only objects/walls)
 * N = 6 ✓
 */
export const coffeeShopMedium: FloorPlanDef = {
  width: 6, height: 7,
  tiles: [
    ["bB","bB","bB","bB","W", "W" ],
    ["F", "F", "F", "F", "C", "F" ],
    ["pL","F", "C", "F", "F", "F" ],
    ["F", "S", "F", "pL","F", "C" ],
    ["F", "F", "tB","F", "F", "F" ],
    ["C", "F", "F", "F", "W", "F" ],
    ["W", "cR","W", "W", "W", "C" ],
  ],
  rooms: [
    { id:"bar",       name:"Bar",
      cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1]] },
    { id:"main-area", name:"Main Area",
      cells:[[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],
             [0,3],[1,3],[2,3],[3,3],[4,3],[5,3],
             [0,4],[1,4],[2,4],[3,4],[4,4],[5,4],
             [0,5],[1,5],[2,5],[3,5]] },
    { id:"restroom",  name:"Restroom",
      cells:[[1,6],[5,5],[5,6]] },
  ],
  landmarks: [
    { id:"bar-counter",   name:"the bar counter",  x:0, y:0 },
    { id:"plant-door",    name:"the plant",         x:0, y:2 },
    { id:"plant-corner",  name:"the plant",         x:3, y:3 },
    { id:"table",         name:"the table",         x:2, y:4 },
    { id:"cash-register", name:"the cash register", x:1, y:6 },
  ],
};

/**
 * Coffee Shop HARD — 7 columns × 8 rows — N=7 suspects
 * Rooms: Bar, Main Area, Restroom, Back Office
 *
 *   0    1    2    3    4    5    6
 * [ bB | bB | bB | bB | bB | W  | W  ]  y=0
 * [ F  | F  | F  | F  | F  | C  | F  ]  y=1  BAR
 * [ F  | C  | F  | pL | F  | F  | F  ]  y=2  BAR
 * [ pL | F  | S  | F  | C  | F  | pL ]  y=3  MAIN AREA
 * [ F  | F  | F  | tB | F  | F  | F  ]  y=4  MAIN AREA
 * [ F  | C  | F  | F  | F  | tB | C  ]  y=5  MAIN AREA
 * [ F  | F  | F  | F  | F  | W  | F  ]  y=6  MAIN AREA (0-4,6) | wall (5)
 * [ W  | cR | W  | F  | C  | W  | F  ]  y=7  RESTROOM(1) | BACK-OFFICE(3,4,6)
 *
 * validCols: 0,1,2,3,4,5,6 = 7
 * validRows: 1,2,3,4,5,6,7 = 7 (row 0 objects only)
 * N = 7 ✓
 */
export const coffeeShopHard: FloorPlanDef = {
  width: 7, height: 8,
  tiles: [
    ["bB","bB","bB","bB","bB","W", "W" ],
    ["F", "F", "F", "F", "F", "C", "F" ],
    ["F", "C", "F", "pL","F", "F", "F" ],
    ["pL","F", "S", "F", "C", "F", "pL"],
    ["F", "F", "F", "tB","F", "F", "F" ],
    ["F", "C", "F", "F", "F", "tB","C" ],
    ["F", "F", "F", "F", "F", "W", "F" ],
    ["W", "cR","W", "F", "C", "W", "F" ],
  ],
  rooms: [
    { id:"bar",         name:"Bar",
      cells:[[0,0],[1,0],[2,0],[3,0],[4,0],
             [0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],
             [0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2]] },
    { id:"main-area",   name:"Main Area",
      cells:[[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],
             [0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],
             [0,5],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5],
             [0,6],[1,6],[2,6],[3,6],[4,6],[6,6]] },
    { id:"restroom",    name:"Restroom",
      cells:[[1,7]] },
    { id:"back-office", name:"Back Office",
      cells:[[3,7],[4,7],[6,7]] },
  ],
  landmarks: [
    { id:"bar-counter",   name:"the bar counter",  x:0, y:0 },
    { id:"plant-1",       name:"the plant",         x:3, y:2 },
    { id:"plant-2",       name:"the plant",         x:0, y:3 },
    { id:"plant-3",       name:"the plant",         x:6, y:3 },
    { id:"table",         name:"the table",         x:3, y:4 },
    { id:"table-2",       name:"the small table",   x:5, y:5 },
    { id:"cash-register", name:"the cash register", x:1, y:7 },
  ],
};

// ─────────────────────────────────────────────
// THEME 2: THE BOOKSTORE
// ─────────────────────────────────────────────

/**
 * Bookstore EASY — 5×5 — N=5
 * Rooms: Crime Novels (top-left), Non-Fiction (top-right), Best Sellers (bottom-left),
 *        Romance Novels (bottom-right), Checkout (bottom strip)
 *
 *   0    1    2    3    4
 * [ sH | F  | W  | sH | sH ]  y=0  CRIME NOVELS (0-1) | NON-FICTION (3-4)
 * [ F  | F  | W  | F  | F  ]  y=1  CRIME NOVELS | NON-FICTION
 * [ sH | F  | tB | F  | sH ]  y=2  BEST SELLERS (0-1) | NON-FICTION/mid (2 table) | ROMANCE (3-4)
 * [ F  | F  | F  | F  | F  ]  y=3  BEST SELLERS | ROMANCE NOVELS
 * [ F  | cR | C  | F  | F  ]  y=4  CHECKOUT
 *
 * validCols: all 5 (check: col2 has F at y=3,4 and tB at y=2 — tB not placeable but F at y=3 is ✓)
 * validRows: all 5 ✓. N=5 ✓
 */
export const bookstoreEasy: FloorPlanDef = {
  width: 5, height: 5,
  tiles: [
    ["sH","F", "W", "sH","sH"],
    ["F", "F", "W", "F", "F" ],
    ["sH","F", "tB","F", "sH"],
    ["F", "F", "F", "F", "F" ],
    ["F", "cR","C", "F", "F" ],
  ],
  rooms: [
    { id:"crime-novels",    name:"Crime Novels",    cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2]] },
    { id:"non-fiction",     name:"Non-Fiction",     cells:[[3,0],[4,0],[3,1],[4,1],[3,2],[4,2]] },
    { id:"best-sellers",    name:"Best Sellers",    cells:[[0,3],[1,3],[2,3]] },
    { id:"romance-novels",  name:"Romance Novels",  cells:[[3,3],[4,3]] },
    { id:"checkout",        name:"Checkout",        cells:[[0,4],[1,4],[2,4],[3,4],[4,4]] },
  ],
  landmarks: [
    { id:"shelf-1",          name:"the shelf",          x:0, y:0 },
    { id:"shelf-2",          name:"the shelf",          x:3, y:0 },
    { id:"shelf-3",          name:"the shelf",          x:4, y:0 },
    { id:"shelf-4",          name:"the shelf",          x:0, y:2 },
    { id:"shelf-5",          name:"the shelf",          x:4, y:2 },
    { id:"table",            name:"the table",          x:2, y:2 },
    { id:"cash-register",    name:"the cash register",  x:1, y:4 },
  ],
};

/**
 * Bookstore MEDIUM — 6×6 — N=6
 * Adds Rare Books alcove.
 *
 *   0    1    2    3    4    5
 * [ sH | F  | W  | W  | sH | sH ]  y=0
 * [ F  | F  | W  | F  | F  | F  ]  y=1  CRIME | wall | NON-FICTION
 * [ sH | F  | F  | F  | F  | sH ]  y=2  CRIME/RARE(col2) | NON-FICTION
 * [ F  | F  | W  | F  | tB | F  ]  y=3  BEST SELLERS | wall | ROMANCE
 * [ F  | F  | F  | F  | F  | F  ]  y=4  BEST SELLERS (0-2) | ROMANCE (3-5)
 * [ F  | cR | C  | C  | F  | F  ]  y=5  CHECKOUT
 */
export const bookstoreMedium: FloorPlanDef = {
  width: 6, height: 6,
  tiles: [
    ["sH","F", "W", "W", "sH","sH"],
    ["F", "F", "W", "F", "F", "F" ],
    ["sH","F", "F", "F", "F", "sH"],
    ["F", "F", "W", "F", "tB","F" ],
    ["F", "F", "F", "F", "F", "F" ],
    ["F", "cR","C", "C", "F", "F" ],
  ],
  rooms: [
    { id:"crime-novels",   name:"Crime Novels",
      cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2]] },
    { id:"rare-books",     name:"Rare Books",
      cells:[[2,2],[3,2]] },
    { id:"non-fiction",    name:"Non-Fiction",
      cells:[[3,1],[4,1],[5,1],[3,2],[4,2],[5,2],[4,3],[5,3]] },
    { id:"best-sellers",   name:"Best Sellers",
      cells:[[0,3],[1,3],[0,4],[1,4],[2,4]] },
    { id:"romance-novels", name:"Romance Novels",
      cells:[[3,4],[4,4],[5,4]] },
    { id:"checkout",       name:"Checkout",
      cells:[[0,5],[1,5],[2,5],[3,5],[4,5],[5,5]] },
  ],
  landmarks: [
    { id:"shelf-1",        name:"the shelf",         x:0, y:0 },
    { id:"shelf-2",        name:"the shelf",         x:4, y:0 },
    { id:"shelf-3",        name:"the shelf",         x:5, y:0 },
    { id:"shelf-4",        name:"the shelf",         x:0, y:2 },
    { id:"shelf-5",        name:"the shelf",         x:5, y:2 },
    { id:"table",          name:"the table",         x:4, y:3 },
    { id:"cash-register",  name:"the cash register", x:1, y:5 },
  ],
};

/**
 * Bookstore HARD — 7×7 — N=7
 *
 *   0    1    2    3    4    5    6
 * [ sH | F  | F  | W  | sH | sH | sH ]  y=0  CRIME | NON-FICTION
 * [ F  | F  | sH | W  | F  | F  | F  ]  y=1  CRIME | NON-FICTION
 * [ sH | F  | F  | tB | F  | F  | sH ]  y=2  CRIME(0-1)/RARE(2-3)/NON-FIC(4-6)
 * [ F  | F  | W  | W  | F  | tB | F  ]  y=3  BEST SEL | wall | ROMANCE
 * [ sH | F  | F  | F  | F  | F  | F  ]  y=4  BEST SEL (0-2) | ROMANCE (3-6)
 * [ F  | F  | F  | F  | F  | F  | sH ]  y=5  BEST SEL (0-2) | ROMANCE (3-5) | COLLECTOR'S
 * [ F  | cR | C  | C  | C  | F  | F  ]  y=6  CHECKOUT
 */
export const bookstoreHard: FloorPlanDef = {
  width: 7, height: 7,
  tiles: [
    ["sH","F", "F", "W", "sH","sH","sH"],
    ["F", "F", "sH","W", "F", "F", "F" ],
    ["sH","F", "F", "tB","F", "F", "sH"],
    ["F", "F", "W", "W", "F", "tB","F" ],
    ["sH","F", "F", "F", "F", "F", "F" ],
    ["F", "F", "F", "F", "F", "F", "sH"],
    ["F", "cR","C", "C", "C", "F", "F" ],
  ],
  rooms: [
    { id:"crime-novels",    name:"Crime Novels",
      cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[0,2],[1,2],[2,2]] },
    { id:"non-fiction",     name:"Non-Fiction",
      cells:[[4,0],[5,0],[6,0],[4,1],[5,1],[6,1],[4,2],[5,2],[6,2]] },
    { id:"rare-books",      name:"Rare Books",
      cells:[[2,1],[3,2]] },
    { id:"best-sellers",    name:"Best Sellers",
      cells:[[0,3],[1,3],[0,4],[1,4],[2,4],[0,5],[1,5],[2,5]] },
    { id:"romance-novels",  name:"Romance Novels",
      cells:[[4,3],[5,3],[6,3],[3,4],[4,4],[5,4],[6,4],[3,5],[4,5],[5,5]] },
    { id:"collectors",      name:"Collector's Corner",
      cells:[[6,5]] },
    { id:"checkout",        name:"Checkout",
      cells:[[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6]] },
  ],
  landmarks: [
    { id:"shelf-crime",    name:"the shelf",          x:0, y:0 },
    { id:"shelf-nonfic-1", name:"the shelf",          x:4, y:0 },
    { id:"shelf-nonfic-2", name:"the shelf",          x:5, y:0 },
    { id:"shelf-nonfic-3", name:"the shelf",          x:6, y:0 },
    { id:"shelf-crime-2",  name:"the shelf",          x:0, y:2 },
    { id:"shelf-nonfic-4", name:"the shelf",          x:6, y:2 },
    { id:"table-1",        name:"the reading table",  x:3, y:2 },
    { id:"table-2",        name:"the table",          x:5, y:3 },
    { id:"shelf-best",     name:"the shelf",          x:0, y:4 },
    { id:"shelf-collect",  name:"the shelf",          x:6, y:5 },
    { id:"cash-register",  name:"the cash register",  x:1, y:6 },
  ],
};

// ─────────────────────────────────────────────
// THEME 3: THE BACKYARD
// ─────────────────────────────────────────────

/**
 * Backyard EASY — 5×5 — N=5
 * Rooms: Backyard (large open), Jacuzzi (top-right 2×2), Deck (narrow strip)
 *
 *   0    1    2    3    4
 * [ pL | F  | W  | jZ | jZ ]  y=0  BACKYARD(0-1) | wall | JACUZZI(3-4)
 * [ F  | F  | W  | jZ | C  ]  y=1  BACKYARD | wall | JACUZZI (chair beside)
 * [ pL | F  | F  | F  | F  ]  y=2  BACKYARD | DECK (transition)
 * [ F  | C  | F  | F  | pL ]  y=3  BACKYARD
 * [ F  | F  | F  | C  | F  ]  y=4  BACKYARD
 *
 * validCols: need to check col2. col2: y=0,1 are W; y=2,3,4 are F → valid ✓
 * validRows: all 5 ✓. N=5 ✓
 */
export const backyardEasy: FloorPlanDef = {
  width: 5, height: 5,
  tiles: [
    ["pL","F", "W", "jZ","jZ"],
    ["F", "F", "W", "jZ","C" ],
    ["pL","F", "F", "F", "F" ],
    ["F", "C", "F", "F", "pL"],
    ["F", "F", "F", "C", "F" ],
  ],
  rooms: [
    { id:"backyard", name:"Backyard",
      cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2],[3,2],[4,2],
             [0,3],[1,3],[2,3],[3,3],[4,3],[0,4],[1,4],[2,4],[3,4],[4,4]] },
    { id:"jacuzzi",  name:"Jacuzzi",
      cells:[[3,0],[4,0],[3,1],[4,1]] },
  ],
  landmarks: [
    { id:"plant-1",  name:"the plant",  x:0, y:0 },
    { id:"plant-2",  name:"the plant",  x:0, y:2 },
    { id:"plant-3",  name:"the plant",  x:4, y:3 },
    { id:"jacuzzi",  name:"the jacuzzi", x:3, y:0 },
  ],
};

/**
 * Backyard MEDIUM — 6×7 — N=6
 * Rooms: Backyard, Jacuzzi, Deck, Bedroom, Living Room
 *
 *   0    1    2    3    4    5
 * [ pL | F  | F  | W  | jZ | jZ ]  y=0  BACKYARD(0-2) | JACUZZI(4-5)
 * [ F  | F  | F  | W  | jZ | C  ]  y=1  BACKYARD | JACUZZI
 * [ F  | pL | F  | F  | F  | F  ]  y=2  BACKYARD | DECK(3-5)
 * [ W  | W  | W  | W  | W  | W  ]  y=3  wall divider — interior wall
 * [ B  | F  | F  | S  | F  | F  ]  y=4  BEDROOM(0-2) | LIVING ROOM(3-5)
 * [ F  | F  | tV | F  | F  | F  ]  y=5  BEDROOM | LIVING ROOM
 * [ F  | F  | W  | F  | C  | F  ]  y=6  BEDROOM(0-1) | LIVING ROOM(3-5)
 *
 * Row 3 all W → not valid. Valid rows: 0,1,2,4,5,6 = 6 ✓
 * validCols: col2 — y=3 is W, y=6 is W; but y=0,1,2,4,5 are F → valid ✓
 * All 6 cols valid. N = min(6,6) = 6 ✓
 */
export const backyardMedium: FloorPlanDef = {
  width: 6, height: 7,
  tiles: [
    ["pL","F", "F", "W", "jZ","jZ"],
    ["F", "F", "F", "W", "jZ","C" ],
    ["F", "pL","F", "F", "F", "F" ],
    ["W", "W", "W", "W", "W", "W" ],
    ["B", "F", "F", "S", "F", "F" ],
    ["F", "F", "tV","F", "F", "F" ],
    ["F", "F", "W", "F", "C", "F" ],
  ],
  rooms: [
    { id:"backyard",    name:"Backyard",
      cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2]] },
    { id:"jacuzzi",     name:"Jacuzzi",
      cells:[[4,0],[5,0],[4,1],[5,1]] },
    { id:"deck",        name:"Deck",
      cells:[[3,2],[4,2],[5,2]] },
    { id:"bedroom",     name:"Bedroom",
      cells:[[0,4],[1,4],[2,4],[0,5],[1,5],[2,5],[0,6],[1,6]] },
    { id:"living-room", name:"Living Room",
      cells:[[3,4],[4,4],[5,4],[3,5],[4,5],[5,5],[3,6],[4,6],[5,6]] },
  ],
  landmarks: [
    { id:"plant-1",  name:"the plant",  x:0, y:0 },
    { id:"plant-2",  name:"the plant",  x:1, y:2 },
    { id:"jacuzzi",  name:"the jacuzzi", x:4, y:0 },
    { id:"tv",       name:"the TV",     x:2, y:5 },
  ],
};

/**
 * Backyard HARD — 7×8 — N=7
 * Rooms: Backyard, Jacuzzi, Deck, Bedroom, Living Room, Kitchen, Garage
 *
 *   0    1    2    3    4    5    6
 * [ pL | F  | F  | F  | W  | jZ | jZ ]  y=0  BACKYARD(0-3) | JACUZZI(5-6)
 * [ F  | F  | pL | F  | W  | jZ | C  ]  y=1  BACKYARD | JACUZZI
 * [ F  | F  | F  | F  | F  | C  | F  ]  y=2  BACKYARD(0-3) | DECK(4-6)
 * [ W  | W  | W  | W  | W  | W  | W  ]  y=3  interior wall
 * [ B  | F  | F  | S  | F  | F  | W  ]  y=4  BEDROOM(0-2) | LIVING ROOM(3-5)
 * [ F  | F  | tV | F  | F  | pL | W  ]  y=5  BEDROOM | LIVING ROOM
 * [ W  | W  | W  | cT | F  | F  | W  ]  y=6  KITCHEN(3-5)
 * [ W  | W  | F  | F  | F  | W  | W  ]  y=7  KITCHEN(2-4) / GARAGE area
 *
 * Valid rows: 0,1,2,4,5,6,7 = 7 (row 3 all W)
 * Valid cols: check col6 — y=0,1 jZ objects; y=2 F; y=3 W; y=4,5,6,7 W/W/W/W → col6 has y=2 as F ✓
 * All 7 cols valid. N = 7 ✓
 */
export const backyardHard: FloorPlanDef = {
  width: 7, height: 8,
  tiles: [
    ["pL","F", "F", "F", "W", "jZ","jZ"],
    ["F", "F", "pL","F", "W", "jZ","C" ],
    ["F", "F", "F", "F", "F", "C", "F" ],
    ["W", "W", "W", "W", "W", "W", "W" ],
    ["B", "F", "F", "S", "F", "F", "W" ],
    ["F", "F", "tV","F", "F", "pL","W" ],
    ["W", "W", "W", "cT","F", "F", "W" ],
    ["W", "W", "F", "F", "F", "W", "W" ],
  ],
  rooms: [
    { id:"backyard",    name:"Backyard",
      cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[0,2],[1,2],[2,2],[3,2]] },
    { id:"jacuzzi",     name:"Jacuzzi",
      cells:[[5,0],[6,0],[5,1],[6,1]] },
    { id:"deck",        name:"Deck",
      cells:[[4,2],[5,2],[6,2]] },
    { id:"bedroom",     name:"Bedroom",
      cells:[[0,4],[1,4],[2,4],[0,5],[1,5],[2,5]] },
    { id:"living-room", name:"Living Room",
      cells:[[3,4],[4,4],[5,4],[3,5],[4,5],[5,5]] },
    { id:"kitchen",     name:"Kitchen",
      cells:[[3,6],[4,6],[5,6],[2,7],[3,7],[4,7]] },
  ],
  landmarks: [
    { id:"plant-1",   name:"the plant",    x:0, y:0 },
    { id:"plant-2",   name:"the plant",    x:2, y:1 },
    { id:"plant-3",   name:"the plant",    x:5, y:5 },
    { id:"jacuzzi",   name:"the jacuzzi",  x:5, y:0 },
    { id:"tv",        name:"the TV",       x:2, y:5 },
    { id:"counter",   name:"the counter",  x:3, y:6 },
  ],
};

// ─────────────────────────────────────────────
// THEMES 4–10: STRUCTURAL DEFINITIONS
// (Full tile arrays authored here; name sets in theme modules)
// ─────────────────────────────────────────────

/**
 * Holiday Mall EASY — 5×6 — N=5
 * Rooms: Electronics, Santa's Village, Toy Store, Walkway
 *
 *   0    1    2    3    4
 * [ sT | F  | F  | F  | sT ]  y=0  ELECTRONICS(0-1) | SANTA(2-3) | TOY(4)
 * [ F  | F  | W  | F  | F  ]  y=1  ELECTRONICS | wall-post | TOY
 * [ F  | F  | F  | F  | F  ]  y=2  WALKWAY (full row)
 * [ tD | F  | F  | F  | sH ]  y=3  SANTA'S VILLAGE(0-2) | BOOKSTORE(3-4)
 * [ F  | C  | F  | F  | F  ]  y=4  SANTA'S VILLAGE | BOOKSTORE
 * [ F  | F  | W  | cR | F  ]  y=5  COFFEE SHOP(0-1) | wall | COFFEE SHOP(3-4)
 */
export const holidayMallEasy: FloorPlanDef = {
  width: 5, height: 6,
  tiles: [
    ["sT","F", "F", "F", "sT"],
    ["F", "F", "W", "F", "F" ],
    ["F", "F", "F", "F", "F" ],
    ["tD","F", "F", "F", "sH"],
    ["F", "C", "F", "F", "F" ],
    ["F", "F", "W", "cR","F" ],
  ],
  rooms: [
    { id:"electronics",    name:"Electronics",
      cells:[[0,0],[1,0],[0,1],[1,1]] },
    { id:"santas-village", name:"Santa's Village",
      cells:[[2,0],[3,0],[3,1],[0,3],[1,3],[2,3],[0,4],[1,4],[2,4]] },
    { id:"toy-store",      name:"Toy Store",
      cells:[[4,0],[4,1]] },
    { id:"walkway",        name:"Walkway",
      cells:[[0,2],[1,2],[2,2],[3,2],[4,2]] },
    { id:"bookstore",      name:"Bookstore",
      cells:[[3,3],[4,3],[3,4],[4,4]] },
    { id:"coffee-shop",    name:"Coffee Shop",
      cells:[[0,5],[1,5],[3,5],[4,5]] },
  ],
  landmarks: [
    { id:"stall-1",        name:"the stall",          x:0, y:0 },
    { id:"stall-2",        name:"the stall",          x:4, y:0 },
    { id:"teddy-bear",     name:"the teddy bear",     x:0, y:3 },
    { id:"shelf",          name:"the shelf",          x:4, y:3 },
    { id:"cash-register",  name:"the cash register",  x:3, y:5 },
  ],
};

/**
 * Holiday Mall MEDIUM — 7×7 — N=7
 */
export const holidayMallMedium: FloorPlanDef = {
  width: 7, height: 7,
  tiles: [
    ["sT","F", "F", "W", "F", "F", "sT"],
    ["F", "F", "W", "F", "F", "F", "F" ],
    ["F", "F", "F", "F", "F", "W", "F" ],
    ["F", "F", "F", "F", "F", "F", "F" ],
    ["tD","F", "F", "W", "F", "sH","F" ],
    ["F", "C", "F", "W", "F", "F", "C" ],
    ["F", "F", "W", "F", "cR","F", "F" ],
  ],
  rooms: [
    { id:"electronics",     name:"Electronics",
      cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2]] },
    { id:"santas-village",  name:"Santa's Village",
      cells:[[3,1],[4,1],[5,1],[6,1],[3,2],[4,2],[5,2]] },
    { id:"santas-lodge",    name:"Santa's Lodge",
      cells:[[4,0],[5,0],[6,0]] },
    { id:"toy-store",       name:"Toy Store",
      cells:[[6,2],[5,3],[6,3],[4,4],[5,4],[6,4],[5,5],[6,5]] },
    { id:"walkway",         name:"Walkway",
      cells:[[0,3],[1,3],[2,3],[3,3],[4,3]] },
    { id:"food-court",      name:"Food Court",
      cells:[[0,4],[1,4],[2,4],[0,5],[1,5],[2,5]] },
    { id:"coffee-shop",     name:"Coffee Shop",
      cells:[[0,6],[1,6],[3,6],[4,6],[5,6],[6,6]] },
  ],
  landmarks: [
    { id:"stall-1",        name:"the stall",          x:0, y:0 },
    { id:"stall-2",        name:"the stall",          x:6, y:0 },
    { id:"teddy-bear",     name:"the teddy bear",     x:0, y:4 },
    { id:"shelf",          name:"the shelf",          x:5, y:4 },
    { id:"cash-register",  name:"the cash register",  x:4, y:6 },
  ],
};

/**
 * Holiday Mall HARD — 8×8 — N=8
 */
export const holidayMallHard: FloorPlanDef = {
  width: 8, height: 8,
  tiles: [
    ["sT","F","F","W","F","F","F","sT"],
    ["F","F","W","F","F","F","F","F"],
    ["F","F","F","F","F","W","F","F"],
    ["F","F","F","F","F","F","F","F"],
    ["tD","F","F","W","F","sH","F","F"],
    ["F","C","F","W","F","F","C","F"],
    ["F","F","W","F","cR","F","F","F"],
    ["F","F","F","F","F","F","F","tR"],
  ],
  rooms: [
    { id:"electronics",    name:"Electronics",
      cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[0,3],[1,3]] },
    { id:"santas-lodge",   name:"Santa's Lodge",
      cells:[[4,0],[5,0],[6,0],[7,0],[4,1],[5,1],[6,1],[7,1]] },
    { id:"santas-village", name:"Santa's Village",
      cells:[[3,1],[3,2],[4,2],[5,2],[3,3],[4,3],[5,3]] },
    { id:"toy-store",      name:"Toy Store",
      cells:[[6,2],[7,2],[6,3],[7,3],[6,4],[7,4],[6,5],[7,5]] },
    { id:"walkway",        name:"Walkway",
      cells:[[2,2],[2,3],[2,4],[3,4],[4,4],[2,5],[2,6]] },
    { id:"food-court",     name:"Food Court",
      cells:[[0,4],[1,4],[0,5],[1,5],[0,6],[1,6],[0,7],[1,7],[2,7]] },
    { id:"bookstore",      name:"Bookstore",
      cells:[[5,4],[5,5],[4,6],[5,6],[6,6],[7,6]] },
    { id:"coffee-shop",    name:"Coffee Shop",
      cells:[[3,6],[3,7],[4,7],[5,7],[6,7],[7,7]] },
  ],
  landmarks: [
    { id:"stall-1",        name:"the stall",          x:0, y:0 },
    { id:"stall-2",        name:"the stall",          x:7, y:0 },
    { id:"teddy-bear",     name:"the teddy bear",     x:0, y:4 },
    { id:"shelf",          name:"the shelf",          x:5, y:4 },
    { id:"cash-register",  name:"the cash register",  x:4, y:6 },
    { id:"tree",           name:"the Christmas tree", x:7, y:7 },
  ],
};

// ─────────────────────────────────────────────
// THEME 5–10: STRUCTURAL FLOOR PLANS
// Restaurant, Gym, Office, Garden Party, Hospital, Carnival
// Each follows the same pattern. Full tile arrays below.
// ─────────────────────────────────────────────

/** Restaurant EASY — 5×5 — N=5 */
export const restaurantEasy: FloorPlanDef = {
  width:5, height:5,
  tiles:[
    ["cT","cT","W","F","C"],
    ["F","F","W","F","F"],
    ["F","C","F","F","F"],
    ["W","W","W","W","W"],
    ["F","F","F","C","F"],
  ],
  rooms:[
    {id:"kitchen",     name:"Kitchen",      cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2]]},
    {id:"dining-room", name:"Dining Room",  cells:[[3,0],[4,0],[3,1],[4,1],[2,2],[3,2],[4,2]]},
    {id:"bar",         name:"Bar",          cells:[[2,1]]},
    {id:"restroom",    name:"Restroom",     cells:[[0,4],[1,4],[2,4],[3,4],[4,4]]},
  ],
  landmarks:[
    {id:"counter",name:"the counter",x:0,y:0},
    {id:"counter-2",name:"the counter",x:1,y:0},
  ],
};
/** Restaurant MEDIUM — 6×6 — N=6 */
export const restaurantMedium: FloorPlanDef = {
  width:6, height:6,
  tiles:[
    ["cT","cT","cT","W","F","C"],
    ["F","F","F","W","F","F"],
    ["F","C","F","F","F","F"],
    ["F","F","F","F","C","F"],
    ["W","W","W","W","W","W"],
    ["F","F","F","C","F","F"],
  ],
  rooms:[
    {id:"kitchen",       name:"Kitchen",       cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2],[0,3],[1,3],[2,3]]},
    {id:"dining-room",   name:"Dining Room",   cells:[[4,0],[5,0],[4,1],[5,1],[3,2],[4,2],[5,2],[3,3],[4,3],[5,3]]},
    {id:"bar",           name:"Bar",           cells:[[3,1]]},
    {id:"private-room",  name:"Private Room",  cells:[[0,5],[1,5],[2,5],[3,5],[4,5],[5,5]]},
  ],
  landmarks:[
    {id:"counter",name:"the counter",x:0,y:0},
    {id:"counter-2",name:"the counter",x:1,y:0},
    {id:"counter-3",name:"the counter",x:2,y:0},
  ],
};
/** Restaurant HARD — 7×7 — N=7 */
export const restaurantHard: FloorPlanDef = {
  width:7, height:7,
  tiles:[
    ["cT","cT","cT","cT","W","F","C"],
    ["F","F","F","F","W","F","F"],
    ["F","C","F","F","F","F","F"],
    ["F","F","F","F","C","F","F"],
    ["F","F","F","F","F","F","F"],
    ["W","W","W","W","W","W","W"],
    ["F","F","C","F","F","C","F"],
  ],
  rooms:[
    {id:"kitchen",      name:"Kitchen",      cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[0,2],[1,2],[2,2],[3,2],[0,3],[1,3],[2,3],[3,3]]},
    {id:"dining-room",  name:"Dining Room",  cells:[[5,0],[6,0],[5,1],[6,1],[4,2],[5,2],[6,2],[4,3],[5,3],[6,3],[4,4],[5,4],[6,4]]},
    {id:"bar",          name:"Bar",          cells:[[4,1],[0,4],[1,4],[2,4],[3,4]]},
    {id:"restroom",     name:"Restroom",     cells:[[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6]]},
  ],
  landmarks:[
    {id:"counter",name:"the counter",x:0,y:0},
    {id:"counter-2",name:"the counter",x:1,y:0},
    {id:"counter-3",name:"the counter",x:2,y:0},
    {id:"counter-4",name:"the counter",x:3,y:0},
  ],
};

/** Gym EASY — 5×5 — N=5 */
export const gymEasy: FloorPlanDef = {
  width:5, height:5,
  tiles:[
    ["wT","F","W","tM","tM"],
    ["F","F","W","F","F"],
    ["F","F","F","F","F"],
    ["W","W","W","W","W"],
    ["F","F","F","C","F"],
  ],
  rooms:[
    {id:"weights",  name:"Weights Area", cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2]]},
    {id:"cardio",   name:"Cardio",       cells:[[3,0],[4,0],[3,1],[4,1],[3,2],[4,2]]},
    {id:"locker-room",name:"Locker Room",cells:[[0,4],[1,4],[2,4],[3,4],[4,4]]},
  ],
  landmarks:[
    {id:"weight-rack",name:"the weight rack",x:0,y:0},
    {id:"treadmill-1",name:"the treadmill",x:3,y:0},
    {id:"treadmill-2",name:"the treadmill",x:4,y:0},
  ],
};
/** Gym MEDIUM — 6×7 — N=6 */
export const gymMedium: FloorPlanDef = {
  width:6, height:7,
  tiles:[
    ["wT","F","W","tM","tM","F"],
    ["F","F","W","F","F","F"],
    ["F","F","F","F","F","F"],
    ["W","W","W","W","W","W"],
    ["F","F","F","F","jZ","jZ"],
    ["F","C","F","F","jZ","C"],
    ["F","F","W","F","F","F"],
  ],
  rooms:[
    {id:"weights",    name:"Weights Area", cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2]]},
    {id:"cardio",     name:"Cardio",       cells:[[3,0],[4,0],[5,0],[3,1],[4,1],[5,1],[3,2],[4,2],[5,2]]},
    {id:"pool",       name:"Pool",         cells:[[4,4],[5,4],[4,5],[5,5]]},
    {id:"locker-room",name:"Locker Room",  cells:[[0,4],[1,4],[2,4],[3,4],[0,5],[1,5],[2,5],[3,5]]},
    {id:"sauna",      name:"Sauna",        cells:[[0,6],[1,6],[3,6],[4,6],[5,6]]},
  ],
  landmarks:[
    {id:"weight-rack",name:"the weight rack",x:0,y:0},
    {id:"treadmill-1",name:"the treadmill",x:3,y:0},
    {id:"treadmill-2",name:"the treadmill",x:4,y:0},
    {id:"pool",name:"the pool",x:4,y:4},
  ],
};
/** Gym HARD — 7×8 — N=7 */
export const gymHard: FloorPlanDef = {
  width:7, height:8,
  tiles:[
    ["wT","wT","F","W","tM","tM","F"],
    ["F","F","F","W","F","F","F"],
    ["F","F","F","F","F","F","F"],
    ["F","F","F","F","F","F","F"],
    ["W","W","W","W","W","W","W"],
    ["F","F","F","F","jZ","jZ","jZ"],
    ["F","C","F","F","jZ","C","jZ"],
    ["F","F","W","F","F","F","F"],
  ],
  rooms:[
    {id:"weights",     name:"Weights Area",  cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2],[0,3],[1,3],[2,3]]},
    {id:"cardio",      name:"Cardio",        cells:[[4,0],[5,0],[6,0],[4,1],[5,1],[6,1],[4,2],[5,2],[6,2],[4,3],[5,3],[6,3]]},
    {id:"studio",      name:"Studio",        cells:[[3,2],[3,3]]},
    {id:"pool",        name:"Pool",          cells:[[4,5],[5,5],[6,5],[4,6],[5,6],[6,6]]},
    {id:"locker-room", name:"Locker Room",   cells:[[0,5],[1,5],[2,5],[3,5],[0,6],[1,6],[2,6],[3,6]]},
    {id:"sauna",       name:"Sauna",         cells:[[0,7],[1,7],[3,7],[4,7],[5,7],[6,7]]},
  ],
  landmarks:[
    {id:"weight-rack-1",name:"the weight rack",x:0,y:0},
    {id:"weight-rack-2",name:"the weight rack",x:1,y:0},
    {id:"treadmill-1",  name:"the treadmill",x:4,y:0},
    {id:"treadmill-2",  name:"the treadmill",x:5,y:0},
    {id:"pool",         name:"the pool",     x:4,y:5},
  ],
};

/** Office EASY — 5×5 — N=5 */
export const officeEasy: FloorPlanDef = {
  width:5, height:5,
  tiles:[
    ["dK","F","W","F","C"],
    ["F","F","W","F","F"],
    ["F","C","F","F","F"],
    ["W","W","W","W","W"],
    ["F","F","pC","F","F"],
  ],
  rooms:[
    {id:"open-plan",    name:"Open Plan",    cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2]]},
    {id:"meeting-room", name:"Meeting Room", cells:[[3,0],[4,0],[3,1],[4,1],[3,2],[4,2]]},
    {id:"kitchen",      name:"Kitchen",      cells:[[0,4],[1,4],[2,4],[3,4],[4,4]]},
  ],
  landmarks:[
    {id:"desk",        name:"the desk",       x:0,y:0},
    {id:"photocopier", name:"the photocopier",x:2,y:4},
  ],
};
/** Office MEDIUM — 6×6 — N=6 */
export const officeMedium: FloorPlanDef = {
  width:6, height:6,
  tiles:[
    ["dK","F","F","W","F","C"],
    ["F","F","F","W","F","F"],
    ["F","C","F","F","F","F"],
    ["F","F","F","F","F","F"],
    ["W","W","W","W","W","W"],
    ["F","pC","F","F","C","F"],
  ],
  rooms:[
    {id:"open-plan",    name:"Open Plan",    cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2],[0,3],[1,3],[2,3],[3,3],[4,3],[5,3]]},
    {id:"meeting-room", name:"Meeting Room", cells:[[4,0],[5,0],[4,1],[5,1],[3,2],[4,2],[5,2]]},
    {id:"reception",    name:"Reception",    cells:[[3,1]]},
    {id:"kitchen",      name:"Kitchen",      cells:[[0,5],[1,5],[2,5],[3,5],[4,5],[5,5]]},
  ],
  landmarks:[
    {id:"desk",        name:"the desk",       x:0,y:0},
    {id:"photocopier", name:"the photocopier",x:1,y:5},
  ],
};
/** Office HARD — 7×7 — N=7 */
export const officeHard: FloorPlanDef = {
  width:7, height:7,
  tiles:[
    ["dK","F","F","F","W","F","C"],
    ["F","F","F","F","W","F","F"],
    ["F","C","F","F","F","F","F"],
    ["F","F","F","F","F","F","F"],
    ["F","F","F","F","F","dK","F"],
    ["W","W","W","W","W","W","W"],
    ["F","pC","F","F","C","F","F"],
  ],
  rooms:[
    {id:"open-plan",    name:"Open Plan",    cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[0,2],[1,2],[2,2],[3,2],[0,3],[1,3],[2,3],[3,3],[0,4],[1,4],[2,4],[3,4]]},
    {id:"meeting-room", name:"Meeting Room", cells:[[5,0],[6,0],[5,1],[6,1],[4,2],[5,2],[6,2],[4,3],[5,3],[6,3]]},
    {id:"server-room",  name:"Server Room",  cells:[[4,4],[5,4],[6,4]]},
    {id:"kitchen",      name:"Kitchen",      cells:[[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6]]},
  ],
  landmarks:[
    {id:"desk-1",      name:"the desk",        x:0,y:0},
    {id:"desk-2",      name:"the manager's desk",x:5,y:4},
    {id:"photocopier", name:"the photocopier",  x:1,y:6},
  ],
};

/** Garden Party EASY — 5×5 — N=5 */
export const gardenPartyEasy: FloorPlanDef = {
  width:5, height:5,
  tiles:[
    ["fB","F","F","F","fB"],
    ["F","F","F","F","F"],
    ["pL","F","C","F","pL"],
    ["F","F","F","F","F"],
    ["F","F","fB","F","F"],
  ],
  rooms:[
    {id:"lawn",   name:"Lawn",   cells:[[0,0],[1,0],[2,0],[3,0],[4,0],[0,1],[1,1],[2,1],[3,1],[4,1],[0,2],[1,2],[2,2],[3,2],[4,2]]},
    {id:"gazebo", name:"Gazebo", cells:[[0,3],[1,3],[2,3],[3,3],[4,3],[0,4],[1,4],[2,4],[3,4],[4,4]]},
  ],
  landmarks:[
    {id:"flower-bed-1",name:"the flower bed",x:0,y:0},
    {id:"flower-bed-2",name:"the flower bed",x:4,y:0},
    {id:"plant-1",     name:"the plant",     x:0,y:2},
    {id:"plant-2",     name:"the plant",     x:4,y:2},
    {id:"flower-bed-3",name:"the flower bed",x:2,y:4},
  ],
};
/** Garden Party MEDIUM — 6×6 — N=6 */
export const gardenPartyMedium: FloorPlanDef = {
  width:6, height:6,
  tiles:[
    ["fB","F","F","F","F","fB"],
    ["F","F","F","F","F","F"],
    ["pL","F","C","F","C","pL"],
    ["F","F","F","F","F","F"],
    ["F","F","jZ","jZ","F","F"],
    ["F","F","jZ","jZ","fB","F"],
  ],
  rooms:[
    {id:"lawn",     name:"Lawn",     cells:[[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2]]},
    {id:"gazebo",   name:"Gazebo",   cells:[[0,3],[1,3],[2,3],[3,3],[4,3],[5,3]]},
    {id:"pool-area",name:"Pool Area",cells:[[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[0,5],[1,5],[2,5],[3,5],[4,5],[5,5]]},
  ],
  landmarks:[
    {id:"flower-bed-1",name:"the flower bed",x:0,y:0},
    {id:"flower-bed-2",name:"the flower bed",x:5,y:0},
    {id:"plant-1",     name:"the plant",     x:0,y:2},
    {id:"plant-2",     name:"the plant",     x:5,y:2},
    {id:"pool",        name:"the pool",      x:2,y:4},
    {id:"flower-bed-3",name:"the flower bed",x:4,y:5},
  ],
};
/** Garden Party HARD — 7×8 — N=7 */
export const gardenPartyHard: FloorPlanDef = {
  width:7, height:8,
  tiles:[
    ["fB","F","F","F","F","F","fB"],
    ["F","F","F","F","F","F","F"],
    ["pL","F","C","F","C","F","pL"],
    ["F","F","F","F","F","F","F"],
    ["F","F","jZ","jZ","jZ","F","F"],
    ["F","F","jZ","jZ","jZ","fB","F"],
    ["fB","F","F","W","F","F","fB"],
    ["F","F","F","W","F","F","F"],
  ],
  rooms:[
    {id:"lawn",        name:"Lawn",        cells:[[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3]]},
    {id:"pool-area",   name:"Pool Area",   cells:[[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[0,5],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5]]},
    {id:"greenhouse",  name:"Greenhouse",  cells:[[0,6],[1,6],[2,6],[0,7],[1,7],[2,7]]},
    {id:"garage",      name:"Garage",      cells:[[4,6],[5,6],[6,6],[4,7],[5,7],[6,7]]},
  ],
  landmarks:[
    {id:"flower-bed-1",name:"the flower bed",x:0,y:0},
    {id:"flower-bed-2",name:"the flower bed",x:6,y:0},
    {id:"plant-1",     name:"the plant",     x:0,y:2},
    {id:"plant-2",     name:"the plant",     x:6,y:2},
    {id:"pool",        name:"the pool",      x:2,y:4},
    {id:"flower-bed-3",name:"the flower bed",x:5,y:5},
    {id:"flower-bed-4",name:"the flower bed",x:0,y:6},
    {id:"flower-bed-5",name:"the flower bed",x:6,y:6},
  ],
};

/** Hospital EASY — 5×5 — N=5 */
export const hospitalEasy: FloorPlanDef = {
  width:5, height:5,
  tiles:[
    ["hB","F","W","F","C"],
    ["hB","F","W","F","F"],
    ["F","F","F","F","F"],
    ["W","W","W","W","W"],
    ["F","mC","F","C","F"],
  ],
  rooms:[
    {id:"ward",         name:"Ward",         cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2]]},
    {id:"waiting-room", name:"Waiting Room", cells:[[3,0],[4,0],[3,1],[4,1],[3,2],[4,2]]},
    {id:"pharmacy",     name:"Pharmacy",     cells:[[0,4],[1,4],[2,4],[3,4],[4,4]]},
  ],
  landmarks:[
    {id:"hospital-bed-1",name:"the hospital bed",x:0,y:0},
    {id:"hospital-bed-2",name:"the hospital bed",x:0,y:1},
    {id:"medicine-cabinet",name:"the medicine cabinet",x:1,y:4},
  ],
};
/** Hospital MEDIUM — 6×7 — N=6 */
export const hospitalMedium: FloorPlanDef = {
  width:6, height:7,
  tiles:[
    ["hB","F","F","W","F","C"],
    ["hB","F","F","W","F","F"],
    ["F","F","F","F","F","F"],
    ["W","W","W","W","W","W"],
    ["F","F","F","F","mC","F"],
    ["F","C","F","F","F","F"],
    ["F","F","W","F","C","F"],
  ],
  rooms:[
    {id:"ward",           name:"Ward",           cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2]]},
    {id:"operating-theatre",name:"Operating Theatre",cells:[[4,0],[5,0],[4,1],[5,1]]},
    {id:"waiting-room",   name:"Waiting Room",   cells:[[3,1]]},
    {id:"pharmacy",       name:"Pharmacy",       cells:[[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[0,5],[1,5],[2,5],[3,5],[4,5],[5,5]]},
    {id:"cafeteria",      name:"Cafeteria",      cells:[[0,6],[1,6],[3,6],[4,6],[5,6]]},
  ],
  landmarks:[
    {id:"hospital-bed-1",name:"the hospital bed",x:0,y:0},
    {id:"hospital-bed-2",name:"the hospital bed",x:0,y:1},
    {id:"medicine-cabinet",name:"the medicine cabinet",x:4,y:4},
  ],
};
/** Hospital HARD — 7×8 — N=7 */
export const hospitalHard: FloorPlanDef = {
  width:7, height:8,
  tiles:[
    ["hB","F","F","F","W","F","C"],
    ["hB","hB","F","F","W","F","F"],
    ["F","F","F","F","F","F","F"],
    ["F","F","F","F","F","F","F"],
    ["W","W","W","W","W","W","W"],
    ["F","F","F","F","mC","F","F"],
    ["F","C","F","F","F","F","C"],
    ["F","F","W","F","C","F","F"],
  ],
  rooms:[
    {id:"ward",             name:"Ward",             cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[0,2],[1,2],[2,2],[3,2],[0,3],[1,3],[2,3],[3,3]]},
    {id:"operating-theatre",name:"Operating Theatre",cells:[[5,0],[6,0],[5,1],[6,1],[4,2],[5,2],[6,2],[4,3],[5,3],[6,3]]},
    {id:"waiting-room",     name:"Waiting Room",     cells:[[4,1]]},
    {id:"pharmacy",         name:"Pharmacy",         cells:[[0,5],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5],[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6]]},
    {id:"cafeteria",        name:"Cafeteria",        cells:[[0,7],[1,7],[3,7],[4,7],[5,7],[6,7]]},
  ],
  landmarks:[
    {id:"hospital-bed-1",  name:"the hospital bed",   x:0,y:0},
    {id:"hospital-bed-2",  name:"the hospital bed",   x:0,y:1},
    {id:"hospital-bed-3",  name:"the hospital bed",   x:1,y:1},
    {id:"medicine-cabinet",name:"the medicine cabinet",x:4,y:5},
  ],
};

/** Carnival EASY — 5×5 — N=5 */
export const carnivalEasy: FloorPlanDef = {
  width:5, height:5,
  tiles:[
    ["cH","F","W","sT","sT"],
    ["cH","F","W","F","F"],
    ["F","F","F","F","F"],
    ["W","W","W","W","W"],
    ["F","F","F","C","F"],
  ],
  rooms:[
    {id:"carousel",    name:"Carousel",    cells:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[2,2]]},
    {id:"food-stands", name:"Food Stands", cells:[[3,0],[4,0],[3,1],[4,1],[3,2],[4,2]]},
    {id:"ticket-booth",name:"Ticket Booth",cells:[[0,4],[1,4],[2,4],[3,4],[4,4]]},
  ],
  landmarks:[
    {id:"carousel-horse-1",name:"the carousel horse",x:0,y:0},
    {id:"carousel-horse-2",name:"the carousel horse",x:0,y:1},
    {id:"stall-1",         name:"the stall",         x:3,y:0},
    {id:"stall-2",         name:"the stall",         x:4,y:0},
  ],
};
/** Carnival MEDIUM — 6×7 — N=6 */
export const carnivalMedium: FloorPlanDef = {
  width:6, height:7,
  tiles:[
    ["cH","F","F","W","sT","sT"],
    ["cH","F","F","W","F","F"],
    ["F","F","F","F","F","F"],
    ["W","W","W","W","W","W"],
    ["F","F","F","F","F","F"],
    ["F","C","F","F","C","F"],
    ["F","F","W","F","F","F"],
  ],
  rooms:[
    {id:"carousel",    name:"Carousel",    cells:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2],[3,2]]},
    {id:"food-stands", name:"Food Stands", cells:[[4,0],[5,0],[4,1],[5,1],[4,2],[5,2]]},
    {id:"funhouse",    name:"Funhouse",    cells:[[0,4],[1,4],[2,4],[0,5],[1,5],[2,5],[0,6],[1,6]]},
    {id:"ticket-booth",name:"Ticket Booth",cells:[[3,4],[4,4],[5,4],[3,5],[4,5],[5,5],[3,6],[4,6],[5,6]]},
  ],
  landmarks:[
    {id:"carousel-horse-1",name:"the carousel horse",x:0,y:0},
    {id:"carousel-horse-2",name:"the carousel horse",x:0,y:1},
    {id:"stall-1",         name:"the stall",         x:4,y:0},
    {id:"stall-2",         name:"the stall",         x:5,y:0},
  ],
};
/** Carnival HARD — 7×8 — N=7 */
export const carnivalHard: FloorPlanDef = {
  width:7, height:8,
  tiles:[
    ["cH","F","F","F","W","sT","sT"],
    ["cH","cH","F","F","W","F","F"],
    ["F","F","F","F","F","F","F"],
    ["F","F","F","F","F","F","F"],
    ["W","W","W","W","W","W","W"],
    ["F","F","F","F","F","F","F"],
    ["F","C","F","F","C","F","F"],
    ["F","F","W","F","F","F","C"],
  ],
  rooms:[
    {id:"carousel",    name:"Carousel",    cells:[[0,0],[1,0],[2,0],[3,0],[0,1],[1,1],[2,1],[3,1],[0,2],[1,2],[2,2],[3,2],[0,3],[1,3],[2,3],[3,3]]},
    {id:"food-stands", name:"Food Stands", cells:[[5,0],[6,0],[5,1],[6,1],[4,2],[5,2],[6,2],[4,3],[5,3],[6,3]]},
    {id:"funhouse",    name:"Funhouse",    cells:[[0,5],[1,5],[2,5],[0,6],[1,6],[2,6],[0,7],[1,7]]},
    {id:"backstage",   name:"Backstage",   cells:[[3,5],[4,5],[5,5],[6,5],[3,6],[4,6],[5,6],[6,6],[3,7],[4,7],[5,7],[6,7]]},
  ],
  landmarks:[
    {id:"carousel-horse-1",name:"the carousel horse",x:0,y:0},
    {id:"carousel-horse-2",name:"the carousel horse",x:0,y:1},
    {id:"carousel-horse-3",name:"the carousel horse",x:1,y:1},
    {id:"stall-1",         name:"the stall",         x:5,y:0},
    {id:"stall-2",         name:"the stall",         x:6,y:0},
  ],
};

// ─────────────────────────────────────────────
// EXPORT MAP
// ─────────────────────────────────────────────

export const FLOOR_PLANS: Record<string, Record<string, FloorPlanDef>> = {
  "coffee-shop":      { easy: coffeeShopEasy,     medium: coffeeShopMedium,     hard: coffeeShopHard },
  "bookstore":        { easy: bookstoreEasy,       medium: bookstoreMedium,      hard: bookstoreHard },
  "backyard":         { easy: backyardEasy,        medium: backyardMedium,       hard: backyardHard },
  "holiday-mall":     { easy: holidayMallEasy,     medium: holidayMallMedium,    hard: holidayMallHard },
  "restaurant":       { easy: restaurantEasy,      medium: restaurantMedium,     hard: restaurantHard },
  "gym":              { easy: gymEasy,             medium: gymMedium,            hard: gymHard },
  "office":           { easy: officeEasy,          medium: officeMedium,         hard: officeHard },
  "garden-party":     { easy: gardenPartyEasy,     medium: gardenPartyMedium,    hard: gardenPartyHard },
  "hospital":         { easy: hospitalEasy,        medium: hospitalMedium,       hard: hospitalHard },
  "carnival":         { easy: carnivalEasy,        medium: carnivalMedium,       hard: carnivalHard },
};
