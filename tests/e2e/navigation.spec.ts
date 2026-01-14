import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate to About page', async ({ page }) => {
    await page.goto('/');
    await page.locator('a[href*="about"]').first().click();
    await expect(page).toHaveURL(/about/);
  });

  test('should navigate to Services page', async ({ page }) => {
    await page.goto('/');
    await page.locator('a[href*="services"]').first().click();
    await expect(page).toHaveURL(/services/);
  });

  test('should navigate to Practice page', async ({ page }) => {
    await page.goto('/');
    await page.locator('a[href*="practice"]').first().click();
    await expect(page).toHaveURL(/practice/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should navigate to Contact page', async ({ page }) => {
    await page.goto('/');
    await page.locator('a[href*="contact"]').first().click();
    await expect(page).toHaveURL(/contact/);
  });

  test('should navigate to Resources page', async ({ page }) => {
    await page.goto('/');
    await page.locator('a[href*="resources"]').first().click();
    await expect(page).toHaveURL(/resources/);
  });

  test('should return home when clicking logo/brand', async ({ page }) => {
    await page.goto('/about');
    // Click on home link or logo
    await page.locator('a[href="/"]').first().click();
    await expect(page).toHaveURL('/');
  });

  test('should have consistent header across pages', async ({ page }) => {
    const pages = ['/', '/about', '/services', '/practice', '/contact'];

    for (const path of pages) {
      await page.goto(path);
      await expect(page.locator('nav, header').first()).toBeVisible();
    }
  });
});
