"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Real creators data
const CREATORS = {
  zeynap: { avatar: "/realcreator1_zeynapma.jpg", name: "@zeynap.ma", followers: "123K" },
  tonali: { avatar: "/realcreator2_tonalisarkar.jpg", name: "@tonali_sarkar", followers: "322K" },
  sara: { avatar: "/realcreator3_drsarabendida.jpg", name: "@dr.sarabendida", followers: "705K" },
  hina: { avatar: "/realcreator4_hinaashh.jpg", name: "@hinaashh", followers: "268K" },
  aynees: { avatar: "/realcreator5_ayneesworld.jpg", name: "@aynees_world", followers: "49K" },
  greeneyed: { avatar: "/realcreator6_greeneyedgurl.jpg", name: "@greeneyed.gurl", followers: "183K" },
};

// Creator team card with followers
function CreatorTeamCard({
  avatar,
  name,
  followers,
  installs,
  engagement,
  color,
  delay,
}: {
  avatar: string;
  name: string;
  followers: string;
  installs: string;
  engagement: string;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="rounded-[16px] p-[1px]"
      style={{ background: `linear-gradient(135deg, ${color}40 0%, #1a1a1a 50%, ${color}40 100%)` }}
    >
      <div className="bg-[#0a0a0a] rounded-[15px] p-4">
        {/* Creator header */}
        <div className="flex items-center gap-3 mb-4">
          <div 
            className="rounded-full p-[2px]"
            style={{ background: `linear-gradient(135deg, ${color} 0%, ${color}80 100%)` }}
          >
            <div className="w-10 h-10 rounded-full overflow-hidden bg-[#0a0a0a]">
              <Image src={avatar} alt={name} width={40} height={40} className="object-cover w-full h-full" />
            </div>
          </div>
          <div>
            <p className="text-[14px] font-medium text-white">{name}</p>
            <p className="text-[11px] text-[#666]">{followers} followers</p>
          </div>
        </div>

        {/* Team stats */}
        <div className="bg-[#111] rounded-[10px] p-3">
          <p className="text-[10px] text-[#666] uppercase tracking-[0.1em] mb-2">Team Performance</p>
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <p className="text-[16px] font-medium text-white">{installs}</p>
              <p className="text-[9px] text-[#555]">Installs</p>
            </div>
            <div className="w-px h-8 bg-[#1a1a1a]" />
            <div className="text-center flex-1">
              <p className="text-[16px] font-medium" style={{ color }}>{engagement}</p>
              <p className="text-[9px] text-[#555]">Engagement</p>
            </div>
          </div>
        </div>

        {/* Follower avatars */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex -space-x-1.5">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-5 h-5 rounded-full bg-[#1a1a1a] border border-[#0a0a0a]"
                style={{ opacity: 1 - i * 0.15 }}
              />
            ))}
          </div>
          <span className="text-[10px] text-[#555]">+ fans playing</span>
        </div>
      </div>
    </motion.div>
  );
}

