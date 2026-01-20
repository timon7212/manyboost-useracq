"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useState } from "react";
import Image from "next/image";
import { LeadModal } from "@/components/ui/lead-modal";

// Real creators data
const CREATORS = {
  zeynap: { avatar: "/realcreator1_zeynapma.jpg", name: "@zeynap.ma", followers: "123K" },
  tonali: { avatar: "/realcreator2_tonalisarkar.jpg", name: "@tonali_sarkar", followers: "322K" },
  sara: { avatar: "/realcreator3_drsarabendida.jpg", name: "@dr.sarabendida", followers: "705K" },
  hina: { avatar: "/realcreator4_hinaashh.jpg", name: "@hinaashh", followers: "268K" },
  aynees: { avatar: "/realcreator5_ayneesworld.jpg", name: "@aynees_world", followers: "49K" },
  greeneyed: { avatar: "/realcreator6_greeneyedgurl.jpg", name: "@greeneyed.gurl", followers: "183K" },
};

// Placeholder for screenshots
function ImagePlaceholder({ label, aspect = "video" }: { label: string; aspect?: "video" | "phone" }) {
  return (
    <div className={`${aspect === "phone" ? "aspect-[9/16]" : "aspect-video"} rounded-[16px] bg-[#111] border-2 border-dashed border-[#333] flex items-center justify-center`}>
      <div className="text-center px-4">
        <div className="text-[28px] mb-2">📸</div>
        <p className="text-[13px] text-[#666]">{label}</p>
      </div>
    </div>
  );
}

// Phone mockup
function PhoneMockup({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="rounded-[28px] p-[3px]" style={{ background: 'linear-gradient(180deg, #333 0%, #1a1a1a 100%)' }}>
        <div className="bg-black rounded-[25px] p-2">
          <div className="w-20 h-5 bg-black rounded-full mx-auto mb-2" />
          <div className="rounded-[18px] overflow-hidden bg-[#0a0a0a]">{children}</div>
        </div>
      </div>
    </div>
  );
}

