import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1A365D] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Column 1: Brand Info */}
        <div>
          <div className="flex items-center gap-2 mb-4">
  <div className="bg-white px-4 py-2.5 rounded-xl shadow-lg inline-flex items-center">
    <Image
      src="/images/logo.png"
      alt="Aristocrat 3D Printing Logo"
      width={240}
      height={70}
      className="object-contain h-12 w-auto"
    />
  </div>
</div>
          <p className="text-sm text-slate-400 mb-6 leading-relaxed">
            Precision industrial & prototype 3D printing solutions. Bringing engineering concepts to life with absolute dimensional accuracy.
          </p>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Clock className="w-4 h-4 text-[#3182CE]" />
            <span>Mon – Sat: 9:00 AM – 7:00 PM</span>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4 font-mono uppercase tracking-wider text-xs text-[#3182CE]">Quick Links</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
            <li><Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
            <li><Link href="/materials" className="hover:text-white transition-colors">Materials Matrix</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* Column 3: Services */}
        <div>
          <h4 className="text-white font-semibold mb-4 font-mono uppercase tracking-wider text-xs text-[#3182CE]">Our Services</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/services#prototype" className="hover:text-white transition-colors">Prototype Printing</Link></li>
            <li><Link href="/services#functional" className="hover:text-white transition-colors">Functional Parts</Link></li>
            <li><Link href="/services#miniatures" className="hover:text-white transition-colors">Miniatures & Custom Orders</Link></li>
            <li><Link href="/services#cad" className="hover:text-white transition-colors">CAD Design & Engineering</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div>
          <h4 className="text-white font-semibold mb-4 font-mono uppercase tracking-wider text-xs text-[#3182CE]">Contact Info</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#3182CE] shrink-0 mt-0.5" />
              <span className="text-slate-300">Wadala - Pathardi Rd, Rathchakra Chowk, Indira Nagar, Nashik, Maharashtra 422009</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#3182CE] shrink-0" />
              <span className="text-slate-300">+91 90287 88532 / +91 89750 82548</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#3182CE] shrink-0" />
              <a href="mailto:aristrocrat3dprinting@gmail.com" className="text-slate-300 hover:text-white transition-colors break-all">
                aristrocrat3dprinting@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>&copy; {new Date().getFullYear()} Aristocrat 3D Printing. All rights reserved.</p>
        <div className="flex flex-wrap justify-center gap-6">
          <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms & Conditions</Link>
          <Link href="/refund" className="hover:text-slate-300 transition-colors">Refund Policy</Link>
        </div>
      </div>
    </footer>
  );
}