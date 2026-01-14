"use client";

import { motion } from "framer-motion";

interface TrafficTypeCardProps {
  icon: React.ReactNode;
  abbr: string;
  title: string;
  description: string;
  features: string[];
  color: string;
  delay?: number;
}

function TrafficTypeCard({ icon, abbr, title, description, features, color, delay = 0 }: TrafficTypeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group relative"
    >
      {/* Card */}
      <div 
        className="rounded-[24px] p-[1px] h-full"
        style={{
          background: `linear-gradient(135deg, ${color}40 0%, #1a1a1a 50%, ${color}40 100%)`,
        }}
      >
        <div className="bg-[#0a0a0a] rounded-[23px] p-6 md:p-8 h-full flex flex-col group-hover:bg-[#0c0c0c] transition-colors">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div 
              className="w-14 h-14 rounded-[16px] flex items-center justify-center"
              style={{ background: `${color}15` }}
            >
              <div style={{ color }}>{icon}</div>
            </div>
            <div 
              className="px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.05em]"
              style={{ background: `${color}15`, color }}
            >
              {abbr}
            </div>
          </div>

          {/* Content */}
          <h3 className="text-[22px] md:text-[26px] font-medium tracking-[-0.02em] text-white mb-3">
            {title}
          </h3>
          <p className="text-[14px] text-[#666] leading-[1.6] mb-6 flex-1">
            {description}
          </p>

          {/* Features */}
          <div className="space-y-2">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded-full flex items-center justify-center"
                  style={{ background: `${color}20` }}
                >
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1 4L3 6L7 2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-[13px] text-[#888]">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const trafficTypes = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4L4 9V14C4 20.075 8.925 25 15 25H24V9L14 4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M12 14L14 16L18 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    abbr: "CPI",
    title: "Cost Per Install",
    description: "Pay only for real installs of your app. Full control over budget and scaling.",
    features: [
      "iOS & Android support",
      "Geo-targeting T1-T3",
      "Daily caps & limits",
      "Postback integration",
    ],
    color: "#e97714",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="2"/>
        <path d="M14 9V14L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M9 14H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M17 14H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    abbr: "CPE",
    title: "Cost Per Engagement",
    description: "Pay for specific in-app events: registration, level completion, tutorial finish.",
    features: [
      "Custom events",
      "Multi-event tracking",
      "Hold period support",
      "Deep engagement",
    ],
    color: "#22c55e",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="8" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M4 12H24" stroke="currentColor" strokeWidth="2"/>
        <path d="M9 17H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M16 17H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    abbr: "CPA",
    title: "Cost Per Action",
    description: "Pay for target actions: purchases, subscriptions, deposits. Maximum ROI for your business.",
    features: [
      "Revenue share models",
      "First-time purchase",
      "Subscription tracking",
      "High LTV traffic",
    ],
    color: "#a78bfa",
  },
];

export function TrafficTypesSectionV2() {
  return (
    <section className="relative py-20 md:py-32 px-4 overflow-hidden bg-[#050505]">
      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div 
          className="absolute top-0 right-0 w-[600px] h-[600px]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(34, 197, 94, 0.06) 0%, transparent 60%)',
          }}
        />
        <div 
          className="absolute bottom-0 left-0 w-[600px] h-[600px]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(167, 139, 250, 0.06) 0%, transparent 60%)',
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
            Pricing Models
          </span>
          <h2 className="text-[32px] md:text-[48px] lg:text-[56px] tracking-[-0.04em] leading-[1.05] font-medium mb-4">
            <span className="gradient-text">Your Metrics, Your Rate</span>
          </h2>
          <p className="text-[15px] md:text-[17px] text-[#666] max-w-[550px] mx-auto leading-[1.6]">
            Choose the pricing model that fits your KPI. 
            Pay only for results.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {trafficTypes.map((type, idx) => (
            <TrafficTypeCard
              key={idx}
              icon={type.icon}
              abbr={type.abbr}
              title={type.title}
              description={type.description}
              features={type.features}
              color={type.color}
              delay={0.1 + idx * 0.1}
            />
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <p className="text-[13px] text-[#555]">
            All models include <span className="text-[#888]">full MMP tracking</span>, 
            <span className="text-[#888]"> real-time reporting</span> and 
            <span className="text-[#888]"> dedicated support</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
