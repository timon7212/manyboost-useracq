"use client";

import { motion } from "framer-motion";

interface CaseStudyCardProps {
  category: string;
  title: string;
  description: string;
  metrics: { label: string; value: string; color: string }[];
  color: string;
  delay?: number;
}

function CaseStudyCard({ category, title, description, metrics, color, delay = 0 }: CaseStudyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="group"
    >
      <div 
        className="rounded-[24px] p-[1px] h-full"
        style={{
          background: `linear-gradient(135deg, ${color}50 0%, #1a1a1a 40%, ${color}50 100%)`,
        }}
      >
        <div className="bg-[#0a0a0a] rounded-[23px] p-6 md:p-8 h-full flex flex-col group-hover:bg-[#0c0c0c] transition-colors">
          {/* Category tag */}
          <div 
            className="inline-flex self-start px-3 py-1 rounded-full text-[11px] font-medium mb-6"
            style={{ background: `${color}15`, color }}
          >
            {category}
          </div>

          {/* Title and description */}
          <h3 className="text-[22px] md:text-[26px] font-medium tracking-[-0.02em] text-white mb-3 leading-tight">
            {title}
          </h3>
          <p className="text-[14px] text-[#666] leading-[1.6] mb-6 flex-1">
            {description}
          </p>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#1a1a1a]">
            {metrics.map((metric, idx) => (
              <div key={idx}>
                <div 
                  className="text-[24px] md:text-[28px] font-medium tracking-[-0.02em]"
                  style={{ color: metric.color }}
                >
                  {metric.value}
                </div>
                <div className="text-[11px] text-[#555] uppercase tracking-[0.05em]">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const caseStudies = [
  {
    category: "Puzzle Game",
    title: "US Market Launch",
    description: "Launched campaign for Match-3 puzzle game. Target audience: casual gamers 25-45 years old.",
    metrics: [
      { label: "Installs", value: "85K", color: "#e97714" },
      { label: "D7 ROAS", value: "127%", color: "#22c55e" },
      { label: "CPI", value: "$0.42", color: "#a78bfa" },
    ],
    color: "#e97714",
  },
  {
    category: "RPG Mobile",
    title: "Global Scale-up",
    description: "Scaled traffic for mid-core RPG across 15 countries. CPA optimization for first purchase.",
    metrics: [
      { label: "Events", value: "24K", color: "#e97714" },
      { label: "CVR", value: "18%", color: "#22c55e" },
      { label: "CPA", value: "$2.10", color: "#a78bfa" },
    ],
    color: "#22c55e",
  },
  {
    category: "Strategy Game",
    title: "High LTV Campaign",
    description: "Premium traffic campaign for 4X strategy game. Focus on engaged players with high ARPU.",
    metrics: [
      { label: "Installs", value: "32K", color: "#e97714" },
      { label: "LTV D30", value: "$8.50", color: "#22c55e" },
      { label: "Retention", value: "24%", color: "#a78bfa" },
    ],
    color: "#a78bfa",
  },
];

export function CaseStudiesSectionV2() {
  return (
    <section className="relative py-20 md:py-32 px-4 overflow-hidden bg-[#030303]">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/2 right-0 w-[600px] h-[600px] opacity-40"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(34, 197, 94, 0.08) 0%, transparent 60%)',
          }}
        />
      </div>

      <div className="max-w-[1000px] mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block text-[11px] uppercase tracking-[0.15em] text-[#e97714] mb-4">
            Proven Performance
          </span>
          <h2 className="text-[32px] md:text-[48px] lg:text-[56px] tracking-[-0.04em] leading-[1.05] font-medium mb-4">
            <span className="gradient-text">Real Results</span>
          </h2>
          <p className="text-[15px] md:text-[17px] text-[#666] max-w-[500px] mx-auto leading-[1.6]">
            Aggregated metrics from campaigns across different game genres and geos
          </p>
        </motion.div>

        {/* Case study cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {caseStudies.map((study, idx) => (
            <CaseStudyCard
              key={idx}
              category={study.category}
              title={study.title}
              description={study.description}
              metrics={study.metrics}
              color={study.color}
              delay={0.1 + idx * 0.1}
            />
          ))}
        </div>

        {/* Bottom stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="rounded-[20px] p-[1px]"
          style={{
            background: 'linear-gradient(135deg, #222 0%, #111 50%, #222 100%)',
          }}
        >
          <div className="bg-[#080808] rounded-[19px] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h4 className="text-[18px] font-medium text-white mb-1">Ready to see similar results?</h4>
              <p className="text-[14px] text-[#555]">Get a free campaign analysis and forecast</p>
            </div>
            <a 
              href="mailto:busdev@manyboost.io"
              className="px-6 py-3 bg-[#e97714] hover:bg-[#d16a10] text-black font-semibold rounded-full text-[14px] transition-colors whitespace-nowrap"
            >
              Get Free Analysis →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
