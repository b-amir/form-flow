import { Box, List } from '@mui/material';
import React from 'react';
import type { Form } from '@/types/form';
import { EmptyIndicator } from '../EmptyIndicator';
import { FormListItem } from './FormListItem';

interface FormsListProps {
  forms: Form[];
  selectedFormId: string | null;
  isLoading: boolean;
  currentFormId: string | null;
  draftFormId: string | null;
  deletingId: string | null;
  onSelectForm: (formId: string) => void;
  onDeleteClick: (event: React.MouseEvent, formId: string) => void;
}

export const FormsList: React.FC<FormsListProps> = ({
  forms,
  selectedFormId,
  isLoading,
  currentFormId,
  draftFormId,
  deletingId,
  onSelectForm,
  onDeleteClick,
}) => {
  return (
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
            <FormListItem
              key={form.id}
              form={form}
              isSelected={selectedFormId === form.id}
              isLoading={isLoading}
              isDeletingThis={deletingId === form.id}
              currentFormId={currentFormId}
              draftFormId={draftFormId}
              onSelect={onSelectForm}
              onDelete={onDeleteClick}
            />
          ))}
        </List>
      )}
    </Box>
  );
};
