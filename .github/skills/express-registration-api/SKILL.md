---
name: express-registration-api
description: "Use for Express endpoints, registration validation, PostgreSQL queries, email confirmation, CORS, environment variables, API tests, and Node server startup."
argument-hint: "Describe the API endpoint, contract, or server behavior to change."
---
# Express Registration API

## Scope
Use this skill for `api/server.js`, `api/start-server.mjs`, API package scripts, and backend integration behavior.

## Procedure
1. Trace the request from frontend payload to route, validation, SQL query, email behavior, and response.
2. Validate required fields, lengths, formats, and enumerated values on the server.
3. Use parameterized SQL and stable JSON error shapes; do not return raw database errors or stack traces.
4. Restrict CORS to known origins and review authentication before exposing read or admin endpoints.
5. Escape user-controlled values inserted into email HTML and avoid logging request bodies or secrets.
6. Verify the actual API entry point, package working directory, `PORT`, and whether the code runs under Vercel serverless execution.

## Validation
Run backend commands from `api/`. Check health and registration behavior with safe test data, and run the frontend checks when the payload or response contract changes.