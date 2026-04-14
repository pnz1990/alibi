# Level Format Specification

Every level is a self-contained JSON file at `src/levels/<NNN>-<slug>.json`.
The constraint solver in `src/engine/solver.ts` must confirm a unique solution before the file is merged.

---

## Coordinate System

```
        col:  A  B  C  D  E  F  G  H  I
              0  1  2  3  4  5  6  7  8
row 1  (y=0)  .  .  .  .  .  .  .  .  .
row 2  (y=1)  .  .  .  .  .  .  .  .  .
...
row 9  (y=8)  .  .  .  .  .  .  .  .  .
```

- **x** = column index 0–8 (A–I, left to right)
- **y** = row index 0–8 (row 1–9, top to bottom)
- **North** = smaller y (up on screen). **South** = larger y (down on screen).
- All clue distance calculations use **Chebyshev distance**: `max(abs(dx), abs(dy))`.
- All clue adjacency (`isBeside`) uses **Moore neighbourhood**: the 8 surrounding cells including diagonals.

---

## Top-level Schema

```jsonc
{
  "id": "001",                        // zero-padded level number
  "slug": "speakeasy",               // URL-safe name
  "title": "The Speakeasy",          // display title
  "difficulty": "easy",              // "easy" | "medium" | "hard" — shown as 1/2/3 stars on level select
  "theme": "speakeasy",              // color palette key (matches theme flat-color definitions)
  "narrative": {
    "intro": "...",                  // 2-3 noir sentences shown before grid. REQUIRED, no placeholder text.
    "victim_found": "...",           // 1 sentence shown when victim cell is clicked. REQUIRED.
    "guilty_text": "..."             // 1 sentence naming the killer. REQUIRED.
  },
  "victim": {
    "name": "Victor",                // victim's name (starts with V)
    "sprite": "victim-victor"        // sprite key; falls back to "?" placeholder if file absent
  },
  "grid": { ... },                   // 9×9 tile map — see Grid section
  "zones": [ ... ],                  // room zone definitions — see Zones section
  "landmarks": [ ... ],              // named objects on the grid — see Landmarks section
  "suspects": [ ... ],               // 8 suspects — see Suspects section
  "clues": [ ... ],                  // ordered clue list — see Clues section
  "solution": { ... }                // the unique correct placement — see Solution section
}
```

---

## Grid

The `grid` field is a 9×9 array of rows (top to bottom). Each cell is a tile type string.

```jsonc
"grid": [
  ["F","F","S","F","F","S","F","F","F"],   // row 1 (y=0)
  ["F","W","W","F","W","W","F","W","F"],   // row 2 (y=1)
  ...
  ["F","F","F","F","F","F","F","F","F"]    // row 9 (y=8)
]
```

Tile types:
| Code | Name | Meaning |
|------|------|---------|
| `"F"` | Floor | Walkable. Suspect can be placed here. |
| `"W"` | Wall/Solid | Impassable. Suspect **cannot** be placed. Rendered as solid tile. |
| `"S"` | Seat | Walkable (chair/sofa). Suspect can be placed here. Rendered differently from floor. |

Rules:
- Every cell is exactly one of `F`, `W`, `S`.
- At least 8 Floor/Seat cells must be reachable (enough for all suspects).
- The grid must allow exactly one valid Sudoku-style remaining cell after placing all 8 suspects. Run `npm run verify-levels` to confirm.

---

## Zones

Zones are rectangular sub-regions. Every Floor/Seat cell must belong to exactly one zone. Wall cells do not need zone membership.

```jsonc
"zones": [
  {
    "id": "bar",
    "name": "The Bar",
    "x1": 0, "y1": 0,   // top-left corner (inclusive)
    "x2": 2, "y2": 3    // bottom-right corner (inclusive)
  },
  {
    "id": "stage",
    "name": "The Stage",
    "x1": 3, "y1": 0,
    "x2": 8, "y2": 2
  }
  // ...
]
```

- Zone IDs must be unique within a level.
- Zone names are used in clue text and in the accusation screen.
- Zones must not overlap. Every non-Wall cell must be covered by exactly one zone.

---

## Landmarks

Landmarks are named objects at fixed coordinates. They are used in `isInSameRow`, `isInSameCol`, and `isNorthOf`/`isSouthOf` clues that reference a location rather than another suspect.

```jsonc
"landmarks": [
  {
    "id": "grand-piano",
    "name": "Grand Piano",
    "x": 4,
    "y": 2
  },
  {
    "id": "bar-counter",
    "name": "the Bar Counter",
    "x": 1,
    "y": 0
  }
]
```

- Landmark IDs must be unique within a level.
- Landmarks must be placed on Wall or Floor cells (they are scenery objects, not walkable positions for suspects).
- Landmark names appear verbatim in clue text.

---

## Suspects

Always exactly 8 entries, in alphabetical order A–H by first name.

