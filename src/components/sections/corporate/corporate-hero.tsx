'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function CorporateHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white">
      {/* Subtle geometric pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="corporate-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0A2540" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#corporate-grid)" />
        </svg>
      </div>

      {/* Diagonal accent line */}
      <motion.div 
        className="absolute top-0 right-0 w-[1px] h-[200vh] bg-gradient-to-b from-transparent via-[#C9A962] to-transparent origin-top-right rotate-[30deg] translate-x-[40vw] -translate-y-[20vh]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 2, delay: 0.5 }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Small label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <span className="inline-block px-4 py-2 text-xs font-medium tracking-[0.2em] uppercase text-[#0A2540]/60 border border-[#0A2540]/10 rounded-full">
            User Acquisition Technology
          </span>
        </motion.div>

        {/* Main headline - Serif */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-5xl md:text-6xl lg:text-7xl font-normal text-[#0A2540] leading-[1.1] tracking-[-0.02em] mb-8"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Driving Growth.
          <br />
          <span className="text-[#1E40AF]">Building Trust.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-[#0A2540]/60 max-w-2xl mx-auto mb-12 leading-relaxed font-light"
        >
          We deliver high-quality users to mobile apps and games through 
          proprietary acquisition products and integrated distribution.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="#contact"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-[#0A2540] text-white text-sm font-medium tracking-wide hover:bg-[#1E40AF] transition-all duration-300"
          >
            Partner With Us
            <svg 
              className="w-4 h-4 transition-transform group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href="#services"
            className="inline-flex items-center gap-2 px-8 py-4 text-[#0A2540] text-sm font-medium tracking-wide hover:text-[#1E40AF] transition-colors"
          >
            Our Services
          </Link>
        </motion.div>
      </div>

      {/* Bottom accent */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#0A2540]/10 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
      />
    </section>
  );
}
