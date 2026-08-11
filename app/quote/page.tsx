"use client";

import { useState } from "react";
import { Upload, CheckCircle, ArrowRight, ArrowLeft, CreditCard } from "lucide-react";
import STLViewer from "../components/STLViewer";

export default function QuoteWizard() {
  const [step, setStep] = useState(1);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    countryCode: "+91",
    phone: "",
    company: "",
    material: "PLA",
    color: "Matte Black",
    quantity: 1,
    layerHeight: "0.2mm",
    deliveryMethod: "standard",
    notes: "",
  });

  const countryCodes = [
    { code: "+91", country: "India", flag: "🇮🇳" },
    { code: "+1", country: "United States", flag: "🇺🇸" },
    { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
    { code: "+61", country: "Australia", flag: "🇦🇺" },
    { code: "+971", country: "United Arab Emirates", flag: "🇦🇪" },
    { code: "+49", country: "Germany", flag: "🇩🇪" },
    { code: "+33", country: "France", flag: "🇫🇷" },
    { code: "+81", country: "Japan", flag: "🇯🇵" },
  ];

  const materialsList = [
    { id: "PLA", name: "PLA", desc: "Standard Prototype & Eco-friendly", price: 499 },
    { id: "PETG", name: "PETG", desc: "Durable & Weather Resistant", price: 699 },
    { id: "ABS", name: "ABS", desc: "High Thermal Resistance", price: 649 },
    { id: "TPU", name: "TPU", desc: "Flexible Rubber-like Elasticity", price: 749 },
    { id: "Wood", name: "Wood-Infused PLA", desc: "Authentic wood texture & finish", price: 799 },
    { id: "Resin", name: "High-Detail Resin", desc: "Ultra-smooth miniatures & jewelry", price: 849 },
    { id: "Carbon Fiber", name: "Carbon Fiber", desc: "Industrial high-strength parts", price: 999 },
  ];

  const colorsList = [
    { name: "Matte Black", hex: "#1e293b" },
    { name: "Pure White", hex: "#f8fafc" },
    { name: "Engineering Blue", hex: "#2563eb" },
    { name: "Emerald Green", hex: "#059669" },
    { name: "Forest Green", hex: "#16a34a" },
    { name: "Royal Purple", hex: "#7c3aed" },
    { name: "Neon Orange", hex: "#f97316" },
    { name: "Crimson Red", hex: "#dc2626" },
    { name: "Golden Yellow", hex: "#eab308" },
    { name: "Industrial Grey", hex: "#64748b" },
    { name: "Natural Wood", hex: "#b45309" },
    { name: "Transparent Crystal", hex: "#cbd5e1" },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      setFileSize(file.size);
      setErrors((prev) => ({ ...prev, file: "" }));
    }
  };

  const validateStep1 = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Valid email address is required.";
    }
    if (!formData.phone.trim() || !/^\d{7,15}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid phone number (digits only).";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: { [key: string]: string } = {};
    if (!fileName) {
      newErrors.file = "Please upload a 3D CAD file to proceed.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setErrors({});
    setStep((prev) => Math.min(prev + 1, 6));
  };

  const prevStep = () => {
    setErrors({});
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const calculatePrice = () => {
    const selectedMat = materialsList.find(m => m.id === formData.material);
    let base = selectedMat ? selectedMat.price : 499;
    if (formData.layerHeight === "0.1mm") base += 100;
    return base * formData.quantity;
  };

  const finalPrice = calculatePrice();

  return (
    <div className="min-h-screen bg-[#F7F9FA] dark:bg-slate-900 py-16 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-[#1A365D] dark:text-white">3D Printing Quote</h1>
          <p className="text-slate-600 dark:text-slate-300 mt-2 text-sm">Upload your design, configure specifications, and get instant automated pricing.</p>
        </div>

        {!submitted ? (
          <>
            {/* Progress Bar */}
            <div className="flex items-center justify-between mb-8 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-x-auto gap-2">
              {[1, 2, 3, 4, 5, 6].map((s) => (
                <div key={s} className="flex items-center gap-2 shrink-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                    step >= s ? "bg-[#3182CE] text-white" : "bg-slate-100 dark:bg-slate-700 text-slate-400"
                  }`}>
                    {s}
                  </div>
                  <span className="hidden md:inline text-xs font-semibold text-slate-600 dark:text-slate-300">
                    {s === 1 ? "Details" : s === 2 ? "Upload" : s === 3 ? "Config" : s === 4 ? "Delivery" : s === 5 ? "Notes" : "Checkout"}
                  </span>
                </div>
              ))}
            </div>

            {/* Wizard Card Body */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-8">
              
              {/* STEP 1: Personal Details */}
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in">
                  <h3 className="text-xl font-bold text-[#1A365D] dark:text-white">Step 1: Contact & Project Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">Full Name *</label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        placeholder="Rahul Patil"
                        className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#3182CE] outline-none text-sm ${
                          errors.fullName ? "border-red-500" : "border-slate-300 dark:border-slate-600"
                        }`}
                      />
                      {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">Email Address *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="rahul@example.com"
                        className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#3182CE] outline-none text-sm ${
                          errors.email ? "border-red-500" : "border-slate-300 dark:border-slate-600"
                        }`}
                      />
                      {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">Phone Number *</label>
                      <div className="flex gap-2">
                        <select
                          value={formData.countryCode}
                          onChange={(e) => setFormData({...formData, countryCode: e.target.value})}
                          className="px-3 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm outline-none"
                        >
                          {countryCodes.map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.flag} {c.code}
                            </option>
                          ))}
                        </select>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value.replace(/\D/g, '')})}
                          placeholder="9876543210"
                          className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#3182CE] outline-none text-sm ${
                            errors.phone ? "border-red-500" : "border-slate-300 dark:border-slate-600"
                          }`}
                        />
                      </div>
                      {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">Company / Institution (Optional)</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        placeholder="Aristocrat Engineering"
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#3182CE] outline-none text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: File Upload & 3D Viewer */}
              {step === 2 && (
                <div className="space-y-6 animate-in fade-in">
                  <h3 className="text-xl font-bold text-[#1A365D] dark:text-white">Step 2: Upload 3D Model & Preview</h3>
                  
                  <div className={`border-2 border-dashed rounded-xl p-8 text-center bg-slate-50 dark:bg-slate-900 transition-colors cursor-pointer relative ${
                    errors.file ? "border-red-500 bg-red-50/10" : "border-slate-300 dark:border-slate-600 hover:bg-slate-100/50"
                  }`}>
                    <input
                      type="file"
                      accept=".stl,.obj,.step,.3mf"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <Upload className="w-10 h-10 text-[#3182CE] mx-auto mb-3" />
                    <h4 className="font-semibold text-slate-800 dark:text-white">
                      {fileName ? `Loaded: ${fileName}` : "Drag & drop your 3D CAD file here"}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Supports .STL, .OBJ, .STEP, .3MF (Max size: 100MB)</p>
                    {fileSize && (
                      <span className="inline-block mt-3 px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-xs font-mono">
                        File Size: {(fileSize / (1024 * 1024)).toFixed(2)} MB
                      </span>
                    )}
                  </div>
                  {errors.file && <p className="text-xs text-red-500 text-center">{errors.file}</p>}

                  <STLViewer fileName={fileName} />
                </div>
              )}

              {/* STEP 3: Print Configuration */}
              {step === 3 && (
                <div className="space-y-8 animate-in fade-in">
                  <h3 className="text-xl font-bold text-[#1A365D] dark:text-white">Step 3: Printing Configuration</h3>
                  
                  {/* Material Cards Selection */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-3">Select Material</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {materialsList.map((mat) => (
                        <div
                          key={mat.id}
                          onClick={() => setFormData({...formData, material: mat.id})}
                          className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                            formData.material === mat.id 
                              ? "border-[#3182CE] bg-blue-50/60 dark:bg-blue-950/30 shadow-sm" 
                              : "border-slate-200 dark:border-slate-700 hover:border-slate-300"
                          }`}
                        >
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white text-sm">{mat.name}</span>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{mat.desc}</p>
                          </div>
                          <span className="text-xs font-mono font-semibold text-[#3182CE] mt-3">From ₹{mat.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Color Swatches Selection */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-3">
                      Select Color / Shade: <span className="text-[#3182CE] font-bold">{formData.color}</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {colorsList.map((col) => (
                        <button
                          key={col.name}
                          type="button"
                          onClick={() => setFormData({...formData, color: col.name})}
                          className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-xs font-medium transition-all ${
                            formData.color === col.name
                              ? "border-[#3182CE] bg-blue-50 dark:bg-blue-950/40 text-slate-900 dark:text-white shadow-sm ring-2 ring-[#3182CE]/30"
                              : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                          }`}
                        >
                          <span className="w-4 h-4 rounded-full border border-slate-300 shrink-0 shadow-inner" style={{ backgroundColor: col.hex }} />
                          <span className="truncate">{col.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity & Resolution */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">Quantity</label>
                      <input
                        type="number"
                        min={1}
                        value={formData.quantity}
                        onChange={(e) => setFormData({...formData, quantity: Math.max(1, parseInt(e.target.value) || 1)})}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">Layer Height (Resolution)</label>
                      <select
                        value={formData.layerHeight}
                        onChange={(e) => setFormData({...formData, layerHeight: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm"
                      >
                        <option value="0.1mm">0.1mm (High Detail - +₹100)</option>
                        <option value="0.2mm">0.2mm (Standard Quality)</option>
                        <option value="0.3mm">0.3mm (Fast Draft)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Delivery Method */}
              {step === 4 && (
                <div className="space-y-6 animate-in fade-in">
                  <h3 className="text-xl font-bold text-[#1A365D] dark:text-white">Step 4: Delivery Options</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className={`border p-4 rounded-xl cursor-pointer flex flex-col gap-2 ${formData.deliveryMethod === 'standard' ? 'border-[#3182CE] bg-blue-50/50 dark:bg-blue-950/20' : 'border-slate-200 dark:border-slate-700'}`}>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800 dark:text-white">Standard Shipping</span>
                        <input type="radio" name="delivery" checked={formData.deliveryMethod === 'standard'} onChange={() => setFormData({...formData, deliveryMethod: 'standard'})} />
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Delivered within 3-5 business days across India.</p>
                    </label>
                    <label className={`border p-4 rounded-xl cursor-pointer flex flex-col gap-2 ${formData.deliveryMethod === 'express' ? 'border-[#3182CE] bg-blue-50/50 dark:bg-blue-950/20' : 'border-slate-200 dark:border-slate-700'}`}>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800 dark:text-white">Express Priority 24h</span>
                        <input type="radio" name="delivery" checked={formData.deliveryMethod === 'express'} onChange={() => setFormData({...formData, deliveryMethod: 'express'})} />
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Urgent print queue priority with express courier.</p>
                    </label>
                  </div>
                </div>
              )}

              {/* STEP 5: Notes */}
              {step === 5 && (
                <div className="space-y-6 animate-in fade-in">
                  <h3 className="text-xl font-bold text-[#1A365D] dark:text-white">Step 5: Additional Engineering Notes</h3>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">Special Instructions</label>
                    <textarea
                      rows={4}
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      placeholder="Mention tight tolerances, thread tapping requirements, or insert molding notes..."
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#3182CE] outline-none text-sm"
                    />
                  </div>
                </div>
              )}

              {step === 6 && (
  <div className="space-y-6 animate-in fade-in">
    <h3 className="text-xl font-bold text-[#1A365D] dark:text-white">Step 6: Review & Direct Submission</h3>
    <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3 text-sm">
      <div className="flex justify-between">
        <span className="text-slate-600 dark:text-slate-400">Client Name:</span>
        <span className="font-semibold text-slate-800 dark:text-white">{formData.fullName}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-slate-600 dark:text-slate-400">Email & Phone:</span>
        <span className="font-semibold text-slate-800 dark:text-white">{formData.email} | {formData.countryCode} {formData.phone}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-slate-600 dark:text-slate-400">Uploaded File:</span>
        <span className="font-semibold text-slate-800 dark:text-white">{fileName}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-slate-600 dark:text-slate-400">Selected Material:</span>
        <span className="font-semibold text-slate-800 dark:text-white">{formData.material} ({formData.color})</span>
      </div>
      <div className="flex justify-between">
        <span className="text-slate-600 dark:text-slate-400">Quantity & Quality:</span>
        <span className="font-semibold text-slate-800 dark:text-white">{formData.quantity}x | {formData.layerHeight}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-slate-600 dark:text-slate-400">Delivery Method:</span>
        <span className="font-semibold text-slate-800 dark:text-white uppercase">{formData.deliveryMethod}</span>
      </div>
      <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-between text-lg font-bold text-[#1A365D] dark:text-white">
        <span>Total Estimated Price:</span>
        <span className="text-[#3182CE]">₹{finalPrice} INR</span>
      </div>
    </div>

    <div className="flex justify-end">
      <button
        type="button"
        disabled={isSubmitting}
        onClick={async () => {
          setIsSubmitting(true);
          try {
            const response = await fetch("https://formsubmit.co/ajax/aristrocrat3dprinting@gmail.com", {
              method: "POST",
              headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify({
                _subject: `New 3D Print Quote Request from ${formData.fullName}`,
                _captcha: "false",
                "Full Name": formData.fullName,
                "Email": formData.email,
                "Phone": `${formData.countryCode} ${formData.phone}`,
                "Company": formData.company || "N/A",
                "File Name": fileName,
                "Material": formData.material,
                "Color": formData.color,
                "Quantity": formData.quantity,
                "Layer Height": formData.layerHeight,
                "Delivery": formData.deliveryMethod,
                "Notes": formData.notes || "None",
                "Estimated Quote Price": `₹${finalPrice} INR`
              })
            });

            if (response.ok) {
              setSubmitted(true);
            } else {
              alert("Submission failed. Please try again.");
            }
          } catch (err) {
            alert("Network error. Please check your connection.");
          } finally {
            setIsSubmitting(false);
          }
        }}
        className="px-8 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg flex items-center gap-2 disabled:opacity-50"
      >
        <CreditCard className="w-4 h-4" /> {isSubmitting ? "Sending Quote..." : "Submit Quote & Send Email"}
      </button>
    </div>
  </div>
)}

              {/* Wizard Action Buttons */}
              <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                {step > 1 ? (
                  <button
                    onClick={prevStep}
                    className="px-6 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                ) : <div />}

                {step < 6 ? (
                  <button
                    onClick={nextStep}
                    className="px-8 py-2.5 rounded-lg bg-[#3182CE] hover:bg-blue-700 text-white font-semibold text-sm shadow-md flex items-center gap-2"
                  >
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <form
                    action="https://formsubmit.co/aristrocrat3dprinting@gmail.com"
                    method="POST"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setIsSubmitting(true);

                      try {
                        const response = await fetch("https://formsubmit.co/ajax/aristrocrat3dprinting@gmail.com", {
                          method: "POST",
                          headers: { 
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                          },
                          body: JSON.stringify({
                            _subject: `New 3D Print Quote Request from ${formData.fullName}`,
                            "Full Name": formData.fullName,
                            "Email": formData.email,
                            "Phone": `${formData.countryCode} ${formData.phone}`,
                            "Company": formData.company || "N/A",
                            "File Name": fileName,
                            "Material": formData.material,
                            "Color": formData.color,
                            "Quantity": formData.quantity,
                            "Layer Height": formData.layerHeight,
                            "Delivery": formData.deliveryMethod,
                            "Notes": formData.notes || "None",
                            "Estimated Quote Price": `₹${finalPrice} INR`
                          })
                        });

                        if (response.ok) {
                          setSubmitted(true);
                        } else {
                          alert("Submission failed. Please try again.");
                        }
                      } catch (err) {
                        alert("Network error. Please check your connection.");
                      } finally {
                        setIsSubmitting(false);
                      }
                    }}
                  >
                     
                  </form>
                )}
              </div>

            </div>
          </>
        ) : (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-12 text-center space-y-4 animate-in fade-in">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Quote Sent Successfully!</h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-md mx-auto text-sm">
              Thank you, <span className="font-semibold">{formData.fullName}</span>. Your specification and estimated quote of <span className="font-bold text-[#3182CE]">₹{finalPrice} INR</span> have been emailed directly to the Aristocrat 3D team. We will review your CAD file and get back to you shortly!
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setStep(1);
                setFileName("");
                setFileSize(null);
              }}
              className="mt-4 px-6 py-2.5 rounded-lg bg-[#3182CE] text-white font-semibold text-sm hover:bg-blue-700 transition-colors"
            >
              Submit Another Quote
            </button>
          </div>
        )}

      </div>
    </div>
  );
}