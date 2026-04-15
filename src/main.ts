/**
 * ALIBI — main entry point
 *
 * Routes to the appropriate screen based on URL params.
 * Screens:
 *   No params           → home screen
 *   ?mode=quickplay     → theme selector
 *   ?mode=campaign      → campaign board
 *   ?mode=daily         → daily puzzle (redirected immediately)
 *   ?theme=X&...        → game screen (puzzle)
 */

import { mountGameScreen } from './screens/game';
import { mountHomeScreen } from './screens/home';
import { mountCampaignBoard } from './screens/campaign-board';
import { mountThemeSelector } from './screens/theme-select';

const params = new URLSearchParams(location.search);

if (params.has('theme') || params.has('difficulty') || params.has('seed')) {
  mountGameScreen(document.body);
} else {
  const mode = params.get('mode');
  switch (mode) {
    case 'campaign':  mountCampaignBoard();  break;
    case 'quickplay': mountThemeSelector();  break;
    default:          mountHomeScreen();     break;
  }
}
