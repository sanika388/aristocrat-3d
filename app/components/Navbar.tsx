"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm border-b border-slate-200 dark:border-slate-800 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Logo with clean container background */}
       <Link href="/" className="flex items-center gap-2 group">
  <div className="flex items-center group-hover:scale-105 transition-transform">
    <img
      src="/images/new-logo.png"
      alt="Aristocrat 3D Printing Logo"
      className="h-12 md:h-16 w-auto object-contain"
    />
  </div>
</Link>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-700 dark:text-slate-200">
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
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#3182CE] hover:bg-blue-700 text-white font-semibold text-sm shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Get Quote
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-lg px-6 py-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 text-slate-800 dark:text-slate-200">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">Home</Link>
          <Link href="/services" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">Services</Link>
          <Link href="/industries" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">Industries</Link>
          <Link href="/portfolio" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">Portfolio</Link>
          <Link href="/materials" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">Materials</Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">About</Link>
          <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium">Contact</Link>
          <Link
            href="/quote"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-center py-3 rounded-lg bg-[#3182CE] text-white font-semibold shadow-md"
          >
            Get Quote
          </Link>
        </div>
      )}
    </header>
  );
}