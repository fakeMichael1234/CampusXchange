import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, PerformanceMonitor } from '@react-three/drei';

/**
 * Reusable 3D Scene Container built with React Three Fiber & Drei
 */
export const SceneContainer = ({
  children,
  cameraPosition = [0, 0, 6],
  enableControls = true,
  className = "w-full h-[400px]",
}) => {
  return (
    <div className={`relative ${className} rounded-2xl overflow-hidden`}>
      <Canvas
        camera={{ position: cameraPosition, fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <PerformanceMonitor />
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a1a1aa" />

        <Suspense fallback={null}>
          <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
            {children}
          </Float>
        </Suspense>

        {enableControls && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 3}
            rotateSpeed={0.5}
          />
        )}
      </Canvas>

      {/* Subtle drag hint — minimal, not intrusive */}
      <div className="absolute bottom-3 right-3 pointer-events-none font-mono text-[9px] text-cx-700 tracking-widest uppercase">
        Drag to rotate
      </div>
    </div>
  );
};
