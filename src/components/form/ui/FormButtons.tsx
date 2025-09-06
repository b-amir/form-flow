import React from 'react';
import { Box, Button } from '@mui/material';

interface FormButtonsProps {
  onReset: () => void;
  isSubmitting?: boolean;
  isClearing?: boolean;
}

export const FormButtons: React.FC<FormButtonsProps> = ({
  onReset,
  isSubmitting = false,
  isClearing = false,
}) => {
  return (
    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isSubmitting || isClearing}
        sx={{ minWidth: 100 }}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
      <Button
        type="button"
        variant="outlined"
        color="secondary"
        onClick={onReset}
        disabled={isSubmitting || isClearing}
        sx={{ minWidth: 100 }}
      >
        {isClearing ? 'Clearing...' : 'Clear Form'}
      </Button>
    </Box>
  );
};
