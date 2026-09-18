A fixture is a ready-to-use object or resource that Playwright provides to a test.
| Fixture   | Simple meaning              |
| --------- | --------------------------- |
| `page`    | A browser tab/page          |
| `context` | An isolated browser session |
| `browser` | Browser instance            |
| `request` | Used for API requests       |

Playwright Library → Provides APIs to control browsers, such as page.goto(), page.click(), and page.fill().
Playwright Test Runner → Provides tools to create, run, manage, and report tests, such as test(), expect(), fixtures, retries, and reports.



                    Your Test Code
                          │
                          ▼
                   Playwright Test
                          │
                          ▼
                    Playwright API
                          │
              ┌───────────┼───────────┐
              ▼           ▼           ▼
          Chromium      Firefox      WebKit
              │           │           │
              └───────────┼───────────┘
                          ▼
                       Browser
                          │
                          ▼
                   BrowserContext
                          │
                          ▼
                        Page
                          │
                          ▼
                  Web Application