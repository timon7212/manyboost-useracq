"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Lead {
  id: number;
  type: string;
  name: string;
  email: string;
  company: string | null;
  message: string | null;
  followers: string | null;
  monthly_traffic: string | null;
  budget: string | null;
  created_at: string;
  status: string;
}

const statusColors: Record<string, { bg: string; text: string }> = {
  new: { bg: "#e97714", text: "#000" },
  contacted: { bg: "#3b82f6", text: "#fff" },
  qualified: { bg: "#22c55e", text: "#000" },
  closed: { bg: "#666", text: "#fff" },
};

const typeColors: Record<string, string> = {
  creator: "#22c55e",
  publisher: "#a78bfa",
  advertiser: "#e97714",
};

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [filter, setFilter] = useState<string>("all");

  // Simple password check (in production use proper auth)
  const ADMIN_PASSWORD = "manyboost2024";

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
      fetchLeads();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await fetch("/api/leads");
      const data = await res.json();
      setLeads(data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_auth", "true");
      setIsAuthenticated(true);
      fetchLeads();
    } else {
      alert("Incorrect password");
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
    } catch (error) {
      console.error("Error updating lead:", error);
    }
  };

  const filteredLeads = filter === "all" 
    ? leads 
    : leads.filter(l => l.type === filter);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-[360px]"
        >
          <div className="rounded-[20px] p-[1px]" style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #333 100%)' }}>
            <div className="bg-[#0a0a0a] rounded-[19px] p-6">
              <h1 className="text-[24px] font-medium text-white mb-2">Admin Login</h1>
              <p className="text-[14px] text-[#666] mb-6">Enter password to access leads</p>
              
              <form onSubmit={handleLogin}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-3 bg-[#111] border border-[#222] rounded-[12px] text-white text-[14px] focus:outline-none focus:border-[#e97714] transition-colors mb-4"
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-[#e97714] hover:bg-[#d16a10] text-black font-semibold rounded-full text-[14px] transition-colors"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-[#1a1a1a] px-6 py-4">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-[22px] font-medium">Leads Dashboard</h1>
            <p className="text-[13px] text-[#666]">{leads.length} total leads</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-[#1a1a1a] hover:bg-[#222] rounded-full text-[13px] text-[#888] transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-6 py-8">
        {/* Filters */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          {["all", "advertiser", "creator", "publisher"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-[13px] font-medium transition-colors whitespace-nowrap ${
                filter === f
                  ? "bg-[#e97714] text-black"
                  : "bg-[#1a1a1a] text-[#888] hover:text-white"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f !== "all" && (
                <span className="ml-1.5 opacity-60">
                  ({leads.filter(l => l.type === f).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Leads table */}
        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-[#111] rounded-[12px] animate-pulse" />
            ))}
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-[#1a1a1a] flex items-center justify-center mx-auto mb-4">
              <span className="text-[28px]">📭</span>
            </div>
            <h3 className="text-[18px] font-medium mb-1">No leads yet</h3>
            <p className="text-[14px] text-[#666]">Leads will appear here when people submit forms</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredLeads.map((lead, index) => (
              <motion.div
                key={lead.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-[#0c0c0c] border border-[#1a1a1a] rounded-[16px] p-5"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-[17px] font-medium">{lead.name}</h3>
                      <span
                        className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase"
                        style={{
                          backgroundColor: typeColors[lead.type] || "#666",
                          color: "#000",
                        }}
                      >
                        {lead.type}
                      </span>
                      <span
                        className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                        style={{
                          backgroundColor: statusColors[lead.status]?.bg || "#666",
                          color: statusColors[lead.status]?.text || "#fff",
                        }}
                      >
                        {lead.status}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-[#666] mb-3">
                      <a href={`mailto:${lead.email}`} className="hover:text-[#e97714] transition-colors">
                        {lead.email}
                      </a>
                      {lead.company && <span>{lead.company}</span>}
                      <span>{new Date(lead.created_at).toLocaleDateString()}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 text-[12px]">
                      {lead.followers && (
                        <span className="px-2 py-1 bg-[#1a1a1a] rounded-md">
                          Followers: {lead.followers}
                        </span>
                      )}
                      {lead.monthly_traffic && (
                        <span className="px-2 py-1 bg-[#1a1a1a] rounded-md">
                          MAU: {lead.monthly_traffic}
                        </span>
                      )}
                      {lead.budget && (
                        <span className="px-2 py-1 bg-[#1a1a1a] rounded-md">
                          Budget: {lead.budget}
                        </span>
                      )}
                    </div>

                    {lead.message && (
                      <p className="text-[13px] text-[#888] mt-3 bg-[#0f0f0f] rounded-[8px] p-3">
                        {lead.message}
                      </p>
                    )}
                  </div>

                  <div className="flex md:flex-col gap-2">
                    <select
                      value={lead.status}
                      onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                      className="px-3 py-2 bg-[#1a1a1a] border border-[#222] rounded-[8px] text-[12px] focus:outline-none focus:border-[#e97714] transition-colors"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="qualified">Qualified</option>
                      <option value="closed">Closed</option>
                    </select>
                    <a
                      href={`mailto:${lead.email}?subject=ManyBoost - Following up on your request`}
                      className="px-4 py-2 bg-[#e97714] hover:bg-[#d16a10] text-black font-medium rounded-[8px] text-[12px] text-center transition-colors"
                    >
                      Email
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
