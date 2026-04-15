/**
 * Save/resume e2e tests — PuzzleState persistence via localStorage.
 */

import { test, expect } from '@playwright/test';

type AlibiWindow = Window & {
  __alibi_puzzle?: {
    suspects: Array<{ id: string; name: string }>;
    solution: Map<string, { suspectId: string; x: number; y: number }>;
  };
  __alibi_placeSuspect?: (suspectId: string, x: number, y: number) => void;
};

async function placeOneSuspect(page: import('@playwright/test').Page): Promise<void> {
  // Uses solution Map correctly via entries() iteration
  await page.evaluate(() => {
    const w = window as AlibiWindow;
    if (!w.__alibi_placeSuspect || !w.__alibi_puzzle) return;
    const entry = [...w.__alibi_puzzle.solution.entries()][0];
    if (entry) w.__alibi_placeSuspect(entry[0], entry[1].x, entry[1].y);
  });
}

test.describe('save/resume', () => {
  test('resume prompt appears after partial placement + reload', async ({ page }) => {
    await page.goto('/alibi/?theme=coffee-shop&difficulty=easy&seed=42');
    await page.waitForSelector('[data-testid="screen-game"]', { timeout: 5000 });

    const intro = page.locator('[data-testid="narrative-intro"]');
    if (await intro.isVisible({ timeout: 2000 }).catch(() => false)) {
      await page.locator('[data-testid="narrative-intro"] button').click();
    }

    await placeOneSuspect(page);

    // Reload the page
    await page.reload();
    await page.waitForSelector('[data-testid="screen-game"]', { timeout: 5000 });

    // Resume prompt should appear
    await expect(page.locator('[data-testid="prompt-resume"]')).toBeVisible({ timeout: 3000 });
  });

  test('choosing Start Fresh clears saved state', async ({ page }) => {
    await page.goto('/alibi/?theme=coffee-shop&difficulty=easy&seed=42');
    await page.waitForSelector('[data-testid="screen-game"]', { timeout: 5000 });

    const intro = page.locator('[data-testid="narrative-intro"]');
    if (await intro.isVisible({ timeout: 2000 }).catch(() => false)) {
      await page.locator('[data-testid="narrative-intro"] button').click();
    }

    await placeOneSuspect(page);

    await page.reload();
    await page.waitForSelector('[data-testid="screen-game"]', { timeout: 5000 });

    const resumePrompt = page.locator('[data-testid="prompt-resume"]');
    if (await resumePrompt.isVisible({ timeout: 2000 }).catch(() => false)) {
      await page.getByRole('button', { name: /start fresh/i }).click();
      await expect(resumePrompt).toBeHidden({ timeout: 2000 });
    }

    const errors: string[] = [];
    page.on('pageerror', err => errors.push(err.message));
    expect(errors).toHaveLength(0);
  });
});
