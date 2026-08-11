"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Center } from "@react-three/drei";
import { useEffect, useState, useRef } from "react";
import { STLLoader } from "three/addons/loaders/STLLoader.js";
import * as THREE from "three";

export default function STLViewer({ file, fileName }: { file?: File | null; fileName?: string }) {
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);
  const [dimensions, setDimensions] = useState<string | null>(null);
  const [currentFile, setCurrentFile] = useState<File | null | undefined>(file);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (file) setCurrentFile(file);
  }, [file]);

  useEffect(() => {
    if (!currentFile) {
      setGeometry(null);
      setDimensions(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      const contents = e.target?.result;
      if (!contents) return;

      try {
        const loader = new STLLoader();
        const parsedGeometry = loader.parse(contents as ArrayBuffer);
        
        parsedGeometry.center();
        parsedGeometry.computeVertexNormals();
        parsedGeometry.computeBoundingBox();

        const box = parsedGeometry.boundingBox;
        if (box) {
          const size = new THREE.Vector3();
          box.getSize(size);
          setDimensions(`${size.x.toFixed(1)} × ${size.y.toFixed(1)} × ${size.z.toFixed(1)} mm`);
        }

        setGeometry(parsedGeometry);
      } catch (err) {
        console.error("Error parsing STL:", err);
      }
    };

    reader.readAsArrayBuffer(currentFile);
  }, [currentFile]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => console.error(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setCurrentFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div 
      ref={containerRef}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className={`w-full bg-slate-900 rounded-xl overflow-hidden relative border border-slate-700 shadow-inner flex flex-col items-center justify-center group transition-all ${
        isFullscreen ? "h-screen rounded-none border-none" : "h-[400px]"
      }`}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={(e) => e.target.files?.[0] && setCurrentFile(e.target.files[0])} 
        accept=".stl,.obj,.3mf" 
        className="hidden" 
      />

      {/* Top Left Info Badge */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-1 pointer-events-none">
        <div className="bg-slate-800/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-xs text-slate-300">
          <span>{currentFile ? `Loaded: ${currentFile.name}` : fileName ? `Loaded: ${fileName}` : "Preview Area"}</span>
        </div>
        {dimensions && (
          <div className="bg-blue-950/90 backdrop-blur-md px-3 py-1 rounded-lg border border-blue-700/50 text-[11px] text-blue-300 font-mono">
            Size: {dimensions}
          </div>
        )}
      </div>

      {/* Top Right Fullscreen Button */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <button
          type="button"
          onClick={toggleFullscreen}
          className="bg-slate-800/90 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium transition-all shadow-md"
        >
          {isFullscreen ? "Exit Fullscreen" : "Fullscreen 🔍"}
        </button>
      </div>

      {!geometry && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <button 
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="pointer-events-auto px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow-lg transition-all"
          >
            Click to load 3D Model
          </button>
        </div>
      )}
      
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <color attach="background" args={["#0f172a"]} />
        <ambientLight intensity={1.2} />
        <directionalLight position={[10, 20, 15]} intensity={1.5} />
        <directionalLight position={[-10, -20, -15]} intensity={0.5} />
        
        <Center>
          {geometry ? (
            <mesh geometry={geometry}>
              <meshStandardMaterial color="#3182CE" roughness={0.4} metalness={0.6} />
            </mesh>
          ) : (
            <mesh rotation={[0.5, 0.5, 0]}>
              <boxGeometry args={[2, 2, 2]} />
              <meshStandardMaterial color="#64748B" roughness={0.3} metalness={0.8} wireframe={true} />
            </mesh>
          )}
        </Center>

        <OrbitControls 
          enableRotate={true} 
          enableZoom={true} 
          enablePan={true} 
          rotateSpeed={1.0}
          zoomSpeed={1.2}
          panSpeed={0.8}
          enableDamping={true}
          dampingFactor={0.05}
          autoRotate={false} 
        />
      </Canvas>
    </div>
  );
}