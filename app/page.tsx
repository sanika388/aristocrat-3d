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

  // State for Live Sliding Reviews & Client Submissions with LocalStorage persistence
  const [reviews, setReviews] = useState<Review[]>(() => {
    if (typeof window !== "undefined") {
      const savedReviews = localStorage.getItem("aristocrat_user_reviews");
      if (savedReviews) {
        try {
          return JSON.parse(savedReviews);
        } catch (e) {
          console.error("Failed to parse local storage reviews", e);
        }
      }
    }
    return INITIAL_REVIEWS;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Form State for User Submission
  const [newAuthor, setNewAuthor] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newText, setNewText] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [newMaterial, setNewMaterial] = useState("PLA Pro");

  // Save to localStorage whenever reviews change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("aristocrat_user_reviews", JSON.stringify(reviews));
    }
  }, [reviews]);

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
    
    // Reset form fields
    setNewAuthor("");
    setNewRole("");
    setNewText("");
    setNewRating(5);
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
        </div>
      </section>

      {/* REVIEWS SECTION WITH LIVE SLIDER & SUBMISSION MODAL */}
      <section className="py-24 bg-[#050813] relative border-t border-slate-800/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Client Reviews</h2>
          <p className="text-slate-400 mt-4 text-base font-light max-w-2xl mx-auto">
            See live feedback from our custom orders. Want to share your experience? Leave a review below!
          </p>

          <div className="mt-8">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold text-sm shadow-lg shadow-blue-500/20 transition-all hover:scale-105"
            >
              <MessageSquarePlus className="w-4 h-4" />
              Write a Review
            </button>
          </div>
        </div>

        {/* Live Sliding Review Grid / Ticker */}
        <div 
          className="relative w-full overflow-hidden py-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className={`flex gap-6 w-max animate-scroll px-4 ${isPaused ? '[animation-play-state:paused]' : ''}`}>
            {reviews.concat(reviews).map((rev, idx) => (
              <div 
                key={`${rev.id}-${idx}`}
                className="w-[350px] sm:w-[400px] bg-slate-900/90 border border-slate-800/80 p-6 rounded-2xl flex flex-col justify-between shadow-xl backdrop-blur-xl shrink-0"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {rev.materialLabel}
                    </span>
                  </div>
                  <p className="text-slate-300 text-sm font-light leading-relaxed mb-6">
                    &ldquo;{rev.text}&rdquo;
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-slate-800 pt-4 text-xs">
                  <div>
                    <h4 className="font-bold text-white">{rev.name}</h4>
                    <p className="text-slate-400">{rev.role}</p>
                  </div>
                  <span className="text-slate-500 font-mono">{rev.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEW SUBMISSION MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white bg-slate-800/80 p-2 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-bold text-white mb-2">Share Your Experience</h3>
            <p className="text-slate-400 text-sm mb-6">Your review will be instantly saved and displayed live.</p>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Your Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Alex Morgan"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Role / Company</label>
                <input 
                  type="text" 
                  placeholder="e.g. Hardware Designer"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Material Used</label>
                  <select 
                    value={newMaterial}
                    onChange={(e) => setNewMaterial(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="PLA Pro">PLA Pro</option>
                    <option value="ABS & ASA">ABS & ASA</option>
                    <option value="UV Resin">UV Resin</option>
                    <option value="Carbon Fiber Nylon">Carbon Fiber Nylon</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Rating (1-5)</label>
                  <select 
                    value={newRating}
                    onChange={(e) => setNewRating(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="5">5 Stars - Excellent</option>
                    <option value="4">4 Stars - Great</option>
                    <option value="3">3 Stars - Good</option>
                    <option value="2">2 Stars - Fair</option>
                    <option value="1">1 Star - Poor</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Review Comment</label>
                <textarea 
                  required
                  rows={3}
                  placeholder="How was your experience with our prints and service?"
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-3 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-sm font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold shadow-lg shadow-blue-500/20 transition-all"
                >
                  Post Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}