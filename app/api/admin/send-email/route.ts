import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);
const EMAIL_FROM = process.env.EMAIL_FROM!;

function emailLayout(title: string, body: string, ctaText?: string, ctaLink?: string) {
  const ctaHtml = ctaText && ctaLink ? `
    <div style="margin:36px 0;text-align:left;">
      <a href="${ctaLink}" style="display:inline-block;padding:12px 28px;font-size:13px;font-weight:600;color:#ffffff;background-color:#111827;border-radius:5px;text-decoration:none;letter-spacing:0.02em;">
        ${ctaText}
      </a>
    </div>` : "";

  return `
  <div style="background-color:#f5f5f5;padding:56px 0;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
    <div style="max-width:580px;margin:0 auto;background-color:#ffffff;border:1px solid #e5e7eb;border-radius:4px;">
      <div style="padding:28px 40px;border-bottom:1px solid #f0f0f0;">
        <div style="font-size:16px;font-weight:800;color:#111827;letter-spacing:-0.02em;">Tauzand.IN</div>
        <div style="font-size:10.5px;font-weight:500;color:#adb5bd;text-transform:uppercase;letter-spacing:0.1em;margin-top:3px;">Career Intelligence Platform</div>
      </div>
      <div style="padding:44px 40px 36px 40px;">
        <h1 style="margin:0 0 20px 0;font-size:20px;font-weight:700;color:#111827;line-height:1.25;letter-spacing:-0.01em;">${title}</h1>
        <div style="font-size:14px;line-height:1.75;color:#374151;">${body}</div>
        ${ctaHtml}
        <div style="margin-top:40px;padding-top:24px;border-top:1px solid #f3f4f6;">
          <p style="font-size:13px;color:#6b7280;margin:0;line-height:1.6;">Warm regards,<br>
            <span style="font-weight:600;color:#374151;">The Tauzand.in Team</span>
          </p>
        </div>
      </div>
      <div style="padding:20px 40px;background-color:#fafafa;border-top:1px solid #f0f0f0;">
        <p style="margin:0 0 6px 0;font-size:11px;color:#9ca3af;line-height:1.6;">
          © 2026 Tauzand.in. All rights reserved. &nbsp;·&nbsp;
          <a href="https://Tauzand.in/term-of-use" style="color:#9ca3af;text-decoration:underline;">Terms</a> &nbsp;·&nbsp;
          <a href="https://Tauzand.in/privacy-policy" style="color:#9ca3af;text-decoration:underline;">Privacy</a> &nbsp;·&nbsp;
          <a href="https://Tauzand.in/refund-policy" style="color:#9ca3af;text-decoration:underline;">Refund Policy</a>
        </p>
        <p style="margin:0;font-size:11px;color:#c5cad3;">Tauzand.in · Bhubaneswar, Odisha, India</p>
      </div>
    </div>
  </div>`;
}

function getTemplate(type: string, name: string) {
  if (type === "select_project") {
    return {
      subject: "Action Required: Choose Your Internship Project",
      html: emailLayout(
        "Choose Your Assigned Project",
        `<p style="margin:0 0 16px 0;">Hi ${name},</p>
         <p style="margin:0 0 16px 0;">Your internship journey is about to begin! Please visit our Project Library and select the project you'd like to work on.</p>
         <p style="margin:0 0 16px 0;">Browse through the available projects and pick one that aligns with your domain and interests. Once selected, your mentor will be assigned accordingly.</p>
         <p style="margin:0;">If you need help choosing, feel free to reach out to us.</p>`,
        "Browse Project Library",
        "https://www.Tauzand.in/internship/project"
      ),
    };
  }

  if (type === "approved") {
    return {
      subject: "Congratulations! Your Application is Approved 🎉",
      html: emailLayout(
        "Your Application Has Been Approved",
        `<p style="margin:0 0 16px 0;">Hi ${name},</p>
         <p style="margin:0 0 16px 0;">Great news — your internship application has been reviewed and <strong>approved</strong>.</p>
         <p style="margin:0 0 16px 0;">Here's what to do next:</p>
         <ul style="margin:0 0 20px 0;padding-left:20px;color:#374151;">
           <li style="margin-bottom:8px;">Visit our <strong>Project Library</strong> and choose a project that matches your domain.</li>
           <li style="margin-bottom:8px;">If you've already selected a project, go ahead and start building.</li>
           <li style="margin-bottom:8px;">Submit your completed project <strong>before the deadline</strong> from your dashboard.</li>
         </ul>
         <p style="margin:0;">We're excited to see what you build. Good luck!</p>`,
        "Choose Your Project",
        "https://www.Tauzand.in/internship/project"
      ),
    };
  }

  if (type === "submission_approved") {
    return {
      subject: "Submission Approved — Your Certificate is Ready ✅",
      html: emailLayout(
        "Your Submission Has Been Approved",
        `<p style="margin:0 0 16px 0;">Hi ${name},</p>
         <p style="margin:0 0 16px 0;">Our mentor has reviewed your submitted project and found it <strong>up to the mark</strong>. Excellent work!</p>
         <p style="margin:0 0 16px 0;">Your internship completion certificate is now being processed. You can check your dashboard for the certificate link — it will be available there shortly.</p>
         <p style="margin:0;">Thank you for your dedication throughout this internship. We hope this experience adds real value to your journey ahead.</p>`,
        "Go to Dashboard",
        "https://Tauzand.in"
      ),
    };
  }

  return null;
}

export async function POST(req: NextRequest) {
  try {
    const { to, name, type } = await req.json();

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: "RESEND_API_KEY missing" }, { status: 500 });
    }
    if (!process.env.EMAIL_FROM) {
      return NextResponse.json({ error: "EMAIL_FROM missing" }, { status: 500 });
    }

    const template = getTemplate(type, name);
    if (!template) return NextResponse.json({ error: "Invalid type" }, { status: 400 });

    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: [to],
      subject: template.subject,
      html: template.html,
    });

    // Log actual Resend error
    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("Email sent:", data);
    return NextResponse.json({ ok: true, data });

  } catch (err) {
    console.error("Caught error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}