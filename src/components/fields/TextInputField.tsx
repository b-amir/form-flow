import React from 'react';
import { TextField } from '@mui/material';
import type { TextElement } from '@/types/form';

interface TextInputFieldProps {
  element: TextElement;
  value: string;
  onChange: (value: string) => void;
  error?: string | undefined;
}

export const TextInputField: React.FC<TextInputFieldProps> = ({
  element,
  value,
  onChange,
  error,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const validation = element.validation;
  const currentLength = value?.length || 0;

  let helperText = error;
  if (!error && validation) {
    const hints = [];
    if (validation.minLength) {
      hints.push(`Min: ${validation.minLength} chars`);
    }
    if (validation.maxLength) {
      hints.push(`Max: ${validation.maxLength} chars`);
    }
    if (validation.maxLength) {
      hints.push(`${currentLength}/${validation.maxLength}`);
    }
    if (hints.length > 0) {
      helperText = hints.join(' • ');
    }
  }

  return (
    <TextField
      id={element.id}
      label={element.label}
      value={value}
      onChange={handleChange}
      required={element.isRequired ?? false}
      error={!!error}
      helperText={helperText}
      fullWidth
      variant="outlined"
      margin="normal"
      inputProps={{
        minLength: validation?.minLength,
        maxLength: validation?.maxLength,
      }}
    />
  );
};
