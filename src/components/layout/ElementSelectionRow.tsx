import { Box, Button } from '@mui/material';
import { TextFields, CheckBox } from '@mui/icons-material';
import { useFormBuilderStore } from '@/features/form-management/stores/formBuilderStore';
import type { ApiElement } from '@/types/api';

export const ElementSelectionRow = () => {
  const { addElement } = useFormBuilderStore();

  const handleSelectElement = (type: 'text' | 'checkbox') => {
    const newElement: ApiElement = {
      id: `element_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      label: `New ${type === 'text' ? 'Text Field' : 'Checkbox'}`,
      isRequired: false,
    };
    addElement(newElement);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        p: 2,
        borderBottom: 1,
        borderColor: 'divider',
        px: 4,
        boxShadow: 2,
        zIndex: 2,
      }}
    >
      <Button
        variant="contained"
        size="small"
        onClick={() => handleSelectElement('text')}
        startIcon={<TextFields />}
      >
        Add Text Field
      </Button>
      <Button
        variant="contained"
        size="small"
        onClick={() => handleSelectElement('checkbox')}
        startIcon={<CheckBox />}
      >
        Add Checkbox
      </Button>
    </Box>
  );
};
