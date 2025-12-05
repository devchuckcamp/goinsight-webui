/**
 * Summary card displaying the question and AI-generated summary
 */

import type { FC } from 'react';
import { Paper, Typography, Box, Divider } from '@mui/material';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

interface InsightSummaryProps {
  question: string;
  summary: string;
}

/**
 * InsightSummary component showing the original question and summary
 */
export const InsightSummary: FC<InsightSummaryProps> = ({ question, summary }) => {
  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <QuestionAnswerIcon sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h6">Insight Summary</Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Your Question:
        </Typography>
        <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 2 }}>
          "{question}"
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Summary:
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
          {summary}
        </Typography>
      </Box>
    </Paper>
  );
};
