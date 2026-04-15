/**
 * Home screen, campaign board, and theme selector e2e tests.
 * TDD: written before implementation.
 */

import { test, expect } from '@playwright/test';

test.describe('home screen', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/alibi/');
    await page.waitForSelector('[data-testid="screen-home"]', { timeout: 5000 });
  });

  test('home screen is visible at root URL', async ({ page }) => {
    await expect(page.locator('[data-testid="screen-home"]')).toBeVisible();
  });

  test('Campaign button is present', async ({ page }) => {
    await expect(page.locator('[data-testid="btn-campaign"]')).toBeVisible();
  });

  test('Quick Play button is present', async ({ page }) => {
    await expect(page.locator('[data-testid="btn-quickplay"]')).toBeVisible();
  });

  test('Daily Case button is present', async ({ page }) => {
    await expect(page.locator('[data-testid="btn-daily"]')).toBeVisible();
  });

  test('zero JavaScript errors on home screen', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', err => errors.push(err.message));
    await page.reload();
    await page.waitForSelector('[data-testid="screen-home"]');
    expect(errors).toHaveLength(0);
  });
});

test.describe('navigation from home', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/alibi/');
    await page.waitForSelector('[data-testid="screen-home"]', { timeout: 5000 });
  });

  test('Quick Play button navigates to theme selector', async ({ page }) => {
    await page.locator('[data-testid="btn-quickplay"]').click();
    await expect(page.locator('[data-testid="screen-theme-select"]')).toBeVisible({ timeout: 3000 });
  });

  test('Campaign button navigates to campaign board', async ({ page }) => {
    await page.locator('[data-testid="btn-campaign"]').click();
    await expect(page.locator('[data-testid="screen-campaign-board"]')).toBeVisible({ timeout: 3000 });
  });

  test('Daily Case button navigates to puzzle screen', async ({ page }) => {
    await page.locator('[data-testid="btn-daily"]').click();
    await expect(page.locator('[data-testid="screen-game"]')).toBeVisible({ timeout: 5000 });
  });
});

test.describe('campaign board', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/alibi/?mode=campaign');
    await page.waitForSelector('[data-testid="screen-campaign-board"]', { timeout: 5000 });
  });

  test('campaign board has 12 case cards', async ({ page }) => {
    const count = await page.locator('[data-testid^="case-card-"]').count();
    expect(count).toBe(12);
  });

  test('case 0 is unlocked', async ({ page }) => {
    const status0 = page.locator('[data-testid="case-status-0"]');
    await expect(status0).not.toHaveClass(/locked/);
  });

  test('case 1 is locked', async ({ page }) => {
    const status1 = page.locator('[data-testid="case-status-1"]');
    await expect(status1).toHaveClass(/locked/);
  });

  test('zero JS errors on campaign board', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', err => errors.push(err.message));
    await page.reload();
    await page.waitForSelector('[data-testid="screen-campaign-board"]');
    expect(errors).toHaveLength(0);
  });
});

test.describe('theme selector', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/alibi/?mode=quickplay');
    await page.waitForSelector('[data-testid="screen-theme-select"]', { timeout: 5000 });
  });

  test('coffee-shop theme card is present', async ({ page }) => {
    await expect(page.locator('[data-testid="theme-card-coffee-shop"]')).toBeVisible();
  });

  test('difficulty buttons are present', async ({ page }) => {
    await expect(page.locator('[data-testid="difficulty-easy"]')).toBeVisible();
    await expect(page.locator('[data-testid="difficulty-medium"]')).toBeVisible();
    await expect(page.locator('[data-testid="difficulty-hard"]')).toBeVisible();
  });

  test('selecting theme + difficulty + Play starts game', async ({ page }) => {
    await page.locator('[data-testid="theme-card-coffee-shop"]').click();
    await page.locator('[data-testid="difficulty-easy"]').click();
    await page.locator('[data-testid="btn-play"]').click();
    await expect(page.locator('[data-testid="screen-game"]')).toBeVisible({ timeout: 5000 });
  });

  test('zero JS errors on theme selector', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', err => errors.push(err.message));
    await page.reload();
    await page.waitForSelector('[data-testid="screen-theme-select"]');
    expect(errors).toHaveLength(0);
  });
});
