import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useFormStore } from '@/features/form-management/stores/formStore';
import { useFormBuilderStore } from '@/features/form-management/stores/formBuilderStore';
import { ConfirmationDialog } from '../ConfirmationDialog';
import { FormsHeader } from './FormsHeader';
import { FormsList } from './FormsList';

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

  const executeAddForm = () => {
    useFormBuilderStore.getState().initDraftForm();
    setSelectedFormId(null);
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
      <FormsHeader onAddForm={handleAddForm} />

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
