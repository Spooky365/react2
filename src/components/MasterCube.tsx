// MasterCube.tsx

// Global JSX Augmentation for React Three Fiber
import type { ThreeElements } from "@react-three/fiber";

declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import * as TWEEN from '@tweenjs/tween.js';

// Initialize Three.js extensions
RectAreaLightUniformsLib.init();

// --- Constants & Helper Functions (Unchanged) ---
const createBoxWithRoundedEdges = (width: number, height: number, depth: number, radius0: number, smoothness: number): THREE.ExtrudeGeometry => {
    const shape = new THREE.Shape();
    const eps = 0.00001;
    const radius = radius0 - eps;
    shape.absarc(eps, eps, eps, -Math.PI / 2, -Math.PI, true);
    shape.absarc(eps, height - radius * 2, eps, Math.PI, Math.PI / 2, true);
    shape.absarc(width - radius * 2, height - radius * 2, eps, Math.PI / 2, 0, true);
    shape.absarc(width - radius * 2, eps, eps, 0, -Math.PI / 2, true);
    const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: depth - radius0 * 2, bevelEnabled: true, bevelSegments: smoothness * 2, steps: 1,
        bevelSize: radius, bevelThickness: radius0, curveSegments: smoothness
    });
    geometry.center();
    return geometry;
};

// --- R3F Scene Cube Logic ---
const r3fSharedBoxGeometry = createBoxWithRoundedEdges(1, 1, 1, 0.05, 10);
const r3fSharedMetallicMaterial = new THREE.MeshStandardMaterial({
  color: '#000000', metalness: 1.0, roughness: 0.05,
});

function OrbitingLights() { /* ... This component is unchanged ... */
  const whiteLightRef = useRef<THREE.PointLight>(null!);
  const greenLightRef = useRef<THREE.RectAreaLight>(null!);
  const movingPointLightRef = useRef<THREE.PointLight>(null!);
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const speed = 0.4;
    whiteLightRef.current.position.x = 10 * Math.sin(elapsedTime * speed * 0.9);
    whiteLightRef.current.position.z = 10 * Math.cos(elapsedTime * speed * 0.9);
    if (greenLightRef.current) {
        greenLightRef.current.position.x = -10 * Math.cos(elapsedTime * speed * 0.7);
        greenLightRef.current.position.z = -10 * Math.sin(elapsedTime * speed * 0.7);
        greenLightRef.current.lookAt(0, 0, 0);
    }
    if(movingPointLightRef.current) {
        movingPointLightRef.current.position.x = 5 * Math.cos(elapsedTime * speed * 1.2);
        movingPointLightRef.current.position.z = 5 * Math.sin(elapsedTime * speed * 1.2);
        movingPointLightRef.current.position.y = 3 + 2 * Math.sin(elapsedTime * speed * 1.5); 
    }
  });
  return (
    <>
      <pointLight ref={whiteLightRef} position={[10, 10, 10]} intensity={150} castShadow />
      <rectAreaLight ref={greenLightRef} width={32} height={32} intensity={80} color={"#A3E635"} position={[-10, -5, -10]} />
      <pointLight ref={movingPointLightRef} color="#A3E635" intensity={150} position={[5, 3, 0]} />
    </>
  );
}

