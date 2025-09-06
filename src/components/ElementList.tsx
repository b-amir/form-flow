import React, { useState } from 'react';
import { Box, Typography, Paper, IconButton, Tooltip } from '@mui/material';
import { ConfirmationDialog } from './ConfirmationDialog';
import { Delete, TextFields, CheckBox, Emergency } from '@mui/icons-material';
import type { ApiElement } from '@/types/api';

interface ElementListProps {
  elements: ApiElement[];
  selectedElementId: string | null;
  onSelectElement: (id: string) => void;
  onDeleteElement: (id: string) => void;
  onClick?: (e: React.MouseEvent) => void;
}

export const ElementList: React.FC<ElementListProps> = ({
  elements = [],
  selectedElementId,
  onSelectElement,
  onDeleteElement,
  onClick,
}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [elementToDelete, setElementToDelete] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setElementToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (elementToDelete) {
      onDeleteElement(elementToDelete);
      setDeleteDialogOpen(false);
      setElementToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setElementToDelete(null);
  };

  return (
    <Box sx={{ pb: 2, px: 2 }} onClick={onClick}>
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        Form Elements
      </Typography>

      {elements.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No elements added yet. Select an element type from the left panel.
        </Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {elements.map(element => (
            <Paper
              key={element.id}
              elevation={selectedElementId === element.id ? 2 : 1}
              sx={{
                p: 1.5,
                backgroundColor:
                  selectedElementId === element.id
                    ? 'secondary.lighter'
                    : 'background.default',
                cursor: 'pointer',
                border: selectedElementId === element.id ? 2 : 1,
                borderColor:
                  selectedElementId === element.id
                    ? 'secondary.main'
                    : 'divider',
                '&:hover': {
                  borderColor: 'secondary.main',
                },
              }}
              onClick={() => onSelectElement(element.id)}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {element.type === 'text' ? (
                    <TextFields fontSize="small" color="secondary" />
                  ) : (
                    <CheckBox fontSize="small" color="secondary" />
                  )}
                  <Box>
                    <Box
                      sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                    >
                      <Typography variant="body2" fontWeight="medium">
                        {element.label}
                      </Typography>
                      {element.isRequired && (
                        <Tooltip title="Required field">
                          <Emergency
                            fontSize="small"
                            color="error"
                            sx={{ width: 16, height: 16 }}
                          />
                        </Tooltip>
                      )}
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {element.type === 'text' ? 'Text Field' : 'Checkbox'}
                    </Typography>
                  </Box>
                </Box>

                <IconButton
                  size="small"
                  onClick={e => {
                    e.stopPropagation();
                    handleDeleteClick(element.id);
                  }}
                  sx={{
                    color: 'error.main',
                    opacity: 0,
                    '.MuiPaper-root:hover &': {
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
            </Paper>
          ))}
        </Box>
      )}

      <ConfirmationDialog
        open={deleteDialogOpen}
        title="Confirm Delete"
        message="Are you sure you want to delete this element? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </Box>
  );
};
