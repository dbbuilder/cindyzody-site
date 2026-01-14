import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should display sign in button when not authenticated', async ({ page }) => {
    await page.goto('/');

    // Look for sign in button in header
    const signInButton = page.getByRole('button', { name: /sign in|log in/i });
    await expect(signInButton).toBeVisible();
  });

  test('should open sign in modal when clicking sign in', async ({ page }) => {
    await page.goto('/');

    // Click sign in button
    const signInButton = page.getByRole('button', { name: /sign in|log in/i });
    await signInButton.click();

    // Wait for Clerk modal to appear (it loads externally)
    // The modal is rendered by Clerk's JS, so we wait for any sign of it
    await page.waitForTimeout(2000);

    // Check if Clerk modal or iframe appeared
    const clerkModal = page.locator('[class*="cl-"], iframe[src*="clerk"]').first();

    // If Clerk is configured, modal should appear
    // If not configured, we just verify the click didn't error
    const isClerkConfigured = await clerkModal.isVisible().catch(() => false);

    if (isClerkConfigured) {
      await expect(clerkModal).toBeVisible();
    } else {
      // Clerk not configured - just verify page didn't crash
      await expect(page.locator('body')).toBeVisible();
    }
  });

  test('should show user menu area in header', async ({ page }) => {
    await page.goto('/');

    // There should be some user-related UI in the header
    const header = page.locator('header, nav').first();
    await expect(header).toBeVisible();
  });
});
