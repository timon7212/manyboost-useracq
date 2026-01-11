"use client";

import { motion } from "framer-motion";

interface BarData {
  label: string;
  height: number;
  value: string;
}

const otherOfferwallsData: BarData[] = [
  { label: "D7", height: 100, value: "" },
  { label: "D14", height: 35, value: "" },
  { label: "D30", height: 12, value: "" },
  { label: "D60", height: 3, value: "" },
];

const manyBoostData: BarData[] = [
  { label: "D7", height: 100, value: "" },
  { label: "D14", height: 85, value: "" },
  { label: "D30", height: 67, value: "" },
  { label: "D60", height: 52, value: "" },
];

function RetentionChart({
  title,
  subtitle,
  data,
  variant,
  delay = 0,
}: {
  title: string;
  subtitle: string;
  data: BarData[];
  variant: "dark" | "green";
  delay?: number;
}) {
  const isGreen = variant === "green";
  const maxHeight = 180;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="rounded-[20px] p-[1px]"
      style={{
        background: isGreen 
          ? 'linear-gradient(135deg, #1a3a1a 0%, #2d5a2d 50%, #1a3a1a 100%)' 
          : 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)',
      }}
    >
      <div className={`
        rounded-[19px] p-6 md:p-8
        ${isGreen ? 'bg-[#0a1208]' : 'bg-[#0a0a0a]'}
      `}>
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h3 className={`
              text-[20px] md:text-[24px] font-medium tracking-[-0.02em] mb-1
              ${isGreen ? 'text-[#4ade80]' : 'text-[#666]'}
            `}>
              {title}
            </h3>
            <p className="text-[13px] text-[#444] tracking-[-0.01em]">{subtitle}</p>
          </div>
          {isGreen && (
            <div className="flex items-center gap-1.5 bg-[#4ade80]/10 px-3 py-1.5 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
              <span className="text-[11px] text-[#4ade80] font-medium">Higher retention</span>
            </div>
          )}
        </div>

        {/* Chart */}
        <div className="flex items-end justify-between gap-3 md:gap-4 mb-4">
          {data.map((bar, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center">
              {/* Value label */}
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: delay + 0.5 + idx * 0.1 }}
                className={`
                  text-[12px] md:text-[14px] font-medium mb-2 tracking-[-0.01em]
                  ${isGreen ? 'text-[#4ade80]' : 'text-[#444]'}
                `}
              >
                {bar.value}
              </motion.span>
              
              {/* Bar */}
              <div className="w-full flex justify-center">
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: Math.max((bar.height / 100) * maxHeight, 8) }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: delay + idx * 0.1 }}
                  className={`
                    w-full max-w-[60px] rounded-[10px]
                    ${isGreen 
                      ? 'bg-gradient-to-t from-[#166534] to-[#22c55e]/80' 
                      : 'bg-gradient-to-t from-[#1a1a1a] to-[#333]'
                    }
                  `}
                  style={{ 
                    minHeight: 8,
                    boxShadow: isGreen ? '0 0 20px rgba(34, 197, 94, 0.2)' : 'none'
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* X-axis labels */}
        <div className="flex justify-between gap-3 md:gap-4 border-t border-[#1a1a1a] pt-4">
          {data.map((bar, idx) => (
            <div key={idx} className="flex-1 text-center">
              <span className="text-[12px] md:text-[13px] text-[#444] tracking-[0.02em]">
                {bar.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function LtvSection() {
  return (
    <section className="relative py-24 md:py-40 px-4 overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] opacity-30"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(34, 197, 94, 0.1) 0%, transparent 60%)',
          }}
        />
      </div>

      <div className="max-w-[840px] mx-auto">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <h2 className="text-[36px] sm:text-[48px] md:text-[59px] tracking-[-0.05em] leading-[0.86] font-medium">
            <span className="gradient-text">Higher LTV,</span>
          </h2>
          <h2 className="text-[36px] sm:text-[48px] md:text-[59px] tracking-[-0.05em] leading-[0.86] font-medium">
            <span className="gradient-text">Better Cohorts</span>
          </h2>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[16px] md:text-[18px] text-[#666] text-center max-w-[500px] mx-auto mb-12 md:mb-16 tracking-[-0.02em]"
        >
          Creator-driven users stay longer and spend more.
          <br className="hidden md:block" />
          See the difference in retention.
        </motion.p>

        {/* Charts comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <RetentionChart
            title="Other offerwalls"
            subtitle="Traditional incentivized traffic"
            data={otherOfferwallsData}
            variant="dark"
            delay={0}
          />
          <RetentionChart
            title="ManyBoost"
            subtitle="Creator-driven acquisition"
            data={manyBoostData}
            variant="green"
            delay={0.2}
          />
        </div>

        {/* Bottom insight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 flex items-center justify-center gap-3"
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#333]" />
          <p className="text-[14px] text-[#666] text-center">
            <span className="text-[#4ade80] font-medium">Significant retention advantage</span>
            {" "}compared to traditional offerwalls
          </p>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#333]" />
        </motion.div>
      </div>
    </section>
  );
}
