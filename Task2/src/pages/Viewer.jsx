import Scene from "../components/three/Scene";
import Header from "../components/ui/Header";

export default function Viewer() {
  return (
    <div className="h-screen w-full bg-black relative">
      <Header />
      <Scene />
    </div>
  );
}