"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { LeadModal } from "@/components/ui/lead-modal";

type NavItem = {
  href?: string;
  label: string;
  children?: { href: string; label: string; desc: string }[];
};

const navItems: NavItem[] = [
  { href: "/", label: "Company" },
  { href: "/offerwall", label: "Gaming UA" },
  { href: "/dsp", label: "In-App UA" },
  {
    label: "Monetize",
    children: [
      { href: "/creators", label: "Creators", desc: "Earn from your audience" },
      { href: "/publishers", label: "Publishers", desc: "SDK monetization" },
    ],
  },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getLeadType = (): "creator" | "publisher" | "advertiser" => {
    if (pathname === "/creators") return "creator";
    if (pathname === "/publishers" || pathname === "/offerwall") return "publisher";
    return "advertiser";
  };

  const isActive = (href?: string) => href && pathname === href;
  const isMonetizeActive = pathname === "/creators" || pathname === "/publishers";

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div
          className="absolute inset-0 backdrop-blur-2xl border-b border-white/[0.04]"
          style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.75) 100%)" }}
        />

        <div className="relative max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group relative z-10">
            <motion.span
              className="text-[20px] font-semibold tracking-[-0.02em]"
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #e97714 50%, #ffffff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              manyboost
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-1 bg-[#0a0a0a]/80 rounded-full p-1.5 border border-[#1a1a1a]">
              {navItems.map((item) =>
                item.children ? (
                  <div key={item.label} className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className={`relative px-5 py-2 rounded-full text-[13px] font-medium transition-all duration-200 flex items-center gap-1.5 ${
                        isMonetizeActive ? "text-white" : "text-[#777] hover:text-white"
                      }`}
                    >
                      {item.label}
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="currentColor"
                        className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                      >
                        <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.5" fill="none" />
                      </svg>
                      {isMonetizeActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 rounded-full -z-10 bg-[#1a1a1a]"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                        />
                      )}
                    </button>

                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[220px] p-2 rounded-2xl bg-[#0a0a0a] border border-[#1a1a1a] shadow-xl shadow-black/50"
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setDropdownOpen(false)}
                              className={`block px-4 py-3 rounded-xl transition-colors ${
                                pathname === child.href
                                  ? "bg-[#1a1a1a] text-white"
                                  : "text-[#888] hover:bg-[#111] hover:text-white"
                              }`}
                            >
                              <div className="text-[13px] font-medium">{child.label}</div>
                              <div className="text-[11px] text-[#555] mt-0.5">{child.desc}</div>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href!}
                    className={`relative px-5 py-2 rounded-full text-[13px] font-medium transition-all duration-200 ${
                      isActive(item.href) ? "text-white" : "text-[#777] hover:text-white"
                    }`}
                  >
                    {item.label}
                    {isActive(item.href) && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-full -z-10 bg-[#1a1a1a]"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                  </Link>
                )
              )}
            </div>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-1">
              <motion.a
                href="https://www.linkedin.com/company/110627158"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="#555" className="group-hover:fill-[#e97714] transition-colors">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </motion.a>
            </div>

            <div className="hidden lg:block w-px h-4 bg-[#222]" />

            <motion.button
              onClick={() => setLeadModalOpen(true)}
              className="px-5 py-2 bg-[#e97714] hover:bg-[#d56a10] text-white font-medium rounded-full text-[13px] transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Contact us
            </motion.button>

            {/* Mobile menu button */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors"
              whileTap={{ scale: 0.9 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                {mobileMenuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
              </svg>
            </motion.button>
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
                {navItems.map((item) =>
                  item.children ? (
                    <div key={item.label}>
                      <div className="px-4 py-2 text-[12px] text-[#555] uppercase tracking-[0.1em]">{item.label}</div>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
                            pathname === child.href
                              ? "bg-[#1a1a1a] text-white"
                              : "text-[#888] hover:bg-[#111] hover:text-white"
                          }`}
                        >
                          <span className="font-medium">{child.label}</span>
                          <span className="text-[11px] text-[#555]">{child.desc}</span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href!}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center px-4 py-3 rounded-xl transition-colors ${
                        isActive(item.href)
                          ? "bg-[#1a1a1a] text-white"
                          : "text-[#888] hover:bg-[#111] hover:text-white"
                      }`}
                    >
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  )
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <LeadModal isOpen={leadModalOpen} onClose={() => setLeadModalOpen(false)} type={getLeadType()} />
    </>
  );
}
