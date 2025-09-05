import { type ApiForm, type ApiElement } from '@/types/api';
import { type Form, type Element } from '@/types/form';
import { type ValidationError } from '@/types/validation';

export const formHelpers = {
  duplicateForm: (
    form: ApiForm,
    suffix: string = 'Copy'
  ): Omit<ApiForm, 'id' | 'createdAt' | 'updatedAt'> => {
    return {
      name: `${form.name} ${suffix}`,
      elements: form.elements.map(element => ({
        ...element,
        id: `${element.id}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      })),
    };
  },

  cloneForm: (
    form: ApiForm
  ): Omit<ApiForm, 'id' | 'createdAt' | 'updatedAt'> => {
    return {
      name: form.name,
      elements: form.elements.map(element => ({
        ...element,
        id: `${element.id}_clone_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      })),
    };
  },

  validateFormName: (name: string): ValidationError[] => {
    const errors: ValidationError[] = [];

    if (!name || name.trim().length === 0) {
      errors.push({ path: 'name', message: 'Form name is required' });
    }

    if (name.length > 100) {
      errors.push({
        path: 'name',
        message: 'Form name must be 100 characters or less',
      });
    }

    return errors;
  },

  validateForm: (form: {
    name: string;
    elements: ApiElement[];
  }): ValidationError[] => {
    const errors: ValidationError[] = [];

    errors.push(...formHelpers.validateFormName(form.name));

    if (!form.elements || form.elements.length === 0) {
      errors.push({
        path: 'elements',
        message: 'Form must have at least one element',
      });
    }

    form.elements.forEach((element, index) => {
      const elementErrors = elementHelpers.validateElement(element);
      elementErrors.forEach(error => {
        errors.push({
          path: `elements[${index}].${error.path}`,
          message: error.message,
        });
      });
    });

    return errors;
  },

  isFormValid: (form: { name: string; elements: ApiElement[] }): boolean => {
    return formHelpers.validateForm(form).length === 0;
  },

  getFormElementCount: (form: ApiForm): number => {
    return form.elements.length;
  },

  getRequiredElementCount: (form: ApiForm): number => {
    return form.elements.filter(element => element.isRequired).length;
  },

  hasUnsavedChanges: (
    originalForm: ApiForm,
    currentForm: { name: string; elements: ApiElement[] }
  ): boolean => {
    if (originalForm.name !== currentForm.name) {
      return true;
    }

    if (originalForm.elements.length !== currentForm.elements.length) {
      return true;
    }

    return originalForm.elements.some((originalElement, index) => {
      const currentElement = currentForm.elements[index];
      if (!currentElement) return true;

      return (
        originalElement.type !== currentElement.type ||
        originalElement.label !== currentElement.label ||
        originalElement.isRequired !== currentElement.isRequired
      );
    });
  },
};

export const elementHelpers = {
  createElement: (
    type: Element['type'],
    label: string,
    isRequired: boolean = false
  ): ApiElement => {
    return {
      id: `element_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      label,
      isRequired,
    };
  },

  validateElement: (element: ApiElement): ValidationError[] => {
    const errors: ValidationError[] = [];

    if (!element.label || element.label.trim().length === 0) {
      errors.push({ path: 'label', message: 'Element label is required' });
    }

    if (element.label && element.label.length > 200) {
      errors.push({
        path: 'label',
        message: 'Element label must be 200 characters or less',
      });
    }

    if (!element.type || !['text', 'checkbox'].includes(element.type)) {
      errors.push({
        path: 'type',
        message: 'Element type must be text or checkbox',
      });
    }

    return errors;
  },

  transformElement: (
    element: ApiElement,
    updates: Partial<ApiElement>
  ): ApiElement => {
    return {
      ...element,
      ...updates,
      id: element.id,
    };
  },

  duplicateElement: (
    element: ApiElement,
    suffix: string = 'Copy'
  ): ApiElement => {
    return {
      ...element,
      id: `${element.id}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      label: `${element.label} ${suffix}`,
    };
  },

  isElementValid: (element: ApiElement): boolean => {
    return elementHelpers.validateElement(element).length === 0;
  },

  getElementDisplayName: (element: ApiElement): string => {
    const typeLabel = element.type === 'text' ? 'Text Field' : 'Checkbox';
    const requiredLabel = element.isRequired ? ' (Required)' : '';
    return `${element.label} - ${typeLabel}${requiredLabel}`;
  },
};

