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
import { FaExpand, FaCompress, FaMinus, FaTimes, FaRedo } from 'react-icons/fa';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';

export default function ProjectSlideshow({ project }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMinimizable, setIsMinimizable] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [containerHeight, setContainerHeight] = useState(650);
  const slideshowRef = useRef(null);
  const imageRef = useRef(null);
  const controls = useAnimation();
  const surfaceBg = useColorModeValue('gray.100', 'gray.700');
  const barBg = useColorModeValue('gray.200', 'gray.600');
  const captionBg = useColorModeValue('white', 'gray.800');

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

  const handleClose = async () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    await controls.start({
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2, ease: 'easeInOut' },
    });
    if (isFullscreen && document.exitFullscreen) {
      await document.exitFullscreen();
    }
    setIsClosed(true);
    setIsTransitioning(false);
  };

  const handleReopen = async () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIsMinimized(false);
    contentControls.set({ y: 0, opacity: 1 });
    controls.set({ opacity: 0, scale: 0.95 });
    setIsClosed(false);
    await controls.start({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.25, ease: 'easeOut' },
    });
    setIsTransitioning(false);
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

  const contentControls = useAnimation();

  const minimize = async () => {
    if (isTransitioning || !isMinimizable || isMinimized) return;
    setIsTransitioning(true);
    await contentControls.start({
      y: '-100%',
      opacity: 0,
      transition: { duration: 0.25, ease: 'easeInOut' },
    });
    setIsMinimized(true);
    setIsTransitioning(false);
  };

  const restore = async () => {
    if (isTransitioning || !isMinimized) return;
    setIsTransitioning(true);
    setIsMinimized(false);
    contentControls.set({ y: '-100%', opacity: 0 });
    await contentControls.start({
      y: 0,
      opacity: 1,
      transition: { duration: 0.25, ease: 'easeOut' },
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
    <AnimatePresence initial={false}>
      {isClosed ? (
        <motion.button
          key="reopen"
          onClick={handleReopen}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            background: 'linear-gradient(135deg, var(--chakra-colors-lilac-500), var(--chakra-colors-accent-600))',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '9999px',
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            border: 'none'
          }}
          aria-label={`Reopen ${project.title} gallery`}
        >
          <Icon as={FaRedo} />
          <Text fontSize="sm">Reopen Gallery</Text>
        </motion.button>
      ) : (
        <motion.div
          key="slideshow"
          ref={slideshowRef}
          animate={controls}
          initial={false}
          style={{
            width: '100%',
            overflow: 'hidden',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            backgroundColor: surfaceBg,
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
            bg={barBg}
            p={2}
            borderTopRadius={isFullscreen ? 0 : 'lg'}
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
                position="relative"
                onClick={handleClose}
                aria-label="Close slideshow"
                transition="transform 0.2s ease, background-color 0.2s ease"
                _hover={{
                  transform: 'scale(1.1)',
                  bg: 'red.400',
                  '& > .close-icon': { opacity: 1 },
                }}
                _active={{ transform: 'scale(0.9)' }}
                _focusVisible={{ boxShadow: '0 0 0 2px var(--chakra-colors-accent-600)' }}
              >
                <Icon
                  as={FaTimes}
                  color="red.700"
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  opacity={0}
                  transition="opacity 0.2s"
                  className="close-icon"
                  pointerEvents="none"
                  fontSize="8px"
                />
              </Box>
              <Box
                as="button"
                w="12px"
                h="12px"
                borderRadius="full"
                bg="yellow.500"
                mr={2}
                position="relative"
                onClick={minimize}
                aria-label="Minimize slideshow"
                transition="transform 0.2s ease, background-color 0.2s ease"
                _hover={{
                  transform: isMinimizable && !isMinimized ? 'scale(1.1)' : undefined,
                  bg: 'yellow.400',
                  '& > .minimize-icon': { opacity: isMinimizable && !isMinimized ? 1 : 0 },
                }}
                _active={{ transform: isMinimizable && !isMinimized ? 'scale(0.9)' : undefined }}
                _focusVisible={{ boxShadow: '0 0 0 2px var(--chakra-colors-accent-600)' }}
                cursor={isMinimizable && !isMinimized ? 'pointer' : 'default'}
                aria-disabled={isMinimized}
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
                onClick={isMinimized ? restore : toggleFullscreen}
                aria-label={
                  isMinimized
                    ? 'Restore slideshow'
                    : isFullscreen
                    ? 'Exit fullscreen'
                    : 'Enter fullscreen'
                }
                transition="transform 0.2s ease, background-color 0.2s ease"
                _hover={{
                  transform: 'scale(1.1)',
                  bg: 'green.400',
                  '& > .fullscreen-icon': { opacity: 1 },
                }}
                _active={{ transform: 'scale(0.9)' }}
                _focusVisible={{ boxShadow: '0 0 0 2px var(--chakra-colors-accent-600)' }}
              >
                <Icon
                  as={isMinimized ? FaExpand : isFullscreen ? FaCompress : FaExpand}
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
              <Button onClick={prevImage} size="xs" variant="ghost" colorScheme="lilac" mr={2}>
                <Icon as={FiArrowLeft} />
              </Button>
              <Button onClick={nextImage} size="xs" variant="ghost" colorScheme="lilac">
                <Icon as={FiArrowRight} />
              </Button>
            </Flex>
          </Flex>

          <motion.div
            key="content"
            animate={contentControls}
            initial={{ y: 0, opacity: 1 }}
            style={{ display: isMinimized ? 'none' : 'block' }}
          >
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

            <Box p={4} bg={captionBg}>
              <Text fontSize="sm" textAlign="center">
                {project.gallery[currentImageIndex].caption}
              </Text>
            </Box>

            <Box pb={3} marginTop="-15px" bg={captionBg}>
              <Flex justifyContent="center" mt={2}>
                {project.gallery.map((_, index) => (
                  <Box
                    key={index}
                    w={3}
                    h={3}
                    mx={1}
                    borderRadius="50%"
                    bg={index === currentImageIndex ? 'lilac.500' : 'gray.400'}
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
