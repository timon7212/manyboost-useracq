"use client";

import { motion } from "framer-motion";

interface AdvantageCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: boolean;
  size?: "large" | "normal";
  delay?: number;
}

function AdvantageCard({ icon, title, description, highlight = false, size = "normal", delay = 0 }: AdvantageCardProps) {
  const isLarge = size === "large";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`
        group relative rounded-[24px] p-[1px] overflow-hidden
        ${isLarge ? 'md:col-span-2' : ''}
      `}
      style={{
        background: highlight 
          ? 'linear-gradient(135deg, #e97714 0%, #333 40%, #e97714 100%)' 
          : 'linear-gradient(135deg, #1f1f1f 0%, #333 50%, #1f1f1f 100%)',
      }}
    >
      <div 
        className={`
          h-full rounded-[23px] p-6 md:p-8 flex flex-col
          transition-all duration-300
          ${highlight 
            ? 'bg-gradient-to-br from-[#1a1008] to-[#0a0a0a]' 
            : 'bg-[#0a0a0a] group-hover:bg-[#0f0f0f]'
          }
        `}
      >
        {/* Icon */}
        <div 
          className={`
            w-14 h-14 rounded-[16px] flex items-center justify-center mb-5
            transition-all duration-300
            ${highlight 
              ? 'bg-[#e97714]/15 text-[#e97714]' 
              : 'bg-[#1a1a1a] text-[#666] group-hover:text-[#888] group-hover:bg-[#1f1f1f]'
            }
          `}
        >
          {icon}
        </div>

        {/* Content */}
        <h3 
          className={`
            text-[20px] md:text-[24px] font-medium tracking-[-0.02em] mb-3 leading-tight
            ${highlight ? 'text-white' : 'text-[#ccc] group-hover:text-white transition-colors'}
          `}
        >
          {title}
        </h3>
        <p className="text-[14px] md:text-[15px] text-[#666] leading-[1.6] tracking-[-0.01em] flex-1">
          {description}
        </p>

        {/* Highlight glow effect */}
        {highlight && (
          <div 
            className="absolute inset-0 rounded-[23px] pointer-events-none opacity-60"
            style={{
              background: 'radial-gradient(ellipse at 30% 20%, rgba(233, 119, 20, 0.1) 0%, transparent 50%)',
            }}
          />
        )}
      </div>
    </motion.div>
  );
}

const advantages = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3L3 8V14C3 20.075 7.925 25 14 25C20.075 25 25 20.075 25 14V8L14 3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M10 14L13 17L18 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Direct Publisher Traffic",
    description: "Traffic directly from 53 verified publishers with 2.6M MAU. No middlemen — just direct access to quality users.",
    highlight: true,
    size: "large" as const,
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="2"/>
        <path d="M14 8V14L18 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M14 4V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M14 22V24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Advanced Anti-Fraud",
    description: "Multi-layer traffic verification. Automated and manual checks to protect against fraud and chargebacks.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="6" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M4 10H24" stroke="currentColor" strokeWidth="2"/>
        <circle cx="8" cy="16" r="1.5" fill="currentColor"/>
        <path d="M12 16H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Full MMP Integration",
    description: "Native integrations with Adjust, AppsFlyer, Singular, Branch, and Kochava. Full attribution tracking.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 20L10 14L16 18L24 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24 8V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M24 8H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Real-time Analytics",
    description: "Dashboard with real-time metrics. Installs, events, revenue — everything under control.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="10" r="4" stroke="currentColor" strokeWidth="2"/>
        <path d="M6 24C6 19.5817 9.58172 16 14 16C18.4183 16 22 19.5817 22 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M20 6L24 10L20 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Dedicated Account Manager",
    description: "Personal manager for every advertiser. Fast support and campaign optimization.",
  },
];

export function AdvantagesSectionV2() {
  return (
    <section className="relative py-20 md:py-32 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/4 left-0 w-[600px] h-[600px] opacity-30"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(233, 119, 20, 0.08) 0%, transparent 60%)',
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
            Why Choose Us
          </span>
          <h2 className="text-[32px] md:text-[48px] lg:text-[56px] tracking-[-0.04em] leading-[1.05] font-medium mb-4">
            <span className="gradient-text">Built for Performance</span>
          </h2>
          <p className="text-[15px] md:text-[17px] text-[#666] max-w-[500px] mx-auto leading-[1.6]">
            Everything UA managers need. Direct traffic, full attribution, anti-fraud protection.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {advantages.map((adv, idx) => (
            <AdvantageCard
              key={idx}
              icon={adv.icon}
              title={adv.title}
              description={adv.description}
              highlight={adv.highlight}
              size={adv.size}
              delay={0.1 + idx * 0.08}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
