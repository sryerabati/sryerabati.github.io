import React from 'react';
import { Box, Container, Flex, Button, useColorMode, IconButton } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export default function Layout({ children }) {
  const { colorMode, toggleColorMode } = useColorMode();

  const navItems = [
    { name: "Home", to: "home" },
    { name: "About", to: "about" },
    { name: "Projects", to: "projects" },
    { name: "Contact", to: "contact" }
  ];

  const MotionBox = motion(Box);
  const MotionButton = motion(Button);
  const MotionIconButton = motion(IconButton);

  return (
    <MotionBox bg="bg.canvas" color="text.primary" minH="100vh" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <MotionBox
        as="header"
        position="sticky"
        top="0"
        width="full"
        zIndex="banner"
        bg="bg.surface"
        className="alternating-diagonal-lines"
        boxShadow="sm"
        h="70px"
        overflow="hidden"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Container maxW="container.xl" h="full" px={{ base: 2, sm: 4 }}>
          <Flex as="nav" h="full" justify="space-between" align="center" wrap="wrap">
            <Flex flexWrap="wrap" align="center">
              {navItems.map((item) => (
                <ScrollLink
                  key={item.to}
                  to={item.to}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={50}
                >
                  <MotionButton
                    variant="ghost"
                    mr={3}
                    mb={{ base: 2, md: 0 }}
                    onClick={() => {}}
                    zIndex={2}
                    fontSize={{ base: 'sm', sm: 'md' }}
                    _hover={{ bg: 'surface.700' }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}
                  </MotionButton>
                </ScrollLink>
              ))}
            </Flex>
            <MotionIconButton
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              variant="ghost"
              aria-label="Toggle color mode"
              zIndex={2}
              animate={{ rotate: colorMode === 'light' ? 0 : 180 }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.5 }}
            />
          </Flex>
        </Container>
      </MotionBox>
      <Box as="main" pt="70px">
        {children}
      </Box>
    </MotionBox>
  );
}