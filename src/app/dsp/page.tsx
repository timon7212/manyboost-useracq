"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LeadModal } from "@/components/ui/lead-modal";

/* ═══════════════════════════════════════════════════════════════════════════
   HERO — clean, subtle, professional
═══════════════════════════════════════════════════════════════════════════ */
function Hero({ onCta }: { onCta: () => void }) {
  return (
    <section className="relative min-h-[90svh] flex items-center justify-center overflow-hidden bg-[#030303]">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Subtle top-down gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#030303] pointer-events-none" />

      {/* Accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-[#e97714] to-transparent opacity-60" />

      <div className="relative z-10 text-center px-6 max-w-[900px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#222] bg-[#0a0a0a] mb-8">
            <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
            <span className="text-[12px] text-[#666] uppercase tracking-[0.1em]">In-App User Acquisition</span>
          </div>

          <h1 className="text-[36px] sm:text-[48px] md:text-[64px] lg:text-[72px] font-semibold tracking-[-0.03em] leading-[1.05] text-white mb-6">
            Acquire users that
            <br />
            <span className="text-[#e97714]">actually convert</span>
          </h1>

          <p className="text-[16px] md:text-[18px] text-[#666] max-w-[520px] mx-auto leading-[1.65] mb-10">
            We combine our own DSP, 20+ partner DSPs, and direct publisher integrations
            to deliver high-LTV users at scale.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onCta}
              className="px-8 py-4 bg-[#e97714] hover:bg-[#d56a10] text-white font-medium text-[15px] rounded-full transition-all hover:shadow-[0_0_40px_rgba(233,119,20,0.3)]"
            >
              Get a media plan →
            </button>
            <a
              href="#how-it-works"
              className="px-8 py-4 border border-[#222] hover:border-[#333] text-[#888] hover:text-white font-medium text-[15px] rounded-full transition-all"
            >
              See how it works
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   NUMBERS — compact stats strip
═══════════════════════════════════════════════════════════════════════════ */
function Numbers() {
  const stats = [
    { value: "500M+", label: "DAU reach" },
    { value: "20+", label: "DSP partners" },
    { value: "100+", label: "Countries" },
    { value: "<1%", label: "Fraud rate" },
  ];

  return (
    <section className="relative py-16 md:py-20 bg-[#030303] border-y border-[#111]">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-[32px] sm:text-[40px] md:text-[48px] font-semibold tracking-[-0.03em] text-white leading-none">
                {stat.value}
              </div>
              <div className="text-[12px] md:text-[13px] text-[#555] uppercase tracking-[0.12em] mt-2">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TRAFFIC SOURCES — where traffic comes from
═══════════════════════════════════════════════════════════════════════════ */
function TrafficSources() {
  const sources = [
    {
      title: "ManyBoost DSP",
      desc: "Our proprietary demand-side platform with full control over bidding, pacing, and optimization.",
      tag: "In-house",
      accent: "#e97714",
    },
    {
      title: "Partner DSPs",
      desc: "20+ vetted DSP partners for extended reach: Unity, ironSource, AppLovin, Liftoff, Moloco, and more.",
      tag: "Network",
      accent: "#22c55e",
    },
    {
      title: "Direct Apps",
      desc: "Exclusive deals with premium apps for additional scale and unique inventory access.",
      tag: "Direct",
      accent: "#a78bfa",
    },
  ];

  return (
    <section className="relative py-20 md:py-28 bg-[#030303] overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-[28px] sm:text-[36px] md:text-[44px] font-semibold tracking-[-0.03em] leading-[1.1] text-white mb-4">
            Where your users come from
          </h2>
          <p className="text-[15px] md:text-[16px] text-[#555] max-w-[500px] mx-auto">
            Multiple sources, unified management, single point of contact.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {sources.map((source, i) => (
            <motion.div
              key={source.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative p-6 rounded-2xl border border-[#1a1a1a] bg-[#070707] hover:border-[#222] transition-colors"
            >
              <div
                className="inline-block px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.1em] font-medium mb-4"
                style={{ backgroundColor: `${source.accent}15`, color: source.accent }}
              >
                {source.tag}
              </div>
              <h3 className="text-[18px] md:text-[20px] font-semibold text-white tracking-[-0.02em] mb-2">
                {source.title}
              </h3>
              <p className="text-[14px] text-[#555] leading-[1.6]">
                {source.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Partner logos placeholder */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 pt-10 border-t border-[#111]"
        >
          <div className="text-[12px] text-[#444] uppercase tracking-[0.12em] text-center mb-6">
            Integrated with
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-40">
            {["Unity", "AppLovin", "ironSource", "Liftoff", "Moloco", "Vungle", "Digital Turbine", "Mintegral"].map((name) => (
              <div key={name} className="text-[14px] md:text-[16px] text-[#666] font-medium">
                {name}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PRODUCT — dashboard preview
═══════════════════════════════════════════════════════════════════════════ */
function Product() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={containerRef} className="relative py-20 md:py-28 bg-black overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-[100px] bg-[#e97714] pointer-events-none" />

      <div className="max-w-[1100px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-[28px] sm:text-[36px] md:text-[44px] font-semibold tracking-[-0.03em] leading-[1.1] text-white mb-4">
            Real-time performance visibility
          </h2>
          <p className="text-[15px] md:text-[16px] text-[#555] max-w-[480px] mx-auto">
            One dashboard for all sources. Built for UA managers who need clarity, not complexity.
          </p>
        </motion.div>

        <motion.div style={{ y }} className="relative max-w-[900px] mx-auto">
          <div className="rounded-2xl overflow-hidden border border-[#1a1a1a] bg-[#0a0a0a] shadow-2xl shadow-black/50">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#141414] bg-[#080808]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 mx-3">
                <div className="max-w-[240px] mx-auto h-6 rounded-md bg-[#141414] flex items-center justify-center">
                  <span className="text-[11px] text-[#444]">app.manyboost.io/campaigns</span>
                </div>
              </div>
            </div>

            {/* Dashboard */}
            <div className="p-5 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-[11px] text-[#444] uppercase tracking-[0.1em]">Dashboard</div>
                  <div className="text-[20px] md:text-[24px] font-semibold text-white tracking-[-0.02em]">Campaign Overview</div>
                </div>
                <div className="hidden sm:flex gap-2">
                  <div className="px-3 py-1.5 rounded-md bg-[#111] border border-[#1a1a1a] text-[12px] text-[#666]">Last 7d</div>
                  <div className="px-3 py-1.5 rounded-md bg-[#e97714] text-[12px] text-white font-medium">Export</div>
                </div>
              </div>

              {/* KPIs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {[
                  { label: "Spend", value: "$263K", change: "+12%", up: true },
                  { label: "Installs", value: "214K", change: "+18%", up: true },
                  { label: "CPI", value: "$1.23", change: "-8%", up: false },
                  { label: "D7 ROAS", value: "132%", change: "+15%", up: true },
                ].map((kpi) => (
                  <div key={kpi.label} className="p-4 rounded-xl bg-[#0d0d0d] border border-[#141414]">
                    <div className="text-[10px] text-[#444] uppercase tracking-[0.1em] mb-1">{kpi.label}</div>
                    <div className="text-[22px] md:text-[26px] font-semibold text-white tracking-[-0.02em]">{kpi.value}</div>
                    <div className={`text-[12px] mt-0.5 ${kpi.up ? "text-[#22c55e]" : "text-[#e97714]"}`}>{kpi.change}</div>
                  </div>
                ))}
              </div>

              {/* Chart */}
              <div className="rounded-xl bg-[#0d0d0d] border border-[#141414] p-4 md:p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-[13px] text-[#666]">Installs trend</div>
                  <div className="flex gap-4 text-[11px] text-[#444]">
                    <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#e97714]" /> Installs</span>
                    <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" /> Events</span>
                  </div>
                </div>
                <AnimatedChart />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function AnimatedChart() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <svg viewBox="0 0 700 140" className="w-full h-[100px] md:h-[140px]">
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e97714" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#e97714" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="700" y2="0">
          <stop offset="0%" stopColor="#e97714" />
          <stop offset="100%" stopColor="#22c55e" />
        </linearGradient>
      </defs>

      {[35, 70, 105].map((y) => (
        <line key={y} x1="0" y1={y} x2="700" y2={y} stroke="#1a1a1a" />
      ))}

      <motion.path
        d="M0 120 Q 90 105, 175 95 T 350 70 T 525 45 T 700 30 L700 140 L0 140 Z"
        fill="url(#areaGrad)"
        initial={{ opacity: 0 }}
        animate={{ opacity: mounted ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />

      <motion.path
        d="M0 120 Q 90 105, 175 95 T 350 70 T 525 45 T 700 30"
        fill="none"
        stroke="url(#lineGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: mounted ? 1 : 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      <motion.circle
        cx="700"
        cy="30"
        r="4"
        fill="#22c55e"
        initial={{ scale: 0 }}
        animate={{ scale: mounted ? [1, 1.4, 1] : 0 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   HOW IT WORKS — 3 steps
═══════════════════════════════════════════════════════════════════════════ */
function HowItWorks() {
  const steps = [
    { num: "01", title: "Share your goals", desc: "Tell us your target CPI, ROAS, geos, and event goals." },
    { num: "02", title: "We launch & optimize", desc: "Our team handles setup, creatives, and daily optimization." },
    { num: "03", title: "Scale what works", desc: "Transparent reporting. You decide when and how to scale." },
  ];

  return (
    <section id="how-it-works" className="relative py-20 md:py-28 bg-[#050505] overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-[28px] sm:text-[36px] md:text-[44px] font-semibold tracking-[-0.03em] leading-[1.1] text-white">
            How it works
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="text-center md:text-left"
            >
              <div className="text-[48px] md:text-[56px] font-bold tracking-[-0.03em] text-[#1a1a1a] leading-none mb-3">
                {step.num}
              </div>
              <h3 className="text-[18px] md:text-[20px] font-semibold text-white tracking-[-0.01em] mb-2">
                {step.title}
              </h3>
              <p className="text-[14px] md:text-[15px] text-[#555] leading-[1.6]">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FEATURES — compact grid
═══════════════════════════════════════════════════════════════════════════ */
function Features() {
  const features = [
    { title: "ML Optimization", desc: "Event-based bidding tuned to your LTV goals" },
    { title: "Anti-Fraud Layer", desc: "Multi-signal protection, real-time blocking" },
    { title: "Creative Testing", desc: "A/B/n experiments with automated winners" },
    { title: "MMP Integration", desc: "AppsFlyer, Adjust, Singular, Branch, Kochava" },
  ];

  return (
    <section className="relative py-20 md:py-28 bg-[#030303] overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-[28px] sm:text-[36px] md:text-[44px] font-semibold tracking-[-0.03em] leading-[1.1] text-white mb-4">
            Built for performance
          </h2>
          <p className="text-[15px] md:text-[16px] text-[#555] max-w-[460px] mx-auto">
            Tools and infrastructure that UA teams actually need.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="p-5 rounded-xl border border-[#141414] bg-[#070707] hover:border-[#1a1a1a] transition-colors"
            >
              <h3 className="text-[16px] font-semibold text-white tracking-[-0.01em] mb-1.5">{f.title}</h3>
              <p className="text-[13px] text-[#555] leading-[1.5]">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TRUST — company & team credibility
═══════════════════════════════════════════════════════════════════════════ */
function Trust() {
  return (
    <section className="relative py-20 md:py-28 bg-black overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left: about */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-[11px] text-[#e97714] uppercase tracking-[0.15em] mb-3">About ManyBoost</div>
            <h2 className="text-[28px] sm:text-[36px] md:text-[40px] font-semibold tracking-[-0.03em] leading-[1.1] text-white mb-5">
              A team that ships
              <br />
              <span className="text-[#666]">results, not excuses</span>
            </h2>
            <p className="text-[15px] text-[#555] leading-[1.7] mb-6">
              We're a performance marketing team with deep roots in mobile gaming UA.
              Our founders scaled campaigns from $0 to $10M+/month for top studios
              before building ManyBoost.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "7+", label: "Years in mobile UA" },
                { value: "$50M+", label: "Ad spend managed" },
                { value: "30+", label: "Clients served" },
                { value: "24/7", label: "Campaign monitoring" },
              ].map((item) => (
                <div key={item.label} className="p-4 rounded-xl bg-[#070707] border border-[#141414]">
                  <div className="text-[24px] font-semibold text-white tracking-[-0.02em]">{item.value}</div>
                  <div className="text-[12px] text-[#555] mt-0.5">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: testimonial */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            <div className="p-8 rounded-2xl border border-[#1a1a1a] bg-[#070707]">
              <div className="text-[32px] text-[#222] leading-none mb-4">"</div>
              <p className="text-[17px] md:text-[19px] text-[#888] leading-[1.65] mb-6">
                ManyBoost helped us scale from $50K to $400K/month in 4 months
                while maintaining our ROAS targets. Their transparency and
                responsiveness made them feel like an extension of our team.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center text-[16px] font-semibold text-[#555]">
                  JD
                </div>
                <div>
                  <div className="text-[15px] font-medium text-white">Head of UA</div>
                  <div className="text-[13px] text-[#555]">Mobile Gaming Studio</div>
                </div>
              </div>
            </div>

            {/* Decorative accent */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-[#e97714] opacity-5 blur-2xl pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CTA — clean, focused
═══════════════════════════════════════════════════════════════════════════ */
function Cta({ onCta }: { onCta: () => void }) {
  return (
    <section className="relative py-20 md:py-28 bg-[#030303] overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-15 blur-[100px] bg-[#e97714] pointer-events-none" />

      <div className="max-w-[700px] mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[28px] sm:text-[36px] md:text-[44px] font-semibold tracking-[-0.03em] leading-[1.1] text-white mb-5">
            Ready to scale your UA?
          </h2>
          <p className="text-[15px] md:text-[16px] text-[#555] max-w-[420px] mx-auto mb-8">
            Get a custom media plan in 24 hours. No commitment required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onCta}
              className="px-8 py-4 bg-[#e97714] hover:bg-[#d56a10] text-white font-medium text-[15px] rounded-full transition-all hover:shadow-[0_0_40px_rgba(233,119,20,0.3)]"
            >
              Request media plan →
            </button>
            <a
              href="mailto:busdev@manyboost.io"
              className="px-8 py-4 border border-[#222] hover:border-[#333] text-[#888] hover:text-white font-medium text-[15px] rounded-full transition-all"
            >
              Contact us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════════════════ */
export default function DspPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);

  return (
    <main className="bg-black min-h-screen text-white antialiased">
      <Header />

      <Hero onCta={openModal} />
      <Numbers />
      <TrafficSources />
      <Product />
      <HowItWorks />
      <Features />
      <Trust />
      <Cta onCta={openModal} />

      <Footer />

      <LeadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} type="advertiser" />
    </main>
  );
}
