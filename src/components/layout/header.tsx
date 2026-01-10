"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

// Contact Modal Component
function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    
    // Simulate sending (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Open mailto as fallback
    const subject = encodeURIComponent(`New inquiry from ${form.name} - ${form.company}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\n\nMessage:\n${form.message}`);
    window.location.href = `mailto:sales@manyboost.io?subject=${subject}&body=${body}`;
    
    setSending(false);
    setSent(true);
    setTimeout(() => {
      onClose();
      setSent(false);
      setForm({ name: "", email: "", company: "", message: "" });
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[480px] z-[101] px-4"
          >
            <div 
              className="rounded-[24px] p-[1px]"
              style={{ background: 'linear-gradient(135deg, #e97714 0%, #333 50%, #e97714 100%)' }}
            >
              <div className="bg-[#0a0a0a] rounded-[23px] p-6 md:p-8">
                {/* Close button */}
                <button 
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-[#1a1a1a] hover:bg-[#222] transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                </button>

                {sent ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-[#22c55e]/10 flex items-center justify-center mx-auto mb-4">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                    </div>
                    <h3 className="text-[20px] font-medium text-white mb-2">Message sent!</h3>
                    <p className="text-[14px] text-[#666]">We&apos;ll get back to you soon.</p>
                  </div>
                ) : (
                  <>
                    <h2 className="text-[24px] md:text-[28px] font-medium text-white mb-2">
                      Get in touch
                    </h2>
                    <p className="text-[14px] text-[#666] mb-6">
                      Tell us about your needs and we&apos;ll reach out within 24 hours.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[12px] text-[#666] mb-1.5">Name *</label>
                          <input
                            type="text"
                            required
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full px-4 py-3 bg-[#111] border border-[#222] rounded-[12px] text-white text-[14px] focus:outline-none focus:border-[#e97714] transition-colors"
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label className="block text-[12px] text-[#666] mb-1.5">Company</label>
                          <input
                            type="text"
                            value={form.company}
                            onChange={(e) => setForm({ ...form, company: e.target.value })}
                            className="w-full px-4 py-3 bg-[#111] border border-[#222] rounded-[12px] text-white text-[14px] focus:outline-none focus:border-[#e97714] transition-colors"
                            placeholder="Company name"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[12px] text-[#666] mb-1.5">Email *</label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full px-4 py-3 bg-[#111] border border-[#222] rounded-[12px] text-white text-[14px] focus:outline-none focus:border-[#e97714] transition-colors"
                          placeholder="john@company.com"
                        />
                      </div>

                      <div>
                        <label className="block text-[12px] text-[#666] mb-1.5">Message *</label>
                        <textarea
                          required
                          rows={4}
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          className="w-full px-4 py-3 bg-[#111] border border-[#222] rounded-[12px] text-white text-[14px] focus:outline-none focus:border-[#e97714] transition-colors resize-none"
                          placeholder="Tell us about your goals..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={sending}
                        className="w-full py-3.5 bg-[#e97714] hover:bg-[#d16a10] disabled:opacity-50 text-black font-semibold rounded-full text-[15px] transition-colors"
                      >
                        {sending ? "Sending..." : "Send message"}
                      </button>

                      <p className="text-[12px] text-[#444] text-center">
                        Or email us directly at{" "}
                        <a href="mailto:sales@manyboost.io" className="text-[#e97714] hover:underline">
                          sales@manyboost.io
                        </a>
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Advertisers", description: "UA Campaigns" },
    { href: "/creators", label: "Creators", description: "Earn Money" },
    { href: "/offerwall", label: "Publishers", description: "Monetize" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* Glass background */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xl border-b border-white/5" />
        
        <div className="relative max-w-[1200px] mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group">
            <span 
              className="text-[20px] font-medium tracking-[-0.03em]"
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <div className="flex items-center bg-[#111] rounded-full p-1 border border-[#1a1a1a]">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-5 py-2 rounded-full text-[13px] font-medium transition-all ${
                    isActive(item.href)
                      ? "text-white bg-[#1a1a1a]"
                      : "text-[#888] hover:text-white"
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-[#1a1a1a] rounded-full -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              ))}
            </div>
          </nav>

          {/* Right side: Socials + CTA */}
          <div className="flex items-center gap-3">
            {/* Social links - Desktop */}
            <div className="hidden sm:flex items-center gap-1">
              <a
                href="https://linkedin.com/company/manyboost"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#1a1a1a] transition-colors group"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#666" className="group-hover:fill-white transition-colors">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com/manyboost.io"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#1a1a1a] transition-colors group"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#666" className="group-hover:fill-white transition-colors">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-6 bg-[#222]" />

            {/* CTA Button */}
            <button
              onClick={() => setContactOpen(true)}
              className="px-5 py-2.5 bg-[#e97714] hover:bg-[#d16a10] text-black font-semibold rounded-full text-[13px] transition-colors shadow-lg shadow-[#e97714]/20"
            >
              Contact us
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#1a1a1a] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                {mobileMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12"/>
                ) : (
                  <path d="M3 12h18M3 6h18M3 18h18"/>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden relative bg-[#0a0a0a] border-t border-[#1a1a1a]"
            >
              <nav className="px-4 py-4 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-[12px] transition-colors ${
                      isActive(item.href)
                        ? "bg-[#1a1a1a] text-white"
                        : "text-[#888] hover:bg-[#111] hover:text-white"
                    }`}
                  >
                    <span className="font-medium">{item.label}</span>
                    <span className="text-[12px] text-[#555]">{item.description}</span>
                  </Link>
                ))}
                
                {/* Mobile socials */}
                <div className="flex items-center gap-2 px-4 pt-4 border-t border-[#1a1a1a] mt-4">
                  <a
                    href="https://linkedin.com/company/manyboost"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#111] rounded-[12px] text-[13px] text-[#888]"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    LinkedIn
                  </a>
                  <a
                    href="https://instagram.com/manyboost.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#111] rounded-[12px] text-[13px] text-[#888]"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    Instagram
                  </a>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Contact Modal */}
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
