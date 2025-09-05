import React from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Switch,
} from '@mui/material';
import type { ApiElement } from '@/types/api';

interface ElementPropertiesEditorProps {
  element: ApiElement | null;
  onUpdateElement: (id: string, updates: Partial<ApiElement>) => void;
}

export const ElementPropertiesEditor: React.FC<
  ElementPropertiesEditorProps
> = ({ element, onUpdateElement }) => {
  if (!element) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h6" gutterBottom>
          Element Properties
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Select an element to edit its properties
        </Typography>
      </Box>
    );
  }

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateElement(element.id, { label: e.target.value });
  };

  const handleRequiredChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateElement(element.id, { isRequired: e.target.checked });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6" gutterBottom>
        Element Properties
      </Typography>

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
    </Box>
  );
};
