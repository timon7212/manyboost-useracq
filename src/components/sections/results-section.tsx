"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

// Animated counter hook
function useCounter(end: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView || hasStarted) return;
    
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
  }, [hasStarted, startOnView]);

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

// Mini chart component
function MiniChart() {
  const bars = [35, 42, 38, 55, 48, 62, 58, 75, 68, 82, 78, 95];
  
  return (
    <div className="flex items-end gap-[3px] h-[60px]">
      {bars.map((height, idx) => (
        <motion.div
          key={idx}
          initial={{ height: 0 }}
          whileInView={{ height: `${height}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 + idx * 0.05 }}
          className="w-[6px] rounded-full"
          style={{
            background: idx >= bars.length - 3 
              ? 'linear-gradient(180deg, #e97714 0%, #b85a0a 100%)' 
              : '#2a2a2a'
          }}
        />
      ))}
    </div>
  );
}

// Metric card component
function MetricCard({ 
  value, 
  label, 
  suffix = "", 
  prefix = "",
  trend,
  delay = 0 
}: { 
  value: number; 
  label: string; 
  suffix?: string;
  prefix?: string;
  trend?: string;
  delay?: number;
}) {
  const { count, ref } = useCounter(value, 1500);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="rounded-[16px] p-[1px]"
      style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #333 50%, #1a1a1a 100%)',
      }}
    >
      <div className="bg-[#0a0a0a] rounded-[15px] px-6 py-5 min-w-[140px]">
        <p className="text-[11px] uppercase tracking-[0.1em] text-[#666] mb-2">{label}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-[28px] font-medium tracking-[-0.02em] text-white">
            {prefix}{count}{suffix}
          </span>
          {trend && (
            <span className="text-[12px] text-[#22c55e] font-medium ml-1">{trend}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Mini sparkline for metrics
function Sparkline({ color = "#22c55e", trend = "up" }: { color?: string; trend?: "up" | "down" }) {
  const points = trend === "up" 
    ? [40, 35, 45, 38, 52, 48, 58, 55, 65, 62, 72, 85]
    : [70, 65, 60, 55, 52, 48, 45, 42, 38, 35, 32, 28];
  
  return (
    <svg viewBox="0 0 100 40" className="w-[80px] h-[28px]">
      <defs>
        <linearGradient id={`sparkGrad-${color.replace('#', '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={`M0,${40 - points[0] * 0.4} ${points.map((p, i) => `L${(i / (points.length - 1)) * 100},${40 - p * 0.4}`).join(' ')} L100,40 L0,40 Z`}
        fill={`url(#sparkGrad-${color.replace('#', '')})`}
      />
      <path
        d={`M0,${40 - points[0] * 0.4} ${points.map((p, i) => `L${(i / (points.length - 1)) * 100},${40 - p * 0.4}`).join(' ')}`}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Dashboard component
function DashboardMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="rounded-[20px] p-[1px] max-w-[620px] w-full"
      style={{
        background: 'linear-gradient(135deg, #252525 0%, #404040 30%, #252525 60%, #404040 100%)',
      }}
    >
      <div className="bg-[#0c0c0c] rounded-[19px] p-6 md:p-8">
        {/* Dashboard header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-[12px] text-[#666] uppercase tracking-[0.1em] mb-1">Campaign Dashboard</p>
            <p className="text-[14px] text-[#9A9A9A]">Your performance at a glance</p>
          </div>
          <div className="flex items-center gap-2 bg-[#22c55e]/10 px-3 py-1.5 rounded-full">
            <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
            <span className="text-[11px] text-[#22c55e] font-medium">Live</span>
          </div>
        </div>

        {/* Main metrics row */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-[#111] rounded-[14px] p-4 border border-[#1a1a1a]"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-[11px] text-[#666] uppercase tracking-[0.05em]">Installs Today</p>
              <span className="text-[10px] text-[#22c55e] bg-[#22c55e]/10 px-2 py-0.5 rounded-full">+24%</span>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <span className="text-[28px] font-semibold text-white tracking-[-0.02em]">2.4K</span>
                <p className="text-[11px] text-[#555] mt-0.5">vs 1.9K yesterday</p>
              </div>
              <Sparkline color="#22c55e" trend="up" />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-[#111] rounded-[14px] p-4 border border-[#1a1a1a]"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-[11px] text-[#666] uppercase tracking-[0.05em]">Revenue</p>
              <span className="text-[10px] text-[#22c55e] bg-[#22c55e]/10 px-2 py-0.5 rounded-full">+18%</span>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <span className="text-[28px] font-semibold text-white tracking-[-0.02em]">$12.8K</span>
                <p className="text-[11px] text-[#555] mt-0.5">this week</p>
              </div>
              <Sparkline color="#e97714" trend="up" />
            </div>
          </motion.div>
        </div>

        {/* Chart area */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="bg-[#111] rounded-[14px] p-4 mb-5 border border-[#1a1a1a]"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <p className="text-[13px] text-[#ccc] font-medium">Install Growth</p>
              <span className="text-[10px] text-[#555] bg-[#1a1a1a] px-2 py-0.5 rounded">Last 7 days</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#e97714]" />
                <span className="text-[10px] text-[#666]">ManyBoost</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
                <span className="text-[10px] text-[#666]">Other</span>
              </div>
            </div>
          </div>
          <MiniChart />
          <div className="flex justify-between mt-3 px-1">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
              <span key={day} className="text-[9px] text-[#444]">{day}</span>
            ))}
          </div>
        </motion.div>

        {/* KPI row - UA manager language */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="grid grid-cols-3 gap-3"
        >
          <div className="bg-[#0a1208] border border-[#22c55e]/20 rounded-[12px] p-3 text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <span className="text-[20px] font-semibold text-white">CPI</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 9V3M6 3L3 6M6 3L9 6" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <p className="text-[11px] text-[#22c55e] font-medium">Below target</p>
          </div>
          <div className="bg-[#140d08] border border-[#e97714]/20 rounded-[12px] p-3 text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <span className="text-[20px] font-semibold text-[#e97714]">ROAS</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 9V3M6 3L3 6M6 3L9 6" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <p className="text-[11px] text-[#e97714] font-medium">142% of goal</p>
          </div>
          <div className="bg-[#0a0a14] border border-[#a78bfa]/20 rounded-[12px] p-3 text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <span className="text-[20px] font-semibold text-white">D7</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 9V3M6 3L3 6M6 3L9 6" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <p className="text-[11px] text-[#a78bfa] font-medium">Strong retention</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Counter display for main metric
function CounterDisplay({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const { count, ref } = useCounter(value, 2000);
  
  return (
    <div ref={ref} className="text-[56px] md:text-[72px] font-medium tracking-[-0.03em] text-white leading-none">
      {prefix}{count}{suffix}
    </div>
  );
}

export function ResultsSection() {
  return (
    <section className="relative pt-8 md:pt-12 pb-24 md:pb-40 px-4 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[600px] opacity-30"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(233, 119, 20, 0.12) 0%, transparent 60%)',
          }}
        />
      </div>

      <div className="max-w-[1000px] mx-auto">
        {/* Section title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[36px] sm:text-[48px] md:text-[59px] text-center tracking-[-0.05em] leading-[0.86] mb-6 font-medium"
        >
          <span className="font-light text-[#9A9A9A]">..</span>
          <span className="gradient-text">You </span>
          <span className="font-light text-[#9A9A9A]">Get </span>
          <span className="gradient-text">The Results.</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[16px] md:text-[18px] text-[#666] text-center max-w-[500px] mx-auto mb-12 md:mb-16 tracking-[-0.02em]"
        >
          Real-time analytics. Transparent metrics. 
          <br className="hidden md:block" />
          Performance you can measure.
        </motion.p>

        {/* Main content */}
        <div className="flex flex-col items-center gap-8">
          {/* Dashboard */}
          <DashboardMockup />

          {/* Bottom features */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="rounded-[16px] p-[1px]"
              style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #333 50%, #1a1a1a 100%)' }}
            >
              <div className="bg-[#0a0a0a] rounded-[15px] px-5 py-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#e97714]/10 flex items-center justify-center">
                  <span className="text-[14px]">📊</span>
                </div>
                <span className="text-[13px] text-[#888]">Full attribution tracking</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="rounded-[16px] p-[1px]"
              style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #333 50%, #1a1a1a 100%)' }}
            >
              <div className="bg-[#0a0a0a] rounded-[15px] px-5 py-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#22c55e]/10 flex items-center justify-center">
                  <span className="text-[14px]">🎯</span>
                </div>
                <span className="text-[13px] text-[#888]">Cohort analysis & LTV</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="rounded-[16px] p-[1px]"
              style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #333 50%, #1a1a1a 100%)' }}
            >
              <div className="bg-[#0a0a0a] rounded-[15px] px-5 py-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#a78bfa]/10 flex items-center justify-center">
                  <span className="text-[14px]">⚡</span>
                </div>
                <span className="text-[13px] text-[#888]">MMP integration ready</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
