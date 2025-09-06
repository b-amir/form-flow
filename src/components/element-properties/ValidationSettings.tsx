import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, TextField } from '@mui/material';
import type { ApiElement } from '@/types/api';
import type { TextElement } from '@/types/form';

interface ValidationSettingsProps {
  element: ApiElement;
  onUpdateElement: (id: string, updates: Partial<ApiElement>) => void;
}

const validationSchema = yup.object({
  minLength: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .min(0, 'Must be 0 or greater')
    .max(1000, 'Must be 1000 or less'),
  maxLength: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .min(0, 'Must be 0 or greater')
    .max(10000, 'Must be 10000 or less')
    .test(
      'min-max',
      'Max length must be greater than min length',
      function (value) {
        const { minLength } = this.parent;
        if (minLength && value && value <= minLength) {
          return this.createError({
            message: 'Must be greater than min length',
          });
        }
        return true;
      }
    ),
});

export const ValidationSettings: React.FC<ValidationSettingsProps> = ({
  element,
  onUpdateElement,
}) => {
  const textElement = element as TextElement;
  const validation = textElement.validation || {};

  const { control } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      minLength: validation.minLength || null,
      maxLength: validation.maxLength || null,
    },
    mode: 'onChange',
  });

  if (element.type !== 'text') {
    return null;
  }

  const handleValidationChange = (
    field: 'minLength' | 'maxLength',
    value: number | null
  ) => {
    const newValidation = { ...validation };

    if (value === null || value === undefined) {
      delete newValidation[field];
    } else {
      newValidation[field] = value;
    }

    onUpdateElement(element.id, {
      validation: newValidation,
    } as unknown as Partial<ApiElement>);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <Controller
        name="minLength"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            label="Minimum Length"
            type="number"
            InputProps={{
              inputProps: { min: 0, style: { fontSize: '0.85rem' } },
            }}
            value={field.value || ''}
            onChange={e => {
              const value =
                e.target.value === '' ? null : Number(e.target.value);
              field.onChange(value);
              handleValidationChange('minLength', value);
            }}
            variant="outlined"
            size="small"
            margin="dense"
            fullWidth
            error={!!fieldState.error}
            helperText={fieldState.error?.message || 'Min number of chars'}
            InputLabelProps={{ style: { fontSize: '0.85rem' } }}
            FormHelperTextProps={{
              style: { fontSize: '0.75rem', marginTop: '2px' },
            }}
          />
        )}
      />
      <Controller
        name="maxLength"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            label="Maximum Length"
            type="number"
            InputProps={{
              inputProps: { min: 0, style: { fontSize: '0.85rem' } },
            }}
            value={field.value || ''}
            onChange={e => {
              const value =
                e.target.value === '' ? null : Number(e.target.value);
              field.onChange(value);
              handleValidationChange('maxLength', value);
            }}
            variant="outlined"
            size="small"
            margin="dense"
            fullWidth
            error={!!fieldState.error}
            helperText={fieldState.error?.message || 'Max number of chars'}
            InputLabelProps={{ style: { fontSize: '0.85rem' } }}
            FormHelperTextProps={{
              style: { fontSize: '0.75rem', marginTop: '2px' },
            }}
          />
        )}
      />
    </Box>
  );
};
