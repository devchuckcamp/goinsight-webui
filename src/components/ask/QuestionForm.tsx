/**
 * Question form component for submitting natural language queries
 */

import type { FC, FormEvent } from 'react';
import { useState, useCallback } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Stack,
  Chip,
  CircularProgress,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useAskQuestion } from '../../hooks/useAskQuestion';

// Example questions users can click to try
const EXAMPLE_QUESTIONS = [
  'Show me critical issues from enterprise customers',
  'What are the top billing problems this month?',
  'Show negative feedback about API performance',
  'List high priority items from North America',
];

/**
 * QuestionForm component for user input
 */
export const QuestionForm: FC = () => {
  const [question, setQuestion] = useState('');
  const { askQuestion, loading } = useAskQuestion();

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (question.trim() && !loading) {
        await askQuestion(question);
      }
    },
    [question, loading, askQuestion]
  );

  const handleExampleClick = useCallback((exampleQuestion: string) => {
    setQuestion(exampleQuestion);
  }, []);

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        Ask a Question
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Ask natural language questions about feedback data
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            placeholder="e.g., Show me critical issues from enterprise customers"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            disabled={loading}
            autoFocus
          />

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
              disabled={loading || !question.trim()}
              sx={{ minWidth: 120 }}
            >
              {loading ? 'Analyzing...' : 'Submit'}
            </Button>
          </Box>

          {EXAMPLE_QUESTIONS.length > 0 && (
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                Try an example:
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {EXAMPLE_QUESTIONS.map((example, index) => (
                  <Chip
                    key={index}
                    label={example}
                    onClick={() => handleExampleClick(example)}
                    variant="outlined"
                    size="small"
                    disabled={loading}
                    sx={{ mb: 1 }}
                  />
                ))}
              </Stack>
            </Box>
          )}
        </Stack>
      </form>
    </Paper>
  );
};
