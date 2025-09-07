import React, { useState } from 'react';
import { Box, Typography, Paper, IconButton, Tooltip } from '@mui/material';
import { ConfirmationDialog } from '@components/common/ConfirmationDialog';
import {
  Delete,
  TextFields,
  CheckBox,
  Emergency,
  DragIndicator,
} from '@mui/icons-material';
import type { Element } from '@/types';
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
import { EmptyIndicator } from '@components/common/EmptyIndicator';

interface ElementListProps {
  elements: Element[];
  selectedElementId: string | null;
  onSelectElement: (id: string) => void;
  onDeleteElement: (id: string) => void;
  onReorderElements?: (startIndex: number, endIndex: number) => void;
  onClick?: (e: React.MouseEvent) => void;
}

interface SortableItemProps {
  element: Element;
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
        border: 1,
        borderColor: isSelected ? 'secondary.main' : 'divider',
        '&:hover': {
          borderColor: 'secondary.main',
          '& .delete-button': {
            opacity: 1,
            visibility: 'visible',
          },
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
            <TextFields fontSize="small" color="primary" />
          ) : element.type === 'checkbox' ? (
            <CheckBox fontSize="small" color="primary" />
          ) : (
            <Emergency fontSize="small" color="error" />
          )}
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: isSelected ? 700 : 500,
              color: isSelected ? 'secondary.dark' : 'text.primary',
              fontSize: 14,
            }}
          >
            {element.label || `Untitled ${element.type}`}
          </Typography>
        </Box>
        <Tooltip title="Delete element">
          <IconButton
            className="delete-button"
            size="small"
            onClick={e => {
              e.stopPropagation();
              onDelete(element.id);
            }}
            sx={{
              color: 'error.main',
              opacity: 0,
              visibility: 'hidden',
              transition: 'opacity 0.2s ease, visibility 0.2s ease',
            }}
          >
            <Delete fontSize="small" />
          </IconButton>
        </Tooltip>
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
      setElementToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setElementToDelete(null);
    setDeleteDialogOpen(false);
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
    <Box
      sx={{
        pb: 3,
        px: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      onClick={onClick}
    >
      <Typography variant="h6" gutterBottom sx={{ mb: 1 }}>
        Form Elements
      </Typography>
      <Typography
        gutterBottom
        sx={{
          mb: 2,
          fontWeight: 400,
          fontSize: 12,
          color: 'neutral.light',
        }}
      >
        Select an element to edit properties{' '}
      </Typography>

      {elements.length === 0 ? (
        <EmptyIndicator
          message="No elements added yet"
          subtitle="Select an element type from the toolbar above"
        />
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
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                flex: 1,
                minHeight: 0,
                overflowY: 'auto',
                maxHeight: '78dvh',
                pb: { xs: 16, sm: 2 },
                px: 1,
                pr: 2,
              }}
            >
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
