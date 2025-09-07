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
  IconButton,
  Chip,
  Paper,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import type { Element, ConditionalLogic, ConditionalRule } from '@/types';

interface ConditionalLogicBuilderProps {
  element: Element;
  allElements: Element[];
  onUpdateConditionalLogic: (
    conditionalLogic: ConditionalLogic | undefined
  ) => void;
}

export const ConditionalLogicBuilder: React.FC<
  ConditionalLogicBuilderProps
> = ({ element, allElements, onUpdateConditionalLogic }) => {
  const conditionalLogic = element.conditionalLogic;

  const checkboxElements = allElements.filter(
    el => el.type === 'checkbox' && el.id !== element.id
  );

  const handleEnableConditionalLogic = (enabled: boolean) => {
    if (enabled) {
      const firstCheckbox = checkboxElements[0];
      if (firstCheckbox) {
        const newConditionalLogic: ConditionalLogic = {
          operator: 'AND',
          rules: [{ dependsOn: firstCheckbox.id, showWhen: true }],
        };
        onUpdateConditionalLogic(newConditionalLogic);
      }
    } else {
      onUpdateConditionalLogic(undefined);
    }
  };

  const handleOperatorChange = (operator: 'AND' | 'OR') => {
    if (conditionalLogic) {
      onUpdateConditionalLogic({
        ...conditionalLogic,
        operator,
      });
    }
  };

  const handleAddRule = () => {
    if (conditionalLogic && checkboxElements.length > 0) {
      const availableCheckbox =
        checkboxElements.find(
          cb => !conditionalLogic.rules.some(rule => rule.dependsOn === cb.id)
        ) || checkboxElements[0];

      if (availableCheckbox) {
        const newRule: ConditionalRule = {
          dependsOn: availableCheckbox.id,
          showWhen: true,
        };

        onUpdateConditionalLogic({
          ...conditionalLogic,
          rules: [...conditionalLogic.rules, newRule],
        });
      }
    }
  };

  const handleRemoveRule = (index: number) => {
    if (conditionalLogic) {
      const newRules = conditionalLogic.rules.filter((_, i) => i !== index);
      if (newRules.length === 0) {
        onUpdateConditionalLogic(undefined);
      } else {
        onUpdateConditionalLogic({
          ...conditionalLogic,
          rules: newRules,
        });
      }
    }
  };

  const handleRuleChange = (
    index: number,
    field: keyof ConditionalRule,
    value: string | boolean
  ) => {
    if (conditionalLogic) {
      const newRules = [...conditionalLogic.rules];
      const currentRule = newRules[index];

      if (currentRule) {
        if (field === 'dependsOn') {
          newRules[index] = {
            dependsOn: value as string,
            showWhen: currentRule.showWhen,
          };
        } else if (field === 'showWhen') {
          newRules[index] = {
            dependsOn: currentRule.dependsOn,
            showWhen: value as boolean,
          };
        }
      }

      onUpdateConditionalLogic({
        ...conditionalLogic,
        rules: newRules,
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
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Divider sx={{ my: 1 }} />
      <Typography
        variant="subtitle2"
        sx={{ fontSize: '0.8rem', fontWeight: 500 }}
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
        sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.75rem' } }}
      />

      {conditionalLogic && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {conditionalLogic.rules.length > 1 && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                variant="caption"
                sx={{ fontSize: '0.7rem', color: 'text.secondary' }}
              >
                Show when
              </Typography>
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                <Chip
                  label="ALL"
                  size="small"
                  variant={
                    conditionalLogic.operator === 'AND' ? 'filled' : 'outlined'
                  }
                  onClick={() => handleOperatorChange('AND')}
                  sx={{
                    fontSize: '0.65rem',
                    height: 20,
                    cursor: 'pointer',
                    '&:hover': { backgroundColor: 'action.hover' },
                    '& .MuiChip-label': { px: 0.75 },
                  }}
                />
                <Chip
                  label="ANY"
                  size="small"
                  variant={
                    conditionalLogic.operator === 'OR' ? 'filled' : 'outlined'
                  }
                  onClick={() => handleOperatorChange('OR')}
                  sx={{
                    fontSize: '0.65rem',
                    height: 20,
                    cursor: 'pointer',
                    '&:hover': { backgroundColor: 'action.hover' },
                    '& .MuiChip-label': { px: 0.75 },
                  }}
                />
              </Box>
              <Typography
                variant="caption"
                sx={{ fontSize: '0.7rem', color: 'text.secondary' }}
              >
                conditions are met:
              </Typography>
            </Box>
          )}

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
            {conditionalLogic.rules.map((rule, index) => (
              <Paper
                key={index}
                variant="outlined"
                sx={{
                  p: 1,
                  backgroundColor: 'grey.50',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.75,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <FormControl
                    size="small"
                    sx={{
                      flex: 1,
                      '& .MuiInputLabel-root': { fontSize: '0.7rem' },
                      '& .MuiSelect-select': { fontSize: '0.7rem', py: 0.5 },
                      '& .MuiOutlinedInput-root': { minHeight: '32px' },
                    }}
                  >
                    <InputLabel>Field</InputLabel>
                    <Select
                      value={rule.dependsOn}
                      label="Field"
                      onChange={e =>
                        handleRuleChange(index, 'dependsOn', e.target.value)
                      }
                    >
                      {checkboxElements.map(el => (
                        <MenuItem
                          key={el.id}
                          value={el.id}
                          sx={{ fontSize: '0.7rem' }}
                        >
                          {el.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: '0.65rem',
                      color: 'text.secondary',
                      mx: 0.25,
                    }}
                  >
                    is
                  </Typography>

                  <FormControl
                    size="small"
                    sx={{
                      flex: 1,
                      '& .MuiInputLabel-root': { fontSize: '0.7rem' },
                      '& .MuiSelect-select': { fontSize: '0.7rem', py: 0.5 },
                      '& .MuiOutlinedInput-root': { minHeight: '32px' },
                    }}
                  >
                    <InputLabel>State</InputLabel>
                    <Select
                      value={rule.showWhen ? 'checked' : 'unchecked'}
                      label="State"
                      onChange={e =>
                        handleRuleChange(
                          index,
                          'showWhen',
                          e.target.value === 'checked'
                        )
                      }
                    >
                      <MenuItem value="checked" sx={{ fontSize: '0.7rem' }}>
                        Checked
                      </MenuItem>
                      <MenuItem value="unchecked" sx={{ fontSize: '0.7rem' }}>
                        Unchecked
                      </MenuItem>
                    </Select>
                  </FormControl>

                  {conditionalLogic.rules.length > 1 && (
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveRule(index)}
                      sx={{ color: 'error.main', p: 0.25 }}
                    >
                      <DeleteIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                  )}
                </Box>
              </Paper>
            ))}
          </Box>

          {conditionalLogic.rules.length < checkboxElements.length && (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <IconButton
                size="small"
                onClick={handleAddRule}
                sx={{
                  border: '1px dashed',
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  p: 0.5,
                  '&:hover': {
                    backgroundColor: 'primary.50',
                    borderColor: 'primary.dark',
                  },
                }}
              >
                <AddIcon sx={{ fontSize: 14 }} />
              </IconButton>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};
