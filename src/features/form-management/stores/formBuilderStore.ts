import { create } from 'zustand';
import { type FormBuilderStore } from '@/types/store';
import { type ApiElement, type ApiForm } from '@/types/api';
import { type ValidationError } from '@/types/validation';

export const useFormBuilderStore = create<FormBuilderStore>(set => ({
  draftForm: {
    id: 'draft',
    name: '',
    elements: [],
  },
  selectedElementId: null,
  validationErrors: [],
  isDirty: false,

  setFormName: (name: string) => {
    set(state => ({
      draftForm: {
        ...state.draftForm,
        name,
      },
      isDirty: true,
    }));
  },

  updateFormName: (name: string) => {
    set(state => ({
      draftForm: {
        ...state.draftForm,
        name,
      },
      isDirty: true,
    }));
  },

  updateElements: (elements: ApiElement[]) => {
    set(state => ({
      draftForm: {
        ...state.draftForm,
        elements: [...elements],
      },
      isDirty: true,
    }));
  },

  clearForm: () => {
    set({
      draftForm: {
        id: 'draft',
        name: '',
        elements: [],
      },
      selectedElementId: null,
      validationErrors: [],
      isDirty: false,
    });
  },

  addElement: (element: ApiElement) => {
    set(state => ({
      draftForm: {
        ...state.draftForm,
        elements: [...state.draftForm.elements, element],
      },
      selectedElementId: element.id,
      isDirty: true,
    }));
  },

  updateElement: (id: string, updates: Partial<ApiElement>) => {
    set(state => ({
      draftForm: {
        ...state.draftForm,
        elements: state.draftForm.elements.map(element =>
          element.id === id ? { ...element, ...updates } : element
        ),
      },
      isDirty: true,
    }));
  },

  removeElement: (id: string) => {
    set(state => {
      const newElements = state.draftForm.elements.filter(
        element => element.id !== id
      );

      return {
        draftForm: {
          ...state.draftForm,
          elements: newElements,
        },
        selectedElementId:
          state.selectedElementId === id ? null : state.selectedElementId,
        isDirty: true,
      };
    });
  },

  reorderElements: (startIndex: number, endIndex: number) => {
    set(state => {
      const elements = [...state.draftForm.elements];
      const [removed] = elements.splice(startIndex, 1);

      if (removed) {
        elements.splice(endIndex, 0, removed);
      }

      return {
        draftForm: {
          ...state.draftForm,
          elements,
        },
        isDirty: true,
      };
    });
  },

  selectElement: (id: string | null) => {
    set({ selectedElementId: id });
  },

  setValidationErrors: (errors: ValidationError[]) => {
    set({ validationErrors: errors });
  },

  clearDraftForm: () => {
    set({
      draftForm: {
        id: 'draft',
        name: '',
        elements: [],
      },
      selectedElementId: null,
      validationErrors: [],
      isDirty: false,
    });
  },

  initDraftForm: (form?: ApiForm) => {
    if (form) {
      set({
        draftForm: {
          id: form.id,
          name: form.name,
          elements: [...form.elements],
        },
        selectedElementId: null,
        validationErrors: [],
        isDirty: false,
      });
    } else {
      set({
        draftForm: {
          id: 'draft',
          name: '',
          elements: [],
        },
        selectedElementId: null,
        validationErrors: [],
        isDirty: false,
      });
    }
  },

  setIsDirty: (isDirty: boolean) => {
    set({ isDirty });
  },
}));
