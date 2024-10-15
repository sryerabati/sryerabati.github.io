import { Suspense, lazy } from 'react';
import React from 'react';
import { 
  Box, 
  Container, 
  VStack, 
  Heading, 
  Text, 
  Button, 
  Flex, 
  Image, 
  HStack, 
  Link, 
  Icon,
  useColorModeValue,
  Tag,
  Wrap,
  WrapItem,
  Input,
  Textarea,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Spinner,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';
import { Canvas } from '@react-three/fiber';
import ProjectSlideshow from './ProjectSlideshow';

const Model = lazy(() => import('./Model'));

const ProjectCard = ({ project }) => {
  const cardBg = useColorModeValue("white", "gray.700");

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="xl" bg={cardBg}>
      <Flex direction={{ base: 'column', lg: 'row' }} alignItems="center">
        <Box flex="1" p={6}>
          <Heading as="h3" size="lg" mb={4}>{project.title}</Heading>
          <Text fontSize="sm" color="gray.500" mb={2}>{project.purpose}</Text>
          <VStack align="start" spacing={2} mb={4}>
            {project.description.split('\n').map((item, index) => (
              <Text key={index}>
                {item}
              </Text>
            ))}
          </VStack>
          <Wrap spacing={2} mb={4}>
            {project.tags.map((tag, index) => (
              <WrapItem key={index}>
                <Tag colorScheme="blue">{tag}</Tag>
              </WrapItem>
            ))}
          </Wrap>
          <Button as="a" href={project.projectUrl} target="_blank" colorScheme="blue">
            Visit Project
          </Button>
        </Box>
        <Box flex="1" p={6} display="flex" alignItems="center" justifyContent="center">
          <ProjectSlideshow project={project} />
        </Box>
      </Flex>
    </Box>
  );
};

