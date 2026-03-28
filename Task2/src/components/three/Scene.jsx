import { Canvas } from "@react-three/fiber";

export default function Scene() {
  return (
    <Canvas style={{ height: "100vh", width: "100vw" }}>
      <ambientLight />
      <mesh>
        <boxGeometry />
        <meshStandardMaterial color="red" />
      </mesh>
    </Canvas>
  );
}