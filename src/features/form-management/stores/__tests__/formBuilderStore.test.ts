import { beforeEach, describe, expect, it } from 'vitest';
import { useFormStore } from '@/features/form-management/stores/formStore';
import type { Element } from '@/types';

describe('Form Builder Store', () => {
  beforeEach(() => {
    useFormStore.setState({
      draftForm: {
        id: '',
        name: '',
        elements: [],
      },
      selectedElementId: null,
      validationErrors: [],
      isDirty: false,
    });
  });

  it('should set form name', () => {
    const name = 'Test Form';
    useFormStore.getState().setFormName(name);

    expect(useFormStore.getState().draftForm?.name).toBe(name);
    expect(useFormStore.getState().isDirty).toBe(true);
  });

  it('should add an element', () => {
    const element: Element = {
      id: '1',
      type: 'text',
      label: 'Full Name',
      isRequired: true,
    };

    useFormStore.getState().addElement(element);

    expect(useFormStore.getState().draftForm?.elements).toHaveLength(1);
    expect(useFormStore.getState().draftForm?.elements?.[0]).toEqual(element);
    expect(useFormStore.getState().selectedElementId).toBe(element.id);
    expect(useFormStore.getState().isDirty).toBe(true);
  });

  it('should update an element', () => {
    const element: Element = {
      id: '1',
      type: 'text',
      label: 'Full Name',
      isRequired: true,
    };

    useFormStore.setState({
      draftForm: {
        id: '1',
        name: 'Test Form',
        elements: [element],
      },
      selectedElementId: null,
      validationErrors: [],
      isDirty: false,
    });

    const updates = {
      label: 'Updated Label',
      isRequired: false,
    };

    useFormStore.getState().updateElement('1', updates);

    expect(useFormStore.getState().draftForm?.elements?.[0]?.label).toBe(
      updates.label
    );
    expect(useFormStore.getState().draftForm?.elements?.[0]?.isRequired).toBe(
      updates.isRequired
    );
    expect(useFormStore.getState().isDirty).toBe(true);
  });

  it('should remove an element', () => {
    const element: Element = {
      id: '1',
      type: 'text',
      label: 'Full Name',
      isRequired: true,
    };

    useFormStore.setState({
      draftForm: {
        id: '1',
        name: 'Test Form',
        elements: [element],
      },
      selectedElementId: '1',
      validationErrors: [],
      isDirty: false,
    });

    useFormStore.getState().removeElement('1');

    expect(useFormStore.getState().draftForm?.elements).toHaveLength(0);
    expect(useFormStore.getState().selectedElementId).toBeNull();
    expect(useFormStore.getState().isDirty).toBe(true);
  });

  it('should reorder elements', () => {
    const elements: Element[] = [
      {
        id: '1',
        type: 'text',
        label: 'First Name',
        isRequired: true,
      },
      {
        id: '2',
        type: 'text',
        label: 'Last Name',
        isRequired: true,
      },
      {
        id: '3',
        type: 'checkbox',
        label: 'Subscribe',
        isRequired: false,
      },
    ];

    useFormStore.setState({
      draftForm: {
        id: 'test-form-id',
        name: 'Test Form',
        elements,
      },
      selectedElementId: null,
      validationErrors: [],
      isDirty: false,
    });

    useFormStore.getState().reorderElements(0, 2);

    const reorderedElements = useFormStore.getState().draftForm?.elements || [];
    expect(reorderedElements[0]?.id).toBe('2');
    expect(reorderedElements[1]?.id).toBe('3');
    expect(reorderedElements[2]?.id).toBe('1');
    expect(useFormStore.getState().isDirty).toBe(true);
  });

  it('should select an element', () => {
    useFormStore.getState().selectElement('1');
    expect(useFormStore.getState().selectedElementId).toBe('1');

    useFormStore.getState().selectElement(null);
    expect(useFormStore.getState().selectedElementId).toBeNull();
  });

  it('should set validation errors', () => {
    const errors = [
      { path: 'name', message: 'Name is required' },
      { path: 'elements[0].label', message: 'Label is required' },
    ];

    useFormStore.getState().setValidationErrors(errors);
    expect(useFormStore.getState().validationErrors).toEqual(errors);
  });

  it('should clear draft form', () => {
    useFormStore.setState({
      draftForm: {
        id: '1',
        name: 'Test Form',
        elements: [
          {
            id: '1',
            type: 'text',
            label: 'Full Name',
            isRequired: true,
          },
        ],
      },
      selectedElementId: '1',
      validationErrors: [{ path: 'name', message: 'Name is required' }],
      isDirty: true,
    });

    useFormStore.getState().clearDraftForm();

    expect(useFormStore.getState().draftForm?.name).toBe('');
    expect(useFormStore.getState().draftForm?.elements).toHaveLength(0);
    expect(useFormStore.getState().selectedElementId).toBeNull();
    expect(useFormStore.getState().validationErrors).toHaveLength(0);
    expect(useFormStore.getState().isDirty).toBe(false);
  });

  it('should initialize draft form with existing form', () => {
    const form = {
      id: '1',
      name: 'Existing Form',
      elements: [
        {
          id: '1',
          type: 'text' as const,
          label: 'Full Name',
          isRequired: true,
        },
      ],
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01',
    };

    useFormStore.getState().initDraftForm(form);

    expect(useFormStore.getState().draftForm?.name).toBe(form.name);
    expect(useFormStore.getState().draftForm?.elements).toHaveLength(1);
    expect(useFormStore.getState().draftForm?.elements?.[0]).toEqual(
      form.elements[0]
    );
    expect(useFormStore.getState().selectedElementId).toBeNull();
    expect(useFormStore.getState().validationErrors).toHaveLength(0);
    expect(useFormStore.getState().isDirty).toBe(false);
  });

  it('should initialize empty draft form when no form is provided', () => {
    useFormStore.setState({
      draftForm: {
        id: '1',
        name: 'Test Form',
        elements: [
          {
            id: '1',
            type: 'text',
            label: 'Full Name',
            isRequired: true,
          },
        ],
      },
      selectedElementId: '1',
      validationErrors: [{ path: 'name', message: 'Name is required' }],
      isDirty: true,
    });

    useFormStore.getState().initDraftForm();

    expect(useFormStore.getState().draftForm?.name).toBe('');
    expect(useFormStore.getState().draftForm?.elements).toHaveLength(0);
    expect(useFormStore.getState().selectedElementId).toBeNull();
    expect(useFormStore.getState().validationErrors).toHaveLength(0);
    expect(useFormStore.getState().isDirty).toBe(false);
  });

  it('should set isDirty flag', () => {
    useFormStore.getState().setIsDirty(true);
    expect(useFormStore.getState().isDirty).toBe(true);

    useFormStore.getState().setIsDirty(false);
    expect(useFormStore.getState().isDirty).toBe(false);
  });
});
