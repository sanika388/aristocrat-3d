"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Box, Cpu, Layers, ShieldCheck, Zap, Wrench, CheckCircle2, Search, SlidersHorizontal } from "lucide-react";

interface Material {
  name: string;
  category: "High-Temp" | "High-Strength" | "Medical/ISO";
  technology: string;
  tensileStrength: string;
  tensileValue: number; // for sorting/filtering capability if needed
  flexuralModulus: string;
  hdt: string;
  applications: string;
}

const materialsData: Material[] = [
  {
    name: "ULTEM 9085 (PEI)",
    category: "High-Temp",
    technology: "Industrial FDM",
    tensileStrength: "74 MPa",
    tensileValue: 74,
    flexuralModulus: "2.22 GPa",
    hdt: "153°C",
    applications: "Aerospace Interiors, Ducting, Flame Retardant Housings",
  },
  {
    name: "PA12 Carbon Fiber (CF-Nylon)",
    category: "High-Strength",
    technology: "Advanced FDM / SLS",
    tensileStrength: "135 MPa",
    tensileValue: 135,
    flexuralModulus: "9.50 GPa",
    hdt: "172°C",
    applications: "Robotic End-Effectors, Jig Fixtures, Metal Replacements",
  },
  {
    name: "Polycarbonate (PC-ISO)",
    category: "Medical/ISO",
    technology: "High-Temp FDM",
    tensileStrength: "68 MPa",
    tensileValue: 68,
    flexuralModulus: "2.10 GPa",
    hdt: "138°C",
    applications: "Medical Devices, Food Contact Tooling, Transparent Enclosures",
  },
  {
    name: "Accura Xtreme (ABS-like)",
    category: "High-Strength",
    technology: "SLA Stereolithography",
    tensileStrength: "51 MPa",
    tensileValue: 51,
    flexuralModulus: "1.82 GPa",
    hdt: "58°C",
    applications: "Snap-fit Assemblies, Master Patterns, Consumer Electronics",
  },
  {
    name: "Formlabs Tough 2000",
    category: "High-Strength",
    technology: "SLA Stereolithography",
    tensileStrength: "54 MPa",
    tensileValue: 54,
    flexuralModulus: "1.95 GPa",
    hdt: "51°C",
    applications: "Stiff High-Impact Enclosures, Living Hinges, Prototype Gears",
  },
];

