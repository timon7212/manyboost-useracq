"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  BarChart3,
  ShieldCheck,
  Sparkles,
  Target,
  SlidersHorizontal,
  Globe2,
  CheckCircle2,
} from "lucide-react";

type TabKey = "overview" | "campaigns" | "creatives" | "fraud";

function useAutoplayTabs(current: TabKey, keys: TabKey[], setTab: (k: TabKey) => void) {
  const pausedUntilRef = useRef<number>(0);

  const pause = (ms: number) => {
    pausedUntilRef.current = Date.now() + ms;
  };

  useEffect(() => {
    const id = window.setInterval(() => {
      if (Date.now() < pausedUntilRef.current) return;
      const idx = keys.indexOf(current);
      const next = keys[(idx + 1) % keys.length];
      setTab(next);
    }, 5200);
    return () => window.clearInterval(id);
  }, [current, keys, setTab]);

  return { pause };
}

function TabButton({
  active,
  icon,
  title,
  subtitle,
  onClick,
}: {
  active: boolean;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "relative text-left rounded-[18px] p-[1px] transition-all",
        active ? "opacity-100" : "opacity-70 hover:opacity-100",
      ].join(" ")}
      style={{
        background: active
          ? "linear-gradient(135deg, rgba(233,119,20,0.9) 0%, #333 45%, rgba(34,197,94,0.7) 100%)"
          : "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)",
      }}
    >
      <div className="rounded-[17px] bg-[#0a0a0a] border border-[#1a1a1a] p-4">
        <div className="flex items-start gap-3">
          <div
            className={[
              "w-10 h-10 rounded-[14px] flex items-center justify-center border",
              active ? "bg-[#e97714]/10 border-[#e97714]/25 text-[#e97714]" : "bg-[#111] border-[#222] text-[#777]",
            ].join(" ")}
          >
            {icon}
          </div>
          <div className="min-w-0">
            <div className={["text-[13px] font-medium truncate", active ? "text-white" : "text-[#ddd]"].join(" ")}>
              {title}
            </div>
            <div className="text-[12px] text-[#666] leading-[1.35]">{subtitle}</div>
          </div>
        </div>
      </div>
    </button>
  );
}

function TabButtonCompact({
  active,
  icon,
  title,
  onClick,
}: {
  active: boolean;
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "relative flex items-center gap-2 px-4 py-3 rounded-full border transition-colors whitespace-nowrap",
        active ? "bg-[#111] border-[#333] text-white" : "bg-[#0a0a0a] border-[#222] text-[#888] hover:text-white",
      ].join(" ")}
    >
      <span className={active ? "text-[#e97714]" : "text-[#666]"}>{icon}</span>
      <span className="text-[13px] font-medium">{title}</span>
      {active && (
        <motion.span
          className="absolute inset-0 rounded-full pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          style={{
            boxShadow: "inset 0 0 0 1px rgba(233,119,20,0.25), 0 10px 30px rgba(0,0,0,0.25)",
          }}
        />
      )}
    </button>
  );
}

function Pill({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a0a0a] border border-[#222] text-[12px] text-[#888]">
      <CheckCircle2 size={14} className="text-[#22c55e]" />
      <span>{text}</span>
    </div>
  );
}

