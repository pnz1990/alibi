/**
 * Home screen — three-mode entry point for ALIBI.
 * Renders Campaign, Quick Play, and Daily Case buttons.
 * Navigation via URL param changes (no routing library).
 */

import { getTodayDailyPuzzle, todayString } from '../modes/daily';
import { loadStreak, loadDailySave } from '../storage/progress';

const HOME_STYLES = `
.alibi-home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #0a0a12;
  font-family: 'Press Start 2P', monospace;
  color: #ffffff;
  gap: 0;
  position: relative;
  overflow: hidden;
}
/* Scanlines overlay for CRT feel */
.alibi-home::after {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0px,
    transparent 3px,
    rgba(0,0,0,0.04) 3px,
    rgba(0,0,0,0.04) 4px
  );
  pointer-events: none;
  z-index: 1;
}
.alibi-home > * { position: relative; z-index: 2; }
.alibi-home-title {
  font-family: 'Press Start 2P', monospace;
  font-size: 3.5em;
  color: #c0392b;
  /* Hard pixel shadow — no blur */
  text-shadow:
    4px 0 0 #8a0000,
    0 4px 0 #8a0000,
    4px 4px 0 #8a0000,
    8px 8px 0 rgba(0,0,0,0.5);
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.15em;
}
.alibi-home-subtitle {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.55em;
  color: #888;
  margin-bottom: 56px;
  letter-spacing: 0.05em;
  line-height: 1.8;
  text-align: center;
}
.alibi-home-eyebrow {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.5em;
  color: #c0392b;
  letter-spacing: 0.2em;
  margin-bottom: 16px;
  text-transform: uppercase;
}
.alibi-home-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 340px;
}
.alibi-home-btn {
  padding: 14px 20px;
  font-family: 'Press Start 2P', monospace;
  font-size: 0.6em;
  cursor: pointer;
  /* Flat pixel border — no radius */
  border-radius: 0;
  border: 2px solid;
  text-align: left;
  outline: none;
  line-height: 1.6;
}
.alibi-home-btn:hover { filter: brightness(1.15); }
.alibi-home-btn:active { transform: translate(2px,2px); }
.alibi-home-btn.primary {
  background: #c0392b;
  border-color: #ff5a47;
  color: #fff;
  /* Pixel inset highlight */
  box-shadow: inset 2px 2px 0 rgba(255,255,255,0.15), 3px 3px 0 #6b0000;
}
.alibi-home-btn.secondary {
  background: #1a1a2e;
  border-color: #555;
  color: #ccc;
  box-shadow: inset 2px 2px 0 rgba(255,255,255,0.05), 3px 3px 0 #000;
}
.alibi-home-btn .btn-title { display: block; }
.alibi-home-btn .btn-desc {
  display: block;
  font-size: 0.75em;
  color: rgba(255,255,255,0.5);
  margin-top: 6px;
  font-family: 'Press Start 2P', monospace;
}
`;

let homeStylesInjected = false;
function injectHomeStyles(): void {
  if (homeStylesInjected) return;
  const s = document.createElement('style');
  s.textContent = HOME_STYLES;
  document.head.appendChild(s);
  homeStylesInjected = true;
}

/**
 * Mounts the home screen into the body.
 * Replaces any existing screen content.
 */
export function mountHomeScreen(): void {
  injectHomeStyles();

  // Hide the canvas (not used on home screen)
  const canvas = document.getElementById('game-canvas');
  if (canvas) canvas.style.display = 'none';

  const screen = document.createElement('div');
  screen.setAttribute('data-testid', 'screen-home');
  screen.className = 'alibi-home';

  const eyebrow = document.createElement('div');
  eyebrow.className = 'alibi-home-eyebrow';
  eyebrow.textContent = '— A Mystery Awaits —';

  const title = document.createElement('div');
  title.className = 'alibi-home-title';
  title.textContent = 'ALIBI';

  const subtitle = document.createElement('div');
  subtitle.className = 'alibi-home-subtitle';
  subtitle.textContent = 'Murder Mystery\nDeduction';

  const buttons = document.createElement('div');
  buttons.className = 'alibi-home-buttons';

  buttons.appendChild(makeBtn('btn-campaign', 'primary', '📁 Campaign',
    '12 escalating cases'));
  buttons.appendChild(makeBtn('btn-quickplay', 'secondary', '🎲 Quick Play',
    'Pick theme + difficulty'));

  // Daily Case button — show streak count and today's theme/difficulty
  const { themeId: dailyTheme, difficulty: dailyDiff } = getTodayDailyPuzzle();
  const streak = loadStreak();
  const solvedToday = loadDailySave(todayString())?.solved ?? false;
  const dailyThemeName = dailyTheme.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const streakText = streak > 0
    ? `🔥 ${streak} day${streak !== 1 ? 's' : ''}`
    : 'Start your streak';
  const dailyDesc = solvedToday
    ? `✅ Solved · ${streakText}`
    : `${dailyThemeName} · ${dailyDiff}`;
  const dailyBtn = makeBtn('btn-daily', 'secondary', '📅 Daily Case', dailyDesc);
  // Add hidden streak span for testid access
  const streakSpan = document.createElement('span');
  streakSpan.setAttribute('data-testid', 'daily-streak');
  streakSpan.style.display = 'none';
  streakSpan.textContent = String(streak);
  dailyBtn.appendChild(streakSpan);
  buttons.appendChild(dailyBtn);

  screen.append(eyebrow, title, subtitle, buttons);
  document.body.appendChild(screen);

  // Wire navigation
  screen.querySelector('[data-testid="btn-quickplay"]')!
    .addEventListener('click', () => {
      screen.remove();
      window.location.href = `${window.location.pathname}?mode=quickplay`;
    });
  screen.querySelector('[data-testid="btn-campaign"]')!
    .addEventListener('click', () => {
      screen.remove();
      window.location.href = `${window.location.pathname}?mode=campaign`;
    });
  screen.querySelector('[data-testid="btn-daily"]')!
    .addEventListener('click', () => {
      screen.remove();
      const { seed, themeId, difficulty } = getTodayDailyPuzzle();
      window.location.href = `${window.location.pathname}?theme=${themeId}&difficulty=${difficulty}&seed=${seed}&mode=daily`;
    });
}

function makeBtn(testid: string, style: string, title: string, desc: string): HTMLButtonElement {
  const b = document.createElement('button');
  b.setAttribute('data-testid', testid);
  b.className = `alibi-home-btn ${style}`;

  const t = document.createElement('span');
  t.className = 'btn-title';
  t.textContent = title;

  const d = document.createElement('span');
  d.className = 'btn-desc';
  d.textContent = desc;

  b.append(t, d);
  return b;
}

// Daily seed derivation is handled by src/modes/daily.ts (getTodayDailyPuzzle)
