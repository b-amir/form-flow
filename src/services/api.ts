import {
  type ApiForm,
  type ApiError,
  type CreateFormRequest,
  type UpdateFormRequest,
} from '@/types/api';

const API_BASE_URL = '/api';

export const formApi = {
  async fetchForms(): Promise<ApiForm[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/forms`);
      if (!response.ok) {
        const errorData: ApiError = await response.json();
        throw new Error(errorData.error || 'Failed to fetch forms');
      }
      return await response.json();
    } catch (error) {
      throw error instanceof Error
        ? error
        : new Error('An unknown error occurred');
    }
  },

  async fetchFormById(id: string): Promise<ApiForm> {
    try {
      const response = await fetch(`${API_BASE_URL}/forms/${id}`);
      if (!response.ok) {
        const errorData: ApiError = await response.json();
        throw new Error(
          errorData.error || `Failed to fetch form with id ${id}`
        );
      }
      return await response.json();
    } catch (error) {
      throw error instanceof Error
        ? error
        : new Error('An unknown error occurred');
    }
  },

  async createForm(formData: CreateFormRequest): Promise<ApiForm> {
    try {
      const response = await fetch(`${API_BASE_URL}/forms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData: ApiError = await response.json();
        throw new Error(errorData.error || 'Failed to create form');
      }

      return await response.json();
    } catch (error) {
      throw error instanceof Error
        ? error
        : new Error('An unknown error occurred');
    }
  },

  async updateForm(id: string, updates: UpdateFormRequest): Promise<ApiForm> {
    try {
      const response = await fetch(`${API_BASE_URL}/forms/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const errorData: ApiError = await response.json();
        throw new Error(
          errorData.error || `Failed to update form with id ${id}`
        );
      }

      return await response.json();
    } catch (error) {
      throw error instanceof Error
        ? error
        : new Error('An unknown error occurred');
    }
  },

  async deleteForm(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/forms/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData: ApiError = await response.json();
        throw new Error(
          errorData.error || `Failed to delete form with id ${id}`
        );
      }
    } catch (error) {
      throw error instanceof Error
        ? error
        : new Error('An unknown error occurred');
    }
  },
};
