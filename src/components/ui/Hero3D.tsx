import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const FloatingElements = () => {
  return (
    <>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-2, 1, 0]}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#C5A028" wireframe />
        </mesh>
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
        <mesh position={[3, -1, -2]}>
          <torusGeometry args={[0.8, 0.2, 16, 100]} />
          <meshStandardMaterial color="#C5A028" roughness={0.1} metalness={0.8} />
        </mesh>
      </Float>

      <Sphere args={[1, 100, 200]} scale={1.5}>
        <MeshDistortMaterial
          color="#0A0A0B"
          attach="material"
          distort={0.4}
          speed={1.5}
          roughness={0}
        />
      </Sphere>
    </>
  );
};

const Hero3D = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-40 lg:opacity-100 bg-[#050505]">
      <Suspense fallback={<div className="w-full h-full bg-[#050505]" />}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={2} color="#C5A028" />
          <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
          <FloatingElements />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default Hero3D;
