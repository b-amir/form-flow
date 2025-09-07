import React from 'react';
import { Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface AddRuleButtonProps {
  onClick: () => void;
}

export const AddRuleButton: React.FC<AddRuleButtonProps> = ({ onClick }) => (
  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
    <IconButton
      size="small"
      onClick={onClick}
      sx={{
        border: '1px dashed',
        borderColor: 'primary.main',
        color: 'primary.main',
        p: 0.5,
        '&:hover': {
          backgroundColor: 'primary.50',
          borderColor: 'primary.dark',
        },
      }}
    >
      <AddIcon sx={{ fontSize: 14 }} />
    </IconButton>
  </Box>
);
