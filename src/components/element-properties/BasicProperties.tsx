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
        fullWidth
      />

      <FormControlLabel
        control={
          <Switch
            checked={element.isRequired ?? false}
            onChange={handleRequiredChange}
          />
        }
        label="Required"
      />

      <Typography variant="caption" color="text.secondary">
        Element Type: {element.type === 'text' ? 'Text Field' : 'Checkbox'}
      </Typography>
    </>
  );
};
