import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Collapse, Typography } from '@mui/material';
import type { Form } from '@/types';
import { FormHeader } from '@components/form/ui/FormHeader';
import { FormButtons } from '@components/form/ui/FormButtons';
import { conditionalLogicHelpers } from '@/utils/conditionalLogic';
import { getFieldValue, hasElements } from '@/utils/formHelpers';
import { useFormVisibility } from '@/hooks/useFormVisibility';
import { FieldFactory } from '@components/fields/FieldFactory';
import {
  createValidationSchema,
  createDefaultValues,
} from '@/utils/formValidation';

interface FormRendererProps {
  form: Form;
  onSubmit?: (data: Record<string, unknown>) => void;
}

export const FormRenderer: React.FC<FormRendererProps> = ({
  form,
  onSubmit,
}) => {
  const validationSchema = createValidationSchema(form);
  const defaultValues = createDefaultValues(form);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const formValues = watch();
  const elementVisibility = useFormVisibility(form.elements, formValues);

  useEffect(() => {
    reset(createDefaultValues(form));
  }, [form, reset]);

  const onFormSubmit = (data: Record<string, unknown>) => {
    onSubmit?.(data as Record<string, string | boolean>);
  };

  const handleReset = () => {
    reset(createDefaultValues(form));
  };

  if (!hasElements(form.elements)) {
    return (
      <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
        <FormHeader title={form.name} />
        <Typography>No form elements to display</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <FormHeader title={form.name} />

      <Box
        component="form"
        onSubmit={handleSubmit(onFormSubmit)}
        sx={{ mt: 2 }}
      >
        {form.elements.map(element => {
          const shouldShow = elementVisibility.get(element.id) ?? true;
          const fieldError = errors[element.id]?.message;

          return (
            <Collapse
              key={element.id}
              in={shouldShow}
              timeout={conditionalLogicHelpers.COLLAPSE_TIMEOUT}
            >
              <FieldFactory
                element={element}
                value={getFieldValue(element, formValues)}
                onChange={() => {}}
                error={fieldError}
                control={control}
              />
            </Collapse>
          );
        })}

        <FormButtons onReset={handleReset} />
      </Box>
    </Box>
  );
};
