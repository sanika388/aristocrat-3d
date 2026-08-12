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
  const [isSubmitted, setIsSubmitted] = useState(false);

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

      {/* REVIEWS & MODAL SUBMISSION SECTION */}
      <section className="py-24 bg-[#050813] relative border-t border-slate-800/50 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">Customer Reviews</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Want to share your experience? Submit your review to our team for publication.
          </p>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold shadow-lg hover:opacity-90 transition-all"
          >
            <MessageSquarePlus className="w-5 h-5" /> Write a Review
          </button>
        </div>
      </section>

      {/* REVIEW MODAL WITH FORMSUBMIT PIPELINE */}
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
                <h3 className="text-2xl font-bold text-white">Review Sent for Approval!</h3>
                <p className="text-slate-300 text-sm">
                  Thank you! Your review has been emailed to our moderation team and will appear on the site once approved.
                </p>
                <button
                  onClick={() => { setIsModalOpen(false); setIsSubmitted(false); }}
                  className="mt-4 px-6 py-2 bg-slate-800 text-white rounded-xl text-sm font-bold"
                >
                  Close
                </button>
              </div>
            ) : (
              <form 
                action="https://formsubmit.co/aristrocrat3dprinting@gmail.com" 
                method="POST"
                onSubmit={() => setIsSubmitted(true)}
                className="space-y-4 text-left"
              >
                {/* FormSubmit Configuration Fields */}
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_subject" value="New Review Submission - Pending Approval" />
                
                <h3 className="text-xl font-bold text-white mb-2">Submit Your Review</h3>
                
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Your Name</label>
                  <input 
                    type="text" 
                    name="Name" 
                    required 
                    placeholder="e.g. John Doe" 
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Your Role / Company</label>
                  <input 
                    type="text" 
                    name="Role" 
                    placeholder="e.g. Product Designer" 
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Rating</label>
                  <select 
                    name="Rating" 
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="5 Stars">5 Stars - Excellent</option>
                    <option value="4 Stars">4 Stars - Very Good</option>
                    <option value="3 Stars">3 Stars - Good</option>
                    <option value="2 Stars">2 Stars - Fair</option>
                    <option value="1 Star">1 Star - Poor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Your Feedback</label>
                  <textarea 
                    name="Message" 
                    required 
                    rows={4}
                    placeholder="Tell us about your print quality and experience..." 
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