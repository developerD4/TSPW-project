/*
 * JSON Schema:
 * Describes the expected structure and data types of an API response.
 * Schema = a blueprint that defines the expected structure, fields, and data types of API data.
 *
 * AJV:
 * A library that validates real JSON data against a JSON Schema.
 *
 * Why use schema validation?
 * Checking many fields one by one becomes repetitive.
 * A schema lets us describe the expected structure once.
 */

//npm install --save-dev ajv
import { test, expect } from '@playwright/test';
import Ajv from 'ajv';
const ajv = new Ajv();
// Expected structure of one user.
const userSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    email: { type: 'string' }
  },
  required: ['id', 'name', 'email']
};
test('Validate API response using JSON Schema', async ({ request }) => {
  // Send GET request.
  const response = await request.get('https://jsonplaceholder.typicode.com/users/1');

  // Convert JSON response into a JavaScript object.
  const body = await response.json();
  console.log(body);
  // Creates a validation function from the schema.
  const validate = ajv.compile(userSchema);
  // Check whether the response matches the schema.
  const isValid = validate(body);
  // Verify that the response is valid.
  expect(isValid).toBe(true);
});
