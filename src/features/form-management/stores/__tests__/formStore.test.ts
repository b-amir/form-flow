import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useFormStore } from '@/features/form-management/stores/formStore';
import { formApi } from '@/services/api';

vi.mock('@/services/api', () => ({
  formApi: {
    fetchForms: vi.fn(),
    fetchFormById: vi.fn(),
    createForm: vi.fn(),
    updateForm: vi.fn(),
    deleteForm: vi.fn(),
  },
}));

describe('Form Store', () => {
  beforeEach(() => {
    useFormStore.getState().clearCurrentForm();
    useFormStore.setState({
      forms: [],
      currentForm: null,
      isLoading: false,
      error: null,
    });

    vi.clearAllMocks();
  });

  it('should fetch forms successfully', async () => {
    const mockForms = [
      {
        id: '1',
        name: 'Test Form',
        elements: [],
        createdAt: '2023-01-01',
        updatedAt: '2023-01-01',
      },
    ];

    vi.mocked(formApi.fetchForms).mockResolvedValue(mockForms);

    await useFormStore.getState().fetchForms();

    expect(formApi.fetchForms).toHaveBeenCalledTimes(1);

    expect(useFormStore.getState().forms).toEqual(mockForms);
    expect(useFormStore.getState().isLoading).toBe(false);
    expect(useFormStore.getState().error).toBeNull();
  });

  it('should handle fetch forms error', async () => {
    const errorMessage = 'Network error';
    vi.mocked(formApi.fetchForms).mockRejectedValue(new Error(errorMessage));

    await useFormStore.getState().fetchForms();

    expect(formApi.fetchForms).toHaveBeenCalledTimes(1);
    expect(useFormStore.getState().forms).toEqual([]);
    expect(useFormStore.getState().isLoading).toBe(false);
    expect(useFormStore.getState().error).toBe(errorMessage);
  });

  it('should create a form successfully', async () => {
    const newForm = {
      id: '1',
      name: 'New Form',
      elements: [],
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01',
    };

    vi.mocked(formApi.createForm).mockResolvedValue(newForm);

    await useFormStore.getState().createForm('New Form', []);

    expect(formApi.createForm).toHaveBeenCalledWith({
      name: 'New Form',
      elements: [],
    });
    expect(useFormStore.getState().forms).toContainEqual(newForm);
    expect(useFormStore.getState().currentForm).toEqual(newForm);
    expect(useFormStore.getState().isLoading).toBe(false);
    expect(useFormStore.getState().error).toBeNull();
  });

  it('should update a form successfully', async () => {
    const initialForm = {
      id: '1',
      name: 'Initial Form',
      elements: [],
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01',
    };

    const updatedForm = {
      ...initialForm,
      name: 'Updated Form',
      updatedAt: '2023-01-02',
    };

    useFormStore.setState({
      forms: [initialForm],
      currentForm: initialForm,
      isLoading: false,
      error: null,
    });

    vi.mocked(formApi.updateForm).mockResolvedValue(updatedForm);

    await useFormStore.getState().updateForm('1', { name: 'Updated Form' });

    expect(formApi.updateForm).toHaveBeenCalledWith('1', {
      name: 'Updated Form',
    });
    expect(useFormStore.getState().forms[0]).toEqual(updatedForm);
    expect(useFormStore.getState().currentForm).toEqual(updatedForm);
    expect(useFormStore.getState().isLoading).toBe(false);
    expect(useFormStore.getState().error).toBeNull();
  });

  it('should delete a form successfully', async () => {
    const form = {
      id: '1',
      name: 'Test Form',
      elements: [],
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01',
    };

    useFormStore.setState({
      forms: [form],
      currentForm: form,
      isLoading: false,
      error: null,
    });

    vi.mocked(formApi.deleteForm).mockResolvedValue(undefined);

    await useFormStore.getState().deleteForm('1');

    expect(formApi.deleteForm).toHaveBeenCalledWith('1');
    expect(useFormStore.getState().forms).toEqual([]);
    expect(useFormStore.getState().currentForm).toBeNull();
    expect(useFormStore.getState().isLoading).toBe(false);
    expect(useFormStore.getState().error).toBeNull();
  });

  it('should clear the current form', () => {
    const form = {
      id: '1',
      name: 'Test Form',
      elements: [],
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01',
    };

    useFormStore.setState({
      forms: [form],
      currentForm: form,
      isLoading: false,
      error: null,
    });

    useFormStore.getState().clearCurrentForm();

    expect(useFormStore.getState().currentForm).toBeNull();
  });

  it('should clear the error', () => {
    useFormStore.setState({
      forms: [],
      currentForm: null,
      isLoading: false,
      error: 'Some error',
    });

    useFormStore.getState().clearError();

    expect(useFormStore.getState().error).toBeNull();
  });
});
