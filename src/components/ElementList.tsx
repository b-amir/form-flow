import React, { useState } from 'react';
import { Box, Typography, Paper, IconButton, Tooltip } from '@mui/material';
import { ConfirmationDialog } from './ConfirmationDialog';
import {
  Delete,
  TextFields,
  CheckBox,
  Emergency,
  DragIndicator,
} from '@mui/icons-material';
import type { ApiElement } from '@/types/api';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface ElementListProps {
  elements: ApiElement[];
  selectedElementId: string | null;
  onSelectElement: (id: string) => void;
  onDeleteElement: (id: string) => void;
  onReorderElements?: (startIndex: number, endIndex: number) => void;
  onClick?: (e: React.MouseEvent) => void;
}

interface SortableItemProps {
  element: ApiElement;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

const SortableItem: React.FC<SortableItemProps> = ({
  element,
  isSelected,
  onSelect,
  onDelete,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: element.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <Paper
      ref={setNodeRef}
      elevation={isSelected ? 2 : 1}
      sx={{
        p: 1.5,
        backgroundColor: isSelected
          ? 'secondary.lighter'
          : 'background.default',
        cursor: 'pointer',
        border: isSelected ? 2 : 1,
        borderColor: isSelected ? 'secondary.main' : 'divider',
        '&:hover': {
          borderColor: 'secondary.main',
        },
        ...style,
      }}
      onClick={() => onSelect(element.id)}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            {...attributes}
            {...listeners}
            sx={{
              cursor: 'grab',
              display: 'flex',
              alignItems: 'center',
              color: 'text.secondary',
              '&:hover': { color: 'primary.main' },
            }}
          >
            <DragIndicator fontSize="small" />
          </Box>
          {element.type === 'text' ? (
            <TextFields fontSize="small" color="secondary" />
          ) : (
            <CheckBox fontSize="small" color="secondary" />
          )}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
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
            onDelete(element.id);
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
  );
};

export const ElementList: React.FC<ElementListProps> = ({
  elements = [],
  selectedElementId,
  onSelectElement,
  onDeleteElement,
  onReorderElements,
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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = elements.findIndex(element => element.id === active.id);
      const newIndex = elements.findIndex(element => element.id === over.id);

      if (onReorderElements) {
        onReorderElements(oldIndex, newIndex);
      }
    }
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
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={elements.map(element => element.id)}
            strategy={verticalListSortingStrategy}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {elements.map(element => (
                <SortableItem
                  key={element.id}
                  element={element}
                  isSelected={selectedElementId === element.id}
                  onSelect={onSelectElement}
                  onDelete={handleDeleteClick}
                />
              ))}
            </Box>
          </SortableContext>
        </DndContext>
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
