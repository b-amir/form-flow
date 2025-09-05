import React from 'react';
import { Box, Typography, Button } from '@mui/material';

interface ElementSelectionPanelProps {
  onSelectElement: (type: 'text' | 'checkbox') => void;
}

export const ElementSelectionPanel: React.FC<ElementSelectionPanelProps> = ({
  onSelectElement,
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6" gutterBottom>
        Add Element
      </Typography>
      <Button variant="outlined" onClick={() => onSelectElement('text')}>
        Text Field
      </Button>
      <Button variant="outlined" onClick={() => onSelectElement('checkbox')}>
        Checkbox
      </Button>
    </Box>
  );
};
