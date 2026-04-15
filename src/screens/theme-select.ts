/**
 * Theme selector screen — pick theme + difficulty for Quick Play.
 */

import { getAllThemes } from '../themes/index';

const THEME_SELECT_STYLES = `
.alibi-theme-select {
  min-height: 100vh;
  background: #1a1a2e;
  font-family: monospace;
  color: #fff;
  padding: 32px;
}
.alibi-theme-select-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 28px;
}
.alibi-theme-select-header h1 {
  font-size: 1.5em;
  color: #c0392b;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}
.alibi-theme-back {
  background: #1e1e35;
  color: #fff;
  border: 1px solid #444;
  padding: 6px 14px;
  font-family: monospace;
  font-size: 12px;
  cursor: pointer;
  border-radius: 3px;
}
.alibi-theme-back:hover { background: #2a2a50; }
.alibi-difficulty-row {
  display: flex;
  gap: 10px;
  margin-bottom: 28px;
}
.alibi-diff-btn {
  padding: 8px 20px;
  font-family: monospace;
  font-size: 13px;
  cursor: pointer;
  border: 2px solid #444;
  border-radius: 4px;
  background: #1e1e35;
  color: #888;
  transition: all 0.1s;
}
.alibi-diff-btn.selected {
  color: #fff;
  border-color: #c0392b;
}
.alibi-diff-btn.easy.selected   { background: #2d5a2d; border-color: #7ec87e; color: #7ec87e; }
.alibi-diff-btn.medium.selected { background: #5a4a1a; border-color: #c8a03c; color: #c8a03c; }
.alibi-diff-btn.hard.selected   { background: #5a1a1a; border-color: #c87e7e; color: #c87e7e; }
.alibi-theme-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 12px;
  margin-bottom: 28px;
  max-width: 900px;
}
.alibi-theme-card {
  background: #1e1e35;
  border: 2px solid #444;
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: border-color 0.12s, transform 0.1s;
  text-align: center;
  font-size: 14px;
}
.alibi-theme-card:hover { border-color: #888; transform: translateY(-2px); }
.alibi-theme-card.selected { border-color: #c0392b; background: #2a0d0d; }
.alibi-theme-icon { font-size: 2em; margin-bottom: 8px; }
.alibi-play-btn {
  padding: 14px 40px;
  font-family: monospace;
  font-size: 1.1em;
  font-weight: bold;
  cursor: pointer;
  background: #c0392b;
  color: #fff;
  border: none;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  transition: background 0.12s;
}
.alibi-play-btn:hover { background: #e74c3c; }
.alibi-play-btn:disabled { background: #444; cursor: default; opacity: 0.5; }
@media (max-width: 699px) {
  .alibi-theme-select { padding: 16px 12px; }
  .alibi-difficulty-row { flex-wrap: wrap; gap: 8px; }
  .alibi-diff-btn { padding: 10px 14px; font-size: 12px; min-height: 40px; }
  .alibi-theme-grid { gap: 8px; }
  .alibi-theme-card { padding: 12px; font-size: 13px; }
  .alibi-play-btn { width: 100%; padding: 14px; font-size: 1em; }
  .alibi-theme-select-header h1 { font-size: 1.2em; }
}
`;

const THEME_ICONS: Record<string, string> = {
  'coffee-shop':  '☕',
  'bookstore':    '📚',
  'backyard':     '🌿',
  'holiday-mall': '🎄',
  'restaurant':   '🍽',
  'gym':          '💪',
  'office':       '🏢',
  'garden-party': '🌸',
  'hospital':     '🏥',
  'carnival':     '🎡',
};

let themeSelectStylesInjected = false;
function injectThemeSelectStyles(): void {
  if (themeSelectStylesInjected) return;
  const s = document.createElement('style');
  s.textContent = THEME_SELECT_STYLES;
  document.head.appendChild(s);
  themeSelectStylesInjected = true;
}

export function mountThemeSelector(): void {
  injectThemeSelectStyles();

  const canvas = document.getElementById('game-canvas');
  if (canvas) canvas.style.display = 'none';

  const screen = document.createElement('div');
  screen.setAttribute('data-testid', 'screen-theme-select');
  screen.className = 'alibi-theme-select';

  // Header
  const header = document.createElement('div');
  header.className = 'alibi-theme-select-header';

  const backBtn = document.createElement('button');
  backBtn.className = 'alibi-theme-back';
  backBtn.textContent = '← Home';
  backBtn.addEventListener('click', () => {
    screen.remove();
    window.location.href = window.location.pathname;
  });

  const h1 = document.createElement('h1');
  h1.textContent = '🎲 Quick Play';
  header.append(backBtn, h1);

  // Difficulty selector
  let selectedDifficulty: 'easy' | 'medium' | 'hard' = 'easy';
  const diffRow = document.createElement('div');
  diffRow.className = 'alibi-difficulty-row';

  const diffBtns: Record<string, HTMLButtonElement> = {};
  for (const [d, label] of [['easy', 'Easy'], ['medium', 'Medium'], ['hard', 'Hard']] as const) {
    const b = document.createElement('button');
    b.setAttribute('data-testid', `difficulty-${d}`);
    b.className = `alibi-diff-btn ${d}${d === 'easy' ? ' selected' : ''}`;
    b.textContent = label;
    b.addEventListener('click', () => {
      selectedDifficulty = d;
      Object.values(diffBtns).forEach(btn => btn.classList.remove('selected'));
      b.classList.add('selected');
    });
    diffBtns[d] = b;
    diffRow.appendChild(b);
  }

  // Theme grid
  let selectedThemeId: string | null = null;
  const themeGrid = document.createElement('div');
  themeGrid.className = 'alibi-theme-grid';

  const themeCardEls: Record<string, HTMLElement> = {};
  for (const theme of getAllThemes()) {
    if (theme.id === 'stub') continue; // never show stub theme
    const card = document.createElement('div');
    card.setAttribute('data-testid', `theme-card-${theme.id}`);
    card.className = 'alibi-theme-card';

    const icon = document.createElement('div');
    icon.className = 'alibi-theme-icon';
    icon.textContent = THEME_ICONS[theme.id] ?? '🔍';

    const name = document.createElement('div');
    name.textContent = theme.name.replace(/^The /, '');

    card.append(icon, name);
    card.addEventListener('click', () => {
      selectedThemeId = theme.id;
      Object.values(themeCardEls).forEach(el => el.classList.remove('selected'));
      card.classList.add('selected');
      playBtn.disabled = false;
    });
    themeCardEls[theme.id] = card;
    themeGrid.appendChild(card);
  }

  // Play button
  const playBtn = document.createElement('button');
  playBtn.setAttribute('data-testid', 'btn-play');
  playBtn.className = 'alibi-play-btn';
  playBtn.textContent = 'Play';
  playBtn.disabled = true;
  playBtn.addEventListener('click', () => {
    if (!selectedThemeId) return;
    const seed = Math.floor(Math.random() * 0xffffffff);
    screen.remove();
    window.location.href =
      `${window.location.pathname}?theme=${selectedThemeId}&difficulty=${selectedDifficulty}&seed=${seed}`;
  });

  screen.append(header, diffRow, themeGrid, playBtn);
  document.body.appendChild(screen);
}
