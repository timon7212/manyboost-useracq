import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Email notification for new leads
async function sendLeadNotification(lead: {
  type: string;
  name: string;
  email: string;
  company: string | null;
  message: string | null;
  followers: string | null;
  monthly_traffic: string | null;
  budget: string | null;
}) {
  const typeLabels: Record<string, string> = {
    advertiser: "🎯 Advertiser",
    publisher: "📱 Publisher", 
    creator: "🎬 Creator",
  };

  const typeLabel = typeLabels[lead.type] || lead.type;
  
  // Build email content
  let details = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #e97714 0%, #d16a10 100%); padding: 24px; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px;">New Lead: ${typeLabel}</h1>
      </div>
      
      <div style="background: #111; padding: 24px; border-radius: 0 0 12px 12px; color: #fff;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #888; width: 120px;">Name</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #fff; font-weight: 500;">${lead.name}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #888;">Email</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #333;">
              <a href="mailto:${lead.email}" style="color: #e97714; text-decoration: none;">${lead.email}</a>
            </td>
          </tr>
  `;

  if (lead.company) {
    details += `
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #888;">Company</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #fff;">${lead.company}</td>
          </tr>
    `;
  }

  if (lead.budget) {
    details += `
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #888;">Budget</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #22c55e; font-weight: 500;">${lead.budget}</td>
          </tr>
    `;
  }

  if (lead.monthly_traffic) {
    details += `
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #888;">Monthly Traffic</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #fff;">${lead.monthly_traffic}</td>
          </tr>
    `;
  }

  if (lead.followers) {
    details += `
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #888;">Followers</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #333; color: #fff;">${lead.followers}</td>
          </tr>
    `;
  }

  if (lead.message) {
    details += `
          <tr>
            <td style="padding: 12px 0; color: #888; vertical-align: top;">Message</td>
            <td style="padding: 12px 0; color: #ccc;">${lead.message}</td>
          </tr>
    `;
  }

  details += `
        </table>
        
        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #333;">
          <a href="mailto:${lead.email}?subject=Re: ManyBoost - Let's Connect" 
             style="display: inline-block; background: #e97714; color: #000; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
            Reply to ${lead.name.split(' ')[0]} →
          </a>
        </div>
        
        <p style="margin-top: 24px; font-size: 12px; color: #666;">
          This lead was submitted via manyboost.io at ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Dubai' })} (Dubai Time)
        </p>
      </div>
    </div>
  `;

  try {
    await resend.emails.send({
      from: "ManyBoost Leads <leads@manyboost.io>",
      to: ["sales@manyboost.io"],
      subject: `🔥 New ${typeLabel} Lead: ${lead.name}${lead.company ? ` (${lead.company})` : ''}`,
      html: details,
    });
    console.log(`✅ Lead notification sent to sales@manyboost.io for ${lead.name}`);
  } catch (error) {
    console.error("❌ Failed to send lead notification:", error);
    // Don't throw - we still want to save the lead even if email fails
  }
}

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

    // Always send email notification (both dev and prod)
    await sendLeadNotification({
      type,
      name,
      email,
      company: company || null,
      message: message || null,
      followers: followers || null,
      monthly_traffic: monthly_traffic || null,
      budget: budget || null,
    });

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
