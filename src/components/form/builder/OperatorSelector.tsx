import React from 'react';
import { Box, Typography, Chip } from '@mui/material';

interface OperatorSelectorProps {
  operator: 'AND' | 'OR';
  onChange: (operator: 'AND' | 'OR') => void;
}

export const OperatorSelector: React.FC<OperatorSelectorProps> = ({
  operator,
  onChange,
}) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 0.5,
      backgroundColor: 'grey.200',
      borderRadius: 1,
      px: 1,
      py: 0.5,
      minHeight: 24,
    }}
  >
    <Typography
      variant="caption"
      sx={{
        fontSize: '0.65rem',
        color: 'text.secondary',
        whiteSpace: 'nowrap',
      }}
    >
      Show when
    </Typography>
    <Box sx={{ display: 'flex', gap: 0.25 }}>
      <Chip
        label="ALL"
        size="small"
        variant={operator === 'AND' ? 'filled' : 'outlined'}
        onClick={() => onChange('AND')}
        sx={{
          fontSize: '0.6rem',
          height: 18,
          cursor: 'pointer',
          '&:hover': { backgroundColor: 'action.hover' },
          '& .MuiChip-label': { px: 0.5 },
        }}
      />
      <Chip
        label="ANY"
        size="small"
        variant={operator === 'OR' ? 'filled' : 'outlined'}
        onClick={() => onChange('OR')}
        sx={{
          fontSize: '0.6rem',
          height: 18,
          cursor: 'pointer',
          '&:hover': { backgroundColor: 'action.hover' },
          '& .MuiChip-label': { px: 0.5 },
        }}
      />
    </Box>
    <Typography
      variant="caption"
      sx={{
        fontSize: '0.65rem',
        color: 'text.secondary',
        whiteSpace: 'nowrap',
      }}
    >
      conditions are met
    </Typography>
  </Box>
);
