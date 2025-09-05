import { create } from 'zustand';
import { type UIStore } from '@/types/store';

export const useUIStore = create<UIStore>(set => ({
  isLoading: false,
  notification: {
    message: '',
    type: 'info',
    isOpen: false,
  },
  activeModal: null,

  setLoading: (isLoading: boolean) => {
    set({ isLoading });
  },

  showNotification: (
    message: string,
    type: 'success' | 'error' | 'info' | 'warning'
  ) => {
    set({
      notification: {
        message,
        type,
        isOpen: true,
      },
    });
  },

  hideNotification: () => {
    set({
      notification: {
        message: '',
        type: 'info',
        isOpen: false,
      },
    });
  },

  openModal: (modalId: string) => {
    set({ activeModal: modalId });
  },

  closeModal: () => {
    set({ activeModal: null });
  },
}));
