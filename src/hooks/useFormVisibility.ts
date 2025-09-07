import { useMemo } from 'react';
import type { Element, FormValues } from '@/types';
import { shouldShowElement } from '@/utils/conditionalLogic';

export const useFormVisibility = (
  elements: Element[],
  formValues: FormValues
) => {
  return useMemo(() => {
    const visibility = new Map<string, boolean>();
    elements.forEach(element => {
      visibility.set(element.id, shouldShowElement(element, formValues));
    });
    return visibility;
  }, [elements, formValues]);
};
