import { beforeEach, describe, expect, it } from 'vitest';
import { useUIStore } from '../uiStore';

describe('UI Store', () => {
  beforeEach(() => {
    useUIStore.setState({
      isLoading: false,
      notification: {
        message: '',
        type: 'info',
        isOpen: false,
      },
      activeModal: null,
    });
  });

  it('should set loading state', () => {
    useUIStore.getState().setLoading(true);
    expect(useUIStore.getState().isLoading).toBe(true);

    useUIStore.getState().setLoading(false);
    expect(useUIStore.getState().isLoading).toBe(false);
  });

  it('should show notification', () => {
    const message = 'Test notification';
    const type = 'success';

    useUIStore.getState().showNotification(message, type);

    const notification = useUIStore.getState().notification;
    expect(notification.message).toBe(message);
    expect(notification.type).toBe(type);
    expect(notification.isOpen).toBe(true);
  });

  it('should hide notification', () => {
    useUIStore.getState().showNotification('Test', 'error');
    expect(useUIStore.getState().notification.isOpen).toBe(true);

    useUIStore.getState().hideNotification();

    const notification = useUIStore.getState().notification;
    expect(notification.message).toBe('');
    expect(notification.type).toBe('info');
    expect(notification.isOpen).toBe(false);
  });

  it('should open modal', () => {
    const modalId = 'test-modal';
    useUIStore.getState().openModal(modalId);

    expect(useUIStore.getState().activeModal).toBe(modalId);
  });

  it('should close modal', () => {
    useUIStore.getState().openModal('test-modal');
    expect(useUIStore.getState().activeModal).toBe('test-modal');

    useUIStore.getState().closeModal();
    expect(useUIStore.getState().activeModal).toBe(null);
  });

  it('should handle different notification types', () => {
    const types: Array<'success' | 'error' | 'info' | 'warning'> = [
      'success',
      'error',
      'info',
      'warning',
    ];

    types.forEach(type => {
      useUIStore.getState().showNotification(`Test ${type}`, type);
      expect(useUIStore.getState().notification.type).toBe(type);
    });
  });
});
