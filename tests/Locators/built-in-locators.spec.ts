import { test, expect } from '@playwright/test';

test('Practice Playwright built-in locators', async ({ page }) => {
    // Open the application
    await page.goto('https://playwrightlab.github.io');

    // // 1. getByRole()
    // // Find an element using its accessibility role and name
    const button = page.getByRole('button', { name: 'Submit' });
    await expect(button).toBeVisible();

    // // 2. getByText()
    // // Find an element using visible text
    const heading = page.getByText('beautifully');
    await expect(heading).toBeVisible();

    // // 3. getByLabel()
    // // Find a form field using its associated label
    const username = page.getByLabel('Full Name *');
    // const username = page.getByLabel(/Full/);

    await expect(username).toBeVisible();
    await username.fill('testuser');

    // // 4. getByPlaceholder()
    // // Find an input using its placeholder text
    const password = page.getByPlaceholder('Min 8 characters');
    await expect(password).toBeVisible();
    await password.fill('testpassword');

    // // 5. getByAltText()
    // Find an image using its alt text
    const bike_img = page.getByAltText('Triumph Speed Triple');
    await expect(bike_img).toBeVisible();

    // // 6. getByTitle()
    // Find an element using its title attribute
    const title = page.getByTitle('Nested frames practice');
    await expect(title).toBeVisible();

    // // 7. getByTestId()
    // Find an element using data-testid
    const message = page.getByTestId('logo');
    await expect(message).toBeVisible();

    // 8.css selector
    const explorebtn = page.locator('#exploreTourBtn');
    await expect(explorebtn).toBeVisible();

    //9.xpath selector - partialxpath
    const explorebtn1 = page.locator('//*[@id="exploreTourBtn"]');
    await expect(explorebtn1).toBeVisible();
    //10. Fullxpath
    const registerbtn = page.locator('xpath = /html/body/section[1]/div[2]/div[1]');
    // const registerbtn = page.locator('//html/body/section[1]/div[2]/div[1]');
    await expect(registerbtn).toBeVisible();

    //11. css selector - Find by tag
    const resetbtn = page.locator('img');
    await expect(resetbtn).toBeVisible();

    //12. css selector - find by attribute
    const resetbtn1 = page.locator('button[data-testid="btn-register"]');
    await expect(resetbtn1).toBeVisible();

    // 13.find button containing tex
    const resetbtn2 = page.locator('button:has-text("Reset")');
    await expect(resetbtn2).toBeVisible();

    //14. find by relationships
    const resetbtn3 = page.locator('form >> div >> button[type="reset"]');
    await expect(resetbtn3).toBeVisible();
});
// Input           type	                 Example	Meaning
// CSS selector	'#login'	                 Find by ID
// CSS selector	'.login-btn'	             Find by class
// CSS selector	'button'	                 Find by tag
// CSS selector	'button[type="submit"]'	        Find by attribute
// XPath	        '//button[@id="login"]'	        Find using XPath
// Text-based CSS	'button:has-text("Login")'	    Find button containing text
// Complex CSS	    'form button[type="submit"]'	Find using relationships







//Selenium
//WebElement loginButton =
//     driver.findElement(By.id("login"));
// loginButton.click();
// findElement()
//      ↓
// Search for element NOW
//      ↓
// Element not available yet
//      ↓
// ❌ ElementNotFound / NoSuchElementException

//Playwright
// const loginButton = page.locator('#login');
// await loginButton.click();
// What happens:
// locator('#login')
//       ↓
// Creates a locator
//       ↓
// Doesn't search immediately
//       ↓
// click()
//       ↓
// Playwright waits/re-finds the element
//       ↓
// Element appears
//       ↓
// ✅ Click

// Playwright locators are lazy and resolve the matching element when an action or assertion uses them.
// Playwright can then auto-wait for the element to become actionable.
// So Playwright isn't// simply "waiting because the locator is lazy";
// lazy resolution + auto-waiting work together.
