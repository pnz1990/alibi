/**
 * Home screen — three-mode entry point for ALIBI.
 * Renders Campaign, Quick Play, and Daily Case buttons.
 * Navigation via URL param changes (no routing library).
 */

import { getTodayDailyPuzzle } from '../modes/daily';

const HOME_STYLES = `
.alibi-home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #1a1a2e;
  font-family: monospace;
  color: #ffffff;
  gap: 0;
}
.alibi-home-title {
  font-size: 4em;
  font-weight: bold;
  letter-spacing: 0.2em;
  color: #c0392b;
  text-shadow: 2px 2px 0 #8a0000, 4px 4px 0 rgba(0,0,0,0.3);
  margin-bottom: 8px;
  text-transform: uppercase;
}
.alibi-home-subtitle {
  font-size: 0.9em;
  color: #888;
  margin-bottom: 48px;
  letter-spacing: 0.1em;
}
.alibi-home-buttons {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 300px;
}
.alibi-home-btn {
  padding: 16px 24px;
  font-family: monospace;
  font-size: 1.1em;
  font-weight: bold;
  cursor: pointer;
  border: 2px solid;
  border-radius: 6px;
  text-align: left;
  transition: transform 0.1s, background 0.15s;
  letter-spacing: 0.05em;
}
.alibi-home-btn:hover { transform: translateX(4px); }
.alibi-home-btn.primary {
  background: #c0392b;
  border-color: #e74c3c;
  color: #fff;
}
.alibi-home-btn.primary:hover { background: #e74c3c; }
.alibi-home-btn.secondary {
  background: #1e1e35;
  border-color: #444;
  color: #fff;
}
.alibi-home-btn.secondary:hover { background: #2a2a50; border-color: #666; }
.alibi-home-btn .btn-title { display: block; }
.alibi-home-btn .btn-desc { display: block; font-size: 0.7em; color: rgba(255,255,255,0.6); margin-top: 3px; font-weight: normal; }
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

  const title = document.createElement('div');
  title.className = 'alibi-home-title';
  title.textContent = 'ALIBI';

  const subtitle = document.createElement('div');
  subtitle.className = 'alibi-home-subtitle';
  subtitle.textContent = 'A murder mystery deduction game';

  const buttons = document.createElement('div');
  buttons.className = 'alibi-home-buttons';

  buttons.appendChild(makeBtn('btn-campaign', 'primary', '📁 Campaign',
    '12 escalating cases'));
  buttons.appendChild(makeBtn('btn-quickplay', 'secondary', '🎲 Quick Play',
    'Pick theme and difficulty'));
  buttons.appendChild(makeBtn('btn-daily', 'secondary', '📅 Daily Case',
    "Today's case · same worldwide"));

  screen.append(title, subtitle, buttons);
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
      window.location.href = `${window.location.pathname}?theme=${themeId}&difficulty=${difficulty}&seed=${seed}`;
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
