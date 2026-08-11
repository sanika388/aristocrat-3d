import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Plane, Car, Stethoscope, Cpu, ShieldAlert, Wrench, Sparkles } from "lucide-react";

export default function IndustriesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F7F9FA] text-slate-900">
      {/* 1. HEADER SECTION */}
      <section className="bg-gradient-to-b from-[#0B132B] via-[#1C2541] to-[#0B132B] text-white py-24 lg:py-32 relative overflow-hidden border-b border-slate-800">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
           
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 font-sans">
            Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300">High-Stakes Industries & Custom Craft</span>
          </h1>
          <p className="text-slate-300 max-w-3xl mx-auto text-lg lg:text-xl leading-relaxed font-normal">
            Discover how engineers, product designers, creators, and brands rely on Aristocrat 3D Printing for dependable functional parts and custom showpieces.
          </p>
        </div>
      </section>

      {/* 2. INDUSTRIES GRID SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
           
          <h3 className="text-3xl sm:text-4xl font-extrabold text-[#1A365D] tracking-tight">Industries & Custom Creations We Serve</h3>
          <p className="text-slate-600 mt-3">Specialized manufacturing deployment across complex operational environments and creative design.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Industry 1: Aerospace & Defense (Jet / Drone theme) */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300 group flex flex-col justify-between overflow-hidden">
            <div>
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <Image
                  src="https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=800&q=80"
                  alt="Aerospace fighter jet and flight technology"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-white/90 backdrop-blur-md text-[#3182CE] flex items-center justify-center shadow-md">
                  <Plane className="w-6 h-6" />
                </div>
              </div>
              <div className="p-8 pb-4">
                <h4 className="text-xl font-bold text-[#1A365D] mb-3">Aerospace & Defense</h4>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Lightweight structural brackets, wind tunnel test models, and high-temperature thermal ducting manufactured with carbon-fiber reinforced composites.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-700 font-medium mb-6">
                  <li className="flex items-center gap-2.5">✓ High strength-to-weight performance</li>
                  <li className="flex items-center gap-2.5">✓ Flame-retardant material capabilities</li>
                  <li className="flex items-center gap-2.5">✓ Tight dimensional tolerances</li>
                </ul>
              </div>
            </div>
            <div className="px-8 pb-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
              <span>ITAR COMPLIANT</span>
              <span className="text-blue-600 font-bold">GRADE A</span>
            </div>
          </div>

          {/* Industry 2: Automotive & Racing (Motorsports / Car theme) */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300 group flex flex-col justify-between overflow-hidden">
            <div>
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <Image
                  src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80"
                  alt="High performance sports car automotive parts"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-white/90 backdrop-blur-md text-[#3182CE] flex items-center justify-center shadow-md">
                  <Car className="w-6 h-6" />
                </div>
              </div>
              <div className="p-8 pb-4">
                <h4 className="text-xl font-bold text-[#1A365D] mb-3">Automotive & Motorsports</h4>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Rapid iteration of custom dash bezels, under-the-hood functional brackets, engine bay cooling ducts, and custom jigs for assembly lines.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-700 font-medium mb-6">
                  <li className="flex items-center gap-2.5">✓ Heat and oil resistant polymers</li>
                  <li className="flex items-center gap-2.5">✓ Fast turnaround for race-day fixes</li>
                  <li className="flex items-center gap-2.5">✓ Custom assembly jigs and fixtures</li>
                </ul>
              </div>
            </div>
            <div className="px-8 pb-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
              <span>FAST TURNAROUND</span>
              <span className="text-blue-600 font-bold">RACE-READY</span>
            </div>
          </div>

          {/* Industry 3: Medical & Healthcare (Medical equipment / lab theme) */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300 group flex flex-col justify-between overflow-hidden">
            <div>
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <Image
                  src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80"
                  alt="Advanced medical equipment and healthcare tools"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-white/90 backdrop-blur-md text-[#3182CE] flex items-center justify-center shadow-md">
                  <Stethoscope className="w-6 h-6" />
                </div>
              </div>
              <div className="p-8 pb-4">
                <h4 className="text-xl font-bold text-[#1A365D] mb-3">Medical & Healthcare</h4>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Anatomical visualization models derived from MRI/CT scans, surgical planning guides, and custom ergonomic medical device housings.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-700 font-medium mb-6">
                  <li className="flex items-center gap-2.5">✓ High-definition resin anatomical models</li>
                  <li className="flex items-center gap-2.5">✓ Strict confidential data handling</li>
                  <li className="flex items-center gap-2.5">✓ Ergonomic device prototyping</li>
                </ul>
              </div>
            </div>
            <div className="px-8 pb-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
              <span>ISO-13485 COMPLIANT</span>
              <span className="text-blue-600 font-bold">MEDICAL GRADE</span>
            </div>
          </div>

          {/* Industry 4: Consumer Electronics (Gadgets / circuit theme) */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300 group flex flex-col justify-between overflow-hidden">
            <div>
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <Image
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
                  alt="Consumer electronics and computer hardware components"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-white/90 backdrop-blur-md text-[#3182CE] flex items-center justify-center shadow-md">
                  <Cpu className="w-6 h-6" />
                </div>
              </div>
              <div className="p-8 pb-4">
                <h4 className="text-xl font-bold text-[#1A365D] mb-3">Consumer Electronics</h4>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Snap-fit enclosures, PCB housing mockups, and ergonomic consumer product outer shells ready for user testing before mass molding.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-700 font-medium mb-6">
                  <li className="flex items-center gap-2.5">✓ Perfect snap-fit tolerance precision</li>
                  <li className="flex items-center gap-2.5">✓ Smooth paintable surface finishes</li>
                  <li className="flex items-center gap-2.5">✓ Rapid design iteration cycles</li>
                </ul>
              </div>
            </div>
            <div className="px-8 pb-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
              <span>HIGH FIDELITY</span>
              <span className="text-blue-600 font-bold">SMOOTH FINISH</span>
            </div>
          </div>

          {/* Industry 5: Robotics & Automation (Robotic arm theme) */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300 group flex flex-col justify-between overflow-hidden">
            <div>
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <Image
                  src="https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80"
                  alt="Robotics engineering and automated mechanical arms"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-white/90 backdrop-blur-md text-[#3182CE] flex items-center justify-center shadow-md">
                  <Wrench className="w-6 h-6" />
                </div>
              </div>
              <div className="p-8 pb-4">
                <h4 className="text-xl font-bold text-[#1A365D] mb-3">Robotics & Automation</h4>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Custom robotic end-effectors, lightweight mechanical arms, sensor mounts, and modular gear enclosures built for heavy-duty lab and shop testing.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-700 font-medium mb-6">
                  <li className="flex items-center gap-2.5">✓ Rigid structural components</li>
                  <li className="flex items-center gap-2.5">✓ Lightweight custom end-effectors</li>
                  <li className="flex items-center gap-2.5">✓ Low-batch scalable production</li>
                </ul>
              </div>
            </div>
            <div className="px-8 pb-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
              <span>STRENGTH OPTIMIZED</span>
              <span className="text-blue-600 font-bold">INDUSTRIAL</span>
            </div>
          </div>

          {/* Industry 6: Custom Showpieces & Memorabilia (Collectible figure / showpiece theme) */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300 group flex flex-col justify-between overflow-hidden">
            <div>
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <Image
                  src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80"
                  alt="Detailed custom showpiece figurines and artistic collectibles"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-white/90 backdrop-blur-md text-[#3182CE] flex items-center justify-center shadow-md">
                  <Sparkles className="w-6 h-6" />
                </div>
              </div>
              <div className="p-8 pb-4">
                <h4 className="text-xl font-bold text-[#1A365D] mb-3">Custom Showpieces & Memorabilia</h4>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Bespoke sculptures, themed props, branded corporate awards, and collector showpieces crafted with exceptional surface detail and vibrant finishes.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-700 font-medium mb-6">
                  <li className="flex items-center gap-2.5">✓ Ultra-high resolution detail rendering</li>
                  <li className="flex items-center gap-2.5">✓ Custom post-processing & metallic/matte painting</li>
                  <li className="flex items-center gap-2.5">✓ Unique themed or branded collectibles</li>
                </ul>
              </div>
            </div>
            <div className="px-8 pb-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
              <span>HIGH ARTISTRY</span>
              <span className="text-blue-600 font-bold">CUSTOM FINISH</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CALL TO ACTION BANNER */}
      <section className="py-20 bg-white border-t border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#1A365D] mb-4">Have a specialized project or custom showpiece in mind?</h3>
          <p className="text-slate-600 max-w-xl mx-auto mb-8 text-sm sm:text-base leading-relaxed">
            Our engineering and creative team is ready to analyze your design specifications, suggest optimal materials, and provide rapid automated quotations.
          </p>
          <Link
            href="/quote"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold transition-all shadow-lg shadow-blue-500/25 gap-3 font-sans tracking-wide"
          >
            Upload CAD Model & Get Quote
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}