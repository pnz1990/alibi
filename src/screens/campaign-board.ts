/**
 * Campaign board screen — shows 12 case cards for a real CampaignSave.
 *
 * Flow:
 *   1. Check all 3 slots for saves.
 *   2. If none: show New Campaign button → createNewCampaign() → persist → go to Case 0.
 *   3. If saves exist: show slot picker. Player selects a slot → case board.
 *   4. Each case card shows theme name, difficulty, status, solve time.
 */

import type { CampaignSave } from '../storage/schema';
import { loadCampaign, saveCampaign, clearCampaign } from '../storage/progress';
import { createNewCampaign } from '../modes/campaign';
import { getAllThemes } from '../themes/index';

const BOARD_STYLES = `
.alibi-campaign-board {
  min-height: 100vh;
  background: #0d0d1a;
  background-image: repeating-linear-gradient(
    45deg, rgba(255,255,255,0.01) 0px, rgba(255,255,255,0.01) 1px,
    transparent 1px, transparent 8px
  );
  font-family: 'Press Start 2P', monospace;
  color: #fff;
  padding: 24px;
}
.alibi-campaign-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 24px;
}
.alibi-campaign-header h1 {
  font-size: 1em;
  color: #c0392b;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-shadow: 2px 2px 0 #6b0000;
}
.alibi-campaign-back {
  background: #1a1a2e;
  color: #888;
  border: 2px solid #444;
  border-radius: 0;
  padding: 6px 12px;
  font-family: 'Press Start 2P', monospace;
  font-size: 7px;
  cursor: pointer;
  box-shadow: 2px 2px 0 #000;
}
.alibi-campaign-back:hover { color: #fff; border-color: #888; }

/* Slot picker */
.alibi-slot-picker {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 40px 0;
}
.alibi-slot-label {
  font-size: 0.6em;
  color: #888;
  letter-spacing: 0.1em;
  margin-bottom: 8px;
}
.alibi-slot-cards {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
}
.alibi-slot-card {
  width: 180px;
  padding: 16px;
  background: #1a1a2e;
  border: 2px solid #333;
  border-radius: 0;
  cursor: pointer;
  box-shadow: 3px 3px 0 #000;
  transition: border-color 0.1s;
}
.alibi-slot-card:hover { border-color: #c0392b; }
.alibi-slot-card.has-save { border-color: #555; }
.alibi-slot-card.has-save:hover { border-color: #c0392b; }
.alibi-slot-title { font-size: 7px; color: #c0392b; margin-bottom: 8px; }
.alibi-slot-meta { font-size: 5px; color: #888; line-height: 2; }
.alibi-slot-new-btn {
  background: #c0392b;
  color: #fff;
  border: 2px solid #ff5a47;
  border-radius: 0;
  padding: 12px 24px;
  font-family: 'Press Start 2P', monospace;
  font-size: 7px;
  cursor: pointer;
  box-shadow: 3px 3px 0 #6b0000;
}
.alibi-slot-new-btn:hover { background: #e74c3c; }

/* Case board */
.alibi-rank-badge {
  font-size: 6px;
  color: #c0a020;
  margin-bottom: 16px;
  letter-spacing: 0.1em;
}
.alibi-case-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 12px;
  max-width: 900px;
}
.alibi-case-card {
  background: #1a1a2e;
  border: 2px solid #333;
  border-radius: 0;
  padding: 12px;
  cursor: pointer;
  box-shadow: 3px 3px 0 #000;
  transition: border-color 0.1s, transform 0.1s;
}
.alibi-case-card:hover:not(.locked) { border-color: #c0392b; transform: translate(-1px,-1px); }
.alibi-case-card.locked { opacity: 0.35; cursor: default; }
.alibi-case-card.unlocked { border-color: #8b6914; }
.alibi-case-card.solved { border-color: #2a6a2a; }
.alibi-case-num {
  font-size: 6px;
  color: #555;
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.alibi-case-theme { font-size: 7px; font-weight: bold; margin-bottom: 6px; }
.alibi-case-difficulty {
  display: inline-block;
  font-size: 5px;
  padding: 2px 6px;
  margin-bottom: 8px;
}
.alibi-case-difficulty.easy   { background: #1a4a1a; color: #6ac86a; }
.alibi-case-difficulty.medium { background: #4a3a0a; color: #c8a03c; }
.alibi-case-difficulty.hard   { background: #4a0a0a; color: #c86a6a; }
.alibi-case-status { font-size: 12px; margin-bottom: 4px; }
.alibi-case-time { font-size: 5px; color: #888; }
`;

