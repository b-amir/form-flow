import { Box, Button, useTheme, keyframes } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useFormStore } from '@/features/form-management/stores/formStore';
import { useFormBuilderStore } from '@/features/form-management/stores/formBuilderStore';
import { ConfirmationDialog } from '../../../common/ConfirmationDialog';
import { FormsHeader } from './FormsHeader';
import { FormsList } from './FormsList';
import { Add } from '@mui/icons-material';
import { useFormNameInputRef } from '@/hooks';

export const FormsListPanel = () => {
  const {
    forms,
    deleteForm,
    fetchForms,
    isLoading,
    currentForm,
    updatingFormId,
  } = useFormStore();
  const { draftForm, isDirty } = useFormBuilderStore();
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [formToDelete, setFormToDelete] = useState<string | null>(null);
  const [unsavedChangesDialog, setUnsavedChangesDialog] = useState(false);
  const [pendingAction, setPendingAction] = useState<{
    type: 'new' | 'open';
    formId?: string;
  } | null>(null);

  useEffect(() => {
    fetchForms();
  }, [fetchForms]);

  const theme = useTheme();

  const handleSelectForm = (formId: string) => {
    if (isDirty) {
      setPendingAction({ type: 'open', formId });
      setUnsavedChangesDialog(true);
    } else {
      executeSelectForm(formId);
    }
  };

  const executeSelectForm = (formId: string) => {
    const form = forms.find(f => f.id === formId);
    if (form) {
      useFormBuilderStore.getState().initDraftForm(form);
      setSelectedFormId(formId);
    }
  };

  const handleAddForm = () => {
    if (isDirty) {
      setPendingAction({ type: 'new' });
      setUnsavedChangesDialog(true);
    } else {
      executeAddForm();
    }
  };

  const formNameInputRef = useFormNameInputRef();

  const executeAddForm = () => {
    useFormBuilderStore.getState().initDraftForm();
    setSelectedFormId(null);

    setTimeout(() => {
      formNameInputRef.current?.focus();
    }, 100);
  };

  const handleConfirmUnsavedChanges = () => {
    if (pendingAction?.type === 'new') {
      executeAddForm();
    } else if (pendingAction?.type === 'open' && pendingAction.formId) {
      executeSelectForm(pendingAction.formId);
    }
    setUnsavedChangesDialog(false);
    setPendingAction(null);
  };

  const handleCancelUnsavedChanges = () => {
    setUnsavedChangesDialog(false);
    setPendingAction(null);
  };

  const handleDeleteClick = (event: React.MouseEvent, formId: string) => {
    event.stopPropagation();
    setFormToDelete(formId);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (formToDelete) {
      try {
        setDeletingId(formToDelete);
        await deleteForm(formToDelete);

        if (selectedFormId === formToDelete) {
          setSelectedFormId(null);
          useFormBuilderStore.getState().initDraftForm();
        }
        await fetchForms();
      } catch (err) {
        console.error(err);
      } finally {
        setDeletingId(null);
        setFormToDelete(null);
        setConfirmDialogOpen(false);
      }
    }
  };

  const handleCancelDelete = () => {
    setFormToDelete(null);
    setConfirmDialogOpen(false);
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 6,
      }}
    >
      <FormsHeader />

      <FormsList
        forms={forms}
        selectedFormId={selectedFormId}
        isLoading={isLoading}
        currentFormId={currentForm?.id || null}
        draftFormId={draftForm.id}
        deletingId={deletingId}
        updatingFormId={updatingFormId}
        onSelectForm={handleSelectForm}
        onDeleteClick={handleDeleteClick}
      />

      <Box sx={{ p: 2 }}>
        {(() => {
          const pulse = keyframes`
            0% {
              box-shadow: 0 0 0 0 rgba(233, 30, 99, 0.4);
            }
            70% {
              box-shadow: 0 0 0 10px rgba(233, 30, 99, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(233, 30, 99, 0);
            }
          `;

          const noForms = forms.length === 0;

          return (
            <Button
              fullWidth
              onClick={handleAddForm}
              startIcon={<Add />}
              sx={{
                borderRadius: 1,
                border: '1px solid',
                borderColor: noForms ? 'error.light' : 'divider',
                color: noForms ? 'white' : 'text.secondary',
                justifyContent: 'flex-start',
                boxShadow: noForms ? 3 : 2,
                px: 2,
                py: 1,
                backgroundColor: 'transparent',
                background: noForms
                  ? theme.palette.gradients.pinkGradient
                  : 'transparent',
                '&:hover': {
                  backgroundColor: noForms
                    ? 'transparent'
                    : 'rgba(0, 0, 0, 0.04)',
                  background: noForms
                    ? theme.palette.gradients.pinkGradient
                    : 'transparent',
                  border: '1px solid',
                  borderColor: noForms ? 'error.main' : 'divider',
                  boxShadow: 4,
                  transform: noForms ? 'translateY(-2px)' : 'none',
                },
                textTransform: 'none',
                fontWeight: 600,
                fontSize: 14,
                transition: 'all 0.3s ease-in-out',
                transform: noForms ? 'translateY(-2px)' : 'none',
                animation: noForms ? `${pulse} 2s infinite` : 'none',
              }}
            >
              Add form
            </Button>
          );
        })()}
      </Box>

      <ConfirmationDialog
        open={confirmDialogOpen}
        title="Confirm Delete"
        message="Are you sure you want to delete this form? This action cannot be undone."
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      <ConfirmationDialog
        open={unsavedChangesDialog}
        title="Unsaved Changes"
        message="You have unsaved changes in your current form. Do you want to proceed and lose these changes?"
        confirmButtonText="Proceed"
        cancelButtonText="Cancel"
        onConfirm={handleConfirmUnsavedChanges}
        onCancel={handleCancelUnsavedChanges}
      />
    </Box>
  );
};
