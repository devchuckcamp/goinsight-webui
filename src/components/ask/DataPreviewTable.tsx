/**
 * Data preview table showing feedback items
 */

import type { FC } from 'react';
import { useMemo } from 'react';
import {
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Tooltip,
} from '@mui/material';
import TableChartIcon from '@mui/icons-material/TableChart';
import type { FeedbackItem } from '../../types/goinsight';

interface DataPreviewTableProps {
  data: FeedbackItem[];
}

/**
 * Get color for sentiment chip
 */
const getSentimentColor = (sentiment: string): 'success' | 'error' | 'default' => {
  switch (sentiment) {
    case 'positive':
      return 'success';
    case 'negative':
      return 'error';
    default:
      return 'default';
  }
};

/**
 * Get color for priority chip
 */
const getPriorityColor = (priority: number): 'error' | 'warning' | 'info' | 'default' => {
  if (priority >= 4) return 'error';
  if (priority === 3) return 'warning';
  if (priority === 2) return 'info';
  return 'default';
};

/**
 * Get color for customer tier chip
 */
const getTierColor = (tier: string): 'primary' | 'secondary' | 'default' => {
  if (tier === 'enterprise') return 'primary';
  if (tier === 'professional') return 'secondary';
  return 'default';
};

/**
 * Format date string to readable format
 */
const formatDate = (dateString: string): string => {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
};

/**
 * DataPreviewTable component displaying feedback items
 */
export const DataPreviewTable: FC<DataPreviewTableProps> = ({ data }) => {
  // Sort by priority (descending) then by date (newest first)
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      if (b.priority !== a.priority) {
        return b.priority - a.priority;
      }
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [data]);

  if (data.length === 0) {
    return (
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography color="text.secondary">No data preview available.</Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={2} sx={{ mb: 3 }}>
      <Box sx={{ p: 3, pb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <TableChartIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6">Data Preview</Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Showing {data.length} feedback {data.length === 1 ? 'item' : 'items'}
        </Typography>
      </Box>

      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Sentiment</TableCell>
              <TableCell>Product Area</TableCell>
              <TableCell>Topic</TableCell>
              <TableCell>Summary</TableCell>
              <TableCell>Tier</TableCell>
              <TableCell>Region</TableCell>
              <TableCell>Source</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((item) => (
              <TableRow key={item.id} hover>
                <TableCell>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                    {item.id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" noWrap>
                    {formatDate(item.created_at)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={item.priority}
                    size="small"
                    color={getPriorityColor(item.priority)}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={item.sentiment}
                    size="small"
                    color={getSentimentColor(item.sentiment)}
                    sx={{ textTransform: 'capitalize' }}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={item.product_area}
                    size="small"
                    variant="outlined"
                    sx={{ textTransform: 'capitalize' }}
                  />
                </TableCell>
                <TableCell>
                  <Tooltip title={item.topic}>
                    <Typography variant="body2" noWrap sx={{ maxWidth: 120 }}>
                      {item.topic}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip title={item.summary}>
                    <Typography variant="body2" noWrap sx={{ maxWidth: 250 }}>
                      {item.summary}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Chip
                    label={item.customer_tier}
                    size="small"
                    color={getTierColor(item.customer_tier)}
                    sx={{ textTransform: 'capitalize' }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{item.region}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                    {item.source}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
