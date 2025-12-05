/**
 * GoInsight API functions
 * Typed API calls for the GoInsight backend
 */

import apiClient from './client';
import type { AskRequest, AskResponse, CreateJiraTicketsRequest, CreateJiraTicketsResponse } from '../types/goinsight';

/**
 * Ask a natural language question to the GoInsight API
 * @param question - Natural language question about feedback data
 * @returns Promise with insight data including preview, summary, recommendations, and actions
 */
export const askQuestion = async (question: string): Promise<AskResponse> => {
  const request: AskRequest = { question };
  const response = await apiClient.post<AskResponse>('/api/ask', request);
  return response.data;
};

/**
 * Create JIRA tickets from selected actions
 * @param payload - Request payload containing question, summary, recommendations, actions, and meta
 * @returns Promise with created JIRA ticket information
 */
export const createJiraTickets = async (
  payload: CreateJiraTicketsRequest
): Promise<CreateJiraTicketsResponse> => {
  const response = await apiClient.post<CreateJiraTicketsResponse>('/api/jira-tickets', payload, {
    maxRedirects: 0,
    validateStatus: (status) => status >= 200 && status < 400,
  });
  
  // If backend returns a redirect, we still want the response data, not to follow the redirect
  return response.data;
};
