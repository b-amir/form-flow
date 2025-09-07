export type ElementType = 'text' | 'checkbox';

export interface BaseElement {
  id: string;
  type: ElementType;
  label: string;
  isRequired?: boolean;
  conditionalLogic?: ConditionalLogic;
}

export interface TextElement extends BaseElement {
  type: 'text';
  validation?: {
    minLength?: number;
    maxLength?: number;
  };
}

export interface CheckboxElement extends BaseElement {
  type: 'checkbox';
  validation?: {
    required?: boolean;
  };
}

export interface ConditionalRule {
  dependsOn: string;
  showWhen: boolean;
}

export interface ConditionalLogic {
  operator?: 'AND' | 'OR';
  rules: ConditionalRule[];
}

export type Element = TextElement | CheckboxElement;

export interface Form {
  id: string;
  name: string;
  elements: Element[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ValidationError {
  path: string;
  message: string;
}

export interface FormStore {
  forms: Form[];
  currentForm: Form | null;
  draftForm: {
    id: string;
    name: string;
    elements: Element[];
  };
  selectedElementId: string | null;
  validationErrors: ValidationError[];
  isDirty: boolean;
  isLoading: boolean;
  error: string | null;
  updatingFormId: string | null;
  fetchForms: () => Promise<void>;
  fetchFormById: (id: string) => Promise<void>;
  createForm: (name: string, elements: Element[]) => Promise<void>;
  updateForm: (id: string, updates: Partial<Form>) => Promise<void>;
  deleteForm: (id: string) => Promise<void>;
  clearCurrentForm: () => void;
  clearError: () => void;
  setFormName: (name: string) => void;
  updateElements: (elements: Element[]) => void;
  clearDraftForm: () => void;
  initDraftForm: (form?: Form) => void;
  setIsDirty: (isDirty: boolean) => void;
  addElement: (element: Element) => void;
  updateElement: (id: string, updates: Partial<Element>) => void;
  removeElement: (id: string) => void;
  reorderElements: (startIndex: number, endIndex: number) => void;
  selectElement: (id: string | null) => void;
  setValidationErrors: (errors: ValidationError[]) => void;
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

export type FormValues = Record<string, any>;
