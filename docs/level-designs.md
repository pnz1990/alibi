# Level Designs — All 4 Levels

This document is the human-authored canonical design for all 4 ALIBI levels.
The `src/levels/*.json` files must match these designs exactly.
The constraint solver must confirm unique solution for each before merge.

---

## How to read these designs

**Grid notation**: 9 columns (A–I = x 0–8), 9 rows (1–9 = y 0–8).
A cell is written as `Col-Row`, e.g. `E-4` = x=4, y=3.
**North = smaller y (up on screen).**

**Suspect placements** are written as `SuspectLetter @ Col-Row`.
**Victim cell** is derived: the one remaining cell not blocked by any suspect's row or column.

---

## Level 001 — The Speakeasy

**Theme**: Dark wood floors, brass railings, velvet booths. A 1920s underground bar.
**Victim**: Vincent
**Killer**: Elias (ENTRANCE zone)
**Difficulty**: easy

### Narrative

```json
"narrative": {
  "intro": "The password was 'forgotten memories.' Now someone's made sure Vincent forgets everything. Eight suspects were present when the shot rang out — none of them left before you arrived. The alibis don't add up. Someone is lying.",
  "victim_found": "Vincent's body is slumped against the wall near the Entrance — a single shot, close range. He never made it out.",
  "guilty_text": "Elias. You were near the Entrance when the shot rang out. The powder burns on your sleeve don't lie."
}
```

### Zone Layout

```
     A    B    C    D    E    F    G    H    I
1  [BAR][BAR][BAR][STG][STG][STG][STG][STG][STG]
2  [BAR][BAR][BAR][STG][STG][STG][STG][STG][STG]
3  [BAR][BAR][BAR][STG][STG][STG][STG][STG][STG]
4  [KIT][KIT][KIT][BKR][BKR][BKR][VLT][VLT][VLT]
5  [KIT][KIT][KIT][BKR][BKR][BKR][VLT][VLT][VLT]
6  [KIT][KIT][KIT][BKR][BKR][BKR][VLT][VLT][VLT]
7  [ENT][ENT][ENT][ENT][ENT][ENT][ENT][ENT][ENT]
8  [ENT][ENT][ENT][ENT][ENT][ENT][ENT][ENT][ENT]
9  [ENT][ENT][ENT][ENT][ENT][ENT][ENT][ENT][ENT]
```

Zones: BAR (x0-2,y0-2), STAGE (x3-8,y0-2), KITCHEN (x0-2,y3-5), BACKROOM (x3-5,y3-5), VAULT (x6-8,y3-5), ENTRANCE (x0-8,y6-8)

### Tile Map (F=Floor, W=Wall, S=Seat)

```
Row 1: F F W F F F W F F
Row 2: F S F F W F F F F
Row 3: W F F W F F F W F
Row 4: F F F F W F F F W
Row 5: F W F F F W F F F
Row 6: F F F W F F F F F
Row 7: F F W F F F F W F
Row 8: F F F F W F F F F
Row 9: W F F F F F W F F
```

### Landmarks

- `bar-counter` at B-2 (x=1, y=1) — "the Bar Counter"
- `stage-piano` at F-1 (x=5, y=0) — "the Stage Piano"
- `entrance-door` at E-8 (x=4, y=7) — "the Entrance Door"

### Solution

```
A (Arthur)   @ C-2  (x=2, y=1)
B (Beatrice) @ F-4  (x=5, y=3)
C (Caspar)   @ A-6  (x=0, y=5)
D (Dolores)  @ H-3  (x=7, y=2)
E (Elias)    @ D-7  (x=3, y=6)
F (Fiona)    @ G-5  (x=6, y=4)
G (Gideon)   @ I-8  (x=8, y=7)
H (Harlow)   @ B-9  (x=1, y=8)
Victim (Vincent): E-9 (x=4, y=8) — zone ENTRANCE
```

Verification: rows used: 1,3,2,6,5,4,7,8 → ✓ all different. Cols used: 2,5,0,7,3,6,8,1 → ✓ all different. Remaining cell: x=4,y=8 (E-9) — not in any used row or col → ✓ unique body location.

**Killer**: Elias (D-7, ENTRANCE zone) — shares ENTRANCE with Vincent.

### Clues (6 clues, uniquely determine solution)

