"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ArrowRight, Box, Cpu, Sliders, Flame, Printer, ShieldCheck, Sparkles, Activity, Wrench, Star, Upload, Zap, Layers, CheckCircle2, MessageSquarePlus,  Send, Globe, MessageCircle, X, Phone, ArrowUpRight } from "lucide-react";

interface Review {
  id: string | number;
  name: string;
  role: string;
  source: "direct" | "google";
  materialLabel: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
}

const INITIAL_REVIEWS: Review[] = [
  {
    id: 1,
    name: "Rohan Kumar",
    role: "Lead Hardware Engineer",
    source: "direct",
    materialLabel: "ABS & ASA",
    rating: 5,
    text: "The dimensional accuracy on our functional ABS casing batch was spotless. Shipped ahead of schedule!",
    date: "3/5/36",
    verified: true,
  },
  {
    id: 2,
    name: "Marcus Vance",
    role: "Google Local Guide",
    source: "google",
    materialLabel: "Google Review",
    rating: 5,
    text: "Incredible 3D printing quality and lightning-fast customer support. The instant quote tool made our prototype run seamless.",
    date: "1 day ago",
    verified: true,
  },
  {
    id: 3,
    name: "Sarah M.",
    role: "Studio Art Director",
    source: "direct",
    materialLabel: "UV Resin",
    rating: 5,
    text: "Their resin print resolution is unmatched. Every tabletop miniature arrived with crisp details ready for painting.",
    date: "3 days ago",
    verified: true,
  },
  {
    id: 4,
    name: "Priya Sharma",
    role: "Verified Google Client",
    source: "google",
    materialLabel: "Google Review",
    rating: 5,
    text: "Ordered Carbon Fiber Nylon parts. The strength-to-weight ratio is fantastic. Will definitely order again!",
    date: "4 days ago",
    verified: true,
  },
];

