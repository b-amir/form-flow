import React from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Divider,
} from '@mui/material';
import type { ApiElement, ApiConditionalLogic } from '@/types';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';

interface ConditionalLogicBuilderProps {
  element: ApiElement;
  allElements: ApiElement[];
  onUpdateConditionalLogic: (
    conditionalLogic: ApiConditionalLogic | undefined
  ) => void;
}

export const ConditionalLogicBuilder: React.FC<
  ConditionalLogicBuilderProps
> = ({ element, allElements, onUpdateConditionalLogic }) => {
  const conditionalLogic = (
    element as ApiElement & { conditionalLogic?: ApiConditionalLogic }
  ).conditionalLogic;
  const checkboxElements = allElements.filter(
    el => el.type === 'checkbox' && el.id !== element.id
  );

  const handleEnableConditionalLogic = (enabled: boolean) => {
    if (enabled) {
      const firstCheckbox = checkboxElements[0];
      if (firstCheckbox) {
        const newConditionalLogic: ApiConditionalLogic = {
          dependsOn: firstCheckbox.id,
          showWhen: true,
        };
        onUpdateConditionalLogic(newConditionalLogic);
      }
    } else {
      onUpdateConditionalLogic(undefined);
    }
  };

  const handleDependsOnChange = (fieldId: string) => {
    if (conditionalLogic) {
      onUpdateConditionalLogic({
        ...conditionalLogic,
        dependsOn: fieldId,
      });
    }
  };

  const handleShowWhenChange = (showWhen: boolean) => {
    if (conditionalLogic) {
      onUpdateConditionalLogic({
        ...conditionalLogic,
        showWhen,
      });
    }
  };

  if (checkboxElements.length === 0) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
        <InfoOutlineIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ fontSize: '0.75rem' }}
        >
          Add checkbox fields to <br />
          enable conditional logic
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <Divider sx={{ my: 1 }} />
      <Typography
        variant="subtitle2"
        sx={{ fontSize: '0.9rem', fontWeight: 500 }}
        gutterBottom
      >
        Conditional Logic
      </Typography>

      <FormControlLabel
        control={
          <Switch
            checked={!!conditionalLogic}
            onChange={e => handleEnableConditionalLogic(e.target.checked)}
            size="small"
          />
        }
        label="Enable conditional logic"
        sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.85rem' } }}
      />

      {conditionalLogic && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <FormControl
            size="small"
            fullWidth
            sx={{
              '& .MuiInputLabel-root': { fontSize: '0.85rem' },
              '& .MuiSelect-select': { fontSize: '0.85rem' },
            }}
          >
            <InputLabel>Depends On</InputLabel>
            <Select
              value={conditionalLogic.dependsOn}
              label="Depends On"
              onChange={e => handleDependsOnChange(e.target.value)}
            >
              {checkboxElements.map(el => (
                <MenuItem key={el.id} value={el.id}>
                  {el.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl
            size="small"
            fullWidth
            sx={{
              '& .MuiInputLabel-root': { fontSize: '0.85rem' },
              '& .MuiSelect-select': { fontSize: '0.85rem' },
            }}
          >
            <InputLabel>Show When</InputLabel>
            <Select
              value={conditionalLogic.showWhen ? 'checked' : 'unchecked'}
              label="Show When"
              onChange={e => handleShowWhenChange(e.target.value === 'checked')}
            >
              <MenuItem value="checked">Checked</MenuItem>
              <MenuItem value="unchecked">Unchecked</MenuItem>
            </Select>
          </FormControl>
        </Box>
      )}
    </Box>
  );
};
