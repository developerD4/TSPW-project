// import { test, expect, chromium, firefox, webkit } from '@playwright/test';

// test.describe('Playwright Fixtures', () => {

//     test('Using page fixture', async ({ page }) => {

//         // page represents one browser tab

//         await page.goto('https://demo.playwright.dev/todomvc');

//         await expect(page).toHaveTitle(/TodoMVC/);
//     });

//     test('Using context fixture', async () => {
//         // 1. Launch the browser
//         const browser = await chromium.launch();
//         // const browser1 = await firefox.launch();
//         // const browser1 = await webkit.launch();
//         // 2. Create a new browser context
//         const context = await browser.newContext();
//         // 3. Create a new page (tab)
//         const page = await context.newPage();
//         // 4. Open the website
//         await page.goto('/todomvc');
//         // 5. Verify the page title
//         await expect(page).toHaveTitle(/TodoMVCn/);
//         // 6. Close the browser
//         await browser.close();
//     });

//     test('Using page and context together', async ({ page, context }) => {

//         await page.goto('https://demo.playwright.dev/todomvc');

//         // Create another tab in the same context
//         const secondPage = await context.newPage();

//         await secondPage.goto('https://demo.playwright.dev/todomvcc');

//         // There are now 2 pages/tabs in this context
//         expect(context.pages().length).toBe(2);
//     });

// });

import { test, expect } from '@playwright/test';

// Built-in fixtures: page, context, browser, browserName, request

test.describe('02 - Built-in fixtures', () => {
    test('page and context fixtures are ready to use immediately', async ({ page, context }) => {
        // `page` is already a live tab, `context` is the isolated session it lives in.
        // expect(context).toBeTruthy();
        // await page.goto('https://demo.playwright.dev/todomvc');
        // await expect(page).toHaveURL(/todo123/);
        await page.goto("https://www.bing.com/")
        expect(page.getByPlaceholder("Search the web")).toBeVisible();
    });

    test('browser fixture gives access to the underlying Browser object', async ({ browser }) => {
        // Useful when you need to create an EXTRA context beyond the default one,
        // e.g. to simulate two different users at once.
        const secondContext = await browser.newContext();
        const secondPage = await secondContext.newPage();
        await secondPage.goto('https://demo.playwright.dev/todomvc');
        await expect(secondPage.getByPlaceholder('What needs to be done?')).toBeVisible();
        await secondContext.close();
    });

    test('browserName fixture tells you which engine is running', async ({ browserName }) => {
        expect(['chromium', 'firefox', 'webkit']).toContain(browserName);
    });
});
