"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";

interface CreatorCardProps {
  handle: string;
  followers: string;
  avatarUrl: string;
  className?: string;
  delay?: number;
}

export function CreatorCard({
  handle,
  followers,
  avatarUrl,
  className,
  delay = 0,
}: CreatorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        "relative w-[187px] h-[90px] rounded-[14px] p-[1px]",
        "hover:opacity-90 transition-opacity duration-300",
        className
      )}
      style={{
        background: 'linear-gradient(135deg, #202020 0%, #585858 100%)',
      }}
    >
      {/* Inner content */}
      <div className="w-full h-full bg-[#111] rounded-[13px] flex items-center gap-4 px-4">
        {/* Avatar */}
        <div className="relative w-[53px] h-[53px] rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={avatarUrl}
            alt={handle}
            fill
            className="object-cover"
            sizes="53px"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <span 
            className="text-white text-[20px] tracking-[-1px] leading-none"
            style={{ fontWeight: 300 }}
          >
            @{handle}
          </span>
          <span className="text-[#999] text-[16px] tracking-[-0.8px] leading-none mt-1">
            {followers}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
