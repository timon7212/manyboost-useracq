"use client";

import { motion } from "framer-motion";
import { BarChart3, Headphones, ShieldCheck, Sparkles, Cpu } from "lucide-react";

function Pill({ text }: { text: string }) {
  return (
    <div className="px-4 py-2 rounded-full bg-[#111] border border-[#222] text-[12px] text-[#888]">
      {text}
    </div>
  );
}

export function DspAboutTeamSection() {
  return (
    <section className="relative py-20 md:py-28 px-4 bg-black overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-0 w-[700px] h-[700px] opacity-25"
          style={{ background: "radial-gradient(ellipse at center, rgba(233, 119, 20, 0.10) 0%, transparent 60%)" }}
        />
      </div>

      <div className="max-w-[1100px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left: “team snapshot” (no placeholder wording) */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-2 lg:order-1"
          >
            <div className="rounded-[28px] p-[1px]" style={{ background: "linear-gradient(135deg, #e97714 0%, #333 40%, #22c55e 100%)" }}>
              <div className="rounded-[27px] bg-[#0a0a0a] p-6 md:p-7">
                <div className="rounded-[22px] border border-[#1a1a1a] bg-gradient-to-br from-[#0f0f0f] to-[#050505] overflow-hidden">
                  <div className="p-7 md:p-9">
                    <div className="text-[12px] uppercase tracking-[0.18em] text-[#666] mb-3">How we run UA</div>
                    <div className="text-[22px] md:text-[28px] font-medium text-white leading-[1.15] mb-2">
                      Operator‑led, engineering‑driven
                    </div>
                    <div className="text-[14px] text-[#666] leading-[1.75] max-w-[520px] mb-6">
                      AdOps, analytics, fraud specialists, and creatives working as one team.
                      You get a dedicated point of contact, plus specialists behind the scenes.
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { icon: <BarChart3 size={16} />, title: "Performance & analytics", desc: "KPI ownership, reporting, insights." },
                        { icon: <ShieldCheck size={16} />, title: "Traffic quality ops", desc: "Fraud monitoring, supply controls." },
                        { icon: <Sparkles size={16} />, title: "Creative lab", desc: "Testing cadence, iterations, variants." },
                        { icon: <Cpu size={16} />, title: "Optimization", desc: "ML signals + guardrails." },
                      ].map((x) => (
                        <div key={x.title} className="rounded-[18px] bg-[#0b0b0b] border border-[#1a1a1a] p-4">
                          <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-[14px] bg-[#111] border border-[#222] flex items-center justify-center text-[#e97714]">
                              {x.icon}
                            </div>
                            <div>
                              <div className="text-[13px] text-white font-medium">{x.title}</div>
                              <div className="text-[12px] text-[#666] mt-1 leading-[1.55]">{x.desc}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 rounded-[18px] bg-[#0b0b0b] border border-[#1a1a1a] p-4 flex items-center justify-between gap-4">
                      <div>
                        <div className="text-[12px] text-[#aaa] font-medium">Support model</div>
                        <div className="text-[12px] text-[#666] mt-1 leading-[1.55]">
                          Dedicated manager + specialist squad. Fast response, proactive optimization.
                        </div>
                      </div>
                      <div className="w-px h-10 bg-[#1a1a1a] hidden sm:block" />
                      <div className="text-[12px] text-[#888] flex items-center gap-2 whitespace-nowrap">
                        <Headphones size={14} className="text-[#22c55e]" /> SLA‑style support
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: copy */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-1 lg:order-2"
          >
            <span className="inline-block text-[11px] uppercase tracking-[0.15em] text-[#e97714] mb-4">
              About ManyBoost
            </span>
            <h2 className="text-[32px] md:text-[42px] lg:text-[48px] tracking-[-0.04em] leading-[1.1] font-medium mb-5">
              <span className="gradient-text">A team of UA operators</span>
              <br />
              <span className="text-[#666]">and engineers</span>
            </h2>
            <p className="text-[15px] md:text-[16px] text-[#666] leading-[1.7] mb-7">
              We help app businesses acquire users profitably — with DSP reach, direct supply, anti‑fraud systems, ML optimization,
              and a hands‑on growth team.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              <Pill text="Dedicated account managers" />
              <Pill text="Fraud & quality ops" />
              <Pill text="ML optimization" />
              <Pill text="Creative production" />
              <Pill text="A/Bn testing framework" />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="mailto:busdev@manyboost.io?subject=UA%20in-app%20acquisition%20intro"
                className="px-7 py-3.5 bg-[#e97714] hover:bg-[#d16a10] text-black font-semibold rounded-full text-[15px] transition-colors w-fit"
              >
                Talk to our team →
              </a>
              <a
                href="mailto:careers@manyboost.io?subject=Careers%20at%20ManyBoost"
                className="px-7 py-3.5 bg-[#0a0a0a] hover:bg-[#111] border border-[#222] text-white font-medium rounded-full text-[15px] transition-colors w-fit"
              >
                Careers →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

