/**
 * Custom hook for creating JIRA tickets from selected actions
 */

import { useCallback } from 'react';
import { useInsightStore } from '../store/useInsightStore';
import { createJiraTickets } from '../api/goinsight';
import { config } from '../config';
import type { ApiError, CreateJiraTicketsRequest } from '../types/goinsight';

interface UseCreateJiraTicketsReturn {
  createTickets: () => Promise<void>;
  creatingJiraTickets: boolean;
  jiraError: ApiError | null;
  clearJiraError: () => void;
  hasSelectedActions: boolean;
}

/**
 * Hook to manage creating JIRA tickets from selected actions
 */
export const useCreateJiraTickets = (): UseCreateJiraTicketsReturn => {
  const {
    lastResponse,
    currentQuestion,
    selectedActionIndices,
    creatingJiraTickets,
    jiraError,
    setCreatingJiraTickets,
    setJiraTicketsCreated,
    setJiraError,
    clearJiraError,
  } = useInsightStore();

  const createTickets = useCallback(async () => {
    if (!lastResponse || !currentQuestion || selectedActionIndices.length === 0) {
      setJiraError({ message: 'Please select at least one action to create tickets' });
      return;
    }

    try {
      setCreatingJiraTickets(true);

      // Filter selected actions
      const selectedActions = selectedActionIndices.map(index => lastResponse.actions[index]);

      // Clean and normalize text fields - remove ALL control characters and excessive whitespace
      const cleanText = (text: string) => {
        if (!text) return '';
        // Remove newlines, carriage returns, tabs, and other control characters
        return text
          .replace(/[\r\n\t]/g, ' ')
          .replace(/[^\x20-\x7E\u00A0-\uFFFF]/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
      };

      // Prepare request payload with cleaned data
      const payload: CreateJiraTicketsRequest = {
        question: cleanText(currentQuestion),
        data_preview: lastResponse.data_preview,
        summary: cleanText(lastResponse.summary),
        recommendations: lastResponse.recommendations.map(rec => cleanText(rec)),
        actions: selectedActions.map(action => ({
          title: cleanText(action.title),
          description: cleanText(action.description),
        })),
        meta: {
          project_key: config.jiraProjectKey,
        },
      };

      console.log('Payload being sent:', JSON.stringify(payload, null, 2));

      const response = await createJiraTickets(payload);
      console.log('Created tickets:', response.created_tickets);
      
      if (!response.created_tickets || response.created_tickets.length === 0) {
        setJiraError({ 
          message: 'No tickets were created. Please try again or contact support if the issue persists.',
          status: 200 
        });
        return;
      }
      
      setJiraTicketsCreated(response.created_tickets);
    } catch (err) {
      const apiError = err as ApiError;
      console.error('JIRA Error:', apiError);
      
      // Provide user-friendly error messages
      let userMessage = apiError.message;
      
      if (apiError.status === 404) {
        userMessage = 'JIRA ticket creation endpoint not found. Please check your backend configuration.';
      } else if (apiError.status === 401 || apiError.status === 403) {
        userMessage = 'Authentication failed. Please check your JIRA credentials and permissions.';
      } else if (apiError.status === 400) {
        userMessage = 'Invalid request data. Please try selecting different actions or contact support.';
      } else if (apiError.status === 500) {
        userMessage = 'Server error occurred while creating tickets. Please try again later.';
      } else if (apiError.status === 0 || !apiError.status) {
        userMessage = 'Unable to connect to the server. Please check your internet connection and try again.';
      } else if (apiError.message?.includes('Failed to parse')) {
        userMessage = 'Data formatting error. Please try again or contact support if the issue persists.';
      }
      
      setJiraError({ 
        message: userMessage,
        status: apiError.status 
      });
    }
  }, [
    lastResponse,
    currentQuestion,
    selectedActionIndices,
    setCreatingJiraTickets,
    setJiraTicketsCreated,
    setJiraError,
  ]);

  return {
    createTickets,
    creatingJiraTickets,
    jiraError,
    clearJiraError,
    hasSelectedActions: selectedActionIndices.length > 0,
  };
};
