import type { ConditionalLogic, ConditionalRule, ApiElement } from '@/types';

export interface FormValues {
  [fieldId: string]: boolean | string;
}

function evaluateRule(rule: ConditionalRule, formValues: FormValues): boolean {
  const fieldValue = formValues[rule.dependsOn];
  const isChecked = fieldValue === true;
  return isChecked === rule.showWhen;
}

export function evaluateConditionalLogic(
  conditionalLogic: ConditionalLogic,
  formValues: FormValues
): boolean {
  const { operator = 'AND', rules } = conditionalLogic;

  if (rules.length === 0) {
    return true;
  }

  if (operator === 'OR') {
    return rules.some(rule => evaluateRule(rule, formValues));
  } else {
    return rules.every(rule => evaluateRule(rule, formValues));
  }
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
