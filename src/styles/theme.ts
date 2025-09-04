import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    tertiary: {
      main: string;
      light: string;
      dark: string;
    };
  }

  interface PaletteOptions {
    tertiary?: {
      main: string;
      light: string;
      dark: string;
    };
  }
}

const colors = {
  primary: {
    main: '#543ca6', // rebecca-purple
    light: '#a17ced', // tropical-indigo
    dark: '#3d2b7a',
  },
  secondary: {
    main: '#fec601', // mikado-yellow
    light: '#ffdb4d',
    dark: '#cc9e01',
  },
  tertiary: {
    main: '#a17ced', // tropical-indigo
    light: '#c4a8f0',
    dark: '#7a5bc7',
  },
  background: {
    default: '#ffffff', // white
    paper: '#ffffff', // white
  },
  text: {
    primary: '#66635b', // dim-gray
    secondary: '#543ca6', // rebecca-purple
  },
};

const theme = createTheme({
  cssVariables: true,
  palette: {
    ...colors,
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 8,
  },
});

export default theme;
