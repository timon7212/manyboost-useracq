"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-black">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-semibold text-white mb-6">
              Terms & Conditions
            </h1>
            
            {/* PDF Viewer */}
            <div className="w-full h-screen min-h-[800px] border border-[#1a1a1a] rounded-lg overflow-hidden bg-white">
              <iframe
                src="/TermsForMBClients.pdf"
                className="w-full h-full"
                title="Terms and Conditions PDF"
              />
            </div>
            
            {/* Download link */}
            <div className="mt-6 text-center">
              <a
                href="/TermsForMBClients.pdf"
                download
                className="inline-flex items-center gap-2 text-[#e97714] hover:text-[#d16a10] transition-colors text-sm"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Скачать PDF</span>
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
