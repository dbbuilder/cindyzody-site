import { test, expect } from '@playwright/test';

// Helper to dismiss cookie consent if visible
async function dismissCookieConsent(page: any) {
  const acceptButton = page.locator('button:has-text("Accept")');
  if (await acceptButton.isVisible({ timeout: 1000 }).catch(() => false)) {
    await acceptButton.click();
    await page.waitForTimeout(300);
  }
}

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await dismissCookieConsent(page);
  });

  test('should display user authentication area in header', async ({ page }) => {
    // The header should contain user-related UI
    // This could be a sign-in button, user menu, or loading state
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Header should contain some interactive element (button/link)
    const headerButtons = page.locator('header button, header a');
    const count = await headerButtons.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should have clickable user interface element', async ({ page }) => {
    // Find any button in the header that could be user-related
    // On desktop this is the sign-in button, on mobile it might be in a different location
    const userElement = page.locator('header').locator('button, a').first();

    // Verify something clickable exists
    await expect(userElement).toBeVisible();
  });

  test('should show header with navigation', async ({ page }) => {
    const header = page.locator('header').first();
    await expect(header).toBeVisible();

    // Should have the logo/brand link
    const brandLink = page.locator('header a[href="/"]');
    await expect(brandLink.first()).toBeVisible();
  });
});
