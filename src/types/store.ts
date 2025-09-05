import { type ApiForm, type ApiElement } from './api';
import { type ValidationError } from './validation';

export interface FormStore {
  forms: ApiForm[];
  currentForm: ApiForm | null;
  isLoading: boolean;
  error: string | null;

  fetchForms: () => Promise<void>;
  fetchFormById: (id: string) => Promise<void>;
  createForm: (name: string, elements: ApiElement[]) => Promise<void>;
  updateForm: (id: string, updates: Partial<ApiForm>) => Promise<void>;
  deleteForm: (id: string) => Promise<void>;
  clearCurrentForm: () => void;
  clearError: () => void;
}

export interface FormBuilderStore {
  draftForm: {
    id: string;
    name: string;
    elements: ApiElement[];
  };
  selectedElementId: string | null;
  validationErrors: ValidationError[];
  isDirty: boolean;

  setFormName: (name: string) => void;
  updateFormName: (name: string) => void;
  updateElements: (elements: ApiElement[]) => void;
  clearForm: () => void;
  addElement: (element: ApiElement) => void;
  updateElement: (id: string, updates: Partial<ApiElement>) => void;
  removeElement: (id: string) => void;
  reorderElements: (startIndex: number, endIndex: number) => void;
  selectElement: (id: string | null) => void;
  setValidationErrors: (errors: ValidationError[]) => void;
  clearDraftForm: () => void;
  initDraftForm: (form?: ApiForm) => void;
  setIsDirty: (isDirty: boolean) => void;
}

export interface UIStore {
  isLoading: boolean;
  notification: {
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    isOpen: boolean;
  };
  activeModal: string | null;

  setLoading: (isLoading: boolean) => void;
  showNotification: (
    message: string,
    type: 'success' | 'error' | 'info' | 'warning'
  ) => void;
  hideNotification: () => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
}
