import { Box, Collapse, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { ElementList } from '../ElementList';
import { ElementPropertiesEditor } from '../ElementPropertiesEditor';
import { EmptyIndicator } from '../EmptyIndicator';
import type { ApiElement } from '@/types/api';

interface FormContentProps {
  elements: ApiElement[];
  selectedElementId: string | null;
  onSelectElement: (id: string | null) => void;
  onDeleteElement: (id: string) => void;
  onReorderElements: (startIndex: number, endIndex: number) => void;
  onUpdateElement: (id: string, updates: Partial<ApiElement>) => void;
  onBackgroundClick?: () => void;
}

export const FormContent: React.FC<FormContentProps> = ({
  elements,
  selectedElementId,
  onSelectElement,
  onDeleteElement,
  onReorderElements,
  onUpdateElement,
  onBackgroundClick,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleBackgroundClick = () => {
    if (onBackgroundClick) {
      onBackgroundClick();
    } else {
      onSelectElement(null);
    }
  };

  if (elements.length === 0) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <EmptyIndicator
          message="No elements added yet"
          subtitle="Click an element type above to start building your form"
        />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
      }}
      onClick={handleBackgroundClick}
    >
      <Box
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          p: 2,
          backgroundColor: 'neutral.pale',
          height: isMobile && selectedElementId ? '50%' : '100%',
        }}
      >
        <ElementList
          elements={elements}
          selectedElementId={selectedElementId}
          onSelectElement={onSelectElement}
          onDeleteElement={onDeleteElement}
          onReorderElements={onReorderElements}
          onClick={e => e.stopPropagation()}
        />
      </Box>

      {!isMobile && (
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
              element={elements.find(el => el.id === selectedElementId) || null}
              allElements={elements}
              onUpdateElement={onUpdateElement}
            />
          </Box>
        </Collapse>
      )}

      {isMobile && (
        <Collapse
          in={Boolean(selectedElementId)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: selectedElementId ? '50%' : 0,
          }}
        >
          <Box
            sx={{
              height: '100%',
              borderTop: 1,
              borderColor: 'divider',
              p: 2,
              overflow: 'auto',
              backgroundColor: 'neutral.darkerPale',
            }}
            onClick={e => e.stopPropagation()}
          >
            <ElementPropertiesEditor
              element={elements.find(el => el.id === selectedElementId) || null}
              allElements={elements}
              onUpdateElement={onUpdateElement}
            />
          </Box>
        </Collapse>
      )}
    </Box>
  );
};
