/**
 * Custom hook for asking questions to the GoInsight API
 * Encapsulates API call logic and state management
 */

import { useCallback } from 'react';
import { useInsightStore } from '../store/useInsightStore';
import { askQuestion as askQuestionApi } from '../api/goinsight';
import type { ApiError } from '../types/goinsight';

interface UseAskQuestionReturn {
  askQuestion: (question: string) => Promise<void>;
  loading: boolean;
  error: ApiError | null;
  clearError: () => void;
}

/**
 * Hook to manage asking questions to the GoInsight API
 * Automatically updates the global store with results
 */
export const useAskQuestion = (): UseAskQuestionReturn => {
  const { setLoading, setError, setInsightData, clearError, loading, error } = useInsightStore();

  const askQuestion = useCallback(
    async (question: string) => {
      if (!question.trim()) {
        setError({ message: 'Please enter a question' });
        return;
      }

      try {
        setLoading(true);
        const response = await askQuestionApi(question);
        setInsightData(question, response);
      } catch (err) {
        const apiError = err as ApiError;
        setError(apiError);
      }
    },
    [setLoading, setError, setInsightData]
  );

  return {
    askQuestion,
    loading,
    error,
    clearError,
  };
};
