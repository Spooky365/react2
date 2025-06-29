

// Global JSX Augmentation for React Three Fiber
import { ThreeElements } from "@react-three/fiber"; 

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

// --- Constants & Helper Functions ---
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
  color: '#000000', metalness: 1.0, roughness: 0.05, emissive: '#000000'
});

function OrbitingLights() {
  const whiteLightRef = useRef<THREE.PointLight>(null!);
  const greenRectLightRef = useRef<THREE.RectAreaLight>(null!);
  const movingPointLightRef = useRef<THREE.PointLight>(null!);
  
  useEffect(() => {
  const elapsedTime = 0; // mimic initial time
  const speed = 0.4;

  if (whiteLightRef.current) {
    whiteLightRef.current.position.x = 10 * Math.sin(elapsedTime * speed * 0.9);
    whiteLightRef.current.position.z = 10 * Math.cos(elapsedTime * speed * 0.9);
  }
  if (greenRectLightRef.current) {
    greenRectLightRef.current.position.x = -10 * Math.cos(elapsedTime * speed * 0.7);
    greenRectLightRef.current.position.z = -10 * Math.sin(elapsedTime * speed * 0.7);
    greenRectLightRef.current.lookAt(0, 0, 0);
  }
  if (movingPointLightRef.current) {
    movingPointLightRef.current.position.x = 5 * Math.cos(elapsedTime * speed * 1.2);
    movingPointLightRef.current.position.z = 5 * Math.sin(elapsedTime * speed * 1.2);
    movingPointLightRef.current.position.y = 3 + 2 * Math.sin(elapsedTime * speed * 1.5);
  }
}, []);

  return (
    <>
      <pointLight ref={whiteLightRef} position={[10, 10, 10]} intensity={200} color={"#FFFFFF"} castShadow />
      <rectAreaLight ref={greenRectLightRef} width={32} height={32} intensity={100} color={"#A3E635"} position={[-10, -5, -10]} />
      <pointLight ref={movingPointLightRef} color="#A3E635" intensity={180} position={[5, 3, 0]} />
    </>
  );
}

function AutoAnimatingR3FRubik() {
  const groupRef = useRef<THREE.Group>(null!);
  const rotationGroupRef = useRef<THREE.Group>(null!);
  const timeoutIdRef = useRef<number | null>(null);
  const currentMovementParamsRef = useRef({ rotX: 0.01, rotY: 0.02, rotZ: 0.006 });
  const targetMovementParamsRef = useRef({ rotX: 0.01, rotY: 0.02, rotZ: 0.006 });
  const [cubes, setCubes] = useState<THREE.Mesh[]>([]);

  useEffect(() => {
    if (rotationGroupRef.current && rotationGroupRef.current.userData.isAnimating === undefined) {
      rotationGroupRef.current.userData.isAnimating = false;
    }

    const gatheredCubes: THREE.Mesh[] = [];
    if (groupRef.current) {
        groupRef.current.traverse((child) => { if (child instanceof THREE.Mesh) gatheredCubes.push(child); });
    }
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
    if (!rotationGroupRef.current || !groupRef.current) { onComplete(); return;}
    const tempGroup = rotationGroupRef.current;
    if (tempGroup.userData.isAnimating === undefined) {
      tempGroup.userData.isAnimating = false; 
    }
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
          if (groupRef.current) { 
            groupRef.current.attach(cube);
          }
          cube.position.set(Math.round(cube.position.x), Math.round(cube.position.y), Math.round(cube.position.z));
          cube.rotation.set(0, 0, 0); 
        });
        tempGroup.rotation.set(0, 0, 0); 
        tempGroup.updateMatrixWorld(true);
        tempGroup.userData.isAnimating = false; 
        onComplete();
      }).start();
  }, [cubes]);

  const scheduleNextTurn = useCallback(() => {
    if (!rotationGroupRef.current || rotationGroupRef.current.userData.isAnimating === undefined) { 
        timeoutIdRef.current = window.setTimeout(scheduleNextTurn, 200);
        return; 
    }
    const tempGroup = rotationGroupRef.current;
    if (tempGroup.userData.isAnimating) { 
        timeoutIdRef.current = window.setTimeout(scheduleNextTurn, 200); 
        return; 
    }
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
    if(cubes.length > 0) { 
        if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = window.setTimeout(scheduleNextTurn, 250); // Ensure initial setup time
    }
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
          meshes.push(<mesh key={`cube-${i}-${j}-${k}`} position={[i, j, k]} geometry={r3fSharedBoxGeometry} material={r3fSharedMetallicMaterial} castShadow receiveShadow />);
        }
      }
    }
    return meshes;
  }, []);

  return (
    <group ref={groupRef} scale={[1.28, 1.28, 1.28]}>
      <group ref={rotationGroupRef} userData={{ isAnimating: false }} />
      {cubeMeshes}
    </group>
  );
}

