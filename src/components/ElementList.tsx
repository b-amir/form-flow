import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import type { ApiElement } from '@/types/api';

interface ElementListProps {
  elements: ApiElement[];
  selectedElementId: string | null;
  onSelectElement: (id: string) => void;
  onDeleteElement: (id: string) => void;
}

export const ElementList: React.FC<ElementListProps> = ({
  elements,
  selectedElementId,
  onSelectElement,
  onDeleteElement,
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
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
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
                cursor: 'pointer',
                border: selectedElementId === element.id ? 2 : 1,
                borderColor:
                  selectedElementId === element.id ? 'primary.main' : 'divider',
                '&:hover': {
                  borderColor: 'primary.main',
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
                <Box>
                  <Typography variant="body2" fontWeight="medium">
                    {element.label}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {element.type === 'text' ? 'Text Field' : 'Checkbox'}
                    {element.isRequired && ' • Required'}
                  </Typography>
                </Box>

                <IconButton
                  size="small"
                  color="error"
                  onClick={e => {
                    e.stopPropagation();
                    handleDeleteClick(element.id);
                  }}
                  sx={{ ml: 1 }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Box>
            </Paper>
          ))}
        </Box>
      )}

      <Dialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Are you sure you want to delete this element? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
