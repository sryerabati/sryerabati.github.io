// src/theme.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#e3f8ff',
      100: '#b3ecff',
      200: '#81defd',
      300: '#5ed0fa',
      400: '#40c3f7',
      500: '#2bb0ed',
      600: '#1992d4',
      700: '#127fbf',
      800: '#0b69a3',
      900: '#035388',
    },
    background: '#121212',
    surface: '#1e1e1e',
    primary: '#007aff',
    secondary: '#5ac8fa',
    text: '#ffffff',
    textSecondary: '#a0a0a0',
    border: '#2c2c2c',
  },
});

export default theme;