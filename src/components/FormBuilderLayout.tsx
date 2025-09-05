import React, { type ReactNode } from 'react';
import { Box, Paper } from '@mui/material';

interface FormBuilderLayoutProps {
  children?: ReactNode;
}

export const FormBuilderLayout: React.FC<FormBuilderLayoutProps> = ({
  children,
}) => {
  return (
    <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#f5f6fa' }}>
      <Box sx={{ width: 240, backgroundColor: '#fff', boxShadow: 1, p: 2 }}>
        Element Selection Panel
      </Box>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
        <Paper elevation={2} sx={{ flex: 1, p: 3 }}>
          {children}
        </Paper>
      </Box>
      <Box sx={{ width: 320, backgroundColor: '#fff', boxShadow: 1, p: 2 }}>
        Properties Panel
      </Box>
    </Box>
  );
};
