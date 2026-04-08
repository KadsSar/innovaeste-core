import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';

// Global store to hold smooth mouse coordinates regardless of z-index blocking
const globalMouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

function CameraRig() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      globalMouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      globalMouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  useFrame((state) => {
    // Smoothen mouse movements precisely via linear interpolation (lerp)
    globalMouse.x = THREE.MathUtils.lerp(globalMouse.x, globalMouse.targetX, 0.04);
    globalMouse.y = THREE.MathUtils.lerp(globalMouse.y, globalMouse.targetY, 0.04);
    
    // Flawless majestic camera parallax shift based on cursor
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, globalMouse.x * 10, 0.04);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 25 + globalMouse.y * 10, 0.04);
    state.camera.lookAt(0, -5, -20); // Look steeply down into the infinite ocean so it fills the screen
  });
  return null;
}

function WaveLayer({ positionY, color, speed, waveHeight, isWireframe = false }: { positionY: number, color: string, speed: number, waveHeight: number, isWireframe?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Massive plane to ensure it fills the entire background without showing edges
  const geom = useMemo(() => new THREE.PlaneGeometry(350, 350, 150, 150), []);
  
  // Store the original positions to base our math on stable values
  const originalPositions = useMemo(() => {
    return Array.from(geom.attributes.position.array);
  }, [geom]);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Create a smooth rolling time scale
    const time = state.clock.getElapsedTime() * speed * 0.8;
    const positionAttr = meshRef.current.geometry.attributes.position as THREE.BufferAttribute;
    
    // Add interactivity based on global smooth mouse coordinates
    const mx = globalMouse.x * 2.0; 
    const my = globalMouse.y * 2.0;
    
    for (let i = 0; i < positionAttr.count; i++) {
        const idx = i * 3;
        const x = originalPositions[idx];
        const y = originalPositions[idx + 1];
        
        // REAL WAVES (long expanding ridges), NOT BLOBS.
        // We use Math.sin(ax + by + t) to create diagonal, sweeping waves.
        const wave1 = Math.sin(x * 0.02 + y * 0.015 + time) * (waveHeight * 0.6);
        const wave2 = Math.sin(x * -0.01 + y * 0.025 + time * 0.8) * (waveHeight * 0.4);
        
        // The interactive wave gently bends the water surface toward the mouse
        const interactiveWave = Math.sin(x * 0.01 + mx) * Math.sin(y * 0.01 + my) * (waveHeight * 0.3);

        // Apply depth toward the camera (Z axis of the highly rotated plane translates to world Y)
        positionAttr.setZ(i, wave1 + wave2 + interactiveWave);
    }
    
    positionAttr.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();
  });

  return (
    <mesh 
      ref={meshRef} 
      geometry={geom} 
      rotation={[-Math.PI / 2, 0, 0]} 
      position={[0, positionY, 0]}
    >
      <meshStandardMaterial 
        color={color} 
        wireframe={isWireframe}
        roughness={0.2}
        metalness={0.4}
        flatShading={false}
      />
    </mesh>
  );
}

export default function ThreeWaves() {
  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none" style={{ backgroundColor: '#CAF0F8', background: 'linear-gradient(180deg, rgba(202,240,248,1) 0%, rgba(144,224,239,1) 35%, rgba(0,180,216,1) 100%)' }}>
      <Canvas camera={{ position: [0, 15, 25], fov: 65 }}>
        {/* Captures global window events and drives the camera parallax */}
        <CameraRig />
        
        <fog attach="fog" args={['#90E0EF', 15, 120]} />
        <ambientLight intensity={1.5} />
        
        <directionalLight position={[10, 20, 10]} intensity={4} color="#FFF" />
        <directionalLight position={[-10, 10, -10]} intensity={3} color="#E0FBFC" />
        <pointLight position={[0, 10, 0]} intensity={10} color="#00B4D8" />
        
        {/* Layer 1: Deepest, darkest ocean swell */}
        <WaveLayer positionY={-8} color="#0077b6" speed={1.0} waveHeight={7} />
        
        {/* Layer 2: Mid layer intersecting wave */}
        <WaveLayer positionY={-5} color="#0096C7" speed={1.5} waveHeight={5} />
        
        {/* Layer 3: Highest, brightest surface breaks */}
        <WaveLayer positionY={-2} color="#00B4D8" speed={2.0} waveHeight={4} />
        
      </Canvas>
    </div>
  );
}
