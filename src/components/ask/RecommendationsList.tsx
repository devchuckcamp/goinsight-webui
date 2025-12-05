/**
 * Recommendations list component
 */

import type { FC } from 'react';
import { Paper, Typography, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface RecommendationsListProps {
  recommendations: string[];
}

/**
 * RecommendationsList component displaying AI-generated recommendations
 */
export const RecommendationsList: FC<RecommendationsListProps> = ({ recommendations }) => {
  if (recommendations.length === 0) {
    return null;
  }

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <LightbulbIcon sx={{ mr: 1, color: 'warning.main' }} />
        <Typography variant="h6">Recommendations</Typography>
      </Box>

      <List>
        {recommendations.map((recommendation, index) => (
          <ListItem key={index} alignItems="flex-start" disableGutters>
            <ListItemIcon sx={{ minWidth: 36, mt: 0.5 }}>
              <CheckCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={recommendation}
              primaryTypographyProps={{
                variant: 'body1',
                sx: { lineHeight: 1.7 },
              }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};
