"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
}

const departmentColors: Record<string, string> = {
  Engineering: "#22c55e",
  Growth: "#e97714",
  Design: "#a78bfa",
  Operations: "#38bdf8",
  Marketing: "#f472b6",
  Product: "#facc15",
};

export function TeamSection() {
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

  return (
    <section className="py-20 md:py-28 px-4 bg-[#050505]">
      <div className="max-w-[840px] mx-auto">
        
        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-[24px] p-[1px]"
          style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #333 30%, #1a1a1a 70%, #333 100%)' }}
        >
          <div className="bg-[#080808] rounded-[23px] overflow-hidden">
            
            {/* Hero with photo and text overlay */}
            <div className="relative h-[280px] md:h-[320px] bg-[#111]">
              {/* Team photo - temporary crowd image */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ 
                  backgroundImage: 'url(https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80)',
                  backgroundColor: '#1a1a1a'
                }}
              />
              
              {/* Gradient overlay - right on desktop, bottom on mobile */}
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#080808] via-[#080808]/60 to-transparent" />
              
              {/* Text overlay */}
              <div className="absolute inset-0 flex items-end md:items-center p-6 md:p-10">
                <h2 className="text-[32px] sm:text-[40px] md:text-[48px] tracking-[-0.04em] leading-[0.95] font-medium">
                  <span className="text-white">We&apos;re </span>
                  <span className="text-[#e97714]">building</span>
                  <br />
                  <span className="text-[#888] font-light">something big.</span>
                </h2>
              </div>
            </div>
            
            {/* Jobs section */}
            <div className="p-5 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
                  <h3 className="text-[16px] font-medium text-white">Open roles</h3>
                </div>
                {jobs.length > 0 && (
                  <span className="text-[12px] text-[#555]">{jobs.length} positions</span>
                )}
              </div>
              
              {loading ? (
                <div className="space-y-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-14 bg-[#111] rounded-[10px] animate-pulse" />
                  ))}
                </div>
              ) : jobs.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-[13px] text-[#555] mb-2">No open positions</p>
                  <a href="mailto:careers@manyboost.io" className="text-[13px] text-[#e97714] hover:underline">
                    Send resume anyway →
                  </a>
                </div>
              ) : (
                <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1 scrollbar-thin">
                  {jobs.map((job) => (
                    <a
                      key={job.id}
                      href={`mailto:careers@manyboost.io?subject=Application: ${job.title}`}
                      className="flex items-center justify-between p-3.5 bg-[#0c0c0c] hover:bg-[#111] border border-[#1a1a1a] rounded-[10px] group transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: departmentColors[job.department] || "#666" }}
                        />
                        <div>
                          <h4 className="text-[14px] font-medium text-white group-hover:text-[#e97714] transition-colors">
                            {job.title}
                          </h4>
                          <p className="text-[11px] text-[#555]">
                            {job.location} · {job.type}
                          </p>
                        </div>
                      </div>
                      <svg 
                        width="14" height="14" viewBox="0 0 24 24" fill="none" 
                        stroke="#444" strokeWidth="2"
                        className="group-hover:stroke-[#e97714] group-hover:translate-x-0.5 transition-all flex-shrink-0"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

