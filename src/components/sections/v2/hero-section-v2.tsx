"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { LeadModal } from "@/components/ui/lead-modal";
import Image from "next/image";

// Firewall Shield Component - cleaner version
function FirewallShield({ size = "normal" }: { size?: "normal" | "small" }) {
  const dimensions = size === "small" ? "w-[56px] h-[56px]" : "w-[72px] h-[72px] md:w-[80px] md:h-[80px]";
  const iconSize = size === "small" ? 26 : 34;
  
  return (
    <motion.div
      className="relative flex flex-col items-center"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, delay: 0.7 }}
    >
      {/* Pulse rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#e97714]/20"
          initial={{ width: size === "small" ? 46 : 64, height: size === "small" ? 46 : 64, opacity: 0.5 }}
          animate={{ 
            width: [size === "small" ? 46 : 64, size === "small" ? 90 : 120], 
            height: [size === "small" ? 46 : 64, size === "small" ? 90 : 120], 
            opacity: [0.5, 0] 
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.6,
            ease: "easeOut",
          }}
        />
      ))}
      
      {/* Shield icon */}
      <div className={`${dimensions} rounded-full bg-gradient-to-br from-[#e97714] to-[#c96510] flex items-center justify-center shadow-lg shadow-[#e97714]/25 relative`}>
        <svg 
          width={iconSize} 
          height={iconSize} 
          viewBox="0 0 24 24" 
          fill="none" 
          className="text-black"
        >
          <path 
            d="M12 2L3 6V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V6L12 2Z" 
            stroke="currentColor" 
            strokeWidth="2" 
            fill="currentColor"
            fillOpacity="0.2"
          />
          <path 
            d="M9 12L11 14L15 10" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
        
        {/* Blocked fraud indicator */}
        <motion.div
          className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center shadow-sm"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span className="text-[9px] text-white font-bold">✕</span>
        </motion.div>
      </div>
      
      {/* Label - closer to icon */}
      <p className="text-[11px] text-[#e97714] font-medium mt-2">Anti-Fraud</p>
    </motion.div>
  );
}

