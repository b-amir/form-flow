import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import type { Form } from '@/types/form';
import type { ApiElement } from '@/types/api';
import { FieldFactory } from './FieldFactory';
import { shouldShowElement, type FormValues } from '@/utils/conditionalLogic';

interface FormRendererProps {
  form: Form;
}

export const FormRenderer: React.FC<FormRendererProps> = ({ form }) => {
  const [formValues, setFormValues] = useState<FormValues>(() => {
    const initialValues: FormValues = {};
    form.elements.forEach(element => {
      initialValues[element.id] = element.type === 'checkbox' ? false : '';
    });
    return initialValues;
  });

  const handleFieldChange = (fieldId: string, value: boolean | string) => {
    setFormValues(prev => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {form.name}
      </Typography>

      <Box component="form" sx={{ mt: 2 }}>
        {form.elements.map(element => {
          const apiElement = element as ApiElement;
          const isVisible = shouldShowElement(apiElement, formValues);

          if (!isVisible) {
            return null;
          }

          return (
            <FieldFactory
              key={element.id}
              element={element}
              value={
                formValues[element.id] ||
                (element.type === 'checkbox' ? false : '')
              }
              onChange={value => handleFieldChange(element.id, value)}
            />
          );
        })}
      </Box>
    </Box>
  );
};
