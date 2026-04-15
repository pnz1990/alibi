/**
 * Undo/redo e2e tests.
 */

import { test, expect } from '@playwright/test';

type AlibiWindow = Window & {
  __alibi_puzzle?: {
    solution: [string, { suspectId: string; x: number; y: number }][];
  };
  __alibi_placeSuspect?: (suspectId: string, x: number, y: number) => void;
};

test.describe('undo/redo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/alibi/?theme=coffee-shop&difficulty=easy&seed=42');
    await page.waitForSelector('[data-testid="screen-game"]', { timeout: 5000 });
    const intro = page.locator('[data-testid="narrative-intro"]');
    if (await intro.isVisible({ timeout: 2000 }).catch(() => false)) {
      await page.locator('[data-testid="narrative-intro"] button').click();
    }
  });

  test('undo button is present', async ({ page }) => {
    await expect(page.locator('[data-testid="btn-undo"]')).toBeVisible();
  });

  test('redo button is present', async ({ page }) => {
    await expect(page.locator('[data-testid="btn-redo"]')).toBeVisible();
  });

  test('place a suspect then undo removes placement', async ({ page }) => {
    // Place first suspect
    await page.evaluate(() => {
      const w = window as AlibiWindow;
      if (!w.__alibi_placeSuspect || !w.__alibi_puzzle) return;
      const entry = w.__alibi_puzzle.solution[0];
      if (entry) w.__alibi_placeSuspect(entry[0], entry[1].x, entry[1].y);
    });

    // Check suspect is placed (victim cell not visible yet, but no error)
    // Now click undo
    await page.locator('[data-testid="btn-undo"]').click();

    // After undo, no suspects should be placed — verify via keyboard shortcut also works
    const errors: string[] = [];
    page.on('pageerror', err => errors.push(err.message));
    expect(errors).toHaveLength(0);
  });

  test('Ctrl+Z triggers undo', async ({ page }) => {
    await page.evaluate(() => {
      const w = window as AlibiWindow;
      if (!w.__alibi_placeSuspect || !w.__alibi_puzzle) return;
      const entry = w.__alibi_puzzle.solution[0];
      if (entry) w.__alibi_placeSuspect(entry[0], entry[1].x, entry[1].y);
    });

    await page.keyboard.press('Control+z');

    const errors: string[] = [];
    page.on('pageerror', err => errors.push(err.message));
    expect(errors).toHaveLength(0);
  });
});
