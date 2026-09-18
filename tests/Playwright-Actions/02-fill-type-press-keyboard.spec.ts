import { test, expect } from '@playwright/test';

// -------------------- fill() --------------------

test('Enter text using fill()', async ({ page }) => {

  await page.goto('https://opensource-demo.orangehrmlive.com');

  // Enter username and password
  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');

  // Verify entered values
  await expect(page.getByPlaceholder('Username')).toHaveValue('Admin');
  await expect(page.getByPlaceholder('Password')).toHaveValue('admin123');
});


// -------------------- pressSequentially() --------------------

test('Type text character by character', async ({ page }) => {

  await page.goto('https://opensource-demo.orangehrmlive.com');
  // Type username one character at a time
  await page.getByPlaceholder('Username')
    .pressSequentially('Admin', { delay: 500 });

  // Verify entered value
  await expect(page.getByPlaceholder('Username'))
    .toHaveValue('Admin');
});

// -------------------- Keyboard Shortcut --------------------

test('Use keyboard shortcut', async ({ page }) => {

  await page.goto('https://opensource-demo.orangehrmlive.com');

  const username = page.getByPlaceholder('Username');

  await username.fill('Admin');

  // Select all text
  await username.press('Control+A');

  // Delete the selected text
  await username.press('Backspace');

  // Verify field is empty
  await expect(username).toHaveValue('');
});


// Press Enter - press() is used to simulate pressing a keyboard key on an element.
// await textbox.press('Enter');

// // Press Backspace
// await textbox.press('Backspace');

// // Press Tab
// await textbox.press('Tab');

// // Press Escape
// await textbox.press('Escape');

// // Press Arrow Down
// await textbox.press('ArrowDown');

// // Select all text
// await textbox.press('Control+A');

// // Delete selected text
// await textbox.press('Delete');