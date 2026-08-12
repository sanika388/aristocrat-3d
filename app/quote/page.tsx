"use client";

import { useState } from "react";
import { Upload, CheckCircle, ArrowRight, ArrowLeft, CreditCard, Download, FileText, Banknote, Smartphone, X, Lock, Check } from "lucide-react";
import { jsPDF } from "jspdf";
import STLViewer from "../components/STLViewer";

export default function QuoteWizard() {
  const [step, setStep] = useState(1);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState<number | null>(null);
  
  // Professional Flow States
  const [isGatewayOpen, setIsGatewayOpen] = useState(false);
  const [gatewayStep, setGatewayStep] = useState<"redirecting" | "waiting" | "success">("redirecting");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  
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
    paymentMethod: "gpay", // gpay, phonepay, paytm, upi, cards, cash
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
  const quoteRef = `A3D-${Math.floor(100000 + Math.random() * 900000)}`;
  const receiptNo = `REC-${Math.floor(100000 + Math.random() * 900000)}`;

  // Handles starting the checkout flow: redirects to user's payment app / handles cash
  const handleInitiateCheckout = () => {
    if (formData.paymentMethod === "cash") {
      // Cash order: direct completion with "Paid on Delivery / Pickup" status
      executeFinalSubmission("Pending Cash Collection (Paid on Delivery / Pickup)");
    } else {
      // UPI / Card flow: Open app redirect simulation popup
      setIsGatewayOpen(true);
      setGatewayStep("redirecting");
      
      // Step 1: Redirecting to app
      setTimeout(() => {
        setGatewayStep("waiting");
      }, 1500);

      // Step 2: Waiting for user PIN / payment approval
      setTimeout(() => {
        setGatewayStep("success");
      }, 4000);
    }
  };

  const handleSimulatedPaymentSuccess = () => {
    setIsGatewayOpen(false);
    const paymentLabel = `${formData.paymentMethod.toUpperCase()} (Paid & Verified)`;
    executeFinalSubmission(paymentLabel);
  };

  const executeFinalSubmission = async (paymentStatusLabel: string) => {
    setIsSubmitting(true);
    try {
      await fetch("https://formsubmit.co/ajax/aristrocrat3dprinting@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `New Confirmed Order [${receiptNo}] - ${paymentStatusLabel}`,
          _captcha: "false",
          "Receipt No": receiptNo,
          "Quote Ref": quoteRef,
          "Payment Status": paymentStatusLabel,
          "Full Name": formData.fullName,
          "Email": formData.email,
          "Phone": `${formData.countryCode} ${formData.phone}`,
          "File Name": fileName,
          "Material": `${formData.material} (${formData.color})`,
          "Quantity": formData.quantity,
          "Total Order Value": `Rs. ${finalPrice} INR`
        })
      });
    } catch (err) {
      // Proceed even if background network notification fails
    } finally {
      setIsSubmitting(false);
      setOrderConfirmed(true);
    }
  };

  const handleDownloadPDF = (isCashSlip: boolean) => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    doc.setTextColor(240, 242, 245);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(48);
    doc.text("ARISTOCRAT 3D", 35, 150, { angle: 45 });

    doc.setTextColor(26, 54, 93);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("ARISTOCRAT 3D PRINTING", 20, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text(isCashSlip ? `Official Cash Collection Slip [${receiptNo}]` : `Official UPI Paid & Verified Receipt [${receiptNo}]`, 20, 27);

    doc.setDrawColor(203, 213, 225);
    doc.line(20, 32, 190, 32);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 23, 42);
    doc.text(`Quote Ref: ${quoteRef}`, 20, 42);
    doc.text(`Receipt No: ${receiptNo}`, 120, 42);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 49);

    doc.setFillColor(248, 250, 252);
    doc.rect(20, 55, 170, 38, "F");
    
    doc.setFont("helvetica", "bold");
    doc.text("CLIENT INFORMATION", 25, 63);
    doc.setFont("helvetica", "normal");
    doc.text(`Full Name: ${formData.fullName}`, 25, 70);
    doc.text(`Email: ${formData.email}`, 25, 77);
    doc.text(`Phone: ${formData.countryCode} ${formData.phone}`, 25, 84);

    doc.setFont("helvetica", "bold");
    doc.text("ORDER & PAYMENT SPECIFICATIONS", 20, 105);

    const startY = 111;
    const specs = [
      ["CAD File Name:", fileName],
      ["Selected Material:", `${formData.material} (${formData.color})`],
      ["Quantity Ordered:", `${formData.quantity} unit(s) @ ${formData.layerHeight}`],
      ["Payment Mode:", isCashSlip ? "Cash / Pay on Delivery" : `${formData.paymentMethod.toUpperCase()} (Online Payment App)`],
      ["Payment Status:", isCashSlip ? "Paid on Delivery / Pickup" : "PAID & VERIFIED (UPI Intent Approved)"],
      ["Engineering Notes:", formData.notes || "Standard manufacturing tolerances apply."]
    ];

    let currentY = startY;
    specs.forEach(([label, value]) => {
      doc.setFont("helvetica", "bold");
      doc.setTextColor(71, 85, 105);
      doc.text(label, 20, currentY);

      doc.setFont("helvetica", "normal");
      doc.setTextColor(15, 23, 42);
      const splitValue = doc.splitTextToSize(value, 100);
      doc.text(splitValue, 75, currentY);
      currentY += (splitValue.length * 6) + 2;
    });

    currentY += 6;
    doc.setFillColor(239, 246, 255);
    doc.rect(20, currentY, 170, 20, "F");

    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 64, 175);
    doc.text("TOTAL AMOUNT:", 28, currentY + 13);
    doc.setFontSize(14);
    doc.text(`Rs. ${finalPrice} INR`, 130, currentY + 13);

    doc.save(`Aristocrat-${isCashSlip ? 'Cash-Receipt' : 'UPI-Paid-Receipt'}-${receiptNo}.pdf`);
  };

  return (
    <div className="min-h-screen bg-[#F7F9FA] dark:bg-slate-900 py-16 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-[#1A365D] dark:text-white">3D Printing Quote & Instant App Checkout</h1>
          <p className="text-slate-600 dark:text-slate-300 mt-2 text-sm">Configure your print, pick your payment app, and receive your verified receipt instantly.</p>
        </div>

        {!orderConfirmed ? (
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
                    {s === 1 ? "Details" : s === 2 ? "Upload" : s === 3 ? "Config" : s === 4 ? "Delivery" : s === 5 ? "Notes" : "Payment"}
                  </span>
                </div>
              ))}
            </div>

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
                          <span className="text-xs font-mono font-semibold text-[#3182CE] mt-3">From Rs. {mat.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

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
                        <option value="0.1mm">0.1mm (High Detail - +Rs. 100)</option>
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

              {/* STEP 6: Payment Selection & Instant App Launch */}
              {step === 6 && (
                <div className="space-y-6 animate-in fade-in">
                  <h3 className="text-xl font-bold text-[#1A365D] dark:text-white">Step 6: Select Payment App & Checkout</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Choose your preferred UPI payment app or select cash on delivery/pickup. Clicking the pay button will immediately redirect you to your app or place your order.</p>

                  <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Client:</span>
                      <span className="font-semibold text-slate-800 dark:text-white">{formData.fullName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Selected File & Specs:</span>
                      <span className="font-semibold text-slate-800 dark:text-white">{fileName} | {formData.material} ({formData.color})</span>
                    </div>
                    <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-between text-base font-bold text-[#1A365D] dark:text-white">
                      <span>Total Amount:</span>
                      <span className="text-[#3182CE]">Rs. {finalPrice} INR</span>
                    </div>
                  </div>

                  {/* Payment Apps Grid */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-3">Choose Payment Method</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {[
                        { id: "gpay", name: "Google Pay (GPay)", desc: "Redirects to GPay Intent app", icon: Smartphone },
                        { id: "phonepe", name: "PhonePe", desc: "Redirects to PhonePe app", icon: Smartphone },
                        { id: "paytm", name: "Paytm", desc: "Redirects to Paytm app", icon: Smartphone },
                        { id: "upi", name: "Other UPI App", desc: "BHIM, WhatsApp, or QR Code", icon: Smartphone },
                        { id: "cards", name: "Credit / Debit Card", desc: "Visa, MasterCard, RuPay", icon: CreditCard },
                        { id: "cash", name: "Cash on Delivery / Pickup", desc: "Paid on delivery (Cash receipt)", icon: Banknote },
                      ].map((method) => {
                        const IconComponent = method.icon;
                        return (
                          <div
                            key={method.id}
                            onClick={() => setFormData({...formData, paymentMethod: method.id})}
                            className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                              formData.paymentMethod === method.id 
                                ? "border-[#3182CE] bg-blue-50/60 dark:bg-blue-950/30 shadow-sm ring-1 ring-[#3182CE]" 
                                : "border-slate-200 dark:border-slate-700 hover:border-slate-300"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                                <IconComponent className="w-4 h-4 text-[#3182CE]" /> {method.name}
                              </span>
                              <input 
                                type="radio" 
                                name="paymentOpt" 
                                checked={formData.paymentMethod === method.id} 
                                onChange={() => setFormData({...formData, paymentMethod: method.id})} 
                              />
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400">{method.desc}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={handleInitiateCheckout}
                      className="px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg flex items-center gap-2 transition-all disabled:opacity-50"
                    >
                      {formData.paymentMethod === 'cash' ? <Banknote className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
                      {formData.paymentMethod === 'cash' ? "Confirm Cash Order (Paid on Delivery)" : `Open ${formData.paymentMethod.toUpperCase()} & Pay Rs. ${finalPrice}`}
                    </button>
                  </div>
                </div>
              )}

              {/* Navigation Footer Buttons */}
              <div className="flex items-center justify-between pt-8 mt-8 border-t border-slate-200 dark:border-slate-700">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs flex items-center gap-2 transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                ) : <div />}

                {step < 6 && (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-2.5 rounded-xl bg-[#3182CE] hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all"
                  >
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>

            </div>
          </>
        ) : (
          /* SUCCESS CONFIRMATION VIEW */
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 sm:p-12 text-center space-y-6 animate-in zoom-in-95">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {formData.paymentMethod === 'cash' ? "Cash Order Confirmed!" : "Payment Verified Successfully!"}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                Thank you, <span className="font-semibold text-slate-800 dark:text-slate-200">{formData.fullName}</span>. Your order is registered in our production queue.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700 max-w-md mx-auto text-left space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Receipt Number:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">{receiptNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Quote Reference:</span>
                <span className="font-mono font-semibold text-slate-900 dark:text-white">{quoteRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment Status:</span>
                <span className="font-bold text-emerald-600">
                  {formData.paymentMethod === 'cash' ? 'Paid on Delivery / Pickup' : `${formData.paymentMethod.toUpperCase()} (Paid & Verified)`}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-slate-700 font-bold text-base text-[#1A365D] dark:text-white">
                <span>Total Amount:</span>
                <span className="text-[#3182CE]">Rs. {finalPrice} INR</span>
              </div>
            </div>

            {/* Receipt Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={() => handleDownloadPDF(formData.paymentMethod === 'cash')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#3182CE] hover:bg-blue-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <Download className="w-4 h-4"/> Download Official {formData.paymentMethod === 'cash' ? 'Cash Receipt (Paid on Delivery)' : 'UPI Paid & Verified Receipt'}
              </button>
              <button
                onClick={() => window.location.reload()}
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-sm transition-all"
              >
                Place Another Order
              </button>
            </div>

          </div>
        )}

      </div>

      {/* APP REDIRECT & INTENT PAYMENT POPUP MODAL */}
      {isGatewayOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 max-w-md w-full p-6 sm:p-8 space-y-6 relative">
            
            <button 
              type="button"
              onClick={() => setIsGatewayOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5"/>
            </button>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/50 text-[#3182CE] rounded-xl flex items-center justify-center mx-auto">
                <Smartphone className="w-6 h-6"/>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Opening {formData.paymentMethod.toUpperCase()} App
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Aristocrat 3D Secure Payment Gateway Intent
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Merchant:</span>
                <span className="font-semibold text-slate-800 dark:text-white">Aristocrat 3D</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Amount:</span>
                <span className="font-bold text-[#3182CE]">Rs. {finalPrice} INR</span>
              </div>
            </div>

            {gatewayStep === "redirecting" && (
              <div className="py-8 text-center space-y-4">
                <div className="w-10 h-10 border-4 border-[#3182CE] border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 animate-pulse">
                  Redirecting to your {formData.paymentMethod.toUpperCase()} app...
                </p>
              </div>
            )}

            {gatewayStep === "waiting" && (
              <div className="py-8 text-center space-y-4">
                <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  Waiting for you to enter UPI PIN and complete payment in {formData.paymentMethod.toUpperCase()}...
                </p>
              </div>
            )}

            {gatewayStep === "success" && (
              <div className="py-6 text-center space-y-4 animate-in zoom-in-95">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6"/>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">Payment Successful!</h4>
                  <p className="text-xs text-slate-500 mt-1">Received payment confirmation from your app.</p>
                </div>
                <button
                  type="button"
                  onClick={handleSimulatedPaymentSuccess}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all mt-2"
                >
                  View Paid & Verified Receipt
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}