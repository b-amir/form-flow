import React, { useState } from 'react';
import { Box } from '@mui/material';
import { ElementSelectionPanel } from './ElementSelectionPanel';
import { FormPropertiesPanel } from './FormPropertiesPanel';

export const FormBuilderLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [formName, setFormName] = useState('Untitled Form');

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
      <Box
        sx={{
          width: 320,
          p: 2,
          borderLeft: '1px solid #eee',
          bgcolor: '#fafafa',
        }}
      >
        <FormPropertiesPanel
          formName={formName}
          onFormNameChange={setFormName}
        />
      </Box>
    </Box>
  );
};
