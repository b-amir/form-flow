import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Visibility, Edit } from '@mui/icons-material';
import { ElementSelectionPanel } from './ElementSelectionPanel';
import { FormPropertiesPanel } from './FormPropertiesPanel';
import { ElementPropertiesEditor } from './ElementPropertiesEditor';
import { ElementList } from './ElementList';
import { FormRenderer } from './FormRenderer';
import { useFormBuilderStore } from '@/features/form-management/stores/formBuilderStore';
import type { ApiElement } from '@/types/api';

export const FormBuilderLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const {
    draftForm,
    selectedElementId,
    setFormName,
    addElement,
    updateElement,
    removeElement,
    selectElement,
  } = useFormBuilderStore();

  const selectedElement =
    draftForm.elements.find(element => element.id === selectedElementId) ||
    null;

  const handleSelectElement = (type: 'text' | 'checkbox') => {
    const newElement: ApiElement = {
      id: `element_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      label: `New ${type === 'text' ? 'Text Field' : 'Checkbox'}`,
      isRequired: false,
    };
    addElement(newElement);
  };

  const handleUpdateElement = (id: string, updates: Partial<ApiElement>) => {
    updateElement(id, updates);
  };

  const handleDeleteElement = (id: string) => {
    removeElement(id);
  };

  const handleSelectElementInList = (id: string) => {
    selectElement(id);
  };

  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      <Box sx={{ p: 2, borderBottom: '1px solid #eee', bgcolor: '#f5f5f5' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6">Form Builder</Typography>
          <Button
            variant={isPreviewMode ? 'outlined' : 'contained'}
            startIcon={isPreviewMode ? <Edit /> : <Visibility />}
            onClick={togglePreviewMode}
            color={isPreviewMode ? 'primary' : 'secondary'}
          >
            {isPreviewMode ? 'Edit Mode' : 'Preview Mode'}
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {!isPreviewMode && (
          <Box
            sx={{
              width: 240,
              p: 2,
              borderRight: '1px solid #eee',
              bgcolor: '#fafafa',
            }}
          >
            <ElementSelectionPanel onSelectElement={handleSelectElement} />
          </Box>
        )}

        <Box sx={{ flex: 1, p: 2, overflow: 'auto' }}>
          {isPreviewMode ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <FormRenderer form={draftForm} />
            </Box>
          ) : (
            <>
              <ElementList
                elements={draftForm.elements}
                selectedElementId={selectedElementId}
                onSelectElement={handleSelectElementInList}
                onDeleteElement={handleDeleteElement}
              />
              {children}
            </>
          )}
        </Box>

        {!isPreviewMode && (
          <Box
            sx={{
              width: 320,
              p: 2,
              borderLeft: '1px solid #eee',
              bgcolor: '#fafafa',
            }}
          >
            {selectedElement ? (
              <ElementPropertiesEditor
                element={selectedElement}
                onUpdateElement={handleUpdateElement}
              />
            ) : (
              <FormPropertiesPanel
                formName={draftForm.name}
                onFormNameChange={setFormName}
              />
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};
