import type {
  ConditionalLogic,
  ConditionalRule,
  Element,
  FormValues,
} from '@/types';

const DEFAULT_OPERATOR = 'AND' as const;
const COLLAPSE_TIMEOUT = 300;

const isFieldChecked = (fieldValue: unknown): boolean => fieldValue === true;

const evaluateRule = (
  rule: ConditionalRule,
  formValues: FormValues
): boolean => {
  const fieldValue = formValues[rule.dependsOn];
  return isFieldChecked(fieldValue) === rule.showWhen;
};

export const evaluateConditionalLogic = (
  conditionalLogic: ConditionalLogic,
  formValues: FormValues
): boolean => {
  const { operator = DEFAULT_OPERATOR, rules } = conditionalLogic;

  if (rules.length === 0) return true;

  const ruleResults = rules.map(rule => evaluateRule(rule, formValues));
  return operator === 'OR'
    ? ruleResults.some(Boolean)
    : ruleResults.every(Boolean);
};

export const shouldShowElement = (
  element: Element,
  formValues: FormValues
): boolean => {
  return (
    !element.conditionalLogic ||
    evaluateConditionalLogic(element.conditionalLogic, formValues)
  );
};

export const conditionalLogicHelpers = {
  evaluateConditionalLogic,
  shouldShowElement,
  isFieldChecked,
  DEFAULT_OPERATOR,
  COLLAPSE_TIMEOUT,
};
