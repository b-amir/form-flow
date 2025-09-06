import React, { useState } from 'react';
import { useForm, type FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Paper } from '@mui/material';
import type { Form } from '@/types/form';
import {
  createValidationSchema,
  createDefaultValues,
} from '@/utils/formValidation';
import { FormField } from '../ui/FormField';
import { FormHeader } from '../ui/FormHeader';
import { FormButtons } from '../ui/FormButtons';

interface LoadingFormRendererProps {
  form: Form;
  onSubmit?: (data: FieldValues) => Promise<void> | void;
}

export const LoadingFormRenderer: React.FC<LoadingFormRendererProps> = ({
  form,
  onSubmit,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const validationSchema = createValidationSchema(form);
  type FormData = Record<string, unknown>;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: createDefaultValues(form),
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
      setIsClearing(true);
      setTimeout(() => {
        reset();
        setIsClearing(false);
      }, 500);
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <FormHeader title={form.name} />

      <Box
        component="form"
        onSubmit={handleSubmit(onFormSubmit)}
        sx={{ mt: 2 }}
      >
        {form.elements.map(element => (
          <FormField
            key={element.id}
            element={element}
            control={control}
            errors={errors as Record<string, { message?: string }>}
          />
        ))}

        <FormButtons
          onReset={handleReset}
          isSubmitting={isLoading}
          isClearing={isClearing}
        />
      </Box>
    </Paper>
  );
};
