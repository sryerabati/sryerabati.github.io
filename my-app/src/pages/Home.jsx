import React, { Suspense, lazy } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
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
        hidden: { opacity: 0, y: 50 }
      }}
      transition={{ duration: 0.5 }}
      className="flex"
    >
      <div className="flex-1">
        <h1 className="text-4xl font-bold mb-6 text-gradient">Welcome to My Portfolio</h1>
        <p className="text-xl mb-4">
          Hi, I'm Shreyas Yerabati! I'm a student passionate about computer science and hope to learn more about the ways of the web.
        </p>
        <p className="text-lg text-text-secondary" style={{ marginBottom: '50px' }}>
          Explore my projects and get in touch if you have any questions!
        </p>
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link to="/projects" className="btn">View My Projects</Link>
        </motion.div>
      </div>
      <div className="flex-1 model-container">
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Suspense fallback={<Loading />}>
            <Model />
          </Suspense>
        </Canvas>
      </div>
    </motion.div>
  );
}