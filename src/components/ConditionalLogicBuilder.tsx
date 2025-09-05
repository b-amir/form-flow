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
import type { ApiElement } from '@/types/api';
import type { ConditionalLogic } from '@/types/api';

interface ConditionalLogicBuilderProps {
  element: ApiElement;
  allElements: ApiElement[];
  onUpdateConditionalLogic: (
    conditionalLogic: ConditionalLogic | undefined
  ) => void;
}

export const ConditionalLogicBuilder: React.FC<
  ConditionalLogicBuilderProps
> = ({ element, allElements, onUpdateConditionalLogic }) => {
  const conditionalLogic = (
    element as ApiElement & { conditionalLogic?: ConditionalLogic }
  ).conditionalLogic;
  const checkboxElements = allElements.filter(
    el => el.type === 'checkbox' && el.id !== element.id
  );

  const handleEnableConditionalLogic = (enabled: boolean) => {
    if (enabled) {
      const firstCheckbox = checkboxElements[0];
      if (firstCheckbox) {
        const newConditionalLogic: ConditionalLogic = {
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
      <Box>
        <Typography variant="body2" color="text.secondary">
          Add checkbox fields to enable conditional logic
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Divider />
      <Typography variant="h6" gutterBottom>
        Conditional Logic
      </Typography>

      <FormControlLabel
        control={
          <Switch
            checked={!!conditionalLogic}
            onChange={e => handleEnableConditionalLogic(e.target.checked)}
          />
        }
        label="Enable conditional logic"
      />

      {conditionalLogic && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pl: 2 }}>
          <FormControl size="small" fullWidth>
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

          <FormControl size="small" fullWidth>
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
