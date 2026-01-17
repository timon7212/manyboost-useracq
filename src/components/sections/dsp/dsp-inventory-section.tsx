"use client";

import Image from "next/image";
import { motion } from "framer-motion";

function Tile({ name, delay = 0 }: { name: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay }}
      className="relative rounded-[18px] p-[1px]"
      style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #333 50%, #1a1a1a 100%)" }}
    >
      <div className="rounded-[17px] bg-[#0a0a0a] p-4 border border-[#1a1a1a]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[12px] overflow-hidden border border-[#222] bg-[#0f0f0f] flex items-center justify-center">
            <Image src="/dsp/icon-placeholder.svg" alt="" width={40} height={40} />
          </div>
          <div className="min-w-0">
            <div className="text-[13px] text-white font-medium truncate">{name}</div>
            <div className="text-[11px] text-[#666] truncate">Selected partner</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function DspInventorySection() {
  const partnerDsps = [
    "Partner DSP #1",
    "Partner DSP #2",
    "Partner DSP #3",
    "Partner DSP #4",
    "Partner DSP #5",
    "Partner DSP #6",
    "Partner DSP #7",
    "Partner DSP #8",
    "Partner DSP #9",
    "Partner DSP #10",
    "Partner DSP #11",
    "Partner DSP #12",
  ];

  return (
    <section id="inventory" className="relative py-18 md:py-24 px-4 bg-black overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[700px] opacity-35"
          style={{ background: "radial-gradient(ellipse at center, rgba(233, 119, 20, 0.10) 0%, transparent 60%)" }}
        />
      </div>

      <div className="max-w-[1100px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-12"
        >
          <span className="inline-block text-[11px] uppercase tracking-[0.15em] text-[#e97714] mb-4">
            Supply & Reach
          </span>
          <h2 className="text-[30px] md:text-[44px] lg:text-[52px] tracking-[-0.04em] leading-[1.08] font-medium mb-4">
            <span className="gradient-text">Own DSP</span>
            <span className="text-white"> + partner DSPs + direct integrations</span>
          </h2>
          <p className="text-[15px] md:text-[17px] text-[#666] max-w-[860px] mx-auto leading-[1.7]">
            Scale comes from coverage — quality comes from control. We combine our in‑house DSP, top partner DSPs,
            and direct publisher integrations to give UA teams predictable reach with clear levers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left: narrative + “stack” */}
          <div className="lg:col-span-5 rounded-[24px] p-[1px]" style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #333 50%, #1a1a1a 100%)" }}>
            <div className="rounded-[23px] bg-[#0a0a0a] border border-[#1a1a1a] p-6 md:p-7">
              <div className="text-[12px] uppercase tracking-[0.15em] text-[#666] mb-2">Buying stack</div>
              <div className="text-[22px] md:text-[26px] font-medium text-white tracking-[-0.02em] mb-3">
                One operating model for multiple sources
              </div>
              <div className="text-[14px] text-[#666] leading-[1.75] mb-6">
                You get a single partner, unified reporting, and a consistent quality layer — while we route spend
                across the best available supply for your KPI.
              </div>

              <div className="space-y-3">
                {[
                  { t: "In‑house DSP", d: "Controls, pacing, and optimization logic in one place." },
                  { t: "Partner DSPs", d: "Coverage and speed-to-scale with partner access." },
                  { t: "Direct integrations", d: "Cleaner supply paths and stronger transparency." },
                ].map((x) => (
                  <div key={x.t} className="rounded-[18px] bg-[#0b0b0b] border border-[#1a1a1a] p-4">
                    <div className="text-[13px] text-white font-medium">{x.t}</div>
                    <div className="text-[12px] text-[#666] mt-1 leading-[1.55]">{x.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: partner tiles */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {partnerDsps.map((name, idx) => (
                <Tile key={name} name={name} delay={0.05 + idx * 0.03} />
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 rounded-[22px] p-[1px]"
          style={{ background: "linear-gradient(135deg, #222 0%, #111 50%, #222 100%)" }}
        >
          <div className="bg-[#080808] rounded-[21px] p-6 md:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="text-[15px] text-white font-medium mb-1">Want an inventory breakdown?</div>
              <div className="text-[13px] text-[#555] leading-[1.7]">
                We can share categories, formats, and geo coverage matched to your KPI and compliance constraints.
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:block w-px h-10 bg-[#222]" />
              <a
                href="mailto:busdev@manyboost.io?subject=DSP%20inventory%20request"
                className="px-6 py-3 bg-[#e97714] hover:bg-[#d16a10] text-black font-semibold rounded-full text-[14px] transition-colors whitespace-nowrap"
              >
                Request inventory list →
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

