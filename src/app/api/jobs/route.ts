import { NextRequest, NextResponse } from "next/server";

// Fallback jobs for serverless (Vercel)
const FALLBACK_JOBS = [
  {
    id: 1,
    title: "Senior AdOps Manager",
    department: "Growth",
    location: "Dubai HQ",
    type: "Full-time",
    description: "Manage and optimize UA campaigns across major ad networks.",
  },
  {
    id: 2,
    title: "UA Sales Lead",
    department: "Growth",
    location: "Dubai HQ",
    type: "Full-time",
    description: "Drive partnerships with top mobile game studios.",
  },
  {
    id: 3,
    title: "Creator Partnerships Manager",
    department: "Marketing",
    location: "Dubai HQ / Remote",
    type: "Full-time",
    description: "Recruit and manage relationships with gaming creators.",
  },
  {
    id: 4,
    title: "Full-Stack Engineer",
    department: "Engineering",
    location: "Dubai HQ / Remote",
    type: "Full-time",
    description: "Build our creator dashboard and campaign management platform.",
  },
  {
    id: 5,
    title: "Data Analyst",
    department: "Operations",
    location: "Dubai HQ",
    type: "Full-time",
    description: "Analyze campaign performance and user acquisition metrics.",
  },
];

export async function GET() {
  try {
    // Try to use SQLite in development
    if (process.env.NODE_ENV === "development") {
      const { getAllJobs } = await import("@/lib/db");
      const jobs = getAllJobs();
      return NextResponse.json(jobs);
    }
    // Use fallback in production (Vercel)
    return NextResponse.json(FALLBACK_JOBS);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    // Return fallback on any error
    return NextResponse.json(FALLBACK_JOBS);
  }
}

export async function POST(request: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Admin disabled in production" }, { status: 403 });
  }

  try {
    const authHeader = request.headers.get("x-admin-key");
    if (authHeader !== process.env.ADMIN_SECRET_KEY && authHeader !== "manyboost-admin-2024") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    
    if (!body.title || !body.department || !body.location || !body.type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { createJob } = await import("@/lib/db");
    const job = createJob({
      title: body.title,
      department: body.department,
      location: body.location,
      type: body.type,
      description: body.description || null,
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
  }
}

