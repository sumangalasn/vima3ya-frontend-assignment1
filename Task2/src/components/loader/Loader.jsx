export default function Loader() {
  return (
    <mesh>
      {/* fallback minimal loader inside canvas */}
      <boxGeometry />
      <meshStandardMaterial color="gray" />
    </mesh>
  );
}