// Desktop Visual Flow - cleaner
function DesktopTrafficFlow() {
  return (
    <div className="hidden md:flex items-center justify-center gap-10 w-full max-w-[900px] mx-auto px-8">
      {/* Left side - Publishers count */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex flex-col items-center min-w-[130px]"
      >
        <motion.div
          className="text-center"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <p className="text-[48px] lg:text-[56px] font-bold text-white leading-none tracking-tight">
            53<span className="text-[#e97714]">+</span>
          </p>
          <p className="text-[13px] text-[#666] mt-1">Publishers</p>
        </motion.div>
      </motion.div>

      {/* Center - Animated flow lines with Firewall */}
      <div className="relative h-[130px] w-[280px] flex items-center justify-center">
        {/* SVG Flow lines */}
        <svg 
          className="absolute inset-0 w-full h-full" 
          viewBox="0 0 280 110"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="lineGradIn" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#666" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#e97714" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="lineGradOut" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e97714" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0.4" />
            </linearGradient>
            <filter id="greenGlow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Left line - incoming (grey/orange) */}
          <line x1="15" y1="55" x2="115" y2="55" stroke="url(#lineGradIn)" strokeWidth="2" />
          
          {/* Right line - outgoing (orange/green) */}
          <line x1="165" y1="55" x2="265" y2="55" stroke="url(#lineGradOut)" strokeWidth="2" />

          {/* Grey dots - from Publishers to Anti-Fraud */}
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={`grey-${i}`}
              r="5"
              fill="#888"
              cy={55}
              animate={{ 
                cx: [15, 65, 115],
                opacity: [0.2, 0.8, 0.2]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                delay: i * 0.7,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Green dots - from Anti-Fraud to Games (clean traffic) */}
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={`green-${i}`}
              r="5"
              fill="#22c55e"
              filter="url(#greenGlow)"
              cy={55}
              animate={{ 
                cx: [165, 215, 265],
                opacity: [0.3, 0.9, 0.3]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                delay: i * 0.7,
                ease: "easeInOut"
              }}
            />
          ))}
        </svg>

        {/* Firewall Shield */}
        <FirewallShield />
      </div>

      {/* Right side - Games */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex flex-col items-center min-w-[180px]"
      >
        <div className="flex gap-2">
          {['/HeroApps.png', '/HeroApps1.png', '/HeroApps2.png'].map((src, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + idx * 0.1 }}
            >
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: idx * 0.2 }}
              >
                <Image
                  src={src}
                  alt="Game"
                  width={68}
                  height={68}
                  className="rounded-[14px] shadow-lg"
                  style={{ 
                    width: idx === 1 ? '72px' : '60px', 
                    height: idx === 1 ? '72px' : '60px',
                    filter: idx === 1 ? 'none' : 'brightness(0.85)',
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
        <div className="mt-3 text-center">
          <p className="text-[12px] text-[#22c55e] font-semibold">Your Games</p>
        </div>
      </motion.div>
    </div>
  );
}

// Mobile Visual Flow - cleaner vertical
function MobileTrafficFlow() {
  return (
    <div className="flex md:hidden flex-col items-center gap-3 w-full max-w-[300px] mx-auto">
      {/* Publishers */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-center"
      >
        <p className="text-[38px] font-bold text-white leading-none tracking-tight">
          53<span className="text-[#e97714]">+</span>
        </p>
        <p className="text-[12px] text-[#666] mt-1">Publishers</p>
      </motion.div>

      {/* Arrow */}
      <motion.div
        animate={{ y: [0, 3, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-[#666]"
      >
        <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
          <path d="M8 0V15M8 15L2 9M8 15L14 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>

      {/* Firewall */}
      <FirewallShield size="small" />

      {/* Arrow */}
      <motion.div
        animate={{ y: [0, 3, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
        className="text-[#22c55e]"
      >
        <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
          <path d="M8 0V15M8 15L2 9M8 15L14 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>

      {/* Games */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="flex flex-col items-center"
      >
        <div className="flex gap-2">
          {['/HeroApps.png', '/HeroApps1.png', '/HeroApps2.png'].map((src, idx) => (
            <motion.div
              key={idx}
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: idx * 0.15 }}
            >
              <Image
                src={src}
                alt="Game"
                width={52}
                height={52}
                className="rounded-[10px] shadow-lg"
                style={{ 
                  width: idx === 1 ? '56px' : '48px', 
                  height: idx === 1 ? '56px' : '48px',
                  filter: idx === 1 ? 'none' : 'brightness(0.85)',
                }}
              />
            </motion.div>
          ))}
        </div>
        <p className="text-[11px] text-[#22c55e] font-semibold mt-2">Your Games</p>
      </motion.div>
    </div>
  );
}

// Visual flow wrapper
function TrafficFlowVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative w-full mb-6"
    >
      <DesktopTrafficFlow />
      <MobileTrafficFlow />
    </motion.div>
  );
}

// CTA Button
function GlowButton({ 
  children, 
  onClick, 
  variant = 'primary' 
}: { 
  children: React.ReactNode; 
  onClick?: () => void; 
  variant?: 'primary' | 'secondary' 
}) {
  if (variant === 'primary') {
    return (
      <motion.button
        onClick={onClick}
        className="relative group px-8 py-4 rounded-full font-semibold text-[15px] overflow-hidden"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-[#e97714] via-[#f59e0b] to-[#e97714]"
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          style={{ backgroundSize: '200% 100%' }}
        />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </div>
        <span className="relative z-10 text-black">{children}</span>
      </motion.button>
    );
  }
  
  return (
    <motion.a
      href="mailto:busdev@manyboost.io"
      className="relative group px-8 py-4 rounded-full font-medium text-[15px] overflow-hidden border border-[#333] bg-[#0a0a0a]"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="relative z-10 text-white group-hover:text-[#e97714] transition-colors">{children}</span>
    </motion.a>
  );
}

export function HeroSectionV2() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-32 md:pt-36 lg:pt-40 pb-16 overflow-hidden bg-black">
        {/* Background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Image
            src="/HeroBackgroundEllipse.png"
            alt=""
            width={1200}
            height={800}
            className="opacity-50 object-cover"
            style={{ maxWidth: '100%', height: 'auto' }}
            priority
          />
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[800px] opacity-25"
            style={{ background: 'radial-gradient(ellipse at center top, rgba(233, 119, 20, 0.15) 0%, transparent 60%)' }}
          />
        </div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-[#e97714]/10 border border-[#e97714]/20 rounded-full px-4 py-2 mb-5 backdrop-blur-sm"
        >
          <span className="text-[11px] md:text-[12px] text-[#e97714] font-medium uppercase tracking-wider">
            Offerwall Network
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-[34px] sm:text-[44px] md:text-[60px] lg:text-[72px] text-center tracking-[-0.04em] leading-[1.05] max-w-[850px] mb-4 font-medium relative z-10"
        >
          <span className="text-white">Scale Your </span>
          <span className="text-[#e97714]">Mobile Game</span>
          <br />
          <span className="text-white">With Quality Users</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[14px] md:text-[17px] lg:text-[19px] text-[#777] text-center leading-[1.6] max-w-[550px] mb-7 px-4 relative z-10"
        >
          Get real installs from 53 verified offerwall publishers with 2.6M MAU.
          <br className="hidden sm:block" />
          Pay only for results — CPI, CPE, or CPA.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center mb-7 relative z-10 w-full px-4 sm:px-0"
        >
          <GlowButton onClick={() => setModalOpen(true)} variant="primary">
            Launch Campaign →
          </GlowButton>
        </motion.div>

        {/* Trust points */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-5 md:gap-8 mb-10 text-[11px] md:text-[12px] text-[#555] relative z-10"
        >
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <span>MMP Integration</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <span>Fraud Protection</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <span>48h Launch</span>
          </div>
        </motion.div>

        {/* Visual */}
        <TrafficFlowVisual />
      </section>

      <LeadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} type="advertiser" />
    </>
  );
}
