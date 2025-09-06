import React from 'react';
import { useForm, type FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import type { Form } from '@/types/form';
import {
  createValidationSchema,
  createDefaultValues,
} from '@/utils/formValidation';
import { FormField } from './form/FormField';
import { FormHeader } from './form/FormHeader';
import { FormButtons } from './form/FormButtons';
import { EmptyIndicator } from './EmptyIndicator';

interface ValidatedFormRendererProps {
  form: Form;
  onSubmit?: (data: FieldValues) => void;
}

export const ValidatedFormRenderer: React.FC<ValidatedFormRendererProps> = ({
  form,
  onSubmit,
}) => {
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

  const onFormSubmit = (data: FormData) => {
    onSubmit?.(data);
  };

  const handleReset = () => {
    reset();
  };

  const hasElements = form.elements.length > 0;

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto', height: '100%' }}>
      <FormHeader title={form.name} />

      {hasElements ? (
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

          <FormButtons onReset={handleReset} />
        </Box>
      ) : (
        <EmptyIndicator
          message="Nothing to preview"
          subtitle="Add elements to start building your form"
        />
      )}
    </Box>
  );
};
