// src/pages/Model.jsx
import React, { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Model() {
  const { scene } = useGLTF('/hawk.glb'); // Ensure the path is correct
  const modelRef = useRef();

  useEffect(() => {
    const dotShader = {
      uniforms: {
        dotColor: { value: new THREE.Color('#5ac8fa') }, // Define the dot color
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
          float radius = 0.05; // Adjust the radius of the dots
          vec2 grid = fract(vUv * 90.0); // Increase the frequency of the dots
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
  }, [scene]);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01; // Adjust the rotation speed as needed
    }
  });

  return <primitive ref={modelRef} object={scene} scale={3} />; // Increase the scale value to make the model larger
}

export default Model;