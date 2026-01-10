"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
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

// Stats component
function StatCard({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const { count, ref } = useCounter(value, 1500);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="text-center"
    >
      <p className="text-[40px] md:text-[56px] font-medium tracking-[-0.03em] text-white leading-none">
        {count}{suffix}
      </p>
      <p className="text-[14px] text-[#666] mt-2 uppercase tracking-[0.1em]">{label}</p>
    </motion.div>
  );
}

// Feature card
function FeatureCard({ 
  icon, 
  title, 
  description, 
  delay,
  highlight = false 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  delay: number;
  highlight?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="rounded-[20px] p-[1px]"
      style={{
        background: highlight 
          ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #22c55e 100%)' 
          : 'linear-gradient(135deg, #1a1a1a 0%, #333 50%, #1a1a1a 100%)',
      }}
    >
      <div className={`
        rounded-[19px] p-6 md:p-8 h-full
        ${highlight ? 'bg-gradient-to-br from-[#0a1a0a] to-[#0a0a0a]' : 'bg-[#0a0a0a]'}
      `}>
        <div className={`
          w-14 h-14 rounded-[14px] flex items-center justify-center mb-5
          ${highlight ? 'bg-[#22c55e]/10 text-[#22c55e]' : 'bg-[#1a1a1a] text-[#666]'}
        `}>
          {icon}
        </div>
        <h3 className={`
          text-[22px] md:text-[26px] font-medium tracking-[-0.02em] mb-3
          ${highlight ? 'text-white' : 'text-[#ccc]'}
        `}>
          {title}
        </h3>
        <p className="text-[14px] md:text-[15px] text-[#666] leading-[1.6]">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

// Integration badge
function IntegrationBadge({ name, icon, delay }: { name: string; icon: React.ReactNode; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="rounded-[12px] p-[1px]"
      style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)' }}
    >
      <div className="bg-[#0a0a0a] rounded-[11px] px-5 py-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#1a1a1a] flex items-center justify-center text-[#666]">
          {icon}
        </div>
        <span className="text-[15px] text-[#999] font-medium">{name}</span>
      </div>
    </motion.div>
  );
}

export default function OfferwallPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-black overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative pt-20 md:pt-32 pb-16 md:pb-24 px-4 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 pointer-events-none">
            <div 
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] opacity-40"
              style={{ background: 'radial-gradient(ellipse at center top, rgba(34, 197, 94, 0.12) 0%, transparent 50%)' }}
            />
          </div>

          <div className="max-w-[840px] mx-auto text-center relative z-10">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-[#22c55e]/10 border border-[#22c55e]/20 rounded-full px-4 py-2 mb-6"
            >
              <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
              <span className="text-[13px] text-[#22c55e] font-medium">For Publishers</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-[36px] sm:text-[48px] md:text-[64px] tracking-[-0.05em] leading-[0.9] mb-6 font-medium"
            >
              <span className="text-white">Monetize with</span>
              <br />
              <span className="text-[#22c55e]">Premium Offerwalls</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[16px] md:text-[20px] text-[#666] max-w-[560px] mx-auto mb-10 tracking-[-0.02em] leading-[1.5]"
            >
              Turn your app&apos;s engaged users into revenue. High eCPM offers from top game studios, seamless SDK integration.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button className="px-8 py-4 bg-[#22c55e] hover:bg-[#16a34a] text-black font-medium rounded-full text-[16px] transition-colors duration-200">
                Start Monetizing
              </button>
              <button className="px-8 py-4 bg-transparent border border-[#333] hover:border-[#555] text-white font-medium rounded-full text-[16px] transition-colors duration-200">
                View Documentation
              </button>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-[840px] mx-auto">
            <div 
              className="rounded-[24px] p-[1px]"
              style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #333 50%, #1a1a1a 100%)' }}
            >
              <div className="bg-[#080808] rounded-[23px] py-10 md:py-14 px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
                  <StatCard value={45} suffix="$" label="Avg eCPM" delay={0.1} />
                  <StatCard value={98} suffix="%" label="Fill Rate" delay={0.2} />
                  <StatCard value={200} suffix="+" label="Advertisers" delay={0.3} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-[840px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 md:mb-16"
            >
              <h2 className="text-[36px] sm:text-[48px] md:text-[59px] tracking-[-0.05em] leading-[0.86] mb-4 font-medium">
                <span className="text-[#22c55e]">Simple</span>
                <span className="text-[#9A9A9A] font-light"> Integration</span>
              </h2>
              <p className="text-[16px] md:text-[18px] text-[#666] max-w-[480px] mx-auto">
                Get up and running in minutes. Our SDK handles everything.
              </p>
            </motion.div>

            {/* Flow */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Step 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#22c55e]/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-[24px] font-medium text-[#22c55e]">1</span>
                </div>
                <h3 className="text-[20px] font-medium text-white mb-2">Add SDK</h3>
                <p className="text-[14px] text-[#666]">Drop-in SDK for Unity, iOS, Android. 5 lines of code.</p>
              </motion.div>

              {/* Arrow */}
              <div className="hidden md:flex items-center justify-center">
                <svg width="60" height="24" viewBox="0 0 60 24" fill="none">
                  <path d="M0 12H50M50 12L40 4M50 12L40 20" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* Step 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#22c55e]/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-[24px] font-medium text-[#22c55e]">2</span>
                </div>
                <h3 className="text-[20px] font-medium text-white mb-2">Show Offerwall</h3>
                <p className="text-[14px] text-[#666]">Users see premium offers from top game studios.</p>
              </motion.div>

              {/* Arrow */}
              <div className="hidden md:flex items-center justify-center">
                <svg width="60" height="24" viewBox="0 0 60 24" fill="none">
                  <path d="M0 12H50M50 12L40 4M50 12L40 20" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* Step 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#22c55e]/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-[24px] font-medium text-[#22c55e]">3</span>
                </div>
                <h3 className="text-[20px] font-medium text-white mb-2">Get Paid</h3>
                <p className="text-[14px] text-[#666]">Weekly payouts. NET-7 terms. No minimums.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why ManyBoost */}
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-[840px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 md:mb-16"
            >
              <h2 className="text-[36px] sm:text-[48px] md:text-[59px] tracking-[-0.05em] leading-[0.86] mb-4 font-medium">
                <span className="text-[#9A9A9A] font-light">Why </span>
                <span className="text-[#22c55e]">ManyBoost</span>
              </h2>
              <p className="text-[16px] md:text-[18px] text-[#666] max-w-[480px] mx-auto">
                Not just another offerwall. Premium offers, better UX, higher revenue.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FeatureCard
                icon={
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M14 4V24M4 14H24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="14" cy="14" r="8" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                }
                title="Higher eCPM"
                description="Premium advertisers pay premium rates. Our creator-driven model means higher engagement and better payouts for you."
                delay={0.1}
                highlight
              />
              <FeatureCard
                icon={
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <rect x="4" y="6" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M4 10H24" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="8" cy="16" r="2" fill="currentColor"/>
                  </svg>
                }
                title="Real-time Dashboard"
                description="Track impressions, completions, and revenue in real-time. Detailed analytics by country, device, and offer."
                delay={0.15}
              />
              <FeatureCard
                icon={
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M14 4L4 9V14C4 20 8 25 14 26C20 25 24 20 24 14V9L14 4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                    <path d="M10 14L13 17L18 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                }
                title="Quality Offers Only"
                description="Curated offers from verified game studios. No scams, no low-quality apps. Your users deserve the best."
                delay={0.2}
              />
              <FeatureCard
                icon={
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M14 8V14L18 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                }
                title="Fast Payouts"
                description="NET-7 payment terms. Get paid every week via wire, PayPal, or crypto. No minimum threshold."
                delay={0.25}
              />
            </div>
          </div>
        </section>

        {/* Integrations */}
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-[840px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              <h2 className="text-[28px] md:text-[36px] tracking-[-0.03em] mb-3 font-medium text-white">
                Works with your stack
              </h2>
              <p className="text-[15px] text-[#666]">Native SDKs for all major platforms</p>
            </motion.div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <IntegrationBadge 
                name="Unity" 
                delay={0.1}
                icon={
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                    <path d="M15.75 9L12.375 14.625L11.25 11.25L14.625 9L11.25 6.75L12.375 3.375L15.75 9ZM10.125 11.25L11.25 14.625H8.25L6 11.25H9L10.125 11.25ZM10.125 6.75H6L8.25 3.375H11.25L10.125 6.75ZM2.25 9L5.625 3.375L6.75 6.75L3.375 9L6.75 11.25L5.625 14.625L2.25 9Z"/>
                  </svg>
                }
              />
              <IntegrationBadge 
                name="iOS Swift" 
                delay={0.15}
                icon={
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                    <path d="M14.94 13.5c-.54 1.17-1.17 2.25-2.16 2.25-.99 0-1.26-.63-2.34-.63-1.08 0-1.44.63-2.34.63-1.08 0-1.89-1.17-2.43-2.34C4.32 10.5 4.05 7.47 5.4 5.67c.99-1.35 2.43-2.16 3.78-2.16 1.08 0 1.89.72 2.79.72.9 0 1.53-.72 2.88-.72 1.17 0 2.43.63 3.33 1.8-2.88 1.62-2.43 5.76.54 6.93-.45 1.08-.99 2.07-1.78 3.06z"/>
                  </svg>
                }
              />
              <IntegrationBadge 
                name="Android" 
                delay={0.2}
                icon={
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                    <path d="M3 6v7.5c0 .825.675 1.5 1.5 1.5h.75v2.25c0 .45.3.75.75.75s.75-.3.75-.75V15h4.5v2.25c0 .45.3.75.75.75s.75-.3.75-.75V15h.75c.825 0 1.5-.675 1.5-1.5V6H3zm-1.5.75c0-.45-.3-.75-.75-.75s-.75.3-.75.75v4.5c0 .45.3.75.75.75s.75-.3.75-.75v-4.5zm15 0c0-.45-.3-.75-.75-.75s-.75.3-.75.75v4.5c0 .45.3.75.75.75s.75-.3.75-.75v-4.5zM11.25 1.5l.9-1.35c.075-.15 0-.3-.15-.375-.15-.075-.3 0-.375.15L10.65 1.5c-.6-.225-1.275-.375-1.95-.375s-1.35.15-1.95.375L5.775-.075c-.075-.15-.225-.225-.375-.15-.15.075-.225.225-.15.375L6.15 1.5C4.8 2.25 3.9 3.6 3.75 5.25h10.5c-.15-1.65-1.05-3-2.4-3.75zM6.75 3.75c-.3 0-.525-.225-.525-.525s.225-.525.525-.525.525.225.525.525-.225.525-.525.525zm4.5 0c-.3 0-.525-.225-.525-.525s.225-.525.525-.525.525.225.525.525-.225.525-.525.525z"/>
                  </svg>
                }
              />
              <IntegrationBadge 
                name="React Native" 
                delay={0.25}
                icon={
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                    <circle cx="9" cy="9" r="2"/>
                    <ellipse cx="9" cy="9" rx="7" ry="3" stroke="currentColor" strokeWidth="1" fill="none"/>
                    <ellipse cx="9" cy="9" rx="7" ry="3" stroke="currentColor" strokeWidth="1" fill="none" transform="rotate(60 9 9)"/>
                    <ellipse cx="9" cy="9" rx="7" ry="3" stroke="currentColor" strokeWidth="1" fill="none" transform="rotate(120 9 9)"/>
                  </svg>
                }
              />
              <IntegrationBadge 
                name="REST API" 
                delay={0.3}
                icon={
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 6L8 9L4 12"/>
                    <path d="M10 12H14"/>
                  </svg>
                }
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-[640px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-[24px] p-[1px]"
              style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #22c55e 100%)' }}
            >
              <div className="bg-[#0a1208] rounded-[23px] py-12 md:py-16 px-8 text-center">
                <h2 className="text-[28px] md:text-[40px] font-medium tracking-[-0.03em] text-white mb-4">
                  Ready to monetize?
                </h2>
                <p className="text-[15px] md:text-[17px] text-[#666] mb-8 max-w-[400px] mx-auto">
                  Join 500+ publishers already earning with ManyBoost offerwalls.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button className="px-8 py-4 bg-[#22c55e] hover:bg-[#16a34a] text-black font-medium rounded-full text-[16px] transition-colors duration-200 w-full sm:w-auto">
                    Get Started Free
                  </button>
                  <button className="px-8 py-4 bg-transparent border border-[#22c55e]/30 hover:border-[#22c55e]/50 text-[#22c55e] font-medium rounded-full text-[16px] transition-colors duration-200 w-full sm:w-auto">
                    Contact Sales
                  </button>
                </div>
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

