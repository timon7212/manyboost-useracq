"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Real creators for hero section
const HERO_CREATORS = [
  "/realcreator3_drsarabendida.jpg",
  "/realcreator2_tonalisarkar.jpg",
  "/realcreator4_hinaashh.jpg",
];

// Real game studio icons
const GAME_STUDIOS = [
  "/gamestudio.png",
  "/gamestudio1.png",
  "/gamestudio2.png",
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center px-4 pt-20 md:pt-24 pb-10 overflow-hidden bg-black">
      {/* Background Ellipse */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Image
          src="/HeroBackgroundEllipse.png"
          alt=""
          width={900}
          height={900}
          className="w-[500px] md:w-[700px] lg:w-[900px] h-auto opacity-90"
          priority
        />
      </div>
      
      {/* Logo/Brand */}
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-[16px] md:text-[21px] tracking-[-0.02em] mb-3 md:mb-4 z-10 font-medium gradient-text"
      >
        manyboost.io
      </motion.p>

      {/* Main headline */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-[36px] sm:text-[48px] md:text-[72px] lg:text-[85px] text-center tracking-[-0.05em] leading-[0.86] max-w-4xl mb-4 md:mb-5 z-10 font-medium"
      >
        <span className="gradient-text">User Acquisition</span>
        <br />
        <span className="gradient-text">via Creators.</span>
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-[14px] md:text-[22px] lg:text-[26px] text-[#999] text-center tracking-[-0.05em] leading-[0.86] max-w-[840px] z-10 px-4 font-light"
      >
        Creator-driven offerwalls meet your own branded app.
        <br />
        Measured, capped, and tracked like real UA.
      </motion.p>

      {/* MOBILE: Vertical layout */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex md:hidden flex-col items-center mt-8 z-10 gap-4"
      >
        {/* App icons - real game studios */}
        <div className="flex items-center gap-3">
          <div className="relative" style={{ width: '100px', height: '100px' }}>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute"
              style={{ top: '40px', left: '40px' }}
            >
              <Image
                src={GAME_STUDIOS[2]}
                alt="Game studio"
                width={55}
                height={55}
                className="rounded-[12px] shadow-xl"
                style={{ width: '55px', height: '55px' }}
              />
            </motion.div>
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute"
              style={{ top: '20px', left: '20px' }}
            >
              <Image
                src={GAME_STUDIOS[1]}
                alt="Game studio"
                width={55}
                height={55}
                className="rounded-[12px] shadow-xl"
                style={{ width: '55px', height: '55px' }}
              />
            </motion.div>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute"
              style={{ top: '0px', left: '0px' }}
            >
              <Image
                src={GAME_STUDIOS[0]}
                alt="Game studio"
                width={55}
                height={55}
                className="rounded-[12px] shadow-xl"
                style={{ width: '55px', height: '55px' }}
              />
            </motion.div>
          </div>
        </div>
        
        {/* Arrow down */}
        <svg width="20" height="36" viewBox="0 0 20 36" fill="none" className="text-[#555]">
          <path d="M10 0V32M10 32L2 24M10 32L18 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

        {/* Phone */}
        <Image
          src="/HeroPhone.png"
          alt="ManyBoost App Interface"
          width={571}
          height={634}
          className="drop-shadow-2xl"
          style={{ width: '280px', height: 'auto' }}
          priority
        />

        {/* Arrow down */}
        <svg width="20" height="36" viewBox="0 0 20 36" fill="none" className="text-[#555]">
          <path d="M10 0V32M10 32L2 24M10 32L18 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

        {/* Creators */}
        <div className="flex flex-col items-center">
          <div className="mb-3 text-center">
            <p className="text-[28px] font-medium leading-none tracking-[-0.02em] gradient-text">2.6M</p>
            <p className="text-[12px] leading-[1.3] font-medium mt-1 gradient-text">Audience</p>
            <p className="text-[12px] leading-[1.3] font-medium gradient-text">130+ Creators</p>
            <p className="text-[12px] leading-[1.3] font-medium gradient-text">Worldwide</p>
          </div>
          <div className="relative flex justify-center" style={{ width: '110px', height: '65px' }}>
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute"
              style={{ top: '0px', left: '0px' }}
            >
              <Image
                src={HERO_CREATORS[0]}
                alt="Creator"
                width={65}
                height={65}
                className="rounded-full border-2 border-[#333] shadow-lg object-cover"
                style={{ width: '65px', height: '65px' }}
              />
            </motion.div>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              className="absolute"
              style={{ top: '8px', left: '35px' }}
            >
              <Image
                src={HERO_CREATORS[1]}
                alt="Creator"
                width={50}
                height={50}
                className="rounded-full border-2 border-[#333] shadow-lg object-cover"
                style={{ width: '50px', height: '50px' }}
              />
            </motion.div>
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
              className="absolute"
              style={{ top: '16px', left: '68px' }}
            >
              <Image
                src={HERO_CREATORS[2]}
                alt="Creator"
                width={35}
                height={35}
                className="rounded-full border-2 border-[#333] shadow-lg object-cover"
                style={{ width: '35px', height: '35px' }}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* DESKTOP: Horizontal layout */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="hidden md:flex relative mt-6 z-10 items-center justify-center w-full max-w-[840px] mx-auto"
      >
        {/* Left side - App icons with arrow */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex items-center -mr-8"
        >
          {/* Stacked app icons - real game studios */}
          <div className="relative" style={{ width: '117px', height: '117px' }}>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute"
              style={{ top: '48px', left: '48px' }}
            >
              <Image
                src={GAME_STUDIOS[2]}
                alt="Game studio"
                width={69}
                height={69}
                className="rounded-[16px] shadow-xl"
                style={{ width: '69px', height: '69px' }}
              />
            </motion.div>
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute"
              style={{ top: '24px', left: '24px' }}
            >
              <Image
                src={GAME_STUDIOS[1]}
                alt="Game studio"
                width={69}
                height={69}
                className="rounded-[16px] shadow-xl"
                style={{ width: '69px', height: '69px' }}
              />
            </motion.div>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute"
              style={{ top: '0px', left: '0px' }}
            >
              <Image
                src={GAME_STUDIOS[0]}
                alt="Game studio"
                width={69}
                height={69}
                className="rounded-[16px] shadow-xl"
                style={{ width: '69px', height: '69px' }}
              />
            </motion.div>
          </div>
          {/* Arrow pointing right */}
          <svg width="36" height="20" viewBox="0 0 36 20" fill="none" className="text-[#555]">
            <path d="M0 10H32M32 10L24 2M32 10L24 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>

        {/* Center - Phone mockup */}
        <div className="relative z-10">
          <Image
            src="/HeroPhone.png"
            alt="ManyBoost App Interface"
            width={571}
            height={634}
            className="drop-shadow-2xl"
            style={{ width: '520px', height: 'auto', maxWidth: 'none' }}
            priority
          />
        </div>

        {/* Right side - Creators with stats */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex items-center -ml-8"
        >
          {/* Arrow pointing right */}
          <svg width="36" height="20" viewBox="0 0 36 20" fill="none" className="text-[#555]">
            <path d="M0 10H32M32 10L24 2M32 10L24 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          
          {/* Stats and creators container */}
          <div className="flex flex-col items-center">
            {/* Stats text with gradient */}
            <div className="mb-3 text-center">
              <p className="text-[32px] lg:text-[36px] font-medium leading-none tracking-[-0.02em] gradient-text">2.6M</p>
              <p className="text-[13px] lg:text-[14px] leading-[1.3] font-medium mt-1 gradient-text">Audience</p>
              <p className="text-[13px] lg:text-[14px] leading-[1.3] font-medium gradient-text">130+ Creators</p>
              <p className="text-[13px] lg:text-[14px] leading-[1.3] font-medium gradient-text">Worldwide</p>
            </div>
            {/* Stacked creator photos - real creators */}
            <div className="relative flex justify-center" style={{ width: '130px', height: '80px' }}>
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute"
                style={{ top: '0px', left: '0px' }}
              >
                <Image
                  src={HERO_CREATORS[0]}
                  alt="Creator"
                  width={80}
                  height={80}
                  className="rounded-full border-2 border-[#333] shadow-lg object-cover"
                  style={{ width: '80px', height: '80px' }}
                />
              </motion.div>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                className="absolute"
                style={{ top: '10px', left: '45px' }}
              >
                <Image
                  src={HERO_CREATORS[1]}
                  alt="Creator"
                  width={60}
                  height={60}
                  className="rounded-full border-2 border-[#333] shadow-lg object-cover"
                  style={{ width: '60px', height: '60px' }}
                />
              </motion.div>
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
                className="absolute"
                style={{ top: '20px', left: '85px' }}
              >
                <Image
                  src={HERO_CREATORS[2]}
                  alt="Creator"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-[#333] shadow-lg object-cover"
                  style={{ width: '40px', height: '40px' }}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
