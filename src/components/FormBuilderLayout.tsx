import React from 'react';
import { Box } from '@mui/material';
import { ElementSelectionPanel } from './ElementSelectionPanel';

export const FormBuilderLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const handleSelectElement = (type: 'text' | 'checkbox') => {
    // TODO: Implement element addition logic
    console.log('Selected element type:', type);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Box
        sx={{
          width: 240,
          p: 2,
          borderRight: '1px solid #eee',
          bgcolor: '#fafafa',
        }}
      >
        <ElementSelectionPanel onSelectElement={handleSelectElement} />
      </Box>
      <Box sx={{ flex: 1, p: 2 }}>{children}</Box>
    </Box>
  );
};
