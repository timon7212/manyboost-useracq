"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  created_at: string;
}

export function CareersSection() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const departmentColors: Record<string, string> = {
    Engineering: "#22c55e",
    Growth: "#e97714",
    Design: "#a78bfa",
    Operations: "#38bdf8",
    Marketing: "#f472b6",
  };

  return (
    <section className="py-20 md:py-28 px-4">
      <div className="max-w-[840px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-[36px] sm:text-[44px] md:text-[56px] tracking-[-0.05em] leading-[0.9] mb-4 font-medium">
            <span className="text-white">Join the </span>
            <span className="text-[#e97714]">team</span>
          </h2>
          <p className="text-[17px] text-[#666] max-w-[500px] mx-auto">
            We&apos;re building the future of creator-driven user acquisition. Come build with us.
          </p>
        </motion.div>

        {/* Jobs list */}
        <div className="space-y-4">
          {loading ? (
            // Loading skeleton
            [...Array(3)].map((_, i) => (
              <div
                key={i}
                className="rounded-[16px] bg-[#0a0a0a] border border-[#1a1a1a] p-6 animate-pulse"
              >
                <div className="h-6 bg-[#1a1a1a] rounded w-1/3 mb-3" />
                <div className="h-4 bg-[#1a1a1a] rounded w-1/2" />
              </div>
            ))
          ) : jobs.length === 0 ? (
            // No jobs
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 rounded-full bg-[#1a1a1a] flex items-center justify-center mx-auto mb-4">
                <span className="text-[28px]">🚀</span>
              </div>
              <h3 className="text-[20px] font-medium text-white mb-2">
                No open positions right now
              </h3>
              <p className="text-[15px] text-[#666] max-w-[400px] mx-auto">
                We&apos;re always looking for talented people. Send your resume to{" "}
                <a href="mailto:careers@manyboost.io" className="text-[#e97714] hover:underline">
                  careers@manyboost.io
                </a>
              </p>
            </motion.div>
          ) : (
            // Jobs list
            jobs.map((job, index) => (
              <motion.a
                key={job.id}
                href={`mailto:careers@manyboost.io?subject=Application: ${job.title}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="block rounded-[16px] p-[1px] group"
                style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)' }}
              >
                <div className="bg-[#0a0a0a] rounded-[15px] p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group-hover:bg-[#0f0f0f] transition-colors">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-[18px] md:text-[20px] font-medium text-white">
                        {job.title}
                      </h3>
                      <span
                        className="px-2 py-0.5 rounded-full text-[11px] font-medium"
                        style={{
                          backgroundColor: `${departmentColors[job.department] || "#666"}20`,
                          color: departmentColors[job.department] || "#666",
                        }}
                      >
                        {job.department}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-[13px] text-[#666]">
                      <span className="flex items-center gap-1">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                          <circle cx="12" cy="10" r="3"/>
                        </svg>
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                        </svg>
                        {job.type}
                      </span>
                    </div>
                    {job.description && (
                      <p className="text-[14px] text-[#555] mt-3 line-clamp-2">
                        {job.description}
                      </p>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] group-hover:bg-[#e97714]/10 rounded-full text-[13px] text-[#999] group-hover:text-[#e97714] transition-colors">
                      Apply
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </span>
                  </div>
                </div>
              </motion.a>
            ))
          )}
        </div>

        {/* General application */}
        {jobs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 text-center"
          >
            <p className="text-[14px] text-[#555]">
              Don&apos;t see your role?{" "}
              <a href="mailto:careers@manyboost.io" className="text-[#e97714] hover:underline">
                Send us your resume anyway
              </a>
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