export const dataTransformHelpers = {
  formToApiForm: (form: Form): Omit<ApiForm, 'createdAt' | 'updatedAt'> => {
    return {
      id: form.id,
      name: form.name,
      elements: form.elements.map(element => ({
        ...element,
      })),
    };
  },

  apiFormToForm: (apiForm: ApiForm): Form => {
    return {
      id: apiForm.id,
      name: apiForm.name,
      elements: apiForm.elements.map(element => ({
        id: element.id,
        type: element.type,
        label: element.label,
        isRequired: element.isRequired ?? false,
      })),
    };
  },

  sanitizeFormData: (form: {
    name: string;
    elements: ApiElement[];
  }): { name: string; elements: ApiElement[] } => {
    return {
      name: form.name.trim(),
      elements: form.elements.map(element => ({
        ...element,
        label: element.label.trim(),
      })),
    };
  },

  prepareFormForApi: (form: {
    name: string;
    elements: ApiElement[];
  }): { name: string; elements: ApiElement[] } => {
    const sanitized = dataTransformHelpers.sanitizeFormData(form);
    return {
      name: sanitized.name,
      elements: sanitized.elements.filter(
        element =>
          element.label.length > 0 &&
          ['text', 'checkbox'].includes(element.type)
      ),
    };
  },

  extractFormMetadata: (form: ApiForm) => {
    return {
      id: form.id,
      name: form.name,
      elementCount: form.elements.length,
      requiredElementCount: form.elements.filter(el => el.isRequired).length,
      hasTextFields: form.elements.some(el => el.type === 'text'),
      hasCheckboxes: form.elements.some(el => el.type === 'checkbox'),
      createdAt: form.createdAt,
      updatedAt: form.updatedAt,
    };
  },
};

export const storeSelectors = {
  selectFormById: (forms: ApiForm[], id: string): ApiForm | undefined => {
    return forms.find(form => form.id === id);
  },

  selectFormsByName: (forms: ApiForm[], searchTerm: string): ApiForm[] => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return forms;

    return forms.filter(form => form.name.toLowerCase().includes(term));
  },

  selectFormsWithElements: (forms: ApiForm[]): ApiForm[] => {
    return forms.filter(form => form.elements.length > 0);
  },

  selectFormsSortedByName: (forms: ApiForm[]): ApiForm[] => {
    return [...forms].sort((a, b) => a.name.localeCompare(b.name));
  },

  selectFormsSortedByDate: (
    forms: ApiForm[],
    direction: 'asc' | 'desc' = 'desc'
  ): ApiForm[] => {
    return [...forms].sort((a, b) => {
      const dateA = new Date(a.updatedAt).getTime();
      const dateB = new Date(b.updatedAt).getTime();
      return direction === 'desc' ? dateB - dateA : dateA - dateB;
    });
  },

  selectElementById: (
    elements: ApiElement[],
    id: string
  ): ApiElement | undefined => {
    return elements.find(element => element.id === id);
  },

  selectRequiredElements: (elements: ApiElement[]): ApiElement[] => {
    return elements.filter(element => element.isRequired);
  },

  selectElementsByType: (
    elements: ApiElement[],
    type: Element['type']
  ): ApiElement[] => {
    return elements.filter(element => element.type === type);
  },

  selectValidationErrorsByPath: (
    errors: ValidationError[],
    pathPrefix: string
  ): ValidationError[] => {
    return errors.filter(error => error.path.startsWith(pathPrefix));
  },
};

export const storeUtils = {
  generateId: (): string => {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  },

  debounce: <T extends (...args: unknown[]) => unknown>(
    func: T,
    wait: number
  ): T => {
    let timeout: NodeJS.Timeout;
    return ((...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    }) as T;
  },

  deepClone: <T>(obj: T): T => {
    return JSON.parse(JSON.stringify(obj));
  },

  isEqual: (a: unknown, b: unknown): boolean => {
    return JSON.stringify(a) === JSON.stringify(b);
  },

  createErrorMessage: (error: unknown): string => {
    if (error instanceof Error) {
      return error.message;
    }
    if (typeof error === 'string') {
      return error;
    }
    return 'An unknown error occurred';
  },
};
