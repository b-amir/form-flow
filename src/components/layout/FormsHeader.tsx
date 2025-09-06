import { Box, Typography, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import React from 'react';

const HEADER_HEIGHT = 64;

interface FormsHeaderProps {
  onAddForm: () => void;
}

export const FormsHeader: React.FC<FormsHeaderProps> = ({ onAddForm }) => {
  return (
    <Box
      sx={{
        height: HEADER_HEIGHT,
        minHeight: HEADER_HEIGHT,
        display: 'flex',
        alignItems: 'center',
        px: 2,
        borderBottom: 1,
        borderColor: 'divider',
        boxShadow: 4,
      }}
    >
      <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
        Forms
      </Typography>
      <IconButton onClick={onAddForm}>
        <Add />
      </IconButton>
    </Box>
  );
};
