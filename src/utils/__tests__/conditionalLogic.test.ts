import { describe, it, expect } from 'vitest';
import {
  evaluateConditionalLogic,
  shouldShowElement,
  conditionalLogicHelpers,
} from '../conditionalLogic';
import type { ConditionalLogic, Element, FormValues } from '@/types';

describe('conditionalLogic', () => {
  describe('evaluateConditionalLogic', () => {
    it('should return true when checkbox is checked and showWhen is true', () => {
      const conditionalLogic: ConditionalLogic = {
        operator: 'AND',
        rules: [{ dependsOn: 'checkbox1', showWhen: true }],
      };
      const formValues: FormValues = {
        checkbox1: true,
      };

      const result = evaluateConditionalLogic(conditionalLogic, formValues);
      expect(result).toBe(true);
    });

    it('should return false when checkbox is checked and showWhen is false', () => {
      const conditionalLogic: ConditionalLogic = {
        operator: 'AND',
        rules: [{ dependsOn: 'checkbox1', showWhen: false }],
      };
      const formValues: FormValues = {
        checkbox1: true,
      };

      const result = evaluateConditionalLogic(conditionalLogic, formValues);
      expect(result).toBe(false);
    });

    it('should return false when checkbox is unchecked and showWhen is true', () => {
      const conditionalLogic: ConditionalLogic = {
        operator: 'AND',
        rules: [{ dependsOn: 'checkbox1', showWhen: true }],
      };
      const formValues: FormValues = {
        checkbox1: false,
      };

      const result = evaluateConditionalLogic(conditionalLogic, formValues);
      expect(result).toBe(false);
    });

    it('should return true when checkbox is unchecked and showWhen is false', () => {
      const conditionalLogic: ConditionalLogic = {
        operator: 'AND',
        rules: [{ dependsOn: 'checkbox1', showWhen: false }],
      };
      const formValues: FormValues = {
        checkbox1: false,
      };

      const result = evaluateConditionalLogic(conditionalLogic, formValues);
      expect(result).toBe(true);
    });

    it('should handle missing field values as false', () => {
      const conditionalLogic: ConditionalLogic = {
        operator: 'AND',
        rules: [{ dependsOn: 'nonexistent', showWhen: true }],
      };
      const formValues: FormValues = {};

      const result = evaluateConditionalLogic(conditionalLogic, formValues);
      expect(result).toBe(false);
    });

    it('should handle string values as false for checkbox logic', () => {
      const conditionalLogic: ConditionalLogic = {
        operator: 'AND',
        rules: [{ dependsOn: 'textField', showWhen: true }],
      };
      const formValues: FormValues = {
        textField: 'some text',
      };

      const result = evaluateConditionalLogic(conditionalLogic, formValues);
      expect(result).toBe(false);
    });

    it('should handle AND operator with multiple rules - all true', () => {
      const conditionalLogic: ConditionalLogic = {
        operator: 'AND',
        rules: [
          { dependsOn: 'checkbox1', showWhen: true },
          { dependsOn: 'checkbox2', showWhen: false },
        ],
      };
      const formValues: FormValues = {
        checkbox1: true,
        checkbox2: false,
      };

      const result = evaluateConditionalLogic(conditionalLogic, formValues);
      expect(result).toBe(true);
    });

    it('should handle AND operator with multiple rules - some false', () => {
      const conditionalLogic: ConditionalLogic = {
        operator: 'AND',
        rules: [
          { dependsOn: 'checkbox1', showWhen: true },
          { dependsOn: 'checkbox2', showWhen: true },
        ],
      };
      const formValues: FormValues = {
        checkbox1: true,
        checkbox2: false,
      };

      const result = evaluateConditionalLogic(conditionalLogic, formValues);
      expect(result).toBe(false);
    });

    it('should handle OR operator with multiple rules - some true', () => {
      const conditionalLogic: ConditionalLogic = {
        operator: 'OR',
        rules: [
          { dependsOn: 'checkbox1', showWhen: true },
          { dependsOn: 'checkbox2', showWhen: true },
        ],
      };
      const formValues: FormValues = {
        checkbox1: true,
        checkbox2: false,
      };

      const result = evaluateConditionalLogic(conditionalLogic, formValues);
      expect(result).toBe(true);
    });

    it('should handle OR operator with multiple rules - all false', () => {
      const conditionalLogic: ConditionalLogic = {
        operator: 'OR',
        rules: [
          { dependsOn: 'checkbox1', showWhen: true },
          { dependsOn: 'checkbox2', showWhen: true },
        ],
      };
      const formValues: FormValues = {
        checkbox1: false,
        checkbox2: false,
      };

      const result = evaluateConditionalLogic(conditionalLogic, formValues);
      expect(result).toBe(false);
    });

    it('should default to AND operator when not specified', () => {
      const conditionalLogic: ConditionalLogic = {
        rules: [
          { dependsOn: 'checkbox1', showWhen: true },
          { dependsOn: 'checkbox2', showWhen: true },
        ],
      };
      const formValues: FormValues = {
        checkbox1: true,
        checkbox2: false,
      };

      const result = evaluateConditionalLogic(conditionalLogic, formValues);
      expect(result).toBe(false);
    });

    it('should return true for empty rules array', () => {
      const conditionalLogic: ConditionalLogic = {
        operator: 'AND',
        rules: [],
      };
      const formValues: FormValues = {};

      const result = evaluateConditionalLogic(conditionalLogic, formValues);
      expect(result).toBe(true);
    });
  });

  describe('shouldShowElement', () => {
    it('should return true for elements without conditional logic', () => {
      const element: Element = {
        id: 'element1',
        type: 'text',
        label: 'Test Element',
      };
      const formValues: FormValues = {};

      const result = shouldShowElement(element, formValues);
      expect(result).toBe(true);
    });

    it('should evaluate conditional logic when present', () => {
      const element: Element = {
        id: 'element1',
        type: 'text',
        label: 'Test Element',
        conditionalLogic: {
          operator: 'AND',
          rules: [{ dependsOn: 'checkbox1', showWhen: true }],
        },
      };
      const formValues: FormValues = {
        checkbox1: true,
      };

      const result = shouldShowElement(element, formValues);
      expect(result).toBe(true);
    });

    it('should hide element when conditional logic evaluates to false', () => {
      const element: Element = {
        id: 'element1',
        type: 'text',
        label: 'Test Element',
        conditionalLogic: {
          operator: 'AND',
          rules: [{ dependsOn: 'checkbox1', showWhen: true }],
        },
      };
      const formValues: FormValues = {
        checkbox1: false,
      };

      const result = shouldShowElement(element, formValues);
      expect(result).toBe(false);
    });
  });

  describe('conditionalLogicHelpers', () => {
    it('should export all helper functions', () => {
      expect(conditionalLogicHelpers.evaluateConditionalLogic).toBe(
        evaluateConditionalLogic
      );
      expect(conditionalLogicHelpers.shouldShowElement).toBe(shouldShowElement);
    });
  });

  describe('complex scenarios', () => {
    it('should handle multiple checkboxes with different states', () => {
      const formValues: FormValues = {
        checkbox1: true,
        checkbox2: false,
        checkbox3: true,
      };

      const element1: Element = {
        id: 'element1',
        type: 'text',
        label: 'Element 1',
        conditionalLogic: {
          operator: 'AND',
          rules: [{ dependsOn: 'checkbox1', showWhen: true }],
        },
      };

      const element2: Element = {
        id: 'element2',
        type: 'text',
        label: 'Element 2',
        conditionalLogic: {
          operator: 'AND',
          rules: [{ dependsOn: 'checkbox2', showWhen: false }],
        },
      };

      const element3: Element = {
        id: 'element3',
        type: 'text',
        label: 'Element 3',
        conditionalLogic: {
          operator: 'AND',
          rules: [{ dependsOn: 'checkbox3', showWhen: false }],
        },
      };

      expect(shouldShowElement(element1, formValues)).toBe(true);
      expect(shouldShowElement(element2, formValues)).toBe(true);
      expect(shouldShowElement(element3, formValues)).toBe(false);
    });

    it('should handle form with mixed element types', () => {
      const formValues: FormValues = {
        checkbox1: true,
        textField1: 'some value',
      };

      const textElement: Element = {
        id: 'text1',
        type: 'text',
        label: 'Text Element',
        conditionalLogic: {
          operator: 'AND',
          rules: [{ dependsOn: 'checkbox1', showWhen: true }],
        },
      };

      const checkboxElement: Element = {
        id: 'checkbox2',
        type: 'checkbox',
        label: 'Checkbox Element',
        conditionalLogic: {
          operator: 'AND',
          rules: [{ dependsOn: 'checkbox1', showWhen: false }],
        },
      };

      expect(shouldShowElement(textElement, formValues)).toBe(true);
      expect(shouldShowElement(checkboxElement, formValues)).toBe(false);
    });

    it('should handle complex AND/OR combinations', () => {
      const formValues: FormValues = {
        checkbox1: true,
        checkbox2: false,
        checkbox3: true,
      };

      const andElement: Element = {
        id: 'and-element',
        type: 'text',
        label: 'AND Element',
        conditionalLogic: {
          operator: 'AND',
          rules: [
            { dependsOn: 'checkbox1', showWhen: true },
            { dependsOn: 'checkbox2', showWhen: false },
          ],
        },
      };

      const orElement: Element = {
        id: 'or-element',
        type: 'text',
        label: 'OR Element',
        conditionalLogic: {
          operator: 'OR',
          rules: [
            { dependsOn: 'checkbox1', showWhen: true },
            { dependsOn: 'checkbox3', showWhen: true },
          ],
        },
      };

      expect(shouldShowElement(andElement, formValues)).toBe(true);
      expect(shouldShowElement(orElement, formValues)).toBe(true);
    });
  });
});
