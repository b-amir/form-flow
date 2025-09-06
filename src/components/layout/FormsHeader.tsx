import { Box, Typography, IconButton, useTheme } from '@mui/material';
import { Add } from '@mui/icons-material';
import React from 'react';
import logo from '@/assets/logo.svg';

const HEADER_HEIGHT = 80;

interface FormsHeaderProps {
  onAddForm: () => void;
}

export const FormsHeader: React.FC<FormsHeaderProps> = ({ onAddForm }) => {
  const theme = useTheme();
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
        background: `linear-gradient(135deg, ${theme.palette.error.light}20 0%, #fff 100%)`,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexGrow: 1,
        }}
      >
        <Typography
          variant="h3"
          component="div"
          fontWeight={700}
          color="textPrimary"
          fontSize={17}
        >
          Form
        </Typography>{' '}
        <img
          src={logo}
          alt="FormFlow Logo"
          style={{ height: '68px', marginRight: '-6px' }}
        />
        <Typography
          variant="h3"
          component="div"
          fontWeight={700}
          color="textPrimary"
          fontSize={17}
        >
          Flow
        </Typography>{' '}
      </Box>
      <IconButton onClick={onAddForm}>
        <Add />
      </IconButton>
    </Box>
  );
};