let boardStylesInjected = false;
function injectBoardStyles(): void {
  if (boardStylesInjected) return;
  const s = document.createElement('style');
  s.textContent = BOARD_STYLES;
  document.head.appendChild(s);
  boardStylesInjected = true;
}

const RANK_LABELS: Record<string, string> = {
  rookie:      '🔍 Rookie Detective',
  investigator:'🔎 Investigator',
  detective:   '🕵 Detective',
  senior:      '🕵️ Senior Detective',
  chief:       '⭐ Chief Inspector',
};

const DIFF_LABELS: Record<string, string> = {
  easy:'Easy', medium:'Medium', hard:'Hard',
};

function formatTime(ms: number): string {
  const m = Math.floor(ms / 60000), s = Math.floor((ms % 60000) / 1000);
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

function getThemeName(themeId: string): string {
  try {
    const themes = getAllThemes();
    return themes.find(t => t.id === themeId)?.name ?? themeId;
  } catch {
    return themeId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }
}

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
  screen.appendChild(header);

  // Load all 3 slots
  const saves = [
    loadCampaign(1),
    loadCampaign(2),
    loadCampaign(3),
  ] as const;

  const hasSaves = saves.some(s => s !== null);

  if (!hasSaves) {
    // No saves — show new campaign starter
    renderNoSaves(screen);
  } else {
    // Show slot picker first
    renderSlotPicker(screen, saves as Array<CampaignSave | null>);
  }

  document.body.appendChild(screen);
}

function renderNoSaves(screen: HTMLElement): void {
  const picker = document.createElement('div');
  picker.className = 'alibi-slot-picker';

  const label = document.createElement('div');
  label.className = 'alibi-slot-label';
  label.textContent = 'No campaigns in progress.';

  const newBtn = document.createElement('button');
  newBtn.className = 'alibi-slot-new-btn';
  newBtn.textContent = '+ Start New Campaign';
  newBtn.addEventListener('click', () => {
    const save = createNewCampaign(1);
    saveCampaign(save);
    const case0 = save.cases[0];
    screen.remove();
    window.location.href =
      `${window.location.pathname}?theme=${case0.themeId}&difficulty=${case0.difficulty}&seed=${case0.seed}&campaign=1&caseIndex=0`;
  });

  picker.append(label, newBtn);
  screen.appendChild(picker);
}

function renderSlotPicker(
  screen: HTMLElement,
  saves: Array<CampaignSave | null>,
): void {
  const picker = document.createElement('div');
  picker.className = 'alibi-slot-picker';

  const label = document.createElement('div');
  label.className = 'alibi-slot-label';
  label.textContent = 'Choose a save slot:';
  picker.appendChild(label);

  const cards = document.createElement('div');
  cards.className = 'alibi-slot-cards';

  saves.forEach((save, idx) => {
    const slotNum = (idx + 1) as 1 | 2 | 3;
    const card = document.createElement('div');
    card.className = 'alibi-slot-card' + (save ? ' has-save' : '');

    const title = document.createElement('div');
    title.className = 'alibi-slot-title';
    title.textContent = `Slot ${slotNum}`;

    const meta = document.createElement('div');
    meta.className = 'alibi-slot-meta';

    if (save) {
      const solved = save.cases.filter(c => c.status === 'solved').length;
      meta.textContent =
        `Case ${save.currentCase + 1}/12\n` +
        `Rank: ${RANK_LABELS[save.rank] ?? save.rank}\n` +
        `${solved}/12 solved`;

      card.addEventListener('click', () => {
        picker.remove();
        renderCaseBoard(screen, save);
      });
    } else {
      meta.textContent = 'Empty';
      card.addEventListener('click', () => {
        const newSave = createNewCampaign(slotNum);
        saveCampaign(newSave);
        const case0 = newSave.cases[0];
        screen.remove();
        window.location.href =
          `${window.location.pathname}?theme=${case0.themeId}&difficulty=${case0.difficulty}&seed=${case0.seed}&campaign=${slotNum}&caseIndex=0`;
      });
    }

    card.append(title, meta);
    cards.appendChild(card);
  });

  picker.appendChild(cards);
  screen.appendChild(picker);
}

