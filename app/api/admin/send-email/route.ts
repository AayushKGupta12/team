import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend     = new Resend(process.env.RESEND_API_KEY!);
const EMAIL_FROM = process.env.EMAIL_FROM!;

/* ══════════════════════════════════════════════════════════
   PLAIN-TEXT → HTML CONVERTER
   Parses the structured plain-text body from the client
   into properly spaced, styled HTML sections.
══════════════════════════════════════════════════════════ */
function bodyToHtml(raw: string): string {
  const lines = raw.split("\n");
  const out: string[] = [];
  let inList = false;

  function closeList() {
    if (inList) { out.push(`</ul>`); inList = false; }
  }

  for (const line of lines) {
    const trimmed = line.trim();

    // Horizontal divider (━━━ or ───)
    if (/^[━─]{4,}$/.test(trimmed)) {
      closeList();
      out.push(`<hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;">`);
      continue;
    }

    // Blank line → breathing space
    if (trimmed === "") {
      closeList();
      out.push(`<div style="height:10px;"></div>`);
      continue;
    }

    // Bullet point (• or *)
    if (/^[•*]\s/.test(trimmed)) {
      if (!inList) {
        out.push(`<ul style="margin:8px 0;padding-left:20px;color:#374151;">`);
        inList = true;
      }
      out.push(`<li style="margin-bottom:6px;font-size:13.5px;line-height:1.65;color:#374151;">${linkify(trimmed.replace(/^[•*]\s/, ""))}</li>`);
      continue;
    }

    closeList();

    // STEP N — badge + heading
    if (/^STEP\s+\d+\s*[—–-]/i.test(trimmed)) {
      const match = trimmed.match(/^(STEP\s+\d+)\s*[—–-]\s*(.*)$/i);
      if (match) {
        out.push(`
          <div style="margin:20px 0 8px 0;display:flex;align-items:flex-start;gap:10px;">
            <span style="display:inline-block;background:#1d4ed8;color:#fff;font-size:9.5px;font-weight:700;
                         letter-spacing:0.08em;padding:3px 9px;border-radius:3px;white-space:nowrap;margin-top:2px;">
              ${match[1].toUpperCase()}
            </span>
            <span style="font-size:14px;font-weight:700;color:#1e3a5f;line-height:1.4;">${match[2]}</span>
          </div>`);
        continue;
      }
    }

    // Standalone URL line → styled link block
    if (/^https?:\/\/\S+$/.test(trimmed)) {
      out.push(`
        <div style="margin:4px 0 12px 0;">
          <a href="${trimmed}"
             style="font-size:12.5px;color:#1d4ed8;text-decoration:none;
                    border-bottom:1px solid #bfdbfe;padding-bottom:1px;word-break:break-all;">
            ${trimmed}
          </a>
        </div>`);
      continue;
    }

    // ALL CAPS → section heading label
    if (
      trimmed.length >= 4 &&
      trimmed === trimmed.toUpperCase() &&
      !/^\d/.test(trimmed) &&
      !/^https?/i.test(trimmed) &&
      /[A-Z]/.test(trimmed)
    ) {
      out.push(`
        <div style="margin:22px 0 8px 0;">
          <span style="display:inline-block;font-size:9.5px;font-weight:700;letter-spacing:0.13em;
                       color:#1d4ed8;text-transform:uppercase;padding-bottom:4px;
                       border-bottom:2px solid #bfdbfe;">
            ${trimmed}
          </span>
        </div>`);
      continue;
    }

    // Key : Value pair
    if (/^[\w\s]+\s*:\s+\S/.test(trimmed) && !trimmed.startsWith("http")) {
      const colonIdx = trimmed.indexOf(":");
      const key      = trimmed.slice(0, colonIdx).trim();
      const value    = trimmed.slice(colonIdx + 1).trim();
      out.push(`
        <div style="display:flex;gap:8px;margin-bottom:5px;font-size:13.5px;line-height:1.6;">
          <span style="color:#9ca3af;min-width:120px;flex-shrink:0;">${key}</span>
          <span style="color:#1e3a5f;font-weight:600;">${linkify(value)}</span>
        </div>`);
      continue;
    }

    // Default → paragraph
    out.push(`<p style="margin:0 0 10px 0;font-size:14px;line-height:1.75;color:#374151;">${linkify(trimmed)}</p>`);
  }

  closeList();
  return out.join("\n");
}

