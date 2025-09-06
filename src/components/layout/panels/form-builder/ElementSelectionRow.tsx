import {
  Box,
  Button,
  IconButton,
  Typography,
  useMediaQuery,
} from '@mui/material';
import {
  TextFields,
  CheckBox,
  Visibility,
  FullscreenExit,
} from '@mui/icons-material';
import { useFormBuilderStore } from '@/features/form-management/stores/formBuilderStore';
import { useState } from 'react';
import type { ApiElement } from '@/types/api';
import { FormRenderer } from '../../../form/renderer/FormRenderer';

export const ElementSelectionRow = () => {
  const { addElement, draftForm } = useFormBuilderStore();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const isSmallScreen = useMediaQuery(`(max-width:1390px)`);
  const isMobile = useMediaQuery(`(max-width:600px)`);

  const handleSelectElement = (type: 'text' | 'checkbox') => {
    const newElement: ApiElement = {
      id: `element_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      label: `New ${type === 'text' ? 'Text Field' : 'Checkbox'}`,
      isRequired: false,
    };
    addElement(newElement);
  };

  const handleFullscreenToggle = () => {
    setIsFullscreen(true);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          p: 2,
          borderBottom: 1,
          borderColor: 'divider',
          px: 4,
          zIndex: 2,
          minHeight: 64,
          boxShadow: 2,
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            size="small"
            onClick={() => handleSelectElement('text')}
            sx={{
              minWidth: isMobile ? '40px' : 'auto',
              '& .MuiButton-startIcon': {
                margin: isMobile ? 0 : undefined,
              },
            }}
            startIcon={<TextFields />}
            aria-label="Add Text Field"
          >
            {!isMobile && 'Add Text Field'}
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => handleSelectElement('checkbox')}
            sx={{
              minWidth: isMobile ? '40px' : 'auto',
              '& .MuiButton-startIcon': {
                margin: isMobile ? 0 : undefined,
              },
            }}
            startIcon={<CheckBox />}
            aria-label="Add Checkbox"
          >
            {!isMobile && 'Add Checkbox'}
          </Button>
        </Box>
        {isSmallScreen && (
          <Button
            variant="outlined"
            size="small"
            onClick={handleFullscreenToggle}
            sx={{
              minWidth: isMobile ? '40px' : 'auto',
              '& .MuiButton-startIcon': {
                margin: isMobile ? 0 : undefined,
              },
            }}
            startIcon={<Visibility />}
            aria-label="Preview form"
          >
            {!isMobile && 'Preview'}
          </Button>
        )}
      </Box>

      {isFullscreen && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            bgcolor: 'white',
            zIndex: 1300,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              height: 80,
              minHeight: 80,
              display: 'flex',
              alignItems: 'center',
              px: 2,
              borderBottom: 1,
              borderColor: 'divider',
              boxShadow: 4,
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h3">Preview: {draftForm?.name}</Typography>
            </Box>
            <IconButton onClick={() => setIsFullscreen(false)}>
              <FullscreenExit />
            </IconButton>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              overflow: 'auto',
              p: 2,
            }}
          >
            <FormRenderer form={draftForm} onSubmit={() => {}} />
          </Box>
        </Box>
      )}
    </>
  );
};
