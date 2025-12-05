/**
 * Main application layout with AppBar and container
 */

import type { FC, ReactNode } from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import InsightsIcon from '@mui/icons-material/Insights';

interface AppLayoutProps {
  children: ReactNode;
}

/**
 * AppLayout component providing consistent structure across the app
 */
export const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" elevation={2}>
        <Toolbar>
          <InsightsIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
            GoInsight – Feedback Copilot
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container 
        maxWidth="xl" 
        sx={{ 
          mt: 4, 
          mb: 4, 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </Container>
      
      <Box 
        component="footer" 
        sx={{ 
          py: 2, 
          px: 2, 
          mt: 'auto',
          backgroundColor: (theme) => theme.palette.grey[100],
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="body2" color="text.secondary" align="center">
            GoInsight © {new Date().getFullYear()} – AI-Powered Feedback Analytics
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};
