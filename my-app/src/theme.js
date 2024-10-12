import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
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