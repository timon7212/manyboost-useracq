"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { LeadModal } from "@/components/ui/lead-modal";

export function CtaSectionV2() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="relative py-20 md:py-32 px-4 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] opacity-50"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(233, 119, 20, 0.15) 0%, transparent 60%)',
            }}
          />
        </div>

        <div className="max-w-[800px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#e97714]/10 border border-[#e97714]/20 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
              <span className="text-[12px] text-[#888]">Ready to scale your UA</span>
            </div>

            {/* Headline */}
            <h2 className="text-[36px] md:text-[52px] lg:text-[64px] tracking-[-0.04em] leading-[1.05] font-medium mb-6">
              <span className="gradient-text">Let&apos;s Grow</span>
              <br />
              <span className="text-white">Together</span>
            </h2>

            {/* Description */}
            <p className="text-[16px] md:text-[18px] text-[#666] max-w-[500px] mx-auto leading-[1.6] mb-10">
              Get a personalized strategy for your game.
              No commitment required — we&apos;ll help you reach your growth goals.
            </p>

            {/* CTA button */}
            <div className="flex flex-col items-center gap-4 mb-10">
              <button
                onClick={() => setModalOpen(true)}
                className="px-12 py-5 bg-[#e97714] hover:bg-[#d16a10] text-black font-semibold rounded-full text-[16px] transition-all duration-200 shadow-lg shadow-[#e97714]/30 hover:shadow-[#e97714]/50 hover:scale-[1.02]"
              >
                Start a Campaign →
              </button>
              
              {/* Terms Link */}
              <a
                href="/terms"
                className="flex items-center gap-2 text-[14px] text-[#888] hover:text-[#e97714] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                <span>Terms & Conditions</span>
              </a>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-[12px] text-[#555]">
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span>Campaign launch in 48h</span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span>Dedicated manager</span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span>Flexible pricing</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <LeadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} type="advertiser" />
    </>
  );
}
