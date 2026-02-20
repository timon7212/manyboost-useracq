'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export function CorporateContact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({
    name: '',
    company: '',
    email: '',
    interest: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <section id="contact" ref={ref} className="relative py-32 bg-white">
      {/* Top accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-[#C9A962]" />

      <div className="max-w-4xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 text-xs font-medium tracking-[0.2em] uppercase text-[#0A2540]/40 mb-6">
            Get In Touch
          </span>
          <h2 
            className="font-serif text-4xl md:text-5xl text-[#0A2540] tracking-[-0.02em] mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Let&apos;s Discuss Your Growth
          </h2>
          <p className="text-[#0A2540]/60 max-w-lg mx-auto">
            Whether you&apos;re looking to acquire users or monetize your app, 
            we&apos;d love to explore how we can work together.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {isSubmitted ? (
            <div className="text-center py-16 border border-[#0A2540]/10">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center text-[#1E40AF]">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-[#0A2540] mb-2">Thank You</h3>
              <p className="text-[#0A2540]/60">We&apos;ll be in touch within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-xs font-medium tracking-wide text-[#0A2540]/60 uppercase mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-transparent border border-[#0A2540]/10 text-[#0A2540] placeholder:text-[#0A2540]/30 focus:border-[#1E40AF] focus:outline-none transition-colors"
                    placeholder="John Smith"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block text-xs font-medium tracking-wide text-[#0A2540]/60 uppercase mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.company}
                    onChange={(e) => setFormState(prev => ({ ...prev, company: e.target.value }))}
                    className="w-full px-4 py-3 bg-transparent border border-[#0A2540]/10 text-[#0A2540] placeholder:text-[#0A2540]/30 focus:border-[#1E40AF] focus:outline-none transition-colors"
                    placeholder="Company Inc."
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Email */}
                <div>
                  <label className="block text-xs font-medium tracking-wide text-[#0A2540]/60 uppercase mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 bg-transparent border border-[#0A2540]/10 text-[#0A2540] placeholder:text-[#0A2540]/30 focus:border-[#1E40AF] focus:outline-none transition-colors"
                    placeholder="john@company.com"
                  />
                </div>

                {/* Interest */}
                <div>
                  <label className="block text-xs font-medium tracking-wide text-[#0A2540]/60 uppercase mb-2">
                    Interest
                  </label>
                  <select
                    required
                    value={formState.interest}
                    onChange={(e) => setFormState(prev => ({ ...prev, interest: e.target.value }))}
                    className="w-full px-4 py-3 bg-transparent border border-[#0A2540]/10 text-[#0A2540] focus:border-[#1E40AF] focus:outline-none transition-colors appearance-none cursor-pointer"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%230A2540' stroke-width='1.5'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px' }}
                  >
                    <option value="">Select an option</option>
                    <option value="gaming-ua">Gaming User Acquisition</option>
                    <option value="inapp-ua">In-App User Acquisition</option>
                    <option value="monetization">Publisher Monetization</option>
                    <option value="partnership">Strategic Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-medium tracking-wide text-[#0A2540]/60 uppercase mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-3 bg-transparent border border-[#0A2540]/10 text-[#0A2540] placeholder:text-[#0A2540]/30 focus:border-[#1E40AF] focus:outline-none transition-colors resize-none"
                  placeholder="Tell us about your goals..."
                />
              </div>

              {/* Submit */}
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group inline-flex items-center gap-3 px-10 py-4 bg-[#0A2540] text-white text-sm font-medium tracking-wide hover:bg-[#1E40AF] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg 
                        className="w-4 h-4 transition-transform group-hover:translate-x-1" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>

        {/* Alternative contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-[#0A2540]/40">
            Prefer email?{' '}
            <a href="mailto:hello@manyboost.io" className="text-[#1E40AF] hover:text-[#0A2540] transition-colors">
              hello@manyboost.io
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
