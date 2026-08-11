import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aristocrat 3D Printing | Precision Prototyping & Manufacturing",
  description: "Enterprise-grade 3D printing, rapid prototyping, and custom fabrication services.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body 
        className={`${inter.className} bg-[#F7F9FA] text-[#2D3748] antialiased min-h-screen flex flex-col relative`}
        suppressHydrationWarning
      >
        <Navbar />
        <main className="flex-grow pt-20">{children}</main>
        <Footer />
        
        {/* Global Floating WhatsApp Widget */}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}