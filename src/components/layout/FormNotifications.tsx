import { Alert, Snackbar } from '@mui/material';
import React from 'react';

interface FormNotificationsProps {
  saveSuccess: boolean;
  saveError: string | null;
  onSaveSuccessClose: () => void;
  onSaveErrorClose: () => void;
  errorMessage?: string | null;
}

export const FormNotifications: React.FC<FormNotificationsProps> = ({
  saveSuccess,
  saveError,
  onSaveSuccessClose,
  onSaveErrorClose,
  errorMessage = null,
}) => {
  return (
    <>
      <Snackbar
        open={saveSuccess}
        autoHideDuration={3000}
        onClose={onSaveSuccessClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={onSaveSuccessClose}>
          Form saved successfully
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!saveError}
        autoHideDuration={5000}
        onClose={onSaveErrorClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={onSaveErrorClose}>
          {errorMessage || saveError || 'Error saving form'}
        </Alert>
      </Snackbar>
    </>
  );
};
