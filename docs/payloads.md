# Payload Examples

This file contains minimal example payloads and notes for the two main API interactions used by the frontend.

1) POST `/api/ask` (request)

```json
{
  "question": "Show me critical issues from enterprise customers"
}
```

Example response (successful):

```json
{
  "question": "Show me critical issues from enterprise customers",
  "data_preview": [ /* array of rows */ ],
  "summary": "Analysis summary...",
  "recommendations": ["Recommendation 1", "Recommendation 2"],
  "actions": [{ "title": "Fix X", "description": "Investigate X and fix" }]
}
```

Notes:
- The frontend sanitizes text fields (removes newlines/control chars) before sending to avoid backend parse errors.
- `data_preview` should be an array of objects matching your feedback rows; the frontend displays selected fields.

2) POST `/api/jira-tickets` (request payload built by the frontend)

```json
{
  "meta": { "project_key": "SASS" },
  "data_preview": [ /* same as returned by /api/ask */ ],
  "tickets": [
    {
      "summary": "Fix Refund Processing Bug",
      "description": "Investigate and resolve refund processing issue...",
      "labels": ["insight", "refund"]
    }
  ]
}
```

Example response (successful):

```json
{
  "created_tickets": [
    {
      "key": "SASS-123",
      "url": "https://your-jira-instance/browse/SASS-123"
    }
  ]
}
```

Notes:
- If the backend returns parse errors referencing `\n` or control characters, inspect the `description` fields — these are sanitized by the frontend but may still fail if custom templates are used.
- The frontend expects `created_tickets` (array) on success; adjust server behavior or the frontend mapping if your backend returns a different shape.
