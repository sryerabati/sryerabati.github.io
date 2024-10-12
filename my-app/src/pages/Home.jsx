import React, { Suspense, lazy } from 'react';
import { 
  Box, 
  Container, 
  VStack, 
  Heading, 
  Text, 
  Button, 
  Flex, 
  Image, 
  SimpleGrid, 
  HStack, 
  Input, 
  Textarea, 
  Link, 
  Icon,
  useColorModeValue
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';
import { Canvas } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Model = lazy(() => import('./Model'));

function Loading() {
  return (
    <Html center>
      <Box as="div" className="spinner" />
      <style>{`
        .spinner {
          border: 8px solid rgba(0, 0, 0, 0.1);
          border-top: 8px solid #5ac8fa;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </Html>
  );
}

const ProjectCard = ({ title, description, imageUrl, projectUrl, tags }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md">
      <Image src={imageUrl} alt={title} />
      <Box p="6">
        <Heading as="h3" size="md" mb={2}>{title}</Heading>
        <Text mb={4}>{description}</Text>
        <HStack spacing={2} mb={4}>
          {tags.map((tag, index) => (
            <Box key={index} px={2} py={1} bg="blue.100" color="blue.800" borderRadius="full" fontSize="sm">
              {tag}
            </Box>
          ))}
        </HStack>
        <Button as="a" href={projectUrl} target="_blank" colorScheme="blue">
          View Project
        </Button>
      </Box>
    </Box>
  );
};

export default function Home() {
  const bgGradient = useColorModeValue("linear(to-r, blue.400, teal.500)", "linear(to-r, blue.600, teal.700)");
  const cardBg = useColorModeValue("white", "gray.700");

  const [heroRef, heroControls] = useScrollAnimation();
  const [aboutRef, aboutControls] = useScrollAnimation();
  const [projectsRef, projectsControls] = useScrollAnimation();
  const [contactRef, contactControls] = useScrollAnimation();

  const projects = [
    {
      title: "Project 1",
      description: "A brief description of project 1.",
      imageUrl: "/placeholder.svg?height=200&width=300",
      projectUrl: "https://project1-url.com",
      tags: ["React", "Node.js", "MongoDB"]
    },
    {
      title: "Project 2",
      description: "A brief description of project 2.",
      imageUrl: "/placeholder.svg?height=200&width=300",
      projectUrl: "https://project2-url.com",
      tags: ["Python", "Machine Learning", "Data Visualization"]
    },
    {
      title: "Project 3",
      description: "A brief description of project 3.",
      imageUrl: "/placeholder.svg?height=200&width=300",
      projectUrl: "https://project3-url.com",
      tags: ["JavaScript", "Three.js", "WebGL"]
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box id="home">
        <Container maxW="container.xl" py={20}>
          <motion.div
            ref={heroRef}
            initial="hidden"
            animate={heroControls}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 50 }
            }}
            transition={{ duration: 0.5 }}
          >
            <Flex direction={{ base: 'column', lg: 'row' }} align="center" justify="space-between">
              <VStack spacing={6} align="start" flex="1" mb={{ base: 10, lg: 0 }}>
                <Heading as="h1" size="3xl" bgGradient={bgGradient} bgClip="text">
                  Welcome to My Portfolio
                </Heading>
                <Text fontSize="xl" fontWeight="medium">
                  Hi, I'm Shreyas Yerabati! I'm a student passionate about computer science and web development.
                </Text>
                <Text fontSize="lg" color="gray.500">
                  Explore my projects and discover how I'm shaping the digital world, one line of code at a time.
                </Text>
                <Button as={Link} href="#projects" size="lg" colorScheme="blue" mt={4}>
                  View My Projects
                </Button>
              </VStack>
              <Box flex="1" w="full" h="500px" borderRadius="lg" overflow="hidden" boxShadow="2xl">
                <Canvas
                  camera={{ position: [0, 0, 10], fov: 50 }}
                  style={{ width: '100%', height: '100%' }}
                >
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} />
                  <Suspense fallback={<Loading />}>
                    <Model />
                  </Suspense>
                </Canvas>
              </Box>
            </Flex>
          </motion.div>
        </Container>
      </Box>

      {/* About Section */}
      <Box id="about" bg={useColorModeValue("gray.50", "gray.900")} py={20}>
        <Container maxW="container.xl">
          <motion.div
            ref={aboutRef}
            initial="hidden"
            animate={aboutControls}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 50 }
            }}
            transition={{ duration: 0.5 }}
          >
            <VStack spacing={10} align="start">
              <Heading as="h2" size="2xl" bgGradient={bgGradient} bgClip="text">
                About Me
              </Heading>
              <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="space-between">
                <Box flex="1" mr={{ base: 0, md: 10 }} mb={{ base: 10, md: 0 }}>
                  <Text fontSize="xl" mb={6}>
                    I'm Shreyas Yerabati, a passionate student diving deep into the world of computer science and web development.
                  </Text>
                  <Text fontSize="lg" color="gray.500">
                    My journey in tech is driven by curiosity and a desire to create meaningful solutions. I thrive on learning new technologies and applying them to solve real-world problems.
                  </Text>
                  <Box mt={8} p={6} bg={cardBg} borderRadius="lg" boxShadow="md">
                    <Heading as="h3" size="md" mb={4}>Skills & Interests</Heading>
                    <Text>• Web Development (React, Node.js)</Text>
                    <Text>• Data Structures & Algorithms</Text>
                    <Text>• Machine Learning & AI</Text>
                    <Text>• Open Source Contribution</Text>
                  </Box>
                </Box>
                <Box flex="1">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Shreyas Yerabati"
                    borderRadius="full"
                    boxSize="300px"
                    objectFit="cover"
                    boxShadow="2xl"
                  />
                </Box>
              </Flex>
            </VStack>
          </motion.div>
        </Container>
      </Box>

      {/* Projects Section */}
      <Box id="projects">
        <Container maxW="container.xl" py={20}>
          <motion.div
            ref={projectsRef}
            initial="hidden"
            animate={projectsControls}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 50 }
            }}
            transition={{ duration: 0.5 }}
          >
            <VStack spacing={10} align="stretch">
              <Heading as="h2" size="2xl" bgGradient={bgGradient} bgClip="text">
                My Projects
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
                {projects.map((project, index) => (
                  <ProjectCard key={index} {...project} />
                ))}
              </SimpleGrid>
            </VStack>
          </motion.div>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box id="contact" bg={useColorModeValue("gray.50", "gray.900")} py={20}>
        <Container maxW="container.xl">
          <motion.div
            ref={contactRef}
            initial="hidden"
            animate={contactControls}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 50 }
            }}
            transition={{ duration: 0.5 }}
          >
            <VStack spacing={10} align="stretch">
              <Heading as="h2" size="2xl" bgGradient={bgGradient} bgClip="text">
                Contact Me
              </Heading>
              <Text fontSize="xl">
                I'd love to hear from you! Feel free to reach out using the information below or send me a message.
              </Text>
              <HStack spacing={10} align="flex-start" flexWrap="wrap">
                <VStack flex="1" align="stretch" spacing={6} minW="300px">
                  <HStack>
                    <Icon as={FaEnvelope} w={6} h={6} color="blue.500" />
                    <Link href="mailto:your.email@example.com">your.email@example.com</Link>
                  </HStack>
                  <HStack>
                    <Icon as={FaLinkedin} w={6} h={6} color="blue.500" />
                    <Link href="https://www.linkedin.com/in/yourprofile" isExternal>LinkedIn Profile</Link>
                  </HStack>
                  <HStack>
                    <Icon as={FaGithub} w={6} h={6} color="blue.500" />
                    <Link href="https://github.com/yourusername" isExternal>GitHub Profile</Link>
                  </HStack>
                </VStack>
                <VStack
                  flex="1"
                  align="stretch"
                  spacing={6}
                  bg={cardBg}
                  p={8}
                  borderRadius="lg"
                  boxShadow="xl"
                  minW="300px"
                >
                  <Heading as="h3" size="lg">Send a Message</Heading>
                  <Input placeholder="Your Name" />
                  <Input placeholder="Your Email" type="email" />
                  <Textarea placeholder="Your Message" rows={4} />
                  <Button colorScheme="blue" size="lg">Send Message</Button>
                </VStack>
              </HStack>
            </VStack>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
}