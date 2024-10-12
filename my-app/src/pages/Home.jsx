// src/pages/Home.jsx
import React, { Suspense, lazy } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
const Model = lazy(() => import('./Model'));

function Loading() {
  return (
    <Html center>
      <div className="spinner"></div>
      <style>
        {`
          .spinner {
            border: 8px solid rgba(0, 0, 0, 0.1);
            border-top: 8px solid #5ac8fa; /* Spinner color */
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </Html>
  );
}

export default function Home() {
  const [ref, controls] = useScrollAnimation();
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 },
      }}
      transition={{ duration: 0.5 }}
    >
      <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="center">
        <VStack spacing={4} align="start" flex="1">
          <Heading as="h1" size="2xl" mb={6} bgGradient="linear(to-r, brand.400, brand.600)" bgClip="text">
            Welcome to My Portfolio
          </Heading>
          <Text fontSize="xl" mb={4}>
            Hi, I'm Shreyas Yerabati! I'm a student passionate about computer science and hope to learn more about the ways of the web.
          </Text>
          <Text fontSize="lg" color="textSecondary" mb={8}>
            Explore my projects and get in touch if you have any questions!
          </Text>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Button as={Link} to="/projects" colorScheme="brand">
              View My Projects
            </Button>
          </motion.div>
        </VStack>
        <Box flex="1" w="full" h="500px">
          <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Suspense fallback={<Loading />}>
              <Model />
            </Suspense>
          </Canvas>
        </Box>
      </Flex>
    </motion.div>
  );
}