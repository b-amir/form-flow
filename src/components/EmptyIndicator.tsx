import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

interface EmptyIndicatorProps {
  message?: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

export const EmptyIndicator: React.FC<EmptyIndicatorProps> = ({
  message = 'No content available',
  subtitle,
  icon = <InfoOutlinedIcon fontSize="large" color="disabled" />,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
          minHeight: 180,
          maxWidth: '80%',
          width: '100%',
        }}
      >
        <Box sx={{ mb: 2 }}>{icon}</Box>
        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          sx={{ mb: subtitle ? 1 : 0 }}
        >
          {message}
        </Typography>
        {subtitle && (
          <Typography variant="caption" color="text.secondary" align="center">
            {subtitle}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};
