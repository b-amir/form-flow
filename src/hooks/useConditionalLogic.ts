import { useCallback } from 'react';
import type { Element, ConditionalLogic } from '@/types';
import {
  getAvailableCheckboxes,
  createDefaultConditionalLogic,
  hasAvailableCheckboxes,
} from '@/utils/conditionalHelpers';

export const useConditionalLogic = (
  element: Element,
  allElements: Element[],
  onUpdateConditionalLogic: (
    conditionalLogic: ConditionalLogic | undefined
  ) => void
) => {
  const checkboxElements = getAvailableCheckboxes(allElements, element.id);
  const hasCheckboxes = hasAvailableCheckboxes(allElements, element.id);

  const enableConditionalLogic = useCallback(
    (enabled: boolean) => {
      if (enabled && checkboxElements[0]) {
        onUpdateConditionalLogic(
          createDefaultConditionalLogic(checkboxElements[0].id)
        );
      } else {
        onUpdateConditionalLogic(undefined);
      }
    },
    [checkboxElements, onUpdateConditionalLogic]
  );

  const updateOperator = useCallback(
    (operator: 'AND' | 'OR') => {
      if (element.conditionalLogic) {
        onUpdateConditionalLogic({
          ...element.conditionalLogic,
          operator,
        });
      }
    },
    [element.conditionalLogic, onUpdateConditionalLogic]
  );

  return {
    checkboxElements,
    hasCheckboxes,
    enableConditionalLogic,
    updateOperator,
  };
};
