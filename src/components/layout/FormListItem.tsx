import {
  ListItem,
  ListItemText,
  Box,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import React from 'react';
import type { Form } from '@/types/form';

interface FormListItemProps {
  form: Form;
  isSelected: boolean;
  isLoading: boolean;
  isDeletingThis: boolean;
  currentFormId: string | null;
  draftFormId: string | null;
  updatingFormId: string | null;
  onSelect: (formId: string) => void;
  onDelete: (event: React.MouseEvent, formId: string) => void;
}

export const FormListItem: React.FC<FormListItemProps> = ({
  form,
  isSelected,
  isLoading,
  isDeletingThis,
  currentFormId,
  updatingFormId,
  onSelect,
  onDelete,
}) => {
  const isUpdatingOrDeleting =
    isDeletingThis ||
    updatingFormId === form.id ||
    (isLoading && currentFormId === form.id);

  return (
    <ListItem
      key={form.id}
      onClick={isUpdatingOrDeleting ? undefined : () => onSelect(form.id)}
      sx={{
        borderRadius: 0.5,
        cursor: isUpdatingOrDeleting ? 'default' : 'pointer',
        opacity: isUpdatingOrDeleting ? 0.7 : 1,
        backgroundColor: isSelected ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
        '&:hover': {
          backgroundColor: isSelected
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
          color: isUpdatingOrDeleting ? 'text.disabled' : 'inherit',
          fontSize: 14,
          fontWeight: 600,
        }}
      />
      {isUpdatingOrDeleting && (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress size={18} color="primary" />
        </Box>
      )}
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
          onClick={e => onDelete(e, form.id)}
          disabled={isDeletingThis}
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
  );
};
