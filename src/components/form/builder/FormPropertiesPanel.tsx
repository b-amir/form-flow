import React from 'react';
import { Box, Typography, TextField } from '@mui/material';

interface FormPropertiesPanelProps {
  formName: string;
  onFormNameChange: (name: string) => void;
}

export const FormPropertiesPanel: React.FC<FormPropertiesPanelProps> = ({
  formName,
  onFormNameChange,
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6" gutterBottom>
        Form Properties
      </Typography>
      <TextField
        label="Form Name"
        value={formName}
        onChange={e => onFormNameChange(e.target.value)}
        variant="outlined"
        size="small"
      />
    </Box>
  );
};
