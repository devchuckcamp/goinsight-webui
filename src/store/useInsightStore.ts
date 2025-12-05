/**
 * Global state management with Zustand
 * Manages insight data, loading states, and errors
 */

import { create } from 'zustand';
import type { AskResponse, ApiError, JiraTicket } from '../types/goinsight';

interface InsightState {
  // Data state
  currentQuestion: string | null;
  lastResponse: AskResponse | null;
  
  // UI state
  loading: boolean;
  error: ApiError | null;
  
  // JIRA state
  selectedActionIndices: number[];
  creatingJiraTickets: boolean;
  jiraTicketsCreated: JiraTicket[];
  jiraError: ApiError | null;
  
  // Actions
  setLoading: (loading: boolean) => void;
  setError: (error: ApiError | null) => void;
  setInsightData: (question: string, response: AskResponse) => void;
  clearError: () => void;
  reset: () => void;
  
  // JIRA Actions
  toggleActionSelection: (index: number) => void;
  clearActionSelection: () => void;
  setCreatingJiraTickets: (loading: boolean) => void;
  setJiraTicketsCreated: (tickets: JiraTicket[]) => void;
  setJiraError: (error: ApiError | null) => void;
  clearJiraError: () => void;
  removeCreatedActions: (indices: number[]) => void;
  clearJiraTickets: () => void;
}

const initialState = {
  currentQuestion: null,
  lastResponse: null,
  loading: false,
  error: null,
  selectedActionIndices: [],
  creatingJiraTickets: false,
  jiraTicketsCreated: [],
  jiraError: null,
};

/**
 * Zustand store for managing insight data and UI state
 */
export const useInsightStore = create<InsightState>((set) => ({
  ...initialState,
  
  setLoading: (loading: boolean) => set({ loading, error: null }),
  
  setError: (error: ApiError | null) => set({ error, loading: false }),
  
  setInsightData: (question: string, response: AskResponse) => set({
    currentQuestion: question,
    lastResponse: response,
    loading: false,
    error: null,
    selectedActionIndices: [],
    jiraTicketsCreated: [],
  }),
  
  clearError: () => set({ error: null }),
  
  reset: () => set(initialState),
  
  // JIRA Actions
  toggleActionSelection: (index: number) => set((state) => {
    const isSelected = state.selectedActionIndices.includes(index);
    return {
      selectedActionIndices: isSelected
        ? state.selectedActionIndices.filter(i => i !== index)
        : [...state.selectedActionIndices, index]
    };
  }),
  
  clearActionSelection: () => set({ selectedActionIndices: [] }),
  
  setCreatingJiraTickets: (loading: boolean) => set({ creatingJiraTickets: loading, jiraError: null }),
  
  setJiraTicketsCreated: (tickets: JiraTicket[]) => set({
    jiraTicketsCreated: tickets,
    creatingJiraTickets: false,
    selectedActionIndices: [],
    jiraError: null,
  }),
  
  setJiraError: (error: ApiError | null) => set({ jiraError: error, creatingJiraTickets: false }),
  
  clearJiraError: () => set({ jiraError: null }),
  
  removeCreatedActions: (indicesToRemove: number[]) => set((state) => {
    if (!state.lastResponse) return state;
    
    // Remove actions at the specified indices
    const newActions = state.lastResponse.actions.filter((_, idx) => !indicesToRemove.includes(idx));
    
    return {
      lastResponse: {
        ...state.lastResponse,
        actions: newActions,
      },
    };
  }),
  
  clearJiraTickets: () => set({ jiraTicketsCreated: [] }),
}));
