import React, { useState } from 'react';
import { Box, Collapse } from '@mui/material';
import type { Form } from '@/types/form';
import type { ApiElement } from '@/types/api';
import { FormHeader } from '../ui/FormHeader';
import { FormButtons } from '../ui/FormButtons';
import { shouldShowElement } from '@/utils/conditionalLogic';
import { FieldFactory } from '../../fields/FieldFactory';

interface FormRendererProps {
  form: Form;
  onSubmit?: (data: Record<string, string | boolean>) => void;
}

export const FormRenderer: React.FC<FormRendererProps> = ({
  form,
  onSubmit,
}) => {
  const [formValues, setFormValues] = useState<
    Record<string, string | boolean>
  >({});

  const handleFieldChange = (fieldId: string, value: string | boolean) => {
    setFormValues(prev => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formValues);
    }
  };

  const handleReset = () => {
    setFormValues({});
  };

  const hasElements = form.elements.length > 0;

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <FormHeader title={form.name} />

      {hasElements && (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          {form.elements.map(element => {
            const shouldShow =
              'conditionalLogic' in element
                ? shouldShowElement(
                    element as ApiElement,
                    formValues as { [fieldId: string]: boolean | string }
                  )
                : true;

            return (
              <Collapse key={element.id} in={shouldShow} timeout={300}>
                <FieldFactory
                  element={element}
                  value={
                    formValues[element.id] ??
                    (element.type === 'checkbox' ? false : '')
                  }
                  onChange={(value: string | boolean) =>
                    handleFieldChange(element.id, value)
                  }
                  error={undefined}
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
