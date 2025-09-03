import React from 'react';
import { Box, Container, Flex, Button, useColorMode, useColorModeValue, IconButton, Text } from '@chakra-ui/react';
import { Link as ScrollLink } from 'react-scroll';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export default function Layout({ children }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const headerBgColor = useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(26, 32, 44, 0.8)');
  const headerBorderColor = useColorModeValue('gray.200', 'gray.700');

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
        style={{ backdropFilter: 'saturate(180%) blur(10px)' }}
        borderBottomWidth="1px"
        borderColor={headerBorderColor}
        boxShadow="sm"
        h="70px"
      >
        <Container maxW="container.xl" h="full" px={{ base: 2, sm: 4 }}>
          <Flex as="nav" h="full" justify="space-between" align="center">
            <Text fontWeight="bold" fontSize="xl" bgGradient="linear(to-r, blue.400, teal.300)" bgClip="text">
              Shreyas
            </Text>
            <Flex align="center">
              {navItems.map((item) => (
                <ScrollLink
                  key={item.to}
                  to={item.to}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={50}
                >
                  <Button
                    variant="ghost"
                    mr={3}
                    fontSize={{ base: "sm", sm: "md" }}
                  >
                    {item.name}
                  </Button>
                </ScrollLink>
              ))}
              <IconButton
                icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                onClick={toggleColorMode}
                variant="ghost"
                aria-label="Toggle color mode"
                ml={2}
              />
            </Flex>
          </Flex>
        </Container>
      </Box>
      <Box as="main" pt="70px">
        {children}
      </Box>
    </Box>
  );
}