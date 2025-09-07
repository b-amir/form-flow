import { Box, Typography, IconButton, Alert, Snackbar } from '@mui/material';
import { Fullscreen, FullscreenExit } from '@mui/icons-material';
import { FormRenderer } from '@components/form/renderer/FormRenderer';
import { useFormStore } from '@/features/form-management/stores/formStore';
import { useState } from 'react';
import { HEADER_HEIGHT } from '@/constants';

export const FormPreviewPanel = () => {
  const { draftForm } = useFormStore();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleFormSubmit = () => {
    setSuccessMessage('Form submitted successfully!');
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage(null);
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 9999,
      }}
    >
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
          ...(isFullscreen && {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 9999,
            bgcolor: 'white',
          }),
        }}
      >
        <Typography variant="h3" sx={{ flexGrow: 1 }}>
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
        <FormRenderer form={draftForm} onSubmit={handleFormSubmit} />

        <Snackbar
          open={!!successMessage}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            sx={{ width: '100%' }}
          >
            {successMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};
