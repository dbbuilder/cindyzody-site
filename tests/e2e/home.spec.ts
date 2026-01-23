import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load and display hero section', async ({ page }) => {
    await page.goto('/');

    // Check page title
    await expect(page).toHaveTitle(/Cindy Zody/);

    // Hero section visible - wait for h1 to appear (may take time due to splash screen)
    await expect(page.locator('h1')).toBeVisible({ timeout: 10000 });

    // Navigation is present
    await expect(page.locator('header').first()).toBeVisible();
  });

  test('should display navigation menu', async ({ page }) => {
    await page.goto('/');

    // Check header has navigation elements
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Should have some links
    const headerLinks = page.locator('header a');
    const count = await headerLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should have working CTA buttons', async ({ page }) => {
    await page.goto('/');

    // Wait for main content to load
    await expect(page.locator('main')).toBeVisible({ timeout: 10000 });

    // Look for any visible actionable buttons/links in the main content area
    const ctaElements = page.locator('main a, main button').first();
    await expect(ctaElements).toBeVisible({ timeout: 10000 });
  });

  test('should display main content', async ({ page }) => {
    await page.goto('/');

    // Main content area should exist
    const main = page.locator('main');
    await expect(main).toBeVisible({ timeout: 10000 });

    // Wait for content to load - look for h1 which should always exist
    await expect(page.locator('main h1, main h2, main p').first()).toBeVisible({ timeout: 10000 });
  });
});
