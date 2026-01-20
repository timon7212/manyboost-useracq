"use client";

import { motion } from "framer-motion";

function Stat({ value, label, hint, delay = 0 }: { value: string; label: string; hint?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="text-center"
    >
      <div className="text-[34px] md:text-[48px] font-semibold tracking-[-0.03em] text-white leading-none">
        {value}
      </div>
      <div className="text-[12px] text-[#666] mt-2 uppercase tracking-wider">{label}</div>
      {hint && <div className="text-[12px] text-[#444] mt-1">{hint}</div>}
    </motion.div>
  );
}

export function DspStatsSection() {
  return (
    <section className="py-14 md:py-18 px-4 border-y border-[#1a1a1a] bg-[#060606]">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          <Stat value="500M+" label="DAU Reach" delay={0.05} />
          <Stat value="20+" label="Partner DSPs" delay={0.1} />
          <Stat value="100+" label="Countries" delay={0.15} />
          <Stat value="<1%" label="Fraud Rate" hint="target" delay={0.2} />
        </div>
      </div>
    </section>
  );
}

