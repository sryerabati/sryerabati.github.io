import { ChakraProvider, ColorModeScript, useColorMode } from '@chakra-ui/react';
import theme from '../theme';
import Layout from '../components/Layout';
import '../styles/custom.css';
import { useEffect } from 'react';

function ColorModeManager() {
  const { colorMode } = useColorMode();
  useEffect(() => {
    document.body.setAttribute('data-theme', colorMode);
  }, [colorMode]);
  return null;
}

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ColorModeManager />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
