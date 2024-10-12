import React, { useEffect } from 'react';
import { ChakraProvider, ColorModeScript, useColorMode } from '@chakra-ui/react';
import theme from './theme';
import Layout from './components/Layout';
import Home from './pages/Home';
import './styles/custom.css';

function ColorModeManager() {
  const { colorMode } = useColorMode();

  useEffect(() => {
    document.body.setAttribute('data-theme', colorMode);
  }, [colorMode]);

  return null;
}

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ColorModeManager />
      <Layout>
        <Home />
      </Layout>
    </ChakraProvider>
  );
}

export default App;