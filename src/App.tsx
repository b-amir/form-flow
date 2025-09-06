import './App.css';
import { Box } from '@mui/material';
import {
  FormBuilderPanel,
  FormPreviewPanel,
  FormsListPanel,
} from './components/layout';

const App = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <Box
        component="aside"
        sx={{
          width: '16.67%',
          borderRight: 1,
          borderColor: 'divider',
        }}
      >
        <FormsListPanel />
      </Box>
      <Box
        component="main"
        sx={{
          width: '50%',
          borderRight: 1,
          borderColor: 'divider',
        }}
      >
        <FormBuilderPanel />
      </Box>

      <Box
        component="aside"
        sx={{
          width: '33.33%',
        }}
      >
        <FormPreviewPanel />
      </Box>
    </Box>
  );
};

export default App;
