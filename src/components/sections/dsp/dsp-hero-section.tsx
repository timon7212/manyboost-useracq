"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { LeadModal } from "@/components/ui/lead-modal";
import { ArrowRight, ShieldCheck, Sparkles, Target, Waves } from "lucide-react";

function TrustPoint({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
        <path d="M20 6L9 17l-5-5" />
      </svg>
      <span>{text}</span>
    </div>
  );
}

export function DspHeroSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="relative pt-32 md:pt-40 pb-10 md:pb-14 px-4 overflow-hidden bg-black">
        {/* Background (subtle + premium) */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-[1400px] h-[900px] opacity-25"
            animate={{ opacity: [0.22, 0.32, 0.22] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background:
                "radial-gradient(ellipse at center top, rgba(233, 119, 20, 0.18) 0%, transparent 60%)",
            }}
          />
          <div className="absolute inset-0 opacity-[0.06]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
                backgroundSize: "64px 64px",
              }}
            />
          </div>
        </div>

        <div className="max-w-[1100px] mx-auto relative z-10">
          <div className="grid grid-cols-1 gap-8 items-center">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-[#0a0a0a] border border-[#222] rounded-full px-4 py-2 mb-6"
              >
                <div className="w-8 h-8 rounded-full bg-[#e97714]/10 border border-[#e97714]/20 flex items-center justify-center text-[#e97714]">
                  <Waves size={16} />
                </div>
                <span className="text-[12px] text-[#aaa] font-medium tracking-wide">
                  In‑app acquisition partner for performance teams
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-[36px] sm:text-[52px] md:text-[64px] lg:text-[74px] tracking-[-0.05em] leading-[1.02] mb-5 font-medium"
              >
                <span className="text-white">Scale in‑app UA</span>
                <br />
                <span className="text-[#9A9A9A] font-light">with DSP reach</span>
                <span className="text-white"> &amp; direct supply</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-[16px] md:text-[18px] text-[#7b7b7b] leading-[1.75] mb-8 max-w-[880px] mx-auto"
              >
                ManyBoost helps Heads of UA grow profitably with a unified buying stack:
                our own DSP, 20+ partner DSPs, and direct publisher integrations worldwide.
                Built for clean measurement, creative learning velocity, and predictable scaling.
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-7"
              >
                <button
                  onClick={() => setModalOpen(true)}
                  className="px-10 py-5 bg-[#e97714] hover:bg-[#d16a10] text-black font-semibold rounded-full text-[16px] transition-all duration-200 shadow-lg shadow-[#e97714]/25 inline-flex items-center gap-2"
                >
                  Request a Media Plan <ArrowRight size={18} />
                </button>
                <a
                  href="#product"
                  className="px-10 py-5 bg-[#0a0a0a] hover:bg-[#111] border border-[#222] rounded-full text-[16px] text-white font-medium transition-colors inline-flex items-center gap-2"
                >
                  See the product <ArrowRight size={18} className="opacity-70" />
                </a>
              </motion.div>

              {/* Trust points */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="flex flex-wrap items-center justify-center gap-3 md:gap-4 text-[12px] text-[#666]"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a0a0a] border border-[#222]">
                  <Target size={14} className="text-[#e97714]" />
                  <span>Optimize to CPI / CPE / CPA / ROAS</span>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a0a0a] border border-[#222]">
                  <ShieldCheck size={14} className="text-[#22c55e]" />
                  <span>Fraud protection + quality ops</span>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a0a0a] border border-[#222]">
                  <Sparkles size={14} className="text-[#a78bfa]" />
                  <span>A/Bn creative testing framework</span>
                </div>
                <TrustPoint text="500M+ DAU reach" />
                <TrustPoint text="20+ partner DSPs" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <LeadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} type="advertiser" />
    </>
  );
}

