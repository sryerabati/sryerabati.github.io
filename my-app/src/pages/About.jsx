// src/pages/About.jsx
import { Box, Heading, Text } from '@chakra-ui/react';

export default function About() {
  return (
    <Box maxW="1200px" mx="auto" px={4}>
      <Heading as="h1" size="2xl" mb={6}>
        About Me
      </Heading>
      <Text fontSize="xl" mb={4}>
        I'm Shreyas Yerabati, a student passionate about computer science and web development.
      </Text>
      <Text fontSize="lg" color="textSecondary">
        I enjoy learning new technologies and building projects that solve real-world problems.
      </Text>
    </Box>
  );
}