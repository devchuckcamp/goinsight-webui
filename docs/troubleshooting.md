# Troubleshooting

Common issues and how to resolve them.

1) Dev server won't start / `node` not found
- Ensure Node.js and npm are installed and available on PATH.
- On Windows, run commands from PowerShell or CMD if your Bash environment lacks `node` on PATH.

2) API requests failing (CORS / 401 / 403)
- Confirm `VITE_API_BASE_URL` points to the backend and that the backend allows requests from `localhost:5173`.
- For 401/403, check backend authentication configuration. The frontend doesn't include authentication by default.

3) Jira ticket creation returns parse errors
- Common cause: newlines or control characters in the `description` field. The frontend strips `\n`, `\r`, `\t` characters before sending.
- If the backend still rejects the payload, check backend logs and paste the raw payload logged by the frontend (it logs payloads on ticket creation during debugging).

4) Dev server shows `bash: d: command not found` in the automation environment
- This is likely due to running commands in a non-Windows-native Bash that tries to interpret `C:` drive paths as commands.
- Use PowerShell or CMD for `npm run dev`, or ensure your Bash shell correctly handles Windows paths and has `node` installed.

5) UI shows empty recommendations or actions
- Confirm the `/api/ask` response contains `summary`, `recommendations`, and `actions` keys.
- Check the browser console and network tab for the exact response payload.

How to collect useful logs
- Open Developer Tools (F12) → Console and Network tabs.
- Reproduce the failing request, inspect the request/response payloads and headers.
- Copy the request body and response body to share with the backend/maintainers.
