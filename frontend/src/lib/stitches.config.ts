import { createStitches } from '@stitches/react';

export const {
  styled, css, globalCss, keyframes, getCssText, theme, createTheme, config,
} = createStitches({
  theme: {
    colors: {
      primaryColor: '#FFFFFF',
      secondaryColor: '#37474F',
      tertiaryColor: '#E0E0E0',
      quaternaryColor: '#000',

      // informative colors
      whiteColor: '#FFF',
      successColor: '#09AA19',
      salaryColor: '#09AA19',
      violetColor: '#CC00CC',
      remoteBackgroundColor: '#FFE8E8',
      errorColor: '#AA3009',
      blackColor: '#000',

      // token aliases
      background: '#000',
      line: '#000',
      text: '#000',
      accent: '#000',
    },
    fontSizes: {
      text8: '0.75rem',
      text7: '0.875rem',
      text6: '1.125rem',
      text5: '1.5rem',
      text4: '1.75rem',
      text3: '2rem',
      text2: '2.125rem',
      text1: '4rem',
    },
    fonts: {
      mainFont: '"Roboto", sans-serif',
    },
    fontWeights: {
      bold: 700,
      medium: 500,
      regular: 400,
      light: 300,
    },
  },
  media: {
    xs: '(min-width: 0px)',
    sm: '(min-width: 576px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 992px)',
    xl: '(min-width: 1200px)',
    xxl: '(min-width: 1400px)',
  },
});

export const darkTheme = createTheme({
  colors: {
    primaryColor: '#2C2C2C',
    secondaryColor: '#FFFFFF',
    tertiaryColor: '#202020',
    quaternaryColor: '#000',

    violetColor: '#FF99FF',
    remoteBackgroundColor: '#7D6969',
    // token aliases
    background: '#000',
    line: '#000',
    text: '#000',
    accent: '#000',
  },
});

export const globalStyles = globalCss({
  '@font-face': {
    fontFamily: '"Roboto", sans-serif',
    src: "url('https://fonts.googleapis.com/css2?family=Roboto&display=swap')",
  },
  body: {
    marginTop: '10vh',
    backgroundColor: '$primaryColor',
  },
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    fontFamily: '$mainFont',
    color: '$secondaryColor',
  },
  html: { scrollBehavior: 'smooth' },
  '@xs': {
    html: {
      fontSize: '12px',
    },
  },
  '@sm': {
    html: {
      fontSize: '14px',
    },
  },
  '@lg': {
    html: {
      fontSize: '16px',
    },
  },
  '.MuiAutocomplete-listbox': {
    backgroundColor: '$primaryColor',
  },
  '.MuiToolbar-root': {
    backgroundColor: '$primaryColor',
  },
});