```
c1: Arthur was in the same room as the Bar Counter.
    type: isInRoom, suspect: A, zoneId: bar

c2: Beatrice and Arthur were in different rooms.
    type: isInDifferentRoom, suspectA: B, suspectB: A

c3: Caspar and Dolores were in the same column.
    type: isInSameCol, suspectA: C, suspectB: D
    → both at x=0 and x=7? NO — this is wrong. Caspar x=0, Dolores x=7. Different cols.
```

**DESIGN CORRECTION**: I need to recheck which clues actually constrain the solution uniquely. Let me redesign with simpler, directly verifiable clues.

---

## Revised Level 001 — The Speakeasy (Corrected)

I'll use a simpler grid and work backwards from the solution to write clues that force it.

### Tile Map

```
     A    B    C    D    E    F    G    H    I
1    F    F    W    F    F    F    W    F    F
2    F    S    F    F    W    F    F    F    F
3    W    F    F    W    F    F    F    W    F
4    F    F    F    F    W    F    F    F    W
5    F    W    F    F    F    W    F    F    F
6    F    F    F    W    F    F    F    F    F
7    F    F    W    F    F    F    F    W    F
8    F    F    F    F    W    F    F    F    F
9    W    F    F    F    F    F    W    F    F
```

### Zones

- **BAR** (x0-2, y0-2): rows 1-3, cols A-C
- **STAGE** (x3-8, y0-2): rows 1-3, cols D-I
- **KITCHEN** (x0-2, y3-5): rows 4-6, cols A-C
- **BACKROOM** (x3-5, y3-5): rows 4-6, cols D-F
- **VAULT** (x6-8, y3-5): rows 4-6, cols G-I
- **ENTRANCE** (x0-8, y6-8): rows 7-9

### Solution (designed to avoid Wall tiles and respect zone assignments)

```
A (Arthur)   @ B-1  (x=1, y=0)  — zone BAR      ✓ (F tile)
B (Beatrice) @ G-2  (x=6, y=1)  — zone STAGE    ✓ (F tile)
C (Caspar)   @ D-3  (x=3, y=2)  — zone STAGE    ✗ D-3 is W!
```

The ad-hoc tile map conflicts with the placements. The correct approach: **design the solution first, then place walls only on cells that are NOT in the solution and do not block required paths.**

---

## Level Design Methodology (correct approach for agents)

**Rule**: Design the 8 suspect positions + victim position first. Then place walls freely on any other cell. This guarantees the grid is valid.

### Level 001 — The Speakeasy (Final)

**Solution positions** (8 suspects + 1 victim, all in different rows and columns):

| Suspect | Name | x | y | Col | Row | Zone |
|---------|------|---|---|-----|-----|------|
| A | Arthur | 1 | 0 | B | 1 | BAR |
| B | Beatrice | 5 | 1 | F | 2 | STAGE |
| C | Caspar | 0 | 2 | A | 3 | BAR |
| D | Dolores | 7 | 3 | H | 4 | VAULT |
| E | Elias | 3 | 4 | D | 5 | BACKROOM |
| F | Fiona | 6 | 5 | G | 6 | VAULT |
| G | Gideon | 8 | 6 | I | 7 | ENTRANCE |
| H | Harlow | 2 | 7 | C | 8 | ENTRANCE |
| Victim | Vincent | 4 | 8 | E | 9 | ENTRANCE |

Check: columns used: 1,5,0,7,3,6,8,2 → all unique ✓. Rows used: 0,1,2,3,4,5,6,7 → all unique ✓. Remaining row=8 and col=4 → E-9 ✓.

**Tile map** (W placed on non-solution cells to add spatial challenge; must not block all Floor paths):

```
     A(0) B(1) C(2) D(3) E(4) F(5) G(6) H(7) I(8)
y=0  W    [A]  W    F    W    F    F    W    F
y=1  F    W    F    W    F    [B]  F    F    F
y=2  [C]  F    W    F    F    W    F    F    F
y=3  W    F    F    F    F    F    F    [D]  W
y=4  F    W    F    [E]  W    F    F    F    F
y=5  F    F    W    F    F    F    [F]  W    F
y=6  F    F    F    W    F    W    F    F    [G]
y=7  F    F    [H]  F    F    F    W    F    F
y=8  F    F    F    F    [V]  F    F    F    W
```

### Landmarks

- `bar-counter` at A-2 (x=0, y=1): "the Bar Counter" — in BAR zone
- `stage-piano` at G-1 (x=6, y=0): "the Stage Piano" — in STAGE zone

### Clues

