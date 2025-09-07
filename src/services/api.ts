import type { Form, Element } from '@/types';
import { API_BASE_URL } from '@/constants';

export const formApi = {
  async submitFormData(
    formId: string,
    formData: Record<string, string | number | boolean | null>
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/forms/${formId}/submissions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit form');
      }

      return await response.json();
    } catch (error) {
      throw error instanceof Error
        ? error
        : new Error('An unknown error occurred');
    }
  },

  async fetchForms(): Promise<Form[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/forms`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch forms');
      }
      const data = await response.json();
      return Array.isArray(data) ? data : data.forms || [];
    } catch (error) {
      throw error instanceof Error
        ? error
        : new Error('An unknown error occurred');
    }
  },

  async fetchFormById(id: string): Promise<Form> {
    try {
      const response = await fetch(`${API_BASE_URL}/forms/${id}`);
      if (!response.ok) {
        const errorData = await response.json();
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

  async createForm(formData: {
    name: string;
    elements: Element[];
  }): Promise<Form> {
    try {
      const response = await fetch(`${API_BASE_URL}/forms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create form');
      }

      return await response.json();
    } catch (error) {
      throw error instanceof Error
        ? error
        : new Error('An unknown error occurred');
    }
  },

  async updateForm(id: string, updates: Partial<Form>): Promise<Form> {
    try {
      const response = await fetch(`${API_BASE_URL}/forms/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const errorData = await response.json();
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
        const errorData = await response.json();
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