export default function ServicesPage() {
  const [selectedTab, setSelectedTab] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredMaterials = useMemo(() => {
    return materialsData.filter((item) => {
      const matchesTab = selectedTab === "All" || item.category === selectedTab;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.technology.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.applications.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [selectedTab, searchQuery]);

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F9FA] text-slate-900">
      {/* 1. HEADER SECTION */}
      <section className="bg-gradient-to-b from-[#0B132B] via-[#1C2541] to-[#0B132B] text-white py-24 lg:py-32 relative overflow-hidden border-b border-slate-800">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
           
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 font-sans">
            Enterprise Grade Additive <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300">Production Infrastructure</span>
          </h1>
          <p className="text-slate-300 max-w-3xl mx-auto text-lg lg:text-xl leading-relaxed font-normal">
            From single-unit isotropic engineering prototypes to scaled low-volume production runs of 10,000+ units. Built for high-stress aerospace, medical, and industrial automation deployments.
          </p>
        </div>
      </section>

      {/* 2. CORE INDUSTRIAL SERVICES GRID */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
 
          <h3 className="text-3xl sm:text-4xl font-extrabold text-[#1A365D] tracking-tight">Advanced Technologies & Production Systems</h3>
          <p className="text-slate-600 mt-3">Engineered industrial production lines calibrated for micrometer-level exactitude.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Service 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-xl bg-blue-50 text-[#3182CE] flex items-center justify-center mb-6 group-hover:bg-[#3182CE] group-hover:text-white transition-colors shadow-sm">
                <Box className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-[#1A365D] mb-3">Industrial FDM & FFF Processing</h4>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                High-throughput fused deposition manufacturing utilizing heated chamber architecture to mitigate thermal gradients and warping in high-performance thermoplastics.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-700 font-medium mb-8">
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" /> Build Volume: Up to 1000 × 1000 × 1000 mm</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" /> Dimensional Tolerance: ±0.15 mm</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" /> Active Chamber Heating up to 90°C</li>
              </ul>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
              <span>LEAD TIME: 2-4 DAYS</span>
              <span className="text-blue-600 font-bold">ISO-COMPLIANT</span>
            </div>
          </div>

          {/* Service 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-xl bg-blue-50 text-[#3182CE] flex items-center justify-center mb-6 group-hover:bg-[#3182CE] group-hover:text-white transition-colors shadow-sm">
                <Cpu className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-[#1A365D] mb-3">Stereolithography (SLA / MSLA)</h4>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Photopolymerization laser scanning technology delivering ultra-smooth surface finishes, sharp microscopic features, and isotropic structural integrity.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-700 font-medium mb-8">
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" /> Minimum Layer Thickness: 25 Microns</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" /> Surface Roughness: Ra 0.4 - 1.0 µm</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" /> Direct Investment Casting Resins Available</li>
              </ul>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
              <span>LEAD TIME: 24-48 HRS</span>
              <span className="text-blue-600 font-bold">OPTICAL GRADE</span>
            </div>
          </div>

          {/* Service 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-xl bg-blue-50 text-[#3182CE] flex items-center justify-center mb-6 group-hover:bg-[#3182CE] group-hover:text-white transition-colors shadow-sm">
                <Layers className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-[#1A365D] mb-3">Selective Laser Sintering (SLS)</h4>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Powder bed fusion technology that fuses engineering-grade nylon powder via CO2 laser sintering, eliminating the requirement for structural support structures.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-700 font-medium mb-8">
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" /> 100% Isotropic Mechanical Properties</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" /> Complex Internal Channels & Assemblies</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" /> High Elongation at Break (%): Up to 20%</li>
              </ul>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
              <span>LEAD TIME: 3-5 DAYS</span>
              <span className="text-blue-600 font-bold">NO SUPPORTS</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TECHNICAL MATERIAL MATRIX SECTION WITH INTERACTIVE FILTER PILLS & SEARCH */}
      <section className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
 
            <h3 className="text-3xl font-bold text-[#1A365D]">Verified Engineering Polymer Specifications</h3>
            <p className="text-slate-600 mt-3 text-sm">Rigorous laboratory testing documentation for structural thermal and mechanical compliance.</p>
          </div>

          {/* Interactive Toolbar: Filter Pills & Search Input */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <span className="text-xs font-mono uppercase text-slate-500 flex items-center gap-1.5 mr-2">
                <SlidersHorizontal className="w-3.5 h-3.5" /> Filter:
              </span>
              {["All", "High-Temp", "High-Strength", "Medical/ISO"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedTab === tab
                      ? "bg-[#1A365D] text-white shadow-md"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Live Search Bar */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search polymer or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Interactive Data Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm mb-16">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0B132B] text-white text-xs font-mono uppercase tracking-wider">
                  <th className="py-4 px-6">Material Grade</th>
                  <th className="py-4 px-6">Technology</th>
                  <th className="py-4 px-6">Tensile Strength (MPa)</th>
                  <th className="py-4 px-6">Flexural Modulus (GPa)</th>
                  <th className="py-4 px-6">HDT @ 1.8 MPa (°C)</th>
                  <th className="py-4 px-6">Primary Applications</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm font-sans">
                {filteredMaterials.length > 0 ? (
                  filteredMaterials.map((item, index) => (
                    <tr key={index} className={`hover:bg-slate-50 transition-colors ${index % 2 === 1 ? "bg-slate-50/50" : ""}`}>
                      <td className="py-4 px-6 font-bold text-[#1A365D]">{item.name}</td>
                      <td className="py-4 px-6 text-slate-600">{item.technology}</td>
                      <td className="py-4 px-6 font-mono text-slate-700">{item.tensileStrength}</td>
                      <td className="py-4 px-6 font-mono text-slate-700">{item.flexuralModulus}</td>
                      <td className="py-4 px-6 font-mono text-slate-700">{item.hdt}</td>
                      <td className="py-4 px-6 text-slate-600 text-xs">{item.applications}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-500 text-sm font-mono">
                      No matching polymer specifications found for &quot;{searchQuery}&quot; under category &quot;{selectedTab}&quot;.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
 
              <h3 className="text-3xl font-bold text-[#1A365D] mb-6">Metrology-Grade Inspection & Post-Processing</h3>
              <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                Every print undergoes rigorous quality control protocols including laser-scanned dimensional verification, coordinate measuring machine (CMM) analysis, and thermal stress relief baking where specified.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 text-[#3182CE] flex items-center justify-center shrink-0 font-bold font-mono">01</div>
                  <div>
                    <h5 className="font-bold text-[#1A365D] text-sm">Automated Geometry Analysis (DFAM)</h5>
                    <p className="text-xs text-slate-600 mt-1">Our platform algorithms scan wall thickness, overhang angles, and non-manifold edges before manufacturing execution.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 text-[#3182CE] flex items-center justify-center shrink-0 font-bold font-mono">02</div>
                  <div>
                    <h5 className="font-bold text-[#1A365D] text-sm">Advanced Surface Finishing & Vapor Smoothing</h5>
                    <p className="text-xs text-slate-600 mt-1">Chemical vapor smoothing options seal porosity completely, matching injection-molded surface aesthetics and fluid-tight performance.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#0B132B] p-8 rounded-2xl text-white shadow-2xl relative overflow-hidden border border-slate-800">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />
              <h4 className="text-2xl font-bold mb-4 font-sans tracking-tight">Need custom material sourcing?</h4>
              <p className="text-slate-300 text-sm mb-8 leading-relaxed">
                Working with specialized defense, aerospace, or medical specifications requiring custom compounding or ITAR compliance? Consult our chief materials engineer directly.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
                  <span>ITAR Compliant Data Management Infrastructure</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <Zap className="w-5 h-5 text-cyan-400 shrink-0" />
                  <span>Instant CAD Quote Analysis Engine API</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <Wrench className="w-5 h-5 text-cyan-400 shrink-0" />
                  <span>Dedicated Application Engineering Support</span>
                </div>
              </div>
              <Link
                href="/quote"
                className="w-full inline-flex items-center justify-center px-6 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold transition-all shadow-lg shadow-blue-500/25 gap-2 font-sans tracking-wide"
              >
                Upload CAD & Run Analysis
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}