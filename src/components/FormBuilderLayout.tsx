import React, { useState } from 'react';
import { Box, Button, Typography, Snackbar, Alert } from '@mui/material';
import { Visibility, Edit, Save, ArrowBack } from '@mui/icons-material';
import { ElementSelectionPanel } from './ElementSelectionPanel';
import { FormPropertiesPanel } from './FormPropertiesPanel';
import { ElementPropertiesEditor } from './ElementPropertiesEditor';
import { ElementList } from './ElementList';
import { FormRenderer } from './FormRenderer';
import { useFormBuilderStore } from '@/features/form-management/stores/formBuilderStore';
import { formApi } from '@/services/api';
import type { ApiElement } from '@/types/api';

interface FormBuilderLayoutProps {
  children?: React.ReactNode;
  onBackToList?: () => void;
}

export const FormBuilderLayout: React.FC<FormBuilderLayoutProps> = ({
  children,
  onBackToList,
}) => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

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

  const handleSaveForm = async () => {
    if (!draftForm.name.trim()) {
      setSaveError('Please enter a form name before saving.');
      return;
    }

    if (draftForm.elements.length === 0) {
      setSaveError('Please add at least one element before saving.');
      return;
    }

    setIsSaving(true);
    setSaveError(null);

    try {
      await formApi.createForm({
        name: draftForm.name,
        elements: draftForm.elements,
      });
      setShowSuccessMessage(true);
    } catch (error) {
      setSaveError(
        error instanceof Error ? error.message : 'Failed to save form'
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleCloseSuccessMessage = () => {
    setShowSuccessMessage(false);
  };

  const handleCloseErrorMessage = () => {
    setSaveError(null);
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {onBackToList && (
              <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={onBackToList}
              >
                Back to Forms
              </Button>
            )}
            <Typography variant="h6">Form Builder</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              startIcon={<Save />}
              onClick={handleSaveForm}
              disabled={isSaving}
              color="success"
            >
              {isSaving ? 'Saving...' : 'Save Form'}
            </Button>
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

      <Snackbar
        open={showSuccessMessage}
        autoHideDuration={4000}
        onClose={handleCloseSuccessMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSuccessMessage}
          severity="success"
          sx={{ width: '100%' }}
        >
          Form saved successfully!
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!saveError}
        autoHideDuration={6000}
        onClose={handleCloseErrorMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseErrorMessage}
          severity="error"
          sx={{ width: '100%' }}
        >
          {saveError}
        </Alert>
      </Snackbar>
    </Box>
  );
};
