import { test, expect } from '@playwright/test';

// -------------------- CLICK --------------------
test('Press a keyboard key', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com');
  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');
  // Press Enter to login
  await page.getByRole('button', { name: 'Login' }).click();
  // Verify login
  await expect(page).toHaveURL(/dashboard/);
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

  // Navigate to Admin
  await page.getByText('Admin', { exact: true }).click();

  // Verify Admin page
  await expect(page.getByRole('heading', { name: 'Admin' })).toBeVisible();
});
// -------------------- DOUBLE CLICK --------------------

test('Double Click', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
  // Add a todo
  await page.getByPlaceholder('What needs to be done?').fill('Buy milk');
  await page.getByPlaceholder('What needs to be done?').press('Enter');
  // Double-click the todo
  await page.getByText('Buy milk').dblclick();
  // Verify edit box is visible
  await expect(page.locator('.edit')).toBeVisible();
});

// // -------------------- HOVER --------------------

test('Hover', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/hovers');
  const user = page.locator('.figure').first();
  // Hover over the user
  await user.hover();
  // Verify profile link is visible
  await expect(user.getByRole('link', { name: 'View profile' }))
    .toBeVisible();
});

// title → title="help icon" Typically shown by the browser as a tooltip on hover.
// data-tooltip → data-tooltip="Custom tooltip text" A custom attribute that stores tooltip text.
// toHaveText() → checks text inside an element.
// toHaveAttribute() → checks a value stored in an HTML attribute.

// // -------------------- CHECK / UNCHECK --------------------

test('Check and Uncheck', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/checkboxes');
  const checkbox1 = page.locator('#checkboxes input').nth(0);
  const checkbox2 = page.locator('#checkboxes input').nth(1);
  // Check the first checkbox
  await checkbox1.check();
  // Verify it is checked
  await expect(checkbox1).toBeChecked();
  // Uncheck the second checkbox
  await checkbox2.uncheck();
  // Verify it is unchecked
  await expect(checkbox2).not.toBeChecked();
});