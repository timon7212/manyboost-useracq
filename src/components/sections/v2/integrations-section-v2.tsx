"use client";

import { motion } from "framer-motion";

// MMP logos as styled components
const mmpLogos = [
  { name: "Adjust", color: "#0a2540", textColor: "#ffffff" },
  { name: "AppsFlyer", color: "#1a1a2e", textColor: "#a78bfa" },
  { name: "Singular", color: "#1a1a1a", textColor: "#22c55e" },
  { name: "Branch", color: "#0a1a0a", textColor: "#4ade80" },
  { name: "Kochava", color: "#1a0a0a", textColor: "#f87171" },
  { name: "Tenjin", color: "#0a0a1a", textColor: "#60a5fa" },
];

function LogoCard({ name, color, textColor, delay = 0 }: { name: string; color: string; textColor: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="group"
    >
      <div 
        className="w-[100px] h-[56px] md:w-[160px] md:h-[72px] rounded-[14px] md:rounded-[16px] flex items-center justify-center transition-all duration-300 group-hover:scale-105"
        style={{ 
          background: `linear-gradient(135deg, ${color} 0%, #0a0a0a 100%)`,
          border: '1px solid #222',
        }}
      >
        <span 
          className="text-[12px] md:text-[16px] font-semibold tracking-[-0.02em]"
          style={{ color: textColor }}
        >
          {name}
        </span>
      </div>
    </motion.div>
  );
}

export function IntegrationsSectionV2() {
  return (
    <section className="relative py-20 md:py-28 px-4 overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] opacity-40"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(167, 139, 250, 0.08) 0%, transparent 60%)',
          }}
        />
      </div>

      <div className="max-w-[900px] mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-14"
        >
          <span className="inline-block text-[11px] uppercase tracking-[0.15em] text-[#e97714] mb-4">
            Integrations
          </span>
          <h2 className="text-[32px] md:text-[48px] lg:text-[56px] tracking-[-0.04em] leading-[1.05] font-medium mb-4">
            <span className="gradient-text">Native MMP Integration</span>
          </h2>
          <p className="text-[15px] md:text-[17px] text-[#666] max-w-[500px] mx-auto leading-[1.6]">
            Server-to-server integration with all major MMPs.
            Full attribution tracking without any extra setup.
          </p>
        </motion.div>

        {/* Logos grid - 3 per row */}
        <div className="grid grid-cols-3 gap-3 md:gap-5 max-w-[540px] mx-auto mb-10">
          {mmpLogos.map((logo, idx) => (
            <LogoCard
              key={idx}
              name={logo.name}
              color={logo.color}
              textColor={logo.textColor}
              delay={0.1 + idx * 0.05}
            />
          ))}
        </div>

        {/* Integration features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-6 md:gap-10"
        >
          {[
            { icon: "⚡", text: "S2S Postbacks" },
            { icon: "📊", text: "Real-time Events" },
            { icon: "🔐", text: "Secure Data Transfer" },
            { icon: "🎯", text: "Deep Event Tracking" },
          ].map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-[16px]">{feature.icon}</span>
              <span className="text-[13px] text-[#666]">{feature.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
