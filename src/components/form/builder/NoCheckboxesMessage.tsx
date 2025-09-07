import React from 'react';
import { Box, Typography, Paper, Fade } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import AddIcon from '@mui/icons-material/Add';

export const NoCheckboxesMessage: React.FC = () => (
  <Fade in timeout={300}>
    <Paper
      elevation={0}
      sx={{
        p: 2,
        backgroundColor: 'grey.50',
        border: '1px dashed',
        borderColor: 'grey.300',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        my: 2,
        gap: 1.5,
        textAlign: 'center',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          backgroundColor: 'grey.100',
          borderColor: 'primary.main',
          transform: 'translateY(-1px)',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          color: 'text.secondary',
        }}
      >
        <CheckBoxOutlineBlankIcon sx={{ fontSize: 20, opacity: 0.7 }} />
        <AddIcon sx={{ fontSize: 16, opacity: 0.5 }} />
      </Box>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          fontWeight: 500,
          lineHeight: 1.4,
          maxWidth: 200,
        }}
      >
        Add checkbox fields to enable conditional logic
      </Typography>

      <Typography
        variant="caption"
        color="text.disabled"
        sx={{
          fontSize: '0.7rem',
          opacity: 0.8,
        }}
      >
        Create dependencies between form fields
      </Typography>
    </Paper>
  </Fade>
);
