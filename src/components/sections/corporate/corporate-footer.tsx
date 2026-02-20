'use client';

import Link from 'next/link';

export function CorporateFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-16 bg-[#0A2540] text-white/80">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/corporate" className="inline-block mb-6">
              <span 
                className="text-2xl font-serif text-white"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                ManyBoost
              </span>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed">
              User Acquisition Technology Company
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-medium tracking-[0.15em] uppercase text-[#C9A962] mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/offerwall" className="text-sm text-white/60 hover:text-white transition-colors">
                  Gaming UA
                </Link>
              </li>
              <li>
                <Link href="/dsp" className="text-sm text-white/60 hover:text-white transition-colors">
                  In-App UA
                </Link>
              </li>
              <li>
                <Link href="/publishers" className="text-sm text-white/60 hover:text-white transition-colors">
                  Publisher Solutions
                </Link>
              </li>
              <li>
                <Link href="/creators" className="text-sm text-white/60 hover:text-white transition-colors">
                  Creator Network
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-medium tracking-[0.15em] uppercase text-[#C9A962] mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/corporate#services" className="text-sm text-white/60 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <a href="mailto:careers@manyboost.io" className="text-sm text-white/60 hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a 
                  href="https://www.linkedin.com/company/manyboost/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-medium tracking-[0.15em] uppercase text-[#C9A962] mb-6">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:hello@manyboost.io" className="text-sm text-white/60 hover:text-white transition-colors">
                  hello@manyboost.io
                </a>
              </li>
              <li>
                <Link href="/corporate#contact" className="text-sm text-white/60 hover:text-white transition-colors">
                  Get in Touch
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">
            © {currentYear} ManyBoost. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-white/40 hover:text-white/60 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-white/40 hover:text-white/60 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
