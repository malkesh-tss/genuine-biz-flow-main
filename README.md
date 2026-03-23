# Online_networking — Genuine Biz Flow

Overview

- A two-part project: a React + Vite frontend (landing page) and an Express-based backend API for handling registrations and emails.
- Frontend located in the `genuine-biz-flow-main` folder. Backend located in the `api` folder.

Quick summary

- Frontend: Modern landing page built with React, TypeScript, Vite, Tailwind CSS and shadcn/ui components.
- Backend: Small Express API (Node) that saves registrations to a PostgreSQL-compatible database (NeonDB) and sends confirmation emails via Gmail/Nodemailer.

Prerequisites

- Node.js (v18+ recommended)
- npm
- (Optional) Git
- (Optional) PostgreSQL-compatible DB URL (NeonDB) and Gmail app password for sending emails

Environment variables (backend)

- `DATABASE_URL` — PostgreSQL connection string (optional; server will run without it but DB endpoints return "Database not configured")
- `GMAIL_EMAIL` — Gmail address used to send confirmation emails
- `GMAIL_APP_PASSWORD` — Gmail app password for SMTP
- `PORT` — optional override for backend port (defaults to `3001`)

Setup

1. Clone or copy the repository (if not already present):

```bash
# from your workspace parent folder
git clone <your-repo-url> Online_networking
cd Online_networking
```

2. Install backend dependencies

```bash
cd api
npm install
```

3. Install frontend dependencies

```bash
cd ../genuine-biz-flow-main
npm install
```

Run (development)

- Start backend (open a terminal and run):

```bash
cd api
# recommended: node start-server.mjs
node start-server.mjs
# or use package script (runs api/api/server.js):
# npm start
```

- Start frontend (in a separate terminal):

```bash
cd genuine-biz-flow-main
npm run dev
```

- Open the frontend in your browser (Vite will print the exact URL, usually `http://localhost:5173` or `http://localhost:8080`).
- Backend health-check: `http://localhost:3001/api/health`

Run both concurrently (optional)

You can run the frontend and backend in separate terminals, or add a small top-level npm script that launches both with `concurrently` or `npm-run-all`.

Project structure (top-level)

```
Online_networking/
├── api/                          # Backend API project
│   ├── api/                      # Actual Express server files (server.js)
│   ├── package.json
│   └── start-server.mjs          # helper start script (created)
├── genuine-biz-flow-main/        # Frontend (Vite + React + TypeScript)
│   ├── src/
│   ├── public/
│   └── package.json
├── README.md                     # <-- you are here
└── .gitignore
```

Notes & tips

- The backend will run without `DATABASE_URL`, but endpoints that require DB will return an error; health endpoint reports the DB configuration state.
- To enable email sending, set `GMAIL_EMAIL` and `GMAIL_APP_PASSWORD` in your environment before starting the backend.
- If you want the API and frontend in a single `npm run dev` from the repository root, I can add a top-level `package.json` with a `dev` script that uses `concurrently` to run both — tell me if you want that.

Useful commands

- Backend install: `cd api && npm install`
- Backend start: `cd api && node start-server.mjs`
- Frontend install: `cd genuine-biz-flow-main && npm install`
- Frontend dev: `cd genuine-biz-flow-main && npm run dev`

License

© 2026 The Scale Summit. All rights reserved.
