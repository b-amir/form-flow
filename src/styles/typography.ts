import type { Theme, TypographyVariantsOptions } from '@mui/material';
import pxToRem from './functions/pxToRem';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    fontSecondaryFamily: React.CSSProperties['fontFamily'];
    fontWeightSemiBold: React.CSSProperties['fontWeight'];
    fontWeightLight: React.CSSProperties['fontWeight'];
    fontWeightExtraBold: React.CSSProperties['fontWeight'];
  }
  interface TypographyVariantsOptions {
    fontSecondaryFamily?: React.CSSProperties['fontFamily'];
    fontWeightLight?: React.CSSProperties['fontWeight'];
    fontWeightSemiBold?: React.CSSProperties['fontWeight'];
    fontWeightExtraBold?: React.CSSProperties['fontWeight'];
  }
  interface ThemeVars {
    typography: Theme['typography'];
  }
}

const typography: TypographyVariantsOptions = {
  fontFamily: ['Open Sans', 'sans-serif'].join(','),
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 700,
  fontWeightExtraBold: 800,
  h1: {
    fontWeight: 600,
    fontSize: pxToRem(28), // 28 px
    lineHeight: 1.2143, // 34px
  },
  h2: {
    fontWeight: 600,
    fontSize: pxToRem(24), // 24 px
    lineHeight: 1.3333, // 32px
  },
  h3: {
    fontWeight: 600,
    fontSize: pxToRem(20), // 20 px
    lineHeight: 1.4, // 28px
  },
  h4: {
    fontWeight: 600,
    fontSize: pxToRem(18), // 18 px
    lineHeight: 1.4444, // 26px
  },
  h5: {
    fontWeight: 600,
    fontSize: pxToRem(16), // 16 px
    lineHeight: 1.5, // 24px
  },
  h6: {
    fontWeight: 600,
    fontSize: pxToRem(14), // 14 px
    lineHeight: 1.5714, // 22px
  },
  body1: {
    fontSize: pxToRem(16), // 16 px
    lineHeight: 1.5, // 24px
  },
  body2: {
    fontSize: pxToRem(14), // 14 px
    lineHeight: 1.5714, // 22px
  },
  subtitle1: {
    fontSize: pxToRem(16), // 16 px
    lineHeight: 1.5, // 24px
    fontWeight: 500,
  },
  subtitle2: {
    fontSize: pxToRem(14), // 14 px
    lineHeight: 1.5714, // 22px
    fontWeight: 500,
  },
  caption: {
    fontSize: pxToRem(12), // 12 px
    lineHeight: 1.3333, // 16px
  },
  overline: {
    fontSize: pxToRem(12), // 12 px
    lineHeight: 1.3333, // 16px
    fontWeight: 600,
    textTransform: 'uppercase',
  },
  button: {
    fontSize: pxToRem(14), // 14 px
    lineHeight: 1.7143, // 24px
    fontWeight: 600,
    textTransform: 'capitalize',
  },
};

export default typography;
