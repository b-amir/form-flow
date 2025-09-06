import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import type { ApiElement } from '@/types/api';
import type { ConditionalLogic } from '@/types/api';
import { ConditionalLogicBuilder } from './ConditionalLogicBuilder';
import { BasicProperties } from './element-properties/BasicProperties';
import { ValidationSettings } from './element-properties/ValidationSettings';

interface ElementPropertiesEditorProps {
  element: ApiElement | null;
  allElements: ApiElement[];
  onUpdateElement: (id: string, updates: Partial<ApiElement>) => void;
}

export const ElementPropertiesEditor: React.FC<
  ElementPropertiesEditorProps
> = ({ element, allElements, onUpdateElement }) => {
  if (!element) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h6" gutterBottom>
          Element Properties
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Select an element to edit its properties
        </Typography>
      </Box>
    );
  }

  const handleConditionalLogicChange = (
    conditionalLogic: ConditionalLogic | undefined
  ) => {
    onUpdateElement(element.id, { conditionalLogic } as Partial<ApiElement>);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Element Properties
      </Typography>

      <BasicProperties element={element} onUpdateElement={onUpdateElement} />

      {element.type === 'text' ? (
        <>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>
            Validation Settings
          </Typography>
          <ValidationSettings
            element={element}
            onUpdateElement={onUpdateElement}
          />
        </>
      ) : (
        <Divider sx={{ my: 2 }} />
      )}

      <ConditionalLogicBuilder
        element={element}
        allElements={allElements}
        onUpdateConditionalLogic={handleConditionalLogicChange}
      />
    </Box>
  );
};
