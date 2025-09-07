import type { Element, FormValues } from '@/types';

export const getFieldValue = (
  element: Element,
  formValues: FormValues
): string | boolean => {
  const value = formValues[element.id];

  if (value == null) {
    return element.type === 'checkbox' ? false : '';
  }

  return element.type === 'checkbox' ? Boolean(value) : String(value);
};

export const getFieldError = (
  errors: Record<string, { message?: string }>,
  elementId: string
): string | undefined => {
  return errors[elementId]?.message;
};

export const hasElements = (elements: Element[]): boolean =>
  elements.length > 0;
