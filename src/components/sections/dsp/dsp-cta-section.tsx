"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { LeadModal } from "@/components/ui/lead-modal";

export function DspCtaSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="relative py-20 md:py-28 px-4 overflow-hidden bg-black">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] opacity-45"
            style={{ background: "radial-gradient(ellipse at center, rgba(233, 119, 20, 0.15) 0%, transparent 60%)" }}
          />
        </div>

        <div className="max-w-[900px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-[28px] p-[1px]"
            style={{ background: "linear-gradient(135deg, #e97714 0%, #333 40%, #22c55e 100%)" }}
          >
            <div className="bg-[#0a0a0a] rounded-[27px] py-14 md:py-18 px-8 md:px-12 text-center">
              <div className="inline-flex items-center gap-2 bg-[#e97714]/10 border border-[#e97714]/20 rounded-full px-4 py-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
                <span className="text-[12px] text-[#888]">Ready to scale?</span>
              </div>

              <h2 className="text-[30px] sm:text-[42px] md:text-[54px] tracking-[-0.04em] leading-[1.05] font-medium mb-5">
                <span className="gradient-text">Let’s build</span>
                <br />
                <span className="text-white">a profitable acquisition plan</span>
              </h2>
              <p className="text-[15px] md:text-[17px] text-[#666] max-w-[620px] mx-auto leading-[1.6] mb-9">
                Tell us your KPI and target geos — we’ll respond with a tailored plan and launch timeline.
                No commitment required.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => setModalOpen(true)}
                  className="px-10 py-5 bg-[#e97714] hover:bg-[#d16a10] text-black font-semibold rounded-full text-[16px] transition-colors shadow-lg shadow-[#e97714]/30"
                >
                  Request a Media Plan →
                </button>
                <a
                  href="mailto:busdev@manyboost.io?subject=UA%20in-app%20acquisition%20media%20plan"
                  className="px-10 py-5 bg-[#0a0a0a] hover:bg-[#111] border border-[#222] rounded-full text-[16px] text-white font-medium transition-colors"
                >
                  Email us
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-[12px] text-[#555]">
                <div className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span>Proposal in 24h</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span>Fraud‑protected traffic</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span>MMP integration</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <LeadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} type="advertiser" />
    </>
  );
}

