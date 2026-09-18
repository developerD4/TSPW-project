# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: API-Testing\08-mocking-api-responses-with-page-route.spec.ts >> page.route - intercept request
- Location: tests\API-Testing\08-mocking-api-responses-with-page-route.spec.ts:20:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'Dashboard' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('heading', { name: 'Dashboard' })

```

# Page snapshot

```yaml
- generic [ref=f1e3]:
  - generic:
    - complementary [ref=f1e4]:
      - navigation "Sidepanel" [ref=f1e5]:
        - generic [ref=f1e6]:
          - link [ref=f1e7] [cursor=pointer]:
            - /url: https://www.orangehrm.com/
            - img "client brand banner" [ref=f1e9]
          - text: 
        - generic [ref=f1e10]:
          - generic [ref=f1e11]:
            - generic [ref=f1e12]:
              - textbox "Search" [ref=f1e15]
              - button "" [ref=f1e16] [cursor=pointer]
            - separator [ref=f1e18]
          - list [ref=f1e19]:
            - listitem [ref=f1e20]:
              - link "Admin" [ref=f1e21] [cursor=pointer]:
                - /url: /web/index.php/admin/viewAdminModule
            - listitem [ref=f1e25]:
              - link "PIM" [ref=f1e26] [cursor=pointer]:
                - /url: /web/index.php/pim/viewPimModule
            - listitem [ref=f1e41]:
              - link "Leave" [ref=f1e42] [cursor=pointer]:
                - /url: /web/index.php/leave/viewLeaveModule
            - listitem [ref=f1e46]:
              - link "Time" [ref=f1e47] [cursor=pointer]:
                - /url: /web/index.php/time/viewTimeModule
            - listitem [ref=f1e54]:
              - link "Recruitment" [ref=f1e55] [cursor=pointer]:
                - /url: /web/index.php/recruitment/viewRecruitmentModule
            - listitem [ref=f1e62]:
              - link "My Info" [ref=f1e63] [cursor=pointer]:
                - /url: /web/index.php/pim/viewMyDetails
            - listitem [ref=f1e70]:
              - link "Performance" [ref=f1e71] [cursor=pointer]:
                - /url: /web/index.php/performance/viewPerformanceModule
            - listitem [ref=f1e80]:
              - link "Dashboard" [ref=f1e81] [cursor=pointer]:
                - /url: /web/index.php/dashboard/index
            - listitem [ref=f1e85]:
              - link "Directory" [ref=f1e86] [cursor=pointer]:
                - /url: /web/index.php/directory/viewDirectory
            - listitem [ref=f1e90]:
              - link "Maintenance" [ref=f1e91] [cursor=pointer]:
                - /url: /web/index.php/maintenance/viewMaintenanceModule
            - listitem [ref=f1e96]:
              - link "Claim" [ref=f1e97] [cursor=pointer]:
                - /url: /web/index.php/claim/viewClaimModule
            - listitem [ref=f1e105]:
              - link "Buzz" [ref=f1e106] [cursor=pointer]:
                - /url: /web/index.php/buzz/viewBuzz
    - banner [ref=f1e110]:
      - generic [ref=f1e111]:
        - generic [ref=f1e112]:
          - text: 
          - heading "Dashboard" [level=6] [ref=f1e114]
        - link [ref=f1e116]:
          - /url: https://orangehrm.com/open-source/upgrade-to-advanced
          - button "Upgrade" [ref=f1e117] [cursor=pointer]
        - list [ref=f1e123]:
          - listitem [ref=f1e124]:
            - generic [ref=f1e125] [cursor=pointer]:
              - img "profile picture" [ref=f1e126]
              - paragraph [ref=f1e127]: manda user
              - generic [ref=f1e128]: 
      - navigation "Topbar Menu" [ref=f1e130]:
        - list [ref=f1e131]:
          - button "" [ref=f1e133] [cursor=pointer]
  - generic [ref=f1e135]:
    - generic [ref=f1e137]:
      - generic [ref=f1e139]:
        - generic [ref=f1e141]:
          - generic [ref=f1e142]: 
          - paragraph [ref=f1e143]: Time at Work
        - separator [ref=f1e144]
      - generic [ref=f1e148]:
        - generic [ref=f1e150]:
          - generic [ref=f1e151]: 
          - paragraph [ref=f1e152]: My Actions
        - separator [ref=f1e153]
        - generic [ref=f1e155]:
          - img "No Content"
          - paragraph [ref=f1e156]: No Pending Actions to Perform
      - generic [ref=f1e158]:
        - generic [ref=f1e160]:
          - generic [ref=f1e161]: 
          - paragraph [ref=f1e162]: Quick Launch
        - separator [ref=f1e163]
      - generic [ref=f1e167]:
        - generic [ref=f1e169]:
          - generic [ref=f1e170]: 
          - paragraph [ref=f1e171]: Buzz Latest Posts
        - separator [ref=f1e172]
      - generic [ref=f1e176]:
        - generic [ref=f1e177]:
          - paragraph [ref=f1e182]: Employees on Leave Today
          - generic [ref=f1e183] [cursor=pointer]: 
        - separator [ref=f1e184]
      - generic [ref=f1e188]:
        - generic [ref=f1e190]:
          - generic [ref=f1e191]: 
          - paragraph [ref=f1e192]: Employee Distribution by Sub Unit
        - separator [ref=f1e193]
      - generic [ref=f1e197]:
        - generic [ref=f1e199]:
          - generic [ref=f1e200]: 
          - paragraph [ref=f1e201]: Employee Distribution by Location
        - separator [ref=f1e202]
    - generic [ref=f1e205]:
      - paragraph [ref=f1e206]: OrangeHRM OS 5.9
      - paragraph [ref=f1e207]:
        - text: © 2005 - 2026
        - link "OrangeHRM, Inc" [ref=f1e208] [cursor=pointer]:
          - /url: http://www.orangehrm.com
        - text: . All rights reserved.
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | const LOGIN_URL =
  4   |   'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
  5   | 
  6   | // Replace this with an API URL from DevTools → Network → Fetch/XHR
  7   | const API_URL = '**/web/index.php/auth/login';
  8   | 
  9   | async function login(page: any) {
  10  |   await page.goto(LOGIN_URL);
  11  | 
  12  |   await page.getByPlaceholder('Username').fill('Admin');
  13  |   await page.getByPlaceholder('Password').fill('admin123');
  14  |   await page.getByRole('button', { name: 'Login' }).click();
  15  | 
> 16  |   await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
      |                                                                  ^ Error: expect(locator).toBeVisible() failed
  17  | }
  18  | 
  19  | // 1. Intercept a request
  20  | test('page.route - intercept request', async ({ page }) => {
  21  | 
  22  |   await page.route(API_URL, async route => {
  23  | 
  24  |     console.log('Request intercepted!');
  25  |     console.log('URL:', route.request().url());
  26  | 
  27  |     // Allow the original request to continue
  28  |     await route.continue();
  29  |   });
  30  | 
  31  |   await login(page);
  32  | 
  33  |   // Perform an action that calls the API
  34  |   await page.getByText('PIM').click();
  35  | });
  36  | 
  37  | 
  38  | // 2. Inspect the request
  39  | test('route.request - inspect request', async ({ page }) => {
  40  | 
  41  |   await page.route(API_URL, async route => {
  42  | 
  43  |     const request = route.request();
  44  | 
  45  |     console.log('Request URL:', request.url());
  46  |     console.log('Request method:', request.method());
  47  | 
  48  |     await route.continue();
  49  |   });
  50  | 
  51  |   await login(page);
  52  | 
  53  |   await page.getByText('PIM').click();
  54  | });
  55  | 
  56  | 
  57  | // 3. Replace real response with fake response
  58  | test('route.fulfill - mock response', async ({ page }) => {
  59  | 
  60  |   await page.route(API_URL, async route => {
  61  | 
  62  |     // Do not call the real server.
  63  |     // Return our own response instead.
  64  |     await route.fulfill({
  65  |       status: 200,
  66  |       contentType: 'application/json',
  67  |       body: JSON.stringify({
  68  |         data: []
  69  |       })
  70  |     });
  71  |   });
  72  | 
  73  |   await login(page);
  74  | 
  75  |   await page.getByText('PIM').click();
  76  | });
  77  | 
  78  | 
  79  | // 4. Simulate server error
  80  | test('route.fulfill - simulate 500 error', async ({ page }) => {
  81  | 
  82  |   await page.route(API_URL, async route => {
  83  | 
  84  |     await route.fulfill({
  85  |       status: 500,
  86  |       body: 'Internal Server Error'
  87  |     });
  88  |   });
  89  | 
  90  |   await login(page);
  91  | 
  92  |   await page.getByText('PIM').click();
  93  | });
  94  | 
  95  | 
  96  | // 5. Remove the mock
  97  | test('page.unroute - remove mock', async ({ page }) => {
  98  | 
  99  |   const mockResponse = async (route: any) => {
  100 |     await route.fulfill({
  101 |       status: 200,
  102 |       body: JSON.stringify({ data: [] })
  103 |     });
  104 |   };
  105 | 
  106 |   // Add mock
  107 |   await page.route(API_URL, mockResponse);
  108 | 
  109 |   // Remove mock
  110 |   await page.unroute(API_URL, mockResponse);
  111 | 
  112 |   // After unroute(), the request behaves normally.
  113 |   await login(page);
  114 | });
  115 | 
  116 | // Why mocking? → Avoid depending on the real API.
```