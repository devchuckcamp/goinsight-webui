/**
 * Application configuration
 * Centralizes environment variables and app settings
 */

export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  jiraProjectKey: import.meta.env.VITE_JIRA_PROJECT_KEY || 'SASS',
} as const;
