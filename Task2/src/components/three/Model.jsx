import { useEffect, useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader, DRACOLoader } from "three-stdlib";
import { logLoadTime } from "../../utils/performance";

export default function Model() {
  // ✅ just declare ref (NO performance.now here)
  const startRef = useRef(0);

  const gltf = useLoader(
    GLTFLoader,
    "/model/model-compressed.glb",
    (loader) => {
      const dracoLoader = new DRACOLoader();

      dracoLoader.setDecoderPath(
        "https://www.gstatic.com/draco/versioned/decoders/1.5.6/"
      );

      loader.setDRACOLoader(dracoLoader);
    }
  );

  useEffect(() => {
    // ✅ NOW safe to call performance.now()
    startRef.current = performance.now();

    const end = performance.now();
    const time = (end - startRef.current).toFixed(2);

    logLoadTime(startRef.current);

    console.log(`Model loaded in ${time} ms`);

    window.dispatchEvent(
      new CustomEvent("modelLoaded", { detail: time })
    );
  }, []);

  return (
    <primitive
      object={gltf.scene}
      scale={1.5}
      position={[0, 0, 0]}
    />
  );
}