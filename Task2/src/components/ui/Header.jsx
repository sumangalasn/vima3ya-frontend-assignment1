import { useEffect, useState } from "react";

export default function Header() {
  const [loadTime, setLoadTime] = useState(null);

  useEffect(() => {
    // Listen for custom event from Model.jsx
    const handleLoadTime = (e) => {
      setLoadTime(e.detail);
    };

    window.addEventListener("modelLoaded", handleLoadTime);

    return () => {
      window.removeEventListener("modelLoaded", handleLoadTime);
    };
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full flex items-center justify-between px-6 py-4 bg-black/60 backdrop-blur-md text-white z-10">
      
      {/* Left: Title */}
      <div>
        <h1 className="text-xl font-semibold">3D Model Viewer</h1>
        <p className="text-sm text-gray-300">
          Optimized GLB with DRACO Compression
        </p>
      </div>

      {/* Right: Load Time */}
      <div className="text-right">
        {loadTime ? (
          <p className="text-sm text-green-400">
            Loaded in {loadTime} ms
          </p>
        ) : (
          <p className="text-sm text-gray-400">Loading...</p>
        )}
      </div>
    </div>
  );
}