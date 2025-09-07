import type { Element, ConditionalLogic, ConditionalRule } from '@/types';
import { conditionalLogicHelpers } from './conditionalLogic';

export const getAvailableCheckboxes = (
  allElements: Element[],
  currentElementId: string
): Element[] =>
  allElements.filter(
    el => el.type === 'checkbox' && el.id !== currentElementId
  );

export const createDefaultRule = (checkboxId: string): ConditionalRule => ({
  dependsOn: checkboxId,
  showWhen: true,
});

export const createDefaultConditionalLogic = (
  checkboxId: string
): ConditionalLogic => ({
  operator: conditionalLogicHelpers.DEFAULT_OPERATOR,
  rules: [createDefaultRule(checkboxId)],
});

export const hasAvailableCheckboxes = (
  elements: Element[],
  currentElementId: string
): boolean => getAvailableCheckboxes(elements, currentElementId).length > 0;
