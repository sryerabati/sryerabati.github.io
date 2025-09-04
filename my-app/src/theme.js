import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const colors = {
  bg: {
    950: '#0E0B14',
    900: '#131021',
  },
  surface: {
    800: '#1C1730',
    700: '#241C3F',
  },
  lilac: {
    300: '#D9C7FF',
    400: '#C9B8F0',
    500: '#B997F5',
    600: '#9C7DD1',
  },
};

const semanticTokens = {
  colors: {
    'bg.canvas': { default: 'white', _dark: 'bg.900' },
    'bg.surface': { default: 'white', _dark: 'surface.800' },
    'text.primary': { default: 'gray.800', _dark: 'gray.100' },
    'text.muted': { default: 'gray.600', _dark: 'gray.300' },
    brand: { default: 'lilac.600', _dark: 'lilac.500' },
  },
};

const fonts = {
  heading: `'Inter', system-ui, sans-serif`,
  body: `'Inter', system-ui, sans-serif`,
};

const lineHeights = {
  heading: 1.15,
  body: 1.6,
};

const radii = {
  xl: '20px',
  '2xl': '24px',
};

const styles = {
  global: {
    'html, body': {
      bg: 'bg.canvas',
      color: 'text.primary',
    },
    '*:focus-visible': {
      outline: '2px solid',
      outlineColor: 'lilac.600',
      outlineOffset: '2px',
    },
  },
};

const transitions = {
  duration: {
    normal: '200ms',
  },
};

const theme = extendTheme({
  config,
  colors,
  semanticTokens,
  fonts,
  lineHeights,
  radii,
  styles,
  transition: transitions,
});

export default theme;
