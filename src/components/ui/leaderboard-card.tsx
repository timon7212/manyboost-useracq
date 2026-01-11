"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Avatar } from "./avatar";

interface LeaderboardEntry {
  rank: number;
  avatarUrl: string;
  level: number;
}

interface LeaderboardCardProps {
  title: string;
  memberCount: string;
  entries: LeaderboardEntry[];
  className?: string;
}

export function LeaderboardCard({
  title,
  memberCount,
  entries,
  className,
}: LeaderboardCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "relative bg-[var(--color-bg-card)] border border-[var(--color-border)]",
        "rounded-[14px] w-[235px] overflow-hidden",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-[13px] pt-[18px] pb-[12px]">
        <span className="text-[14px] tracking-tight text-white">{title}</span>
        <span className="text-[14px] tracking-tight text-white">
          {memberCount}
        </span>
      </div>

      {/* Divider */}
      <div className="h-px bg-[var(--color-border)] mx-[13px]" />

      {/* Entries */}
      <div className="flex flex-col gap-3 px-[13px] py-[12px]">
        {entries.map((entry, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-[14px]">
              <Avatar src={entry.avatarUrl} size="sm" />
              <span className="text-[14px] tracking-tight text-white">
                #{entry.rank}
              </span>
            </div>
            <span className="text-[14px] tracking-tight text-white">
              Level {entry.level}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-[52px] card-fade-bottom pointer-events-none" />
    </motion.div>
  );
}



