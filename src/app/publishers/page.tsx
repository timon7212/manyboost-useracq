"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LeadModal } from "@/components/ui/lead-modal";
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

export default function PublishersPage() {
  const [leadModalOpen, setLeadModalOpen] = useState(false);

  const fill = useCounter(98, 1500);
  const advertisers = useCounter(200, 1500);
  const countries = useCounter(100, 1500);

  return (
    <>
      <Header />
      <LeadModal isOpen={leadModalOpen} onClose={() => setLeadModalOpen(false)} type="publisher" />

      <main className="min-h-screen bg-black overflow-x-hidden">
        {/* Hero */}
        <section className="relative pt-32 md:pt-40 pb-20 px-6 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] opacity-30"
              style={{ background: "radial-gradient(ellipse at center top, rgba(167, 139, 250, 0.15) 0%, transparent 55%)" }}
            />
          </div>

          <div className="max-w-[900px] mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-[#a78bfa]/10 border border-[#a78bfa]/20 rounded-full px-4 py-2 mb-6"
            >
              <div className="w-2 h-2 rounded-full bg-[#a78bfa] animate-pulse" />
              <span className="text-[12px] text-[#a78bfa] font-medium uppercase tracking-wider">For Publishers</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-[36px] sm:text-[50px] md:text-[66px] tracking-[-0.04em] leading-[1] mb-6 font-semibold"
            >
              <span className="text-white">Monetize with</span>
              <br />
              <span className="text-[#a78bfa]">ManyBoost Network</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[16px] md:text-[18px] text-[#666] max-w-[600px] mx-auto mb-8 leading-[1.65]"
            >
              Two ways to monetize: Gaming Offerwalls for reward-based traffic, 
              and Ad Network for display, video, and native ads. Maximize revenue across all formats.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <button
                onClick={() => setLeadModalOpen(true)}
                className="px-8 py-4 bg-[#a78bfa] hover:bg-[#9575f5] text-black font-semibold rounded-full text-[15px] transition-all shadow-lg shadow-[#a78bfa]/25"
              >
                Start Monetizing →
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-6 mt-8 text-[12px] text-[#555]"
            >
              {["5-Minute Setup", "NET-7 Payouts", "No Minimum", "Global Demand"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span>{item}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 px-6 border-y border-[#111] bg-[#050505]">
          <div className="max-w-[1000px] mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="text-[36px] md:text-[48px] font-semibold text-white leading-none">High</p>
                <p className="text-[12px] text-[#555] mt-2 uppercase tracking-[0.1em]">eCPM (above market)</p>
              </motion.div>
              <motion.div
                ref={fill.ref}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-center"
              >
                <p className="text-[36px] md:text-[48px] font-semibold text-white leading-none">{fill.count}%</p>
                <p className="text-[12px] text-[#555] mt-2 uppercase tracking-[0.1em]">Fill Rate</p>
              </motion.div>
              <motion.div
                ref={advertisers.ref}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <p className="text-[36px] md:text-[48px] font-semibold text-white leading-none">{advertisers.count}+</p>
                <p className="text-[12px] text-[#555] mt-2 uppercase tracking-[0.1em]">Advertisers</p>
              </motion.div>
              <motion.div
                ref={countries.ref}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <p className="text-[36px] md:text-[48px] font-semibold text-white leading-none">{countries.count}+</p>
                <p className="text-[12px] text-[#555] mt-2 uppercase tracking-[0.1em]">Countries</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Two Monetization Options */}
        <section className="py-20 md:py-28 px-6">
          <div className="max-w-[1100px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <div className="text-[11px] text-[#a78bfa] uppercase tracking-[0.15em] mb-3">Monetization Options</div>
              <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-semibold tracking-[-0.03em] leading-[1.1] text-white mb-4">
                Two ways to earn
              </h2>
              <p className="text-[15px] text-[#555] max-w-[500px] mx-auto">
                Choose the format that fits your app. Or use both for maximum revenue.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Offerwall */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl border border-[#22c55e]/20 bg-[#22c55e]/5 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#22c55e]/5 rounded-full blur-[80px] pointer-events-none" />
                
                <div className="inline-block px-3 py-1 rounded-full bg-[#22c55e]/10 text-[10px] text-[#22c55e] uppercase tracking-[0.1em] mb-4">
                  Gaming Focus
                </div>
                
                <h3 className="text-[26px] md:text-[32px] font-semibold text-white mb-3">Gaming Offerwall</h3>
                <p className="text-[15px] text-[#666] mb-6 leading-[1.65]">
                  Reward-based monetization for gaming apps. Users complete offers (install games, reach levels, make purchases) 
                  and earn in-app currency. High engagement, high eCPMs.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-[#111] border border-[#1a1a1a]">
                    <div className="text-[24px] font-semibold text-[#22c55e]">High</div>
                    <div className="text-[11px] text-[#555] uppercase tracking-[0.1em]">eCPM</div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#111] border border-[#1a1a1a]">
                    <div className="text-[24px] font-semibold text-[#22c55e]">5x</div>
                    <div className="text-[11px] text-[#555] uppercase tracking-[0.1em]">vs Ads</div>
                  </div>
                </div>

                <div className="space-y-2">
                  {["Rewarded completions", "Gaming advertisers only", "Native SDK integration", "Custom currency support"].map((f) => (
                    <div key={f} className="flex items-center gap-2 text-[13px] text-[#888]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      {f}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Ad Network */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="p-8 rounded-2xl border border-[#e97714]/20 bg-[#e97714]/5 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#e97714]/5 rounded-full blur-[80px] pointer-events-none" />
                
                <div className="inline-block px-3 py-1 rounded-full bg-[#e97714]/10 text-[10px] text-[#e97714] uppercase tracking-[0.1em] mb-4">
                  All App Categories
                </div>
                
                <h3 className="text-[26px] md:text-[32px] font-semibold text-white mb-3">Ad Network</h3>
                <p className="text-[15px] text-[#666] mb-6 leading-[1.65]">
                  Display, video, native, and interstitial ads for any app category. 
                  Premium demand from global advertisers. Works alongside or instead of offerwalls.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-[#111] border border-[#1a1a1a]">
                    <div className="text-[24px] font-semibold text-[#e97714]">98%</div>
                    <div className="text-[11px] text-[#555] uppercase tracking-[0.1em]">Fill Rate</div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#111] border border-[#1a1a1a]">
                    <div className="text-[24px] font-semibold text-[#e97714]">100+</div>
                    <div className="text-[11px] text-[#555] uppercase tracking-[0.1em]">Countries</div>
                  </div>
                </div>

                <div className="space-y-2">
                  {["Banner, interstitial, video, native", "Programmatic demand", "Header bidding support", "GDPR & CCPA compliant"].map((f) => (
                    <div key={f} className="flex items-center gap-2 text-[13px] text-[#888]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e97714" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      {f}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Ad Formats */}
        <section className="py-20 md:py-28 px-6 bg-[#050505]">
          <div className="max-w-[1100px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <div className="text-[11px] text-[#a78bfa] uppercase tracking-[0.15em] mb-3">Ad Formats</div>
              <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-semibold tracking-[-0.03em] leading-[1.1] text-white">
                Every format you need
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { title: "Banner Ads", desc: "Standard IAB sizes, sticky or inline placement", icon: "□" },
                { title: "Interstitial", desc: "Full-screen ads at natural breakpoints", icon: "▣" },
                { title: "Rewarded Video", desc: "Users watch, you earn, they get rewards", icon: "▶" },
                { title: "Native Ads", desc: "Blend seamlessly with your app's UI", icon: "◈" },
              ].map((format, i) => (
                <motion.div
                  key={format.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-5 rounded-xl border border-[#1a1a1a] bg-[#070707] hover:border-[#222] transition-colors"
                >
                  <div className="text-[28px] mb-3 text-[#a78bfa]">{format.icon}</div>
                  <h3 className="text-[16px] font-semibold text-white mb-1">{format.title}</h3>
                  <p className="text-[13px] text-[#555] leading-[1.5]">{format.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Integration */}
        <section className="py-20 md:py-28 px-6">
          <div className="max-w-[1000px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <div className="text-[11px] text-[#a78bfa] uppercase tracking-[0.15em] mb-3">Integration</div>
              <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-semibold tracking-[-0.03em] leading-[1.1] text-white">
                Easy setup, any platform
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  title: "Native SDK",
                  desc: "Unity, iOS, Android. Lightweight, native performance.",
                  features: ["< 100KB size", "Native UI", "Offline caching"],
                  highlighted: true,
                },
                {
                  title: "Web / API",
                  desc: "REST API for custom implementations.",
                  features: ["S2S postbacks", "Webhooks", "Full docs"],
                },
                {
                  title: "Mediation",
                  desc: "Works with MAX, ironSource, AdMob mediation.",
                  features: ["Header bidding", "Waterfall support", "Auto-optimization"],
                },
              ].map((opt, i) => (
                <motion.div
                  key={opt.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-6 rounded-2xl border ${
                    opt.highlighted ? "border-[#a78bfa]/30 bg-[#a78bfa]/5" : "border-[#1a1a1a] bg-[#070707]"
                  }`}
                >
                  {opt.highlighted && (
                    <div className="inline-block px-3 py-1 rounded-full bg-[#a78bfa]/10 text-[10px] text-[#a78bfa] uppercase tracking-[0.1em] mb-4">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-[20px] font-semibold text-white mb-2">{opt.title}</h3>
                  <p className="text-[14px] text-[#555] mb-4">{opt.desc}</p>
                  <div className="space-y-2">
                    {opt.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-[13px] text-[#666]">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        {f}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 md:py-28 px-6 bg-[#050505]">
          <div className="max-w-[1000px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <div className="text-[11px] text-[#a78bfa] uppercase tracking-[0.15em] mb-3">Why ManyBoost</div>
              <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-semibold tracking-[-0.03em] leading-[1.1] text-white">
                Built for publishers
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { title: "Highest eCPMs", desc: "Premium demand from top advertisers globally" },
                { title: "Fast Payouts", desc: "NET-7 via wire, PayPal, or crypto" },
                { title: "Quality Demand", desc: "Vetted advertisers, brand-safe content" },
                { title: "Real-time Analytics", desc: "Track impressions, revenue, eCPM live" },
                { title: "Dedicated Support", desc: "Personal account manager for optimization" },
                { title: "Full Transparency", desc: "No hidden fees, clear reporting" },
              ].map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-5 rounded-xl border border-[#1a1a1a] bg-[#070707]"
                >
                  <h3 className="text-[16px] font-semibold text-white mb-1">{b.title}</h3>
                  <p className="text-[13px] text-[#555]">{b.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Platforms */}
        <section className="py-16 px-6 border-y border-[#111]">
          <div className="max-w-[900px] mx-auto text-center">
            <p className="text-[13px] text-[#555] mb-6">Works with your stack</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {["Unity", "iOS", "Android", "React Native", "Flutter", "Web", "MAX", "ironSource"].map((platform) => (
                <div
                  key={platform}
                  className="px-4 py-2 bg-[#0a0a0a] border border-[#1a1a1a] rounded-full text-[12px] text-[#666]"
                >
                  {platform}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-28 px-6">
          <div className="max-w-[600px] mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-semibold tracking-[-0.03em] leading-[1.1] text-white mb-5">
                Ready to monetize?
              </h2>
              <p className="text-[15px] text-[#555] mb-8">
                Join hundreds of publishers already earning with ManyBoost Network.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => setLeadModalOpen(true)}
                  className="px-8 py-4 bg-[#a78bfa] hover:bg-[#9575f5] text-black font-semibold rounded-full text-[15px] transition-all shadow-lg shadow-[#a78bfa]/25"
                >
                  Get Started Free →
                </button>
                <a
                  href="mailto:publishers@manyboost.io"
                  className="px-8 py-4 border border-[#222] hover:border-[#333] text-[#888] hover:text-white font-medium text-[15px] rounded-full transition-colors"
                >
                  Contact us
                </a>
              </div>
              <p className="text-[12px] text-[#444] mt-6">No credit card required • 5-minute setup • NET-7 payouts</p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