function SceneFixer() {
  const { camera, controls, invalidate } = useThree();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (controls) {
        const orbitControls = controls as any; 

        const canUpdateAzimuthal = typeof orbitControls.getAzimuthalAngle === 'function' && typeof orbitControls.setAzimuthalAngle === 'function';
        const canUpdatePolar = typeof orbitControls.getPolarAngle === 'function' && typeof orbitControls.setPolarAngle === 'function';
        const canUpdateControls = typeof orbitControls.update === 'function';

        if (canUpdateAzimuthal && canUpdatePolar && canUpdateControls) {
          const currentAzimuthal = orbitControls.getAzimuthalAngle();
          const currentPolar = orbitControls.getPolarAngle();
          const delta = 0.01; 
          
          orbitControls.setAzimuthalAngle(currentAzimuthal + delta);
          orbitControls.setPolarAngle(currentPolar + delta);
          
          orbitControls.update(); 
          invalidate();        

          requestAnimationFrame(() => {
            if (orbitControls.update) { // Check again in case controls are disposed
                orbitControls.update();
            }
            if (camera) { // Check if camera is still valid
                camera.updateProjectionMatrix();
            }
            invalidate(); 
          });
          
        } else if (camera) {
          camera.position.x += 0.0001; 
          camera.updateMatrixWorld(true); 
          invalidate();
        }
      } else if (camera) {
        camera.position.x += 0.0001;
        camera.updateMatrixWorld(true);
        invalidate();
      }
    }, 750); 

    return () => clearTimeout(timer);
  }, [camera, controls, invalidate]);

  return null; 
}

function R3FSceneCube() { 
  const [lightRotationY] = useState(0.10); 

  return (
    <div className="w-full h-full bg-black">
      <Canvas 
        camera={{ position: [5, 5, 5], fov: 50, near: 0.1, far: 1000 }} 
        gl={{ antialias: true }}
        dpr={window.devicePixelRatio} 
        shadows
      >
        <color attach="background" args={['#000000']} />
        
        <ambientLight intensity={0.4} /> 
        <pointLight position={[-10, -10, -10]} intensity={80} color={"#FFFFFF"} /> 
        <spotLight 
            position={[0, -10, 5]} 
            angle={0.3} 
            penumbra={0.2} 
            intensity={80} 
            castShadow 
            color={"#22C55E"} 
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
        />
        <rectAreaLight
          width={20} height={20} intensity={70} color={"#FFFFFF"}
          position={[5, 5, 15]} rotation-x={-Math.PI / 4} rotation-y={lightRotationY}
          lookAt={new THREE.Vector3(0,0,0)}
        />
        
        <OrbitingLights />
        <AutoAnimatingR3FRubik />
        
        <OrbitControls 
            enablePan={true} 
            enableZoom={false} 
            enableRotate={true} 
            minDistance={3}
            maxDistance={20}
        />
        
        <EffectComposer>
          <Bloom 
            luminanceThreshold={0.95} 
            luminanceSmoothing={0.1} 
            height={400} 
            intensity={0.1} 
          />
        </EffectComposer>

        <SceneFixer />
      </Canvas>
    </div>
  );
}

export { R3FSceneCube };

