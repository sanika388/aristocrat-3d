export default function RefundPolicy() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-16 bg-white text-blue-900 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-900 mb-4">Refund & Cancellation Policy</h1>
      <p className="text-xs font-mono text-blue-600 mb-8">Last Updated: August 2026</p>

      <div className="space-y-6 text-sm leading-relaxed text-blue-900">
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-blue-800">1. Custom Manufacturing Nature</h2>
          <p className="text-blue-900">
            Because every item produced by Aristocrat 3D Printing is built-to-order according to unique client blueprints, CAD dimensions, and selected polymer types, standard retail return policies do not apply.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-blue-800">2. Order Cancellations</h2>
          <p className="text-blue-900">
            You may cancel an order and receive a full refund <strong className="text-blue-950">only before printing has commenced</strong>. Once machine calibration and print execution have started, cancellations cannot be accommodated.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-blue-800">3. Defective or Incorrect Prints</h2>
          <p className="text-blue-900">
            If a printed part structural defect occurs due to a production or machine failure on our end, or if it deviates significantly from the agreed-upon technical parameters, you must notify us within <strong className="text-blue-950">48 hours</strong> of receiving your item. We will inspect the part and offer a reprint or appropriate resolution.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-blue-800">4. Contact for Claims</h2>
          <p className="text-blue-900">
            To report an issue or request a review, please email us directly at <a href="mailto:aristrocrat3dprinting@gmail.com" className="text-blue-600 font-semibold hover:underline">aristrocrat3dprinting@gmail.com</a> or contact our support team at +91 90287 88532 / +91 89750 82548.
          </p>
        </section>
      </div>
    </main>
  );
}