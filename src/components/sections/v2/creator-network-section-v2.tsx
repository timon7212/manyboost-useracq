"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function CreatorNetworkSectionV2() {
  return (
    <section className="relative py-16 md:py-24 px-4 bg-gradient-to-b from-[#050505] to-black overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] opacity-40"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(233, 119, 20, 0.1) 0%, transparent 60%)',
          }}
        />
      </div>

      <div className="max-w-[1000px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left - Phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative flex justify-center lg:justify-end order-2 lg:order-1"
          >
            <div className="relative w-[320px] md:w-[400px] lg:w-[450px]">
              {/* Glow behind phone */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[650px] opacity-60"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(233, 119, 20, 0.15) 0%, transparent 60%)',
                }}
              />
              
              {/* Phone image */}
              <Image
                src="/HeroPhone.png"
                alt="Creator App"
                width={450}
                height={900}
                className="relative z-10 drop-shadow-2xl w-full h-auto"
                style={{
                  filter: 'drop-shadow(0 30px 60px rgba(233, 119, 20, 0.2))',
                }}
              />
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-1 lg:order-2"
          >
            <span className="inline-block text-[11px] uppercase tracking-[0.15em] text-[#e97714] mb-4">
              Unique Advantage
            </span>
            <h2 className="text-[32px] md:text-[42px] lg:text-[48px] tracking-[-0.04em] leading-[1.1] font-medium mb-5">
              <span className="gradient-text">Creator Powered</span>
              <br />
              <span className="text-[#666]">Network</span>
            </h2>
            
            <p className="text-[15px] md:text-[16px] text-[#666] leading-[1.7] mb-8">
              130+ creators with 19.5M total audience. Direct access to traffic from content creators. 
              Real users who trust recommendations from their favorite creators.
              Higher engagement and retention compared to standard UA.
            </p>

            {/* Features list */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#e97714]/10 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e97714" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <span className="text-[14px] text-[#888]">Engaged audiences from verified creators</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#e97714]/10 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e97714" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <span className="text-[14px] text-[#888]">Higher D1/D7 retention rates</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#e97714]/10 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e97714" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <span className="text-[14px] text-[#888]">Trust-based user acquisition</span>
              </div>
            </div>

            {/* CTA */}
            <a 
              href="/creators-network"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#111] hover:bg-[#1a1a1a] border border-[#333] rounded-full text-[14px] font-medium text-white transition-colors"
            >
              Learn More About Creator Network
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