// Earnings calculator with visual
function EarningsCalculator() {
  const [followers, setFollowers] = useState(50000);
  
  const clickRate = 0.05;
  const installRate = 0.20;
  const payoutPerInstall = 1.5;
  
  const clicks = Math.floor(followers * clickRate);
  const installs = Math.floor(clicks * installRate);
  const earningsPerPost = installs * payoutPerInstall;

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
    return num.toString();
  };

  return (
    <div className="bg-[#0a0a0a] rounded-[20px] p-6 md:p-8">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[15px] text-[#666]">Your followers</span>
        <span className="text-[24px] font-medium text-white">{formatNumber(followers)}</span>
      </div>
      <input
        type="range"
        min="10000"
        max="500000"
        step="5000"
        value={followers}
        onChange={(e) => setFollowers(Number(e.target.value))}
        className="w-full h-2 bg-[#1a1a1a] rounded-full appearance-none cursor-pointer mb-6
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-6
          [&::-webkit-slider-thumb]:h-6
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-[#e97714]
          [&::-webkit-slider-thumb]:cursor-pointer"
      />
      
      {/* Visual funnel */}
      <div className="flex items-center justify-between gap-2 mb-6">
        <div className="flex-1 text-center">
          <div className="w-12 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center mx-auto mb-2">
            <span className="text-[18px]">👀</span>
          </div>
          <p className="text-[20px] font-medium text-white">{formatNumber(followers)}</p>
          <p className="text-[11px] text-[#666]">see your post</p>
        </div>
        <div className="text-[#333]">→</div>
        <div className="flex-1 text-center">
          <div className="w-12 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center mx-auto mb-2">
            <span className="text-[18px]">👆</span>
          </div>
          <p className="text-[20px] font-medium text-white">{formatNumber(clicks)}</p>
          <p className="text-[11px] text-[#666]">click link</p>
        </div>
        <div className="text-[#333]">→</div>
        <div className="flex-1 text-center">
          <div className="w-12 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center mx-auto mb-2">
            <span className="text-[18px]">📲</span>
          </div>
          <p className="text-[20px] font-medium text-white">{installs}</p>
          <p className="text-[11px] text-[#666]">install game</p>
        </div>
        <div className="text-[#333]">=</div>
        <div className="flex-1 text-center">
          <div className="w-12 h-12 rounded-full bg-[#e97714]/20 flex items-center justify-center mx-auto mb-2">
            <span className="text-[18px]">💰</span>
          </div>
          <p className="text-[24px] font-medium text-[#e97714]">${earningsPerPost}</p>
          <p className="text-[11px] text-[#666]">you earn</p>
        </div>
      </div>
      
      <div className="bg-[#111] rounded-[12px] p-4 text-center">
        <p className="text-[13px] text-[#666] mb-1">Post 3x per week =</p>
        <p className="text-[32px] font-medium text-[#22c55e]">${(earningsPerPost * 12).toLocaleString()}/month</p>
      </div>
    </div>
  );
}

// FAQ Item
function FAQItem({ question, answer, delay }: { question: string; answer: string; delay: number }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="border-b border-[#1a1a1a]"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left"
      >
        <span className="text-[16px] md:text-[18px] text-white font-medium pr-4">{question}</span>
        <span className={`text-[#e97714] text-[24px] transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}>+</span>
      </button>
      {isOpen && (
        <div className="pb-5">
          <p className="text-[15px] text-[#666] leading-[1.7]">{answer}</p>
        </div>
      )}
    </motion.div>
  );
}

export default function CreatorsPage() {
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  
  return (
    <>
      <Header />
      <LeadModal isOpen={leadModalOpen} onClose={() => setLeadModalOpen(false)} type="creator" />
      <main className="min-h-screen bg-black overflow-x-hidden">
        
        {/* ============================================ */}
        {/* HERO: Direct value proposition */}
        {/* ============================================ */}
        <section className="relative min-h-screen flex items-center px-4 pt-20 md:pt-16 overflow-hidden bg-black">
          {/* Animated 3D gradient background */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Blob 1 */}
            <motion.div
              className="absolute w-[600px] h-[600px] rounded-full opacity-30 blur-[120px]"
              style={{
                background: 'radial-gradient(circle, #e97714 0%, #ff6b35 50%, transparent 70%)',
                top: '-20%',
                right: '-10%',
              }}
              animate={{
                x: [0, 50, -30, 0],
                y: [0, -40, 20, 0],
                scale: [1, 1.2, 0.9, 1],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {/* Blob 2 */}
            <motion.div
              className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-[100px]"
              style={{
                background: 'radial-gradient(circle, #a855f7 0%, #6366f1 50%, transparent 70%)',
                bottom: '-30%',
                left: '-15%',
              }}
              animate={{
                x: [0, -40, 30, 0],
                y: [0, 30, -40, 0],
                scale: [1, 0.9, 1.1, 1],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {/* Blob 3 */}
            <motion.div
              className="absolute w-[400px] h-[400px] rounded-full opacity-15 blur-[80px]"
              style={{
                background: 'radial-gradient(circle, #22c55e 0%, #14b8a6 50%, transparent 70%)',
                top: '40%',
                left: '30%',
              }}
              animate={{
                x: [0, 60, -20, 0],
                y: [0, -50, 40, 0],
                scale: [1, 1.15, 0.85, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {/* Noise overlay for texture */}
            <div 
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="max-w-[1000px] mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left: Copy */}
              <div className="text-center lg:text-left">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="text-[32px] sm:text-[40px] md:text-[48px] tracking-[-0.04em] leading-[1.05] mb-5 font-medium"
                >
                  <span className="text-white">Share a games link.</span>
                  <br />
                  <span className="text-white">Earn up to </span>
                  <span className="text-[#e97714]">$20,000</span>
                  <span className="text-[#9A9A9A] font-light">/mo.</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-[16px] md:text-[17px] text-[#666] mb-6 max-w-[420px] mx-auto lg:mx-0"
                >
                  Promote games your fans will love. Get paid for every install. No brand deals, no waiting.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4"
                >
                  <button 
                    onClick={() => setLeadModalOpen(true)}
                    className="px-7 py-3.5 bg-[#e97714] hover:bg-[#d16a10] text-black font-semibold rounded-full text-[16px] transition-colors duration-200 shadow-lg shadow-[#e97714]/20"
                  >
                    Start earning →
                  </button>
                  <div className="flex items-center gap-2 py-2">
                    <div className="flex -space-x-2">
                      <Image src={CREATORS.sara.avatar} alt={CREATORS.sara.name} width={26} height={26} className="rounded-full border-2 border-black object-cover" />
                      <Image src={CREATORS.tonali.avatar} alt={CREATORS.tonali.name} width={26} height={26} className="rounded-full border-2 border-black object-cover" />
                      <Image src={CREATORS.hina.avatar} alt={CREATORS.hina.name} width={26} height={26} className="rounded-full border-2 border-black object-cover" />
                    </div>
                    <span className="text-[12px] text-[#666]">130+ creators • 19.5M audience</span>
                  </div>
                </motion.div>
              </div>

              {/* Right: Hero image */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                <div className="relative rounded-[24px] overflow-hidden">
                  <Image
                    src="/CreatorsPageHero.jpg"
                    alt="Creator earning with ManyBoost"
                    width={500}
                    height={600}
                    className="w-full h-auto rounded-[24px]"
                    priority
                  />
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION: How it works - 4 visual steps */}
        {/* ============================================ */}
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-[1000px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <h2 className="text-[32px] md:text-[48px] tracking-[-0.03em] mb-3 font-medium text-white">
                How it works
              </h2>
              <p className="text-[16px] text-[#666]">4 simple steps to start earning</p>
            </motion.div>

            {/* Step 1: Pick a game */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-20">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-2 lg:order-1"
              >
                <Image
                  src="/CreatorsStep1.jpg"
                  alt="Game catalog dashboard"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-[16px]"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-1 lg:order-2"
              >
                <div className="inline-flex items-center gap-2 bg-[#e97714]/10 rounded-full px-3 py-1 mb-4">
                  <span className="text-[14px] font-bold text-[#e97714]">1</span>
                  <span className="text-[13px] text-[#e97714]">PICK A GAME</span>
                </div>
                <h3 className="text-[26px] md:text-[32px] font-medium text-white mb-4 tracking-[-0.02em]">
                  Choose from 50+ games
                </h3>
                <p className="text-[15px] text-[#666] leading-[1.7]">
                  Puzzle, casual, RPG — pick what fits your audience. We show exactly how much you earn per install.
                </p>
              </motion.div>
            </div>

            {/* Step 2: Share */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-20">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 bg-[#e97714]/10 rounded-full px-3 py-1 mb-4">
                  <span className="text-[14px] font-bold text-[#e97714]">2</span>
                  <span className="text-[13px] text-[#e97714]">SHARE</span>
                </div>
                <h3 className="text-[26px] md:text-[32px] font-medium text-white mb-4 tracking-[-0.02em]">
                  Post with your link
                </h3>
                <p className="text-[15px] text-[#666] leading-[1.7] mb-4">
                  Story, reel, TikTok — post naturally. Your unique link tracks every install.
                </p>
                <div className="bg-[#111] rounded-[10px] p-3 border border-[#1a1a1a] inline-block">
                  <code className="text-[13px] text-[#e97714]">manyboost.io/yourname</code>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex justify-center"
              >
                <div className="relative rounded-[20px] overflow-hidden max-w-[300px]">
                  <Image
                    src="/CreatorsPageHero.jpg"
                    alt="Creator sharing content"
                    width={300}
                    height={400}
                    className="w-full h-auto rounded-[20px]"
                  />
                </div>
              </motion.div>
            </div>

            {/* Step 3: Compete */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-20">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-2 lg:order-1"
              >
                {/* VS Battle Visual */}
                <div className="relative">
                  {/* VS Badge */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="w-14 h-14 rounded-full bg-[#e97714] flex items-center justify-center shadow-lg shadow-[#e97714]/30">
                      <span className="text-black font-bold text-[16px]">VS</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {/* Winner Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="flex-1 rounded-[16px] p-[1px]"
                      style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #22c55e 100%)' }}
                    >
                      <div className="bg-gradient-to-br from-[#0a1a0f] to-[#080808] rounded-[15px] p-4 relative overflow-hidden">
                        {/* Winner badge */}
                        <div className="absolute top-3 right-3 px-2 py-1 bg-[#22c55e] rounded-full">
                          <span className="text-[10px] font-bold text-black">WINNER</span>
                        </div>
                        
                        {/* Avatar & Name */}
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#22c55e]">
                            <Image src={CREATORS.sara.avatar} alt={CREATORS.sara.name} width={48} height={48} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="text-[14px] font-medium text-white">{CREATORS.sara.name}</p>
                            <p className="text-[11px] text-[#22c55e]">{CREATORS.sara.followers} followers</p>
                          </div>
                        </div>
                        
                        {/* Stats */}
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-[12px]">
                            <span className="text-[#666]">Installs</span>
                            <span className="text-white font-medium">1,247</span>
                          </div>
                          <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-[#22c55e] rounded-full"
                              initial={{ width: 0 }}
                              whileInView={{ width: '78%' }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.5 }}
                            />
                          </div>
                        </div>
                        
                        {/* Prize */}
                        <div className="bg-[#22c55e]/10 rounded-[10px] p-3 text-center">
                          <p className="text-[10px] text-[#22c55e] mb-1">BONUS PRIZE</p>
                          <p className="text-[24px] font-bold text-[#22c55e]">+$3,000</p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Loser Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="flex-1 rounded-[16px] p-[1px]"
                      style={{ background: 'linear-gradient(135deg, #333 0%, #1a1a1a 100%)' }}
                    >
                      <div className="bg-[#0a0a0a] rounded-[15px] p-4 relative overflow-hidden opacity-70">
                        {/* 2nd place badge */}
                        <div className="absolute top-3 right-3 px-2 py-1 bg-[#333] rounded-full">
                          <span className="text-[10px] font-medium text-[#888]">2ND</span>
                        </div>
                        
                        {/* Avatar & Name */}
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#333]">
                            <Image src={CREATORS.tonali.avatar} alt={CREATORS.tonali.name} width={48} height={48} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="text-[14px] font-medium text-[#888]">{CREATORS.tonali.name}</p>
                            <p className="text-[11px] text-[#555]">{CREATORS.tonali.followers} followers</p>
                          </div>
                        </div>
                        
                        {/* Stats */}
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-[12px]">
                            <span className="text-[#555]">Installs</span>
                            <span className="text-[#888] font-medium">892</span>
                          </div>
                          <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-[#444] rounded-full"
                              initial={{ width: 0 }}
                              whileInView={{ width: '55%' }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.6 }}
                            />
                          </div>
                        </div>
                        
                        {/* Prize */}
                        <div className="bg-[#1a1a1a] rounded-[10px] p-3 text-center">
                          <p className="text-[10px] text-[#555] mb-1">CONSOLATION</p>
                          <p className="text-[24px] font-bold text-[#666]">+$200</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-1 lg:order-2"
              >
                <div className="inline-flex items-center gap-2 bg-[#e97714]/10 rounded-full px-3 py-1 mb-4">
                  <span className="text-[14px] font-bold text-[#e97714]">3</span>
                  <span className="text-[13px] text-[#e97714]">COMPETE</span>
                </div>
                <h3 className="text-[26px] md:text-[32px] font-medium text-white mb-4 tracking-[-0.02em]">
                  Challenge other creators 🔥
                </h3>
                <p className="text-[15px] text-[#666] leading-[1.7]">
                  Your fans vs theirs. They&apos;ll grind levels to help you win. Weekly prizes + viral content opportunities.
                </p>
              </motion.div>
            </div>

            {/* Step 4: Get paid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 bg-[#22c55e]/10 rounded-full px-3 py-1 mb-4">
                  <span className="text-[14px] font-bold text-[#22c55e]">4</span>
                  <span className="text-[13px] text-[#22c55e]">GET PAID</span>
                </div>
                <h3 className="text-[26px] md:text-[32px] font-medium text-white mb-4 tracking-[-0.02em]">
                  Cash out every Monday
                </h3>
                <p className="text-[15px] text-[#666] leading-[1.7] mb-4">
                  Real-time tracking. PayPal, bank, or crypto. No minimum — earned $5, get $5.
                </p>
                <div className="flex gap-4">
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center mx-auto mb-1">
                      <span className="text-[16px]">💳</span>
                    </div>
                    <p className="text-[11px] text-[#666]">PayPal</p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center mx-auto mb-1">
                      <span className="text-[16px]">🏦</span>
                    </div>
                    <p className="text-[11px] text-[#666]">Bank</p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center mx-auto mb-1">
                      <span className="text-[16px]">₿</span>
                    </div>
                    <p className="text-[11px] text-[#666]">Crypto</p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Image
                  src="/CreatorsStep4.jpg"
                  alt="Earnings dashboard"
                  width={400}
                  height={500}
                  className="w-full max-w-[300px] h-auto rounded-[16px] mx-auto"
                />
              </motion.div>
            </div>
          </div>
        </section>

{/* Calculator section hidden - removed to avoid showing margins to advertisers */}

        {/* ============================================ */}
        {/* SECTION: Social Proof - Compact */}
        {/* ============================================ */}
        <section className="py-16 md:py-20 px-4">
          <div className="max-w-[700px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-[20px] p-[1px]"
              style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)' }}
            >
              <div className="bg-[#0a0a0a] rounded-[19px] p-6 md:p-8">
                <p className="text-[18px] md:text-[20px] text-[#bbb] leading-[1.6] mb-6 text-center">
                  &quot;I was skeptical. Another &apos;make money online&apos; thing? Tried one post, made <span className="text-white font-medium">$340</span>. Now I do 3 posts a week.&quot;
                </p>
                <div className="flex items-center justify-center gap-3">
                  <Image src={CREATORS.zeynap.avatar} alt={CREATORS.zeynap.name} width={40} height={40} className="rounded-full object-cover" />
                  <div>
                    <p className="text-[14px] text-white font-medium">{CREATORS.zeynap.name}</p>
                    <p className="text-[12px] text-[#666]">{CREATORS.zeynap.followers} followers</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION: "What games?" - Quality assurance */}
        {/* ============================================ */}
        <section className="py-16 md:py-20 px-4 bg-[#050505]">
          <div className="max-w-[700px] mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h2 className="text-[28px] sm:text-[36px] md:text-[44px] tracking-[-0.03em] leading-[1] mb-4 font-medium text-white">
                &quot;What games will I share?&quot;
              </h2>
              <p className="text-[16px] text-[#666]">
                No sketchy stuff. No gambling. Only games you&apos;d actually play.
              </p>
            </motion.div>

            {/* Quality badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap justify-center gap-3 mb-8"
            >
              <div className="flex items-center gap-2 bg-[#111] border border-[#1a1a1a] rounded-full px-4 py-2">
                <span className="text-[14px]">🏆</span>
                <span className="text-[13px] text-white font-medium">Top 100 App Store</span>
              </div>
              <div className="flex items-center gap-2 bg-[#111] border border-[#1a1a1a] rounded-full px-4 py-2">
                <span className="text-[14px]">⭐</span>
                <span className="text-[13px] text-white font-medium">4.5+ Rating</span>
              </div>
              <div className="flex items-center gap-2 bg-[#111] border border-[#1a1a1a] rounded-full px-4 py-2">
                <span className="text-[14px]">🚫</span>
                <span className="text-[13px] text-white font-medium">No Gambling</span>
              </div>
            </motion.div>

            {/* Trust statement */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[14px] text-[#555]"
            >
              Play any game yourself before sharing. Your reputation matters to us.
            </motion.p>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION: "Why this beats brand deals" */}
        {/* ============================================ */}
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-[840px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 md:mb-16"
            >
              <h2 className="text-[32px] sm:text-[44px] md:text-[56px] tracking-[-0.05em] leading-[0.9] mb-4 font-medium">
                <span className="text-white">Why this </span>
                <span className="text-[#e97714]">beats</span>
                <br />
                <span className="text-[#9A9A9A] font-light">waiting for brands</span>
              </h2>
            </motion.div>

            {/* Compact comparison list */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-start gap-4 p-5 rounded-[16px] bg-[#0a0a0a] border border-[#1a1a1a]"
              >
                <div className="w-10 h-10 rounded-full bg-[#e97714]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-[18px]">⏰</span>
                </div>
                <div>
                  <h3 className="text-[17px] font-medium text-white mb-1">No waiting for DMs</h3>
                  <p className="text-[14px] text-[#666]">Brands ghost under 100K. Here — start earning with ANY size.</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="flex items-start gap-4 p-5 rounded-[16px] bg-[#0a0a0a] border border-[#1a1a1a]"
              >
                <div className="w-10 h-10 rounded-full bg-[#22c55e]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-[18px]">📈</span>
                </div>
                <div>
                  <h3 className="text-[17px] font-medium text-white mb-1">Performance pays more</h3>
                  <p className="text-[14px] text-[#666]">Brand deals = flat $50. Here = more engagement, more money.</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-start gap-4 p-5 rounded-[16px] bg-[#0a0a0a] border border-[#1a1a1a]"
              >
                <div className="w-10 h-10 rounded-full bg-[#a78bfa]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-[18px]">🔄</span>
                </div>
                <div>
                  <h3 className="text-[17px] font-medium text-white mb-1">Recurring, not one-time</h3>
                  <p className="text-[14px] text-[#666]">Post whenever you want. Income on demand, not one-and-done.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION: FAQ - Compact */}
        {/* ============================================ */}
        <section className="py-12 md:py-16 px-4">
          <div className="max-w-[600px] mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[24px] md:text-[28px] font-medium text-white text-center mb-8"
            >
              Quick answers
            </motion.h2>

            <FAQItem
              question="How much can I make?"
              answer="50K followers = ~$500-2K/month with 2-3 posts/week. Scales with engagement."
              delay={0.1}
            />
            <FAQItem
              question="When do I get paid?"
              answer="Every Monday. PayPal, bank, or crypto. No minimum — earned $5, get $5."
              delay={0.15}
            />
            <FAQItem
              question="Any catch or fees?"
              answer="Zero. Free to join, free to use. Studios pay us, we pay you."
              delay={0.2}
            />
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION: Final CTA - Compact */}
        {/* ============================================ */}
        <section className="py-12 md:py-16 px-4">
          <div className="max-w-[500px] mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-[24px] md:text-[32px] font-medium tracking-[-0.03em] text-white mb-3">
                Start earning now
              </h2>
              <p className="text-[15px] text-[#666] mb-6">
                Free forever. No minimums. Weekly payouts.
              </p>
              <button 
                onClick={() => setLeadModalOpen(true)}
                className="px-8 py-4 bg-[#e97714] hover:bg-[#d16a10] text-black font-semibold rounded-full text-[17px] transition-colors duration-200 shadow-lg shadow-[#e97714]/30"
              >
                Get started →
              </button>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
