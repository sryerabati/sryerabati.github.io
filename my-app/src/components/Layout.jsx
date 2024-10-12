import React from 'react';
import { Box, Container, Flex, Button, useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
import { Link as ScrollLink } from 'react-scroll';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export default function Layout({ children }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const headerBgColor = useColorModeValue("blue.50", "gray.900");

  const navItems = [
    { name: "Home", to: "home" },
    { name: "About", to: "about" },
    { name: "Projects", to: "projects" },
    { name: "Contact", to: "contact" }
  ];

  return (
    <Box bg={bgColor} color={textColor} minH="100vh">
      <Box 
        as="header" 
        position="fixed" 
        width="full" 
        zIndex="banner" 
        bg={headerBgColor} 
        className="alternating-diagonal-lines"
        boxShadow="sm"
        h="70px"
        overflow="hidden"
      >
        <Container maxW="container.xl" h="full">
          <Flex as="nav" h="full" justify="space-between" align="center" wrap="wrap">
            <Flex flexWrap="wrap" align="center">
              {navItems.map((item) => (
                <ScrollLink
                  key={item.to}
                  to={item.to}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                >
                  <Button
                    variant="ghost"
                    mr={3}
                    mb={{ base: 2, md: 0 }}
                    onClick={() => {}}
                    zIndex={2}
                  >
                    {item.name}
                  </Button>
                </ScrollLink>
              ))}
            </Flex>
            <IconButton
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              variant="ghost"
              aria-label="Toggle color mode"
              zIndex={2}
            />
          </Flex>
        </Container>
      </Box>
      <Box as="main" pt="70px">
        {children}
      </Box>
    </Box>
  );
}