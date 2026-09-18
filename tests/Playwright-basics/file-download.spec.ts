import { test, expect } from '@playwright/test';

test('Download a file', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/download');

    // Wait for download and click the file
    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.getByText('wonder.txt').click()
    ]);
    // const download1 = page.waitForEvent('download');
    // page.getByText('sample.txt').click();
    // const download = await download1
    // Get downloaded file name
    const fileName = download.suggestedFilename();
    console.log('Downloaded file:', fileName);
    // Save the downloaded file
    await download.saveAs(`downloads/${fileName}`);
    expect(fileName).toBe('wonder.txt');
});
//[] = array destructuring
//const fruits = ['Apple', 'Banana', 'Mango'];

// const [first, second] = fruits;

// console.log(first);  // Apple
// console.log(second); // Banana