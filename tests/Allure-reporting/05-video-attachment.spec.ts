import { test, expect } from '@playwright/test';

/*
 * Video recording:
 * Playwright records the browser session when video is enabled.
 * The allure-playwright reporter can include the recorded artifact in Allure.
 */

test.use({ video: 'on' }); //Playwright method used to configure how the test should run.

test('OrangeHRM login flow with video recording', async ({ page }) => {
  // page.video();
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.locator('input[name="username"]').fill('Admin');
  await page.locator('input[name="password"]').fill('admin123');
  await page.locator('button[type="submit"]').click();

  await expect(page).toHaveURL(/dashboard/);
});
