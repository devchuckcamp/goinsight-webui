## What to expect when running this project

This document describes what you can expect from the frontend in this repository and what is required to run it locally.

- Purpose: a React + TypeScript frontend that integrates with the GoInsight backend to ask natural-language questions about feedback data and (optionally) create JIRA tickets from selected actions.
- Prerequisites:
  - Node.js (16+ recommended) and npm available on PATH.
  - The GoInsight backend running (default expected URL: `http://localhost:8080`).
  - Optionally a JIRA instance and a valid `VITE_JIRA_PROJECT_KEY` if you want to test ticket creation.
- Environment variables (see `.env.example`):
  - `VITE_API_BASE_URL` — base URL for the GoInsight API (e.g. `http://localhost:8080`).
  - `VITE_JIRA_PROJECT_KEY` — optional JIRA project key used when creating tickets.
- How to run (from project root):
  ```bash
  npm install
  npm run dev
  ```
- What the UI does:
  - Provides a form to ask questions (POST `/api/ask` to backend).
  - Shows an insight summary, recommended actions, and a preview table of related data.
  - Lets you select actions and create JIRA tickets for them (POST `/api/jira-tickets`).
- Important behaviour & limitations:
  - The app sanitizes text fields before sending requests to avoid backend parse errors (newlines and control characters are stripped).
  - Axios is configured to avoid following redirects for certain API flows so responses are explicit.
  - Authentication for the backend/JIRA is not included by default — add your own auth integration if required.
  - This repo is a demo/integration frontend; it is not a complete production-ready product (see README for more details).
- Troubleshooting:
  - If ticket creation returns parse errors, check the console for the payload logged by the client.
  - If the dev server fails to start in your shell, try running the commands in PowerShell/CMD or ensure your Bash environment has `node`/`npm` on PATH.

If you want, I can add more detail here (examples of successful payloads, expected response shapes, or troubleshooting logs).
