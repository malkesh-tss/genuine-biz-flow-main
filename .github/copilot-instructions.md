# Project Guidelines

## Architecture
- This repository contains a Vite React TypeScript frontend in `frontend/` and an ESM Express API in `api/`.
- PostgreSQL/Neon schema lives in `frontend/database/schema.sql`; deployment is configured in `vercel.json`.
- Keep frontend, API, database, and deployment changes aligned when a request crosses a boundary.

## Frontend
- Use the existing React, TypeScript, Tailwind CSS, shadcn/Radix UI, Framer Motion, and Lucide conventions.
- Use the `@/*` alias and shared components from `frontend/src/components/ui` before adding new primitives.
- Preserve the existing visual language and responsive behavior unless the task explicitly requests a redesign.

## API And Data
- Preserve existing response shapes and registration fields unless a contract change is intentional and documented.
- Use parameterized PostgreSQL queries and validate request data on the server, not only in the browser.
- Treat `DATABASE_URL`, `GMAIL_EMAIL`, and `GMAIL_APP_PASSWORD` as secrets. Never commit credentials, log request bodies, or expose stack traces.
- Review CORS, authentication, email HTML escaping, and serverless behavior before changing API or deployment code.

## Validation
- Frontend checks run from `frontend/`: `npm run lint`, `npm test`, and `npm run build`.
- API checks run from `api/`; verify the actual entry point and package scripts before relying on them.
- For registration changes, test the frontend payload, API validation, SQL table/schema, and error responses together.