/** Wrap bare URLs inside text as styled anchor tags */
function linkify(text: string): string {
  return text.replace(
    /(https?:\/\/[^\s<>"]+)/g,
    `<a href="$1" style="color:#1d4ed8;text-decoration:none;border-bottom:1px solid #bfdbfe;">$1</a>`,
  );
}

/* ══════════════════════════════════════════════════════════
   EMAIL SHELL — light blue corporate layout
══════════════════════════════════════════════════════════ */
function emailShell(subject: string, bodyHtml: string): string {
  const title = subject.replace(/^[\p{Emoji}\s]+/u, "").trim();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f5f5;
             font-family:'Segoe UI',Arial,sans-serif;-webkit-font-smoothing:antialiased;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0"
         style="background-color:#f5f5f5;padding:48px 0;">
    <tr><td align="center">

      <table width="600" cellpadding="0" cellspacing="0" border="0"
             style="max-width:600px;width:100%;background:#ffffff;
                    border:1px solid #bfdbfe;border-radius:8px;overflow:hidden;">

        <!-- HEADER -->
        <tr>
          <td style="background:#e5e7eb;padding:22px 36px;border-bottom:1px solid #dbeafe">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td>
                  <div style="font-size:19px;font-weight:800;color:#1e3a5f;
                               letter-spacing:-0.02em;line-height:1;">
                    Tauzand
                  </div>
                  <div style="font-size:9.5px;font-weight:600;color:#9ca3af;
                               letter-spacing:0.14em;text-transform:uppercase;margin-top:4px;">
                    Career Intelligence Platform
                  </div>
                </td>
                <td align="right">
                  <span style="display:inline-block;background:#f5f5f5;color:#1d4ed8;
                               font-size:9px;font-weight:700;letter-spacing:0.1em;
                               text-transform:uppercase;padding:4px 11px;border-radius:20px;
                               border:1px solid #9ca3af;">
                    Internship Program
                  </span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- TITLE STRIP -->
        <tr>
          <td style="background:#f0f7ff;border-bottom:1px solid #e5e7eb;padding:16px 36px;">
            <p style="margin:0;font-size:15px;font-weight:700;color:#1e3a5f;line-height:1.3;">
              ${title}
            </p>
          </td>
        </tr>

        <!-- BODY -->
        <tr>
          <td style="padding:32px 36px 24px 36px;">
            ${bodyHtml}
          </td>
        </tr>

        <!-- QUICK ACCESS BUTTONS -->
        <tr>
          <td style="padding:20px 36px;background:#f0f7ff;border-top:1px solid #e5e7eb;">
            <p style="margin:0 0 12px 0;font-size:9.5px;font-weight:700;color:#9ca3af;
                       letter-spacing:0.12em;text-transform:uppercase;">
              Quick Access
            </p>
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding-right:8px;padding-bottom:6px;">
                  <a href="https://www.tauzand.in/internship/project"
                     style="display:inline-block;background:#1d4ed8;color:#ffffff;
                            font-size:11.5px;font-weight:600;padding:8px 16px;
                            border-radius:4px;text-decoration:none;">
                    Browse Projects
                  </a>
                </td>
                <td style="padding-right:8px;padding-bottom:6px;">
                  <a href="https://www.tauzand.in/internship/userdashboard"
                     style="display:inline-block;background:#2563eb;color:#ffffff;
                            font-size:11.5px;font-weight:600;padding:8px 16px;
                            border-radius:4px;text-decoration:none;">
                    Intern Dashboard
                  </a>
                </td>
                <td style="padding-bottom:6px;">
                  <a href="https://www.tauzand.in/internship/validate"
                     style="display:inline-block;background:#ffffff;color:#1d4ed8;
                            font-size:11.5px;font-weight:600;padding:8px 16px;
                            border-radius:4px;text-decoration:none;border:1px solid #9ca3af;">
                    Verify Certificate
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="padding:18px 36px 22px 36px;background:#dbeafe;border-top:1px solid #bfdbfe;">
            <p style="margin:0 0 5px 0;font-size:11px;color:#9ca3af;line-height:1.6;">
              © 2026 Tauzand.in · All rights reserved &nbsp;·&nbsp;
              <a href="https://tauzand.in/term-of-use"
                 style="color:#9ca3af;text-decoration:underline;">Terms</a> &nbsp;·&nbsp;
              <a href="https://tauzand.in/privacy-policy"
                 style="color:#9ca3af;text-decoration:underline;">Privacy</a> &nbsp;·&nbsp;
              <a href="https://tauzand.in/refund-policy"
                 style="color:#9ca3af;text-decoration:underline;">Refund Policy</a>
            </p>
            <p style="margin:0;font-size:11px;color:#9ca3af;">
              Tauzand.in &nbsp;·&nbsp; Bhubaneswar, Odisha, India
            </p>
          </td>
        </tr>

      </table>

    </td></tr>
  </table>

</body>
</html>`;
}

/* ══════════════════════════════════════════════════════════
   POST HANDLER
══════════════════════════════════════════════════════════ */
export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const { to, subject, body } = payload;

    if (!to || !subject || !body) {
      return NextResponse.json({ error: "Missing fields: to, subject, body" }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: "RESEND_API_KEY missing" }, { status: 500 });
    }
    if (!process.env.EMAIL_FROM) {
      return NextResponse.json({ error: "EMAIL_FROM missing" }, { status: 500 });
    }

    const bodyHtml = bodyToHtml(body);
    const html     = emailShell(subject, bodyHtml);

    const { data, error } = await resend.emails.send({
      from:    EMAIL_FROM,
      to:      [to],
      subject,
      html,
      text:    body, // plain-text fallback for clients that block HTML
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("Email sent:", data);
    return NextResponse.json({ ok: true, data });

  } catch (err) {
    console.error("Caught error:", err);
    return NextResponse.json({ error: "Email failed" }, { status: 500 });
  }
}