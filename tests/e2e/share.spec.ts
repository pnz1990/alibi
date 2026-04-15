/**
 * Share card e2e tests.
 */

import { test, expect } from '@playwright/test';

type AlibiWindow = Window & {
  __alibi_puzzle?: {
    solution: [string, { suspectId: string; x: number; y: number }][];
  };
  __alibi_placeSuspect?: (suspectId: string, x: number, y: number) => void;
};

test.describe('share card', () => {
  test('share button appears after GUILTY screen', async ({ page }) => {
    await page.goto('/alibi/?theme=coffee-shop&difficulty=easy&seed=42');
    await page.waitForSelector('[data-testid="screen-game"]', { timeout: 5000 });

    const intro = page.locator('[data-testid="narrative-intro"]');
    if (await intro.isVisible({ timeout: 2000 }).catch(() => false)) {
      await page.locator('[data-testid="narrative-intro"] button').click();
    }

    // Place all suspects
    await page.evaluate(() => {
      const w = window as AlibiWindow;
      if (!w.__alibi_placeSuspect || !w.__alibi_puzzle) return;
      for (const [suspectId, placement] of w.__alibi_puzzle.solution) {
        w.__alibi_placeSuspect(suspectId, placement.x, placement.y);
      }
    });

    await page.waitForSelector('[data-testid="victim-cell"]', { timeout: 3000 });
    await page.locator('[data-testid="victim-cell"]').click();

    // After GUILTY, share button should appear
    await expect(page.locator('[data-testid="btn-share"]')).toBeVisible({ timeout: 3000 });
  });
});
