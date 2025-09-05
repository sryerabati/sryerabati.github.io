import React, { useEffect } from 'react';
import { ChakraProvider, ColorModeScript, useColorMode } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Layout>
      </Router>
    </ChakraProvider>
  );
}

export default App;
