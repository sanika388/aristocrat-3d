"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, X } from "lucide-react";

export default function PortfolioPage() {
  // State to track the currently selected image for the zoomed modal view
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string } | null>(null);

  // Curated list of top-tier 3D printed projects featuring your delivered work and placeholders
  const projects = [
    {
      title: "Architectural Floor Plan Model",
      category: "Architecture",
      material: "PLA White",
      desc: "Detailed multi-room residential layout complete with interior furnishings, window cutouts, and precision walls.",
      image: "/images/portfolio/architectural-model.png",
      highlight: "High Precision",
    },
    {
      title: "Patient-Specific Spinal Fusion Cage",
      category: "Medical & Healthcare",
      material: "Porous Medical-Grade Titanium",
      desc: "3D-printed spinal interbody device engineered with an optimized trabecular lattice structure to enhance osseointegration and bone ingrowth.",
      image: "/images/portfolio/medical-guide.png",
      highlight: "Biocompatible",
    },
    {
      title: "Modular Executive Desk Caddy",
      category: "Consumer Utility",
      material: "PETG / PLA",
      desc: "Custom-built desktop organizer featuring dedicated slots for sticky notes, business cards, stationery, and tech accessories.",
      image: "/images/portfolio/desk-organizer.png",
      highlight: "Custom Utility",
    },
    {
      title: "Topology-Optimized UAV Drone Frame",
      category: "Aerospace & Defense",
      material: "Carbon-Fiber Reinforced Polymer",
      desc: "High-strength, lightweight quadcopter chassis optimized for maximum payload capacity and structural rigidity under high-stress flight dynamics.",
      image: "/images/portfolio/aerospace-bracket.png",
      highlight: "Extreme Strength",
    },
    {
      title: "Minimalist Headphone Stand",
      category: "Tech Accessories",
      material: "Structural Matte Black",
      desc: "Sturdy vertical headset display stand engineered for stability, clean aesthetics, and daily workspace durability.",
      image: "/images/portfolio/headphone-stand.png",
      highlight: "Rigid Build",
    },
    {
      title: "Custom Robotic End-Effector Gripper Assembly",
      category: "Industrial Automation & Robotics",
      material: "Carbon-Fiber Reinforced Nylon",
      desc: "Precision multi-finger adaptive robotic tooling built for high-speed automated assembly lines and heavy continuous operation.",
      image: "/images/portfolio/robotic-gripper.png",
      highlight: "Wear Resistant",
    },
    
    {
      title: "Classic Historical Bust",
      category: "Fine Arts & Collectibles",
      material: "Metallic Grey Resin",
      desc: "Fine-resolution sculptural bust capturing intricate facial features, wavy hair texture, and classic attire folds.",
      image: "/images/portfolio/historical-bust.png",
      highlight: "Ultra Detailed",
    },
    {
      title: "CFD Fluid Flow Shrouded Impeller & Manifold",
      category: "Fluid Dynamics & Automotive",
      material: "High-Temp Engineering Photopolymer",
      desc: "Complex aerodynamic and hydrodynamic prototype components tested for wind-tunnel efficiency and low-friction fluid delivery.",
      image: "/images/portfolio/fluid-impeller.png",
      highlight: "Aero-Tested",
    },
    
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F9FA] text-slate-900 relative">
      {/* 1. HERO BANNER */}
      <section className="bg-gradient-to-b from-[#0B132B] via-[#1C2541] to-[#0B132B] text-white py-24 lg:py-32 relative overflow-hidden border-b border-slate-800">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
           
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 font-sans">
            Crafted for Excellence, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300">Engineered to Perform</span>
          </h1>
          <p className="text-slate-300 max-w-3xl mx-auto text-lg lg:text-xl leading-relaxed font-normal">
            Explore high-precision architectural models, utility organizers, structural tech mounts, and fine artistic busts manufactured on our production floor.
          </p>
        </div>
      </section>

      {/* 2. PORTFOLIO GRID SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase font-mono tracking-widest text-[#3182CE] mb-2 font-semibold">Featured Projects</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-[#1A365D] tracking-tight">Real Results from Our Production Floor</h3>
          <p className="text-slate-600 mt-3">Double-click any project image to see a zoomed-in version.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projects.map((proj, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-blue-300 transition-all duration-500 flex flex-col justify-between group"
            >
              {/* Image Box with Double-Click Zoom Event */}
              <div 
                className="relative h-64 w-full overflow-hidden bg-slate-900 cursor-zoom-in"
                onDoubleClick={() => setSelectedImage({ src: proj.image, title: proj.title })}
                title="Double-click to zoom image"
              >
                <Image
                  src={proj.image}
                  alt={proj.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 pointer-events-none">
                  <span className="bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-cyan-300 border border-slate-700/60 shadow-md">
                    {proj.category}
                  </span>
                </div>

                {/* Highlight Badge */}
                <div className="absolute top-4 right-4 pointer-events-none">
                  <span className="bg-blue-600/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white shadow-md flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-cyan-200" />
                    {proj.highlight}
                  </span>
                </div>

                {/* Hover Helper Hint */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <span className="bg-slate-900/90 text-cyan-300 font-mono text-xs px-3 py-1.5 rounded-lg border border-slate-700 shadow-lg">
                    Double-click to Zoom 🔍
                  </span>
                </div>

                {/* Material Tag at Bottom of Image */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-300 font-mono pointer-events-none">
                  <span className="bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-md border border-slate-700">
                    Material: <strong className="text-white">{proj.material}</strong>
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-8 flex flex-col justify-between flex-grow">
                <div>
                  <h4 className="text-xl font-bold text-[#1A365D] mb-3 group-hover:text-blue-600 transition-colors">
                    {proj.title}
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {proj.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. ZOOMED IMAGE LIGHTBOX MODAL */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
              <h3 className="text-white font-semibold text-lg">{selectedImage.title}</h3>
              <button 
                onClick={() => setSelectedImage(null)}
                className="text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative w-full h-[60vh] sm:h-[70vh] bg-slate-950">
              <Image
                src={selectedImage.src}
                alt={selectedImage.title}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* 4. CALL TO ACTION */}
      <section className="py-20 bg-white border-t border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#1A365D] mb-4">Have your own design ready for production?</h3>
          <p className="text-slate-600 max-w-xl mx-auto mb-8 text-sm sm:text-base leading-relaxed">
            Upload your CAD file today and let our advanced machinery and expert post-processing team turn your vision into reality.
          </p>
          <Link
            href="/quote"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold transition-all shadow-lg shadow-blue-500/25 gap-3 font-sans tracking-wide"
          >
            Upload Model & Get Instant Quote
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}