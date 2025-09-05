import { beforeEach, describe, expect, it } from 'vitest';
import { useFormBuilderStore } from '../formBuilderStore';
import { type ApiElement } from '@/types/api';

describe('Form Builder Store', () => {
  beforeEach(() => {
    useFormBuilderStore.setState({
      draftForm: {
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
    useFormBuilderStore.getState().setFormName(name);

    expect(useFormBuilderStore.getState().draftForm?.name).toBe(name);
    expect(useFormBuilderStore.getState().isDirty).toBe(true);
  });

  it('should add an element', () => {
    const element: ApiElement = {
      id: '1',
      type: 'text',
      label: 'Full Name',
      isRequired: true,
    };

    useFormBuilderStore.getState().addElement(element);

    expect(useFormBuilderStore.getState().draftForm?.elements).toHaveLength(1);
    expect(useFormBuilderStore.getState().draftForm?.elements?.[0]).toEqual(
      element
    );
    expect(useFormBuilderStore.getState().selectedElementId).toBe(element.id);
    expect(useFormBuilderStore.getState().isDirty).toBe(true);
  });

  it('should update an element', () => {
    const element: ApiElement = {
      id: '1',
      type: 'text',
      label: 'Full Name',
      isRequired: true,
    };

    useFormBuilderStore.setState({
      draftForm: {
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

    useFormBuilderStore.getState().updateElement('1', updates);

    expect(useFormBuilderStore.getState().draftForm?.elements?.[0]?.label).toBe(
      updates.label
    );
    expect(
      useFormBuilderStore.getState().draftForm?.elements?.[0]?.isRequired
    ).toBe(updates.isRequired);
    expect(useFormBuilderStore.getState().isDirty).toBe(true);
  });

  it('should remove an element', () => {
    const element: ApiElement = {
      id: '1',
      type: 'text',
      label: 'Full Name',
      isRequired: true,
    };

    useFormBuilderStore.setState({
      draftForm: {
        name: 'Test Form',
        elements: [element],
      },
      selectedElementId: '1',
      validationErrors: [],
      isDirty: false,
    });

    useFormBuilderStore.getState().removeElement('1');

    expect(useFormBuilderStore.getState().draftForm?.elements).toHaveLength(0);
    expect(useFormBuilderStore.getState().selectedElementId).toBeNull();
    expect(useFormBuilderStore.getState().isDirty).toBe(true);
  });

  it('should reorder elements', () => {
    const elements: ApiElement[] = [
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

    useFormBuilderStore.setState({
      draftForm: {
        name: 'Test Form',
        elements,
      },
      selectedElementId: null,
      validationErrors: [],
      isDirty: false,
    });

    useFormBuilderStore.getState().reorderElements(0, 2);

    const reorderedElements =
      useFormBuilderStore.getState().draftForm?.elements || [];
    expect(reorderedElements[0]?.id).toBe('2');
    expect(reorderedElements[1]?.id).toBe('3');
    expect(reorderedElements[2]?.id).toBe('1');
    expect(useFormBuilderStore.getState().isDirty).toBe(true);
  });

  it('should select an element', () => {
    useFormBuilderStore.getState().selectElement('1');
    expect(useFormBuilderStore.getState().selectedElementId).toBe('1');

    useFormBuilderStore.getState().selectElement(null);
    expect(useFormBuilderStore.getState().selectedElementId).toBeNull();
  });

  it('should set validation errors', () => {
    const errors = [
      { path: 'name', message: 'Name is required' },
      { path: 'elements[0].label', message: 'Label is required' },
    ];

    useFormBuilderStore.getState().setValidationErrors(errors);
    expect(useFormBuilderStore.getState().validationErrors).toEqual(errors);
  });

  it('should clear draft form', () => {
    useFormBuilderStore.setState({
      draftForm: {
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

    useFormBuilderStore.getState().clearDraftForm();

    expect(useFormBuilderStore.getState().draftForm?.name).toBe('');
    expect(useFormBuilderStore.getState().draftForm?.elements).toHaveLength(0);
    expect(useFormBuilderStore.getState().selectedElementId).toBeNull();
    expect(useFormBuilderStore.getState().validationErrors).toHaveLength(0);
    expect(useFormBuilderStore.getState().isDirty).toBe(false);
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

    useFormBuilderStore.getState().initDraftForm(form);

    expect(useFormBuilderStore.getState().draftForm?.name).toBe(form.name);
    expect(useFormBuilderStore.getState().draftForm?.elements).toHaveLength(1);
    expect(useFormBuilderStore.getState().draftForm?.elements?.[0]).toEqual(
      form.elements[0]
    );
    expect(useFormBuilderStore.getState().selectedElementId).toBeNull();
    expect(useFormBuilderStore.getState().validationErrors).toHaveLength(0);
    expect(useFormBuilderStore.getState().isDirty).toBe(false);
  });

  it('should initialize empty draft form when no form is provided', () => {
    useFormBuilderStore.setState({
      draftForm: {
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

    useFormBuilderStore.getState().initDraftForm();

    expect(useFormBuilderStore.getState().draftForm?.name).toBe('');
    expect(useFormBuilderStore.getState().draftForm?.elements).toHaveLength(0);
    expect(useFormBuilderStore.getState().selectedElementId).toBeNull();
    expect(useFormBuilderStore.getState().validationErrors).toHaveLength(0);
    expect(useFormBuilderStore.getState().isDirty).toBe(false);
  });

  it('should set isDirty flag', () => {
    useFormBuilderStore.getState().setIsDirty(true);
    expect(useFormBuilderStore.getState().isDirty).toBe(true);

    useFormBuilderStore.getState().setIsDirty(false);
    expect(useFormBuilderStore.getState().isDirty).toBe(false);
  });
});
