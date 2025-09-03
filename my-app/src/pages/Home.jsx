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

const MotionBox = motion(Box);

const ProjectCard = ({ project }) => {
  const cardBg = useColorModeValue("white", "gray.700");

  return (
    <MotionBox
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="xl"
      bg={cardBg}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
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
    </MotionBox>
  );
};

const ExperienceCard = ({ experience }) => {
  const cardBg = useColorModeValue("white", "gray.700");

  return (
    <MotionBox
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      p={6}
      bg={cardBg}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
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
    </MotionBox>
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
        { url: "/images/project1-slidecentral/sc2.png", caption: "Club/Activity Dashboard For Students" },
        { url: "/images/project1-slidecentral/sc3.png", caption: "Club's Current Slides" },
        { url: "/images/project1-slidecentral/sc4.png", caption: "All Clubs Combined Slides" }
      ],
      projectUrl: "https://github.com/NCHS-Software-Engineering/SlideCentral",
      tags: ["React", "Node.js", "Express", "SQL", "Agile Development"]
    },
    {
      title: "OnePercentBetter (In Progress)",
      purpose: "Provides an easier way for users to track their daily habits and improve their productivity by 1% every day. Created as a submission for the 2024 Congressional App Challenge.",
      description: "•One Percent Better: A React Native mobile app for improving physical and mental wellness, built over six months by a team of four.\n•The app uses Supabase for its backend, a PostgreSQL-based database that securely stores data. Features include meditation tracking (Medito), workout tracking (Strong), a calorie counter, a to-do list, and journaling.\n•As the flagship feature, the Food Nutrition Analyzer, powered by AI, allows users to take a picture of their meal and receive an analysis of its caloric and nutritional content using the Google Gemini API for food recognition and analysis.\n•Solely integrated the Google Gemini API to enable seamless data transfer and performance when identifying food. The AI was fine-tuned to enhance nutritional tracking for a better user experience.\n•Additionally, meditation streaks, workout logs, and journaling were customized to suit individual progress. Real-time updates and user data were efficiently handled via the SQL-based Supabase backend.",
      gallery: [
        { url: "/images/project2-onepercentbetter/sc1.png", caption: "Main Homepage" },
        { url: "/images/project2-onepercentbetter/sc2.png", caption: "AI Food Analysis" },
        { url: "/images/project2-onepercentbetter/sc3.png", caption: "Meditation Tracker" },
        { url: "/images/project2-onepercentbetter/sc4.png", caption: "Cloud stored TodoList" }
      ],
      projectUrl: "",
      tags: ["React Native", "Supabase", "PostGRE SQL", "Mobile Development"]
    },
  ];

  const experiences = [
    {
      title: "Business Development Intern",
      company: "HomeMax, Bolingbrook IL",
      duration: "May 2025 - July 2025",
      description: "Consolidated multiple inventory spreadsheets into a unified Excel tracker, increasing operational efficiency.\nTroubleshot website issues, ensuring product listings remained accurate and the customer experience was seamless.\nConducted cold email outreach to prospective wholesale buyers, expanding the company’s customer base.",
      skills: ["Marketing", "Excel", "Communication", "Cold Outreach"]
    },
    {
      title: "Software Development Intern (Remote)",
      company: "EdXeno, Seattle WA",
      duration: "May 2024 - August 2024",
      description: "Managed and updated the company’s Webflow-based website to ensure brand consistency and smooth user experience.\nCollaborated with senior developers to identify and resolve bugs using JIRA for task management.\nContributed insights from a student perspective to enhance product-market fit.",
      skills: ["WebFlow", "Web Design", "Agile", "Jira"]
    },
    {
      title: "IT Intern",
      company: "Naperville Community Unit School District 203, Naperville IL",
      duration: "May 2023 - July 2023",
      description: "Supported device management for 14 elementary schools, maintaining and resetting Chromebooks, iPads, and laptops.\nDiagnosed and repaired student devices, applying hands-on hardware knowledge.\nWorked directly with the IT team to execute device updates and ensure tech-readiness for classrooms.",
      skills: ["Hardware Repair", "Troubleshooting", "System Cleaning"]
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
                    I'm Shreyas Yerabati, a passionate student wanting to experience more about the world of computer science.
                  </Text>
                  <Text fontSize="lg" color="gray.500">
                    My goal in computer science is fostered by curiosity and a desire to create a better life. I love learning new technologies and applying them to better day to day actions.
                  </Text>
                  <Box mt={8} p={6} bg={cardBg} borderRadius="lg" boxShadow="md">
                    <Heading as="h3" size="md" mb={4}>Skills & Interests</Heading>
                    <Text>• Web Development (React, Node.js)</Text>
                    <Text>• App Development (React Native, Expo)</Text>
                    <Text>• Data Structures & Algorithms</Text>
                    <Text>• Machine Learning & AI</Text>
                  </Box>
                </Box>
                <Box flex="1">
                  <Image
                    src="/images/pfp.jpeg"
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
                  <Tab _selected={{ color: "white", bg: "blue.500" }}>Projects</Tab>
                  <Tab _selected={{ color: "white", bg: "blue.500" }}>Experience</Tab>
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
                <VStack  flex="1" align="stretch" spacing={6} minW="300px">
                  <HStack>
                    <Icon as={FaEnvelope} w={6} h={6} color="blue.500" />
                    <Link href="mailto:shreyas.yerabati@gmail.com">shreyas.yerabati@gmail.com</Link>
                  </HStack>
                  <HStack>
                    <Icon as={FaLinkedin} w={6} h={6} color="blue.500" />
                    <Link href="https://www.linkedin.com/in/shreyas-yerabati-1a74a0294/" isExternal>LinkedIn Profile</Link>
                  </HStack>
                  <HStack>
                    <Icon as={FaGithub} w={6} h={6} color="blue.500" />
                    <Link href="https://github.com/sryerabati" isExternal>GitHub  Profile</Link>
                  </HStack>
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