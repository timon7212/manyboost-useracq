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
        "relative w-full max-w-[180px] h-[72px] rounded-[12px] p-[1px]",
        "hover:opacity-90 transition-opacity duration-300",
        className
      )}
      style={{
        background: 'linear-gradient(135deg, #202020 0%, #585858 100%)',
      }}
    >
      {/* Inner content */}
      <div className="w-full h-full bg-[#111] rounded-[11px] flex items-center gap-3 px-3">
        {/* Avatar */}
        <div className="relative w-[44px] h-[44px] rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={avatarUrl}
            alt={handle}
            fill
            className="object-cover"
            sizes="44px"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col min-w-0">
          <span 
            className="text-white text-[13px] tracking-[-0.5px] leading-none truncate"
            style={{ fontWeight: 400 }}
          >
            @{handle}
          </span>
          <span className="text-[#e97714] text-[11px] tracking-[-0.3px] leading-none mt-1">
            {followers}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
