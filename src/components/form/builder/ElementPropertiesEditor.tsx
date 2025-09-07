import React from 'react';
import {
  Box,
  Typography,
  Divider,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import type { Element, ConditionalLogic } from '@/types';
import { ConditionalLogicBuilder } from '@components/form/builder/ConditionalLogicBuilder';
import { BasicProperties } from '@components/element-properties/BasicProperties';
import { ValidationSettings } from '@components/element-properties/ValidationSettings';

interface ElementPropertiesEditorProps {
  element: Element | null;
  allElements: Element[];
  onUpdateElement: (id: string, updates: Partial<Element>) => void;
  onClose?: () => void;
}

export const ElementPropertiesEditor: React.FC<
  ElementPropertiesEditorProps
> = ({ element, allElements, onUpdateElement, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  if (!element) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          width: '100%',
          maxWidth: '100%',
          overflow: 'hidden',
        }}
      >
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
    onUpdateElement(element.id, { conditionalLogic } as Partial<Element>);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        p: isMobile ? 0 : 1,
        pb: isMobile ? 2 : undefined,
        fontSize: '0.9rem',
        width: '100%',
        maxWidth: '100%',
        minHeight: isMobile ? 'auto' : 'auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 1,
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ fontSize: '0.8rem', fontWeight: 500 }}
        >
          Element Properties
        </Typography>
        {isMobile && onClose && (
          <IconButton
            size="small"
            onClick={onClose}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <Close fontSize="small" />
          </IconButton>
        )}
      </Box>

      <BasicProperties element={element} onUpdateElement={onUpdateElement} />

      {element.type === 'text' && (
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
      )}

      <ConditionalLogicBuilder
        element={element}
        allElements={allElements}
        onUpdateConditionalLogic={handleConditionalLogicChange}
      />
    </Box>
  );
};
