import { test, expect } from '@playwright/test';

const BASE_URL = 'https://opensource-demo.orangehrmlive.com';
test('Hybrid Testing - API + UI', async ({ page, request }) => {
  // 1. API: Check application is reachable
  const apiResponse = await request.get(`${BASE_URL}/web/index.php/auth/login`);
  expect(apiResponse.status()).toBe(200);
  // 2. Read API response
  const apiBody = await apiResponse.text();
  console.log(apiBody);
  expect(apiBody).toContain('OrangeHRM');
  // 3. UI: Open the application
  await page.goto(`${BASE_URL}/web/index.php/auth/login`);
  // 4. UI: Enter login details
  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');
  // 5. UI: Login
  await page.getByRole('button', { name: 'Login' }).click();
  // 6. UI: Verify dashboard
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  // 7. API from browser context
  const pageResponse = await page.request.get(`${BASE_URL}/web/index.php/auth/login`);
  // 8. Verify API response
  expect(pageResponse.status()).toBe(200);
  console.log('API status:', apiResponse.status());
  console.log('UI URL:', page.url());
});