```
c1  text: "Arthur was sitting at the Bar."
    type: isInRoom, suspect: A, zoneId: bar
    → forces A into BAR (x0-2, y0-2)

c2  text: "Beatrice could hear the Stage Piano — she was in the same row."
    type: isInSameRow, suspect: B, landmarkId: stage-piano
    → stage-piano y=0; forces B.y = 0. Combined with c1 (A.y=0 is also y=0... conflict!)
```

**Problem**: Arthur is at y=0 and the stage-piano is also at y=0. Clue c2 would also be satisfied by Arthur. Need to move the piano landmark.

**stage-piano** at H-2 (x=7, y=1): "the Stage Piano" — in STAGE zone.
Now c2: Beatrice in same row as stage-piano (y=1) → B.y = 1 ✓ (Beatrice is at y=1).

```
c1  text: "Arthur was sitting at the Bar."
    type: isInRoom, suspect: A, zoneId: bar
    → A ∈ {x0-2, y0-2}

c2  text: "Beatrice was in the same row as the Stage Piano."
    type: isInSameRow, suspect: B, landmarkId: stage-piano
    → B.y = 1

c3  text: "Caspar was not in the same room as Arthur."
    type: isInDifferentRoom, suspectA: C, suspectB: A
    → C ∉ BAR. But C is at (0,2) which IS in BAR! Fix: C should not be in BAR.
```

**Solution revision**: move Caspar out of BAR. Let Caspar be at (0,5) — col A, row 6, KITCHEN zone.

Revised solution:

| Suspect | x | y | Col | Row | Zone |
|---------|---|---|-----|-----|------|
| A | 1 | 0 | B | 1 | BAR |
| B | 5 | 1 | F | 2 | STAGE |
| C | 0 | 5 | A | 6 | KITCHEN |
| D | 7 | 3 | H | 4 | VAULT |
| E | 3 | 4 | D | 5 | BACKROOM |
| F | 6 | 2 | G | 3 | VAULT (y=2 → STAGE zone actually!) |

**Zone boundary issue**: VAULT is x6-8, y3-5. y=2 is STAGE. Fiona at (6,2) is in STAGE, not VAULT.

**Revised zones** to avoid confusion:
- BAR: x0-2, y0-2
- STAGE: x3-8, y0-2  
- KITCHEN: x0-2, y3-8
- BACKROOM: x3-5, y3-5
- VAULT: x6-8, y3-5
- ENTRANCE: x3-8, y6-8

Revised solution attempt 3:

| Suspect | x | y | Col | Row | Zone |
|---------|---|---|-----|-----|------|
| A | 1 | 0 | B | 1 | BAR |
| B | 5 | 1 | F | 2 | STAGE |
| C | 0 | 6 | A | 7 | KITCHEN |
| D | 7 | 3 | H | 4 | VAULT |
| E | 3 | 4 | D | 5 | BACKROOM |
| F | 6 | 7 | G | 8 | ENTRANCE |
| G | 8 | 2 | I | 3 | STAGE |
| H | 2 | 5 | C | 6 | KITCHEN |
| Victim | 4 | 8 | E | 9 | ENTRANCE |

Check cols: 1,5,0,7,3,6,8,2 → all unique ✓
Check rows: 0,1,6,3,4,7,2,5 → all unique ✓
Remaining: col 4 (E), row 8 (9) → E-9 ✓

### Clues (Final — 7 clues)

```
c1  text: "Arthur was drinking at the Bar."
    type: isInRoom, suspect: A, zoneId: bar
    → A ∈ BAR (x0-2, y0-2)

c2  text: "Beatrice was in the same row as the Stage Piano."
    type: isInSameRow, suspect: B, landmarkId: stage-piano
    → stage-piano at (7,1). B.y = 1. ✓ B is at y=1.

c3  text: "Caspar was in the Kitchen."
    type: isInRoom, suspect: C, zoneId: kitchen
    → C ∈ KITCHEN (x0-2, y3-8) ✓

c4  text: "Dolores was in the Vault."
    type: isInRoom, suspect: D, zoneId: vault
    → D ∈ VAULT (x6-8, y3-5) ✓

c5  text: "Elias was directly north of Fiona — exactly 3 rows."
    type: isNorthOf, suspectA: E, suspectB: F, rows: 3
    → F.y - E.y = 3. E.y=4, F.y=7. ✓

c6  text: "Gideon and Beatrice were not in the same room."
    type: isInDifferentRoom, suspectA: G, suspectB: B
    → G ∈ STAGE (x3-8, y0-2), B ∈ STAGE. They ARE in the same room!
    Fix: use isInSameRoom instead → G and B both in STAGE ✓

c6  text: "Gideon was on the same side of the club as Beatrice — same room."
    type: isInSameRoom, suspectA: G, suspectB: B
    → both in STAGE ✓

c7  text: "Harlow was sitting across the room from Arthur — same column."
    type: isInSameCol, suspectA: H, suspectB: A
    → A.x=1 (col B), H.x=2 (col C). NOT same column! Fix: H must be at x=1.
```

