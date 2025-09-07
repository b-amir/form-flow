import { Box, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { Drawer } from 'vaul';
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
  const isSmallScreen = useMediaQuery('(max-width: 1200px)');

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
          flexShrink: 1,
          overflow: 'auto',
          p: 2,
          backgroundColor: 'neutral.pale',
          height: '100%',
          transition: 'all 0.3s ease-in-out',
          minWidth: { xs: '280px', sm: '320px' },
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
        <Box
          sx={{
            width: selectedElementId
              ? isSmallScreen
                ? ELEMENT_PROPERTIES_WIDTH.EXPANDED_COMPACT
                : ELEMENT_PROPERTIES_WIDTH.EXPANDED
              : 0,
            maxWidth: { xs: '90vw', sm: '450px' },
            height: '100%',
            borderLeft: selectedElementId ? 1 : 0,
            borderColor: 'divider',
            p: selectedElementId ? (isMediumScreen ? 1.5 : 2) : 0,
            overflow: 'hidden',
            backgroundColor: 'neutral.darkerPale',
            transition:
              'width 0.3s ease-in-out, padding 0.3s ease-in-out, border-left 0.3s ease-in-out, opacity 0.3s ease-in-out',
            flexShrink: 0,
            opacity: selectedElementId ? 1 : 0,
            position: 'relative',
            zIndex: 1,
          }}
          onClick={e => e.stopPropagation()}
        >
          {selectedElementId && (
            <Box
              sx={{
                height: '100%',
                overflow: 'auto',
                width: '100%',
              }}
            >
              <ElementPropertiesEditor
                element={
                  elements.find(el => el.id === selectedElementId) || null
                }
                allElements={elements}
                onUpdateElement={onUpdateElement}
              />
            </Box>
          )}
        </Box>
      )}

      {isMobile && (
        <Drawer.Root
          open={Boolean(selectedElementId)}
          onOpenChange={(open: boolean) => {
            if (!open) {
              onSelectElement(null);
            }
          }}
          direction="bottom"
          snapPoints={['70vh', '100vh']}
          activeSnapPoint={0}
          setActiveSnapPoint={() => {}}
        >
          <Drawer.Portal>
            <Drawer.Overlay
              style={{
                background: 'rgba(0, 0, 0, 0.4)',
                position: 'fixed',
                inset: 0,
                zIndex: 1000,
              }}
            />
            <Drawer.Content
              style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                paddingTop: '1rem',
                background: theme.palette.background.paper,
                borderTopLeftRadius: '16px',
                borderTopRightRadius: '16px',
                zIndex: 9998,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: theme.shadows[9],
                borderTop: `1px solid ${theme.palette.primary.lighter}`,
                height: '70vh',
                maxHeight: '100vh',
                overflow: 'hidden',
              }}
              onClick={e => e.stopPropagation()}
            >
              <Box
                sx={{
                  flex: 1,
                  overflow: 'auto',
                  padding: '0 16px 80px 16px',
                  minHeight: 0,
                }}
                onClick={e => e.stopPropagation()}
              >
                <ElementPropertiesEditor
                  element={
                    elements.find(el => el.id === selectedElementId) || null
                  }
                  allElements={elements}
                  onUpdateElement={onUpdateElement}
                  onClose={() => onSelectElement(null)}
                />
              </Box>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      )}
    </Box>
  );
};
