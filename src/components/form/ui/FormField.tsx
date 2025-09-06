import React from 'react';
import { Controller, type Control } from 'react-hook-form';
import { FieldFactory } from '../../fields/FieldFactory';
import type { Element } from '@/types/form';

interface FormFieldProps {
  element: Element;
  control: Control<Record<string, unknown>>;
  errors: Record<string, { message?: string }>;
}

export const FormField: React.FC<FormFieldProps> = ({
  element,
  control,
  errors,
}) => {
  return (
    <Controller
      key={element.id}
      name={String(element.id)}
      control={control}
      render={({ field }) => (
        <FieldFactory
          element={{
            ...element,
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
  );
};
