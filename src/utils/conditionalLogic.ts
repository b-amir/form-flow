import type {
  ConditionalLogic,
  ConditionalRule,
  Element,
  FormValues,
} from '@/types';

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
  element: Element,
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
