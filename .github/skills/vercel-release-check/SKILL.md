---
name: vercel-release-check
description: "Use for Vercel configuration, serverless Express deployment, frontend build output, route rewrites, environment variables, and production release verification."
argument-hint: "Describe the deployment, routing, build, or production configuration to verify."
---
# Vercel Release Check

## Procedure
1. Read `vercel.json`, both package manifests, and the actual API entry point together.
2. Verify frontend output directory, static build configuration, API route rewrites, and SPA fallback behavior.
3. Confirm the API exports a serverless-compatible handler and does not unconditionally start a listener when loaded by Vercel.
4. Check production environment variables without printing their values.
5. Run `cd frontend; npm run lint; npm test; npm run build` and perform a safe health-check or deployment smoke test when available.
6. Document any manual migration, secret rotation, DNS, or platform setting required for release.

## Release Risks
- Keep frontend API URLs environment-configurable.
- Do not commit credentials or include private connection strings in examples.
- Treat route, database namespace, CORS, and email behavior changes as release-impacting.