"use client";

import { useState } from "react";
import { MessageCircle, X, Phone, ArrowUpRight } from "lucide-react";

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Popup Dialog Box */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Aristocrat 3D Support</h4>
                <p className="text-xs text-emerald-100">Typically replies instantly</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body / Number Options */}
          <div className="p-4 space-y-3 bg-[#F7F9FA]">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Select an engineer to chat with:
            </p>

            {/* Option 1 */}
            <a
              href="https://wa.me/918975082548?text=Hi,%20I%20have%20a%20query%20regarding%203D%20printing%20my%20model."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-white rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">+91 89750 82548</div>
 
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
            </a>

            {/* Option 2 */}
            <a
              href="https://wa.me/919028788532?text=Hi,%20I%20have%20a%20query%20regarding%203D%20printing%20my%20model."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-white rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">+91 90287 88532</div>
 
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
            </a>
          </div>

          {/* Footer note */}
          <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 text-center">
            <span className="text-[10px] text-slate-400">Available 7 days a week (7:00 AM – 11:00 PM)</span>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group flex items-center justify-center w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="Contact via WhatsApp"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full animate-pulse" />
        <MessageCircle className="w-7 h-7 fill-current" />
      </button>
    </div>
  );
}