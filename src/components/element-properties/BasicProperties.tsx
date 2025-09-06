import React from 'react';
import { TextField, FormControlLabel, Switch, Typography } from '@mui/material';
import type { ApiElement } from '@/types/api';

interface BasicPropertiesProps {
  element: ApiElement;
  onUpdateElement: (id: string, updates: Partial<ApiElement>) => void;
}

export const BasicProperties: React.FC<BasicPropertiesProps> = ({
  element,
  onUpdateElement,
}) => {
  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateElement(element.id, { label: e.target.value });
  };

  const handleRequiredChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateElement(element.id, { isRequired: e.target.checked });
  };

  return (
    <>
      <TextField
        label="Label"
        value={element.label}
        onChange={handleLabelChange}
        variant="outlined"
        size="small"
        margin="dense"
        fullWidth
        InputLabelProps={{ style: { fontSize: '0.85rem' } }}
        inputProps={{ style: { fontSize: '0.85rem' } }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={element.isRequired ?? false}
            onChange={handleRequiredChange}
            size="small"
          />
        }
        label="Required"
        sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.85rem' } }}
      />

      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ fontSize: '0.75rem' }}
      >
        Element Type: {element.type === 'text' ? 'Text Field' : 'Checkbox'}
      </Typography>
    </>
  );
};
