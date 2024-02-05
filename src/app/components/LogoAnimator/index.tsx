'use client';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React from 'react';
import { useEffect, useRef } from 'react';
import { Group, Object3DEventMap } from 'three';

interface GroupRef extends Group<Object3DEventMap> {}

const LogoAnimator = () => {
  return (
    <div
      style={{
        height: '90vh',
        width: '90vw',
      }}
    >
      <Canvas camera={{ position: [6.7, 6, 6.6], fov: 75 }}>
        <ambientLight intensity={0.8} />
        <directionalLight intensity={0.9} position={[0, 10, 0]} />
        <OrbitControls />
        <GlbModel />
      </Canvas>
    </div>
  );
};

const GlbModel = () => {
  const { scene } = useGLTF('/assets/RARA.glb');
  const group = useRef<GroupRef>(null);

  useEffect(() => {
    // Rotate the model group after it has been loaded
    if (group.current) {
      group.current.rotation.y = Math.PI / 2;
      group.current.rotation.z = Math.PI / 2;
    }
  }, [group]);

  return <group ref={group}>{scene && <primitive object={scene} />}</group>;
};

export default LogoAnimator;