const ExperienceCard = ({ experience }) => {
  const cardBg = useColorModeValue("white", "gray.700");

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md" p={6} bg={cardBg}>
      <Heading as="h3" size="lg" mb={2}>{experience.title}</Heading>
      <Text fontWeight="bold" mb={2}>{experience.company}</Text>
      <Text mb={2}>{experience.duration}</Text>
      <Text mb={4}>{experience.description}</Text>
      <Wrap spacing={2}>
        {experience.skills.map((skill, index) => (
          <WrapItem key={index}>
            <Tag colorScheme="green">{skill}</Tag>
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
};

const Home = () => {
  const bgGradient = useColorModeValue("linear(to-r, blue.400, teal.500)", "linear(to-r, blue.600, teal.700)");
  const cardBg = useColorModeValue("white", "gray.700");
  const spinnerColor = useColorModeValue("blue.500", "blue.200");

  const projects = [
    {
      title: "SlideCentral",
      purpose: "Provides an easier solution for NCHS students and teachers alike to view school activities, and for club sponsors to upload their upcoming activities to garner a larger amount of participation.",
      description: " • SlideCentral is a full-stack project built with React, Node.js, Express, and a SQL database. Developed by a team of four over seven months, it followed Agile methodologies with four sprints.\n• The backend, using Node.js and Express, focused on secure user authentication and session management. A SQL database handled efficient data exchange between front and back end.\n• Implemented Google OAuth for secure authentication. Users (admins, teachers, students) received tailored, role-specific experiences.\n• SQL queries managed complex relationships between activities, clubs, and users. Real-time updates were reflected on dashboards from user submissions.\n• Dynamic content like the image carousel and custom dashboards was connected via APIs. Content was pulled from the SQL database for seamless display.\n• Agile practices, including sprints, retrospectives, and daily scrums, ensured iterative progress. Trello was used for task management and team coordination.",
      gallery: [
        { url: "/images/project1-slidecentral/sc1.png", caption: "Homepage of SlideCentral" },
        { url: "/images/project1-slidecentral/sc2.png", caption: "User profile page" },
        { url: "/images/project1-slidecentral/sc3.png", caption: "Data visualization component" },
        { url: "/images/project1-slidecentral/sc4.png", caption: "Settings panel" }
      ],
      projectUrl: "https://github.com/NCHS-Software-Engineering/SlideCentral",
      tags: ["React", "Node.js", "Express", "SQL", "Agile Development"]
    },
    {
      title: "OnePercentBetter",
      purpose: "Provides an easier way for users to track their daily habits and improve their productivity by 1% every day. Created as a submission for the 2024 Congressional App Challenge.",
      description: "•One Percent Better: A React Native mobile app for improving physical and mental wellness, built over six months by a team of four.\n•The app uses Supabase for its backend, a PostgreSQL-based database that securely stores data. Features include meditation tracking (Medito), workout tracking (Strong), a calorie counter, a to-do list, and journaling.\n•As the flagship feature, the Food Nutrition Analyzer, powered by AI, allows users to take a picture of their meal and receive an analysis of its caloric and nutritional content using the Google Gemini API for food recognition and analysis.\n•Solely integrated the Google Gemini API to enable seamless data transfer and performance when identifying food. The AI was fine-tuned to enhance nutritional tracking for a better user experience.\n•Additionally, meditation streaks, workout logs, and journaling were customized to suit individual progress. Real-time updates and user data were efficiently handled via the SQL-based Supabase backend.",
      gallery: [
        { url: "/images/project1-slidecentral/sc1.png", caption: "Main dashboard of Project 1" },
        { url: "/images/project1-slidecentral/sc2.png", caption: "User profile page" },
        { url: "/images/project1-slidecentral/sc3.png", caption: "Data visualization component" },
        { url: "/images/project1-slidecentral/sc4.png", caption: "Settings panel" }
      ],
      projectUrl: "https://github.com/NCHS-Software-Engineering/SlideCentral",
      tags: ["React", "Node.js", "Express", "SQL", "Agile Development"]
    },
  ];

  const experiences = [
    {
      title: "Software Engineer Intern",
      company: "Tech Innovators Inc.",
      duration: "June 2023 - August 2023",
      description: "Developed and maintained web applications using React and Node.js. Collaborated with cross-functional teams to implement new features and improve existing ones.",
      skills: ["React", "Node.js", "Agile", "Git"]
    },
    {
      title: "Research Assistant",
      company: "University AI Lab",
      duration: "September 2022 - May 2023",
      description: "Assisted in developing machine learning models for natural language processing tasks. Conducted literature reviews and contributed to research papers.",
      skills: ["Python", "TensorFlow", "NLP", "Research"]
    },
    {
      title: "Web Development Freelancer",
      company: "Self-employed",
      duration: "January 2022 - Present",
      description: "Designed and developed responsive websites for small businesses and startups. Managed client relationships and delivered projects on time and within budget.",
      skills: ["HTML/CSS", "JavaScript", "WordPress", "Client Management"]
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box id="home">
        <Container maxW="container.xl" py={20}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
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
                <Suspense fallback={
                  <Flex w="100%" h="100%" justify="center" align="center" bg={cardBg}>
                    <Spinner size="xl" color={spinnerColor} thickness="4px" />
                  </Flex>
                }>
                  <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <pointLight position={[-10, -10, -10]} />
                    <Model />
                  </Canvas>
                </Suspense>
              </Box>
            </Flex>
          </motion.div>
        </Container>
      </Box>

      {/* About Section */}
      <Box id="about" bg={useColorModeValue("gray.50", "gray.900")} py={20}>
        <Container maxW="container.xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
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

      {/* Projects and Experience Section */}
      <Box id="projects">
        <Container maxW="container.xl" py={20}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <VStack spacing={10} align="stretch">
              <Heading as="h2" size="2xl" bgGradient={bgGradient} bgClip="text">
                Projects & Experience
              </Heading>
              <Tabs isFitted variant="enclosed">
                <TabList mb="1em">
                  <Tab>Projects</Tab>
                  <Tab>Experience</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <VStack spacing={10} align="stretch">
                      {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} />
                      ))}
                    </VStack>
                  </TabPanel>
                  <TabPanel>
                    <VStack spacing={6} align="stretch">
                      {experiences.map((experience, index) => (
                        <ExperienceCard key={index} experience={experience} />
                      ))}
                    </VStack>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </VStack>
          </motion.div>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box id="contact" bg={useColorModeValue("gray.50", "gray.900")} py={20}>
        <Container maxW="container.xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
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
                    <Link href="https://github.com/yourusername" isExternal>GitHub  Profile</Link>
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
};

export default Home;