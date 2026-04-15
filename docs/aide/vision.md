# alibi: Vision

> Created: 2026-04-14 | Status: Active

## What ALIBI Is

ALIBI is a browser murder mystery logic-deduction game. Players place suspects on an illustrated top-down floor plan by satisfying witness alibis. When all suspects are placed correctly, one empty cell remains — the victim's location is revealed and the killer is named.

The mechanic is Sudoku-style row/column exclusion combined with spatial room constraints and natural-language deduction clues. Every puzzle is procedurally generated from a seed — deterministic, shareable, infinitely replayable.

Inspired directly by the book Murdoku by Manuel Garand. This is its digital counterpart: same logic, same everyday settings, same illustrated charm — but with infinite cases, campaign progression, and daily challenges.

---

## The Three Play Modes

### 1. Campaign Mode (the main experience)

A campaign is a sequential case file of 12 mysteries across all themes, escalating in difficulty. The player is a detective working through their caseload from rookie to veteran.

- **12 cases per campaign**: cases 1–4 (Easy), 5–8 (Medium), 9–12 (Hard)
- Cases are pre-generated at campaign start using deterministic seeds — starting a new campaign with the same "campaign seed" always produces the exact same 12 cases
- Progress is stored in localStorage: completed cases, current case, best solve times, detective rank
- Players can quit mid-puzzle and resume exactly where they left off
- Completing all 12 cases earns a Detective Rank: Rookie → Investigator → Detective → Senior Detective → Chief Inspector
- The campaign screen shows a case file board: 12 case cards arranged as a visual timeline, each showing case name, theme icon, status (locked / in progress / solved), and completion time
- A player can start a New Campaign at any time (generates new seeds, resets rank)
- Multiple save slots: up to 3 campaigns in parallel (labelled Campaign 1, 2, 3)

### 2. Quick Play Mode

Pick any theme and any difficulty. Get one fresh puzzle immediately. No progression tracking — just pure play.

- Theme selector: all 10 themes visible with illustrated preview
- Difficulty selector: Easy / Medium / Hard
- "New Puzzle" generates a new random seed
- Seed in URL hash — shareable
- Completion shows share card but does not affect campaign progress

### 3. Daily Case

Every day a new case is automatically available, the same puzzle for every player worldwide. Seed derived from the date. No setup required — it's ready when you open the game.

- Shows on the home screen as a highlighted card: "Today's Case — The Coffee Shop"
- Streak counter: consecutive days solved (stored in localStorage)
- Completion card is shareable as a text snippet (like Wordle): theme, difficulty, time, streak

---

## The Ten Themes

Each theme is a named real-world setting with its own floor plan variants (one per difficulty), illustrated furniture sprites, color palette, suspect name set, and narrative flavor text.

| # | Theme | Setting | Mood | Key rooms |
|---|---|---|---|---|
| 1 | **The Coffee Shop** | Urban café | Cozy | Bar, Main Area, Restroom |
| 2 | **The Bookstore** | Local bookshop | Quiet | Crime Novels, Romance, Non-Fiction, Best Sellers, Checkout |
| 3 | **The Backyard** | Suburban home | Relaxed | Backyard, Jacuzzi, Deck, Bedroom, Living Room, Kitchen |
| 4 | **The Holiday Mall** | Christmas shopping center | Festive | Electronics, Santa's Village, Toy Store, Walkway, Food Court |
| 5 | **The Restaurant** | Upscale dinner service | Tense | Kitchen, Dining Room, Bar, Private Room, Restroom |
| 6 | **The Gym** | Fitness center | Energetic | Weights, Cardio, Locker Room, Pool, Sauna |
| 7 | **The Office** | Corporate open plan | Dry | Open Plan, Meeting Room, Kitchen, Server Room, Reception |
| 8 | **The Garden Party** | Outdoor summer party | Bright | Lawn, Gazebo, Pool Area, Greenhouse, Garage |
| 9 | **The Hospital** | Busy medical ward | Clinical | Ward, Operating Theatre, Waiting Room, Pharmacy, Cafeteria |
| 10 | **The Carnival** | Travelling fairground | Chaotic | Carousel, Funhouse, Ticket Booth, Food Stands, Backstage |

---

## Difficulty and Grid Scaling

Difficulty controls grid size and clue complexity — not theme. Every theme has three floor plan variants:

| Difficulty | Grid size | Suspects | Clue count | Clue complexity |
|---|---|---|---|---|
| Easy | 5×5 (or 4×5) | 5 | 5–6 | Zone + column/row clues only |
| Medium | 6×6 (or 6×7) | 6 | 6–8 | + adjacency, tile-type clues |
| Hard | 7×8 (or 8×8) | 7–8 | 8–10 | All 14 clue types, multi-constraint deduction |

