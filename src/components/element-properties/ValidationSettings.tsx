import React from 'react';
import { Box, TextField } from '@mui/material';
import type { ApiElement } from '@/types/api';
import type { TextElement } from '@/types/form';

interface ValidationSettingsProps {
  element: ApiElement;
  onUpdateElement: (id: string, updates: Partial<ApiElement>) => void;
}

export const ValidationSettings: React.FC<ValidationSettingsProps> = ({
  element,
  onUpdateElement,
}) => {
  if (element.type !== 'text') {
    return null;
  }

  const handleMinLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const minLength =
      e.target.value === '' ? undefined : Number(e.target.value);
    const textElement = element as TextElement;
    const validation = { ...(textElement.validation || {}) };

    if (minLength === undefined) {
      delete validation.minLength;
    } else {
      validation.minLength = minLength;
    }

    onUpdateElement(element.id, {
      validation,
    } as unknown as Partial<ApiElement>);
  };

  const handleMaxLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxLength =
      e.target.value === '' ? undefined : Number(e.target.value);
    const textElement = element as TextElement;
    const validation = { ...(textElement.validation || {}) };

    if (maxLength === undefined) {
      delete validation.maxLength;
    } else {
      validation.maxLength = maxLength;
    }

    onUpdateElement(element.id, {
      validation,
    } as unknown as Partial<ApiElement>);
  };

  const textElement = element as TextElement;
  const validation = textElement.validation || {};

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Minimum Length"
        type="number"
        InputProps={{ inputProps: { min: 0 } }}
        value={validation.minLength ?? ''}
        onChange={handleMinLengthChange}
        variant="outlined"
        size="small"
        fullWidth
        helperText="Minimum number of characters required"
      />
      <TextField
        label="Maximum Length"
        type="number"
        InputProps={{ inputProps: { min: 0 } }}
        value={validation.maxLength ?? ''}
        onChange={handleMaxLengthChange}
        variant="outlined"
        size="small"
        fullWidth
        helperText="Maximum number of characters allowed"
      />
    </Box>
  );
};