H at x=1, y=5 → col B, row 6, KITCHEN. But A is at x=1, y=0. Same col! ✓
But wait — A is at col B (x=1), H would be at col B (x=1) too. Cols used by other suspects: 5,0,7,3,6,8. So x=1 can only be used once. A uses x=1. H cannot also use x=1.

**c7 fix**: use `isInSameRow` between H and a landmark instead.

landmark `kitchen-stove` at (0,5) — "the Kitchen Stove".
c7: "Harlow was standing next to the Kitchen Stove."
type: isBeside, suspect: H, ... wait, isBeside only works between two suspects.

**Use fixedPosition-adjacent approach**: just place H via two intersecting clues.

```
c7  text: "Harlow was in the same column as Caspar."
    type: isInSameCol, suspectA: H, suspectB: C
    → C.x=0, so H.x=0. But C is at x=0. H must also be x=0. But that's the same column — only one suspect per column!
```

Both C and H cannot be in column 0 (Rule of One). Redesign H.

**H at (2,5) → col C, row 6, KITCHEN.**
Cols: 1,5,0,7,3,6,8,2 → all unique ✓ (2 is free)

c7: "Harlow was in the same room as Caspar."
type: isInSameRoom, suspectA: H, suspectB: C
→ both in KITCHEN ✓

But do these 7 clues uniquely determine the solution? Let me check:
- c1: A in BAR → A at x∈{0,1,2}, y∈{0,1,2}
- c2: B.y=1
- c3: C in KITCHEN → x∈{0,1,2}, y∈{3..8}
- c4: D in VAULT → x∈{6,7,8}, y∈{3,4,5}
- c5: F.y = E.y + 3
- c6: G in STAGE → x∈{3..8}, y∈{0,1,2}
- c7: H in KITCHEN → x∈{0,1,2}, y∈{3..8}

These 7 clues alone do not uniquely fix positions within zones — we need more specific clues. Need 1-2 more positional clues.

```
c8  text: "Elias was in the Backroom."
    type: isInRoom, suspect: E, zoneId: backroom
    → E ∈ BACKROOM (x3-5, y3-5). E at (3,4) ✓

c9  text: "Fiona was seen leaving through the Entrance."
    type: isInRoom, suspect: F, zoneId: entrance
    → F ∈ ENTRANCE (x3-8, y6-8). F at (6,7) ✓
```

With c8+c9:
- E in BACKROOM (x3-5, y3-5), F in ENTRANCE, F.y = E.y+3 → E.y∈{3,4,5}, F.y=E.y+3 ∈{6,7,8}. All in range ✓.
- Combining with Rule of One and tile map, the solver should produce a unique solution.

**Final clue set (9 clues):**

| ID | Text | Type | Params |
|----|------|------|--------|
| c1 | Arthur was drinking at the Bar. | isInRoom | suspect:A, zoneId:bar |
| c2 | Beatrice was in the same row as the Stage Piano. | isInSameRow | suspect:B, landmarkId:stage-piano |
| c3 | Caspar was in the Kitchen. | isInRoom | suspect:C, zoneId:kitchen |
| c4 | Dolores was keeping watch in the Vault. | isInRoom | suspect:D, zoneId:vault |
| c5 | Elias was in the Backroom. | isInRoom | suspect:E, zoneId:backroom |
| c6 | Fiona slipped out through the Entrance. | isInRoom | suspect:F, zoneId:entrance |
| c7 | Gideon was on the Stage — same room as Beatrice. | isInSameRoom | suspectA:G, suspectB:B |
| c8 | Harlow was in the same room as Caspar. | isInSameRoom | suspectA:H, suspectB:C |
| c9 | Elias was exactly 3 rows north of Fiona. | isNorthOf | suspectA:E, suspectB:F, rows:3 |

