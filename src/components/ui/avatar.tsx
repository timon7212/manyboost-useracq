"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface AvatarProps {
  src: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-[21px] h-[21px]",
  md: "w-[38px] h-[38px]",
  lg: "w-[48px] h-[48px]",
};

const sizePx = {
  sm: 21,
  md: 38,
  lg: 48,
};

export function Avatar({ src, alt = "", size = "md", className }: AvatarProps) {
  const isDataUrl = src.startsWith("data:");
  
  return (
    <div
      className={cn(
        "relative rounded-full overflow-hidden flex-shrink-0",
        sizeClasses[size],
        className
      )}
    >
      {isDataUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes={`${sizePx[size]}px`}
        />
      )}
    </div>
  );
}
