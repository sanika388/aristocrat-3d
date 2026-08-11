export default function PrivacyPolicy() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-16 bg-white text-blue-900 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-900 mb-4">Privacy Policy</h1>
      <p className="text-xs font-mono text-blue-600 mb-8">Last Updated: August 2026</p>

      <div className="space-y-6 text-sm leading-relaxed text-blue-900">
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-blue-800">1. Information We Collect</h2>
          <p className="text-blue-900">
            When you interact with Aristocrat 3D Printing—whether by requesting a quote, visiting our workshop at Wadala-Pathardi Rd, Indira Nagar, Nashik, or using our online contact forms—we may collect personal and project-specific information, including:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-blue-800">
            <li>Contact details (Name, Email Address, Phone/WhatsApp number)</li>
            <li>CAD files, blueprints, images, and custom specifications required for 3D printing or prototyping</li>
            <li>Billing and shipping addresses for order fulfillment</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-blue-800">2. How We Use Your Information</h2>
          <p className="text-blue-900">We use the data collected strictly for operational purposes, such as:</p>
          <ul className="list-disc pl-5 space-y-1 text-blue-800">
            <li>Evaluating blueprints and providing accurate price quotes</li>
            <li>Communicating order updates, timeline estimates, and support responses within 2–4 hours</li>
            <li>Fulfilling manufacturing requests and coordinating pickup or delivery</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-blue-800">3. Intellectual Property & File Security</h2>
          <p className="text-blue-900">
            Your CAD models, designs, and proprietary concepts remain strictly confidential. We do not share, sell, or display your custom designs in our public portfolio or marketing channels without your explicit written consent.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-blue-800">4. Contact Us</h2>
          <p className="text-blue-900">
            If you have questions regarding this Privacy Policy, feel free to reach out to us at <a href="mailto:aristrocrat3dprinting@gmail.com" className="text-blue-600 font-semibold hover:underline">aristrocrat3dprinting@gmail.com</a> or visit our workshop at Rathchakra Chowk, Indira Nagar, Nashik.
          </p>
        </section>
      </div>
    </main>
  );
}