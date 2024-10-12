// src/components/Layout.jsx
import { Link } from 'react-router-dom';
import { Box, Flex, HStack, Button } from '@chakra-ui/react';
import '../styles/custom.css';

export default function Layout({ children }) {
  return (
    <Box bg="background" color="text" minH="100vh">
      <Box as="header" bg="surface" borderBottom="1px solid" borderColor="border" py={4}>
        <Flex as="nav" maxW="1200px" mx="auto" px={4} justify="space-between" align="center">
          <HStack spacing={4}>
            <Button as={Link} to="/" variant="link" color="text">
              Home
            </Button>
            <Button as={Link} to="/projects" variant="link" color="text">
              Projects
            </Button>
            <Button as={Link} to="/about" variant="link" color="text">
              About Me
            </Button>
            <Button as={Link} to="/contact" variant="link" color="text">
              Contact
            </Button>
          </HStack>
        </Flex>
      </Box>
      <Box as="main" mt={8} px={4}>
        {children}
      </Box>
    </Box>
  );
}