"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LeadModal } from "@/components/ui/lead-modal";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

// Animated counter hook
function useCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasStarted) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration, hasStarted]);

  return { count, ref };
}

// Hero Visual Component - Revenue Flow
function RevenueFlowVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative w-full max-w-[700px] mx-auto mt-12 md:mt-16"
    >
      <div className="flex items-center justify-center gap-6 md:gap-10">
        {/* Your App */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col items-center"
        >
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-[70px] h-[70px] md:w-[90px] md:h-[90px] rounded-[18px] bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#333] flex items-center justify-center shadow-xl"
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.5">
              <rect x="5" y="2" width="14" height="20" rx="2" />
              <line x1="12" y1="18" x2="12" y2="18.01" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </motion.div>
          <p className="text-[12px] text-[#666] mt-3 font-medium">Your App</p>
        </motion.div>

        {/* Arrow + Offerwall */}
        <div className="flex items-center gap-4 md:gap-6">
          <motion.svg 
            width="40" height="24" viewBox="0 0 40 24" fill="none"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <path d="M0 12H30M30 12L22 5M30 12L22 19" stroke="#333" strokeWidth="2" strokeLinecap="round"/>
          </motion.svg>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="relative"
          >
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] rounded-[22px] bg-gradient-to-br from-[#22c55e]/20 to-[#16a34a]/10 border border-[#22c55e]/30 flex items-center justify-center shadow-2xl shadow-[#22c55e]/10"
            >
              <div className="text-center">
                <p className="text-[22px] md:text-[26px] font-bold text-[#22c55e]">OW</p>
                <p className="text-[9px] text-[#666] uppercase tracking-wider">Offerwall</p>
              </div>
            </motion.div>
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-[22px] bg-[#22c55e]/5 blur-xl -z-10" />
          </motion.div>

          <motion.svg 
            width="40" height="24" viewBox="0 0 40 24" fill="none"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
          >
            <path d="M0 12H30M30 12L22 5M30 12L22 19" stroke="#22c55e" strokeWidth="2" strokeLinecap="round"/>
          </motion.svg>
        </div>

        {/* Revenue */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col items-center"
        >
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="w-[70px] h-[70px] md:w-[90px] md:h-[90px] rounded-full bg-gradient-to-br from-[#22c55e]/20 to-[#16a34a]/10 border border-[#22c55e]/40 flex items-center justify-center shadow-xl"
          >
            <span className="text-[28px] md:text-[32px]">💰</span>
          </motion.div>
          <p className="text-[12px] text-[#22c55e] mt-3 font-semibold">Revenue</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Integration Card Component
function IntegrationCard({ 
  icon, 
  title, 
  description, 
  features,
  delay,
  highlighted = false 
}: { 
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  delay: number;
  highlighted?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`
        rounded-[24px] p-[1px] h-full
        ${highlighted 
          ? 'bg-gradient-to-br from-[#22c55e] via-[#16a34a] to-[#22c55e]' 
          : 'bg-gradient-to-br from-[#222] via-[#333] to-[#222]'
        }
      `}
    >
      <div className={`
        rounded-[23px] p-6 md:p-8 h-full flex flex-col
        ${highlighted ? 'bg-gradient-to-br from-[#0a1a0f] to-[#050a05]' : 'bg-[#0a0a0a]'}
      `}>
        {highlighted && (
          <div className="inline-flex items-center gap-1.5 bg-[#22c55e]/10 border border-[#22c55e]/20 rounded-full px-3 py-1 mb-4 w-fit">
            <span className="text-[10px] text-[#22c55e] font-medium uppercase tracking-wider">Most Popular</span>
          </div>
        )}
        
        <div className={`
          w-14 h-14 rounded-[14px] flex items-center justify-center mb-5
          ${highlighted ? 'bg-[#22c55e]/15 text-[#22c55e]' : 'bg-[#1a1a1a] text-[#666]'}
        `}>
          {icon}
        </div>
        
        <h3 className="text-[22px] md:text-[26px] font-medium tracking-[-0.02em] text-white mb-2">
          {title}
        </h3>
        
        <p className="text-[14px] text-[#666] leading-[1.6] mb-6">
          {description}
        </p>
        
        <div className="mt-auto space-y-3">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={highlighted ? "#22c55e" : "#555"} strokeWidth="2">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <span className="text-[13px] text-[#888]">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// How It Works Step
function WorkflowStep({ 
  number, 
  title, 
  description, 
  delay 
}: { 
  number: string;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center text-center"
    >
      <div className="relative mb-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#22c55e]/20 to-[#22c55e]/5 flex items-center justify-center border border-[#22c55e]/20">
          <span className="text-[24px] font-bold text-[#22c55e]">{number}</span>
        </div>
      </div>
      <h3 className="text-[18px] md:text-[20px] font-medium text-white mb-2">{title}</h3>
      <p className="text-[13px] md:text-[14px] text-[#666] leading-[1.5] max-w-[200px]">{description}</p>
    </motion.div>
  );
}

// Benefit Card for Bento Grid
function BenefitCard({ 
  icon, 
  title, 
  description, 
  stat,
  statLabel,
  delay,
  className = ""
}: { 
  icon: React.ReactNode;
  title: string;
  description: string;
  stat?: string;
  statLabel?: string;
  delay: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`
        rounded-[20px] p-[1px] bg-gradient-to-br from-[#1a1a1a] via-[#252525] to-[#1a1a1a]
        ${className}
      `}
    >
      <div className="rounded-[19px] p-6 md:p-7 bg-[#0a0a0a] h-full flex flex-col">
        <div className="w-12 h-12 rounded-[12px] bg-[#22c55e]/10 flex items-center justify-center mb-4 text-[#22c55e]">
          {icon}
        </div>
        
        <h3 className="text-[18px] md:text-[20px] font-medium text-white mb-2">{title}</h3>
        <p className="text-[13px] text-[#666] leading-[1.6] mb-4">{description}</p>
        
        {stat && (
          <div className="mt-auto pt-4 border-t border-[#1a1a1a]">
            <p className="text-[28px] font-bold text-[#22c55e]">{stat}</p>
            <p className="text-[11px] text-[#555] uppercase tracking-wider">{statLabel}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function OfferwallPage() {
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  
  // Counter refs
  const ecpmRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const advertisersRef = useRef<HTMLDivElement>(null);
  const countriesRef = useRef<HTMLDivElement>(null);
  
  const ecpm = useCounter(45, 1500);
  const fill = useCounter(98, 1500);
  const advertisers = useCounter(200, 1500);
  const countries = useCounter(50, 1500);
  
  return (
    <>
      <Header />
      <LeadModal isOpen={leadModalOpen} onClose={() => setLeadModalOpen(false)} type="publisher" />
      <main className="min-h-screen bg-black overflow-x-hidden">
        
        {/* ===== HERO SECTION ===== */}
        <section className="relative pt-32 md:pt-40 pb-16 md:pb-20 px-4 overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 pointer-events-none">
            <div 
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[900px] opacity-40"
              style={{ background: 'radial-gradient(ellipse at center top, rgba(34, 197, 94, 0.15) 0%, transparent 55%)' }}
            />
          </div>

          <div className="max-w-[900px] mx-auto text-center relative z-10">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-[#22c55e]/10 border border-[#22c55e]/20 rounded-full px-4 py-2 mb-6"
            >
              <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
              <span className="text-[12px] text-[#22c55e] font-medium uppercase tracking-wider">For Publishers</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-[36px] sm:text-[50px] md:text-[66px] lg:text-[76px] tracking-[-0.04em] leading-[1] mb-6 font-medium"
            >
              <span className="text-white">Maximize Revenue</span>
              <br />
              <span className="text-white">with </span>
              <span className="text-[#22c55e]">Premium Offerwalls</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[16px] md:text-[19px] text-[#777] max-w-[600px] mx-auto mb-8 leading-[1.6]"
            >
              Turn every user into revenue. High eCPMs from premium game studios, 
              seamless integration, and weekly payouts.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex justify-center"
            >
              <motion.button 
                onClick={() => setLeadModalOpen(true)}
                className="px-8 py-4 bg-[#22c55e] hover:bg-[#16a34a] text-black font-semibold rounded-full text-[15px] transition-all duration-200 shadow-lg shadow-[#22c55e]/25"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Start Monetizing →
              </motion.button>
            </motion.div>

            {/* Trust points */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-6 mt-8 text-[12px] text-[#555]"
            >
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span>5-Minute Setup</span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span>NET-7 Payouts</span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span>No Minimum</span>
              </div>
            </motion.div>

            {/* Visual */}
            <RevenueFlowVisual />
          </div>
        </section>

        {/* ===== STATS BANNER ===== */}
        <section className="py-14 md:py-20 px-4 border-y border-[#1a1a1a] bg-[#050505]">
          <div className="max-w-[1000px] mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
              <motion.div
                ref={ecpm.ref}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-center"
              >
                <p className="text-[36px] md:text-[48px] font-bold text-white leading-none">
                  ${ecpm.count}
                </p>
                <p className="text-[12px] text-[#666] mt-2 uppercase tracking-wider">Avg eCPM</p>
              </motion.div>
              
              <motion.div
                ref={fill.ref}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-center"
              >
                <p className="text-[36px] md:text-[48px] font-bold text-white leading-none">
                  {fill.count}%
                </p>
                <p className="text-[12px] text-[#666] mt-2 uppercase tracking-wider">Fill Rate</p>
              </motion.div>
              
              <motion.div
                ref={advertisers.ref}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center"
              >
                <p className="text-[36px] md:text-[48px] font-bold text-white leading-none">
                  {advertisers.count}+
                </p>
                <p className="text-[12px] text-[#666] mt-2 uppercase tracking-wider">Advertisers</p>
              </motion.div>
              
              <motion.div
                ref={countries.ref}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="text-center"
              >
                <p className="text-[36px] md:text-[48px] font-bold text-white leading-none">
                  {countries.count}+
                </p>
                <p className="text-[12px] text-[#666] mt-2 uppercase tracking-wider">Countries</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== INTEGRATION OPTIONS ===== */}
        <section className="py-20 md:py-28 px-4">
          <div className="max-w-[1100px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <p className="text-[12px] text-[#22c55e] font-medium uppercase tracking-wider mb-3">Integration Options</p>
              <h2 className="text-[32px] sm:text-[42px] md:text-[52px] tracking-[-0.04em] leading-[1.1] mb-4 font-medium">
                <span className="text-white">Choose Your </span>
                <span className="text-[#22c55e]">Integration</span>
              </h2>
              <p className="text-[15px] md:text-[17px] text-[#666] max-w-[500px] mx-auto">
                Flexible options to fit your tech stack. Get up and running in minutes.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <IntegrationCard
                icon={
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18M9 21V9" />
                  </svg>
                }
                title="Web Offerwall"
                description="Embed our offerwall directly into your website or web app with a simple iframe or JavaScript snippet."
                features={[
                  "One-line embed code",
                  "Fully customizable design",
                  "Real-time callbacks",
                  "Mobile responsive"
                ]}
                delay={0.1}
              />
              
              <IntegrationCard
                icon={
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="5" y="2" width="14" height="20" rx="2" />
                    <path d="M12 18h.01" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                }
                title="Native SDK"
                description="Lightweight SDKs for Unity, iOS, and Android. Native performance with full platform integration."
                features={[
                  "Unity, iOS, Android",
                  "< 100KB SDK size",
                  "Native UI components",
                  "Offline caching"
                ]}
                delay={0.15}
                highlighted
              />
              
              <IntegrationCard
                icon={
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 6l4 4-4 4" />
                    <path d="M12 14h8" />
                  </svg>
                }
                title="REST API"
                description="Build your own offerwall experience with our comprehensive API. Full control, maximum flexibility."
                features={[
                  "RESTful endpoints",
                  "S2S postbacks",
                  "Webhook events",
                  "Full documentation"
                ]}
                delay={0.2}
              />
            </div>
          </div>
        </section>

        {/* ===== HOW IT WORKS ===== */}
        <section className="py-20 md:py-28 px-4 bg-[#050505]">
          <div className="max-w-[1100px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="text-[12px] text-[#22c55e] font-medium uppercase tracking-wider mb-3">How It Works</p>
              <h2 className="text-[32px] sm:text-[42px] md:text-[52px] tracking-[-0.04em] leading-[1.1] mb-4 font-medium">
                <span className="text-white">Start Earning in </span>
                <span className="text-[#22c55e]">5 Steps</span>
              </h2>
              <p className="text-[15px] md:text-[17px] text-[#666] max-w-[480px] mx-auto">
                Simple integration process. Most publishers go live within 24 hours.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4">
              <WorkflowStep
                number="01"
                title="Sign Up"
                description="Create your free account in under a minute."
                delay={0.1}
              />
              <WorkflowStep
                number="02"
                title="Add Your App"
                description="Register your app and get your unique publisher ID."
                delay={0.15}
              />
              <WorkflowStep
                number="03"
                title="Integrate"
                description="Add our SDK or embed code to your app."
                delay={0.2}
              />
              <WorkflowStep
                number="04"
                title="Go Live"
                description="Users start seeing premium offers instantly."
                delay={0.25}
              />
              <WorkflowStep
                number="05"
                title="Get Paid"
                description="Weekly payouts via wire, PayPal, or crypto."
                delay={0.3}
              />
            </div>
          </div>
        </section>

        {/* ===== WHY MANYBOOST - BENTO GRID ===== */}
        <section className="py-20 md:py-28 px-4">
          <div className="max-w-[1100px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <p className="text-[12px] text-[#22c55e] font-medium uppercase tracking-wider mb-3">Why ManyBoost</p>
              <h2 className="text-[32px] sm:text-[42px] md:text-[52px] tracking-[-0.04em] leading-[1.1] mb-4 font-medium">
                <span className="text-white">Built for </span>
                <span className="text-[#22c55e]">Publishers</span>
              </h2>
              <p className="text-[15px] md:text-[17px] text-[#666] max-w-[500px] mx-auto">
                Not just another offerwall. Premium offers, better UX, higher revenue.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <BenefitCard
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                  </svg>
                }
                title="Highest eCPMs"
                description="Premium advertisers pay premium rates. Our creator-driven model means higher engagement and better payouts."
                stat="$45+"
                statLabel="Average eCPM"
                delay={0.1}
              />
              
              <BenefitCard
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                }
                title="Fast Payouts"
                description="NET-7 payment terms. Get paid every week via wire transfer, PayPal, or cryptocurrency."
                stat="NET-7"
                statLabel="Payment Terms"
                delay={0.15}
              />
              
              <BenefitCard
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                }
                title="Quality Offers"
                description="Curated offers from verified game studios only. No scams, no low-quality apps. Your users deserve the best."
                stat="200+"
                statLabel="Premium Advertisers"
                delay={0.2}
              />
              
              <BenefitCard
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18M9 21V9" />
                  </svg>
                }
                title="Real-time Dashboard"
                description="Track impressions, completions, and revenue in real-time. Detailed analytics by country, device, and offer."
                delay={0.25}
              />
              
              <BenefitCard
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                  </svg>
                }
                title="Dedicated Support"
                description="Personal account manager for every publisher. Fast response times and proactive optimization advice."
                delay={0.3}
              />
              
              <BenefitCard
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <path d="M22 6l-10 7L2 6" />
                  </svg>
                }
                title="Full Transparency"
                description="See exactly which offers are running, conversion rates, and earnings. No hidden fees or surprises."
                delay={0.35}
              />
            </div>
          </div>
        </section>

        {/* ===== PLATFORMS ===== */}
        <section className="py-16 md:py-20 px-4 border-y border-[#1a1a1a] bg-[#050505]">
          <div className="max-w-[900px] mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <p className="text-[14px] text-[#666] mb-6">Works with your stack</p>
              <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
                {['Unity', 'iOS', 'Android', 'React Native', 'Flutter', 'Web'].map((platform, idx) => (
                  <motion.div
                    key={platform}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="px-5 py-2.5 bg-[#111] border border-[#222] rounded-full"
                  >
                    <span className="text-[13px] text-[#888] font-medium">{platform}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== CTA SECTION ===== */}
        <section className="py-20 md:py-28 px-4">
          <div className="max-w-[700px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-[28px] p-[1px]"
              style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #22c55e 100%)' }}
            >
              <div className="bg-gradient-to-br from-[#0a1a0f] to-[#050a05] rounded-[27px] py-14 md:py-20 px-8 text-center">
                <motion.div
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-16 h-16 rounded-full bg-[#22c55e]/20 flex items-center justify-center mx-auto mb-6"
                >
                  <span className="text-[28px]">🚀</span>
                </motion.div>
                
                <h2 className="text-[28px] md:text-[42px] font-medium tracking-[-0.03em] text-white mb-4">
                  Ready to Monetize?
                </h2>
                <p className="text-[15px] md:text-[17px] text-[#777] mb-8 max-w-[420px] mx-auto leading-[1.6]">
                  Join hundreds of publishers already earning with ManyBoost offerwalls. Start today — it&apos;s free.
                </p>
                
                <motion.button 
                  onClick={() => setLeadModalOpen(true)}
                  className="px-10 py-5 bg-[#22c55e] hover:bg-[#16a34a] text-black font-semibold rounded-full text-[16px] transition-all duration-200 shadow-lg shadow-[#22c55e]/30"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started Free →
                </motion.button>
                
                <p className="text-[12px] text-[#444] mt-6">
                  No credit card required • 5-minute setup • NET-7 payouts
                </p>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
