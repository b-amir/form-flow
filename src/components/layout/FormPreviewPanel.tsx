import { Box, Typography, IconButton } from '@mui/material';
import { Fullscreen, FullscreenExit } from '@mui/icons-material';
import { FormRenderer } from '../FormRenderer';
import { useFormBuilderStore } from '@/features/form-management/stores/formBuilderStore';
import { useState } from 'react';

const HEADER_HEIGHT = 64;

export const FormPreviewPanel = () => {
  const { draftForm } = useFormBuilderStore();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          height: HEADER_HEIGHT,
          display: 'flex',
          alignItems: 'center',
          px: 2,
          borderBottom: 1,
          borderColor: 'divider',
          ...(isFullscreen && {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 1301,
            bgcolor: 'white',
          }),
        }}
      >
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Preview
        </Typography>
        <IconButton onClick={handleFullscreenToggle}>
          {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
        </IconButton>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          p: 2,
          ...(isFullscreen && {
            position: 'fixed',
            top: HEADER_HEIGHT,
            left: 0,
            width: '100vw',
            height: `calc(100vh - ${HEADER_HEIGHT}px)`,
            zIndex: 1300,
            bgcolor: 'white',
          }),
        }}
      >
        <FormRenderer form={draftForm} />
      </Box>
    </Box>
  );
};
