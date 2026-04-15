/**
 * Campaign board screen — shows slot picker or 12-case board loaded from CampaignSave.
 *
 * If no saves exist: auto-creates a new campaign in slot 1 and shows the board.
 * If saves exist: shows a slot picker (up to 3 slots) before showing the board.
 *
 * Campaign logic lives in src/modes/campaign.ts.
 * All localStorage access goes through src/storage/progress.ts.
 */

import type { CampaignSave } from '../storage/schema';
import { loadCampaign, saveCampaign } from '../storage/progress';
import { createNewCampaign } from '../modes/campaign';
import { getTheme } from '../themes/index';

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
.alibi-case-card.solved { border-color: #2d8a2d; }
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
.alibi-case-time {
  font-size: 0.65em;
  color: #7ec87e;
  margin-top: 6px;
}
.alibi-slot-picker {
  max-width: 600px;
}
.alibi-slot-picker h2 {
  font-size: 1em;
  color: #888;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.alibi-slot-card {
  background: #1e1e35;
  border: 2px solid #444;
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  margin-bottom: 12px;
  transition: border-color 0.15s, transform 0.1s;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.alibi-slot-card:hover { border-color: #c0392b; transform: translateY(-1px); }
.alibi-slot-card.empty { opacity: 0.55; }
.alibi-slot-card.empty:hover { border-color: #555; }
.alibi-slot-info { flex: 1; }
.alibi-slot-label {
  font-size: 0.85em;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 6px;
}
.alibi-slot-rank {
  font-size: 1em;
  font-weight: bold;
  margin-bottom: 4px;
}
.alibi-slot-progress {
  font-size: 0.75em;
  color: #aaa;
}
.alibi-slot-action {
  font-size: 0.75em;
  color: #c0392b;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.alibi-campaign-rank {
  font-size: 0.75em;
  color: #888;
  margin-left: auto;
  padding-left: 24px;
}
`;

const RANK_ICONS: Record<string, string> = {
  rookie:       '🔍 Rookie',
  investigator: '🔎 Investigator',
  detective:    '🕵 Detective',
  senior:       '🕵️ Senior Detective',
  chief:        '⭐ Chief Inspector',
};

let boardStylesInjected = false;
function injectBoardStyles(): void {
  if (boardStylesInjected) return;
  const s = document.createElement('style');
  s.textContent = BOARD_STYLES;
  document.head.appendChild(s);
  boardStylesInjected = true;
}

function formatTime(ms: number): string {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

function themeName(themeId: string): string {
  try {
    return getTheme(themeId).name;
  } catch {
    return themeId;
  }
}

/** Shows the 12-case board for a given CampaignSave. */
function showCaseBoard(save: CampaignSave, screen: HTMLElement): void {
  screen.innerHTML = '';

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

  const rankEl = document.createElement('div');
  rankEl.className = 'alibi-campaign-rank';
  rankEl.textContent = RANK_ICONS[save.rank] ?? save.rank;

  header.append(backBtn, h1, rankEl);

  const grid = document.createElement('div');
  grid.className = 'alibi-case-grid';

  save.cases.forEach((c, i) => {
    const isUnlocked = c.status === 'in_progress' || c.status === 'solved';
    const isSolved   = c.status === 'solved';
    const isLocked   = c.status === 'locked';

    const card = document.createElement('div');
    card.setAttribute('data-testid', `case-card-${i}`);
    let cardClass = 'alibi-case-card';
    if (isLocked)   cardClass += ' locked';
    if (isSolved)   cardClass += ' solved';
    if (!isLocked && !isSolved) cardClass += ' unlocked';
    card.className = cardClass;

    const num = document.createElement('div');
    num.className = 'alibi-case-num';
    num.textContent = `Case ${i + 1}`;

    const title = document.createElement('div');
    title.className = 'alibi-case-title';
    title.textContent = isUnlocked ? themeName(c.themeId) : '???';

    const diff = document.createElement('div');
    diff.className = `alibi-case-difficulty ${c.difficulty}`;
    diff.textContent = c.difficulty.charAt(0).toUpperCase() + c.difficulty.slice(1);

    const statusEl = document.createElement('div');
    statusEl.setAttribute('data-testid', `case-status-${i}`);
    statusEl.className = `alibi-case-status${isLocked ? ' locked' : ''}`;
    statusEl.textContent = isSolved ? '✅' : isLocked ? '🔒' : '📁';

    card.append(num, title, diff, statusEl);

    if (isSolved && c.solveTimeMs != null) {
      const timeEl = document.createElement('div');
      timeEl.className = 'alibi-case-time';
      timeEl.textContent = `⏱ ${formatTime(c.solveTimeMs)}`;
      card.appendChild(timeEl);
    }

    if (!isLocked) {
      card.addEventListener('click', () => {
        screen.remove();
        window.location.href =
          `${window.location.pathname}?theme=${c.themeId}&difficulty=${c.difficulty}` +
          `&seed=${c.seed}&campaignSlot=${save.slot}&campaignCase=${i}`;
      });
    }

    grid.appendChild(card);
  });

  screen.append(header, grid);
}

/** Shows the slot picker when multiple slots exist. */
function showSlotPicker(
  saves: Array<CampaignSave | null>,
  screen: HTMLElement,
): void {
  screen.innerHTML = '';

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

  const picker = document.createElement('div');
  picker.className = 'alibi-slot-picker';

  const subtitle = document.createElement('h2');
  subtitle.textContent = 'Choose Save Slot';
  picker.appendChild(subtitle);

  saves.forEach((save, idx) => {
    const slotNum = (idx + 1) as 1 | 2 | 3;
    const card = document.createElement('div');
    card.setAttribute('data-testid', `slot-card-${slotNum}`);
    card.className = `alibi-slot-card${save ? '' : ' empty'}`;

    const info = document.createElement('div');
    info.className = 'alibi-slot-info';

    const label = document.createElement('div');
    label.className = 'alibi-slot-label';
    label.textContent = `Save Slot ${slotNum}`;

    info.appendChild(label);

    if (save) {
      const rank = document.createElement('div');
      rank.className = 'alibi-slot-rank';
      rank.textContent = RANK_ICONS[save.rank] ?? save.rank;

      const solved = save.cases.filter(c => c.status === 'solved').length;
      const progress = document.createElement('div');
      progress.className = 'alibi-slot-progress';
      progress.textContent = `Case ${save.currentCase + 1} of 12 · ${solved} solved · ${new Date(save.startedAt).toLocaleDateString()}`;

      info.append(rank, progress);
    } else {
      const empty = document.createElement('div');
      empty.className = 'alibi-slot-rank';
      empty.textContent = 'Empty';
      info.appendChild(empty);
    }

    const action = document.createElement('div');
    action.className = 'alibi-slot-action';
    action.textContent = save ? 'Continue →' : 'New →';

    card.append(info, action);

    card.addEventListener('click', () => {
      if (save) {
        showCaseBoard(save, screen);
      } else {
        const newSave = createNewCampaign(slotNum);
        saveCampaign(newSave);
        showCaseBoard(newSave, screen);
      }
    });

    picker.appendChild(card);
  });

  screen.append(header, picker);
}

export function mountCampaignBoard(): void {
  injectBoardStyles();

  const canvas = document.getElementById('game-canvas');
  if (canvas) canvas.style.display = 'none';

  const screen = document.createElement('div');
  screen.setAttribute('data-testid', 'screen-campaign-board');
  screen.className = 'alibi-campaign-board';
  document.body.appendChild(screen);

  // Load all 3 slots
  const slot1 = loadCampaign(1);
  const slot2 = loadCampaign(2);
  const slot3 = loadCampaign(3);

  const anySave = slot1 ?? slot2 ?? slot3;

  if (!anySave) {
    // No saves: auto-create slot 1 and show the board immediately.
    // This keeps e2e tests working (they start with empty localStorage).
    const newSave = createNewCampaign(1);
    saveCampaign(newSave);
    showCaseBoard(newSave, screen);
  } else {
    // Check if URL requests a specific slot directly
    const params = new URLSearchParams(location.search);
    const slotParam = params.get('campaignSlot');
    if (slotParam) {
      const slotNum = parseInt(slotParam, 10) as 1 | 2 | 3;
      const directSave = loadCampaign(slotNum);
      if (directSave) {
        showCaseBoard(directSave, screen);
        return;
      }
    }
    // Show slot picker
    showSlotPicker([slot1, slot2, slot3], screen);
  }
}
