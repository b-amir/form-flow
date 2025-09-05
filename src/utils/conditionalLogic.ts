import type { ConditionalLogic, ApiElement } from '@/types/api';

export interface FormValues {
  [fieldId: string]: boolean | string;
}

export function evaluateConditionalLogic(
  conditionalLogic: ConditionalLogic,
  formValues: FormValues
): boolean {
  const fieldValue = formValues[conditionalLogic.dependsOn];
  const isChecked = fieldValue === true;

  return isChecked === conditionalLogic.showWhen;
}

export function shouldShowElement(
  element: ApiElement,
  formValues: FormValues
): boolean {
  if (!element.conditionalLogic) {
    return true;
  }

  return evaluateConditionalLogic(element.conditionalLogic, formValues);
}

export const conditionalLogicHelpers = {
  evaluateConditionalLogic,
  shouldShowElement,
};
