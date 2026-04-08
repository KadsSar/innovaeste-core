import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function Ocean() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create a dense plane geometry: width, height, widthSegments, heightSegments
  const geom = useMemo(() => new THREE.PlaneGeometry(120, 120, 150, 150), []);
  
  // Store the original positions to base our math on stable values
  const originalPositions = useMemo(() => {
    return Array.from(geom.attributes.position.array);
  }, [geom]);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const positionAttr = meshRef.current.geometry.attributes.position as THREE.BufferAttribute;
    
    // Add interactivity based on mouse pointer coordinates (mapped from -1 to 1)
    const mx = state.pointer.x * 2.0; 
    const my = state.pointer.y * 2.0;
    
    for (let i = 0; i < positionAttr.count; i++) {
        const idx = i * 3;
        const x = originalPositions[idx];
        const y = originalPositions[idx + 1];
        
        // Complex procedural wave calculation using sin/cos combinations
        // Time factors influence speed, x/y map to wave width.
        // We gently influence the peak height with the mouse position!
        const wave1 = Math.sin(x * 0.1 + time * 0.8) * Math.cos(y * 0.1 + time * 0.4) * 2.0;
        const wave2 = Math.sin(x * 0.05 - time * 0.6) * 1.5;
        const interactiveWave = Math.sin(x * 0.02 + mx) * Math.cos(y * 0.02 + my) * 2.5;

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
      position={[0, -10, -15]}
    >
      <meshStandardMaterial 
        color="#00B4D8" 
        wireframe={false}
        roughness={0.1}
        metalness={0.6}
        flatShading={false}
      />
    </mesh>
  );
}

export default function ThreeWaves() {
  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none" style={{ backgroundColor: '#CAF0F8', background: 'linear-gradient(180deg, rgba(202,240,248,1) 0%, rgba(144,224,239,1) 35%, rgba(0,180,216,1) 100%)' }}>
      {/* We set pointerEvents auto ONLY on the canvas to catch mouse events, 
          but ensure it stays behind the dashboard via z-index layer handling */}
      <Canvas camera={{ position: [0, 5, 20], fov: 60 }} className="pointer-events-auto">
        <fog attach="fog" args={['#90E0EF', 10, 60]} />
        <ambientLight intensity={1.2} />
        {/* Lights mapped to much lighter shades of aqua and sky blue */}
        <directionalLight position={[10, 20, 5]} intensity={4} color="#E0FBFC" />
        <directionalLight position={[-10, 5, 10]} intensity={3} color="#00B4D8" />
        <pointLight position={[0, -5, -5]} intensity={10} color="#0077b6" />
        <Ocean />
      </Canvas>
    </div>
  );
}
