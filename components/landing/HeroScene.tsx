"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Float } from "@react-three/drei";
import * as THREE from "three";

function CampusBuilding() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 3, 2]} />
        <meshStandardMaterial color="#1e3a5f" metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[-3, 1, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 2, 1.8]} />
        <meshStandardMaterial color="#1e3a5f" metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[3, 1, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 2, 1.8]} />
        <meshStandardMaterial color="#1e3a5f" metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[0, 3.5, 0]} castShadow>
        <boxGeometry args={[1.5, 2, 1.5]} />
        <meshStandardMaterial color="#152a45" metalness={0.4} roughness={0.3} />
      </mesh>
      <mesh position={[0, 5, 0]} castShadow>
        <coneGeometry args={[1, 1.5, 4]} />
        <meshStandardMaterial color="#0d1f35" metalness={0.5} roughness={0.2} />
      </mesh>
      {[-1.2, -0.4, 0.4, 1.2].map((x, i) => (
        <mesh key={`win-main-${i}`} position={[x, 2, 1.01]}>
          <planeGeometry args={[0.5, 0.8]} />
          <meshStandardMaterial color="#3B82F6" emissive="#1d4ed8" emissiveIntensity={0.5} />
        </mesh>
      ))}
      {[-3.8, -3, -2.2].map((x, i) => (
        <mesh key={`win-left-${i}`} position={[x, 1.2, 0.91]}>
          <planeGeometry args={[0.4, 0.6]} />
          <meshStandardMaterial color="#3B82F6" emissive="#1d4ed8" emissiveIntensity={0.5} />
        </mesh>
      ))}
      {[2.2, 3, 3.8].map((x, i) => (
        <mesh key={`win-right-${i}`} position={[x, 1.2, 0.91]}>
          <planeGeometry args={[0.4, 0.6]} />
          <meshStandardMaterial color="#3B82F6" emissive="#1d4ed8" emissiveIntensity={0.5} />
        </mesh>
      ))}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#0A0E1A" metalness={0.1} roughness={0.9} />
      </mesh>
      {[-1.5, -0.5, 0.5, 1.5].map((x, i) => (
        <mesh key={`pillar-${i}`} position={[x, 0.5, 1.2]} castShadow>
          <cylinderGeometry args={[0.08, 0.1, 1, 8]} />
          <meshStandardMaterial color="#c9a96e" metalness={0.6} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function FloatingCards() {
  const cards = [
    { position: [-5, 3, -2] as [number, number, number], color: "#3B82F6" },
    { position: [5, 4, -3] as [number, number, number], color: "#F59E0B" },
    { position: [-4, -1, -4] as [number, number, number], color: "#10B981" },
    { position: [4, -2, -2] as [number, number, number], color: "#EF4444" },
    { position: [0, 5, -5] as [number, number, number], color: "#8B5CF6" },
    { position: [-6, 0, 0] as [number, number, number], color: "#EC4899" },
  ];

  return (
    <>
      {cards.map((card, i) => (
        <Float key={i} speed={1.5 + i * 0.2} rotationIntensity={0.3} floatIntensity={0.5 + i * 0.1}>
          <mesh position={card.position}>
            <boxGeometry args={[0.8, 0.5, 0.05]} />
            <meshStandardMaterial color={card.color} transparent opacity={0.8} emissive={card.color} emissiveIntensity={0.3} />
          </mesh>
        </Float>
      ))}
    </>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 10, 5]} intensity={1} castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[-5, 5, -5]} intensity={0.5} color="#3B82F6" />
      <pointLight position={[5, 3, 5]} intensity={0.3} color="#F59E0B" />
      <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      <CampusBuilding />
      <FloatingCards />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} maxPolarAngle={Math.PI / 2.2} minPolarAngle={Math.PI / 3} />
    </>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0">
      <Canvas shadows camera={{ position: [0, 3, 10], fov: 45 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
