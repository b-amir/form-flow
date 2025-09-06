import { Box, IconButton, InputBase, Collapse } from '@mui/material';
import { Save } from '@mui/icons-material';
import { ElementList } from '../ElementList';
import { ElementPropertiesEditor } from '../ElementPropertiesEditor';
import { useFormBuilderStore } from '@/features/form-management/stores/formBuilderStore';
import { ElementSelectionRow } from './ElementSelectionRow';
import { useEffect, useRef } from 'react';
import { EmptyIndicator } from '../EmptyIndicator';

const HEADER_HEIGHT = 64;

export const FormBuilderPanel = () => {
  const { draftForm, selectedElementId, setFormName, reorderElements } =
    useFormBuilderStore();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (draftForm.name === '' && draftForm.elements.length === 0) {
      inputRef.current?.focus();
    }
  }, [draftForm.name, draftForm.elements.length]);

  const handleBackgroundClick = () => {
    useFormBuilderStore.getState().selectElement(null);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          height: HEADER_HEIGHT,
          minHeight: HEADER_HEIGHT,
          display: 'flex',
          alignItems: 'center',
          px: 2,
          borderBottom: 1,
          borderColor: 'divider',
          boxShadow: 4,
        }}
      >
        <InputBase
          inputRef={inputRef}
          value={draftForm.name}
          onChange={e => setFormName(e.target.value)}
          placeholder="Form Name"
          sx={{
            fontSize: 'h3.fontSize',
            fontWeight: 'h3.fontWeight',
            flexGrow: 1,
          }}
        />
        <IconButton>
          <Save />
        </IconButton>
      </Box>

      <ElementSelectionRow />

      {draftForm.elements.length === 0 ? (
        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          <EmptyIndicator
            message="No elements added yet"
            subtitle="Click an element type above to start building your form"
          />
        </Box>
      ) : (
        <Box
          sx={{ flexGrow: 1, display: 'flex' }}
          onClick={handleBackgroundClick}
        >
          <Box
            sx={{
              flexGrow: 1,
              overflow: 'auto',
              p: 2,
              backgroundColor: 'neutral.pale',
            }}
          >
            <ElementList
              elements={draftForm.elements}
              selectedElementId={selectedElementId}
              onSelectElement={id =>
                useFormBuilderStore.getState().selectElement(id)
              }
              onDeleteElement={id =>
                useFormBuilderStore.getState().removeElement(id)
              }
              onReorderElements={reorderElements}
              onClick={e => e.stopPropagation()}
            />
          </Box>
          <Collapse
            in={Boolean(selectedElementId)}
            orientation="horizontal"
            sx={{ display: 'flex' }}
          >
            <Box
              sx={{
                width: 300,
                height: '100%',
                borderLeft: 1,
                borderColor: 'divider',
                p: 2,
                overflow: 'auto',
                backgroundColor: 'neutral.darkerPale',
              }}
              onClick={e => e.stopPropagation()}
            >
              <ElementPropertiesEditor
                element={
                  draftForm.elements.find(el => el.id === selectedElementId) ||
                  null
                }
                allElements={draftForm.elements}
                onUpdateElement={(id, updates) =>
                  useFormBuilderStore.getState().updateElement(id, updates)
                }
              />
            </Box>
          </Collapse>
        </Box>
      )}
    </Box>
  );
};
