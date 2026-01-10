"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";

interface StatItem {
  value: string;
  label: string;
}

interface StatsCardProps {
  appIcon: string;
  stats: StatItem[];
  className?: string;
}

export function StatsCard({ appIcon, stats, className }: StatsCardProps) {
  const isDataUrl = appIcon.startsWith("data:");
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "flex items-center gap-6 border border-[var(--color-border-light)]",
        "rounded-[22px] px-6 py-5",
        "bg-black/30 backdrop-blur-sm",
        className
      )}
    >
      {/* App icon */}
      <div className="relative w-[48px] h-[48px] rounded-[9px] overflow-hidden flex-shrink-0">
        {isDataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={appIcon}
            alt="App icon"
            className="w-full h-full object-cover"
          />
        ) : (
          <Image
            src={appIcon}
            alt="App icon"
            fill
            className="object-cover"
            sizes="48px"
          />
        )}
      </div>

      {/* Stats */}
      <div className="flex gap-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex flex-col">
            <span className="text-[36px] tracking-tight text-white leading-none">
              {stat.value}
            </span>
            <span className="text-[15px] tracking-tight text-[var(--color-text-muted)]">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
