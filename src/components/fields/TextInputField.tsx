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

  return (
    <TextField
      id={element.id}
      label={element.label}
      value={value}
      onChange={handleChange}
      required={element.isRequired ?? false}
      error={!!error}
      helperText={error}
      fullWidth
      variant="outlined"
      margin="normal"
    />
  );
};