function AutoAnimatingR3FRubik() { /* ... This component is unchanged ... */
  const groupRef = useRef<THREE.Group>(null!);
  const rotationGroupRef = useRef<THREE.Group>(null!);
  const timeoutIdRef = useRef<number | null>(null);
  const currentMovementParamsRef = useRef({ rotX: 0.01, rotY: 0.02, rotZ: 0.006 });
  const targetMovementParamsRef = useRef({ rotX: 0.01, rotY: 0.02, rotZ: 0.006 });
  const [cubes, setCubes] = useState<THREE.Mesh[]>([]);
  useEffect(() => {
    const gatheredCubes: THREE.Mesh[] = [];
    groupRef.current.traverse((child) => { if (child instanceof THREE.Mesh) gatheredCubes.push(child); });
    setCubes(gatheredCubes);
  }, []);
  const randomizeMovementTarget = useCallback(() => {
    const params = targetMovementParamsRef.current;
    params.rotX = (Math.random() - 0.5) * 0.04;
    params.rotY = (Math.random() - 0.5) * 0.04;
    params.rotZ = (Math.random() - 0.5) * 0.04;
  }, []);
  useEffect(() => {
    randomizeMovementTarget();
    const intervalId = setInterval(randomizeMovementTarget, 3000);
    return () => clearInterval(intervalId);
  }, [randomizeMovementTarget]);
  const rotateLayer = useCallback((axis: 'x' | 'y' | 'z', layer: number, direction: number, onComplete: () => void) => {
    const tempGroup = rotationGroupRef.current;
    if (tempGroup.userData.isAnimating) { onComplete(); return; }
    const layerCubes = cubes.filter(cube => Math.round(cube.position[axis]) === layer);
    if (layerCubes.length === 0) { onComplete(); return; }
    tempGroup.userData.isAnimating = true;
    tempGroup.rotation.set(0, 0, 0);
    tempGroup.updateMatrixWorld(true);
    layerCubes.forEach(cube => tempGroup.attach(cube));
    const targetRotation = { ...tempGroup.rotation };
    targetRotation[axis] += (Math.PI / 2) * direction;
    new TWEEN.Tween(tempGroup.rotation)
      .to(targetRotation, 250).easing(TWEEN.Easing.Quadratic.Out)
      .onComplete(() => {
        layerCubes.forEach(cube => {
          groupRef.current.attach(cube);
          cube.position.set(Math.round(cube.position.x), Math.round(cube.position.y), Math.round(cube.position.z));
          cube.rotation.set(0, 0, 0);
        });
        tempGroup.rotation.set(0, 0, 0); tempGroup.updateMatrixWorld(true);
        tempGroup.userData.isAnimating = false; onComplete();
      }).start();
  }, [cubes]);
  const scheduleNextTurn = useCallback(() => {
    const tempGroup = rotationGroupRef.current;
    if (!tempGroup || tempGroup.userData.isAnimating) { timeoutIdRef.current = window.setTimeout(scheduleNextTurn, 200); return; }
    const axes: ('x'|'y'|'z')[] = ['x', 'y', 'z'];
    const layers = [-1, 0, 1];
    const directions = [-1, 1];
    const randomAxis = axes[Math.floor(Math.random() * axes.length)];
    const randomLayer = layers[Math.floor(Math.random() * layers.length)];
    const randomDirection = directions[Math.floor(Math.random() * directions.length)];
    rotateLayer(randomAxis, randomLayer, randomDirection, () => {
        const pause = 300 + Math.random() * 400;
        timeoutIdRef.current = window.setTimeout(scheduleNextTurn, pause);
    });
  }, [rotateLayer]);
  useEffect(() => {
    if(cubes.length > 0) { scheduleNextTurn(); }
    return () => { if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current); };
  }, [cubes, scheduleNextTurn]);
  useFrame(() => { 
    TWEEN.update(); 
    if (groupRef.current) {
        const current = currentMovementParamsRef.current;
        const target = targetMovementParamsRef.current;
        const lerpFactor = 0.05;
        current.rotX += (target.rotX - current.rotX) * lerpFactor;
        current.rotY += (target.rotY - current.rotY) * lerpFactor;
        current.rotZ += (target.rotZ - current.rotZ) * lerpFactor;
        
        groupRef.current.rotation.x += current.rotX;
        groupRef.current.rotation.y += current.rotY;
        groupRef.current.rotation.z += current.rotZ;
    }
  });
  const cubeMeshes = useMemo(() => {
    const meshes = [];
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        for (let k = -1; k <= 1; k++) {
          meshes.push(<mesh key={`cube-${i}-${j}-${k}`} position={[i, j, k]} geometry={r3fSharedBoxGeometry} material={r3fSharedMetallicMaterial} />);
        }
      }
    }
    return meshes;
  }, []);
  return (
    <group ref={groupRef} scale={[1.28, 1.28, 1.28]}>
      <group ref={rotationGroupRef} />
      {cubeMeshes}
    </group>
  );
}

// --- THE NEW FIX ---
// This component forces a re-render by slightly rotating the camera
// after a delay, simulating a user interaction.
function SceneFixer() {
  const { camera, controls } = useThree();
  
  useEffect(() => {
    // This effect runs only once after the scene mounts
    const timer = setTimeout(() => {
      if (controls) {
        // This is the most reliable way to trigger a redraw.
        // We slightly change the camera's polar angle.
        (controls as any).setAzimuthalAngle((controls as any).getAzimuthalAngle() + 0.00001);
      } else {
        // Fallback if controls aren't available for some reason
        camera.position.x += 0.000001;
      }
    }, 150); // 150ms delay is usually safe

    return () => clearTimeout(timer);
  }, [camera, controls]);

  return null; // Renders nothing
}


export function R3FSceneCube() {
  const [lightRotationY] = useState(0.10); 
  return (
    <div className="w-full h-full bg-black">
      <Canvas camera={{ position: [5, 5, 5], fov: 50 }} gl={{ antialias: true }} dpr={window.devicePixelRatio} shadows>
        <color attach="background" args={['#000000']} />
        
        {/* Scene components */}
        <ambientLight intensity={0.5} /> 
        <pointLight position={[-10, -10, -10]} intensity={80} /> 
        <spotLight position={[0, -10, 5]} angle={0.3} penumbra={0.2} intensity={180} castShadow color={"#22C55E"} />
        <rectAreaLight
          width={20} height={20} intensity={50} color={"#FFFFFF"}
          position={[5, 5, 15]} rotation-x={-Math.PI / 4} rotation-y={lightRotationY}
          lookAt={new THREE.Vector3(0,0,0)}
        />
        <OrbitingLights />
        <AutoAnimatingR3FRubik />
        <OrbitControls enablePan={true} enableZoom={false} enableRotate={true} />
        <EffectComposer>
          <Bloom luminanceThreshold={0.6} luminanceSmoothing={0.8} height={400} intensity={0.7} />
        </EffectComposer>

        {/* Add the fixer component to the scene */}
        <SceneFixer />
      </Canvas>
    </div>
  );
}