function ScreenFrame({
  title,
  right,
  children,
}: {
  title: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="rounded-[28px] p-[1px]"
      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      style={{
        background: "linear-gradient(135deg, #e97714 0%, #333 45%, #22c55e 100%)",
        backgroundSize: "200% 200%",
      }}
    >
      <div className="bg-[#0a0a0a] rounded-[27px] p-4 md:p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
            <span className="text-[12px] text-[#bbb] font-medium">{title}</span>
          </div>
          <div className="hidden md:flex text-[11px] text-[#666] items-center gap-2">{right}</div>
        </div>
        <div className="rounded-[18px] border border-[#1a1a1a] bg-[#070707] overflow-hidden">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

function MiniKpi({ label, value, accent }: { label: string; value: string; accent: "orange" | "green" | "purple" }) {
  const color =
    accent === "orange" ? "#e97714" : accent === "green" ? "#22c55e" : "#a78bfa";
  return (
    <div className="rounded-[16px] bg-[#0b0b0b] border border-[#1a1a1a] p-4">
      <div className="text-[11px] text-[#666] uppercase tracking-[0.12em]">{label}</div>
      <div className="text-[22px] md:text-[24px] font-semibold tracking-[-0.02em]" style={{ color }}>
        {value}
      </div>
    </div>
  );
}

function LineChart() {
  const d =
    "M20 230 C 120 200, 180 205, 260 165 C 340 125, 420 150, 520 120 C 640 85, 700 110, 780 70 C 835 44, 860 52, 880 45";
  return (
    <svg viewBox="0 0 900 260" className="w-full h-[180px] md:h-[260px]">
      <defs>
        <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e97714" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#e97714" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="line" x1="0" y1="0" x2="900" y2="0">
          <stop offset="0%" stopColor="#e97714" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#e97714" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      {/* grid */}
      {[40, 90, 140, 190, 240].map((y) => (
        <line key={y} x1="20" y1={y} x2="880" y2={y} stroke="#1b1b1b" />
      ))}

      {/* area */}
      <path
        d={`${d} L880 260 L20 260 Z`}
        fill="url(#area)"
      />
      {/* line */}
      <motion.path
        d={d}
        stroke="url(#line)"
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0.5 }}
        animate={{ pathLength: [0, 1, 1], opacity: [0.5, 1, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2.2, ease: "easeInOut" }}
      />
      {/* points */}
      {[
        { x: 260, y: 165, c: "#e97714" },
        { x: 520, y: 120, c: "#e97714" },
        { x: 780, y: 70, c: "#22c55e" },
      ].map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="5"
          fill={p.c}
          opacity="0.9"
          animate={{ r: [4.5, 6, 4.5], opacity: [0.65, 1, 0.65] }}
          transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.35, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );
}

function Table() {
  const rows = [
    { name: "US · iOS · Rewards", spend: "$128,450", cpi: "$1.24", roas: "138%", status: "Scaling" },
    { name: "UK · Android · Interstitial", spend: "$64,180", cpi: "$0.92", roas: "121%", status: "Stable" },
    { name: "DE · iOS · Native", spend: "$41,900", cpi: "$1.48", roas: "112%", status: "Testing" },
    { name: "GCC · Android · Video", spend: "$29,340", cpi: "$0.78", roas: "146%", status: "Scaling" },
  ];
  return (
    <div className="p-4 md:p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="text-[12px] text-[#aaa] font-medium">Top lines</div>
        <div className="text-[11px] text-[#666]">Last 7 days</div>
      </div>

      {/* Mobile: cards (no table chaos) */}
      <div className="md:hidden space-y-3">
        {rows.map((r) => (
          <div key={r.name} className="rounded-[16px] bg-[#070707] border border-[#1a1a1a] p-4">
            <div className="text-[13px] text-white font-medium mb-2">{r.name}</div>
            <div className="grid grid-cols-3 gap-2 text-[12px]">
              <div>
                <div className="text-[#666]">Spend</div>
                <div className="text-[#bbb] font-medium">{r.spend}</div>
              </div>
              <div>
                <div className="text-[#666]">CPI</div>
                <div className="text-[#e97714] font-semibold">{r.cpi}</div>
              </div>
              <div>
                <div className="text-[#666]">D7 ROAS</div>
                <div className="text-[#22c55e] font-semibold">{r.roas}</div>
              </div>
            </div>
            <div className="text-[11px] text-[#666] mt-3">State: {r.status}</div>
          </div>
        ))}
      </div>

      {/* Desktop: table */}
      <div className="hidden md:block rounded-[16px] overflow-hidden border border-[#1a1a1a]">
        <div className="grid grid-cols-12 bg-[#0b0b0b] border-b border-[#1a1a1a] text-[11px] text-[#666] uppercase tracking-[0.12em]">
          <div className="col-span-5 p-3">Line</div>
          <div className="col-span-2 p-3 text-right">Spend</div>
          <div className="col-span-2 p-3 text-right">CPI</div>
          <div className="col-span-2 p-3 text-right">D7 ROAS</div>
          <div className="col-span-1 p-3 text-right">State</div>
        </div>
        {rows.map((r) => (
          <div key={r.name} className="grid grid-cols-12 text-[12px] text-[#bbb] border-b border-[#101010] bg-[#070707] hover:bg-[#0a0a0a] transition-colors">
            <div className="col-span-5 p-3 text-white font-medium">{r.name}</div>
            <div className="col-span-2 p-3 text-right text-[#bbb]">{r.spend}</div>
            <div className="col-span-2 p-3 text-right text-[#e97714] font-semibold">{r.cpi}</div>
            <div className="col-span-2 p-3 text-right text-[#22c55e] font-semibold">{r.roas}</div>
            <div className="col-span-1 p-3 text-right text-[#666]">{r.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OverviewScreen() {
  return (
    <div className="bg-[#070707]">
      <div className="p-4 md:p-6 border-b border-[#141414] bg-gradient-to-b from-[#0a0a0a] to-[#070707]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="text-[12px] text-[#666]">Performance Overview</div>
            <div className="text-[18px] md:text-[20px] font-medium text-white tracking-[-0.02em]">
              Multi‑source acquisition, one view
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-3 py-2 rounded-[14px] bg-[#0b0b0b] border border-[#1a1a1a] text-[12px] text-[#888] flex items-center gap-2">
              <Globe2 size={14} className="text-[#666]" /> US · UK · DE · GCC
            </div>
            <div className="px-3 py-2 rounded-[14px] bg-[#0b0b0b] border border-[#1a1a1a] text-[12px] text-[#888] flex items-center gap-2">
              <SlidersHorizontal size={14} className="text-[#666]" /> KPI: ROAS
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4">
          <MiniKpi label="Spend" value="$263k" accent="orange" />
          <MiniKpi label="Installs" value="214k" accent="green" />
          <MiniKpi label="D7 ROAS" value="132%" accent="green" />
          <MiniKpi label="Event CPA" value="$6.40" accent="purple" />
        </div>
        <div className="rounded-[18px] border border-[#1a1a1a] bg-[#060606] overflow-hidden">
          <LineChart />
        </div>
      </div>

      <Table />
    </div>
  );
}

function CampaignsScreen() {
  return (
    <div className="bg-[#070707]">
      <div className="p-4 md:p-6 border-b border-[#141414] bg-gradient-to-b from-[#0a0a0a] to-[#070707]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-[12px] text-[#666]">Campaign Builder</div>
            <div className="text-[18px] md:text-[20px] font-medium text-white tracking-[-0.02em]">
              Controls UA heads care about
            </div>
          </div>
          <div className="text-[11px] text-[#666]">Pacing · Caps · Whitelists · Events</div>
        </div>
      </div>

      <div className="p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-[18px] border border-[#1a1a1a] bg-[#060606] overflow-hidden">
          <div className="p-4 border-b border-[#141414] flex items-center justify-between">
            <div className="text-[12px] text-[#aaa] font-medium">Targeting</div>
            <div className="text-[11px] text-[#666]">Audience + Supply filters</div>
          </div>
          <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { k: "Geo", v: "US, UK, DE" },
              { k: "OS", v: "iOS 15+ / Android 11+" },
              { k: "Format", v: "Rewarded, Interstitial, Native" },
              { k: "Brand safety", v: "Strict" },
              { k: "Placements", v: "In‑app only" },
              { k: "Pricing", v: "CPI / CPE / CPA" },
            ].map((x) => (
              <div key={x.k} className="rounded-[16px] bg-[#0b0b0b] border border-[#1a1a1a] p-4">
                <div className="text-[11px] text-[#666] uppercase tracking-[0.12em]">{x.k}</div>
                <div className="text-[12px] text-white font-medium mt-1 leading-[1.35]">{x.v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[18px] border border-[#1a1a1a] bg-[#060606] overflow-hidden">
          <div className="p-4 border-b border-[#141414]">
            <div className="text-[12px] text-[#aaa] font-medium">Budget & pacing</div>
            <div className="text-[11px] text-[#666] mt-1">Predictable delivery</div>
          </div>
          <div className="p-4 space-y-3">
            <div className="rounded-[16px] bg-[#0b0b0b] border border-[#1a1a1a] p-4">
              <div className="text-[11px] text-[#666] uppercase tracking-[0.12em]">Daily budget</div>
              <div className="text-[22px] font-semibold text-white">$18,000</div>
              <div className="h-2 rounded-full bg-[#121212] mt-3 overflow-hidden">
                <div className="h-full w-[72%]" style={{ background: "linear-gradient(90deg, #e97714 0%, #22c55e 100%)" }} />
              </div>
              <div className="text-[11px] text-[#666] mt-2">Pacing: smooth · guardrails enabled</div>
            </div>
            <div className="rounded-[16px] bg-[#0b0b0b] border border-[#1a1a1a] p-4">
              <div className="text-[11px] text-[#666] uppercase tracking-[0.12em]">Optimization</div>
              <div className="text-[12px] text-white font-medium mt-1">Event: Purchase · D7 ROAS</div>
              <div className="text-[11px] text-[#666] mt-2">Learning: stable · bid adjustments active</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CreativesScreen() {
  const creatives = [
    { name: "UGC Hook #12", score: "A", cvr: "2.9%", cpi: "$0.98" },
    { name: "Problem/Solution #7", score: "A‑", cvr: "2.4%", cpi: "$1.06" },
    { name: "Feature Demo #3", score: "B+", cvr: "2.0%", cpi: "$1.21" },
    { name: "Social Proof #5", score: "B", cvr: "1.8%", cpi: "$1.34" },
  ];
  return (
    <div className="bg-[#070707]">
      <div className="p-4 md:p-6 border-b border-[#141414] bg-gradient-to-b from-[#0a0a0a] to-[#070707]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-[12px] text-[#666]">Creative Experiments</div>
            <div className="text-[18px] md:text-[20px] font-medium text-white tracking-[-0.02em]">
              A/Bn tests → learnings → scale
            </div>
          </div>
          <div className="text-[11px] text-[#666]">Fatigue · Rotation · Iteration</div>
        </div>
      </div>

      <div className="p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-[18px] border border-[#1a1a1a] bg-[#060606] overflow-hidden">
          <div className="p-4 border-b border-[#141414] flex items-center justify-between">
            <div className="text-[12px] text-[#aaa] font-medium">Variants performance</div>
            <div className="text-[11px] text-[#666]">Winner selection: CVR → CPI</div>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <MiniKpi label="Active tests" value="18" accent="orange" />
              <MiniKpi label="Winning rate" value="31%" accent="green" />
              <MiniKpi label="Median CPI lift" value="-12%" accent="green" />
              <MiniKpi label="Time to learn" value="2.1d" accent="purple" />
            </div>
            <div className="rounded-[16px] border border-[#1a1a1a] overflow-hidden">
              {creatives.map((c) => (
                <div key={c.name} className="grid grid-cols-12 bg-[#070707] hover:bg-[#0a0a0a] transition-colors border-b border-[#101010]">
                  <div className="col-span-6 p-3 text-white font-medium">{c.name}</div>
                  <div className="col-span-2 p-3 text-right text-[#a78bfa] font-semibold">{c.score}</div>
                  <div className="col-span-2 p-3 text-right text-[#22c55e] font-semibold">{c.cvr}</div>
                  <div className="col-span-2 p-3 text-right text-[#e97714] font-semibold">{c.cpi}</div>
                </div>
              ))}
            </div>
            <div className="text-[11px] text-[#666] mt-3">
              Includes: concept tracking, hooks/angles, localization, format adaptation.
            </div>
          </div>
        </div>

        <div className="rounded-[18px] border border-[#1a1a1a] bg-[#060606] overflow-hidden">
          <div className="p-4 border-b border-[#141414]">
            <div className="text-[12px] text-[#aaa] font-medium">Creative library</div>
            <div className="text-[11px] text-[#666] mt-1">Organized by concept</div>
          </div>
          <div className="p-4 grid grid-cols-2 gap-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="aspect-[9/16] rounded-[16px] bg-[#0b0b0b] border border-[#1a1a1a] overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent" />
                <div className="absolute bottom-2 left-2 right-2 text-[10px] text-[#666] flex items-center justify-between">
                  <span>Variant {i + 1}</span>
                  <span className="text-[#22c55e]">Ready</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FraudScreen() {
  const items = [
    { k: "Blocked installs", v: "3.1%", c: "#e97714" },
    { k: "Proxy/VPN", v: "1.4%", c: "#a78bfa" },
    { k: "CTIT anomalies", v: "0.9%", c: "#22c55e" },
    { k: "Device farms", v: "0.8%", c: "#f87171" },
  ];
  return (
    <div className="bg-[#070707]">
      <div className="p-4 md:p-6 border-b border-[#141414] bg-gradient-to-b from-[#0a0a0a] to-[#070707]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-[12px] text-[#666]">Traffic Quality</div>
            <div className="text-[18px] md:text-[20px] font-medium text-white tracking-[-0.02em]">
              Anti‑fraud signals in real‑time
            </div>
          </div>
          <div className="text-[11px] text-[#666]">Device · CTIT · IP · Behavior · Manual</div>
        </div>
      </div>

      <div className="p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-[18px] border border-[#1a1a1a] bg-[#060606] overflow-hidden">
          <div className="p-4 border-b border-[#141414] flex items-center justify-between">
            <div className="text-[12px] text-[#aaa] font-medium">Signals</div>
            <div className="text-[11px] text-[#666]">Last 24 hours</div>
          </div>
          <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            {items.map((x) => (
              <div key={x.k} className="rounded-[16px] bg-[#0b0b0b] border border-[#1a1a1a] p-4">
                <div className="text-[11px] text-[#666] uppercase tracking-[0.12em]">{x.k}</div>
                <div className="text-[22px] font-semibold" style={{ color: x.c }}>
                  {x.v}
                </div>
                <div className="text-[11px] text-[#666] mt-2">auto‑filtered</div>
              </div>
            ))}
          </div>
          <div className="px-4 pb-5">
            <div className="rounded-[16px] bg-[#0b0b0b] border border-[#1a1a1a] p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-[12px] text-[#aaa] font-medium">Protection summary</div>
                <div className="text-[11px] text-[#666]">continuous monitoring</div>
              </div>
              <div className="text-[13px] text-[#888] leading-[1.6]">
                Multi‑layer verification + manual reviews for suspicious spikes. Goal: protect ROI, prevent waste, and keep your reporting clean.
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[18px] border border-[#1a1a1a] bg-[#060606] overflow-hidden">
          <div className="p-4 border-b border-[#141414]">
            <div className="text-[12px] text-[#aaa] font-medium">Actions</div>
            <div className="text-[11px] text-[#666] mt-1">What we do when anomalies appear</div>
          </div>
          <div className="p-4 space-y-3 text-[13px] text-[#888]">
            {[
              "Auto-block suspicious clusters",
              "Tighten supply and filters",
              "Hold & verify post-install events",
              "Manual review + escalation",
            ].map((t) => (
              <div key={t} className="flex items-start gap-2.5">
                <ShieldCheck size={16} className="text-[#22c55e] mt-[2px]" />
                <span className="leading-[1.55]">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function DspProductShowcaseSection() {
  const [tab, setTab] = useState<TabKey>("overview");

  const tabs = useMemo(
    () => [
      {
        key: "overview" as const,
        icon: <BarChart3 size={18} />,
        title: "Overview",
        subtitle: "Unified reporting across sources",
        frameTitle: "Performance Dashboard",
        right: (
          <>
            <Target size={14} className="text-[#666]" /> KPI: ROAS · Events
          </>
        ),
        content: <OverviewScreen />,
      },
      {
        key: "campaigns" as const,
        icon: <SlidersHorizontal size={18} />,
        title: "Campaigns",
        subtitle: "Pacing, caps, filters, guardrails",
        frameTitle: "Campaign Builder",
        right: (
          <>
            <Sparkles size={14} className="text-[#666]" /> Smart pacing enabled
          </>
        ),
        content: <CampaignsScreen />,
      },
      {
        key: "creatives" as const,
        icon: <Sparkles size={18} />,
        title: "Creatives",
        subtitle: "A/Bn tests and learning velocity",
        frameTitle: "Creative Lab",
        right: (
          <>
            <BarChart3 size={14} className="text-[#666]" /> A/Bn experiments
          </>
        ),
        content: <CreativesScreen />,
      },
      {
        key: "fraud" as const,
        icon: <ShieldCheck size={18} />,
        title: "Quality",
        subtitle: "Anti‑fraud signals and actions",
        frameTitle: "Traffic Quality Center",
        right: (
          <>
            <ShieldCheck size={14} className="text-[#666]" /> Real‑time monitoring
          </>
        ),
        content: <FraudScreen />,
      },
    ],
    []
  );

  const active = tabs.find((t) => t.key === tab)!;

  const keys = useMemo(() => tabs.map((t) => t.key), [tabs]);
  const { pause } = useAutoplayTabs(tab, keys, setTab);

  return (
    <section id="product" className="relative pb-18 md:pb-24 px-4 bg-black overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-40 right-0 w-[900px] h-[900px] opacity-20"
          style={{ background: "radial-gradient(ellipse at center, rgba(167, 139, 250, 0.10) 0%, transparent 60%)" }}
        />
      </div>

      <div className="max-w-[1100px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-12"
        >
          <span className="inline-block text-[11px] uppercase tracking-[0.15em] text-[#e97714] mb-4">
            Product
          </span>
          <h2 className="text-[28px] md:text-[40px] lg:text-[46px] tracking-[-0.04em] leading-[1.1] font-medium mb-4">
            <span className="gradient-text">Dashboards you can sell internally</span>
            <span className="text-white"> (and trust)</span>
          </h2>
          <p className="text-[15px] md:text-[16px] text-[#666] max-w-[820px] mx-auto leading-[1.7]">
            Corporate‑grade reporting and controls designed for Heads of UA: predictable delivery, clear levers, and quality you can defend.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <Pill text="KPI: CPI / CPE / CPA / ROAS" />
            <Pill text="MMP + S2S postbacks" />
          </div>
        </motion.div>

        {/* Mobile tabs: horizontal, scrollable */}
        <div className="lg:hidden -mx-4 px-4 mb-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 min-w-max">
            {tabs.map((t) => (
              <TabButtonCompact
                key={t.key}
                active={t.key === tab}
                icon={t.icon}
                title={t.title}
                onClick={() => {
                  pause(20000);
                  setTab(t.key);
                }}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Desktop tabs: left rail */}
          <div className="hidden lg:grid lg:col-span-4 grid-cols-1 gap-3">
            {tabs.map((t) => (
              <TabButton
                key={t.key}
                active={t.key === tab}
                icon={t.icon}
                title={t.title}
                subtitle={t.subtitle}
                onClick={() => {
                  pause(20000);
                  setTab(t.key);
                }}
              />
            ))}
          </div>

          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
              >
                <ScreenFrame title={active.frameTitle} right={active.right}>
                  {active.content}
                </ScreenFrame>
              </motion.div>
            </AnimatePresence>

            {/* Autoplay indicator (subtle) */}
            <div className="mt-3 h-[2px] rounded-full bg-[#111] overflow-hidden border border-[#1a1a1a]">
              <motion.div
                key={tab}
                className="h-full"
                style={{ background: "linear-gradient(90deg, #e97714 0%, #22c55e 100%)" }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 5.2, ease: "linear" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

