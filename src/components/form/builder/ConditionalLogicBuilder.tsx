import React from 'react';
import {
  Box,
  Typography,
  FormControlLabel,
  Switch,
  Divider,
} from '@mui/material';
import type { Element, ConditionalLogic, ConditionalRule } from '@/types';
import { useConditionalLogic } from '@/hooks/useConditionalLogic';
import { ConditionalRuleEditor } from './ConditionalRuleEditor';
import { OperatorSelector } from './OperatorSelector';
import { AddRuleButton } from './AddRuleButton';
import { NoCheckboxesMessage } from './NoCheckboxesMessage';

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
  const {
    checkboxElements,
    hasCheckboxes,
    enableConditionalLogic,
    updateOperator,
  } = useConditionalLogic(element, allElements, onUpdateConditionalLogic);

  const handleAddRule = () => {
    if (!conditionalLogic || checkboxElements.length === 0) return;

    const availableCheckbox =
      checkboxElements.find(
        cb => !conditionalLogic.rules.some(rule => rule.dependsOn === cb.id)
      ) || checkboxElements[0];

    if (availableCheckbox) {
      onUpdateConditionalLogic({
        ...conditionalLogic,
        rules: [
          ...conditionalLogic.rules,
          { dependsOn: availableCheckbox.id, showWhen: true },
        ],
      });
    }
  };

  const handleRemoveRule = (index: number) => {
    if (!conditionalLogic) return;

    const newRules = conditionalLogic.rules.filter((_, i) => i !== index);
    if (newRules.length === 0) {
      onUpdateConditionalLogic(undefined);
    } else {
      onUpdateConditionalLogic({ ...conditionalLogic, rules: newRules });
    }
  };

  const handleRuleChange = (
    index: number,
    field: keyof ConditionalRule,
    value: string | boolean
  ) => {
    if (!conditionalLogic) return;

    const newRules = [...conditionalLogic.rules];
    const currentRule = newRules[index];
    if (currentRule) {
      newRules[index] = {
        dependsOn:
          field === 'dependsOn' ? (value as string) : currentRule.dependsOn,
        showWhen:
          field === 'showWhen' ? (value as boolean) : currentRule.showWhen,
      };
    }

    onUpdateConditionalLogic({ ...conditionalLogic, rules: newRules });
  };

  if (!hasCheckboxes) {
    return <NoCheckboxesMessage />;
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
            onChange={e => enableConditionalLogic(e.target.checked)}
            size="small"
          />
        }
        label="Enable conditional logic"
        sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.75rem' } }}
      />

      {conditionalLogic && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {conditionalLogic.rules.length > 1 && (
            <OperatorSelector
              operator={conditionalLogic.operator || 'AND'}
              onChange={updateOperator}
            />
          )}

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
            {conditionalLogic.rules.map((rule, index) => (
              <ConditionalRuleEditor
                key={index}
                rule={rule}
                availableCheckboxes={checkboxElements}
                onUpdate={(field, value) =>
                  handleRuleChange(index, field, value)
                }
                onRemove={() => handleRemoveRule(index)}
                canRemove={conditionalLogic.rules.length > 1}
              />
            ))}
          </Box>

          {conditionalLogic.rules.length < checkboxElements.length && (
            <AddRuleButton onClick={handleAddRule} />
          )}
        </Box>
      )}
    </Box>
  );
};
