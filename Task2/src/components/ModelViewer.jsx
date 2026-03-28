import React, { useEffect, useRef, useState, Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, useProgress, Html } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress.toFixed(0)}% loaded</Html>;
}

function Model() {
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");

  const gltf = useLoader(GLTFLoader, "/models/model-compressed.glb", (loader) => {
    loader.setDRACOLoader(dracoLoader);
  });

  useEffect(() => {
    console.log(`Model loaded`);
    return () => {
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
    };
  }, [gltf]);

  return <primitive object={gltf.scene} scale={1} />;
}

export default function ModelViewer() {
  return (
    <div className="w-full h-screen bg-gray-100">
      <Canvas camera={{ position: [0, 1, 3] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <Suspense fallback={<Loader />}>
          <Model />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}