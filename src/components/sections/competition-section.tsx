"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const AVATAR_1 = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=42&h=42&fit=crop&crop=face";
const AVATAR_2 = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=42&h=42&fit=crop&crop=face";
const AVATAR_3 = "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=42&h=42&fit=crop&crop=face";
const AVATAR_4 = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=42&h=42&fit=crop&crop=face";
const AVATAR_5 = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=42&h=42&fit=crop&crop=face";

const creators = [
  { avatar: AVATAR_1, name: "@jessica", fans: 847 },
  { avatar: AVATAR_2, name: "@marcus", fans: 1240 },
  { avatar: AVATAR_3, name: "@sofia", fans: 623 },
  { avatar: AVATAR_4, name: "@alex", fans: 912 },
  { avatar: AVATAR_5, name: "@emma", fans: 534 },
];

// Fan dot component with animation
function FanDot({ delay, size = 6, color = "#e97714" }: { delay: number; size?: number; color?: string }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      className="rounded-full"
      style={{ 
        width: size, 
        height: size, 
        backgroundColor: color,
        boxShadow: `0 0 ${size * 2}px ${color}50`
      }}
    />
  );
}

// Generate random fan dots cluster
function FanCluster({ count, baseDelay, color }: { count: number; baseDelay: number; color: string }) {
  const dots = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 5 + 5,
    delay: baseDelay + Math.random() * 0.5,
    x: Math.random() * 70 - 35,
    y: Math.random() * 50 - 25,
  }));

  return (
    <div className="relative w-[100px] h-[70px] flex items-center justify-center">
      {dots.map((dot) => (
        <div
          key={dot.id}
          className="absolute"
          style={{ transform: `translate(${dot.x}px, ${dot.y}px)` }}
        >
          <FanDot delay={dot.delay} size={dot.size} color={color} />
        </div>
      ))}
    </div>
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
          className="text-[16px] md:text-[18px] text-[#666] text-center max-w-[480px] mx-auto mb-16 md:mb-20 tracking-[-0.02em]"
        >
          Creators rally their fans to install, level up, and compete.
          <br className="hidden md:block" />
          Every player counts towards their team.
        </motion.p>

        {/* Main visual flow */}
        <div 
          className="rounded-[24px] p-[1px] mb-12"
          style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #333 30%, #1a1a1a 60%, #333 100%)' }}
        >
          <div className="bg-[#080808] rounded-[23px] p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-6">
              
              {/* Left: Your App */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center text-center"
              >
                <div 
                  className="rounded-[24px] p-[2px] mb-5"
                  style={{ background: 'linear-gradient(135deg, #e97714 0%, #b85a0a 50%, #e97714 100%)' }}
                >
                  <div className="w-[100px] h-[100px] rounded-[22px] bg-[#0a0a0a] flex items-center justify-center">
                    <div className="w-[72px] h-[72px] rounded-[16px] bg-gradient-to-br from-[#e97714] to-[#b85a0a] flex items-center justify-center shadow-lg shadow-[#e97714]/20">
                      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                        <rect x="5" y="5" width="26" height="26" rx="5" stroke="white" strokeWidth="2.5"/>
                        <path d="M14 11L24 18L14 25V11Z" fill="white"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="text-[20px] md:text-[24px] text-white font-medium tracking-[-0.02em]">Your Game</p>
                <p className="text-[13px] text-[#666] mt-1">Offerwall campaign</p>
              </motion.div>

              {/* Connection arrow 1 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="hidden md:flex flex-col items-center gap-2"
              >
                <svg width="80" height="24" viewBox="0 0 80 24" fill="none">
                  <path d="M0 12H70M70 12L60 4M70 12L60 20" stroke="url(#arrow1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <defs>
                    <linearGradient id="arrow1" x1="0" y1="12" x2="70" y2="12">
                      <stop offset="0%" stopColor="#333"/>
                      <stop offset="100%" stopColor="#666"/>
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-[11px] text-[#444] uppercase tracking-[0.1em]">Promote</span>
              </motion.div>

              {/* Mobile arrow */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="md:hidden"
              >
                <svg width="24" height="40" viewBox="0 0 24 40" fill="none">
                  <path d="M12 0V30M12 30L4 22M12 30L20 22" stroke="#444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>

              {/* Center: Creators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col items-center"
              >
                <p className="text-[32px] md:text-[40px] font-medium text-white tracking-[-0.03em] mb-1">
                  <span className="text-[#e97714]">5</span> Creators
                </p>
                <p className="text-[13px] text-[#666] mb-6">Competing for their fans</p>
                
                {/* Creator avatars row */}
                <div className="flex items-center -space-x-3">
                  {creators.map((creator, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.5 + idx * 0.1 }}
                      className="relative group"
                    >
                      <div 
                        className="rounded-full p-[2px] transition-transform duration-200 hover:scale-110 hover:z-10"
                        style={{ background: 'linear-gradient(135deg, #333 0%, #555 100%)' }}
                      >
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden bg-[#0a0a0a] border-2 border-[#0a0a0a]">
                          <Image src={creator.avatar} alt="" width={56} height={56} className="object-cover" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Creator stats */}
                <div className="mt-6 flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-[24px] md:text-[28px] font-medium text-white tracking-[-0.02em]">4,156</p>
                    <p className="text-[11px] text-[#666] uppercase tracking-[0.05em]">Playing</p>
                  </div>
                  <div className="w-px h-10 bg-[#222]" />
                  <div className="text-center">
                    <p className="text-[24px] md:text-[28px] font-medium text-[#e97714] tracking-[-0.02em]">12.8K</p>
                    <p className="text-[11px] text-[#666] uppercase tracking-[0.05em]">Points</p>
                  </div>
                </div>
              </motion.div>

              {/* Connection arrow 2 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="hidden md:flex flex-col items-center gap-2"
              >
                <svg width="80" height="24" viewBox="0 0 80 24" fill="none">
                  <path d="M0 12H70M70 12L60 4M70 12L60 20" stroke="url(#arrow2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <defs>
                    <linearGradient id="arrow2" x1="0" y1="12" x2="70" y2="12">
                      <stop offset="0%" stopColor="#666"/>
                      <stop offset="100%" stopColor="#e97714"/>
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-[11px] text-[#444] uppercase tracking-[0.1em]">Engage</span>
              </motion.div>

              {/* Mobile arrow */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="md:hidden"
              >
                <svg width="24" height="40" viewBox="0 0 24 40" fill="none">
                  <path d="M12 0V30M12 30L4 22M12 30L20 22" stroke="#e97714" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>

              {/* Right: Fans */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col items-center text-center"
              >
                {/* Fan dots visualization */}
                <div className="relative w-[140px] h-[140px] mb-4">
                  {[0, 1, 2, 3].map((row) => (
                    <div 
                      key={row} 
                      className="absolute left-1/2 -translate-x-1/2"
                      style={{ top: `${row * 32 + 5}px` }}
                    >
                      <FanCluster 
                        count={10 - row * 2} 
                        baseDelay={0.8 + row * 0.15} 
                        color={row < 1 ? "#e97714" : row < 2 ? "#f59e0b" : row < 3 ? "#fbbf24" : "#fcd34d"}
                      />
                    </div>
                  ))}
                </div>
                
                <p className="text-[20px] md:text-[24px] text-white font-medium tracking-[-0.02em]">Their Fans</p>
                <p className="text-[13px] text-[#666] mt-1">Install, level up, compete</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
