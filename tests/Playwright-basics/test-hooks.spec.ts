import { test, expect } from '@playwright/test';

test.describe('SauceDemo - Test Hooks', () => {
    // Runs once before all tests
    test.beforeAll(() => {
        console.log('Test suite started');
    });
    // Runs before every test
    test.beforeEach(async ({ page }) => {
        // Open application
        await page.goto('https://www.saucedemo.com');
        // Login
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();
        // Verify login
        await expect(page).toHaveURL(/inventory.html/);
    });
    test('Add product to cart', async ({ page }) => {
        await page
            .locator('[data-test="add-to-cart-sauce-labs-backpack"]')
            .click();
        await expect(
            page.locator('.shopping_cart_badge')
        ).toHaveText('1');
    });
    test('Open product details', async ({ page }) => {
        await page
            .getByText('Sauce Labs Backpack')
            .click();
        await expect(
            page.getByText('Sauce Labs Backpack')
        ).toBeVisible();
    });
    // Runs after every test
    test.afterEach(async ({ page }) => {
        console.log('Test completed');
        // Logout after each test
        await page
            .locator('#react-burger-menu-btn')
            .click();
        await page
            .getByText('Logout')
            .click();
    });
    // Runs once after all tests
    test.afterAll(() => {
        console.log('All tests completed');
    });
});