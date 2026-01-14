import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Email notification for new leads (to team)
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
  
  // Build email content for team
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
    // Send notification to team
    await resend.emails.send({
      from: "ManyBoost Leads <leads@manyboost.io>",
      to: ["busdev@manyboost.io"],
      subject: `🔥 New ${typeLabel} Lead: ${lead.name}${lead.company ? ` (${lead.company})` : ''}`,
      html: details,
    });
    console.log(`✅ Lead notification sent to busdev@manyboost.io for ${lead.name}`);
  } catch (error) {
    console.error("❌ Failed to send lead notification:", error);
  }
}

// Confirmation email to the lead (auto-reply)
async function sendConfirmationToLead(lead: {
  type: string;
  name: string;
  email: string;
  company: string | null;
}) {
  const firstName = lead.name.split(' ')[0];
  
  const typeMessages: Record<string, { title: string; message: string }> = {
    advertiser: {
      title: "Let's Scale Your User Acquisition",
      message: "We're excited to learn more about your UA goals. Our team specializes in delivering high-quality, engaged users through our network of 200+ premium publishers.",
    },
    publisher: {
      title: "Welcome to ManyBoost Publishers",
      message: "Thank you for your interest in monetizing with ManyBoost. Our premium offerwall delivers industry-leading eCPMs with quality offers from top game studios.",
    },
    creator: {
      title: "Join the ManyBoost Creator Network",
      message: "We're thrilled you want to join our creator community! We work with gaming creators to deliver authentic, engaging campaigns that benefit both you and your audience.",
    },
  };

  const content = typeMessages[lead.type] || typeMessages.advertiser;

  const confirmationHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; background-color: #000;">
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif; max-width: 600px; margin: 0 auto; background: #000;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #0a0a0a 0%, #111 100%); padding: 40px 32px; text-align: center; border-bottom: 1px solid #222;">
          <img src="https://manyboost.io/favicon.png" alt="ManyBoost" width="48" height="48" style="margin-bottom: 16px; border-radius: 12px;">
          <h1 style="color: #fff; margin: 0; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">
            <span style="color: #e97714;">many</span>boost
          </h1>
        </div>

        <!-- Main Content -->
        <div style="padding: 48px 32px; background: #0a0a0a;">
          <h2 style="color: #fff; margin: 0 0 8px 0; font-size: 24px; font-weight: 600;">
            Hi ${firstName}! 👋
          </h2>
          <h3 style="color: #e97714; margin: 0 0 24px 0; font-size: 18px; font-weight: 500;">
            ${content.title}
          </h3>
          
          <p style="color: #999; font-size: 15px; line-height: 1.7; margin: 0 0 24px 0;">
            Thank you for reaching out to ManyBoost! We've received your inquiry and our team is reviewing it now.
          </p>
          
          <p style="color: #999; font-size: 15px; line-height: 1.7; margin: 0 0 32px 0;">
            ${content.message}
          </p>

          <!-- What's Next Box -->
          <div style="background: #111; border: 1px solid #222; border-radius: 12px; padding: 24px; margin-bottom: 32px;">
            <h4 style="color: #fff; margin: 0 0 16px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
              ⚡ What happens next?
            </h4>
            <ul style="color: #888; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
              <li>Our team will review your inquiry within <strong style="color: #fff;">24 hours</strong></li>
              <li>A dedicated account manager will reach out to you</li>
              <li>We'll schedule a call to discuss your specific needs</li>
            </ul>
          </div>

          <!-- Stats -->
          <div style="display: flex; justify-content: space-between; text-align: center; margin-bottom: 32px;">
            <div style="flex: 1;">
              <p style="color: #e97714; font-size: 28px; font-weight: 700; margin: 0;">200+</p>
              <p style="color: #666; font-size: 12px; margin: 4px 0 0 0; text-transform: uppercase; letter-spacing: 0.5px;">Publishers</p>
            </div>
            <div style="flex: 1;">
              <p style="color: #e97714; font-size: 28px; font-weight: 700; margin: 0;">11M+</p>
              <p style="color: #666; font-size: 12px; margin: 4px 0 0 0; text-transform: uppercase; letter-spacing: 0.5px;">MAU Worldwide</p>
            </div>
            <div style="flex: 1;">
              <p style="color: #e97714; font-size: 28px; font-weight: 700; margin: 0;">50+</p>
              <p style="color: #666; font-size: 12px; margin: 4px 0 0 0; text-transform: uppercase; letter-spacing: 0.5px;">Countries</p>
            </div>
          </div>

          <p style="color: #666; font-size: 14px; line-height: 1.6; margin: 0;">
            In the meantime, feel free to reply to this email if you have any questions.
          </p>
        </div>

        <!-- Footer -->
        <div style="padding: 32px; background: #050505; border-top: 1px solid #1a1a1a; text-align: center;">
          <p style="color: #888; font-size: 14px; margin: 0 0 16px 0;">
            Looking forward to working with you!
          </p>
          <p style="color: #e97714; font-size: 14px; font-weight: 600; margin: 0 0 24px 0;">
            — The ManyBoost Team
          </p>
          
          <div style="margin-bottom: 16px;">
            <a href="https://manyboost.io" style="color: #666; text-decoration: none; font-size: 13px; margin: 0 12px;">Website</a>
            <a href="https://www.linkedin.com/company/110627158" style="color: #666; text-decoration: none; font-size: 13px; margin: 0 12px;">LinkedIn</a>
            <a href="mailto:busdev@manyboost.io" style="color: #666; text-decoration: none; font-size: 13px; margin: 0 12px;">Contact</a>
          </div>
          
          <p style="color: #444; font-size: 11px; margin: 0;">
            © ${new Date().getFullYear()} ManyBoost. Dubai, UAE.
          </p>
        </div>
        
      </div>
    </body>
    </html>
  `;

  try {
    await resend.emails.send({
      from: "ManyBoost <hello@manyboost.io>",
      to: [lead.email],
      subject: `Thanks for reaching out, ${firstName}! We'll be in touch soon 🚀`,
      html: confirmationHtml,
    });
    console.log(`✅ Confirmation email sent to ${lead.email}`);
  } catch (error) {
    console.error("❌ Failed to send confirmation email:", error);
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

    // Send email notification to team (both dev and prod)
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

    // Send confirmation email to the lead
    await sendConfirmationToLead({
      type,
      name,
      email,
      company: company || null,
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
