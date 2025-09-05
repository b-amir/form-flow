import { describe, it, expect } from 'vitest';
import {
  evaluateConditionalLogic,
  shouldShowElement,
  conditionalLogicHelpers,
  type FormValues,
} from '../conditionalLogic';
import type { ConditionalLogic, ApiElement } from '@/types/api';

describe('conditionalLogic', () => {
  describe('evaluateConditionalLogic', () => {
    it('should return true when checkbox is checked and showWhen is true', () => {
      const conditionalLogic: ConditionalLogic = {
        dependsOn: 'checkbox1',
        showWhen: true,
      };
      const formValues: FormValues = {
        checkbox1: true,
      };

      const result = evaluateConditionalLogic(conditionalLogic, formValues);
      expect(result).toBe(true);
    });

    it('should return false when checkbox is checked and showWhen is false', () => {
      const conditionalLogic: ConditionalLogic = {
        dependsOn: 'checkbox1',
        showWhen: false,
      };
      const formValues: FormValues = {
        checkbox1: true,
      };

      const result = evaluateConditionalLogic(conditionalLogic, formValues);
      expect(result).toBe(false);
    });

    it('should return false when checkbox is unchecked and showWhen is true', () => {
      const conditionalLogic: ConditionalLogic = {
        dependsOn: 'checkbox1',
        showWhen: true,
      };
      const formValues: FormValues = {
        checkbox1: false,
      };

      const result = evaluateConditionalLogic(conditionalLogic, formValues);
      expect(result).toBe(false);
    });

    it('should return true when checkbox is unchecked and showWhen is false', () => {
      const conditionalLogic: ConditionalLogic = {
        dependsOn: 'checkbox1',
        showWhen: false,
      };
      const formValues: FormValues = {
        checkbox1: false,
      };

      const result = evaluateConditionalLogic(conditionalLogic, formValues);
      expect(result).toBe(true);
    });

    it('should handle missing field values as false', () => {
      const conditionalLogic: ConditionalLogic = {
        dependsOn: 'nonexistent',
        showWhen: true,
      };
      const formValues: FormValues = {};

      const result = evaluateConditionalLogic(conditionalLogic, formValues);
      expect(result).toBe(false);
    });

    it('should handle string values as false for checkbox logic', () => {
      const conditionalLogic: ConditionalLogic = {
        dependsOn: 'textField',
        showWhen: true,
      };
      const formValues: FormValues = {
        textField: 'some text',
      };

      const result = evaluateConditionalLogic(conditionalLogic, formValues);
      expect(result).toBe(false);
    });
  });

  describe('shouldShowElement', () => {
    it('should return true for elements without conditional logic', () => {
      const element: ApiElement = {
        id: 'element1',
        type: 'text',
        label: 'Test Element',
      };
      const formValues: FormValues = {};

      const result = shouldShowElement(element, formValues);
      expect(result).toBe(true);
    });

    it('should evaluate conditional logic when present', () => {
      const element: ApiElement = {
        id: 'element1',
        type: 'text',
        label: 'Test Element',
        conditionalLogic: {
          dependsOn: 'checkbox1',
          showWhen: true,
        },
      };
      const formValues: FormValues = {
        checkbox1: true,
      };

      const result = shouldShowElement(element, formValues);
      expect(result).toBe(true);
    });

    it('should hide element when conditional logic evaluates to false', () => {
      const element: ApiElement = {
        id: 'element1',
        type: 'text',
        label: 'Test Element',
        conditionalLogic: {
          dependsOn: 'checkbox1',
          showWhen: true,
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

      const element1: ApiElement = {
        id: 'element1',
        type: 'text',
        label: 'Element 1',
        conditionalLogic: {
          dependsOn: 'checkbox1',
          showWhen: true,
        },
      };

      const element2: ApiElement = {
        id: 'element2',
        type: 'text',
        label: 'Element 2',
        conditionalLogic: {
          dependsOn: 'checkbox2',
          showWhen: false,
        },
      };

      const element3: ApiElement = {
        id: 'element3',
        type: 'text',
        label: 'Element 3',
        conditionalLogic: {
          dependsOn: 'checkbox3',
          showWhen: false,
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

      const textElement: ApiElement = {
        id: 'text1',
        type: 'text',
        label: 'Text Element',
        conditionalLogic: {
          dependsOn: 'checkbox1',
          showWhen: true,
        },
      };

      const checkboxElement: ApiElement = {
        id: 'checkbox2',
        type: 'checkbox',
        label: 'Checkbox Element',
        conditionalLogic: {
          dependsOn: 'checkbox1',
          showWhen: false,
        },
      };

      expect(shouldShowElement(textElement, formValues)).toBe(true);
      expect(shouldShowElement(checkboxElement, formValues)).toBe(false);
    });
  });
});
