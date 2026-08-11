export default function TermsAndConditions() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-16 bg-white text-blue-900 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-900 mb-4">Terms & Conditions</h1>
      <p className="text-xs font-mono text-blue-600 mb-8">Last Updated: August 2026</p>

      <div className="space-y-6 text-sm leading-relaxed text-blue-900">
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-blue-800">1. Introduction</h2>
          <p className="text-blue-900">
            Welcome to Aristocrat 3D Printing. By accessing our website, placing an order, or utilizing our walk-in consultation services located at Wadala-Pathardi Rd, Rathchakra Chowk, Indira Nagar, Nashik, you agree to comply with and be bound by the following terms and conditions.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-blue-800">2. Orders & Quotations</h2>
          <p className="text-blue-900">
            All custom 3D printing orders require a reviewed blueprint or CAD file. Estimates provided prior to physical evaluation are subject to revision based on structural complexity, infill percentages, and material selection.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-blue-800">3. Operating Hours & Support</h2>
          <p className="text-blue-900">
            Our workshop operates 7 days a week from 7:00 AM to 11:00 PM. Digital inquiries submitted via email (<a href="mailto:aristrocrat3dprinting@gmail.com" className="text-blue-600 font-semibold hover:underline">aristrocrat3dprinting@gmail.com</a>) or phone receive responses within 2–4 hours during operational windows.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-blue-800">4. Client Liabilities</h2>
          <p className="text-blue-900">
            Clients warrant that any file, design, or intellectual property provided to Aristocrat 3D Printing does not infringe upon third-party copyrights, patents, or safety regulations (e.g., restricted or illegal weaponry components).
          </p>
        </section>
      </div>
    </main>
  );
}