"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface RetentionBar {
  label: string;
  height: number; // percentage 0-100
}

interface RetentionChartProps {
  title: string;
  bars: RetentionBar[];
  variant?: "default" | "success";
  className?: string;
}

export function RetentionChart({
  title,
  bars,
  variant = "default",
  className,
}: RetentionChartProps) {
  const barBg = variant === "success" ? "bg-[var(--color-success)]" : "bg-[var(--color-bg-card)]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn("flex flex-col items-center", className)}
    >
      {/* Title */}
      <h3 className="text-[32px] tracking-tight text-[var(--color-text-muted)] mb-8">
        {title}
      </h3>

      {/* Chart */}
      <div className="flex items-end gap-2">
        {bars.map((bar, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: `${Math.max(bar.height * 2.13, 7)}px` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
              className={cn(
                "w-[74px] rounded-[14px] border border-[var(--color-border)]",
                barBg
              )}
              style={{ minHeight: "7px" }}
            />
            <span className="text-[20px] tracking-tight text-[var(--color-text-dim)] mt-4">
              {bar.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}



