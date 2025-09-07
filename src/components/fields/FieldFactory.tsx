import React from 'react';
import { Controller, type Control } from 'react-hook-form';
import type { Element, TextElement, CheckboxElement } from '@/types';
import { TextInputField } from './TextInputField';
import { CheckboxField } from './CheckboxField';

interface FieldFactoryProps {
  element: Element;
  value: string | boolean;
  onChange: (value: string | boolean) => void;
  error?: string | undefined;
  control?: Control<Record<string, unknown>>;
}

export const FieldFactory: React.FC<FieldFactoryProps> = ({
  element,
  value,
  onChange,
  error,
  control,
}) => {
  if (control) {
    return (
      <Controller
        name={element.id}
        control={control}
        render={({ field, fieldState }) => {
          const fieldError = fieldState.error?.message || error;
          switch (element.type) {
            case 'text':
              return (
                <TextInputField
                  element={element as TextElement}
                  value={field.value != null ? String(field.value) : ''}
                  onChange={field.onChange}
                  error={fieldError}
                />
              );
            case 'checkbox':
              return (
                <CheckboxField
                  element={element as CheckboxElement}
                  value={field.value != null ? Boolean(field.value) : false}
                  onChange={field.onChange}
                  error={fieldError}
                />
              );
            default:
              return <div />;
          }
        }}
      />
    );
  }

  switch (element.type) {
    case 'text':
      return (
        <TextInputField
          element={element as TextElement}
          value={typeof value === 'string' ? value : ''}
          onChange={onChange as (val: string) => void}
          error={error}
        />
      );
    case 'checkbox':
      return (
        <CheckboxField
          element={element as CheckboxElement}
          value={typeof value === 'boolean' ? value : false}
          onChange={onChange as (val: boolean) => void}
          error={error}
        />
      );
    default:
      return null;
  }
};
