/**
 * Main App component
 * Orchestrates the GoInsight frontend application
 */

import type { FC } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Alert, Box, Snackbar, IconButton, Typography, Link } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { AppLayout } from './components/layout/AppLayout';
import { QuestionForm } from './components/ask/QuestionForm';
import { InsightSummary } from './components/ask/InsightSummary';
import { DataPreviewTable } from './components/ask/DataPreviewTable';
import { RecommendationsList } from './components/ask/RecommendationsList';
import { ActionsAccordion } from './components/ask/ActionsAccordion';
import { useInsightStore } from './store/useInsightStore';
import { useAskQuestion } from './hooks/useAskQuestion';
import './styles/global.scss';

// Create MUI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
  },
});

/**
 * Main App component
 */
const App: FC = () => {
  const { lastResponse, currentQuestion, jiraTicketsCreated, clearJiraTickets } = useInsightStore();
  const { error, clearError } = useAskQuestion();
  
  // Derive snackbar state from jiraTicketsCreated
  const snackbarOpen = Boolean(jiraTicketsCreated?.length);
  const ticketMessage = jiraTicketsCreated?.length
    ? `Successfully created ${jiraTicketsCreated.length} JIRA ticket${jiraTicketsCreated.length === 1 ? '' : 's'}!`
    : '';
  
  const handleSnackbarClose = () => {
    clearJiraTickets();
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppLayout>
        {/* Error Alert */}
        {error && (
          <Alert 
            severity="error" 
            onClose={clearError}
            sx={{ mb: 3 }}
          >
            {error.message}
          </Alert>
        )}

        {/* Question Form */}
        <QuestionForm />

        {/* Results Section */}
        {lastResponse && currentQuestion && (
          <Box>
            {/* Summary */}
            <InsightSummary
              question={currentQuestion}
              summary={lastResponse.summary}
            />

            {/* Data Preview Table */}
            {lastResponse.data_preview && lastResponse.data_preview.length > 0 && (
              <DataPreviewTable data={lastResponse.data_preview} />
            )}

            {/* Recommendations */}
            {lastResponse.recommendations && lastResponse.recommendations.length > 0 && (
              <RecommendationsList recommendations={lastResponse.recommendations} />
            )}

            {/* Actions */}
            {lastResponse.actions && lastResponse.actions.length > 0 && (
              <ActionsAccordion actions={lastResponse.actions} />
            )}
          </Box>
        )}

        {/* Empty State */}
        {!lastResponse && (
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
              color: 'text.secondary',
            }}
          >
            <Box sx={{ fontSize: 48, mb: 2 }}>💡</Box>
            <Box sx={{ fontSize: 18, fontWeight: 500, mb: 1 }}>
              Ready to analyze your feedback data
            </Box>
            <Box sx={{ fontSize: 14 }}>
              Enter a natural language question above to get started
            </Box>
          </Box>
        )}
      </AppLayout>

      {/* JIRA Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        message={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Typography variant="body2">{ticketMessage}</Typography>
            {jiraTicketsCreated && jiraTicketsCreated.length > 0 && (
              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                {jiraTicketsCreated.map((ticket, idx) => (
                  <Link
                    key={idx}
                    href={ticket.ticket_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: 'white', textDecoration: 'underline' }}
                  >
                    {ticket.ticket_key}
                  </Link>
                ))}
              </Box>
            )}
          </Box>
        }
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleSnackbarClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: 'success.main',
            color: 'white',
          },
        }}
      />
    </ThemeProvider>
  );
};

export default App;
