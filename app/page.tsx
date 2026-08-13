"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ArrowRight, Box, Cpu, Sliders, Flame, Printer, ShieldCheck, Sparkles, Activity, Wrench, Star, Zap, Layers, CheckCircle2, MessageSquarePlus, X } from "lucide-react";
import { supabase } from "@/utils/supabase";

interface Review {
  id: string | number;
  name: string;
  role: string;
  rating: number;
  message: string;
  status: string;
  created_at: string;
}

export default function Home() {
  // State for Step 1: Interactive Material Selector Tabs
  const [activeMaterial, setActiveMaterial] = useState<'pla' | 'abs' | 'resin' | 'nylon'>('pla');
  
  // State for Drag-and-Drop Dropzone state in CTA Banner
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reviews state from Supabase
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form State for User Submission
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");

  // Fetch approved reviews on load
  useEffect(() => {
    fetchApprovedReviews();
  }, []);

  async function fetchApprovedReviews() {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching reviews:', error);
    } else if (data) {
      setReviews(data);
    }
  }

  // Handle review submission to Supabase
  async function handleSubmitReview(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.from('reviews').insert([
      { name, role, rating, message, status: 'pending' }
    ]);

    if (error) {
      console.error('Error submitting review:', error);
      alert('Error submitting review. Please try again.');
    } else {
      setIsSubmitted(true);
      // Clear out form inputs immediately so old text does not linger
      setName("");
      setRole("");
      setRating(5);
      setMessage("");
    }
  }

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
                  Durable, stress-tested mechanical components manufactured with engineering-grade polymers and carbon fiber.
                </p>
              </div>
              <Link href="/services" aria-label="Learn more about Functional Parts" className="inline-flex items-center justify-between w-full p-4 rounded-xl bg-slate-900/80 hover:bg-cyan-600 hover:text-white text-slate-300 text-sm font-semibold border border-slate-800 transition-all group/btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800/80 hover:border-indigo-500/50 p-8 transition-all duration-500 group flex flex-col justify-between shadow-2xl">
              <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl group-hover:bg-indigo-600/20 transition-all pointer-events-none" />
              <div>
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-6 border border-indigo-500/20 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                  <Sliders className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Custom CAD & Slicing</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8 font-light">
                  Expert optimization of your 3D models, infill structures, and orientation settings for maximum structural integrity.
                </p>
              </div>
              <Link href="/services" aria-label="Learn more about Custom CAD" className="inline-flex items-center justify-between w-full p-4 rounded-xl bg-slate-900/80 hover:bg-indigo-600 hover:text-white text-slate-300 text-sm font-semibold border border-slate-800 transition-all group/btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LIVE REVIEWS SECTION (CONNECTED TO SUPABASE) */}
      <section className="py-24 bg-[#070b19] relative border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Testimonials
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">Customer Reviews</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            See what our clients say about our prints. Submit your review below for moderation.
          </p>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold shadow-lg hover:opacity-90 transition-all mb-12"
          >
            <MessageSquarePlus className="w-5 h-5" /> Write a Review
          </button>

          {/* Grid of Approved Reviews */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {reviews.length === 0 ? (
              <p className="text-slate-500 col-span-full text-center py-8">No approved reviews yet. Be the first to write one!</p>
            ) : (
              reviews.map((rev) => (
                <div key={rev.id} className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl flex flex-col justify-between shadow-xl">
                  <div>
                    <div className="flex items-center gap-1 text-amber-400 mb-3">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-slate-300 text-sm mb-4 leading-relaxed">&ldquo;{rev.message}&rdquo;</p>
                  </div>
                  <div className="border-t border-slate-800/80 pt-4 mt-2 flex justify-between items-end">
                    <div>
                      <p className="font-bold text-white text-sm">{rev.name}</p>
                      <p className="text-xs text-slate-500">{rev.role || "Client"}</p>
                    </div>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                      Verified
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* REVIEW MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl max-w-lg w-full relative shadow-2xl">
            <button 
              onClick={() => { setIsModalOpen(false); setIsSubmitted(false); }}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            {isSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
                <h3 className="text-2xl font-bold text-white">Review Submitted!</h3>
                <p className="text-slate-300 text-sm">
                  Your review has been sent for moderation and will appear on the site once approved by the owner in the Supabase dashboard.
                </p>
                <button
                  onClick={() => { setIsModalOpen(false); setIsSubmitted(false); fetchApprovedReviews(); }}
                  className="mt-4 px-6 py-2 bg-slate-800 text-white rounded-xl text-sm font-bold hover:bg-slate-700 transition-all"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4 text-left">
                <h3 className="text-xl font-bold text-white mb-2">Submit Your Review</h3>
                
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Your Name</label>
                  <input 
                    type="text" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rohan Kumar" 
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Role / Company</label>
                  <input 
                    type="text" 
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Lead Hardware Engineer" 
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Rating</label>
                  <select 
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value={5}>5 Stars - Excellent</option>
                    <option value={4}>4 Stars - Very Good</option>
                    <option value={3}>3 Stars - Good</option>
                    <option value={2}>2 Stars - Fair</option>
                    <option value={1}>1 Star - Poor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Your Feedback</label>
                  <textarea 
                    required 
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your print quality..." 
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500 resize-none" 
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold shadow-lg hover:opacity-90 transition-all"
                >
                  Submit For Approval
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}