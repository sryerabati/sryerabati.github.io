// @ts-nocheck
import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const fonts = {
  heading: `'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif`,
  body: `'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif`,
};

const styles = {
  global: {
    'html, body': {
      fontSmooth: 'antialiased',
    },
  },
};

const theme = extendTheme({
  config,
  fonts,
  styles,
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
  },
});

export default theme;