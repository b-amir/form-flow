import { Box, Collapse, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { ElementList } from '@/components/form/builder/ElementList';
import { ElementPropertiesEditor } from '@/components/form/builder/ElementPropertiesEditor';
import { LoadingIndicator } from '@/components/common/LoadingIndicator';
import { EmptyIndicator } from '@/components/common/EmptyIndicator';
import type { ApiElement } from '@/types/api';
import {
  MEDIUM_SCREEN_BREAKPOINT,
  ELEMENT_PROPERTIES_WIDTH,
} from '@/constants';

interface FormContentProps {
  elements: ApiElement[];
  selectedElementId: string | null;
  isLoading?: boolean;
  onSelectElement: (id: string | null) => void;
  onDeleteElement: (id: string) => void;
  onReorderElements: (startIndex: number, endIndex: number) => void;
  onUpdateElement: (id: string, updates: Partial<ApiElement>) => void;
  onBackgroundClick?: () => void;
}

export const FormContent: React.FC<FormContentProps> = ({
  elements,
  selectedElementId,
  isLoading = false,
  onSelectElement,
  onDeleteElement,
  onReorderElements,
  onUpdateElement,
  onBackgroundClick,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(MEDIUM_SCREEN_BREAKPOINT);

  const handleBackgroundClick = () => {
    if (onBackgroundClick) {
      onBackgroundClick();
    } else {
      onSelectElement(null);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <LoadingIndicator message="Loading form elements..." />
      </Box>
    );
  }

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
              width: isMediumScreen
                ? ELEMENT_PROPERTIES_WIDTH.COMPACT
                : ELEMENT_PROPERTIES_WIDTH.NORMAL,
              height: '100%',
              borderLeft: 1,
              borderColor: 'divider',
              p: isMediumScreen ? 1.5 : 2,
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
              p: isMediumScreen ? 1.5 : 2,
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
