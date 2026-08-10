"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Sparkles, Shield, ArrowUpRight, HelpCircle, AlertCircle, ChevronDown, MessageCircle } from "lucide-react";

const countryCodes = [
  { code: "+91", country: "IN", flagUrl: "https://flagcdn.com/w40/in.png", name: "India" },
  { code: "+1", country: "US", flagUrl: "https://flagcdn.com/w40/us.png", name: "United States" },
  { code: "+44", country: "GB", flagUrl: "https://flagcdn.com/w40/gb.png", name: "United Kingdom" },
  { code: "+61", country: "AU", flagUrl: "https://flagcdn.com/w40/au.png", name: "Australia" },
  { code: "+971", country: "AE", flagUrl: "https://flagcdn.com/w40/ae.png", name: "UAE" },
  { code: "+65", country: "SG", flagUrl: "https://flagcdn.com/w40/sg.png", name: "Singapore" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
    message: ""
  });
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else {
      const phoneRegex = /^[\d\s-]{7,15}$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = "Please enter a valid phone number.";
      }
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message or project scope is required.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Please provide a bit more detail (at least 10 characters).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 800);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const selectedCountry = countryCodes.find((c) => c.code === formData.countryCode) || countryCodes[0];

  const faqs = [
    {
      q: "What file formats do you accept for 3D printing?",
      a: "You can upload standard 3D printing and CAD formats including .STL, .STEP, .OBJ, and .3MF files directly through the form."
    },
    {
      q: "What filament materials and colors are available?",
      a: "We offer multiple filament types including PLA, ABS, TPU, and PETG, available in standard colors like White, Black, Grey, Blue, Green, Red, Pink, Brown, Clear, or custom options upon request."
    },
    {
      q: "How is pricing determined for my custom print?",
      a: "After you upload your file, select your material, and specify your infill percentage, our team analyzes your geometry for printability and contacts you with a formal project estimate."
    },
    {
      q: "What are my delivery and pickup choices?",
      a: "You can choose between doorstep delivery (with extra charges based on your location and availability) or free direct pickup from our workshop."
    },
    {
      q: "What is your standard turnaround time?",
      a: "Most standard prototype orders are processed, printed, and ready for dispatch or pickup within 24 to 48 hours."
    },
    {
      q: "Can I visit your workshop in person?",
      a: "Yes! You can drop by our workshop at Wadala - Pathardi Rd, Rathchakra Chowk, Indira Nagar, Nashik during business hours (7:00 AM – 11:00 PM daily) to discuss custom tolerances or view samples."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F9FA] text-slate-900 relative overflow-hidden">
      
      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Header Section */}
      <section className="bg-gradient-to-b from-[#0B132B] via-[#1C2541] to-[#0B132B] text-white py-20 relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
           
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 font-sans">
            We're Here to Help Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300">Project Succeed</span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Have questions about file formats, custom tolerances, or bulk orders? Reach out to our engineering team directly.
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Contact Info (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />
              
              <h3 className="text-xl font-bold text-[#1A365D] tracking-tight">Contact Information</h3>
              
              <div className="space-y-6">
                
                {/* 1. Workshop Location Link */}
                <a 
                  href="https://maps.google.com/?q=Wadala+-+Pathardi+Rd,+Rathchakra+Chowk,+Indira+Nagar,+Nashik,+Maharashtra+422009"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group p-2 -mx-2 rounded-2xl hover:bg-slate-50 transition-all"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-0.5 flex items-center gap-1.5">
                      Workshop Location <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed">Wadala - Pathardi Rd, Rathchakra Chowk, Indira Nagar, Nashik, Maharashtra 422009</p>
                    <span className="text-xs font-mono text-blue-600 mt-1 inline-block">Open for walk-in consultations</span>
                  </div>
                </a>

                {/* 2. Phone / WhatsApp Links for Both Numbers (Parallel / Side-by-Side) */}
                <div className="flex items-start gap-4 group p-2 -mx-2 rounded-2xl hover:bg-slate-50 transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-slate-900 text-sm mb-2">Phone / WhatsApp</h4>
                    
                    {/* Parallel Container */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      
                      {/* Number 1 */}
                      <div className="p-2.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
 
                        <div>
                          <a 
                            href="https://wa.me/918975082548?text=Hi,%20I%20would%20like%20to%20inquire%20about%203D%20printing%20services." 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:underline"
                          >
                            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" /> +91 89750 82548
                          </a>
                        </div>
                        <div>
                          <a href="tel:+918975082548" className="text-[11px] font-bold text-blue-600 hover:underline">
                            Direct Call
                          </a>
                        </div>
                      </div>

                      {/* Number 2 */}
                      <div className="p-2.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
 
                        <div>
                          <a 
                            href="https://wa.me/919028788532?text=Hi,%20I%20would%20like%20to%20inquire%20about%203D%20printing%20services." 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:underline"
                          >
                            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" /> +91 90287 88532
                          </a>
                        </div>
                        <div>
                          <a href="tel:+919028788532" className="text-[11px] font-bold text-blue-600 hover:underline">
                            Direct Call
                          </a>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

               {/* 3. Email Support Link (Forces Gmail Web Webmail) */}
<a 
  href="https://mail.google.com/mail/?view=cm&fs=1&to=aristrocrat3dprinting@gmail.com"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-start gap-4 group p-2 -mx-2 rounded-2xl hover:bg-slate-50 transition-all"
>
  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
    <Mail className="w-5 h-5" />
  </div>
  <div>
    <h4 className="font-bold text-slate-900 text-sm mb-0.5 flex items-center gap-1.5">
      Email Support <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
    </h4>
    <p className="text-slate-600 text-sm">aristrocrat3dprinting@gmail.com</p>
    <span className="text-xs font-mono text-slate-500 mt-1 inline-block">Response within 2–4 hours</span>
  </div>
</a>

                {/* 4. Business Hours */}
                <div className="flex items-start gap-4 group p-2 -mx-2">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 shadow-sm">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-0.5">Business Hours</h4>
                    <p className="text-slate-600 text-sm">Monday – Sunday: 7:00 AM – 11:00 PM</p>
                    <span className="text-xs font-mono text-emerald-600 mt-1 inline-block">Open All Days (7 Days a Week)</span>
                  </div>
                </div>

              </div>
            </div>

            <div className="bg-gradient-to-r from-slate-900 to-[#1C2541] p-6 rounded-3xl text-white shadow-md flex items-center gap-4 border border-slate-800">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-400/30">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm mb-1">Secure CAD File Handling</h4>
                <p className="text-xs text-slate-300">Your proprietary 3D designs and intellectual property remain fully protected with us.</p>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm relative">
              
              <div className="mb-8">
                <h3 className="text-2xl font-extrabold text-[#1A365D] tracking-tight mb-2">Send Us a Message</h3>
                <p className="text-slate-600 text-sm">Fill out the form below and our team will get back to you promptly.</p>
              </div>

{isSubmitted ? (
                <div className="py-12 px-4 text-center space-y-6 relative overflow-hidden animate-fade-in">
                  
                  {/* Decorative Glowing Backdrop Effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-cyan-500/10 to-transparent rounded-3xl pointer-events-none" />

                  {/* Animated Multi-layered Icon Container */}
                  <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
                    {/* Outer Pulsing Ring */}
                    <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping pointer-events-none" />
                    {/* Secondary Glow Ring */}
                    <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-30 blur-lg animate-pulse" />
                    
                    {/* Main Icon Circle */}
                    <div className="relative w-20 h-20 bg-gradient-to-tr from-emerald-600 to-teal-400 text-white rounded-3xl shadow-xl shadow-emerald-500/30 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                      <CheckCircle2 className="w-10 h-10 drop-shadow-md" />
                    </div>
                  </div>

                  {/* Typography & Message */}
                  <div className="space-y-2 relative z-10">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-xs font-mono font-bold tracking-wide uppercase mb-1 shadow-xs">
                     
                    </div>
                    <h4 className="text-2xl sm:text-3xl font-extrabold text-[#1A365D] tracking-tight">
                      We've Got Your Blueprint!
                    </h4>
                    <p className="text-slate-600 max-w-md mx-auto text-sm leading-relaxed">
                      Thank you for connecting. Our engineering team is reviewing your requirements and will get back to you within <span className="font-semibold text-slate-800">2–4 hours</span>.
                    </p>
                  </div>

                  {/* Summary Quick-Badge Card */}
                  <div className="max-w-xs mx-auto p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-left space-y-2 relative z-10">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-100 pb-2">
                      <span>PROJECT INQUIRY</span>
                      <span className="text-emerald-600 font-bold">STATUS: QUEUED</span>
                    </div>
                    <div className="text-xs text-slate-700 space-y-1">
                      <p><span className="text-slate-400">Name:</span> <strong className="text-slate-900">{formData.name}</strong></p>
                      <p><span className="text-slate-400">Email:</span> <strong className="text-slate-900">{formData.email}</strong></p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({ name: "", email: "", countryCode: "+91", phone: "", message: "" });
                      }}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                    >
                      Send Another Message
                    </button>
                  </div>

                </div>
              ) : (
<form 
  action="https://formsubmit.co/aristrocrat3dprinting@gmail.com" 
  method="POST" 
  onSubmit={handleSubmit} 
  className="space-y-5" 
  noValidate
>
  {/* Add this hidden input right below the form tag */}
  <input type="hidden" name="_captcha" value="false" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">Your Name *</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Rahul Patil" 
                        className={`w-full px-4 py-3.5 rounded-xl border bg-[#F7F9FA] text-sm text-slate-900 outline-none focus:bg-white transition-all ${
                          errors.name ? "border-red-500 focus:ring-2 focus:ring-red-500/20" : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        }`} 
                      />
                      {errors.name && (
                        <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">Email Address *</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="rahul@example.com" 
                        className={`w-full px-4 py-3.5 rounded-xl border bg-[#F7F9FA] text-sm text-slate-900 outline-none focus:bg-white transition-all ${
                          errors.email ? "border-red-500 focus:ring-2 focus:ring-red-500/20" : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        }`} 
                      />
                      {errors.email && (
                        <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">Phone Number *</label>
                    <div className="flex gap-2">
                      <div className="relative shrink-0">
                        <select
                          name="countryCode"
                          value={formData.countryCode}
                          onChange={handleChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        >
                          {countryCodes.map((item) => (
                            <option key={item.code} value={item.code}>
                              {item.name} ({item.code})
                            </option>
                          ))}
                        </select>
                        <div className="h-full px-3 py-3.5 rounded-xl border border-slate-200 bg-[#F7F9FA] text-sm text-slate-900 flex items-center gap-2 pointer-events-none">
                          <img 
                            src={selectedCountry.flagUrl} 
                            alt={selectedCountry.name} 
                            className="w-5 h-3.5 object-cover rounded-sm shadow-xs" 
                          />
                          <span className="font-mono font-bold">{selectedCountry.code}</span>
                          <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
                        </div>
                      </div>

                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="89750 82548" 
                        className={`w-full px-4 py-3.5 rounded-xl border bg-[#F7F9FA] text-sm text-slate-900 outline-none focus:bg-white transition-all ${
                          errors.phone ? "border-red-500 focus:ring-2 focus:ring-red-500/20" : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        }`} 
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-2">Message or Project Scope *</label>
                    <textarea 
                      rows={5} 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project, material preferences, or required timeline..." 
                      className={`w-full px-4 py-3.5 rounded-xl border bg-[#F7F9FA] text-sm text-slate-900 outline-none focus:bg-white transition-all resize-none ${
                        errors.message ? "border-red-500 focus:ring-2 focus:ring-red-500/20" : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      }`} 
                    />
                    {errors.message && (
                      <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.message}
                      </p>
                    )}
                  </div>

                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-75"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Send Message
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

        {/* FAQ Accordion Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider block mb-2">Got Questions?</span>
            <h3 className="text-2xl font-extrabold text-[#1A365D]">Frequently Asked Questions</h3>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left font-bold text-[#1A365D] text-sm flex items-center justify-between gap-4"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                    {faq.q}
                  </span>
                  <span className="text-lg font-normal text-slate-400">{activeFaq === index ? "−" : "+"}</span>
                </button>
                {activeFaq === index && (
                  <div className="px-6 pb-4 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </section>

    </div>
  );
}