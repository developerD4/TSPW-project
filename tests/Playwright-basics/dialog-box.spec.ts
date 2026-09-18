import { test, expect } from '@playwright/test';
test.describe('Handling Browser Dialogs', () => {
    test('Handle alert popup', async ({ page }) => {
        // Listen for the alert
        page.on('dialog', async (dialog) => {
            console.log(dialog.message());
            // Accept the alert
            await dialog.accept();
        });
        await page.goto('https://playwrightlab.github.io/');
        await page.getByRole('button', { name: 'window.alert()' }).click();
        await expect(
            page.locator('#nativeResult')
        ).toHaveText('Alert was dismissed');
    });
    test('Handle confirm popup', async ({ page }) => {
        page.on('dialog', async (dialog) => {
            console.log(dialog.message());
            // Click Cancel
            await dialog.dismiss();
        });
        await page.goto('https://playwrightlab.github.io/');
        await page.getByRole('button', { name: 'window.confirm()' }).click();
        await expect(
            page.locator('#nativeResult')
        ).toHaveText('Confirm was dismissed');
    });
    test('Handle prompt popup', async ({ page }) => {
        page.on('dialog', async (dialog) => {
            console.log(dialog.message());
            // Enter text in the prompt
            await dialog.accept('Dharani');
        });
        await page.goto('https://playwrightlab.github.io/');
        await page.getByRole('button', { name: 'window.prompt()' }).click();
        await expect(
            page.locator('#nativeResult')
        ).toHaveText('You entered: Dharani');
    });
});


//on() = registers a listener for an event. When that event occurs,
// Playwright automatically calls the function and passes the related object to it.
// on() = Listen for an event → when it happens, execute the callback function.
// dialog → Handle alerts/confirm/prompt
// popup → Handle popup windows
// download → Handle file downloads
// request → Monitor network requests
// response → Monitor network responses
// 'dialog'	Alert, confirm, or prompt appears
// 'popup'	A new popup window/page is opened by the current page
// 'request'	A network request is sent
// 'response'	A network response is received
// 'requestfailed'	A network request fails
// 'requestfinished'	A network request completes
// 'console'	Browser console message is generated
// 'pageerror'	JavaScript error occurs on the page
// 'download'	A file download starts
// 'filechooser'	File chooser is opened
// 'close'	Page is closed

