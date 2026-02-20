'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export function CorporateMission() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 md:py-40 bg-[#FAFBFC]">
      {/* Subtle top border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-[#C9A962]" />

      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Quote marks */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 0.1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <svg className="w-16 h-16 mx-auto text-[#0A2540]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
          </svg>
        </motion.div>

        {/* Mission quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-2xl md:text-3xl lg:text-4xl text-[#0A2540] leading-relaxed tracking-[-0.01em] mb-12"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          We believe performance marketing should be{' '}
          <em className="text-[#1E40AF]">transparent</em>,{' '}
          <em className="text-[#1E40AF]">measurable</em>, and built on{' '}
          <em className="text-[#1E40AF]">trust</em>.
        </motion.blockquote>

        {/* Attribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-12 h-[1px] bg-[#C9A962]" />
          <div>
            <p className="text-sm font-medium text-[#0A2540] tracking-wide">Leadership Team</p>
            <p className="text-xs text-[#0A2540]/50 tracking-wider uppercase mt-1">ManyBoost</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
