"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Avatar } from "./avatar";
import { LeaderboardCard } from "./leaderboard-card";
import { ChatBubble } from "./chat-bubble";

interface TeamCardProps {
  teamName: string;
  points: string;
  memberCount: string;
  avatarUrl: string;
  chatMessage?: string;
  chatDirection?: "left" | "right";
  entries: { rank: number; avatarUrl: string; level: number }[];
  className?: string;
  delay?: number;
}

export function TeamCard({
  teamName,
  points,
  memberCount,
  avatarUrl,
  chatMessage,
  chatDirection = "left",
  entries,
  className,
  delay = 0,
}: TeamCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={cn("relative flex flex-col items-start", className)}
    >
      {/* Chat bubble */}
      {chatMessage && (
        <div className="mb-4">
          <ChatBubble message={chatMessage} direction={chatDirection} />
        </div>
      )}

      {/* Team header */}
      <div className="flex items-center gap-3 mb-4">
        <Avatar src={avatarUrl} size="md" />
        <div>
          <p className="text-[20px] tracking-tight text-white">{teamName}</p>
          <p className="text-[15px] tracking-tight text-[var(--color-text-muted)]">
            {points}
          </p>
        </div>
      </div>

      {/* Leaderboard */}
      <LeaderboardCard
        title="Installed"
        memberCount={memberCount}
        entries={entries}
      />
    </motion.div>
  );
}