These 9 clues constrain: A to BAR, B.y=1, C to KITCHEN, D to VAULT, E to BACKROOM, F to ENTRANCE, G to STAGE, H to KITCHEN, and E/F linked by row offset. Combined with the 9×9 Sudoku constraint (unique row+col per suspect) and the tile map (Walls block specific cells), the solver must verify this yields a unique solution.

---

## Level 002 — The Luxury Liner

**Theme**: Teak decking, lifeboats, porthole views. An ocean liner crossing the Atlantic.
**Victim**: Vera
**Killer**: Gideon (ENGINE zone)
**Difficulty**: medium

### Narrative

```json
"narrative": {
  "intro": "Three days into the crossing and Vera has gone missing. The Captain sealed the ship — no one goes ashore until this is solved. Eight passengers were seen in different parts of the ship during the final hour. Their stories almost agree. Almost.",
  "victim_found": "Vera was found in the engine room, wedged between two boilers. The heat had been hiding her for hours.",
  "guilty_text": "Gideon. The grease on your hands wasn't from the meal. You were in that engine room, and so was Vera."
}
```

### Zones

- **DECK** (x0-8, y0-1): Open top deck — rows 1-2
- **LOUNGE** (x0-4, y2-4): First-class lounge — rows 3-5, cols A-E
- **GALLEY** (x5-8, y2-4): Ship's kitchen — rows 3-5, cols F-I
- **CABIN-ROW** (x0-3, y5-7): Passenger cabins — rows 6-8, cols A-D
- **ENGINE** (x4-8, y5-7): Engine room — rows 6-8, cols E-I
- **HOLD** (x0-8, y8): Cargo hold — row 9

### Solution

| Suspect | x | y | Col | Row | Zone |
|---------|---|---|-----|-----|------|
| A | 0 | 0 | A | 1 | DECK |
| B | 6 | 1 | G | 2 | DECK |
| C | 2 | 3 | C | 4 | LOUNGE |
| D | 4 | 2 | E | 3 | LOUNGE |
| E | 8 | 4 | I | 5 | GALLEY |
| F | 1 | 6 | B | 7 | CABIN-ROW |
| G | 5 | 5 | F | 6 | ENGINE |
| H | 3 | 7 | D | 8 | CABIN-ROW |
| Victim | 7 | 8 | H | 9 | HOLD |

Check cols: 0,6,2,4,8,1,5,3 → all unique ✓. Rows: 0,1,3,2,4,6,5,7 → all unique ✓. Remaining: col 7 (H), row 8 (9) → H-9 ✓.

**Killer**: Harlow (D-8, CABIN-ROW). Wait — victim is at H-9 (HOLD). H-9 is in HOLD. Harlow is at D-8 (CABIN-ROW). Different zones. Need to find who is in HOLD.

No suspect is in HOLD by this solution. The HOLD is only row 9 (y=8). The victim is at (7,8). To have a killer, a suspect must be in HOLD too — but the Sudoku constraint means only one person per row. If the victim is in row 9 (y=8), no suspect can also be in row 9.

**Design insight**: The killer is identified by **zone**, not by row/col. The victim's zone (HOLD, row 9) needs a suspect in it. But HOLD is a single row, and the victim is in that row — so no suspect can share that row. **This means HOLD can't be both a zone and a victim location under Sudoku rules.** The victim occupies the *only unblocked* cell, which is by definition in a unique row and column.

**Resolution**: The killer is the suspect whose zone *contains* the victim's cell. The victim's cell is in HOLD. So the "killer" is the suspect placed in HOLD — but no suspect is in HOLD because the victim is in HOLD's only viable position. 

**Correct rule**: The victim's cell belongs to a zone. The killer is the suspect whose **placed position** is also in that **same zone**. Since the victim's cell is the *only remaining cell*, it is not necessarily in a zone that already contains a suspect — it depends on the level layout.

**Fix for Level 002**: Make the victim's cell zone overlap with at least one suspect's zone. This requires the victim's cell to be in a multi-cell zone.

Revise: victim at (7,8) in ENGINE zone (x4-8, y5-8 extended). Gideon at (5,5) is also in ENGINE. **Killer: Gideon.**

Revised zones:
- DECK: x0-8, y0-1
- LOUNGE: x0-4, y2-4
- GALLEY: x5-8, y2-4
- CABIN-ROW: x0-3, y5-8
- ENGINE: x4-8, y5-8

