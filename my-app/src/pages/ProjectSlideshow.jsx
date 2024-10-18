import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Flex, 
  Icon, 
  Text, 
  Button, 
  useColorModeValue,
} from '@chakra-ui/react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { FaExpand, FaCompress, FaMinus } from 'react-icons/fa';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';

export default function ProjectSlideshow({ project }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMinimizable, setIsMinimizable] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [containerHeight, setContainerHeight] = useState(650);
  const slideshowRef = useRef(null);
  const imageRef = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    const updateContainerHeight = () => {
      if (imageRef.current) {
        const img = imageRef.current;
        const aspectRatio = img.naturalWidth / img.naturalHeight;
        const maxHeight = 650;
        const minHeight = 400;
        const maxWidth = slideshowRef.current.offsetWidth;
        
        let newHeight = maxHeight;
        if (maxHeight * aspectRatio > maxWidth) {
          newHeight = maxWidth / aspectRatio;
        }
        
        const finalHeight = Math.min(Math.max(newHeight, minHeight), maxHeight);
        setContainerHeight(finalHeight);
        setIsMinimizable(finalHeight > minHeight);
        setIsExpanded(finalHeight > minHeight);
      }
    };

    const img = new Image();
    img.src = project.gallery[currentImageIndex].url;
    img.onload = updateContainerHeight;

    window.addEventListener('resize', updateContainerHeight);
    return () => window.removeEventListener('resize', updateContainerHeight);
  }, [currentImageIndex, project.gallery]);

  const nextImage = () => {
    setDirection(1);
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % project.gallery.length);
  };

  const prevImage = () => {
    setDirection(-1);
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + project.gallery.length) % project.gallery.length);
  };

  const toggleFullscreen = async () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const start = {
      scale: isFullscreen ? 1 : 0.8,
    };

    const end = {
      scale: 1,
    };

    await controls.start({
      ...start,
      transition: { duration: 0.2, ease: 'easeInOut' }
    });

    if (!isFullscreen) {
      if (slideshowRef.current.requestFullscreen) {
        await slideshowRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      }
    }

    await controls.start({
      ...end,
      transition: { duration: 0.4, ease: 'easeOut' }
    });

    setIsTransitioning(false);
  };

  const toggleExpand = async () => {
    if (isTransitioning || !isMinimizable) return;
    setIsTransitioning(true);

    const start = {
      height: isExpanded ? 650 : 400,
    };

    const end = {
      height: isExpanded ? 400 : 650,
    };

    await controls.start({
      ...start,
      transition: { duration: 0.2, ease: 'easeInOut' }
    });

    setIsExpanded(!isExpanded);

    await controls.start({
      ...end,
      transition: { duration: 0.4, ease: 'easeOut' }
    });

    setIsTransitioning(false);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  return (
    <motion.div
      ref={slideshowRef}
      animate={controls}
      initial={false}
      style={{
        width: '100%',
        overflow: 'hidden',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        backgroundColor: useColorModeValue('gray.100', 'gray.700'),
        display: 'flex',
        flexDirection: 'column',
        zIndex: isFullscreen ? 9999 : 1,
        borderRadius: isFullscreen ? 0 : '0.5rem',
        position: isFullscreen ? 'fixed' : 'relative',
        top: isFullscreen ? 0 : 'auto',
        left: isFullscreen ? 0 : 'auto',
        right: isFullscreen ? 0 : 'auto',
        bottom: isFullscreen ? 0 : 'auto',
        height: isFullscreen ? '100vh' : 'auto',
      }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      <Flex
        bg={useColorModeValue('gray.200', 'gray.600')}
        p={2}
        borderTopRadius={isFullscreen ? 0 : 'lg'}
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex alignItems="center">
          <Box as="button" w="12px" h="12px" borderRadius="full" bg="red.500" mr={2} />
          <Box
            as="button"
            w="12px"
            h="12px"
            borderRadius="full"
            bg="yellow.500"
            mr={2}
            position="relative"
            onClick={toggleExpand}
            _hover={{ '& > .minimize-icon': { opacity: isMinimizable ? 1 : 0 } }}
            cursor={isMinimizable ? 'pointer' : 'default'}
          >
            <Icon
              as={FaMinus}
              color="yellow.700"
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              opacity={0}
              transition="opacity 0.2s"
              className="minimize-icon"
              pointerEvents="none"
              fontSize="8px"
            />
          </Box>
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

      <motion.div
        style={{
          position: 'relative',
          width: '100%',
          height: isFullscreen ? 'calc(100vh - 120px)' : `${containerHeight}px`,
          backgroundColor: 'gray.800',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        animate={{
          height: isFullscreen ? 'calc(100vh - 120px)' : `${containerHeight}px`,
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            ref={imageRef}
            key={currentImageIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            src={project.gallery[currentImageIndex].url}
            alt={project.gallery[currentImageIndex].caption}
            style={{
              position: 'absolute',
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
            }}
          />
        </AnimatePresence>
      </motion.div>

      <Box p={4} bg={useColorModeValue('white', 'gray.800')}>
        <Text fontSize="sm" textAlign="center">
          {project.gallery[currentImageIndex].caption}
        </Text>
      </Box>

      <Box pb={3} marginTop="-15px" bg={useColorModeValue('white', 'gray.800')}>
        <Flex justifyContent="center" mt={2}>
          {project.gallery.map((_, index) => (
            <Box 
              key={index}
              w={3}
              h={3}
              mx={1}
              borderRadius="50%"
              bg={index === currentImageIndex ? 'blue.500' : 'gray.400'}
              cursor="pointer"
              onClick={() => {
                setDirection(index > currentImageIndex ? 1 : -1);
                setCurrentImageIndex(index);
              }}
            />
          ))}
        </Flex>
      </Box>
    </motion.div>
  );
}