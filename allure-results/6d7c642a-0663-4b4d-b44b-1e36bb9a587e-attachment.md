# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: API-Testing\03-validating-status-headers-and-body.spec.ts >> Validate response body
- Location: tests\API-Testing\03-validating-status-headers-and-body.spec.ts:36:5

# Error details

```
Error: expect(received).toBeTruthy()

Received: undefined
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | /*
  4   |  * API Response Validation
  5   |  * Status  → HTTP result
  6   |  * Headers → response information
  7   |  * Body    → data returned by API
  8   |  */
  9   | 
  10  | // 1. Validate status code
  11  | test('Validate status code', async ({ request }) => {
  12  |   const response = await request.get(
  13  |     'https://jsonplaceholder.typicode.com/posts/1'
  14  |   );
  15  | 
  16  |   // status() returns the HTTP status code.
  17  |   expect(response.status()).toBe(200);
  18  | 
  19  |   // ok() returns true for 200-299 status codes.
  20  |   expect(response.ok()).toBe(true);
  21  | });
  22  | 
  23  | // 2. Validate response headers
  24  | test('Validate response headers', async ({ request }) => {
  25  |   const response = await request.get(
  26  |     'https://jsonplaceholder.typicode.com/posts/1'
  27  |   );
  28  | 
  29  |   // headers() returns response headers.
  30  |   const headers = response.headers();
  31  | 
  32  |   expect(headers['content-type']).toContain('application/json');
  33  | });
  34  | 
  35  | // 3. Validate response body
  36  | test('Validate response body', async ({ request }) => {
  37  |   const response = await request.get(
  38  |     'https://jsonplaceholder.typicode.com/posts/1'
  39  |   );
  40  | 
  41  |   // json() converts JSON response into a JavaScript object.
  42  |   const body = await response.json();
  43  | 
  44  |   expect(body.id).toBe(1);
  45  |   expect(body.userId).toBe(1);
> 46  |   expect(body.title1).toBeTruthy();
      |                       ^ Error: expect(received).toBeTruthy()
  47  |   expect(body.body).toBeTruthy();
  48  | });
  49  | 
  50  | // 4. Validate selected fields
  51  | test('Validate selected fields', async ({ request }) => {
  52  |   const response = await request.get(
  53  |     'https://jsonplaceholder.typicode.com/posts/1'
  54  |   );
  55  | 
  56  |   const body = await response.json();
  57  | 
  58  |   // toMatchObject() checks only the fields we specify.
  59  |   expect(body).toMatchObject({
  60  |     id: 1,
  61  |     userId: 1
  62  |   });
  63  | });
  64  | 
  65  | // 5. Read response as text
  66  | test('Read response as text', async ({ request }) => {
  67  |   const response = await request.get(
  68  |     'https://jsonplaceholder.typicode.com/posts/1'
  69  |   );
  70  | 
  71  |   // text() returns the response body as a string.
  72  |   const body = await response.text();
  73  |   console.log(body)
  74  |   expect(body).toContain('"id": 1');
  75  | });
  76  | 
  77  | // 6. Validate error response
  78  | test('Validate 404 response', async ({ request }) => {
  79  |   const response = await request.get(
  80  |     'https://jsonplaceholder.typicode.com/posts/999999'
  81  |   );
  82  | 
  83  |   expect(response.status()).toBe(404);
  84  | 
  85  |   // 404 is not a successful HTTP status.
  86  |   expect(response.ok()).toBe(false);
  87  | });
  88  | 
  89  | // | Status  | Name                  | Simple meaning                              |
  90  | // | ------- | --------------------- | ------------------------------------------- |
  91  | // | **200** | OK                    | Request was successful                      |
  92  | // | **201** | Created               | New resource was created                    |
  93  | // | **204** | No Content            | Request succeeded, but no response body     |
  94  | // | **400** | Bad Request           | Request/data is invalid                     |
  95  | // | **401** | Unauthorized          | Authentication is missing/invalid           |
  96  | // | **403** | Forbidden             | Authenticated, but not allowed              |
  97  | // | **404** | Not Found             | Resource/API endpoint not found             |
  98  | // | **405** | Method Not Allowed    | HTTP method isn't allowed for that endpoint |
  99  | // | **409** | Conflict              | Request conflicts with existing data        |
  100 | // | **422** | Unprocessable Content | Data format/validation is unacceptable      |
  101 | // | **500** | Internal Server Error | Server-side error                           |
  102 | // | **502** | Bad Gateway           | Gateway/proxy received a bad response       |
  103 | // | **503** | Service Unavailable   | Server/service temporarily unavailable      |
```