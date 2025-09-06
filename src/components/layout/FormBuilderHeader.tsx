import { Box, IconButton, InputBase } from '@mui/material';
import { Save } from '@mui/icons-material';
import React, { type RefObject } from 'react';

const HEADER_HEIGHT = 80;

interface FormBuilderHeaderProps {
  formName: string;
  inputRef: RefObject<HTMLInputElement | null>;
  onFormNameChange: (name: string) => void;
  onSave: () => void;
  isSaveDisabled?: boolean;
  isDirty?: boolean;
}

export const FormBuilderHeader: React.FC<FormBuilderHeaderProps> = ({
  formName,
  inputRef,
  onFormNameChange,
  onSave,
  isSaveDisabled = !formName.trim(),
  isDirty = false,
}) => {
  return (
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
      }}
    >
      <InputBase
        inputRef={inputRef}
        value={formName}
        onChange={e => onFormNameChange(e.target.value)}
        placeholder="Form Name"
        sx={{
          fontSize: 'h3.fontSize',
          fontWeight: 'h3.fontWeight',
          flexGrow: 1,
        }}
      />
      <IconButton
        onClick={onSave}
        disabled={isSaveDisabled || !isDirty}
        sx={{
          opacity: isDirty ? 1 : 0.3,
        }}
      >
        <Save />
      </IconButton>
    </Box>
  );
};