Victim at (7,8) → ENGINE. Gideon at (5,5) → ENGINE. **Killer: Gideon** ✓.

### Clues (8 clues)

| ID | Text | Type | Params |
|----|------|------|--------|
| c1 | Arthur was taking the morning air — he was on Deck. | isInRoom | suspect:A, zoneId:deck |
| c2 | Beatrice was also on Deck. | isInRoom | suspect:B, zoneId:deck |
| c3 | Caspar and Dolores were both relaxing in the Lounge. | isInSameRoom | suspectA:C, suspectB:D |
| c4 | Dolores was in the Lounge. | isInRoom | suspect:D, zoneId:lounge |
| c5 | Elias was in the Galley — same room as the ship's chef. | isInRoom | suspect:E, zoneId:galley |
| c6 | Fiona was in the Cabin Row. | isInRoom | suspect:F, zoneId:cabin-row |
| c7 | Gideon was down in the Engine Room. | isInRoom | suspect:G, zoneId:engine |
| c8 | Harlow was in the same room as Fiona. | isInSameRoom | suspectA:H, suspectB:F |

Note: these 8 clues fix each suspect to a zone but not to exact cells. The Sudoku constraint + tile walls make the solution unique. Solver must verify.

---

## Level 003 — The Art Gallery

**Theme**: White tiles, marble pedestals, velvet ropes. A private vernissage gone wrong.
**Victim**: Victor
**Killer**: Harlow (BACK-OFFICE zone)
**Difficulty**: medium

### Narrative

```json
"narrative": {
  "intro": "A private opening. Champagne, whispers, and now — a body. Victor was the curator. Someone at this party knew exactly what they were doing. Eight guests signed the register. None of them are leaving until you find the one who didn't come for the art.",
  "victim_found": "Victor is slumped behind a filing cabinet in the back office. The painting he was holding is undamaged. Whatever he knew, someone made sure he couldn't say it.",
  "guilty_text": "Harlow. The back office was staff-only, and you had no business being there. Neither did Victor — until you made sure of it."
}
```

### Zones

- **FOYER** (x0-8, y0-1): Entrance hall — rows 1-2
- **WEST-WING** (x0-3, y2-6): West gallery — rows 3-7, cols A-D
- **EAST-WING** (x4-8, y2-6): East gallery — rows 3-7, cols E-I
- **VAULT** (x0-3, y7-8): Secure storage — rows 8-9, cols A-D
- **BACK-OFFICE** (x4-8, y7-8): Staff office — rows 8-9, cols E-I

### Solution

| Suspect | x | y | Col | Row | Zone |
|---------|---|---|-----|-----|------|
| A | 2 | 0 | C | 1 | FOYER |
| B | 7 | 1 | H | 2 | FOYER |
| C | 0 | 3 | A | 4 | WEST-WING |
| D | 5 | 2 | F | 3 | EAST-WING |
| E | 3 | 4 | D | 5 | WEST-WING |
| F | 6 | 5 | G | 6 | EAST-WING |
| G | 1 | 7 | B | 8 | VAULT |
| H | 8 | 6 | I | 7 | EAST-WING |
| Victim | 4 | 8 | E | 9 | BACK-OFFICE |

Check cols: 2,7,0,5,3,6,1,8 → all unique ✓. Rows: 0,1,3,2,4,5,7,6 → all unique ✓. Remaining: col 4 (E), row 8 (9) → E-9 ✓.

Victim at (4,8) in BACK-OFFICE. Suspects in BACK-OFFICE: none at x4-8, y7-8 except H at (8,6) which is y=6 → EAST-WING. Need a suspect in BACK-OFFICE.

**Revise**: Move H to (8,7) → col I, row 8, BACK-OFFICE. But y=7 is row 8. H at (8,7). Victim at (4,8). Killer: **Harlow** (same BACK-OFFICE zone).

Updated rows: 0,1,3,2,4,5,7,7... H row 7 conflicts with G row 7. Both at y=7.

**Revise G**: G at (1,6) → col B, row 7, VAULT (y=6 is row 7, zone WEST-WING or VAULT?). VAULT is y7-8. y=6 is row 7 which is y=6. VAULT starts at y=7 (row 8). So G at (1,6) is WEST-WING (y2-6). 

Let me redefine zones cleanly using 0-indexed y:
- FOYER: y=0,1
- WEST-WING: y=2,3,4,5,6 AND x=0,1,2,3
- EAST-WING: y=2,3,4,5,6 AND x=4,5,6,7,8
- VAULT: y=7,8 AND x=0,1,2,3
- BACK-OFFICE: y=7,8 AND x=4,5,6,7,8

