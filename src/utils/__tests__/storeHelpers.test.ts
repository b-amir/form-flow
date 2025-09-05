import { describe, expect, it } from 'vitest';
import {
  formHelpers,
  elementHelpers,
  dataTransformHelpers,
  storeSelectors,
  storeUtils,
} from '../storeHelpers';
import { type ApiForm, type ApiElement } from '@/types/api';
import { type Form } from '@/types/form';

const mockApiForm: ApiForm = {
  id: '1',
  name: 'Test Form',
  elements: [
    {
      id: 'element1',
      type: 'text',
      label: 'Full Name',
      isRequired: true,
    },
    {
      id: 'element2',
      type: 'checkbox',
      label: 'Subscribe to newsletter',
      isRequired: false,
    },
  ],
  createdAt: '2023-01-01T00:00:00Z',
  updatedAt: '2023-01-02T00:00:00Z',
};

const mockElement: ApiElement = {
  id: 'test-element',
  type: 'text',
  label: 'Test Label',
  isRequired: true,
};

describe('formHelpers', () => {
  it('should duplicate a form with new IDs and suffix', () => {
    const duplicated = formHelpers.duplicateForm(mockApiForm);
    expect(duplicated.name).toBe('Test Form Copy');
    expect(duplicated.elements).toHaveLength(2);
    expect(duplicated.elements[0]?.id).not.toBe(mockApiForm.elements[0]?.id);
  });

  it('should validate form name correctly', () => {
    expect(formHelpers.validateFormName('Valid Form Name')).toHaveLength(0);
    expect(formHelpers.validateFormName('')).toHaveLength(1);
  });

  it('should validate form structure', () => {
    const validForm = { name: 'Valid Form', elements: [mockElement] };
    const invalidForm = { name: '', elements: [] };
    expect(formHelpers.isFormValid(validForm)).toBe(true);
    expect(formHelpers.isFormValid(invalidForm)).toBe(false);
  });

  it('should detect unsaved changes', () => {
    const unchanged = {
      name: mockApiForm.name,
      elements: mockApiForm.elements,
    };
    const changed = { name: 'Changed Name', elements: mockApiForm.elements };
    expect(formHelpers.hasUnsavedChanges(mockApiForm, unchanged)).toBe(false);
    expect(formHelpers.hasUnsavedChanges(mockApiForm, changed)).toBe(true);
  });
});

describe('elementHelpers', () => {
  it('should create element with correct properties', () => {
    const element = elementHelpers.createElement('text', 'Test Label');
    expect(element.type).toBe('text');
    expect(element.label).toBe('Test Label');
    expect(element.isRequired).toBe(false);
    expect(element.id).toContain('element_');
  });

  it('should validate element correctly', () => {
    expect(elementHelpers.validateElement(mockElement)).toHaveLength(0);
    const invalidElement = { ...mockElement, label: '' };
    expect(
      elementHelpers
        .validateElement(invalidElement)
        .some(e => e.path === 'label')
    ).toBe(true);
  });

  it('should transform element with updates', () => {
    const updates = { label: 'Updated Label', isRequired: false };
    const transformed = elementHelpers.transformElement(mockElement, updates);
    expect(transformed.label).toBe('Updated Label');
    expect(transformed.isRequired).toBe(false);
  });
});

describe('dataTransformHelpers', () => {
  it('should transform between Form and ApiForm formats', () => {
    const form: Form = {
      id: '1',
      name: 'Test Form',
      elements: [
        { id: 'element1', type: 'text', label: 'Full Name', isRequired: true },
      ],
    };
    const apiForm = dataTransformHelpers.formToApiForm(form);
    expect(apiForm.id).toBe(form.id);
    expect(apiForm.name).toBe(form.name);

    const backToForm = dataTransformHelpers.apiFormToForm(mockApiForm);
    expect(backToForm.id).toBe(mockApiForm.id);
    expect(backToForm.elements).toHaveLength(2);
  });

  it('should sanitize and prepare form data', () => {
    const dirtyForm = {
      name: '  Test Form  ',
      elements: [
        {
          id: 'element1',
          type: 'text' as const,
          label: '  Valid Label  ',
          isRequired: true,
        },
      ],
    };
    const sanitized = dataTransformHelpers.sanitizeFormData(dirtyForm);
    expect(sanitized.name).toBe('Test Form');
    expect(sanitized.elements[0]?.label).toBe('Valid Label');
  });

  it('should extract form metadata', () => {
    const metadata = dataTransformHelpers.extractFormMetadata(mockApiForm);
    expect(metadata.elementCount).toBe(2);
    expect(metadata.requiredElementCount).toBe(1);
    expect(metadata.hasTextFields).toBe(true);
  });
});

describe('storeSelectors', () => {
  const mockForms: ApiForm[] = [
    mockApiForm,
    {
      ...mockApiForm,
      id: '2',
      name: 'Another Form',
      elements: [],
      updatedAt: '2023-01-03T00:00:00Z',
    },
  ];

  it('should select forms by ID and name', () => {
    expect(storeSelectors.selectFormById(mockForms, '1')?.name).toBe(
      'Test Form'
    );
    expect(
      storeSelectors.selectFormById(mockForms, 'non-existent')
    ).toBeUndefined();
    expect(storeSelectors.selectFormsByName(mockForms, 'Test')).toHaveLength(1);
  });

  it('should filter and sort forms', () => {
    expect(storeSelectors.selectFormsWithElements(mockForms)).toHaveLength(1);
    const sorted = storeSelectors.selectFormsSortedByName(mockForms);
    expect(sorted[0]?.name).toBe('Another Form');
  });

  it('should select elements by criteria', () => {
    expect(
      storeSelectors.selectElementById(mockApiForm.elements, 'element1')?.label
    ).toBe('Full Name');
    expect(
      storeSelectors.selectRequiredElements(mockApiForm.elements)
    ).toHaveLength(1);
    expect(
      storeSelectors.selectElementsByType(mockApiForm.elements, 'text')
    ).toHaveLength(1);
  });
});

describe('storeUtils', () => {
  it('should generate unique IDs', () => {
    const id1 = storeUtils.generateId();
    const id2 = storeUtils.generateId();
    expect(id1).not.toBe(id2);
    expect(typeof id1).toBe('string');
  });

  it('should deep clone objects', () => {
    const original = { a: 1, b: { c: 2 } };
    const cloned = storeUtils.deepClone(original);
    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
    expect(cloned.b).not.toBe(original.b);
  });

  it('should compare objects for equality', () => {
    expect(storeUtils.isEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
    expect(storeUtils.isEqual({ a: 1, b: 2 }, { a: 1, b: 3 })).toBe(false);
  });

  it('should create error messages', () => {
    expect(storeUtils.createErrorMessage(new Error('Test error'))).toBe(
      'Test error'
    );
    expect(storeUtils.createErrorMessage('String error')).toBe('String error');
    expect(storeUtils.createErrorMessage(null)).toBe(
      'An unknown error occurred'
    );
  });
});
