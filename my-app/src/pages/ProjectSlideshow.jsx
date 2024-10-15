import React, { useState, useRef } from 'react';
import { 
  Box, 
  Flex, 
  Icon, 
  Text, 
  Button, 
  useColorModeValue,
  AspectRatio,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExpand, FaCompress } from 'react-icons/fa';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';


const ProjectSlideshow = ({ project }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const slideshowRef = useRef(null);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % project.gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + project.gallery.length) % project.gallery.length);
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (slideshowRef.current.requestFullscreen) {
        slideshowRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <Box
      ref={slideshowRef}
      position="relative"
      width="100%"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="xl"
      bg={useColorModeValue("gray.100", "gray.700")}
      display="flex"
      flexDirection="column"
    >
      {/* macOS-like window controls */}
      <Flex
        bg={useColorModeValue("gray.200", "gray.600")}
        p={2}
        borderTopRadius="lg"
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex alignItems="center">
          <Box 
            as="button" 
            w="12px" 
            h="12px" 
            borderRadius="full" 
            bg="red.500" 
            mr={2}
          />
          <Box 
            as="button" 
            w="12px" 
            h="12px" 
            borderRadius="full" 
            bg="yellow.500" 
            mr={2}
          />
          <Box 
            as="button" 
            w="12px" 
            h="12px" 
            borderRadius="full" 
            bg="green.500"
            position="relative"
            onClick={toggleFullscreen}
            _hover={{ '& > .fullscreen-icon': { opacity: 1 } }}
          >
            <Icon
              as={isFullscreen ? FaCompress : FaExpand}
              color="green.700"
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              opacity={0}
              transition="opacity 0.2s"
              className="fullscreen-icon"
              pointerEvents="none"
              fontSize="8px"
            />
          </Box>
        </Flex>
        <Text fontSize="sm" fontWeight="medium">
          {project.title} Gallery
        </Text>
        <Flex>
          <Button onClick={prevImage} size="xs" variant="ghost" mr={2}>
            <Icon as={FiArrowLeft} />
          </Button>
          <Button onClick={nextImage} size="xs" variant="ghost">
            <Icon as={FiArrowRight} />
          </Button>
        </Flex>
      </Flex>

      <Box flex={1} position="relative">
        <AspectRatio ratio={16 / 9}>
          <Box>
            <AnimatePresence initial={false}>
              <motion.img
                key={currentImageIndex}
                src={project.gallery[currentImageIndex].url}
                alt={project.gallery[currentImageIndex].caption}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  position: 'absolute',
                }}
              />
            </AnimatePresence>
          </Box>
        </AspectRatio>
        <Flex 
          position="absolute" 
          top="50%" 
          left={0} 
          right={0} 
          transform="translateY(-50%)" 
          justifyContent="space-between"
          px={4}
        >
        </Flex>
      </Box>

      <Box p={4} bg={useColorModeValue("white", "gray.800")}>
        <Text fontSize="sm" textAlign="center">
          {project.gallery[currentImageIndex].caption}
        </Text>
      </Box>

      {/* Dot Diagram */}
      <Box pb = {3} marginTop= {'-15px'} bg={useColorModeValue("white", "gray.800")}>
      <Flex  justifyContent="center" mt={2}>
        {project.gallery.map((_, index) => (
          <Box 
            key={index}
            w={3}
            h={3}
            mx={1}
            borderRadius="50%"
            bg={index === currentImageIndex ? "blue.500" : "gray.400"}
            cursor="pointer"
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </Flex>
      </Box>
      

    </Box>
  );
};

export default ProjectSlideshow;