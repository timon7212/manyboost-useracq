"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

// Game studio logos
const PUBLISHER_LOGOS = [
  "/gamestudio.png",
  "/gamestudio1.png",
  "/gamestudio2.png",
  "/gamestudio3.png",
  "/gamestudio4.png",
  "/gamestudio5.png",
];

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
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration, hasStarted]);

  return { count, ref };
}

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  delay?: number;
}

function StatItem({ value, suffix, label, delay = 0 }: StatItemProps) {
  const { count, ref } = useCounter(value, 2500);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center text-center px-6 md:px-10"
    >
      <div className="flex items-baseline gap-1">
        <span className="text-[32px] md:text-[44px] lg:text-[52px] font-semibold tracking-[-0.03em] text-white">
          {count.toLocaleString()}
        </span>
        <span className="text-[20px] md:text-[28px] font-semibold text-[#e97714]">{suffix}</span>
      </div>
      <span className="text-[12px] md:text-[13px] text-[#666] tracking-[-0.01em] mt-1">{label}</span>
    </motion.div>
  );
}

function Divider() {
  return (
    <div className="hidden md:block w-px h-14 bg-gradient-to-b from-transparent via-[#333] to-transparent" />
  );
}

// Publisher logos marquee
function PublisherMarquee() {
  const icons = [...PUBLISHER_LOGOS, ...PUBLISHER_LOGOS, ...PUBLISHER_LOGOS, ...PUBLISHER_LOGOS, ...PUBLISHER_LOGOS, ...PUBLISHER_LOGOS];
  
  return (
    <div className="relative w-full mt-10 overflow-hidden">
      {/* Fades */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-[80px] md:w-[120px] z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #080808 0%, transparent 100%)' }}
      />
      <div 
        className="absolute right-0 top-0 bottom-0 w-[80px] md:w-[120px] z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #080808 0%, transparent 100%)' }}
      />

      {/* Scrolling logos */}
      <motion.div
        className="flex items-center"
        animate={{ x: [0, -1600] }}
        transition={{
          x: { repeat: Infinity, repeatType: "loop", duration: 40, ease: "linear" },
        }}
        style={{ width: 'fit-content' }}
      >
        {icons.map((icon, idx) => (
          <div key={idx} className="flex-shrink-0 mx-4 md:mx-5">
            <Image
              src={icon}
              alt="Publisher"
              width={80}
              height={80}
              className="rounded-[14px] shadow-md opacity-50 hover:opacity-80 transition-opacity duration-300"
              style={{ width: '80px', height: '80px' }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function StatsBannerV2() {
  return (
    <section className="relative py-14 md:py-20 px-4 border-y border-[#1a1a1a] bg-[#080808]">
      {/* Subtle glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[350px] opacity-25"
          style={{ background: 'radial-gradient(ellipse at center, rgba(233, 119, 20, 0.1) 0%, transparent 70%)' }}
        />
      </div>

      <div className="max-w-[1100px] mx-auto relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-[20px] md:text-[24px] font-medium text-white mb-2">
            Trusted by <span className="text-[#e97714]">53 Publishers</span> Worldwide
          </h2>
          <p className="text-[12px] md:text-[13px] text-[#555]">
            Real traffic from verified offerwall sources — 2.6M MAU
          </p>
        </motion.div>

        {/* Stats */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0">
          <StatItem value={2} suffix=".6M" label="Monthly Active Users" delay={0} />
          <Divider />
          <StatItem value={53} suffix="+" label="Publishers" delay={0.1} />
          <Divider />
          <StatItem value={130} suffix="+" label="Creators" delay={0.2} />
        </div>

        {/* Publisher logos */}
        <PublisherMarquee />

        {/* Platforms */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex items-center justify-center gap-4"
        >
          <span className="text-[11px] text-[#444]">Platforms:</span>
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#111] border border-[#222] flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#666">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
            </div>
            <div className="w-7 h-7 rounded-lg bg-[#111] border border-[#222] flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#666">
                <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24c-2.86-1.21-6.08-1.21-8.94 0L5.65 5.67c-.19-.29-.58-.38-.87-.2-.28.18-.37.54-.22.83L6.4 9.48C3.3 11.25 1.28 14.44 1 18h22c-.28-3.56-2.3-6.75-5.4-8.52zM7 15.25c-.69 0-1.25-.56-1.25-1.25 0-.69.56-1.25 1.25-1.25.69 0 1.25.56 1.25 1.25 0 .69-.56 1.25-1.25 1.25zm10 0c-.69 0-1.25-.56-1.25-1.25 0-.69.56-1.25 1.25-1.25.69 0 1.25.56 1.25 1.25 0 .69-.56 1.25-1.25 1.25z"/>
              </svg>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