function renderCaseBoard(
  screen: HTMLElement,
  save: CampaignSave,
): void {
  const rank = document.createElement('div');
  rank.className = 'alibi-rank-badge';
  rank.textContent = `Detective rank: ${RANK_LABELS[save.rank] ?? save.rank}`;
  screen.appendChild(rank);

  const grid = document.createElement('div');
  grid.className = 'alibi-case-grid';

  save.cases.forEach((c, i) => {
    const card = document.createElement('div');
    card.setAttribute('data-testid', `case-card-${i}`);
    card.className = `alibi-case-card ${c.status}`;

    const num = document.createElement('div');
    num.className = 'alibi-case-num';
    num.textContent = `Case ${i + 1}`;

    const theme = document.createElement('div');
    theme.className = 'alibi-case-theme';
    theme.textContent = c.status === 'locked' ? '???' : getThemeName(c.themeId);

    const diff = document.createElement('div');
    diff.className = `alibi-case-difficulty ${c.difficulty}`;
    diff.textContent = DIFF_LABELS[c.difficulty] ?? c.difficulty;

    const statusEl = document.createElement('div');
    statusEl.setAttribute('data-testid', `case-status-${i}`);
    statusEl.className = `alibi-case-status ${c.status === 'locked' ? 'locked' : ''}`;
    statusEl.textContent =
      c.status === 'locked'      ? '🔒' :
      c.status === 'solved'      ? '✅' :
      /* in_progress */             '📁';

    const timeEl = document.createElement('div');
    timeEl.className = 'alibi-case-time';
    timeEl.textContent = c.solveTimeMs ? `Solved: ${formatTime(c.solveTimeMs)}` : '';

    card.append(num, theme, diff, statusEl, timeEl);

    if (c.status !== 'locked') {
      card.addEventListener('click', () => {
        screen.remove();
        window.location.href =
          `${window.location.pathname}?theme=${c.themeId}&difficulty=${c.difficulty}&seed=${c.seed}&campaign=${save.slot}&caseIndex=${i}`;
      });
    }

    grid.appendChild(card);
  });

  screen.appendChild(grid);

  // New campaign button (start over in this slot)
  const resetBtn = document.createElement('button');
  resetBtn.style.cssText =
    'margin-top:24px;background:#333;color:#888;border:2px solid #444;' +
    'border-radius:0;padding:8px 16px;font-family:"Press Start 2P",monospace;' +
    'font-size:6px;cursor:pointer;';
  resetBtn.textContent = 'Restart Campaign';
  resetBtn.addEventListener('click', () => {
    if (!confirm('Start a new campaign in this slot? Current progress will be lost.')) return;
    clearCampaign(save.slot);
    const newSave = createNewCampaign(save.slot);
    saveCampaign(newSave);
    const case0 = newSave.cases[0];
    screen.remove();
    window.location.href =
      `${window.location.pathname}?theme=${case0.themeId}&difficulty=${case0.difficulty}&seed=${case0.seed}&campaign=${save.slot}&caseIndex=0`;
  });
  screen.appendChild(resetBtn);
}