```jsonc
"suspects": [
  { "id": "A", "name": "Arthur",   "sprite": "arthur" },
  { "id": "B", "name": "Beatrice", "sprite": "beatrice" },
  { "id": "C", "name": "Caspar",   "sprite": "caspar" },
  { "id": "D", "name": "Dolores",  "sprite": "dolores" },
  { "id": "E", "name": "Elias",    "sprite": "elias" },
  { "id": "F", "name": "Fiona",    "sprite": "fiona" },
  { "id": "G", "name": "Gideon",   "sprite": "gideon" },
  { "id": "H", "name": "Harlow",   "sprite": "harlow" }
]
```

Sprite keys reference `assets/sprites/suspects/<sprite>.png`. For v1.0 placeholder rendering, if the sprite file is absent the engine renders a colored rectangle with the suspect's initial letter.

---

## Clues

An ordered array of clue objects. The sidebar renders them in this order. Each clue has:

```jsonc
{
  "id": "c1",                          // unique within level
  "text": "Arthur was sitting at the Desk.",  // player-facing text (shown in sidebar)
  "type": "<clue_type>",               // see Clue Types below
  "params": { ... }                    // type-specific parameters
}
```

### Clue Types

#### `fixedPosition` — suspect placed at exact coordinates
```jsonc
{ "type": "fixedPosition", "params": { "suspect": "A", "x": 2, "y": 3 } }
```
Satisfied when suspect A is at exactly (2, 3).

#### `isBeside` — two suspects are adjacent (Moore neighbourhood, distance ≤ 1)
```jsonc
{ "type": "isBeside", "params": { "suspectA": "A", "suspectB": "B" } }
```
Satisfied when `max(abs(A.x-B.x), abs(A.y-B.y)) <= 1`.

#### `isNotBeside` — two suspects are NOT adjacent
```jsonc
{ "type": "isNotBeside", "params": { "suspectA": "B", "suspectB": "C" } }
```
Satisfied when Chebyshev distance > 1.

#### `isInRoom` — suspect is in a named zone
```jsonc
{ "type": "isInRoom", "params": { "suspect": "C", "zoneId": "library" } }
```
Satisfied when the suspect's cell belongs to zone `library`.

#### `isNotInRoom` — suspect is NOT in a named zone
```jsonc
{ "type": "isNotInRoom", "params": { "suspect": "B", "zoneId": "study" } }
```

#### `isInSameRoom` — two suspects share a zone
```jsonc
{ "type": "isInSameRoom", "params": { "suspectA": "C", "suspectB": "D" } }
```

#### `isInDifferentRoom` — two suspects are in different zones
```jsonc
{ "type": "isInDifferentRoom", "params": { "suspectA": "A", "suspectB": "B" } }
```

#### `isInSameRow` — suspect shares a row (same y) with another suspect or landmark
```jsonc
// Suspect-to-suspect:
{ "type": "isInSameRow", "params": { "suspectA": "D", "suspectB": "E" } }
// Suspect-to-landmark:
{ "type": "isInSameRow", "params": { "suspect": "D", "landmarkId": "grand-piano" } }
```

#### `isInSameCol` — suspect shares a column (same x) with another suspect or landmark
```jsonc
{ "type": "isInSameCol", "params": { "suspectA": "C", "suspectB": "D" } }
{ "type": "isInSameCol", "params": { "suspect": "C", "landmarkId": "bar-counter" } }
```

#### `isFarFrom` — Chebyshev distance ≥ threshold
```jsonc
{ "type": "isFarFrom", "params": { "suspectA": "E", "suspectB": "F", "minDistance": 3 } }
```
Satisfied when `max(abs(E.x-F.x), abs(E.y-F.y)) >= 3`.

#### `isNorthOf` — suspect A is exactly N rows north of suspect B
```jsonc
{ "type": "isNorthOf", "params": { "suspectA": "E", "suspectB": "F", "rows": 2 } }
```
Satisfied when `F.y - A.y == 2` (A is 2 rows above B on screen; north = smaller y).

#### `isSouthOf` — suspect A is exactly N rows south of suspect B
```jsonc
{ "type": "isSouthOf", "params": { "suspectA": "A", "suspectB": "B", "rows": 1 } }
```
Satisfied when `A.y - B.y == 1`.

---

## Solution

The unique correct placement, used by:
1. The constraint solver to verify uniqueness.
2. The hint system (future feature).
3. QA verification.

```jsonc
"solution": {
  "A": { "x": 2, "y": 3 },
  "B": { "x": 5, "y": 1 },
  "C": { "x": 0, "y": 6 },
  "D": { "x": 7, "y": 4 },
  "E": { "x": 4, "y": 7 },
  "F": { "x": 1, "y": 5 },
  "G": { "x": 8, "y": 0 },
  "H": { "x": 3, "y": 8 },
  "victim": { "x": 6, "y": 2 }
}
```

The victim's position is the single cell not occupied by any suspect that is also not blocked by any suspect's row or column. The solver derives this automatically; include it here as a cross-check.

---

## Validation Rules (enforced by `npm run verify-levels`)

1. Grid is exactly 9×9.
2. Every non-Wall cell belongs to exactly one zone.
3. Exactly 8 suspects defined.
4. Every clue references valid suspect IDs, zone IDs, or landmark IDs.
5. The solution placement satisfies all clues.
6. The solution is unique — no other valid placement satisfies all clues.
7. The victim cell in the solution is the only non-Wall cell not in any suspect's row or column.
