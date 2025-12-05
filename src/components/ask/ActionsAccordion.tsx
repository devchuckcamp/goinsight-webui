/**
 * Actions accordion component for actionable items
 */

import type { FC } from 'react';
import {
  Paper,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  Button,
  CircularProgress,
  Alert,
  Chip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import type { Action } from '../../types/goinsight';
import { useInsightStore } from '../../store/useInsightStore';
import { useCreateJiraTickets } from '../../hooks/useCreateJiraTickets';

interface ActionsAccordionProps {
  actions: Action[];
}

/**
 * ActionsAccordion component displaying actionable items with JIRA ticket creation
 */
export const ActionsAccordion: FC<ActionsAccordionProps> = ({ actions }) => {
  const { selectedActionIndices, toggleActionSelection, removeCreatedActions } = useInsightStore();
  const { createTickets, creatingJiraTickets, jiraError, clearJiraError, hasSelectedActions } = useCreateJiraTickets();

  const handleCheckboxChange = (index: number) => {
    toggleActionSelection(index);
  };

  const handleCreateTickets = async () => {
    const indicesToRemove = [...selectedActionIndices];
    await createTickets();
    // Remove created actions from the list after successful creation
    removeCreatedActions(indicesToRemove);
  };

  if (actions.length === 0) {
    return null;
  }

  return (
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AssignmentTurnedInIcon sx={{ mr: 1, color: 'success.main' }} />
            <Typography variant="h6">Suggested Actions</Typography>
          </Box>
          
          <Button
            variant="contained"
            color="primary"
            startIcon={creatingJiraTickets ? <CircularProgress size={20} color="inherit" /> : <ConfirmationNumberIcon />}
            onClick={handleCreateTickets}
            disabled={!hasSelectedActions || creatingJiraTickets}
            sx={{ minWidth: 180 }}
          >
            {creatingJiraTickets ? 'Creating...' : 'Create JIRA Tickets'}
          </Button>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {actions.length} action{actions.length === 1 ? '' : 's'} available • {selectedActionIndices.length} selected
        </Typography>

        {/* JIRA Error Alert */}
        {jiraError && (
          <Alert 
            severity="error" 
            onClose={clearJiraError} 
            sx={{ mb: 2 }}
            action={
              <Button color="inherit" size="small" onClick={clearJiraError}>
                DISMISS
              </Button>
            }
          >
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
              Failed to Create JIRA Tickets
            </Typography>
            <Typography variant="body2">
              {jiraError.message}
            </Typography>
            {jiraError.status && (
              <Typography variant="caption" sx={{ display: 'block', mt: 0.5, opacity: 0.8 }}>
                Error Code: {jiraError.status}
              </Typography>
            )}
          </Alert>
        )}

        {actions.map((action, index) => (
        <Accordion key={index} defaultExpanded={index === 0}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              '& .MuiAccordionSummary-content': {
                alignItems: 'center',
              },
            }}
          >
            <Checkbox
              checked={selectedActionIndices.includes(index)}
              onChange={() => handleCheckboxChange(index)}
              onClick={(e) => e.stopPropagation()}
              sx={{ mr: 1 }}
            />
            <PlaylistAddCheckIcon sx={{ mr: 1.5, color: 'primary.main' }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 500, flex: 1 }}>
              {action.title}
            </Typography>
            {action.magnitude && (
              <Chip
                label={`Impact: ${action.magnitude.toFixed(1)}`}
                size="small"
                color={action.magnitude >= 7 ? 'error' : action.magnitude >= 5 ? 'warning' : 'default'}
                sx={{ ml: 2 }}
              />
            )}
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" sx={{ lineHeight: 1.8, whiteSpace: 'pre-line' }}>
              {action.description}
            </Typography>
          </AccordionDetails>
        </Accordion>
        ))}
      </Paper>
  );
};
