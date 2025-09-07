import { create } from 'zustand';
import { type FormStore, type Element, type Form } from '@/types';
import { formApi } from '@/services/api';

export const useFormStore = create<FormStore>()(set => ({
  forms: [],
  currentForm: null,

  draftForm: {
    id: 'draft',
    name: '',
    elements: [],
  },
  selectedElementId: null,
  validationErrors: [],
  isDirty: false,

  isLoading: false,
  error: null,
  updatingFormId: null,

  fetchForms: async () => {
    set({ isLoading: true, error: null });
    try {
      const forms = await formApi.fetchForms();
      set({ forms, isLoading: false, updatingFormId: null });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch forms',
        isLoading: false,
        updatingFormId: null,
      });
    }
  },

  fetchFormById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const form = await formApi.fetchFormById(id);
      set({ currentForm: form, isLoading: false, updatingFormId: null });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : `Failed to fetch form with id ${id}`,
        isLoading: false,
        updatingFormId: null,
      });
    }
  },

  createForm: async (name: string, elements: Element[]) => {
    set({ isLoading: true, error: null, updatingFormId: 'draft' });
    try {
      const newForm = await formApi.createForm({ name, elements });
      set(state => ({
        forms: [...state.forms, newForm],
        currentForm: newForm,
        isLoading: false,
        updatingFormId: null,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to create form',
        isLoading: false,
        updatingFormId: null,
      });
    }
  },

  updateForm: async (id: string, updates: Partial<Form>) => {
    set({ isLoading: true, error: null, updatingFormId: id });
    try {
      const updatedForm = await formApi.updateForm(id, updates);
      set(state => ({
        forms: state.forms.map(form => (form.id === id ? updatedForm : form)),
        currentForm:
          state.currentForm?.id === id ? updatedForm : state.currentForm,
        isLoading: false,
        updatingFormId: null,
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : `Failed to update form with id ${id}`,
        isLoading: false,
        updatingFormId: null,
      });
    }
  },

  deleteForm: async (id: string) => {
    set({ isLoading: true, error: null, updatingFormId: id });
    try {
      await formApi.deleteForm(id);
      set(state => ({
        forms: state.forms.filter(form => form.id !== id),
        currentForm: state.currentForm?.id === id ? null : state.currentForm,
        isLoading: false,
        updatingFormId: null,
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : `Failed to delete form with id ${id}`,
        isLoading: false,
        updatingFormId: null,
      });
    }
  },

  clearCurrentForm: () => set({ currentForm: null }),

  clearError: () => set({ error: null }),

  setFormName: (name: string) => {
    set(state => ({
      draftForm: {
        ...state.draftForm,
        name,
      },
      isDirty: true,
    }));
  },

  updateElements: (elements: Element[]) => {
    set(state => ({
      draftForm: {
        ...state.draftForm,
        elements: [...elements],
      },
      isDirty: true,
    }));
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

  initDraftForm: (form?: Form) => {
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

  addElement: (element: Element) => {
    set(state => ({
      draftForm: {
        ...state.draftForm,
        elements: [...state.draftForm.elements, element],
      },
      selectedElementId: element.id,
      isDirty: true,
    }));
  },

  updateElement: (id: string, updates: Partial<Element>) => {
    set(state => ({
      draftForm: {
        ...state.draftForm,
        elements: state.draftForm.elements.map(element =>
          element.id === id ? ({ ...element, ...updates } as Element) : element
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

  setValidationErrors: errors => {
    set({ validationErrors: errors });
  },
}));
