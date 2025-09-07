import {
  Box,
  IconButton,
  InputBase,
  Typography,
  useTheme,
  keyframes,
} from '@mui/material';
import { Save } from '@mui/icons-material';
import React, { type RefObject } from 'react';
import { HEADER_HEIGHT } from '@/constants';

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
  isDirty = false,
}) => {
  const theme = useTheme();

  const pulse = keyframes`
    0% {
      box-shadow: 0 0 0 0 rgba(233, 30, 99, 0.4);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(233, 30, 99, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(233, 30, 99, 0);
    }
  `;

  const expandRightToLeft = keyframes`
    0% {
      width: 0;
      opacity: 0;
      transform: translateX(30px);
    }
    100% {
      width: 100%;
      opacity: 1;
      transform: translateX(0);
    }
  `;
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
        placeholder="Type Form Name Here..."
        sx={{
          fontSize: 'h3.fontSize',
          fontWeight: 'h3.fontWeight',
          flexGrow: 1,
        }}
      />
      <IconButton
        onClick={onSave}
        disabled={!isDirty}
        sx={{
          opacity: isDirty ? 1 : 0.3,
          borderRadius: 1,
          px: 1.5,
          background: isDirty
            ? theme.palette.gradients.pinkGradient
            : 'transparent',
          color: 'white',
          transition: 'all 0.3s ease-in-out',
          transform: isDirty ? 'translateY(-2px)' : 'translateY(0)',
          animation: isDirty ? `${pulse} 2s infinite` : 'none',
          '& .MuiSvgIcon-root': {
            transition: 'all 0.3s ease-in-out',
            transform: isDirty ? 'scale(1.1)' : 'scale(1)',
          },
        }}
      >
        <Save />
        <Box
          sx={{
            overflow: 'hidden',
            width: isDirty ? { xs: 0, sm: '86px' } : 0,
            transition: 'width 0.5s ease-in-out',
            position: 'relative',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {isDirty && (
            <Typography
              variant="h5"
              sx={{
                ml: 1,
                position: 'relative',
                animation: `${expandRightToLeft} 0.5s ease-out`,
                whiteSpace: 'nowrap',
                color: 'white',
                display: { xs: 'none', sm: 'block' },
                width: '100%',
              }}
            >
              Save form
            </Typography>
          )}
        </Box>
      </IconButton>
    </Box>
  );
};
