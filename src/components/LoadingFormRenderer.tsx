import React, { useState } from 'react';
import { useForm, Controller, type FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
} from '@mui/material';
import type { Form } from '@/types/form';
import { FieldFactory } from './FieldFactory';

type ValidationSchema = Record<string, yup.AnySchema>;

interface LoadingFormRendererProps {
  form: Form;
  onSubmit?: (data: FieldValues) => Promise<void> | void;
}

function createValidationSchema(
  form: Form
): yup.ObjectSchema<Record<string, unknown>> {
  const schemaFields = form.elements.reduce<ValidationSchema>(
    (acc, element) => {
      let fieldSchema: yup.AnySchema;

      switch (element.type) {
        case 'text':
          fieldSchema = yup.string();
          break;
        case 'checkbox':
          fieldSchema = yup.boolean();
          break;
        default:
          fieldSchema = yup.mixed();
          break;
      }

      if (element.isRequired) {
        fieldSchema = fieldSchema.required(`${element.label} is required`);
      }

      acc[element.id] = fieldSchema;
      return acc;
    },
    {}
  );

  return yup.object().shape(schemaFields);
}

export const LoadingFormRenderer: React.FC<LoadingFormRendererProps> = ({
  form,
  onSubmit,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const validationSchema = createValidationSchema(form);
  type FormData = yup.InferType<typeof validationSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: form.elements.reduce(
      (acc, element) => ({
        ...acc,
        [element.id]: element.type === 'checkbox' ? false : '',
      }),
      {} as FormData
    ),
  });

  const onFormSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      await onSubmit?.(data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    if (!isLoading) {
      reset();
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {form.name}
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onFormSubmit)}
        sx={{ mt: 2 }}
      >
        {form.elements.map(element => (
          <Controller
            key={element.id}
            name={element.id}
            control={control}
            render={({ field }) => (
              <FieldFactory
                element={{
                  ...element,
                  label: element.isRequired
                    ? `${element.label} *`
                    : element.label,
                }}
                value={
                  element.type === 'checkbox'
                    ? Boolean(field.value)
                    : typeof field.value === 'string'
                      ? field.value
                      : ''
                }
                onChange={field.onChange}
                error={
                  typeof errors[element.id]?.message === 'string'
                    ? errors[element.id]?.message
                    : undefined
                }
              />
            )}
          />
        ))}

        <Box sx={{ mt: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} /> : null}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </Button>
          <Button
            type="button"
            variant="outlined"
            onClick={handleReset}
            disabled={isLoading}
          >
            Reset
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};
