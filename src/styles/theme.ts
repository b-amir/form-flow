import { createTheme, alpha } from '@mui/material/styles';
import { base, pink, green, gray } from '@/styles/colors';
import shadows from '@/styles/shadows';
import typography from '@/styles/typography';
import type { PaletteColorOptions, Shadows } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface GradientOptions {
    [key: string]: string;
  }

  interface PaletteOptions {
    neutral?: PaletteColorOptions;
    gradients?: GradientOptions;
  }

  interface SimplePaletteColorOptions {
    lighter?: string;
    darker?: string;
  }

  interface Palette {
    neutral: PaletteColor;
    gradients: PaletteGradients;
  }

  interface PaletteColor {
    lighter: string;
    darker: string;
  }

  interface PaletteGradients {
    pinkGradient: string;
    greenGradient: string;
  }
}

const palette = {
  action: {
    active: gray[500],
    hover: alpha(gray[600], 0.13),
    selected: green[100],
    disabled: gray[400],
    disabledBackground: gray[200],
    focus: green[50],
    hoverOpacity: 0.05,
  },

  background: { paper: gray[50], default: base.background },

  neutral: {
    light: gray[100],
    main: gray[500],
    dark: gray[600],
    contrastText: base.background,
    pale: gray[10],
    darkerPale: gray[20],
  },

  primary: {
    lighter: green[50],
    light: green[100],
    main: green[500],
    dark: green[600],
    darker: green[600],
    contrastText: base.background,
  },

  secondary: {
    lighter: green[50],
    light: green[100],
    main: green[500],
    dark: green[600],
    darker: green[600],
    contrastText: base.background,
  },

  error: { main: pink[500], light: pink[400] },
  warning: {
    light: pink[100],
    main: pink[300],
    dark: pink[500],
    contrastText: base.background,
  },
  success: {
    lighter: green[50],
    light: green[100],
    main: green[500],
    dark: green[600],
    darker: green[600],
    contrastText: base.background,
  },

  gray,

  text: {
    primary: base.foreground,
    secondary: gray[300],
    disabled: gray[100],
  },

  divider: gray[50],

  gradients: {
    pinkGradient: `linear-gradient(to top right, ${pink[500]} 30%, ${pink[400]})`,
    greenGradient: `linear-gradient(to top right, ${green[500]} 30%, ${green[400]})`,
  },
};

const commonFocusStyle = {
  outline: `2px solid ${green[100]}`,
  outlineOffset: 2,
};

const commonHoverStyle = {
  backgroundColor: alpha(green[500], 0.08),
};

const theme = createTheme({
  cssVariables: true,
  palette,
  typography,
  shadows: shadows as Shadows,
  spacing: 8,
  shape: {
    borderRadius: 8,
  },

  components: {
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 36,
          height: 20,
          padding: 0,
          margin: '8px',
          '& .MuiSwitch-switchBase': {
            padding: 1,
            '&.Mui-checked': {
              transform: 'translateX(16px)',
              color: base.background,
              '& + .MuiSwitch-track': {
                opacity: 1,
                background: palette.gradients.greenGradient,
                borderColor: green[500],
              },
            },
          },
          '& .MuiSwitch-thumb': {
            width: 18,
            height: 18,
            borderRadius: 6,
            boxShadow: 'none',
          },
          '& .MuiSwitch-track': {
            opacity: 1,
            backgroundColor: gray[100],
            borderRadius: 7,
            border: `1px solid ${gray[200]}`,
          },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          '&.Mui-focusVisible': commonFocusStyle,
          '&.Mui-selected': {
            backgroundColor: green[500],
          },
        },
      },
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            background: palette.gradients.greenGradient,
            color: base.background,
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              background: `linear-gradient(to top right, ${green[600]} 30%, ${green[500]})`,
              transform: 'translateY(-1px)',
              boxShadow: `0 4px 8px ${alpha(green[500], 0.25)}`,
            },
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            color: green[500],
            borderColor: green[500],
            '&:hover': {
              ...commonHoverStyle,
              borderColor: green[600],
            },
          },
        },
        {
          props: { variant: 'text' },
          style: {
            color: green[500],
            '&:hover': commonHoverStyle,
          },
        },
      ],
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          '&.Mui-focusVisible': commonFocusStyle,
          '&.Mui-selected': {
            backgroundColor: green[50],
          },
        },
      },
    },

    MuiAlert: {
      styleOverrides: {
        root: {
          backgroundColor: gray[600],
          color: base.background,
          '& .MuiAlert-icon': {
            color: base.background,
          },
        },
        standardSuccess: {
          backgroundColor: green[600],
          color: base.background,
          '& .MuiAlert-icon': {
            color: base.background,
          },
        },
        standardError: {
          backgroundColor: pink[500],
          color: base.background,
          '& .MuiAlert-icon': {
            color: base.background,
          },
        },
        standardWarning: {
          backgroundColor: pink[300],
          color: base.background,
          '& .MuiAlert-icon': {
            color: base.background,
          },
        },
        standardInfo: {
          backgroundColor: gray[500],
          color: base.background,
          '& .MuiAlert-icon': {
            color: base.background,
          },
        },
      },
    },

    MuiSnackbar: {
      styleOverrides: {
        root: {
          '& .MuiPaper-root': {
            boxShadow: `0 4px 8px ${alpha(gray[600], 0.5)}`,
          },
        },
      },
    },

    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: alpha(gray[100], 0.3),
            borderRadius: '4px',
            border: `1px solid ${alpha(gray[50], 0.5)}`,
            '&:hover': {
              background: alpha(gray[100], 0.5),
            },
            '&:active': {
              background: alpha(gray[200], 0.6),
            },
          },
          '&::-webkit-scrollbar-corner': {
            background: 'transparent',
          },
          scrollbarWidth: 'thin',
          scrollbarColor: `${alpha(gray[100], 0.3)} transparent`,
        },
      },
    },
  },
});

export default theme;
