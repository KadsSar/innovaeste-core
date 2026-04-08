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
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, globalMouse.x * 12, 0.04);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 10 + globalMouse.y * 8, 0.04);
    state.camera.lookAt(0, -6, 0);
  });
  return null;
}

function WaveLayer({ positionY, color, speed, waveHeight, isWireframe = false }: { positionY: number, color: string, speed: number, waveHeight: number, isWireframe?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create a dense plane geometry: width, height, widthSegments, heightSegments
  const geom = useMemo(() => new THREE.PlaneGeometry(150, 150, 120, 120), []);
  
  // Store the original positions to base our math on stable values
  const originalPositions = useMemo(() => {
    return Array.from(geom.attributes.position.array);
  }, [geom]);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Speed parameter makes different layers move differently
    const time = state.clock.getElapsedTime() * speed;
    const positionAttr = meshRef.current.geometry.attributes.position as THREE.BufferAttribute;
    
    // Add interactivity based on global smooth mouse coordinates
    const mx = globalMouse.x * 5.0; 
    const my = globalMouse.y * 5.0;
    
    for (let i = 0; i < positionAttr.count; i++) {
        const idx = i * 3;
        const x = originalPositions[idx];
        const y = originalPositions[idx + 1];
        
        // Procedural overlapping math
        const wave1 = Math.sin(x * 0.1 + time * 0.8) * Math.cos(y * 0.1 + time * 0.4) * (waveHeight * 0.8);
        const wave2 = Math.sin(x * 0.05 - time * 0.6) * (waveHeight * 0.5);
        const interactiveWave = Math.sin(x * 0.02 + mx) * Math.cos(y * 0.02 + my) * waveHeight;

        // Apply z depth
        positionAttr.setZ(i, wave1 + wave2 + interactiveWave);
    }
    
    positionAttr.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();
  });

  return (
    <mesh 
      ref={meshRef} 
      geometry={geom} 
      rotation={[-Math.PI / 2.2, 0, 0]} 
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
      <Canvas camera={{ position: [0, 5, 20], fov: 60 }}>
        {/* Captures global window events and drives the camera parallax */}
        <CameraRig />
        
        <fog attach="fog" args={['#90E0EF', 10, 150]} />
        <ambientLight intensity={1.5} />
        
        <directionalLight position={[10, 20, 5]} intensity={4} color="#FFF" />
        <directionalLight position={[-10, 5, 10]} intensity={3} color="#E0FBFC" />
        <pointLight position={[0, -5, -5]} intensity={10} color="#00B4D8" />
        
        {/* Layer 1: Deepest, darkest, slowest wave */}
        <WaveLayer positionY={-8} color="#0077b6" speed={0.5} waveHeight={4} />
        
        {/* Layer 2: Mid layer, moderate speed */}
        <WaveLayer positionY={-5} color="#0096C7" speed={0.8} waveHeight={3} />
        
        {/* Layer 3: Highest, brightest, fastest wave */}
        <WaveLayer positionY={-3} color="#00B4D8" speed={1.2} waveHeight={2} />
        
        {/* Layer 4: Abstract glowing wireframe that clips through all of them! */}
        <WaveLayer positionY={-5} color="#E0FBFC" speed={0.7} waveHeight={3.5} isWireframe={true} />
      </Canvas>
    </div>
  );
}
