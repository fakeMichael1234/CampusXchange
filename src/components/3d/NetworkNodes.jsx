import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Text } from '@react-three/drei';

/**
 * 3D Monochrome Campus Network — Indian college context
 */
export const NetworkNodes = () => {
  const centralMesh  = useRef();
  const outerRing    = useRef();
  const innerRing    = useRef();

  useFrame((state, delta) => {
    if (centralMesh.current) {
      centralMesh.current.rotation.y += delta * 0.25;
      centralMesh.current.rotation.x += delta * 0.12;
    }
    if (outerRing.current) {
      outerRing.current.rotation.z -= delta * 0.18;
      outerRing.current.rotation.y += delta * 0.08;
    }
    if (innerRing.current) {
      innerRing.current.rotation.x += delta * 0.2;
      innerRing.current.rotation.z -= delta * 0.1;
    }
  });

  const orbiters = [
    [-2.2,  0.8,  0.0],
    [ 2.2, -0.6,  0.5],
    [ 0.0,  2.2, -0.8],
    [-1.2, -1.8,  0.2],
    [ 1.6,  1.5, -0.4],
    [-1.8,  0.0,  1.2],
  ];

  return (
    <group>
      {/* Central octahedron wireframe */}
      <mesh ref={centralMesh}>
        <octahedronGeometry args={[1.4, 0]} />
        <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.85} />
      </mesh>

      {/* Inner distorted core sphere */}
      <mesh>
        <sphereGeometry args={[0.7, 32, 32]} />
        <MeshDistortMaterial color="#18181b" roughness={0.2} metalness={0.9} distort={0.3} speed={2} />
      </mesh>

      {/* Outer torus ring */}
      <mesh ref={outerRing}>
        <torusGeometry args={[2.4, 0.015, 16, 100]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
      </mesh>

      {/* Inner torus ring (different axis) */}
      <mesh ref={innerRing}>
        <torusGeometry args={[1.8, 0.01, 12, 80]} />
        <meshBasicMaterial color="#a1a1aa" transparent opacity={0.3} />
      </mesh>

      {/* Campus node orbiters */}
      {orbiters.map((pos, idx) => (
        <group key={idx} position={pos}>
          <mesh>
            <icosahedronGeometry args={[0.22, 0]} />
            <meshStandardMaterial color="#ffffff" wireframe />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>
      ))}

      {/* Indian campus network label */}
      <Text
        position={[0, -2.5, 0]}
        fontSize={0.18}
        color="#52525b"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhRib2Atz4s.woff"
        anchorX="center"
        anchorY="middle"
      >
        CAMPUS NETWORK NODE
      </Text>
    </group>
  );
};
