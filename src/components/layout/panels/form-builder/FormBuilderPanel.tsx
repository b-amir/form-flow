import { Box } from '@mui/material';
import { useFormStore } from '@/features/form-management/stores/formStore';
import { ElementSelectionRow } from './ElementSelectionRow';
import { useEffect, useState } from 'react';
import { FormBuilderHeader } from './FormBuilderHeader';
import { FormContent } from './FormContent';
import { FormNotifications } from '../../../form/ui/FormNotifications';
import { useFormNameInputRef } from '@/hooks';

export const FormBuilderPanel = () => {
  const {
    draftForm,
    selectedElementId,
    setFormName,
    reorderElements,
    setIsDirty,
    isDirty,
    updateForm,
    createForm,
    selectElement,
    removeElement,
    updateElement,
  } = useFormStore();
  const inputRef = useFormNameInputRef();
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    if (draftForm.name === '' && draftForm.elements.length === 0) {
      inputRef.current?.focus();
    }
  }, [draftForm.name, draftForm.elements.length, inputRef]);

  const handleBackgroundClick = () => {
    selectElement(null);
  };

  const handleSave = async () => {
    try {
      if (!draftForm.name.trim()) {
        setSaveError('Form name is required');
        return;
      }

      if (draftForm.id === 'draft') {
        await createForm(draftForm.name, draftForm.elements);
      } else {
        await updateForm(draftForm.id, {
          name: draftForm.name,
          elements: draftForm.elements,
        });
      }

      setIsDirty(false);
      setSaveSuccess(true);
    } catch (error) {
      setSaveError(
        error instanceof Error ? error.message : 'Failed to save form'
      );
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <FormBuilderHeader
        formName={draftForm.name}
        inputRef={inputRef}
        onFormNameChange={setFormName}
        onSave={handleSave}
        isSaveDisabled={!draftForm.name.trim()}
        isDirty={isDirty}
      />

      <ElementSelectionRow />

      <FormContent
        elements={draftForm.elements}
        selectedElementId={selectedElementId}
        isLoading={false}
        onSelectElement={selectElement}
        onDeleteElement={removeElement}
        onReorderElements={(startIndex, endIndex) => {
          reorderElements(startIndex, endIndex);
          setIsDirty(true);
        }}
        onUpdateElement={updateElement}
        onBackgroundClick={handleBackgroundClick}
      />

      <FormNotifications
        saveSuccess={saveSuccess}
        saveError={saveError}
        onSaveSuccessClose={() => setSaveSuccess(false)}
        onSaveErrorClose={() => setSaveError(null)}
        errorMessage={saveError}
      />
    </Box>
  );
};
