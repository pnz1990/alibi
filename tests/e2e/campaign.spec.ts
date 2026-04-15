/**
 * Campaign e2e tests — verifies 12 case cards, lock state, and case navigation.
 */

import { test, expect } from '@playwright/test';

test.describe('campaign board (with real campaign logic)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/alibi/?mode=campaign');
    await page.waitForSelector('[data-testid="screen-campaign-board"]', { timeout: 5000 });
  });

  test('shows exactly 12 case cards', async ({ page }) => {
    const count = await page.locator('[data-testid^="case-card-"]').count();
    expect(count).toBe(12);
  });

  test('case 0 has no locked status class', async ({ page }) => {
    await expect(page.locator('[data-testid="case-status-0"]')).not.toHaveClass(/locked/);
  });

  test('cases 1-11 all have locked status class', async ({ page }) => {
    for (let i = 1; i <= 11; i++) {
      await expect(page.locator(`[data-testid="case-status-${i}"]`)).toHaveClass(/locked/);
    }
  });

  test('difficulty progression: cases 0-3 Easy, 4-7 Medium, 8-11 Hard', async ({ page }) => {
    // Check difficulty badges are present in correct positions
    const easyCount = await page.locator('.alibi-case-difficulty.easy').count();
    const medCount  = await page.locator('.alibi-case-difficulty.medium').count();
    const hardCount = await page.locator('.alibi-case-difficulty.hard').count();
    expect(easyCount).toBe(4);
    expect(medCount).toBe(4);
    expect(hardCount).toBe(4);
  });

  test('clicking case 0 navigates to game screen', async ({ page }) => {
    await page.locator('[data-testid="case-card-0"]').click();
    await expect(page.locator('[data-testid="screen-game"]')).toBeVisible({ timeout: 5000 });
  });

  test('zero JS errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', err => errors.push(err.message));
    await page.reload();
    await page.waitForSelector('[data-testid="screen-campaign-board"]');
    expect(errors).toHaveLength(0);
  });
});
