import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { useFormStore } from '@/features/form-management/stores/formStore';
import { useFormBuilderStore } from '@/features/form-management/stores/formBuilderStore';
import React, { useEffect, useState } from 'react';
import { ConfirmationDialog } from '../ConfirmationDialog';
import { EmptyIndicator } from '../EmptyIndicator';

const HEADER_HEIGHT = 64;

export const FormsListPanel = () => {
  const { forms, fetchForms, createForm, deleteForm } = useFormStore();
  const { updateFormName, updateElements, clearDraftForm } =
    useFormBuilderStore();
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [formToDelete, setFormToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchForms();
  }, [fetchForms]);

  const handleSelectForm = (formId: string) => {
    const form = forms.find(f => f.id === formId);
    if (form) {
      updateFormName(form.name);
      updateElements(form.elements);
      setSelectedFormId(formId);
    }
  };

  const handleAddForm = () => {
    clearDraftForm();
    createForm('New Form', []);
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
          clearDraftForm();
        }
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
      <Box
        sx={{
          height: HEADER_HEIGHT,
          minHeight: HEADER_HEIGHT,
          display: 'flex',
          alignItems: 'center',
          px: 2,
          borderBottom: 1,
          borderColor: 'divider',
          boxShadow: 4,
        }}
      >
        <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
          Forms
        </Typography>
        <IconButton onClick={handleAddForm}>
          <Add />
        </IconButton>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          position: 'relative',
          p: forms.length === 0 ? 2 : 0,
        }}
      >
        {forms.length === 0 ? (
          <EmptyIndicator
            message="No forms available"
            subtitle="Click the + button to create a new form"
          />
        ) : (
          <List>
            {forms.map(form => (
              <ListItem
                key={form.id}
                onClick={() => handleSelectForm(form.id)}
                sx={{
                  cursor: 'pointer',
                  backgroundColor:
                    selectedFormId === form.id
                      ? 'rgba(0, 0, 0, 0.04)'
                      : 'transparent',
                  '&:hover': {
                    backgroundColor:
                      selectedFormId === form.id
                        ? 'rgba(0, 0, 0, 0.08)'
                        : 'rgba(0, 0, 0, 0.04)',
                  },
                  '& .delete-button': {
                    display: 'none',
                  },
                  '&:hover .delete-button': {
                    display: 'flex',
                  },
                }}
              >
                <ListItemText
                  primary={form.name}
                  primaryTypographyProps={{
                    noWrap: true,
                    title: form.name,
                  }}
                />
                <Box
                  sx={{
                    visibility: 'hidden',
                    '.MuiListItem-root:hover &': {
                      visibility: 'visible',
                    },
                  }}
                >
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={e => handleDeleteClick(e, form.id)}
                    disabled={deletingId === form.id}
                    size="small"
                    sx={{
                      color: 'error.main',
                      opacity: 0,
                      '.MuiBox-root:hover &': {
                        opacity: 1,
                      },
                      '&:hover': {
                        color: 'error.main',
                        opacity: 0.9,
                      },
                    }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
        )}
      </Box>

      <ConfirmationDialog
        open={confirmDialogOpen}
        title="Confirm Delete"
        message="Are you sure you want to delete this form? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </Box>
  );
};
