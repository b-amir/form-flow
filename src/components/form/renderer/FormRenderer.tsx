import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Collapse } from '@mui/material';
import type { Form } from '@/types/form';
import type { ApiElement } from '@/types/api';
import { FormHeader } from '../ui/FormHeader';
import { FormButtons } from '../ui/FormButtons';
import { shouldShowElement } from '@/utils/conditionalLogic';
import { FieldFactory } from '../../fields/FieldFactory';
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

  useEffect(() => {
    reset(createDefaultValues(form));
  }, [form, reset]);

  const onFormSubmit = (data: Record<string, unknown>) => {
    if (onSubmit) {
      onSubmit(data as Record<string, string | boolean>);
    }
  };

  const handleReset = () => {
    reset(createDefaultValues(form));
  };

  const hasElements = form.elements.length > 0;

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <FormHeader title={form.name} />

      {hasElements && (
        <Box
          component="form"
          onSubmit={handleSubmit(onFormSubmit)}
          sx={{ mt: 2 }}
        >
          {form.elements.map(element => {
            const shouldShow =
              'conditionalLogic' in element
                ? shouldShowElement(
                    element as ApiElement,
                    formValues as { [fieldId: string]: boolean | string }
                  )
                : true;

            const fieldError = errors[element.id]?.message;

            return (
              <Collapse key={element.id} in={shouldShow} timeout={300}>
                <FieldFactory
                  element={element}
                  value={
                    formValues[element.id] != null
                      ? element.type === 'checkbox'
                        ? Boolean(formValues[element.id])
                        : String(formValues[element.id])
                      : element.type === 'checkbox'
                        ? false
                        : ''
                  }
                  onChange={() => {}}
                  error={fieldError}
                  control={control}
                />
              </Collapse>
            );
          })}

          <FormButtons onReset={handleReset} />
        </Box>
      )}
    </Box>
  );
};
