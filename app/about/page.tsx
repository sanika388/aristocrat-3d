"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Shield, Zap, Target, CheckCircle2, FileCheck, Printer, Wrench } from "lucide-react";

export default function AboutPage() {
  const coreValues = [
    {
      title: "Precision First",
      description: "Every layer matters; we never compromise on dimensional accuracy or print parameters.",
      icon: Shield,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Relentless Innovation",
      description: "Constantly testing new slicing profiles, filaments, and post-processing techniques.",
      icon: Sparkles,
      color: "from-cyan-500 to-teal-500",
    },
    {
      title: "Client-Centric Collaboration",
      description: "Working closely with you to fast-track your physical prototyping loops seamlessly.",
      icon: Zap,
      color: "from-blue-600 to-indigo-600",
    },
    {
      title: "Absolute Integrity",
      description: "Protecting your designs and delivering consistent, dependable end-use results.",
      icon: Target,
      color: "from-teal-500 to-emerald-600",
    },
  ];

  const milestones = [
    { year: "Phase 1", title: "The First Machine", description: "Getting hands-on with a single printer, learning slicing profiles, and mastering manual bed leveling." },
    { year: "Phase 2", title: "Calibration Mastery", description: "Countless test prints and tuning adjustments to achieve high dimensional precision and reliable layer adhesion." },
    { year: "Phase 3", title: "Local Projects", description: "Taking on custom prints, helping peers and creators bring their digital designs into the physical world." },
    { year: "Today", title: "Independent Maker Hub", description: "Operating as a focused, quality-driven dual-printer setup turning custom ideas into reality." },
  ];

  const stats = [
    { label: "Successful Prints Delivered", value: "100+" },
    { label: "On-Time Delivery Rate", value: "99%" },
    { label: "Core Filaments Supported", value: "PLA, PETG, TPU" },
    { label: "Precision Calibration", value: "0.1 mm" },
  ];

  const manufacturingSteps = [
    { step: "01", title: "File Review", desc: "Initial mesh analysis and design-for-manufacturability check." },
    { step: "02", title: "Material Selection", desc: "Matching optimal polymer properties to your application loads." },
    { step: "03", title: "Print Optimization", desc: "Slicing adjustments for structural integrity and surface finish." },
    { step: "04", title: "3D Printing", desc: "Careful execution and monitoring across our dual Creality setup." },
    { step: "05", title: "Post-Processing", desc: "Support removal, cleaning, and manual finishing." },
    { step: "06", title: "Dimensional QA", desc: "Rigorous physical tolerance verification using calipers." },
    { step: "07", title: "Final Dispatch", desc: "Secure packaging and safe delivery to your hands." },
  ];

  return (
    <div className="min-h-screen bg-[#F7F9FA] text-slate-900 relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* 01. Hero Section */}
      <section className="bg-gradient-to-b from-[#0B132B] via-[#1C2541] to-[#0B132B] text-white py-24 relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 font-sans">
            Bringing Ideas to Life, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300">One Layer at a Time</span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed font-normal mb-8">
            Precision 3D printing and hands-on fabrication solutions for local creators, students, and innovators.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold transition-all shadow-lg shadow-blue-500/25 gap-3 font-sans tracking-wide"
            >
              Get an Instant Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#facility"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 text-white font-bold transition-all gap-3"
            >
              Explore Our Setup
            </a>
          </div>
        </div>
      </section>

      {/* 02. Who We Are */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider block mb-2">Who We Are</span>
          <h2 className="text-3xl font-extrabold text-[#1A365D] mb-4">Built on Passion & Precision</h2>
          <p className="text-slate-600">Discover the foundational principles that drive our independent maker workflow.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6 font-bold">01</div>
              <h3 className="text-xl font-bold text-[#1A365D] mb-3">Who We Are</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                A dedicated maker hub focused on mastering 3D printing parameters and turning digital files into reliable physical objects.
              </p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-600 flex items-center justify-center mb-6 font-bold">02</div>
              <h3 className="text-xl font-bold text-[#1A365D] mb-3">Why We Exist</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                To bridge the gap between digital CAD design and physical reality with accessible, high-attention-to-detail fabrication.
              </p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6 font-bold">03</div>
              <h3 className="text-xl font-bold text-[#1A365D] mb-3">Who We Serve</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                From student innovators and local robotics teams to independent product designers looking for reliable prototyping.
              </p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center mb-6 font-bold">04</div>
              <h3 className="text-xl font-bold text-[#1A365D] mb-3">What We Believe</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                In personal craftsmanship, careful calibration, and the immense value of hands-on quality control.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 03. Meet the Founders & Engineers */}
      <section className="py-20 bg-white border-y border-slate-200 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider block mb-2">Leadership & Engineering</span>
            <h2 className="text-3xl font-extrabold text-[#1A365D] mb-4">Meet the Founders & Engineers</h2>
            <p className="text-slate-600">The minds and hands behind every design, calibration, and physical build.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Founder 1: Om Shinde */}
            <div className="bg-[#F7F9FA] p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
              <div className="relative w-32 h-40 bg-slate-200 rounded-xl overflow-hidden shadow-md mb-6 border-2 border-white">
                <Image
                  src="/images/om-shinde.jpg"
                  alt="Om Shinde"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider mb-1">Co-Founder & Design Engineer</span>
              <h3 className="text-2xl font-bold text-[#1A365D] mb-3">Om Shinde</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Co-leads the conceptualization, digital modeling, and structural slicing parameters to ensure every custom component matches exact specifications from the ground up.
              </p>
              <div className="w-full pt-4 border-t border-slate-200 text-xs font-mono text-slate-500 mt-auto">
                Focus: CAD Design & Print Optimization
              </div>
            </div>

            {/* Founder 2: Aarya Devale */}
            <div className="bg-[#F7F9FA] p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
              <div className="relative w-32 h-40 bg-slate-200 rounded-xl overflow-hidden shadow-md mb-6 border-2 border-white">
                <Image
                  src="/images/aarya-devale.jpg"
                  alt="Aarya Devale"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-xs font-mono font-bold text-cyan-600 uppercase tracking-wider mb-1">Co-Founder & Fabrication Engineer</span>
              <h3 className="text-2xl font-bold text-[#1A365D] mb-3">Aarya Devale</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Co-leads hardware calibration, machine operation, and quality assurance, turning digital concepts into flawless physical objects with meticulous hands-on care.
              </p>
              <div className="w-full pt-4 border-t border-slate-200 text-xs font-mono text-slate-500 mt-auto">
                Focus: Machine Execution & Quality Control
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 04. Why We Started / Founder Story */}
      <section className="py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider block mb-2">Our Origins</span>
            <h2 className="text-3xl font-extrabold text-[#1A365D] mb-4">Why We Started</h2>
            <p className="text-slate-600">The journey from a single workbench to crafting custom physical realities.</p>
          </div>
          <div className="space-y-8 relative before:absolute before:inset-0 before:left-7 before:w-0.5 before:bg-slate-200">
            <div className="relative flex items-start gap-6">
              <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 z-10 shadow-md">01</div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 flex-1 shadow-sm">
                <h3 className="font-bold text-[#1A365D] text-lg mb-1">The Problem We Saw</h3>
                <p className="text-slate-600 text-sm">High prototyping costs and slow turnaround times making it difficult for creators and local innovators to test ideas physically.</p>
              </div>
            </div>
            <div className="relative flex items-start gap-6">
              <div className="w-14 h-14 rounded-2xl bg-cyan-600 text-white font-bold flex items-center justify-center shrink-0 z-10 shadow-md">02</div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 flex-1 shadow-sm">
                <h3 className="font-bold text-[#1A365D] text-lg mb-1">The Idea</h3>
                <p className="text-slate-600 text-sm">Starting lean and focusing heavily on parameter optimization, calibration mastery, and personalized client collaboration.</p>
              </div>
            </div>
            <div className="relative flex items-start gap-6">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0 z-10 shadow-md">03</div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 flex-1 shadow-sm">
                <h3 className="font-bold text-[#1A365D] text-lg mb-1">The Core Setup</h3>
                <p className="text-slate-600 text-sm">Countless hours spent tuning and pushing our dependable Creality machines to their absolute limits inside a dedicated workspace.</p>
              </div>
            </div>
            <div className="relative flex items-start gap-6">
              <div className="w-14 h-14 rounded-2xl bg-teal-600 text-white font-bold flex items-center justify-center shrink-0 z-10 shadow-md">04</div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 flex-1 shadow-sm">
                <h3 className="font-bold text-[#1A365D] text-lg mb-1">The First Success</h3>
                <p className="text-slate-600 text-sm">Successfully delivering precise functional prints and custom components for early local projects under tight personal standards.</p>
              </div>
            </div>
            <div className="relative flex items-start gap-6">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white font-bold flex items-center justify-center shrink-0 z-10 shadow-md">05</div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 flex-1 shadow-sm">
                <h3 className="font-bold text-[#1A365D] text-lg mb-1">Where We Are Today</h3>
                <p className="text-slate-600 text-sm">Operating as a focused, high-attention-to-detail independent maker hub, turning digital files into dependable physical solutions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05. Our Journey / Milestones */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-[#1A365D] mb-4">Our Growth Timeline</h2>
          <p className="text-slate-600">The steady journey from a single machine setup to hands-on custom fabrication.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((m, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold px-3 py-1 bg-blue-100 text-blue-700 rounded-full inline-block mb-4">
                  {m.year}
                </span>
                <h3 className="font-extrabold text-[#1A365D] text-lg mb-2">{m.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{m.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 06. Mission + Vision */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-900 to-[#0B132B] text-white p-10 rounded-3xl shadow-lg border border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400 mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-extrabold mb-4">Our Mission</h3>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              To empower creators and engineers by transforming CAD designs into flawless physical components with attention to detail and structural fidelity.
            </p>
          </div>
          <div className="bg-gradient-to-br from-[#1C2541] to-slate-900 text-white p-10 rounded-3xl shadow-lg border border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400 mb-6">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-extrabold mb-4">Our Vision</h3>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              To grow as a trusted independent maker hub known for precision calibration, reliability, and custom fabrication excellence.
            </p>
          </div>
        </div>
      </section>

      {/* 07. Core Values */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold mb-4">Core Principles That Drive Us</h2>
            <p className="text-slate-400">The foundational standards governing every print that leaves our setup.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((val, idx) => {
              const IconComp = val.icon;
              return (
                <div key={idx} className="bg-slate-800/80 border border-slate-700/80 p-8 rounded-3xl backdrop-blur-md flex flex-col justify-between">
                  <div>
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${val.color} flex items-center justify-center text-white mb-6 shadow-md`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{val.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{val.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 08. Our Engineering Expertise */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider block mb-2">Technical Mastery</span>
            <h2 className="text-3xl font-extrabold text-[#1A365D] mb-6">Our Engineering Expertise</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              We bring meticulous attention to detail to every print, focusing on optimal slicing parameters, structural orientation, and precision bed calibration.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              Working closely with every client, we analyze your digital models to choose the best layer heights, infill densities, and print orientations for maximum durability and clean aesthetics.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <span className="block font-bold text-blue-600 text-lg mb-1">Advanced Slicing</span>
                <span className="text-xs text-slate-500">Custom wall thicknesses, infill density matrices, and structural support tuning.</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <span className="block font-bold text-cyan-600 text-lg mb-1">Parameter Tuning</span>
                <span className="text-xs text-slate-500">Filament-specific temperature management and retraction calibration.</span>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#0B132B] to-[#1C2541] rounded-3xl p-8 text-white shadow-xl relative overflow-hidden border border-slate-800">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.15),transparent_50%)]" />
            <h3 className="text-2xl font-bold mb-4 relative z-10">Our Fabrication Focus</h3>
            <ul className="space-y-4 relative z-10 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <span>Fine-tuned FDM printing optimized for crisp layer lines, strength, and dimensional accuracy.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <span>Careful parameter calibration for PLA, PETG, and flexible filaments.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <span>Hands-on post-processing, support removal, and clean finishing for every single print.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 09. How We Manufacture (Workflow) */}
      <section className="py-20 bg-white border-y border-slate-200 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider block mb-2">Production Workflow</span>
            <h2 className="text-3xl font-extrabold text-[#1A365D] mb-4">How We Manufacture Your Parts</h2>
            <p className="text-slate-600">A rigorous, step-by-step methodology ensuring flawless conversion from file to physical object.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {manufacturingSteps.map((item, idx) => (
              <div key={idx} className="bg-[#F7F9FA] rounded-2xl p-6 border border-slate-200 flex flex-col justify-between relative overflow-hidden">
                <div>
                  <span className="text-xs font-mono font-bold px-3 py-1 bg-blue-100 text-blue-700 rounded-full inline-block mb-4">
                    Step {item.step}
                  </span>
                  <h3 className="font-extrabold text-[#1A365D] text-lg mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Quality & QA Process */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-r from-slate-900 to-[#1C2541] rounded-3xl p-10 text-white shadow-xl border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-cyan-400 mb-3">
              <FileCheck className="w-5 h-5" />
              <span className="text-xs font-mono uppercase tracking-wider font-bold">Uncompromising Assurance</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-4">Rigorous Quality Control Workflow</h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              We execute close inspections, incorporating initial CAD mesh verification, active mid-print layer checks, and final post-print measurements to guarantee complete compliance.
            </p>
          </div>
          <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl backdrop-blur-md w-full lg:w-auto shrink-0 space-y-3">
            <div className="flex items-center gap-3 text-sm font-semibold">
              <CheckCircle2 className="w-5 h-5 text-cyan-400" />
              <span>Mesh integrity & geometry checks</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-semibold">
              <CheckCircle2 className="w-5 h-5 text-cyan-400" />
              <span>Precision caliper dimensional logging</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-semibold">
              <CheckCircle2 className="w-5 h-5 text-cyan-400" />
              <span>Thermal stress & bed adhesion checks</span>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Company Numbers */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center">
              <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 block mb-2">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm font-medium text-slate-600">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 12. Facility / Print Farm (Dual Machine Showcase - Custom Aspect Ratios) */}
      <section id="facility" className="py-20 bg-white border-t border-slate-200 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider block mb-2">Production Infrastructure</span>
          <h2 className="text-3xl font-extrabold text-[#1A365D] mb-4">Inside Our Workshop</h2>
          <p className="text-slate-600 max-w-2xl mx-auto mb-12">Equipped with a dual-printer Creality setup optimized for precision prints, multi-material execution, and custom fabrication.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
           {/* Machine 1 Card (Ender Series - Standardized Size) */}
            <div className="bg-[#F7F9FA] p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
              <div className="relative w-full aspect-square bg-slate-200 rounded-2xl overflow-hidden shadow-md mb-6 border border-slate-300">
                <Image
                  src="/images/about/printer-1.png"
                  alt="Ender 3 Series Machine"
                  fill
                  className="object-contain p-4 object-center"
                />
              </div>
              <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider mb-1">FDM Platform A</span>
              <h3 className="font-bold text-[#1A365D] text-xl mb-2">Creality Ender Series</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Fine-tuned workhorse configured for consistent structural layer stacking, reliability, and robust everyday prototyping.
              </p>
              <div className="w-full pt-4 border-t border-slate-200 text-xs font-mono text-slate-500 mt-auto">
                Role: Primary Functional Prototyping
              </div>
            </div>

            {/* Machine 2 Card (Advanced Setup - Standardized Size) */}
            <div className="bg-[#F7F9FA] p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
              <div className="relative w-full aspect-square bg-slate-200 rounded-2xl overflow-hidden shadow-md mb-6 border border-slate-300">
                <Image
                  src="/images/about/printer-2.png"
                  alt="Advanced Creality Machine"
                  fill
                  className="object-contain p-4 object-center"
                />
              </div>
              <span className="text-xs font-mono font-bold text-cyan-600 uppercase tracking-wider mb-1">FDM Platform B</span>
              <h3 className="font-bold text-[#1A365D] text-xl mb-2">Advanced Creality Setup</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Equipped with upgraded hardware calibrations and tight tolerances for high-speed execution and crisp surface aesthetics.
              </p>
              <div className="w-full pt-4 border-t border-slate-200 text-xs font-mono text-slate-500 mt-auto">
                Role: High-Detail & Complex Geometries
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}