export function CompetitionSection() {
  return (
    <section className="relative pt-24 md:pt-40 pb-8 md:pb-12 px-4 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] opacity-40"
          style={{ background: 'radial-gradient(ellipse at center, rgba(233, 119, 20, 0.1) 0%, transparent 50%)' }}
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
          <span className="font-light text-[#9A9A9A]">While </span>
          <span className="gradient-text">They </span>
          <span className="gradient-text">Compete..</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[16px] md:text-[18px] text-[#666] text-center max-w-[480px] mx-auto mb-12 md:mb-16 tracking-[-0.02em]"
        >
          Creators build teams from their audience.
          <br className="hidden md:block" />
          Each fan that plays = install + engagement for you.
        </motion.p>

        {/* Two-step visual */}
        <div className="space-y-8">
          
          {/* Step 1: Your Game -> Creators */}
          <div
            className="rounded-[24px] p-[1px]"
            style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #333 30%, #1a1a1a 60%, #333 100%)' }}
          >
            <div className="bg-[#080808] rounded-[23px] p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
                {/* Your Game */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col items-center text-center"
                >
                  <div
                    className="rounded-[20px] p-[2px] mb-3"
                    style={{ background: 'linear-gradient(135deg, #e97714 0%, #b85a0a 50%, #e97714 100%)' }}
                  >
                    <div className="w-[80px] h-[80px] rounded-[18px] bg-[#0a0a0a] flex items-center justify-center">
                      <div className="w-[56px] h-[56px] rounded-[12px] bg-gradient-to-br from-[#e97714] to-[#b85a0a] flex items-center justify-center shadow-lg shadow-[#e97714]/20">
                        <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
                          <rect x="5" y="5" width="26" height="26" rx="5" stroke="white" strokeWidth="2.5" />
                          <path d="M14 11L24 18L14 25V11Z" fill="white" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <p className="text-[18px] text-white font-medium">Your Game</p>
                  <p className="text-[12px] text-[#666]">Offerwall campaign</p>
                </motion.div>

                {/* Arrow */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="hidden md:block"
                >
                  <svg width="60" height="24" viewBox="0 0 60 24" fill="none">
                    <path d="M0 12H50M50 12L42 4M50 12L42 20" stroke="url(#arrow)" strokeWidth="2" strokeLinecap="round" />
                    <defs>
                      <linearGradient id="arrow" x1="0" y1="12" x2="50" y2="12">
                        <stop offset="0%" stopColor="#e97714" />
                        <stop offset="100%" stopColor="#666" />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>
                
                {/* Mobile arrow */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="md:hidden"
                >
                  <svg width="24" height="32" viewBox="0 0 24 32" fill="none">
                    <path d="M12 0V24M12 24L4 16M12 24L20 16" stroke="#e97714" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </motion.div>

                {/* Creators with Teams */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-center"
                >
                  <p className="text-[28px] md:text-[32px] font-medium text-white tracking-[-0.02em] mb-1">
                    <span className="text-[#e97714]">130+</span> Creators
                  </p>
                  <p className="text-[13px] text-[#666] mb-4">Each with their own team of fans</p>
                  
                  {/* Creator preview avatars - real creators */}
                  <div className="flex items-center justify-center -space-x-3">
                    {[CREATORS.sara, CREATORS.tonali, CREATORS.hina].map((creator, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.5 + idx * 0.1 }}
                        className="rounded-full p-[2px]"
                        style={{ background: 'linear-gradient(135deg, #333 0%, #555 100%)' }}
                      >
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-[#0a0a0a] border-2 border-[#0a0a0a]">
                          <Image src={creator.avatar} alt={creator.name} width={48} height={48} className="object-cover w-full h-full" />
                        </div>
                      </motion.div>
                    ))}
                    <div className="w-12 h-12 rounded-full bg-[#1a1a1a] border-2 border-[#0a0a0a] flex items-center justify-center ml-1">
                      <span className="text-[11px] text-[#666]">+3.7K</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Step 2: Creator Teams with metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mb-6"
          >
            <p className="text-[14px] text-[#666]">
              <span className="text-[#e97714]">↓</span> Each creator rallies their fans to compete
            </p>
          </motion.div>

          {/* Creator team cards - with real creators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <CreatorTeamCard
              avatar={CREATORS.sara.avatar}
              name={CREATORS.sara.name}
              followers={CREATORS.sara.followers}
              installs="2.1K"
              engagement="Very High"
              color="#22c55e"
              delay={0.3}
            />
            <CreatorTeamCard
              avatar={CREATORS.tonali.avatar}
              name={CREATORS.tonali.name}
              followers={CREATORS.tonali.followers}
              installs="1.4K"
              engagement="High"
              color="#e97714"
              delay={0.4}
            />
            <CreatorTeamCard
              avatar={CREATORS.hina.avatar}
              name={CREATORS.hina.name}
              followers={CREATORS.hina.followers}
              installs="890"
              engagement="High"
              color="#a78bfa"
              delay={0.5}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
