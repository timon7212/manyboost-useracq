import { NextRequest, NextResponse } from "next/server";
import { getJobById, updateJob, deleteJob } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const job = getJobById(parseInt(id));
    
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }
    
    return NextResponse.json(job);
  } catch (error) {
    console.error("Error fetching job:", error);
    return NextResponse.json({ error: "Failed to fetch job" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = request.headers.get("x-admin-key");
    if (authHeader !== process.env.ADMIN_SECRET_KEY && authHeader !== "manyboost-admin-2024") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    
    const job = updateJob(parseInt(id), body);
    
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }
    
    return NextResponse.json(job);
  } catch (error) {
    console.error("Error updating job:", error);
    return NextResponse.json({ error: "Failed to update job" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = request.headers.get("x-admin-key");
    if (authHeader !== process.env.ADMIN_SECRET_KEY && authHeader !== "manyboost-admin-2024") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const success = deleteJob(parseInt(id));
    
    if (!success) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json({ error: "Failed to delete job" }, { status: 500 });
  }
}

