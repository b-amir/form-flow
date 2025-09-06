import './App.css';
import {
  Box,
  useMediaQuery,
  useTheme,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import BuildIcon from '@mui/icons-material/Build';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from 'react';
import {
  FormBuilderPanel,
  FormPreviewPanel,
  FormsListPanel,
} from './components/layout';

const App = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [activePanel, setActivePanel] = useState<string>('builder');

  const handlePanelChange = (
    _event: React.MouseEvent<HTMLElement>,
    newPanel: string | null
  ) => {
    if (newPanel !== null) {
      setActivePanel(newPanel);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isDesktop ? 'row' : 'column',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {!isDesktop && (
        <Box sx={{ p: 1, borderBottom: 1, borderColor: 'divider' }}>
          <ToggleButtonGroup
            value={activePanel}
            exclusive
            onChange={handlePanelChange}
            aria-label="panel selection"
            size={isMobile ? 'small' : 'medium'}
            fullWidth
          >
            <ToggleButton value="forms" aria-label="forms list">
              <ListIcon fontSize={isMobile ? 'small' : 'medium'} />
              {!isMobile && 'Forms'}
            </ToggleButton>
            <ToggleButton value="builder" aria-label="form builder">
              <BuildIcon fontSize={isMobile ? 'small' : 'medium'} />
              {!isMobile && 'Builder'}
            </ToggleButton>
            <ToggleButton value="preview" aria-label="form preview">
              <VisibilityIcon fontSize={isMobile ? 'small' : 'medium'} />
              {!isMobile && 'Preview'}
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      )}

      <Box
        component="aside"
        sx={{
          width: isDesktop ? '16.67%' : '100%',
          height: isDesktop ? '100%' : 'calc(100% - 48px)',
          borderRight: isDesktop ? 1 : 0,
          borderColor: 'divider',
          display: isDesktop || activePanel === 'forms' ? 'block' : 'none',
        }}
      >
        <FormsListPanel />
      </Box>

      <Box
        component="main"
        sx={{
          width: isDesktop ? '50%' : '100%',
          height: isDesktop ? '100%' : 'calc(100% - 48px)',
          borderRight: isDesktop ? 1 : 0,
          borderColor: 'divider',
          display: isDesktop || activePanel === 'builder' ? 'block' : 'none',
        }}
      >
        <FormBuilderPanel />
      </Box>

      <Box
        component="aside"
        sx={{
          width: isDesktop ? '33.33%' : '100%',
          height: isDesktop ? '100%' : 'calc(100% - 48px)',
          display: isDesktop || activePanel === 'preview' ? 'block' : 'none',
        }}
      >
        <FormPreviewPanel />
      </Box>
    </Box>
  );
};

export default App;
