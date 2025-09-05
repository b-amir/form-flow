import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import type { Form } from '@/types/form';
import { FieldFactory } from './FieldFactory';

interface FormRendererProps {
  form: Form;
}

export const FormRenderer: React.FC<FormRendererProps> = ({ form }) => {
  return (
    <Paper elevation={2} sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {form.name}
      </Typography>

      <Box component="form" sx={{ mt: 2 }}>
        {form.elements.map(element => (
          <FieldFactory
            key={element.id}
            element={element}
            value={element.type === 'checkbox' ? false : ''}
            onChange={() => {}}
          />
        ))}
      </Box>
    </Paper>
  );
};
