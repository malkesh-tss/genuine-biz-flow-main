---
name: frontend-vite-react
description: "Use for React, TypeScript, Vite, Tailwind, shadcn/Radix UI, responsive landing-page, form, animation, and frontend test changes."
argument-hint: "Describe the frontend behavior or component to change."
---
# Frontend Vite React

## Scope
Use this skill for work under `frontend/src`, frontend configuration, UI behavior, responsive layout, registration forms, and browser-facing tests.

## Procedure
1. Inspect the nearest page or component and its existing styles before creating abstractions.
2. Reuse `frontend/src/components/ui`, `cn()` from `frontend/src/lib/utils.ts`, Lucide icons, and existing CSS variables.
3. Keep TypeScript types explicit at API boundaries and preserve the registration payload unless the contract is intentionally changed.
4. Check loading, success, validation, network failure, keyboard, and mobile states for interactive changes.
5. Run from `frontend/`: `npm run lint`, `npm test`, and `npm run build` as relevant.

## Integration Checks
- Confirm API URLs and environment configuration rather than hard-coding new deployment endpoints.
- When changing registration fields, coordinate with the API and database skills.
- Do not add credentials or private service details to frontend source or environment examples.