"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { LeadModal } from "@/components/ui/lead-modal";

export function CtaSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="relative py-20 md:py-28 px-4 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] opacity-50"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(233, 119, 20, 0.15) 0%, transparent 60%)',
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-[700px] mx-auto relative z-10"
        >
          <div
            className="rounded-[28px] p-[1px]"
            style={{
              background: 'linear-gradient(135deg, #e97714 0%, #333 30%, #e97714 60%, #333 100%)',
            }}
          >
            <div className="bg-[#080808] rounded-[27px] px-6 py-12 md:px-12 md:py-16 text-center relative overflow-hidden">
              {/* Inner glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at top, rgba(233, 119, 20, 0.08) 0%, transparent 50%)',
                }}
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative z-10"
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-[#e97714]/10 rounded-full px-4 py-2 mb-6">
                  <div className="w-2 h-2 rounded-full bg-[#e97714] animate-pulse" />
                  <span className="text-[12px] text-[#e97714] font-medium">Limited spots available</span>
                </div>

                <h2 className="text-[28px] sm:text-[36px] md:text-[44px] tracking-[-0.04em] leading-[1.1] mb-4 font-medium">
                  <span className="text-white">Ready to </span>
                  <span className="text-[#e97714]">scale</span>
                  <span className="text-white"> your</span>
                  <br />
                  <span className="text-white">user acquisition?</span>
                </h2>

                <p className="text-[15px] md:text-[17px] text-[#666] mb-8 max-w-[400px] mx-auto leading-[1.6]">
                  Get high-LTV users through creator-driven campaigns. 
                  Full MMP integration, transparent pricing.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => setModalOpen(true)}
                    className="px-8 py-4 bg-[#e97714] hover:bg-[#d16a10] text-black font-semibold rounded-full text-[15px] transition-all duration-200 shadow-lg shadow-[#e97714]/20 hover:shadow-[#e97714]/30"
                  >
                    Start a campaign →
                  </button>
                  <a
                    href="mailto:busdev@manyboost.io"
                    className="px-8 py-4 bg-transparent hover:bg-[#111] border border-[#333] text-white font-medium rounded-full text-[15px] transition-colors"
                  >
                    Talk to sales
                  </a>
                </div>

                {/* Trust indicators */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-[12px] text-[#555]">
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span>No minimum spend</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span>Launch in 48 hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span>Full attribution</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      <LeadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} type="advertiser" />
    </>
  );
}
