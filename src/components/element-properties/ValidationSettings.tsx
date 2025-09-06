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
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <TextField
        label="Minimum Length"
        type="number"
        InputProps={{ inputProps: { min: 0, style: { fontSize: '0.85rem' } } }}
        value={validation.minLength ?? ''}
        onChange={handleMinLengthChange}
        variant="outlined"
        size="small"
        margin="dense"
        fullWidth
        InputLabelProps={{ style: { fontSize: '0.85rem' } }}
        FormHelperTextProps={{
          style: { fontSize: '0.75rem', marginTop: '2px' },
        }}
        helperText="Min number of chars"
      />
      <TextField
        label="Maximum Length"
        type="number"
        InputProps={{ inputProps: { min: 0, style: { fontSize: '0.85rem' } } }}
        value={validation.maxLength ?? ''}
        onChange={handleMaxLengthChange}
        variant="outlined"
        size="small"
        margin="dense"
        fullWidth
        InputLabelProps={{ style: { fontSize: '0.85rem' } }}
        FormHelperTextProps={{
          style: { fontSize: '0.75rem', marginTop: '2px' },
        }}
        helperText="Max number of chars"
      />
    </Box>
  );
};
