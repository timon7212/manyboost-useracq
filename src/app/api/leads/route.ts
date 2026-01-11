import { NextRequest, NextResponse } from "next/server";

// Fallback leads storage for Vercel (SQLite not supported)
const MEMORY_LEADS: Array<{
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
}> = [];

let leadIdCounter = 1;

export async function GET() {
  try {
    if (process.env.NODE_ENV === "development") {
      const { getAllLeads } = await import("@/lib/db");
      const leads = getAllLeads();
      return NextResponse.json(leads);
    }
    // Use in-memory storage in production (Vercel)
    return NextResponse.json(MEMORY_LEADS);
  } catch (error) {
    console.error("Error fetching leads:", error);
    return NextResponse.json(MEMORY_LEADS);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, name, email, company, message, followers, monthly_traffic, budget } = body;

    if (!type || !name || !email) {
      return NextResponse.json(
        { error: "Missing required fields: type, name, email" },
        { status: 400 }
      );
    }

    if (process.env.NODE_ENV === "development") {
      const { createLead } = await import("@/lib/db");
      const lead = createLead({
        type,
        name,
        email,
        company: company || null,
        message: message || null,
        followers: followers || null,
        monthly_traffic: monthly_traffic || null,
        budget: budget || null,
      });
      return NextResponse.json(lead, { status: 201 });
    }

    // In-memory storage for Vercel
    const newLead = {
      id: leadIdCounter++,
      type,
      name,
      email,
      company: company || null,
      message: message || null,
      followers: followers || null,
      monthly_traffic: monthly_traffic || null,
      budget: budget || null,
      created_at: new Date().toISOString(),
      status: "new",
    };
    MEMORY_LEADS.push(newLead);
    
    return NextResponse.json(newLead, { status: 201 });
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "Missing required fields: id, status" },
        { status: 400 }
      );
    }

    if (process.env.NODE_ENV === "development") {
      const { updateLeadStatus } = await import("@/lib/db");
      const lead = updateLeadStatus(id, status);
      if (!lead) {
        return NextResponse.json({ error: "Lead not found" }, { status: 404 });
      }
      return NextResponse.json(lead);
    }

    // In-memory update for Vercel
    const leadIndex = MEMORY_LEADS.findIndex(l => l.id === id);
    if (leadIndex === -1) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }
    MEMORY_LEADS[leadIndex].status = status;
    return NextResponse.json(MEMORY_LEADS[leadIndex]);
  } catch (error) {
    console.error("Error updating lead:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
