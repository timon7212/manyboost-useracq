const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, '..', 'data', 'jobs.db');

// Ensure data directory exists
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

const jobs = [
  {
    title: "Senior AdOps Manager",
    department: "Growth",
    location: "Dubai HQ",
    type: "Full-time",
    description: "Manage and optimize UA campaigns across major ad networks (Meta, TikTok, Unity, AppLovin). 3+ years in mobile gaming AdOps required."
  },
  {
    title: "UA Sales Lead",
    department: "Growth",
    location: "Dubai HQ",
    type: "Full-time",
    description: "Drive partnerships with top mobile game studios. Build and close deals with performance marketing teams. Gaming industry experience preferred."
  },
  {
    title: "Creator Partnerships Manager",
    department: "Marketing",
    location: "Dubai HQ / Remote",
    type: "Full-time",
    description: "Recruit and manage relationships with gaming creators. Scale our influencer network across TikTok, YouTube, and Instagram."
  },
  {
    title: "Full-Stack Engineer",
    department: "Engineering",
    location: "Dubai HQ / Remote",
    type: "Full-time",
    description: "Build our creator dashboard and campaign management platform. React, Node.js, PostgreSQL. Startup experience is a plus."
  },
  {
    title: "Data Analyst",
    department: "Operations",
    location: "Dubai HQ",
    type: "Full-time",
    description: "Analyze campaign performance, creator ROI, and user acquisition metrics. SQL, Python, and experience with mobile attribution (Adjust, AppsFlyer) required."
  }
];

// Clear existing jobs and insert new ones
db.exec('DELETE FROM jobs');

const stmt = db.prepare(`
  INSERT INTO jobs (title, department, location, type, description)
  VALUES (?, ?, ?, ?, ?)
`);

for (const job of jobs) {
  stmt.run(job.title, job.department, job.location, job.type, job.description);
  console.log(`✓ Added: ${job.title}`);
}

console.log(`\n✅ Successfully added ${jobs.length} jobs to the database!`);
db.close();

