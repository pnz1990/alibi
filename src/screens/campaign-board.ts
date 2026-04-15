/**
 * Campaign board screen — shows 12 case cards for a campaign.
 *
 * Stub implementation for Stage 3. Full campaign logic (seed derivation,
 * save slots, CampaignSave) is implemented in item #17.
 *
 * Displays a fixed 12-case layout with Case 0 unlocked, rest locked.
 */

// getDailySeed reserved for future daily integration (item #17)
// import { getDailySeed } from './home';

const BOARD_STYLES = `
.alibi-campaign-board {
  min-height: 100vh;
  background: #1a1a2e;
  font-family: monospace;
  color: #fff;
  padding: 32px;
}
.alibi-campaign-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
}
.alibi-campaign-header h1 {
  font-size: 1.8em;
  color: #c0392b;
  text-transform: uppercase;
  letter-spacing: 0.15em;
}
.alibi-campaign-back {
  background: #1e1e35;
  color: #fff;
  border: 1px solid #444;
  padding: 6px 14px;
  font-family: monospace;
  font-size: 12px;
  cursor: pointer;
  border-radius: 3px;
}
.alibi-campaign-back:hover { background: #2a2a50; }
.alibi-case-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
  max-width: 900px;
}
.alibi-case-card {
  background: #1e1e35;
  border: 2px solid #444;
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: border-color 0.15s, transform 0.1s;
}
.alibi-case-card:hover:not(.locked) {
  border-color: #c0392b;
  transform: translateY(-2px);
}
.alibi-case-card.locked {
  opacity: 0.45;
  cursor: default;
}
.alibi-case-card.unlocked { border-color: #c0392b; }
.alibi-case-num {
  font-size: 0.75em;
  color: #888;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.alibi-case-title {
  font-size: 0.95em;
  font-weight: bold;
  margin-bottom: 8px;
}
.alibi-case-difficulty {
  font-size: 0.7em;
  padding: 2px 8px;
  border-radius: 3px;
  background: #333;
  display: inline-block;
  margin-bottom: 8px;
}
.alibi-case-difficulty.easy   { background: #2d5a2d; color: #7ec87e; }
.alibi-case-difficulty.medium { background: #5a4a1a; color: #c8a03c; }
.alibi-case-difficulty.hard   { background: #5a1a1a; color: #c87e7e; }
.alibi-case-status { font-size: 1.2em; }
`;

let boardStylesInjected = false;
function injectBoardStyles(): void {
  if (boardStylesInjected) return;
  const s = document.createElement('style');
  s.textContent = BOARD_STYLES;
  document.head.appendChild(s);
  boardStylesInjected = true;
}

const CASE_TEMPLATE: Array<{ title: string; difficulty: 'easy' | 'medium' | 'hard'; seed: number }> = [
  { title: 'The Coffee Shop',  difficulty: 'easy',   seed: 100 },
  { title: 'The Bookstore',    difficulty: 'easy',   seed: 101 },
  { title: 'The Backyard',     difficulty: 'easy',   seed: 102 },
  { title: 'The Holiday Mall', difficulty: 'easy',   seed: 103 },
  { title: 'The Coffee Shop',  difficulty: 'medium', seed: 200 },
  { title: 'The Bookstore',    difficulty: 'medium', seed: 201 },
  { title: 'The Backyard',     difficulty: 'medium', seed: 202 },
  { title: 'The Holiday Mall', difficulty: 'medium', seed: 203 },
  { title: 'The Coffee Shop',  difficulty: 'hard',   seed: 300 },
  { title: 'The Bookstore',    difficulty: 'hard',   seed: 301 },
  { title: 'The Backyard',     difficulty: 'hard',   seed: 302 },
  { title: 'The Holiday Mall', difficulty: 'hard',   seed: 303 },
];

export function mountCampaignBoard(): void {
  injectBoardStyles();

  const canvas = document.getElementById('game-canvas');
  if (canvas) canvas.style.display = 'none';

  const screen = document.createElement('div');
  screen.setAttribute('data-testid', 'screen-campaign-board');
  screen.className = 'alibi-campaign-board';

  // Header
  const header = document.createElement('div');
  header.className = 'alibi-campaign-header';

  const backBtn = document.createElement('button');
  backBtn.className = 'alibi-campaign-back';
  backBtn.textContent = '← Home';
  backBtn.addEventListener('click', () => {
    screen.remove();
    window.location.href = window.location.pathname;
  });

  const h1 = document.createElement('h1');
  h1.textContent = '📁 Campaign';
  header.append(backBtn, h1);

  // Case grid
  const grid = document.createElement('div');
  grid.className = 'alibi-case-grid';

  CASE_TEMPLATE.forEach((c, i) => {
    const card = document.createElement('div');
    card.setAttribute('data-testid', `case-card-${i}`);
    card.className = `alibi-case-card ${i === 0 ? 'unlocked' : 'locked'}`;

    const num = document.createElement('div');
    num.className = 'alibi-case-num';
    num.textContent = `Case ${i + 1}`;

    const title = document.createElement('div');
    title.className = 'alibi-case-title';
    title.textContent = i === 0 ? c.title : '???';

    const diff = document.createElement('div');
    diff.className = `alibi-case-difficulty ${c.difficulty}`;
    diff.textContent = c.difficulty.charAt(0).toUpperCase() + c.difficulty.slice(1);

    const statusEl = document.createElement('div');
    statusEl.setAttribute('data-testid', `case-status-${i}`);
    statusEl.className = `alibi-case-status ${i === 0 ? '' : 'locked'}`;
    statusEl.textContent = i === 0 ? '📁' : '🔒';

    card.append(num, title, diff, statusEl);

    if (i === 0) {
      card.addEventListener('click', () => {
        screen.remove();
        window.location.href = `${window.location.pathname}?theme=coffee-shop&difficulty=${c.difficulty}&seed=${c.seed}`;
      });
    }

    grid.appendChild(card);
  });

  screen.append(header, grid);
  document.body.appendChild(screen);
}
