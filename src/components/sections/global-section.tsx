"use client";

import { motion } from "framer-motion";
import { Globe } from "@/components/ui/globe";
import { CreatorCard } from "@/components/ui/creator-card";

// Real creators data
const creators = [
  { handle: "dr.sarabendida", followers: "705K followers", avatarUrl: "/realcreator3_drsarabendida.jpg" },
  { handle: "tonali_sarkar", followers: "322K followers", avatarUrl: "/realcreator2_tonalisarkar.jpg" },
  { handle: "hinaashh", followers: "268K followers", avatarUrl: "/realcreator4_hinaashh.jpg" },
  { handle: "greeneyed.gurl", followers: "183K followers", avatarUrl: "/realcreator6_greeneyedgurl.jpg" },
];

export function GlobalSection() {
  return (
    <section className="relative py-16 md:py-24 lg:py-40 px-4 overflow-hidden">
      <div className="max-w-[840px] mx-auto">
        {/* Main content - responsive layout */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16">
          
          {/* Left side - Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-shrink-0"
          >
            {/* Mobile: smaller globe, Desktop: larger */}
            <div className="block md:hidden">
              <Globe
                size={280}
                dark={1}
                baseColor="#1a1a1a"
                markerColor="#e97714"
                glowColor="#e97714"
                mapBrightness={6}
                scale={1.0}
              />
            </div>
            <div className="hidden md:block lg:hidden">
              <Globe
                size={320}
                dark={1}
                baseColor="#1a1a1a"
                markerColor="#e97714"
                glowColor="#e97714"
                mapBrightness={6}
                scale={1.0}
              />
            </div>
            <div className="hidden lg:block">
              <Globe
                size={340}
                dark={1}
                baseColor="#1a1a1a"
                markerColor="#e97714"
                glowColor="#e97714"
                mapBrightness={6}
                scale={1.0}
              />
            </div>
          </motion.div>

          {/* Right side - Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[36px] md:text-[48px] lg:text-[59px] tracking-[-0.05em] leading-[0.86] mb-2 md:mb-3 font-medium"
            >
              <span className="gradient-text">2.6M</span>
              <span className="font-light text-[#999]"> Network</span>
            </motion.h2>

            {/* Stats row - always in one line */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-6 md:gap-10 mb-6 md:mb-8"
            >
              <span className="text-[#e97714] text-[15px] md:text-[21px] tracking-[-0.05em]">
                From T1 → T2
              </span>
              <span className="text-[#e97714] text-[15px] md:text-[21px] tracking-[-0.05em]">
                130+ Creators
              </span>
            </motion.div>

            {/* Creator cards grid - 2x2 */}
            <div className="grid grid-cols-2 gap-3 md:gap-4 w-full max-w-[400px]">
              {creators.map((creator, idx) => (
                <CreatorCard
                  key={idx}
                  handle={creator.handle}
                  followers={creator.followers}
                  avatarUrl={creator.avatarUrl}
                  delay={0.15 + idx * 0.05}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
