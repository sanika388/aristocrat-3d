"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Shield, Zap, Thermometer, Layers } from "lucide-react";

export default function MaterialsPage() {
  const [filter, setFilter] = useState("All");

  const materials = [
    // Standard & Aesthetic
    { name: "PLA", category: "Standard", tagline: "Standard Prototype & Aesthetic Models", strength: "Moderate", temp: "Up to 60°C", flexibility: "Rigid", bestFor: "Concept models, architectural prototypes, miniatures, and visual displays.", price: "₹", color: "from-blue-500 to-cyan-500", bgBadge: "bg-blue-50 text-blue-600 border-blue-200", image: "/images/materials/pla.png" },
    { name: "Silk PLA", category: "Standard", tagline: "High-Gloss Silk Finish", strength: "Moderate", temp: "Up to 60°C", flexibility: "Rigid", bestFor: "Decorative items, sculptures, and eye-catching cosmetic prototypes.", price: "₹", color: "from-blue-400 to-indigo-400", bgBadge: "bg-blue-50 text-blue-600 border-blue-200", image: "/images/materials/silk-pla.png" },
    { name: "Matte PLA", category: "Standard", tagline: "Non-Reflective Surface Finish", strength: "Moderate", temp: "Up to 60°C", flexibility: "Rigid", bestFor: "Models requiring a smooth, layer-hiding, professional matte look.", price: "₹", color: "from-sky-400 to-blue-500", bgBadge: "bg-sky-50 text-sky-600 border-sky-200", image: "/images/materials/matte-pla.png" },
    
    // Functional & Everyday Durability
    { name: "PETG", category: "Functional", tagline: "Durable & Moisture Resistant", strength: "High", temp: "Up to 80°C", flexibility: "Semi-Rigid", bestFor: "Enclosures, mechanical parts exposed to moisture, brackets, and functional prototypes.", price: "₹₹", color: "from-cyan-500 to-teal-500", bgBadge: "bg-cyan-50 text-cyan-600 border-cyan-200", image: "/images/materials/petg.png" },
    { name: "ABS", category: "Functional", tagline: "High Thermal & Impact Resistance", strength: "High", temp: "Up to 100°C", flexibility: "Rigid", bestFor: "Automotive parts, rugged enclosures, snap-fit components, and functional end-use parts.", price: "₹₹", color: "from-indigo-500 to-blue-600", bgBadge: "bg-indigo-50 text-indigo-600 border-indigo-200", image: "/images/materials/abs.png" },
    { name: "ASA", category: "Functional", tagline: "UV-Resistant Outdoor Polymer", strength: "High", temp: "Up to 100°C", flexibility: "Rigid", bestFor: "Outdoor housings, automotive exterior components, and weather-exposed enclosures.", price: "₹₹", color: "from-blue-600 to-teal-600", bgBadge: "bg-blue-50 text-blue-600 border-cyan-200", image: "/images/materials/asa.png" },

    // Flexible & Elastomers
    { name: "TPU (95A)", category: "Flexible", tagline: "Flexible Rubber-like Elasticity", strength: "High Elongation", temp: "Up to 80°C", flexibility: "Very High (Flexible)", bestFor: "Gaskets, phone cases, vibration dampeners, grips, and flexible hinges.", price: "₹₹₹", color: "from-emerald-500 to-teal-600", bgBadge: "bg-emerald-50 text-emerald-600 border-emerald-200", image: "/images/materials/tpu.png" },
    { name: "TPE", category: "Flexible", tagline: "Super Soft Elastomer", strength: "High Elongation", temp: "Up to 70°C", flexibility: "Extreme Flexibility", bestFor: "Soft touch grips, wearable bands, flexible seals, and cushioning pads.", price: "₹₹₹", color: "from-teal-400 to-emerald-500", bgBadge: "bg-teal-50 text-teal-600 border-teal-200", image: "/images/materials/tpe.png" },
    { name: "TPU (85A)", category: "Flexible", tagline: "Extra Soft Rubber Compound", strength: "High Elongation", temp: "Up to 75°C", flexibility: "Very High", bestFor: "Highly compliant shock absorbers, flexible tubing, and wearable padding.", price: "₹₹₹", color: "from-green-500 to-teal-700", bgBadge: "bg-green-50 text-green-600 border-green-200", image: "/images/materials/tpu-85a.png" },

    // Composites & Natural Infusions
    { name: "Wood PLA", category: "Composites", tagline: "Real Wood Fiber Infused", strength: "Low-Moderate", temp: "Up to 60°C", flexibility: "Rigid", bestFor: "Aesthetic furniture models, architectural mockups, carved-look decor, and awards.", price: "₹₹", color: "from-amber-600 to-yellow-700", bgBadge: "bg-amber-50 text-amber-700 border-amber-200", image: "/images/materials/wood-pla.png" },
    { name: "Marble PLA", category: "Composites", tagline: "Stone-Textured Aesthetic Filament", strength: "Moderate", temp: "Up to 60°C", flexibility: "Rigid", bestFor: "Statues, faux-stone architectural elements, busts, and decorative pillars.", price: "₹₹", color: "from-stone-400 to-slate-500", bgBadge: "bg-stone-50 text-stone-700 border-stone-200", image: "/images/materials/marble-pla.png" },
    { name: "Copper / Bronze Fill", category: "Composites", tagline: "Metal-Infused Heavy Filament", strength: "Moderate", temp: "Up to 60°C", flexibility: "Rigid", bestFor: "Polishing/patina effect statues, unique hardware displays, and heavy cosmetic props.", price: "₹₹₹", color: "from-orange-600 to-amber-600", bgBadge: "bg-orange-50 text-orange-700 border-orange-200", image: "/images/materials/bronze-fill.png" },

    // Resin Varieties
    { name: "High-Detail Resin", category: "Resins", tagline: "Ultra-Smooth Surface Finish", strength: "Moderate", temp: "Up to 50°C", flexibility: "Rigid / Brittle", bestFor: "Tabletop miniatures, jewelry master casting patterns, dental models, and intricate figurines.", price: "₹₹₹", color: "from-purple-500 to-indigo-500", bgBadge: "bg-purple-50 text-purple-600 border-purple-200", image: "/images/materials/high-detail-resin.png" },
    { name: "ABS-Like Resin", category: "Resins", tagline: "Tough & Impact-Resistant Resin", strength: "High", temp: "Up to 65°C", flexibility: "Semi-Rigid", bestFor: "Snap-fit resin miniatures, functional enclosures, and durable master models.", price: "₹₹₹", color: "from-indigo-400 to-purple-600", bgBadge: "bg-indigo-50 text-indigo-600 border-indigo-200", image: "/images/materials/abs-resin.png" },
    { name: "Castable Resin", category: "Resins", tagline: "Ash-Free Investment Casting", strength: "Moderate", temp: "Up to 50°C", flexibility: "Rigid", bestFor: "Direct investment casting for jewelry, rings, pendants, and custom metal gear teeth.", price: "₹₹₹₹", color: "from-violet-500 to-fuchsia-500", bgBadge: "bg-violet-50 text-violet-600 border-violet-200", image: "/images/materials/castable-resin.png" },

    // Industrial & High-Performance
    { name: "Carbon Fiber Reinforced", category: "Industrial", tagline: "Extreme Strength-to-Weight Ratio", strength: "Exceptional", temp: "Up to 140°C", flexibility: "Rigid", bestFor: "Drone frames, aerospace prototypes, high-stress mechanical brackets, and racing parts.", price: "₹₹₹₹", color: "from-slate-800 to-blue-900", bgBadge: "bg-slate-100 text-slate-800 border-slate-300", image: "/images/materials/carbon-fiber.png" },
    { name: "Glass Fiber Nylon", category: "Industrial", tagline: "High Rigidity & Impact Strength", strength: "Exceptional", temp: "Up to 160°C", flexibility: "Rigid", bestFor: "Heavy industrial jigs, fixtures, robotic end-effectors, and stiff automotive brackets.", price: "₹₹₹₹", color: "from-zinc-700 to-slate-900", bgBadge: "bg-zinc-100 text-zinc-800 border-slate-300", image: "/images/materials/glass-fiber-nylon.png" },
    { name: "PEEK / PEKK", category: "Industrial", tagline: "Extreme Aerospace & Medical Polymer", strength: "Maximum", temp: "Up to 250°C+", flexibility: "Rigid", bestFor: "Metal replacement parts, chemical processing valves, surgical guides, and high-temp flight hardware.", price: "₹₹₹₹₹", color: "from-neutral-900 to-black", bgBadge: "bg-neutral-100 text-neutral-900 border-neutral-300", image: "/images/materials/peek.png" },
  ];

  const filteredMaterials = filter === "All" 
    ? materials 
    : materials.filter(m => m.category === filter);

  return (
    <div className="min-h-screen bg-[#F7F9FA] text-slate-900 relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#0B132B] via-[#1C2541] to-[#0B132B] text-white py-24 relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 font-sans">
            From Wood & PETG to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300">Advanced PEEK</span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed font-normal">
            Explore our extensive library spanning standard aesthetics, specialized wood/metal composites, flexible elastomers, and high-temp industrial polymers.
          </p>

          {/* Filter Navigation */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-10">
            {["All", "Standard", "Functional", "Flexible", "Composites", "Resins", "Industrial"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-xs font-mono font-semibold transition-all duration-300 ${
                  filter === cat
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30 scale-105"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60 backdrop-blur-md"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Materials Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMaterials.map((mat, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-blue-300 transition-all duration-500 flex flex-col justify-between group relative overflow-hidden"
            >
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${mat.color} z-20`} />

              {/* Unique Texture Preview Banner mapped per material */}
              <div className="relative h-32 w-full overflow-hidden bg-slate-900">
                <Image
                  src={mat.image}
                  alt={mat.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 blur-[1px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/30" />
                <span className="absolute bottom-3 left-6 text-xs font-mono font-bold px-3 py-1 bg-slate-900/80 backdrop-blur-md text-white rounded-full uppercase tracking-wider border border-slate-700 shadow-md">
                  {mat.name} Texture
                </span>
              </div>

              <div className="p-8 pt-4 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border uppercase tracking-wider ${mat.bgBadge}`}>
                      {mat.category}
                    </span>
                    <div className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg">
                      <span className="text-xs font-mono text-slate-500">Tier:</span>
                      <span className="font-bold text-slate-800 text-sm tracking-wider">{mat.price}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-extrabold text-[#1A365D] mb-3 group-hover:text-blue-600 transition-colors">
                    {mat.tagline}
                  </h3>
                  
                  <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                    {mat.bestFor}
                  </p>
                  
                  <div className="space-y-3 bg-slate-50 rounded-2xl p-4 border border-slate-100 mb-8 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-slate-500 flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-blue-500" /> Strength:
                      </span>
                      <span className="font-semibold text-slate-800">{mat.strength}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-slate-500 flex items-center gap-1.5">
                        <Thermometer className="w-3.5 h-3.5 text-amber-500" /> Heat Limit:
                      </span>
                      <span className="font-semibold text-slate-800">{mat.temp}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-slate-500 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-cyan-500" /> Flexibility:
                      </span>
                      <span className="font-semibold text-slate-800">{mat.flexibility}</span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/quote"
                  className="w-full py-3 rounded-xl bg-slate-900 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-500 text-white font-bold text-xs transition-all duration-300 text-center flex items-center justify-center gap-2 shadow-md shadow-slate-900/10 group-hover:shadow-blue-500/25"
                >
                  <span>Print with {mat.name}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white border-t border-slate-200 text-center relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1A365D] mb-4">Looking for a specialized military-grade or custom blended polymer?</h3>
          <p className="text-slate-600 max-w-xl mx-auto mb-8 text-sm sm:text-base leading-relaxed">
            If your exact material specification isn't listed here, reach out to our custom sourcing desk for specialty filament orders.
          </p>
          <Link
            href="/quote"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold transition-all shadow-lg shadow-blue-500/25 gap-3 font-sans tracking-wide"
          >
            Request Custom Material Sourcing
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

    </div>
  );
}