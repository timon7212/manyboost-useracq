"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[#1a1a1a] bg-black">
      <div className="max-w-[1200px] mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-6 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span
                className="text-[22px] font-medium tracking-[-0.03em]"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #e97714 50%, #ffffff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                manyboost.io
              </span>
            </Link>
            <p className="text-[14px] text-[#666] leading-[1.6] max-w-[280px] mb-6">
              Creator-driven user acquisition for mobile games. High-LTV users through gamified campaigns.
            </p>
            
            {/* Social links */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/110627158"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#111] hover:bg-[#1a1a1a] transition-colors group"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#666" className="group-hover:fill-white transition-colors">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com/manyboost.io"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#111] hover:bg-[#1a1a1a] transition-colors group"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#666" className="group-hover:fill-white transition-colors">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-[13px] font-medium text-white uppercase tracking-[0.1em] mb-4">Products</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-[14px] text-[#666] hover:text-white transition-colors">
                  For Advertisers
                </Link>
              </li>
              {/* <li>
                <Link href="/creators" className="text-[14px] text-[#666] hover:text-white transition-colors">
                  For Creators
                </Link>
              </li> */}
              <li>
                <Link href="/offerwall" className="text-[14px] text-[#666] hover:text-white transition-colors">
                  For Publishers
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[13px] font-medium text-white uppercase tracking-[0.1em] mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:busdev@manyboost.io" className="text-[14px] text-[#666] hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="mailto:careers@manyboost.io" className="text-[14px] text-[#666] hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/110627158" target="_blank" rel="noopener noreferrer" className="text-[14px] text-[#666] hover:text-white transition-colors">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[13px] font-medium text-white uppercase tracking-[0.1em] mb-4">Get in touch</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:busdev@manyboost.io" className="text-[14px] text-[#e97714] hover:underline">
                  busdev@manyboost.io
                </a>
              </li>
              <li>
                <span className="text-[14px] text-[#666]">Dubai, UAE</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#1a1a1a] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-[#555]">
            © {new Date().getFullYear()} ManyBoost. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[13px] text-[#555] hover:text-[#888] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-[13px] text-[#555] hover:text-[#888] transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