export default function Home() {
  // State for Step 1: Interactive Material Selector Tabs
  const [activeMaterial, setActiveMaterial] = useState<'pla' | 'abs' | 'resin' | 'nylon'>('pla');
  
  // State for Step 3: Drag-and-Drop Dropzone state in CTA Banner
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State for Live Sliding Reviews & Client Submissions
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Form State for User Submission
  const [newAuthor, setNewAuthor] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newText, setNewText] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [newMaterial, setNewMaterial] = useState("PLA Pro");

  const materialsData = {
    pla: {
      name: "PLA & PLA+ (Eco-Friendly)",
      badge: "Popular",
      badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      code: "PLA-PRO",
      description: "Eco-friendly, rigid filament ideal for visual prototypes, architectural models, and smooth surface aesthetics.",
      strength: 65,
      strengthLabel: "Moderate (65%)",
      thermal: "60°C",
      resolution: "0.05mm - 0.2mm",
      priceMultiplier: "1.0x (Budget Friendly)",
      borderHover: "hover:border-blue-500/50",
    },
    abs: {
      name: "ABS & ASA (Industrial Grade)",
      badge: "Industrial",
      badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      code: "ABS-HC",
      description: "High impact resistance and thermal stability. Perfect for durable end-use components and outdoor enclosures.",
      strength: 85,
      strengthLabel: "High (85%)",
      thermal: "100°C+",
      resolution: "0.1mm - 0.3mm",
      priceMultiplier: "1.3x Standard",
      borderHover: "hover:border-cyan-500/50",
    },
    resin: {
      name: "Engineering UV Resin",
      badge: "High Detail",
      badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
      code: "UV-RESIN",
      description: "Micro-resolution stereolithography for ultra-sharp details, tabletop miniatures, and precision master molds.",
      strength: 70,
      strengthLabel: "Rigid / Fine (70%)",
      thermal: "75°C",
      resolution: "0.025mm (Ultra Fine)",
      priceMultiplier: "1.8x Premium",
      borderHover: "hover:border-indigo-500/50",
    },
    nylon: {
      name: "Carbon Fiber Nylon",
      badge: "Heavy Duty",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      code: "CF-NYLON",
      description: "Uncompromising stiffness-to-weight ratio. Engineered as a lightweight metallic alternative for drone and automotive parts.",
      strength: 98,
      strengthLabel: "Extreme (98%)",
      thermal: "160°C+",
      resolution: "0.08mm - 0.2mm",
      priceMultiplier: "2.5x Industrial Pro",
      borderHover: "hover:border-emerald-500/50",
    }
  };

  const currentMat = materialsData[activeMaterial];

  // Drag and Drop Handlers for CTA Dropzone
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      window.location.href = "/quote";
    }
  };

  // Handle new review submission
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newText) return;

    const newReviewItem: Review = {
      id: Date.now(),
      name: newAuthor,
      role: newRole || "Community Maker",
      source: "direct",
      materialLabel: newMaterial,
      rating: newRating,
      text: newText,
      date: "Just now",
      verified: true,
    };

    setReviews([newReviewItem, ...reviews]);
    setIsModalOpen(false);
    
    setNewAuthor("");
    setNewRole("");
    setNewText("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#070b19] text-white selection:bg-blue-500 selection:text-white font-sans antialiased overflow-x-hidden">
      
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0f172a] via-[#0b1329] to-[#070b19] text-white pt-16 pb-28 lg:py-32">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight max-w-5xl mx-auto mb-6 leading-[1.1]">
            Turn Your Ideas Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 drop-shadow-sm">Reality</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Professional 3D Printing Solutions for Prototypes, Functional Parts and Custom Manufacturing.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/quote"
              aria-label="Get a custom 3D printing quote"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold text-base shadow-xl shadow-blue-500/25 transition-all duration-300 hover:scale-105 active:scale-95 gap-3 border border-blue-400/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              Get Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/portfolio"
              aria-label="Explore our 3D printing portfolio"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-semibold text-base border border-slate-700/80 backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-95 hover:border-slate-600 shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              Explore Portfolio
            </Link>
          </div>

          <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden border border-slate-700/60 shadow-[0_0_50px_rgba(0,0,0,0.8)] bg-slate-950 group">
            <div className="relative aspect-video w-full overflow-hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                poster="/hero-poster.jpg"
                className="absolute inset-0 w-full h-full object-cover scale-125 origin-center transition-transform duration-1000 group-hover:scale-130"
              >
                <source src="/ai-printer-hero.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-slate-950/40 to-slate-950/80 pointer-events-none" />
            </div>

            <div 
              role="region" 
              aria-label="Manufacturing workflow steps sequence" 
              className="bg-slate-900/90 backdrop-blur-2xl border-t border-slate-800/80 px-4 sm:px-6 py-4 flex items-center justify-between text-xs font-medium tracking-wide overflow-x-auto whitespace-nowrap gap-4 scrollbar-none"
            >
              <div tabIndex={0} className="flex items-center gap-2 text-blue-400 group-hover:text-blue-300 transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded p-1">
                <div className="w-6 h-6 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20"><Sparkles className="w-3.5 h-3.5" /></div>
                <span>Idea</span>
              </div>
              <span className="text-slate-700 shrink-0" aria-hidden="true">──</span>
              <div tabIndex={0} className="flex items-center gap-2 text-cyan-400 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded p-1">
                <div className="w-6 h-6 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20"><Sliders className="w-3.5 h-3.5" /></div>
                <span>CAD Design</span>
              </div>
              <span className="text-slate-700 shrink-0" aria-hidden="true">──</span>
              <div tabIndex={0} className="flex items-center gap-2 text-indigo-400 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded p-1">
                <div className="w-6 h-6 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20"><Box className="w-3.5 h-3.5" /></div>
                <span>Slicing</span>
              </div>
              <span className="text-slate-700 shrink-0" aria-hidden="true">──</span>
              <div tabIndex={0} className="flex items-center gap-2 text-amber-400 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded p-1">
                <div className="w-6 h-6 rounded-lg bg-amber-500/10 flex items-center justify-center border border-amber-500/20"><Flame className="w-3.5 h-3.5" /></div>
                <span>Heating</span>
              </div>
              <span className="text-slate-700 shrink-0" aria-hidden="true">──</span>
              <div tabIndex={0} className="flex items-center gap-2 text-emerald-400 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded p-1">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20"><Printer className="w-3.5 h-3.5" /></div>
                <span>Printing</span>
              </div>
              <span className="text-slate-700 shrink-0" aria-hidden="true">──</span>
              <div tabIndex={0} className="flex items-center gap-2 text-blue-200 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded p-1">
                <div className="w-6 h-6 rounded-lg bg-blue-400/10 flex items-center justify-center border border-blue-400/20"><ShieldCheck className="w-3.5 h-3.5" /></div>
                <span>Finished Product</span>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-slate-800/80 max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-4">
            <div tabIndex={0} className="group relative overflow-hidden bg-gradient-to-br from-slate-900/90 via-slate-900/50 to-blue-950/30 p-5 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-all duration-300 shadow-xl hover:shadow-blue-500/10 text-center flex flex-col items-center justify-center gap-3 backdrop-blur-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
              <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform shadow-inner">
                <Activity className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-100 tracking-wide">High Precision</span>
            </div>

            <div tabIndex={0} className="group relative overflow-hidden bg-gradient-to-br from-slate-900/90 via-slate-900/50 to-cyan-950/30 p-5 rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 shadow-xl hover:shadow-cyan-500/10 text-center flex flex-col items-center justify-center gap-3 backdrop-blur-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
              <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20 group-hover:scale-110 transition-transform shadow-inner">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-100 tracking-wide">Multiple Materials</span>
            </div>

            <div tabIndex={0} className="group relative overflow-hidden bg-gradient-to-br from-slate-900/90 via-slate-900/50 to-indigo-950/30 p-5 rounded-2xl border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 shadow-xl hover:shadow-indigo-500/10 text-center flex flex-col items-center justify-center gap-3 backdrop-blur-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
              <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20 group-hover:scale-110 transition-transform shadow-inner">
                <Wrench className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-100 tracking-wide">Professional Finishing</span>
            </div>

            <div tabIndex={0} className="group relative overflow-hidden bg-gradient-to-br from-slate-900/90 via-slate-900/50 to-emerald-950/30 p-5 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 shadow-xl hover:shadow-emerald-500/10 text-center flex flex-col items-center justify-center gap-3 backdrop-blur-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
              <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform shadow-inner">
                <Zap className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-100 tracking-wide">Fast Response</span>
            </div>

            <div tabIndex={0} className="col-span-2 md:col-span-1 group relative overflow-hidden bg-gradient-to-br from-slate-900/90 via-slate-900/50 to-amber-950/30 p-5 rounded-2xl border border-slate-800 hover:border-amber-500/50 transition-all duration-300 shadow-xl hover:shadow-amber-500/10 text-center flex flex-col items-center justify-center gap-3 backdrop-blur-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
              <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20 group-hover:scale-110 transition-transform shadow-inner">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-100 tracking-wide">Custom Manufacturing</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES & CAPABILITIES SECTION */}
      <section className="py-24 bg-[#050813] relative border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
              Our Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Precision Services Tailored for Every Project</h2>
            <p className="text-slate-400 mt-4 text-base font-light">From functional mechanical end-use parts to highly detailed aesthetic prototypes, we deliver industrial excellence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800/80 hover:border-blue-500/50 p-8 transition-all duration-500 group flex flex-col justify-between shadow-2xl">
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition-all pointer-events-none" />
              <div>
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-6 border border-blue-500/20 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all">
                  <Box className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Prototype Printing</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8 font-light">
                  Rapid turnaround iterations for product design testing, form, fit, and visual validation before mass production.
                </p>
              </div>
              <Link href="/services" aria-label="Learn more about Prototype Printing" className="inline-flex items-center justify-between w-full p-4 rounded-xl bg-slate-900/80 hover:bg-blue-600 hover:text-white text-slate-300 text-sm font-semibold border border-slate-800 transition-all group/btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800/80 hover:border-cyan-500/50 p-8 transition-all duration-500 group flex flex-col justify-between shadow-2xl">
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-600/10 rounded-full blur-3xl group-hover:bg-cyan-600/20 transition-all pointer-events-none" />
              <div>
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-6 border border-cyan-500/20 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-white transition-all">
                  <Cpu className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Functional End-Use Parts</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8 font-light">
                  Engineered for structural strength and thermal resistance using advanced industrial filaments like ABS, Nylon, and Carbon Fiber.
                </p>
              </div>
              <Link href="/services" aria-label="Learn more about Functional End-Use Parts" className="inline-flex items-center justify-between w-full p-4 rounded-xl bg-slate-900/80 hover:bg-cyan-600 hover:text-white text-slate-300 text-sm font-semibold border border-slate-800 transition-all group/btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800/80 hover:border-indigo-500/50 p-8 transition-all duration-500 group flex flex-col justify-between shadow-2xl">
              <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl group-hover:bg-indigo-600/20 transition-all pointer-events-none" />
              <div>
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-6 border border-indigo-500/20 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Miniatures & Custom Orders</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8 font-light">
                  High-resolution resin printing optimized for intricate tabletop miniatures, jewelry casting patterns, and custom artistic pieces.
                </p>
              </div>
              <Link href="/services" aria-label="Learn more about Miniatures and Custom Orders" className="inline-flex items-center justify-between w-full p-4 rounded-xl bg-slate-900/80 hover:bg-indigo-600 hover:text-white text-slate-300 text-sm font-semibold border border-slate-800 transition-all group/btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STEP 1: INTERACTIVE MATERIAL SELECTOR TABS & DYNAMIC PREVIEW METRICS */}
      <section className="py-24 bg-[#070b19] relative border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
               
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Engineered Filaments & Resins Preview</h2>
            </div>
            <p className="text-slate-400 text-sm max-w-md font-light leading-relaxed">
              Click between different materials below to instantly preview dynamic physical ratings, layer resolution, and pricing multipliers.
            </p>
          </div>

          <div role="tablist" aria-label="Material selector" className="flex flex-wrap gap-3 mb-8 bg-slate-900/80 p-2 rounded-2xl border border-slate-800/80 backdrop-blur-xl">
            <button
              role="tab"
              aria-selected={activeMaterial === 'pla'}
              onClick={() => setActiveMaterial('pla')}
              className={`flex-1 min-w-[130px] px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${activeMaterial === 'pla' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'}`}
            >
              PLA Pro
            </button>
            <button
              role="tab"
              aria-selected={activeMaterial === 'abs'}
              onClick={() => setActiveMaterial('abs')}
              className={`flex-1 min-w-[130px] px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${activeMaterial === 'abs' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'}`}
            >
              ABS & ASA
            </button>
            <button
              role="tab"
              aria-selected={activeMaterial === 'resin'}
              onClick={() => setActiveMaterial('resin')}
              className={`flex-1 min-w-[130px] px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${activeMaterial === 'resin' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'}`}
            >
              UV Resin
            </button>
            <button
              role="tab"
              aria-selected={activeMaterial === 'nylon'}
              onClick={() => setActiveMaterial('nylon')}
              className={`flex-1 min-w-[130px] px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${activeMaterial === 'nylon' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'}`}
            >
              Carbon Fiber Nylon
            </button>
          </div>

          <div className="bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950 border border-slate-800/80 p-8 sm:p-10 rounded-3xl shadow-2xl transition-all duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${currentMat.badgeColor}`}>
                    {currentMat.badge}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Code: {currentMat.code}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">{currentMat.name}</h3>
                <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed mb-8">
                  {currentMat.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link 
                    href="/quote" 
                    aria-label={`Select ${currentMat.name} for instant quote`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold shadow-lg shadow-blue-500/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    Select Material in Quote Flow
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 p-6 rounded-2xl flex flex-col gap-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-3">Dynamic Preview Metrics</h4>
                
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1.5">
                    <span className="text-slate-400">Tensile Strength</span>
                    <span className="text-cyan-400">{currentMat.strengthLabel}</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full transition-all duration-500" style={{ width: `${currentMat.strength}%` }} />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs py-2 border-t border-slate-800/80">
                  <span className="text-slate-400">Thermal Resistance</span>
                  <span className="font-bold text-white font-mono">{currentMat.thermal}</span>
                </div>

                <div className="flex items-center justify-between text-xs py-2 border-t border-slate-800/80">
                  <span className="text-slate-400">Layer Resolution</span>
                  <span className="font-bold text-indigo-400 font-mono">{currentMat.resolution}</span>
                </div>

                <div className="flex items-center justify-between text-xs py-2 border-t border-slate-800/80">
                  <span className="text-slate-400">Pricing Factor</span>
                  <span className="font-bold text-emerald-400 font-mono">{currentMat.priceMultiplier}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LIVE FLOATING REVIEWS & GOOGLE REVIEWS SECTION */}
      <section className="py-24 bg-[#050813] relative border-t border-slate-800/50 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-12 text-center">
           
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"> Reviews </h2>
          <p className="text-slate-400 mt-4 text-base font-light max-w-2xl mx-auto">
            See live sliding feedback from our custom orders. Want to share your experience? Leave a review below!
          </p>

          <div className="mt-8">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <MessageSquarePlus className="w-4 h-4" />
              Submit Your Review
            </button>
          </div>
        </div>

        {/* FLOATING INFINITE SLIDING MARQUEE */}
        <div 
          className="relative w-full overflow-hidden py-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050813] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050813] to-transparent z-10 pointer-events-none" />

          <div className={`flex gap-6 w-max animate-marquee ${isPaused ? 'style-pause' : ''}`} style={{ animation: 'marquee 35s linear infinite', animationPlayState: isPaused ? 'paused' : 'running' }}>
            {[...reviews, ...reviews].map((review, index) => (
              <div
                key={`${review.id}-${index}`}
                tabIndex={0}
                className="w-[350px] sm:w-[400px] bg-slate-900/90 border border-slate-800/80 hover:border-blue-500/50 p-6 rounded-3xl flex flex-col justify-between shadow-xl backdrop-blur-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 shrink-0"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-amber-400" aria-label={`${review.rating} out of 5 stars`}>
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    
                    {review.source === "google" ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-full border border-cyan-800/60">
                        <Globe className="w-3 h-3" /> Google Review
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800">
                        {review.materialLabel}
                      </span>
                    )}
                  </div>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed italic mb-6 font-light line-clamp-3">
                    &quot;{review.text}&quot;
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center font-bold text-blue-400 text-xs">
                      {review.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <h4 className="text-xs font-bold text-white">{review.name}</h4>
                        {review.verified && (
                          <CheckCircle2 className="w-3 h-3 text-blue-400" aria-label="Verified" />
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400">{review.role}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SUBMIT REVIEW MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <h3 className="text-lg font-bold text-white">Leave Your Review</h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Role / Company</label>
                    <input
                      type="text"
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      placeholder="e.g. Product Designer"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Material Used</label>
                    <select
                      value={newMaterial}
                      onChange={(e) => setNewMaterial(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                    >
                      <option value="PLA Pro">PLA Pro</option>
                      <option value="ABS & ASA">ABS & ASA</option>
                      <option value="UV Resin">UV Resin</option>
                      <option value="Carbon Fiber Nylon">Carbon Fiber Nylon</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        className="p-1 focus-visible:outline-none"
                      >
                        <Star className={`w-6 h-6 ${star <= newRating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Review Message *</label>
                  <textarea
                    required
                    rows={3}
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    placeholder="Share details about your print quality, shipping speed, or accuracy..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold shadow-lg shadow-blue-500/20 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    Publish Review
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

        <style jsx>{`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            width: max-content;
          }
        `}</style>
      </section>

    </div>
  );
}