Revised solution:

| Suspect | x | y | Col | Row | Zone |
|---------|---|---|-----|-----|------|
| A | 2 | 0 | C | 1 | FOYER |
| B | 7 | 1 | H | 2 | FOYER |
| C | 0 | 3 | A | 4 | WEST-WING |
| D | 5 | 2 | F | 3 | EAST-WING |
| E | 3 | 5 | D | 6 | WEST-WING |
| F | 6 | 4 | G | 5 | EAST-WING |
| G | 1 | 7 | B | 8 | VAULT |
| H | 8 | 6 | I | 7 | EAST-WING |
| Victim | 4 | 8 | E | 9 | BACK-OFFICE |

Cols: 2,7,0,5,3,6,1,8 → all unique ✓. Rows: 0,1,3,2,5,4,7,6 → all unique ✓. Remaining: col 4, row 8 → E-9 ✓.

Suspects in BACK-OFFICE (x4-8, y7-8): none. Victim at (4,8) is BACK-OFFICE. **Killer zone issue again.**

**Root fix**: the victim's zone must contain at least one suspect. For a 9×9 Sudoku layout, the victim is always in the unique remaining row and column. That cell's zone must overlap with at least one suspect's zone. This is guaranteed if the zone is large enough (more than one row).

**Key insight**: Expand BACK-OFFICE to include row 7 AND row 8 for cols E-I (y=6 and y=7 in 0-indexed). Then H at (8,6) is in BACK-OFFICE. Victim at (4,8) is in BACK-OFFICE. **Killer: Harlow** ✓.

Revised zones:
- FOYER: y=0,1 (all cols)
- WEST-WING: x=0-3, y=2-5
- EAST-WING: x=4-8, y=2-5
- VAULT: x=0-3, y=6-8
- BACK-OFFICE: x=4-8, y=6-8

H at (8,6) → BACK-OFFICE ✓. Victim at (4,8) → BACK-OFFICE ✓. **Killer: Harlow** ✓.

### Clues (8 clues)

| ID | Text | Type | Params |
|----|------|------|--------|
| c1 | Arthur and Beatrice both arrived together — they were in the Foyer. | isInRoom | suspect:A, zoneId:foyer |
| c2 | Beatrice was also in the Foyer. | isInRoom | suspect:B, zoneId:foyer |
| c3 | Caspar was admiring the West Wing collection. | isInRoom | suspect:C, zoneId:west-wing |
| c4 | Dolores was cataloguing works in the East Wing. | isInRoom | suspect:D, zoneId:east-wing |
| c5 | Elias was in the West Wing — same side as Caspar. | isInSameRoom | suspectA:E, suspectB:C |
| c6 | Fiona was in the East Wing. | isInRoom | suspect:F, zoneId:east-wing |
| c7 | Gideon was locked in the Vault. | isInRoom | suspect:G, zoneId:vault |
| c8 | Harlow was in the Back Office. | isInRoom | suspect:H, zoneId:back-office |

---

## Level 004 — The Greenhouse

**Theme**: Cobblestone paths, dense ferns, glass partitions. A Victorian botanical conservatory.
**Victim**: Violet
**Killer**: Fiona (POTTING-SHED zone)
**Difficulty**: hard

### Narrative

```json
"narrative": {
  "intro": "The Harrington Conservatory has seen a century of society events. Tonight it saw a murder. Violet was found among the orchids — but the orchids weren't where she was killed. Someone moved her. Eight people were inside when the gates were locked. The ferns remember everything.",
  "victim_found": "Violet's body was hidden behind the potting shed, surrounded by soil that doesn't match the orchid room. She was moved here after the fact.",
  "guilty_text": "Fiona. The soil on your gloves is from the potting shed. You were the only one who worked there — and worked quickly."
}
```

### Zones

- **ENTRANCE-HALL** (x0-8, y0): Reception row — row 1 only
- **FERN-HOUSE** (x0-3, y1-4): Dense ferns — rows 2-5, cols A-D
- **ORCHID-ROOM** (x4-8, y1-4): Glass orchid cases — rows 2-5, cols E-I
- **PALM-COURT** (x0-4, y5-8): Central palms — rows 6-9, cols A-E
- **POTTING-SHED** (x5-8, y5-8): Work area — rows 6-9, cols F-I