The Easy variant of The Backyard is a small 5×5 floor plan with 3 rooms. The Hard variant is a large 8×8 with 6 rooms and irregular shapes. Same setting, very different challenge.

---

## Progression and Detective Rank

| Rank | Required | Badge |
|---|---|---|
| Rookie | Start | 🔍 |
| Investigator | Complete campaign cases 1–4 | 🔎 |
| Detective | Complete cases 5–8 | 🕵️ |
| Senior Detective | Complete cases 9–12 (full campaign) | 🕵️‍♂️ |
| Chief Inspector | Complete 3 full campaigns | ⭐ |

Stats tracked per player: total cases solved, best time per theme/difficulty, current streak, cases solved today.

---

## Key Design Decisions

1. **Procedural generation, seeded and deterministic.** Same seed + theme + difficulty = same puzzle every time. Campaign seeds are stored; daily seeds derive from the date.

2. **Floor plans vary by difficulty, not just theme.** Easy puzzles use smaller, simpler rooms. Hard puzzles use larger grids with irregular rooms, narrow corridors, and more furniture objects to reason about.

3. **Rooms are arbitrary cell shapes.** Not rectangles. The generator defines rooms as explicit lists of cells. An L-shaped gym, a narrow server room corridor, a circular carousel area — all valid.

4. **Everything in localStorage, nothing on a server.** Campaign progress, daily streaks, stats, in-progress puzzle state — all local. No accounts, no sync. Static GitHub Pages.

5. **Real illustrated SVG furniture sprites, bundled.** Plants, chairs, shelves, cash registers, hospital beds, carousel horses — each theme has its own sprite set. Bundled via Vite at build time. No runtime fetches.

6. **10 themes, 3 difficulty variants each = 30 distinct floor plans.** These are hand-crafted assets (the floor plan tile arrays and room cell lists). The generator fills them with suspects and clues procedurally.

7. **Suspect names are alphabetical by position.** Suspect 0 is always an A-name, suspect 1 a B-name, suspect 2 a C-name, and so on. This makes the initial on the grid immediately identify the suspect. All theme `suspectNames` arrays must be ordered A→B→C→… (index 0 = A, index 1 = B, …). The generator assigns names by index, not by random selection from the pool.

8. **Victim names always start with V.** All entries in a theme's `victimNames` array must begin with the letter V.

9. **Pixel art visual aesthetic.** The game uses pixel/bitmap fonts for all text and crisp pixel rendering on the canvas (`image-rendering: pixelated`). Each theme's `colorPalette` is applied by the renderer. External CSS/font libraries are permitted to achieve this look.

10. **Cell annotation system.** Players can annotate cells during deduction without committing to a placement: an **X** marks "nobody here"; one or more **?** marks indicate candidate suspects (multiple candidates per cell are allowed). Annotations are saved in `PuzzleState` and are included in the undo/redo stack.

---

## What "Done" Looks Like

A player opens the URL. They see a noir-styled home screen with three big buttons: Campaign, Quick Play, Daily Case. They start a new campaign, see a case file board with 12 cases. They play Case 1 (Easy, Coffee Shop). They see a **pixel-art floor plan** with the floor plan divided into visually distinct colored rooms (Bar tinted amber, Main Area slate, Restroom dusty rose), furniture objects rendered as recognizable pixel icons (a plant, a bar counter, a cash register), chairs as visible seat icons. Five suspect portrait cards on the left panel labelled A–E with geometric pixel avatars. Six natural-language clue cards below in readable text. They annotate cells with X and ? while deducing, confirm placements, watch clues check off, click the last empty cell (which had a ghost '?' victim marker all along), see the GUILTY stamp slam in with the killer's name. The whole experience looks like it was made by a real game studio.

That is the product.

---

## Visual Quality Bar (mandatory — not optional polish)

The game must look like a **professional shipped game**. Specific requirements:

1. **Room zones are visible.** A player can instantly see distinct colored areas on the grid. Clues referencing rooms (\"Ben was not in the Main Area\") are immediately decodable by color.
2. **Furniture objects are recognizable.** Plants look like plants. Bar counters look like bar counters. No plain beige boxes with abbreviated text.
3. **Clue text is readable without zooming.** Clue card body text uses a readable font (not pixel font) at ≥12px.
4. **The grid fills the screen.** On a standard desktop (1440px), the grid should occupy at least 55% of the viewport height. Cell size is responsive.
5. **There is visual separation** between the game grid and the sidebar. Not just two divs flush against each other.
6. **The victim is always present.** A '?' marker indicates the unknown victim location from the start. It does not appear out of nowhere when all suspects are placed.
7. **The radial menu is a wheel.** Opening a cell shows a circular pie menu centered on the click, not a vertical dropdown.
