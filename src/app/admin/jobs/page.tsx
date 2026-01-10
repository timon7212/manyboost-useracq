"use client";

import { useState, useEffect } from "react";

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string | null;
  created_at: string;
  is_active: number;
}

const ADMIN_KEY = "manyboost-admin-2024";

const departments = ["Engineering", "Growth", "Design", "Operations", "Marketing", "Product"];
const locations = ["Remote", "San Francisco", "New York", "London", "Berlin"];
const types = ["Full-time", "Part-time", "Contract", "Internship"];

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  
  const [form, setForm] = useState({
    title: "",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "",
  });

  const fetchJobs = async () => {
    try {
      const res = await fetch("/api/jobs");
      const data = await res.json();
      setJobs(data);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingJob ? `/api/jobs/${editingJob.id}` : "/api/jobs";
      const method = editingJob ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": ADMIN_KEY,
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setForm({ title: "", department: "Engineering", location: "Remote", type: "Full-time", description: "" });
        setShowForm(false);
        setEditingJob(null);
        fetchJobs();
      } else {
        alert("Failed to save job");
      }
    } catch (error) {
      console.error("Error saving job:", error);
      alert("Failed to save job");
    }
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setForm({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      description: job.description || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this job?")) return;
    
    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: "DELETE",
        headers: { "x-admin-key": ADMIN_KEY },
      });

      if (res.ok) {
        fetchJobs();
      } else {
        alert("Failed to delete job");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Failed to delete job");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Jobs Admin</h1>
            <p className="text-[#666] mt-1">Manage job listings</p>
          </div>
          <button
            onClick={() => {
              setEditingJob(null);
              setForm({ title: "", department: "Engineering", location: "Remote", type: "Full-time", description: "" });
              setShowForm(true);
            }}
            className="px-5 py-2.5 bg-[#e97714] hover:bg-[#d16a10] text-black font-medium rounded-lg transition-colors"
          >
            + Add Job
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-[#111] rounded-2xl p-6 w-full max-w-lg">
              <h2 className="text-xl font-bold mb-6">
                {editingJob ? "Edit Job" : "Add New Job"}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-[#999] mb-1.5">Job Title *</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-[#333] rounded-lg focus:outline-none focus:border-[#e97714] text-white"
                    placeholder="e.g. Senior Frontend Engineer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[#999] mb-1.5">Department *</label>
                    <select
                      value={form.department}
                      onChange={(e) => setForm({ ...form, department: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-[#333] rounded-lg focus:outline-none focus:border-[#e97714] text-white"
                    >
                      {departments.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-[#999] mb-1.5">Location *</label>
                    <select
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-[#333] rounded-lg focus:outline-none focus:border-[#e97714] text-white"
                    >
                      {locations.map((l) => (
                        <option key={l} value={l}>{l}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-[#999] mb-1.5">Type *</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-[#333] rounded-lg focus:outline-none focus:border-[#e97714] text-white"
                  >
                    {types.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-[#999] mb-1.5">Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-[#333] rounded-lg focus:outline-none focus:border-[#e97714] text-white resize-none"
                    placeholder="Brief job description..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingJob(null);
                    }}
                    className="flex-1 px-4 py-2.5 bg-[#1a1a1a] hover:bg-[#222] text-white font-medium rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 bg-[#e97714] hover:bg-[#d16a10] text-black font-medium rounded-lg transition-colors"
                  >
                    {editingJob ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Jobs List */}
        <div className="space-y-3">
          {loading ? (
            <div className="text-center py-12 text-[#666]">Loading...</div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#666]">No jobs yet. Click &quot;Add Job&quot; to create one.</p>
            </div>
          ) : (
            jobs.map((job) => (
              <div
                key={job.id}
                className="bg-[#111] border border-[#1a1a1a] rounded-xl p-5 flex items-center justify-between gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-white truncate">{job.title}</h3>
                    <span className="px-2 py-0.5 bg-[#1a1a1a] rounded text-xs text-[#999]">
                      {job.department}
                    </span>
                  </div>
                  <p className="text-sm text-[#666]">
                    {job.location} • {job.type}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(job)}
                    className="px-3 py-1.5 bg-[#1a1a1a] hover:bg-[#222] text-[#999] hover:text-white text-sm rounded-lg transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="px-3 py-1.5 bg-[#1a1a1a] hover:bg-red-500/10 text-[#999] hover:text-red-400 text-sm rounded-lg transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Back link */}
        <div className="mt-8 text-center">
          <a href="/" className="text-sm text-[#666] hover:text-white transition-colors">
            ← Back to site
          </a>
        </div>
      </div>
    </div>
  );
}