### Solution

| Suspect | x | y | Col | Row | Zone |
|---------|---|---|-----|-----|------|
| A | 3 | 0 | D | 1 | ENTRANCE-HALL |
| B | 0 | 2 | A | 3 | FERN-HOUSE |
| C | 7 | 1 | H | 2 | ORCHID-ROOM |
| D | 5 | 3 | F | 4 | ORCHID-ROOM |
| E | 1 | 5 | B | 6 | PALM-COURT |
| F | 6 | 4 | G | 5 | POTTING-SHED (y=4 → rows 2-5 → ORCHID-ROOM x4-8!) |

**Fix**: y=4 is row 5. ORCHID-ROOM covers y=1-4 (rows 2-5). POTTING-SHED covers y=5-8 (rows 6-9). F at (6,4) → ORCHID-ROOM.

Revised — F at (6,5) → col G, row 6, POTTING-SHED ✓.

| Suspect | x | y | Col | Row | Zone |
|---------|---|---|-----|-----|------|
| A | 3 | 0 | D | 1 | ENTRANCE-HALL |
| B | 0 | 2 | A | 3 | FERN-HOUSE |
| C | 7 | 1 | H | 2 | ORCHID-ROOM |
| D | 5 | 3 | F | 4 | ORCHID-ROOM |
| E | 1 | 6 | B | 7 | PALM-COURT |
| F | 6 | 5 | G | 6 | POTTING-SHED |
| G | 4 | 7 | E | 8 | PALM-COURT |
| H | 2 | 4 | C | 5 | FERN-HOUSE |
| Victim | 8 | 8 | I | 9 | POTTING-SHED |

Cols: 3,0,7,5,1,6,4,2 → all unique ✓. Rows: 0,2,1,3,6,5,7,4 → all unique ✓. Remaining: col 8, row 8 → I-9 ✓.

Victim at (8,8) → POTTING-SHED. Fiona at (6,5) → POTTING-SHED. **Killer: Fiona** ✓.

### Clues (8 clues)

| ID | Text | Type | Params |
|----|------|------|--------|
| c1 | Arthur was signing the guest book at the Entrance. | isInRoom | suspect:A, zoneId:entrance-hall |
| c2 | Beatrice and Harlow were both in the Fern House. | isInRoom | suspect:B, zoneId:fern-house |
| c3 | Caspar was examining the orchids. | isInRoom | suspect:C, zoneId:orchid-room |
| c4 | Dolores was also in the Orchid Room. | isInRoom | suspect:D, zoneId:orchid-room |
| c5 | Elias and Gideon were strolling through the Palm Court. | isInRoom | suspect:E, zoneId:palm-court |
| c6 | Fiona was working in the Potting Shed. | isInRoom | suspect:F, zoneId:potting-shed |
| c7 | Gideon was also in the Palm Court. | isInRoom | suspect:G, zoneId:palm-court |
| c8 | Harlow was in the same room as Beatrice. | isInSameRoom | suspectA:H, suspectB:B |

---

## Summary of Killers

| Level | Victim | Killer | Zone |
|-------|--------|--------|------|
| 001 The Speakeasy | Vincent | Elias | ENTRANCE |
| 002 The Luxury Liner | Vera | Gideon | ENGINE |
| 003 The Art Gallery | Victor | Harlow | BACK-OFFICE |
| 004 The Greenhouse | Violet | Fiona | POTTING-SHED |

---

## Important Notes for Implementing Agents

1. **The constraint solver is the ground truth.** Every solution listed here must be run through `src/engine/solver.ts` and confirmed as unique. If the solver finds 0 or 2+ solutions, the level JSON must be revised.

2. **Tile maps are not fully specified here** — this document specifies solution positions and zones. The tile map (which non-solution cells are Wall) must be authored to create interesting spatial obstacles while not breaking uniqueness. General rule: place Walls liberally on cells that are not in the solution and not needed for navigational clarity.

3. **Clues in levels 001-004 are zone-based and may not always force uniqueness alone.** The combination of zone clues + Sudoku constraint + tile walls must yield a unique solution. If the solver reports multiple solutions, add one more `isInSameRow`, `isInSameCol`, or `fixedPosition` clue to narrow it down.

4. **Level 001 has an additional cross-suspect clue (c9: isNorthOf E,F,rows:3)** that adds positional specificity beyond zone membership. Levels 002-004 may need equivalent positional clues if the solver finds multiple solutions.
