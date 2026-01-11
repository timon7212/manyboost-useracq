"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Users, Play, Star } from "lucide-react";

interface InfluencerCardProps {
  name: string;
  handle: string;
  followers: string;
  tier: "T1" | "T2" | "T3";
  avatarGradient?: string;
  className?: string;
  delay?: number;
}

const tierColors = {
  T1: "from-amber-500 to-orange-600",
  T2: "from-blue-500 to-indigo-600",
  T3: "from-emerald-500 to-teal-600",
};

const tierBadgeColors = {
  T1: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  T2: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  T3: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
};

export function InfluencerCard({
  name,
  handle,
  followers,
  tier,
  avatarGradient,
  className,
  delay = 0,
}: InfluencerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, y: -2 }}
      className={cn(
        "relative bg-[var(--color-bg-card)] border border-[var(--color-border)]",
        "rounded-[16px] p-4 flex items-center gap-4",
        "hover:border-[var(--color-primary)]/50 transition-all duration-300",
        className
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "w-12 h-12 rounded-full bg-gradient-to-br flex-shrink-0",
          avatarGradient || tierColors[tier]
        )}
      />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-white font-medium text-sm truncate">{name}</span>
          <span
            className={cn(
              "text-[10px] px-1.5 py-0.5 rounded-full border",
              tierBadgeColors[tier]
            )}
          >
            {tier}
          </span>
        </div>
        <p className="text-[var(--color-text-muted)] text-xs truncate">
          @{handle}
        </p>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-1 text-[var(--color-text-muted)]">
        <Users className="w-3 h-3" />
        <span className="text-xs font-medium">{followers}</span>
      </div>
    </motion.div>
  );
}



