"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Real game studio icons
const GAME_STUDIOS = [
  "/gamestudio.png",
  "/gamestudio1.png",
  "/gamestudio2.png",
  "/gamestudio3.png",
  "/gamestudio4.png",
  "/gamestudio5.png",
];

export function AppsShowcaseSection() {
  // Create enough icons for seamless loop - repeat the set multiple times
  const icons = [...GAME_STUDIOS, ...GAME_STUDIOS, ...GAME_STUDIOS, ...GAME_STUDIOS, ...GAME_STUDIOS];

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-black">
      {/* Title - constrained to 840px */}
      <div className="max-w-[840px] mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[36px] md:text-[48px] lg:text-[59px] text-center tracking-[-0.05em] leading-[0.86] mb-10 md:mb-14 font-medium"
        >
          <span className="gradient-text">Powering</span>
          <span className="font-light text-[#999]"> ambitious</span>
          <br />
          <span className="font-light text-[#999]">game studios</span>
        </motion.h2>
      </div>

      {/* Icons carousel - relative to 840px content area */}
      <div className="relative max-w-[840px] mx-auto">
        {/* Left fade - starts at edge of 840px */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-[120px] z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, #000000 0%, #000000 20%, transparent 100%)',
          }}
        />
        
        {/* Right fade - starts at edge of 840px */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-[120px] z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to left, #000000 0%, #000000 20%, transparent 100%)',
          }}
        />

        {/* Scrolling container with overflow visible to extend beyond 840px */}
        <div className="overflow-hidden">
          {/* Scrolling icons - infinite loop */}
          <motion.div
            className="flex items-center"
            animate={{
              x: [0, -1800],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
            style={{ width: 'fit-content' }}
          >
            {icons.map((icon, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 mx-4"
              >
                <Image
                  src={icon}
                  alt="Game studio"
                  width={100}
                  height={100}
                  className="rounded-[20px] shadow-lg"
                  style={{ 
                    width: '92px', 
                    height: '92px' 
                  }}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
