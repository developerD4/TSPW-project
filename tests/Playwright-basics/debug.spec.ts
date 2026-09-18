import { test, expect, Locator } from '@playwright/test';

test("verify css locator", async ({ page }) => {

    await page.goto("https://demowebshop.tricentis.com/")

    const searchBox: Locator = page.locator("input#small-searchterms");
    //    const searchBox:Locator= page.locator("#small-searchterms");
    await expect(searchBox).toBeVisible();
    await searchBox.fill("Tshirt");

    await page.waitForTimeout(2000);

    await page.locator(".button-1.search-box-button").click();
    await page.waitForTimeout(5000);

    //css with tag and attribute
    //await page.locator("#As").click();
    await page.locator("[name=As][type=checkbox]").click();
    await page.waitForTimeout(2000);


})
