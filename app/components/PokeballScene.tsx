"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

function Pokeball() {
  const groupRef = useRef<Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 1.05;
      groupRef.current.rotation.x = Math.sin(t * 0.4) * 0.15;
      groupRef.current.position.y = Math.sin(t * 0.9) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[1, 40, 40, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#ff3b30" metalness={0.3} roughness={0.45} />
      </mesh>
      <mesh>
        <sphereGeometry
          args={[1, 40, 40, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]}
        />
        <meshStandardMaterial color="#f4f4f0" metalness={0.2} roughness={0.4} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1, 0.06, 16, 80]} />
        <meshStandardMaterial color="#0b0f0e" metalness={0.5} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0, 1.02]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.23, 0.23, 0.1, 32]} />
        <meshStandardMaterial color="#0b0f0e" metalness={0.4} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0, 1.08]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.06, 32]} />
        <meshStandardMaterial color="#f4f4f0" metalness={0.3} roughness={0.35} />
      </mesh>
    </group>
  );
}

export default function PokeballScene({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={className ?? "h-72 w-72 sm:h-80 sm:w-80"}>
      <Canvas camera={{ position: [0, 0, 3.2], fov: 42 }}>
        <ambientLight intensity={0.55} />
        <directionalLight position={[3, 3, 3]} intensity={1.1} />
        <pointLight position={[-4, -2, -2]} intensity={0.6} />
        <Pokeball />
      </Canvas>
    </div>
  );
}
