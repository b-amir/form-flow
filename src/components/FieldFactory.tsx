import React from 'react';
import type { Element } from '@/types/form';
import { TextInputField } from './TextInputField';
import { CheckboxField } from './CheckboxField';

interface FieldFactoryProps {
  element: Element;
  value: string | boolean;
  onChange: (value: string | boolean) => void;
  error?: string | undefined;
}

export const FieldFactory: React.FC<FieldFactoryProps> = ({
  element,
  value,
  onChange,
  error,
}) => {
  switch (element.type) {
    case 'text':
      return (
        <TextInputField
          element={element}
          value={typeof value === 'string' ? value : ''}
          onChange={onChange as (val: string) => void}
          error={error}
        />
      );
    case 'checkbox':
      return (
        <CheckboxField
          element={element}
          value={typeof value === 'boolean' ? value : false}
          onChange={onChange as (val: boolean) => void}
          error={error}
        />
      );
    default:
      return null;
  }
};
