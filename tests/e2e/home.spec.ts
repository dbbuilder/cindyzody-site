import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load and display hero section', async ({ page }) => {
    await page.goto('/');

    // Check page title
    await expect(page).toHaveTitle(/Cindy Zody/);

    // Hero section visible
    await expect(page.locator('h1')).toBeVisible();

    // Navigation is present
    await expect(page.locator('nav, header').first()).toBeVisible();
  });

  test('should display navigation menu', async ({ page }) => {
    await page.goto('/');

    // Check navigation exists with links
    const navLinks = page.locator('nav a, header a');
    const count = await navLinks.count();

    expect(count).toBeGreaterThan(3);
  });

  test('should have working CTA buttons', async ({ page }) => {
    await page.goto('/');

    // Look for any actionable buttons/links
    const ctaElements = page.locator('a[href*="contact"], a[href*="schedule"], button').first();
    await expect(ctaElements).toBeVisible();
  });

  test('should display main content sections', async ({ page }) => {
    await page.goto('/');

    // Page should have multiple sections
    const sections = page.locator('section, [class*="section"]');
    const count = await sections.count();

    expect(count).toBeGreaterThan(0);
  });
});
