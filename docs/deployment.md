# Deployment Notes

Quick notes for building and serving the app in different environments.

Local preview

```bash
npm run build
npm run preview
```

Static hosting (Netlify / Vercel / S3)
- Build the app: `npm run build` — artifacts are placed in `dist/`.
- Upload the `dist/` contents to your static host. Ensure the host rewrites all routes to `index.html` for client-side routing.

Docker (simple static server)

```Dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Environment variables
- `VITE_API_BASE_URL` should point to the backend API. In production, set this to the deployed backend base URL.
- `VITE_JIRA_PROJECT_KEY` can remain unset if you don't use JIRA features.

Security notes
- This frontend does not include authentication; avoid pointing it at production backends without proper auth.
- Do not embed secrets in client-side code.
