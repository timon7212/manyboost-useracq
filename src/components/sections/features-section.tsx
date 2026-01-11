"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 4V28M4 16H28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4"/>
      </svg>
    ),
    title: "CPI / CPE / CPA pricing",
    description: "Pay only for real installs, events, and actions. No impressions, no wasted budget.",
    highlight: true,
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="8" width="24" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M4 12H28" stroke="currentColor" strokeWidth="2"/>
        <circle cx="8" cy="18" r="2" fill="currentColor"/>
        <path d="M12 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Full MMP tracking",
    description: "Native integrations with Adjust, AppsFlyer, Singular, and more.",
    badges: ["Adjust", "AppsFlyer"],
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M6 22L12 16L18 20L26 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M26 10V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M26 10H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Caps & postbacks",
    description: "Set daily limits, hold periods, and real-time event postbacks.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 4L4 10V16C4 22.6274 9.37258 28 16 28C22.6274 28 28 22.6274 28 16V10L16 4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M12 16L15 19L20 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Fraud protection",
    description: "Manual reviews and automated checks to ensure quality traffic.",
  },
];

function FeatureCard({
  icon,
  title,
  description,
  badges,
  highlight,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  badges?: string[];
  highlight?: boolean;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group relative rounded-[20px] p-[1px]"
      style={{
        background: highlight 
          ? 'linear-gradient(135deg, #333 0%, #555 50%, #333 100%)' 
          : 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)',
      }}
    >
      <div 
        className={`
          relative h-full rounded-[19px] p-6 md:p-8 flex flex-col
          transition-all duration-300
          ${highlight 
            ? 'bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]' 
            : 'bg-[#0a0a0a] group-hover:bg-[#0f0f0f]'
          }
        `}
      >
        {/* Icon */}
        <div 
          className={`
            w-14 h-14 rounded-[14px] flex items-center justify-center mb-6
            transition-colors duration-300
            ${highlight 
              ? 'bg-[#e97714]/10 text-[#e97714]' 
              : 'bg-[#1a1a1a] text-[#666] group-hover:text-[#999] group-hover:bg-[#1f1f1f]'
            }
          `}
        >
          {icon}
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 
            className={`
              text-[22px] md:text-[26px] font-medium tracking-[-0.02em] mb-3 leading-tight
              ${highlight ? 'text-white' : 'text-[#ccc]'}
            `}
          >
            {title}
          </h3>
          <p className="text-[14px] md:text-[15px] text-[#666] leading-[1.5] tracking-[-0.01em]">
            {description}
          </p>
        </div>

        {/* Badges for MMP */}
        {badges && (
          <div className="flex items-center gap-2 mt-6">
            {badges.map((badge, idx) => (
              <span 
                key={idx}
                className={`
                  text-[11px] font-medium px-3 py-1.5 rounded-full tracking-[0.02em]
                  ${badge === 'Adjust' 
                    ? 'bg-[#0a2540] text-white' 
                    : 'bg-[#1a1a1a] text-[#a78bfa] border border-[#a78bfa]/20'
                  }
                `}
              >
                {badge}
              </span>
            ))}
            <span className="text-[11px] text-[#444] ml-1">+4 more</span>
          </div>
        )}

        {/* Highlight glow effect */}
        {highlight && (
          <div 
            className="absolute inset-0 rounded-[19px] pointer-events-none opacity-50"
            style={{
              background: 'radial-gradient(ellipse at 30% 20%, rgba(233, 119, 20, 0.08) 0%, transparent 60%)',
            }}
          />
        )}
      </div>
    </motion.div>
  );
}

export function FeaturesSection() {
  return (
    <section className="relative py-24 md:py-40 px-4">
      {/* Background effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-20"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(233, 119, 20, 0.1) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="max-w-[840px] mx-auto">
        {/* Section title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[36px] sm:text-[48px] md:text-[59px] text-center tracking-[-0.05em] leading-[0.86] mb-4 font-medium"
        >
          <span className="gradient-text">Built </span>
          <span className="font-light text-[#9A9A9A]">for </span>
          <span className="gradient-text">performance</span>
          <br />
          <span className="gradient-text">teams</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[16px] md:text-[18px] text-[#666] text-center max-w-[480px] mx-auto mb-12 md:mb-16 tracking-[-0.02em]"
        >
          Everything UA managers need. No compromises.
        </motion.p>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {features.map((feature, idx) => (
            <FeatureCard
              key={idx}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              badges={feature.badges}
              highlight={feature.highlight}
              delay={0.15 + idx * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
