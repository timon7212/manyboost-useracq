"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ChatBubbleProps {
  message: string;
  className?: string;
  direction?: "left" | "right";
}

export function ChatBubble({ message, className, direction = "left" }: ChatBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "bg-[var(--color-bg-card)] border border-[var(--color-border)]",
        "rounded-[22px] rounded-bl-[4px] px-4 py-3",
        "max-w-[196px]",
        direction === "right" && "rounded-bl-[22px] rounded-br-[4px]",
        className
      )}
    >
      <p className="text-[15px] leading-tight tracking-tight text-white">
        {message}
      </p>
    </motion.div>
  );
}



