import React from 'react';
import { Typography } from '@mui/material';

interface FormHeaderProps {
  title: string;
}

export const FormHeader: React.FC<FormHeaderProps> = ({ title }) => {
  return (
    <Typography variant="h4" component="h1" gutterBottom>
      {title}
    </Typography>
  );
};
