'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const leaders = [
  {
    name: 'Alex Volkov',
    role: 'Chief Executive Officer',
    bio: '7+ years in mobile user acquisition. Previously led growth at top gaming studios.',
    image: '/team/ceo.jpg',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Maria Chen',
    role: 'Chief Technology Officer',
    bio: 'Engineering leader with deep expertise in ad tech infrastructure and real-time bidding systems.',
    image: '/team/cto.jpg',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'David Park',
    role: 'VP of Partnerships',
    bio: 'Built strategic partnerships with 100+ publishers and advertisers across global markets.',
    image: '/team/vp.jpg',
    linkedin: 'https://linkedin.com',
  },
];

export function CorporateLeadership() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 bg-[#FAFBFC]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 text-xs font-medium tracking-[0.2em] uppercase text-[#0A2540]/40 mb-6">
            Our Team
          </span>
          <h2 
            className="font-serif text-4xl md:text-5xl text-[#0A2540] tracking-[-0.02em]"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Leadership
          </h2>
        </motion.div>

        {/* Leaders grid */}
        <div className="grid md:grid-cols-3 gap-12">
          {leaders.map((leader, index) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.15 }}
              className="text-center group"
            >
              {/* Photo placeholder */}
              <div className="relative w-48 h-48 mx-auto mb-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0A2540] to-[#1E40AF] opacity-10" />
                {/* Placeholder with initials */}
                <div className="absolute inset-0 flex items-center justify-center bg-[#0A2540]/5 border border-[#0A2540]/10">
                  <span className="text-4xl font-serif text-[#0A2540]/20" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {leader.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                {/* Gold corner accent */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#C9A962] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#C9A962] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Name */}
              <h3 className="text-xl font-medium text-[#0A2540] mb-1">
                {leader.name}
              </h3>

              {/* Role */}
              <p className="text-sm text-[#C9A962] font-medium tracking-wide mb-4">
                {leader.role}
              </p>

              {/* Bio */}
              <p className="text-sm text-[#0A2540]/60 leading-relaxed mb-6 max-w-xs mx-auto">
                {leader.bio}
              </p>

              {/* LinkedIn */}
              <a
                href={leader.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#0A2540]/40 hover:text-[#1E40AF] transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span>Connect</span>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Join us callout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 border border-[#0A2540]/10">
            <span className="text-sm text-[#0A2540]/60">Interested in joining our team?</span>
            <a
              href="mailto:careers@manyboost.io"
              className="text-sm font-medium text-[#1E40AF] hover:text-[#0A2540] transition-colors"
            >
              View Careers →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
