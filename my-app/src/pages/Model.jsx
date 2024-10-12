import React, { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useColorMode, useColorModeValue } from '@chakra-ui/react';

export default function Model() {
  const { scene } = useGLTF('/hawk.glb');
  const modelRef = useRef();
  const { colorMode } = useColorMode();
  
  // Use a lighter blue in dark mode and a darker blue in light mode
  const dotColor = useColorModeValue('#1992d4', '#81defd');

  useEffect(() => {
    const dotShader = {
      uniforms: {
        dotColor: { value: new THREE.Color(dotColor) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 dotColor;
        varying vec2 vUv;
        void main() {
          float radius = 0.15;
          vec2 grid = fract(vUv * 130.0);
          float dist = length(grid - 0.5);
          float alpha = 1.0 - smoothstep(radius, radius + 0.01, dist);
          gl_FragColor = vec4(dotColor, alpha);
        }
      `,
      transparent: true,
    };

    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.ShaderMaterial(dotShader);
      }
    });

    // Center the model
    scene.position.set(0, 0, 0);
  }, [scene, dotColor]);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01;
    }
  });

  return <primitive ref={modelRef} object={scene} scale={3} />;
}