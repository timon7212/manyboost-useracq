import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "data", "jobs.db");

// Ensure data directory exists
import fs from "fs";
const dataDir = path.dirname(dbPath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(dbPath);

// Initialize the database
db.exec(`
  CREATE TABLE IF NOT EXISTS jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    department TEXT NOT NULL,
    location TEXT NOT NULL,
    type TEXT NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_active INTEGER DEFAULT 1
  )
`);

// Admin users table
db.exec(`
  CREATE TABLE IF NOT EXISTS admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
  )
`);

// Leads table
db.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    message TEXT,
    followers TEXT,
    monthly_traffic TEXT,
    budget TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    status TEXT DEFAULT 'new'
  )
`);

export interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string | null;
  created_at: string;
  is_active: number;
}

export function getAllJobs(): Job[] {
  const stmt = db.prepare("SELECT * FROM jobs WHERE is_active = 1 ORDER BY created_at DESC");
  return stmt.all() as Job[];
}

export function getJobById(id: number): Job | undefined {
  const stmt = db.prepare("SELECT * FROM jobs WHERE id = ?");
  return stmt.get(id) as Job | undefined;
}

export function createJob(job: Omit<Job, "id" | "created_at" | "is_active">): Job {
  const stmt = db.prepare(`
    INSERT INTO jobs (title, department, location, type, description)
    VALUES (?, ?, ?, ?, ?)
  `);
  const result = stmt.run(job.title, job.department, job.location, job.type, job.description);
  return getJobById(result.lastInsertRowid as number)!;
}

export function updateJob(id: number, job: Partial<Omit<Job, "id" | "created_at">>): Job | undefined {
  const fields: string[] = [];
  const values: (string | number | null)[] = [];
  
  if (job.title !== undefined) { fields.push("title = ?"); values.push(job.title); }
  if (job.department !== undefined) { fields.push("department = ?"); values.push(job.department); }
  if (job.location !== undefined) { fields.push("location = ?"); values.push(job.location); }
  if (job.type !== undefined) { fields.push("type = ?"); values.push(job.type); }
  if (job.description !== undefined) { fields.push("description = ?"); values.push(job.description); }
  if (job.is_active !== undefined) { fields.push("is_active = ?"); values.push(job.is_active); }
  
  if (fields.length === 0) return getJobById(id);
  
  values.push(id);
  const stmt = db.prepare(`UPDATE jobs SET ${fields.join(", ")} WHERE id = ?`);
  stmt.run(...values);
  return getJobById(id);
}

export function deleteJob(id: number): boolean {
  const stmt = db.prepare("UPDATE jobs SET is_active = 0 WHERE id = ?");
  const result = stmt.run(id);
  return result.changes > 0;
}

// Lead types
export interface Lead {
  id: number;
  type: "creator" | "publisher" | "advertiser";
  name: string;
  email: string;
  company: string | null;
  message: string | null;
  followers: string | null;
  monthly_traffic: string | null;
  budget: string | null;
  created_at: string;
  status: "new" | "contacted" | "qualified" | "closed";
}

export function getAllLeads(): Lead[] {
  const stmt = db.prepare("SELECT * FROM leads ORDER BY created_at DESC");
  return stmt.all() as Lead[];
}

export function getLeadById(id: number): Lead | undefined {
  const stmt = db.prepare("SELECT * FROM leads WHERE id = ?");
  return stmt.get(id) as Lead | undefined;
}

export function createLead(lead: Omit<Lead, "id" | "created_at" | "status">): Lead {
  const stmt = db.prepare(`
    INSERT INTO leads (type, name, email, company, message, followers, monthly_traffic, budget)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    lead.type,
    lead.name,
    lead.email,
    lead.company || null,
    lead.message || null,
    lead.followers || null,
    lead.monthly_traffic || null,
    lead.budget || null
  );
  return getLeadById(result.lastInsertRowid as number)!;
}

export function updateLeadStatus(id: number, status: Lead["status"]): Lead | undefined {
  const stmt = db.prepare("UPDATE leads SET status = ? WHERE id = ?");
  stmt.run(status, id);
  return getLeadById(id);
}

export function deleteLead(id: number): boolean {
  const stmt = db.prepare("DELETE FROM leads WHERE id = ?");
  const result = stmt.run(id);
  return result.changes > 0;
}

export default db;

