"use client";

import Image from "next/image";
import { motion } from "framer-motion";

function Card({
  title,
  description,
  bullets,
  delay = 0,
}: {
  title: string;
  description: string;
  bullets: string[];
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay }}
      className="rounded-[24px] p-[1px]"
      style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #333 50%, #1a1a1a 100%)" }}
    >
      <div className="rounded-[23px] bg-[#0a0a0a] p-6 md:p-8 h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-[14px] overflow-hidden border border-[#222] bg-[#0f0f0f] flex items-center justify-center">
            <Image src="/dsp/icon-placeholder.svg" alt="" width={48} height={48} />
          </div>
          <div>
            <div className="text-[18px] md:text-[20px] font-medium text-white">{title}</div>
            <div className="text-[13px] text-[#666]">{description}</div>
          </div>
        </div>

        <div className="space-y-2 mt-5">
          {bullets.map((b) => (
            <div key={b} className="flex items-start gap-2.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" className="mt-[2px]">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <span className="text-[13px] text-[#888] leading-[1.6]">{b}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function DspCreativeLabSection() {
  return (
    <section className="relative py-20 md:py-28 px-4 bg-[#050505] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 right-0 w-[800px] h-[800px] opacity-25"
          style={{ background: "radial-gradient(ellipse at center, rgba(167, 139, 250, 0.10) 0%, transparent 60%)" }}
        />
      </div>

      <div className="max-w-[1100px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block text-[11px] uppercase tracking-[0.15em] text-[#e97714] mb-4">
            Creative Lab
          </span>
          <h2 className="text-[32px] md:text-[48px] lg:text-[56px] tracking-[-0.04em] leading-[1.05] font-medium mb-4">
            <span className="gradient-text">A/Bn Creative Testing</span>
            <span className="text-white"> at speed</span>
          </h2>
          <p className="text-[15px] md:text-[17px] text-[#666] max-w-[760px] mx-auto leading-[1.6]">
            We run structured creative experiments and iterate fast. In‑house team + testing framework designed for UA leaders
            who care about learning velocity and profitability.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Card
            title="Experiment pipeline"
            description="Hypothesis → variants → rollout"
            bullets={[
              "A/Bn tests across formats & placements",
              "Clear success criteria per KPI",
              "Fast iteration cadence (placeholder)",
            ]}
            delay={0.05}
          />
          <Card
            title="Creative intelligence"
            description="Learn what scales"
            bullets={[
              "Hook & angle tracking (placeholder)",
              "Asset library & versioning",
              "Insights shared with your UA team",
            ]}
            delay={0.1}
          />
          <Card
            title="Production support"
            description="In‑house team"
            bullets={[
              "Motion / static / UGC‑style assets",
              "Localization & resize workflows",
              "Brand safety & compliance checks",
            ]}
            delay={0.15}
          />
        </div>
      </div>
    </section>
  );
}

