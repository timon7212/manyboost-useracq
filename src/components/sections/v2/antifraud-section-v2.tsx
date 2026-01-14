"use client";

import { motion } from "framer-motion";

interface ProtectionItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

function ProtectionItem({ icon, title, description, delay = 0 }: ProtectionItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex gap-4 items-start"
    >
      <div className="w-12 h-12 rounded-[14px] bg-[#e97714]/10 flex items-center justify-center flex-shrink-0 text-[#e97714]">
        {icon}
      </div>
      <div>
        <h4 className="text-[17px] font-medium text-white mb-1">{title}</h4>
        <p className="text-[14px] text-[#666] leading-[1.6]">{description}</p>
      </div>
    </motion.div>
  );
}

const protectionMethods = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
    title: "Device Fingerprinting",
    description: "Unique identification of each device to prevent multi-accounting and install farms.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    ),
    title: "Click-to-Install Time Analysis",
    description: "We track CTIT metrics to detect anomalies. Bot traffic has characteristic patterns.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        <path d="M9 10h.01M15 10h.01M9.5 15a3.5 3.5 0 005 0"/>
      </svg>
    ),
    title: "Behavioral Analytics",
    description: "User behavior analysis post-install. Real users show different interaction patterns than bots.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0110 0v4"/>
      </svg>
    ),
    title: "IP & Proxy Detection",
    description: "Automatic blocking of VPN, proxy, and data center traffic. Only real user IPs pass.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    title: "Manual Review",
    description: "Traffic team manually reviews campaigns. Suspicious sources are blocked immediately.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    title: "Real-time Monitoring",
    description: "24/7 monitoring with automatic alerts on anomaly detection. Quick response to threats.",
  },
];

export function AntifraudSectionV2() {
  return (
    <section className="relative py-20 md:py-32 px-4 overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] opacity-40"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(233, 119, 20, 0.08) 0%, transparent 60%)',
          }}
        />
      </div>

      <div className="max-w-[1000px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-[11px] uppercase tracking-[0.15em] text-[#e97714] mb-4">
                Anti-Fraud Protection
              </span>
              <h2 className="text-[32px] md:text-[42px] lg:text-[48px] tracking-[-0.04em] leading-[1.1] font-medium mb-5">
                <span className="gradient-text">Only Real Users</span>
                <br />
                <span className="text-[#666]">Zero Fraud</span>
              </h2>
              <p className="text-[15px] md:text-[16px] text-[#666] leading-[1.7] mb-8">
                Multi-layered protection system to guarantee traffic quality. 
                We detect and block fraud at every stage — from click to in-app event.
              </p>
            </motion.div>

            {/* Protection stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex gap-8 mb-8"
            >
              <div>
                <div className="text-[36px] md:text-[42px] font-medium text-white tracking-[-0.02em]">
                  99<span className="text-[#e97714]">%</span>
                </div>
                <div className="text-[13px] text-[#555]">Clean Traffic Rate</div>
              </div>
              <div className="w-px bg-[#222]" />
              <div>
                <div className="text-[36px] md:text-[42px] font-medium text-white tracking-[-0.02em]">
                  &lt;1<span className="text-[#e97714]">%</span>
                </div>
                <div className="text-[13px] text-[#555]">Chargeback Rate</div>
              </div>
            </motion.div>

            {/* Trust badge */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-[#111] border border-[#222] rounded-full px-4 py-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <path d="M9 12l2 2 4-4"/>
              </svg>
              <span className="text-[12px] text-[#888]">Fraud-protected network</span>
            </motion.div>
          </div>

          {/* Right - Protection methods list */}
          <div className="space-y-6">
            {protectionMethods.map((method, idx) => (
              <ProtectionItem
                key={idx}
                icon={method.icon}
                title={method.title}
                description={method.description}
                delay={0.1 + idx * 0.08}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
