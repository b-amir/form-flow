import React from 'react';
import {
  FormControlLabel,
  Checkbox,
  FormControl,
  FormHelperText,
} from '@mui/material';
import type { CheckboxElement } from '@/types/form';

interface CheckboxFieldProps {
  element: CheckboxElement;
  value: boolean;
  onChange: (value: boolean) => void;
  error?: string | undefined;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  element,
  value,
  onChange,
  error,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <FormControl error={!!error} margin="normal">
      <FormControlLabel
        control={
          <Checkbox
            id={element.id}
            checked={value}
            onChange={handleChange}
            required={element.isRequired ?? false}
          />
        }
        label={element.label}
      />
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};
