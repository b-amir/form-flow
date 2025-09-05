import React from 'react';
import { Box } from '@mui/material';
import { ElementSelectionPanel } from './ElementSelectionPanel';
import { FormPropertiesPanel } from './FormPropertiesPanel';
import { ElementPropertiesEditor } from './ElementPropertiesEditor';
import { ElementList } from './ElementList';
import { useFormBuilderStore } from '@/features/form-management/stores/formBuilderStore';
import type { ApiElement } from '@/types/api';

export const FormBuilderLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
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

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
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
      <Box sx={{ flex: 1, p: 2 }}>
        <ElementList
          elements={draftForm.elements}
          selectedElementId={selectedElementId}
          onSelectElement={handleSelectElementInList}
          onDeleteElement={handleDeleteElement}
        />
        {children}
      </Box>
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
    </Box>
  );
};
