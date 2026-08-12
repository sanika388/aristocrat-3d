"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-900/90 backdrop-blur-md shadow-lg border-b border-slate-800 py-3"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        <Link href="/" className="flex items-center gap-3 group">
  {/* Modern 3D Geometric Icon Box */}
  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 via-[#3182CE] to-blue-900 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform border border-blue-400/30">
    <span className="text-white font-black text-xl tracking-tighter">A</span>
  </div>
  
  {/* Brand Text */}
  <div className="flex flex-col">
    <span className="text-white font-bold tracking-wider text-base md:text-lg leading-tight group-hover:text-blue-400 transition-colors">
      ARISTOCRAT
    </span>
    <span className="text-blue-400 font-mono tracking-widest text-[10px] uppercase">
      3D Printing
    </span>
  </div>
</Link>
        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-200">
          <Link href="/" className="hover:text-[#3182CE] transition-colors">Home</Link>
          <Link href="/services" className="hover:text-[#3182CE] transition-colors">Services</Link>
          <Link href="/industries" className="hover:text-[#3182CE] transition-colors">Industries</Link>
          <Link href="/portfolio" className="hover:text-[#3182CE] transition-colors">Portfolio</Link>
          <Link href="/materials" className="hover:text-[#3182CE] transition-colors">Materials</Link>
          <Link href="/about" className="hover:text-[#3182CE] transition-colors">About</Link>
          <Link href="/contact" className="hover:text-[#3182CE] transition-colors">Contact</Link>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/quote"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#3182CE] hover:bg-blue-600 text-white font-semibold text-sm shadow-md transition-all"
          >
            Get Quote
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-200 hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900 border-b border-slate-800 shadow-xl px-6 py-6 flex flex-col gap-4 text-slate-200">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium">Home</Link>
          <Link href="/services" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium">Services</Link>
          <Link href="/industries" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium">Industries</Link>
          <Link href="/portfolio" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium">Portfolio</Link>
          <Link href="/materials" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium">Materials</Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium">About</Link>
          <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium">Contact</Link>
          <Link
            href="/quote"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-center py-2.5 rounded-lg bg-[#3182CE] text-white font-semibold shadow-md"
          >
            Get Quote
          </Link>
        </div>
      )}
    </header>
  );
}