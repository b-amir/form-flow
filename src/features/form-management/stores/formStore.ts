import { create } from 'zustand';
import { type FormStore } from '@/types/store';
import { type ApiElement, type ApiForm } from '@/types/api';
import { formApi } from '@/services';

export const useFormStore = create<FormStore>(set => ({
  forms: [],
  currentForm: null,
  isLoading: false,
  error: null,

  fetchForms: async () => {
    set({ isLoading: true, error: null });
    try {
      const forms = await formApi.fetchForms();
      set({ forms, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch forms',
        isLoading: false,
      });
    }
  },

  fetchFormById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const form = await formApi.fetchFormById(id);
      set({ currentForm: form, isLoading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : `Failed to fetch form with id ${id}`,
        isLoading: false,
      });
    }
  },

  createForm: async (name: string, elements: ApiElement[]) => {
    set({ isLoading: true, error: null });
    try {
      const newForm = await formApi.createForm({ name, elements });
      set(state => ({
        forms: [...state.forms, newForm],
        currentForm: newForm,
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to create form',
        isLoading: false,
      });
    }
  },

  updateForm: async (id: string, updates: Partial<ApiForm>) => {
    set({ isLoading: true, error: null });
    try {
      const updatedForm = await formApi.updateForm(id, updates);
      set(state => ({
        forms: state.forms.map(form => (form.id === id ? updatedForm : form)),
        currentForm:
          state.currentForm?.id === id ? updatedForm : state.currentForm,
        isLoading: false,
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : `Failed to update form with id ${id}`,
        isLoading: false,
      });
    }
  },

  deleteForm: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await formApi.deleteForm(id);
      set(state => ({
        forms: state.forms.filter(form => form.id !== id),
        currentForm: state.currentForm?.id === id ? null : state.currentForm,
        isLoading: false,
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : `Failed to delete form with id ${id}`,
        isLoading: false,
      });
    }
  },

  clearCurrentForm: () => set({ currentForm: null }),

  clearError: () => set({ error: null }),
}));
