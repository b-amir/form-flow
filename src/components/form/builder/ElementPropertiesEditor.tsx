import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import type { ApiElement, ConditionalLogic } from '@/types';
import { ConditionalLogicBuilder } from './ConditionalLogicBuilder';
import { BasicProperties } from '../../element-properties/BasicProperties';
import { ValidationSettings } from '../../element-properties/ValidationSettings';

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
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{ fontSize: '0.95rem' }}
        >
          Element Properties
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: '0.85rem' }}
        >
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
        gap: 1,
        p: 1,
        fontSize: '0.9rem',
      }}
    >
      <Typography
        variant="subtitle2"
        gutterBottom
        sx={{ fontSize: '0.8rem', fontWeight: 500 }}
      >
        Element Properties
      </Typography>

      <BasicProperties element={element} onUpdateElement={onUpdateElement} />

      {element.type === 'text' ? (
        <>
          <Divider sx={{ my: 1 }} />
          <Typography
            variant="subtitle2"
            gutterBottom
            sx={{ fontSize: '0.9rem', fontWeight: 500 }}
          >
            Validation Settings
          </Typography>
          <ValidationSettings
            element={element}
            onUpdateElement={onUpdateElement}
          />
        </>
      ) : (
        <Divider sx={{ my: 1 }} />
      )}

      <ConditionalLogicBuilder
        element={element}
        allElements={allElements}
        onUpdateConditionalLogic={handleConditionalLogicChange}
      />
    </Box>
  );
};
