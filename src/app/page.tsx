"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LeadModal } from "@/components/ui/lead-modal";
import { Globe } from "@/components/ui/globe";

/* ═══════════════════════════════════════════════════════════════════════════
   NOISE TEXTURE — adds grain for premium feel
═══════════════════════════════════════════════════════════════════════════ */
function NoiseTexture() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[100] opacity-[0.015]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   AURORA BACKGROUND — animated gradient mesh
═══════════════════════════════════════════════════════════════════════════ */
function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main aurora */}
      <div
        className="absolute top-[-50%] left-[-25%] w-[150%] h-[150%] animate-aurora-1"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(233, 119, 20, 0.08) 0%, transparent 50%)",
        }}
      />
      <div
        className="absolute top-[-30%] right-[-25%] w-[120%] h-[120%] animate-aurora-2"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 60% 40%, rgba(34, 197, 94, 0.05) 0%, transparent 50%)",
        }}
      />
      <div
        className="absolute bottom-[-40%] left-[10%] w-[100%] h-[100%] animate-aurora-3"
        style={{
          background: "radial-gradient(ellipse 50% 60% at 40% 60%, rgba(167, 139, 250, 0.04) 0%, transparent 50%)",
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   GRID PATTERN
═══════════════════════════════════════════════════════════════════════════ */
function GridPattern({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   HERO — premium, minimal, with subtle animation
═══════════════════════════════════════════════════════════════════════════ */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <section ref={ref} className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-black">
      <AuroraBackground />
      <GridPattern className="opacity-50" />

      {/* Radial fade at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-black to-transparent pointer-events-none" />

      <motion.div style={{ opacity, y }} className="relative z-10 text-center px-6 max-w-[1000px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#1a1a1a] bg-black/50 backdrop-blur-sm mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
            <span className="text-[11px] text-[#666] uppercase tracking-[0.15em]">Performance Marketing</span>
          </div>

          <h1 className="text-[40px] sm:text-[56px] md:text-[72px] lg:text-[88px] font-semibold tracking-[-0.04em] leading-[0.95] text-white mb-6">
            We help apps
            <br />
            <span className="bg-gradient-to-r from-[#e97714] via-[#f59e0b] to-[#22c55e] bg-clip-text text-transparent">
              grow faster
            </span>
          </h1>

          <p className="text-[16px] md:text-[18px] text-[#555] max-w-[500px] mx-auto leading-[1.7] mb-10">
            User acquisition, monetization, and creator partnerships — all under one roof.
            Global reach. Data-driven approach. Real results.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#solutions"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("solutions")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4 bg-white text-black font-medium text-[15px] rounded-full transition-all hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:scale-[1.02] cursor-pointer"
            >
              Explore our solutions →
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#333] to-transparent" />
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STATS — key company numbers
═══════════════════════════════════════════════════════════════════════════ */
function Stats() {
  const stats = [
    { value: "$50M+", label: "Ad spend managed" },
    { value: "500M+", label: "Daily active users" },
    { value: "180+", label: "Countries" },
    { value: "30+", label: "Clients worldwide" },
  ];

  return (
    <section className="relative py-20 bg-black border-y border-[#111]">
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
              <div className="text-[36px] sm:text-[44px] md:text-[52px] font-semibold tracking-[-0.03em] text-white leading-none">
                {stat.value}
              </div>
              <div className="text-[12px] text-[#555] uppercase tracking-[0.1em] mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SOLUTIONS — business directions
═══════════════════════════════════════════════════════════════════════════ */
function Solutions() {
  const solutions = [
    {
      tag: "User Acquisition",
      title: "Gaming UA",
      desc: "Offerwall-based user acquisition for mobile games. SDK integrations with 200+ publishers, creator network, and performance-driven campaigns.",
      href: "/offerwall",
      accent: "#e97714",
      features: ["Offerwall SDK", "Creator Network", "Rewarded Traffic"],
    },
    {
      tag: "User Acquisition",
      title: "In-App UA",
      desc: "Programmatic user acquisition across all app verticals. Own DSP, 20+ partner DSPs, and direct publisher integrations.",
      href: "/dsp",
      accent: "#22c55e",
      features: ["Proprietary DSP", "20+ DSP Partners", "500M+ DAU"],
    },
    {
      tag: "Monetization",
      title: "Publisher Solutions",
      desc: "Monetize your app with our offerwall SDK. High eCPMs, global demand, and seamless integration.",
      href: "/publishers",
      accent: "#a78bfa",
      features: ["Offerwall SDK", "High eCPM", "Global Demand"],
    },
  ];

  return (
    <section id="solutions" className="relative py-24 md:py-32 bg-black overflow-hidden scroll-mt-24">
      <GridPattern className="opacity-30" />

      <div className="max-w-[1100px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="text-[11px] text-[#e97714] uppercase tracking-[0.15em] mb-3">What we do</div>
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-semibold tracking-[-0.03em] leading-[1.1] text-white">
            Three directions.
            <br />
            <span className="text-[#555]">One partner.</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-5">
          {solutions.map((sol, i) => (
            <motion.div
              key={sol.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={sol.href}
                className="group block h-full p-6 md:p-8 rounded-2xl border border-[#1a1a1a] bg-[#070707] hover:border-[#222] hover:bg-[#0a0a0a] transition-all duration-300"
              >
                <div
                  className="inline-block px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.1em] font-medium mb-4"
                  style={{ backgroundColor: `${sol.accent}10`, color: sol.accent }}
                >
                  {sol.tag}
                </div>

                <h3 className="text-[22px] md:text-[26px] font-semibold text-white tracking-[-0.02em] mb-3 group-hover:text-[#e97714] transition-colors">
                  {sol.title}
                </h3>

                <p className="text-[14px] text-[#555] leading-[1.65] mb-6">{sol.desc}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {sol.features.map((f) => (
                    <span key={f} className="px-3 py-1.5 rounded-full bg-[#111] border border-[#1a1a1a] text-[11px] text-[#666]">
                      {f}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-[13px] text-[#666] group-hover:text-[#e97714] transition-colors">
                  Learn more
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   GLOBAL REACH — with Globe
═══════════════════════════════════════════════════════════════════════════ */
function GlobalReach() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-[#030303] overflow-hidden">
      {/* Subtle glow behind globe */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#e97714] opacity-[0.03] blur-[100px] pointer-events-none" />

      <div className="max-w-[1100px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="text-[11px] text-[#e97714] uppercase tracking-[0.15em] mb-3">Global presence</div>
            <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-semibold tracking-[-0.03em] leading-[1.1] text-white mb-5">
              Reach users
              <br />
              <span className="text-[#555]">everywhere</span>
            </h2>
            <p className="text-[15px] text-[#555] leading-[1.7] mb-8 max-w-[420px]">
              Our network spans 180+ countries with localized campaigns, regional expertise, and 24/7 optimization.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { region: "North America", share: "35%" },
                { region: "Europe", share: "28%" },
                { region: "APAC", share: "22%" },
                { region: "LATAM & Other", share: "15%" },
              ].map((r) => (
                <div key={r.region} className="p-4 rounded-xl bg-[#070707] border border-[#141414]">
                  <div className="text-[22px] font-semibold text-white tracking-[-0.02em]">{r.share}</div>
                  <div className="text-[12px] text-[#555] mt-0.5">{r.region}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <Globe size={400} baseColor="#111" markerColor="#e97714" glowColor="#e97714" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   WHY US — differentiators
═══════════════════════════════════════════════════════════════════════════ */
function WhyUs() {
  const points = [
    {
      title: "Performance-first",
      desc: "We optimize for your KPIs, not vanity metrics. CPI, ROAS, LTV — we speak your language.",
    },
    {
      title: "Transparency",
      desc: "Real-time reporting, clear pricing, no hidden fees. You always know where your budget goes.",
    },
    {
      title: "Dedicated team",
      desc: "Not a self-serve platform. You get a dedicated account manager and optimization specialists.",
    },
    {
      title: "Speed",
      desc: "Launch in days, not weeks. We move fast and iterate based on data.",
    },
  ];

  return (
    <section className="relative py-24 md:py-32 bg-black overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="text-[11px] text-[#e97714] uppercase tracking-[0.15em] mb-3">Why ManyBoost</div>
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-semibold tracking-[-0.03em] leading-[1.1] text-white">
            Built different
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {points.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="p-6 rounded-2xl border border-[#141414] bg-[#070707]"
            >
              <h3 className="text-[17px] font-semibold text-white tracking-[-0.01em] mb-2">{p.title}</h3>
              <p className="text-[13px] text-[#555] leading-[1.6]">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TEAM — about the company
═══════════════════════════════════════════════════════════════════════════ */
function Team() {
  return (
    <section className="relative py-24 md:py-32 bg-[#030303] overflow-hidden">
      <GridPattern className="opacity-20" />

      <div className="max-w-[900px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="text-[11px] text-[#e97714] uppercase tracking-[0.15em] mb-3">Our team</div>
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-semibold tracking-[-0.03em] leading-[1.1] text-white mb-6">
            People who
            <br />
            <span className="text-[#555]">get it done</span>
          </h2>
          <p className="text-[15px] md:text-[17px] text-[#555] leading-[1.7] max-w-[600px] mx-auto mb-10">
            We're a team of performance marketers, data scientists, and engineers who've scaled campaigns
            from zero to millions. We've worked at top gaming studios, ad networks, and tech companies.
            Now we're building ManyBoost.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {["Ex-Unity", "Ex-AppLovin", "Ex-Zynga", "Ex-Playtika", "Ex-ironSource"].map((exp) => (
              <span key={exp} className="px-4 py-2 rounded-full bg-[#0a0a0a] border border-[#1a1a1a] text-[12px] text-[#666]">
                {exp}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CTA
═══════════════════════════════════════════════════════════════════════════ */
function Cta({ onCta }: { onCta: () => void }) {
  return (
    <section className="relative py-24 md:py-32 bg-black overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-10 blur-[100px] bg-[#e97714] pointer-events-none" />

      <div className="max-w-[700px] mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-semibold tracking-[-0.03em] leading-[1.1] text-white mb-5">
            Let's talk growth
          </h2>
          <p className="text-[15px] md:text-[16px] text-[#555] max-w-[420px] mx-auto mb-8">
            Whether you need users, revenue, or both — we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onCta}
              className="px-8 py-4 bg-[#e97714] hover:bg-[#d56a10] text-white font-medium text-[15px] rounded-full transition-all hover:shadow-[0_0_40px_rgba(233,119,20,0.3)]"
            >
              Contact us →
            </button>
            <a
              href="mailto:hello@manyboost.io"
              className="px-8 py-4 border border-[#222] hover:border-[#333] text-[#888] hover:text-white font-medium text-[15px] rounded-full transition-colors"
            >
              hello@manyboost.io
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
export default function CompanyPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="bg-black min-h-screen text-white antialiased">
      <NoiseTexture />
      <Header />

      <Hero />
      <Stats />
      <Solutions />
      <GlobalReach />
      <WhyUs />
      <Team />
      <Cta onCta={() => setModalOpen(true)} />

      <Footer />

      <LeadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} type="advertiser" />

      {/* Aurora animations */}
      <style jsx global>{`
        @keyframes aurora-1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(5%, 3%) rotate(5deg); }
          50% { transform: translate(-3%, 5%) rotate(-3deg); }
          75% { transform: translate(-5%, -3%) rotate(3deg); }
        }
        @keyframes aurora-2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(-4%, 4%) rotate(-4deg); }
          50% { transform: translate(4%, -3%) rotate(4deg); }
          75% { transform: translate(3%, 4%) rotate(-3deg); }
        }
        @keyframes aurora-3 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(3%, -4%) rotate(3deg); }
          50% { transform: translate(-4%, 3%) rotate(-4deg); }
          75% { transform: translate(4%, 3%) rotate(4deg); }
        }
        .animate-aurora-1 { animation: aurora-1 20s ease-in-out infinite; }
        .animate-aurora-2 { animation: aurora-2 25s ease-in-out infinite; }
        .animate-aurora-3 { animation: aurora-3 30s ease-in-out infinite; }
      `}</style>
    </main>
  );
}
