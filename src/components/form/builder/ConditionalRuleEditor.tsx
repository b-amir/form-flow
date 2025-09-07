import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Element, ConditionalRule } from '@/types';

interface ConditionalRuleEditorProps {
  rule: ConditionalRule;
  availableCheckboxes: Element[];
  onUpdate: (field: keyof ConditionalRule, value: string | boolean) => void;
  onRemove: () => void;
  canRemove: boolean;
}

export const ConditionalRuleEditor: React.FC<ConditionalRuleEditorProps> = ({
  rule,
  availableCheckboxes,
  onUpdate,
  onRemove,
  canRemove,
}) => (
  <Paper
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
          onChange={e => onUpdate('dependsOn', e.target.value)}
        >
          {availableCheckboxes.map(el => (
            <MenuItem key={el.id} value={el.id} sx={{ fontSize: '0.7rem' }}>
              {el.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography
        variant="caption"
        sx={{ fontSize: '0.65rem', color: 'text.secondary', mx: 0.25 }}
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
          onChange={e => onUpdate('showWhen', e.target.value === 'checked')}
        >
          <MenuItem value="checked" sx={{ fontSize: '0.7rem' }}>
            Checked
          </MenuItem>
          <MenuItem value="unchecked" sx={{ fontSize: '0.7rem' }}>
            Unchecked
          </MenuItem>
        </Select>
      </FormControl>

      {canRemove && (
        <IconButton
          size="small"
          onClick={onRemove}
          sx={{ color: 'error.main', p: 0.25 }}
        >
          <DeleteIcon sx={{ fontSize: 14 }} />
        </IconButton>
      )}
    </Box>
  </Paper>
);
