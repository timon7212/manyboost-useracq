"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type LeadType = "creator" | "publisher" | "advertiser";

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: LeadType;
}

const modalConfig: Record<LeadType, {
  title: string;
  subtitle: string;
  color: string;
  fields: Array<{
    name: string;
    label: string;
    type: string;
    placeholder: string;
    required?: boolean;
  }>;
}> = {
  creator: {
    title: "Join as Creator",
    subtitle: "Start earning by sharing games you love",
    color: "#22c55e",
    fields: [
      { name: "name", label: "Your name", type: "text", placeholder: "John Doe", required: true },
      { name: "email", label: "Email", type: "email", placeholder: "john@gmail.com", required: true },
      { name: "followers", label: "Total followers", type: "text", placeholder: "50K, 100K, 1M+" },
      { name: "message", label: "Main platform", type: "text", placeholder: "TikTok, Instagram, YouTube" },
    ],
  },
  publisher: {
    title: "Monetize Your App",
    subtitle: "Integrate offerwall and boost revenue",
    color: "#a78bfa",
    fields: [
      { name: "name", label: "Your name", type: "text", placeholder: "John Doe", required: true },
      { name: "email", label: "Work email", type: "email", placeholder: "john@company.com", required: true },
      { name: "company", label: "Company / App name", type: "text", placeholder: "My App Inc." },
      { name: "monthly_traffic", label: "Monthly active users", type: "text", placeholder: "100K, 1M, 10M+" },
    ],
  },
  advertiser: {
    title: "Launch a Campaign",
    subtitle: "Acquire high-LTV users via creators",
    color: "#e97714",
    fields: [
      { name: "name", label: "Your name", type: "text", placeholder: "John Doe", required: true },
      { name: "email", label: "Work email", type: "email", placeholder: "john@company.com", required: true },
      { name: "company", label: "Company / App name", type: "text", placeholder: "Game Studio Inc." },
      { name: "budget", label: "Monthly UA budget", type: "text", placeholder: "$10K, $50K, $100K+" },
      { name: "message", label: "Tell us about your goals", type: "textarea", placeholder: "We want to acquire..." },
    ],
  },
};

export function LeadModal({ isOpen, onClose, type }: LeadModalProps) {
  const config = modalConfig[type];
  const [form, setForm] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, ...form }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      setSent(true);
      setTimeout(() => {
        onClose();
        setSent(false);
        setForm({});
      }, 2500);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
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
              style={{
                background: `linear-gradient(135deg, ${config.color} 0%, #333 50%, ${config.color} 100%)`,
              }}
            >
              <div className="bg-[#0a0a0a] rounded-[23px] p-6 md:p-8 relative">
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-[#1a1a1a] hover:bg-[#222] transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>

                {sent ? (
                  <div className="text-center py-8">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: `${config.color}15` }}
                    >
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={config.color} strokeWidth="2">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <h3 className="text-[20px] font-medium text-white mb-2">We got your request!</h3>
                    <p className="text-[14px] text-[#666]">We&apos;ll reach out within 24 hours.</p>
                  </div>
                ) : (
                  <>
                    {/* Header with color accent */}
                    <div className="flex items-center gap-3 mb-6">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${config.color}20` }}
                      >
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: config.color }}
                        />
                      </div>
                      <div>
                        <h2 className="text-[22px] md:text-[26px] font-medium text-white">
                          {config.title}
                        </h2>
                        <p className="text-[13px] text-[#666]">{config.subtitle}</p>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {config.fields.map((field) => (
                        <div key={field.name}>
                          <label className="block text-[12px] text-[#666] mb-1.5">
                            {field.label} {field.required && "*"}
                          </label>
                          {field.type === "textarea" ? (
                            <textarea
                              required={field.required}
                              rows={3}
                              value={form[field.name] || ""}
                              onChange={(e) => handleChange(field.name, e.target.value)}
                              className="w-full px-4 py-3 bg-[#111] border border-[#222] rounded-[12px] text-white text-[14px] focus:outline-none focus:border-[#e97714] transition-colors resize-none"
                              placeholder={field.placeholder}
                            />
                          ) : (
                            <input
                              type={field.type}
                              required={field.required}
                              value={form[field.name] || ""}
                              onChange={(e) => handleChange(field.name, e.target.value)}
                              className="w-full px-4 py-3 bg-[#111] border border-[#222] rounded-[12px] text-white text-[14px] focus:outline-none focus:border-[#e97714] transition-colors"
                              placeholder={field.placeholder}
                            />
                          )}
                        </div>
                      ))}

                      {error && (
                        <p className="text-[13px] text-red-500 text-center">{error}</p>
                      )}

                      <button
                        type="submit"
                        disabled={sending}
                        className="w-full py-3.5 text-black font-semibold rounded-full text-[15px] transition-colors disabled:opacity-50"
                        style={{ backgroundColor: config.color }}
                      >
                        {sending ? "Submitting..." : "Submit request"}
                      </button>

                      <p className="text-[12px] text-[#444] text-center">
                        Or email us at{" "}
                        <a href="mailto:busdev@manyboost.io" className="text-[#e97714] hover:underline">
                          busdev@manyboost.io
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
