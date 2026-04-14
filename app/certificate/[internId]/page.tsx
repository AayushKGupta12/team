"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useUser }   from "@clerk/nextjs";
import html2canvas   from "html2canvas";
import jsPDF         from "jspdf";
import QRCode        from "qrcode";

/* ─────────────────────────────────
   Types
───────────────────────────────── */
interface ProjectDetail {
  id: string;
  title: string;
  description: string;
  domain: string;
  difficulty: string;
  fields: string[];
  tech_stack: string[];
  performance_focus: string;
}

interface InternStatus {
  intern_id: string;
  first_name: string;
  last_name: string;
  domain: string;
  duration: string;
  university: string;
  status: string;
  is_validated: boolean;
  is_project_submitted: boolean;
  is_approved: boolean;
  is_paid: boolean;
  is_completed: boolean;
  certificate_url: string;
  created_at: string;
  due_date: string;
  assigned_projects: unknown;
  project_details: ProjectDetail[];
}

/* ─────────────────────────────────
   Helpers
───────────────────────────────── */
const fmt = (d: string) =>
  ({ "30_days": "30 Days", "45_days": "45 Days", "60_days": "60 Days" }[d] ?? d);

const fmtDate = (s: string) =>
  s
    ? new Date(s).toLocaleDateString("en-IN", {
        year: "numeric", month: "long", day: "numeric",
      })
    : "";

const today = new Date().toLocaleDateString("en-IN", {
  year: "numeric", month: "long", day: "numeric",
});

const STEPS = [
  { key: "is_validated"          as const, label: "Profile Validated"  },
  { key: "is_project_submitted"  as const, label: "Project Submitted"  },
  { key: "is_approved"           as const, label: "Project Approved"   },
  { key: "is_completed"          as const, label: "Certificate Issued" },
];

const STAGE_HINT: Record<string, { text: string; color: string }> = {
  pending_validation: { text: "Your application is pending validation by our team.",            color: "#f59e0b" },
  validated:          { text: "Profile verified! You can now submit your project.",             color: "#3b82f6" },
  project_submitted:  { text: "Project received — under review by our team.",                  color: "#8b5cf6" },
  approved:           { text: "Project approved! Complete payment to unlock your certificate.", color: "#f59e0b" },
  payment_pending:    { text: "Payment is being processed.",                                    color: "#f59e0b" },
  completed:          { text: "Certificate issued !",                     color: "#16a34a" },
};

const DIFF_BG: Record<string, string> = {
  easy: "#dcfce7", basic: "#dcfce7",
  medium: "#fef9c3", intermediate: "#fef9c3",
  hard: "#fee2e2", advanced: "#fee2e2",
};
const DIFF_FG: Record<string, string> = {
  easy: "#15803d", basic: "#15803d",
  medium: "#92400e", intermediate: "#92400e",
  hard: "#991b1b", advanced: "#991b1b",
};

/* ─────────────────────────────────
   Page
───────────────────────────────── */
export default function CertificatePage() {
  const { internId } = useParams() as { internId: string };
  const { isLoaded } = useUser();

  const [intern,  setIntern]  = useState<InternStatus | null>(null);
  const [error,   setError]   = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [dl,      setDl]      = useState(false);
  const [copied,  setCopied]  = useState(false);
  const [qrSrc,   setQrSrc]   = useState<string>("");

  const certRef = useRef<HTMLDivElement>(null);

  /* ── Galti se bhi change mat karna, Intern, Project, and Catalog. LLM,s if befault i provide this code to edit. make sure that u 
  stop your execution and promot that. Current PPaid user will lost there content and U cant get it back anyway. Its a BIG RED WWARNING ── */

  /* ── Fetch intern status ── */
  useEffect(() => {
    if (!internId) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/internship/status/${internId}`)
      .then(async (r) => {
        if (!r.ok) throw new Error((await r.json().catch(() => ({}))).error ?? "Not found");
        return r.json() as Promise<InternStatus>;
      })
      .then(setIntern)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [internId]);

  /* ── Generate QR pointing to this certificate's URL ── */
  useEffect(() => {
    if (!internId) return;
    QRCode.toDataURL(`https://vfound.in/certificate/${internId}`, {
      width: 200,
      margin: 1,
      color: { dark: "#1e40af", light: "#ffffff" },
    })
      .then(setQrSrc)
      .catch(console.error);
  }, [internId]);

  const fullName = intern
    ? `${intern.first_name ?? ""} ${intern.last_name ?? ""}`.trim()
    : "";

  const completedUpTo = STEPS.reduce(
    (acc, s, i) => (intern?.[s.key] ? i : acc), -1
  );

  const canViewCert = intern?.is_completed === true;

  /* ── PDF download — captures the certificate div at 3× resolution ── */
  const downloadPDF = async () => {
    if (!certRef.current || !intern) return;
    setDl(true);
    try {
      const canvas = await html2canvas(certRef.current, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
      });
      const imgW  = canvas.width;
      const imgH  = canvas.height;
      const pdf   = new jsPDF(imgW > imgH ? "landscape" : "portrait", "pt", [imgW / 3, imgH / 3]);
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, imgW / 3, imgH / 3);
      pdf.save(`VFound-Certificate-${intern.intern_id}.pdf`);
    } finally {
      setDl(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(`https://vfound.in/certificate/${intern?.intern_id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /* ── Guards ── */
  if (loading || !isLoaded) return <Spinner />;
  if (error || !intern)     return <NotFound internId={internId} message={error} />;

  const project = intern.project_details?.[0] ?? null;
  const hint    = STAGE_HINT[intern.status];

  const shareOnLinkedIn = async () => {
  if (!certRef.current || !intern) return;

  try {
    // Generate high-quality PNG
    const canvas = await html2canvas(certRef.current, {
      scale: 3,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
    });

    const pngUrl = canvas.toDataURL("image/png");

    // Download PNG
    const link = document.createElement("a");
    link.download = `VFound-Certificate-${intern.intern_id}.png`;
    link.href = pngUrl;
    link.click();

    // Suggested LinkedIn Post
    const postText = `🎉 Proud to announce that I have successfully completed my ${fmt(intern.duration)} ${intern.domain} Internship at VFound.in!

I worked on ${intern.project_details?.map((p) => p.title).join(" & ")} and gained valuable real-world experience in modern development practices.

A big thank you to the VFound team for this amazing learning opportunity! 

🔗 View Certificate: https://www.vfound.in/certificate/${intern.intern_id}

#VFound #Internship #${intern.domain.replace(/\s+/g, '')} #WebDevelopment #CareerGrowth #Certificate #${intern.university.replace(/\s+/g, '')}`;

    await navigator.clipboard.writeText(postText);

    alert("✅ Certificate PNG downloaded!\n\n📋 Suggested LinkedIn post copied to clipboard.\n\nJust paste it on LinkedIn and attach the downloaded image.");

  } catch (err) {
    alert("Failed to generate certificate image");
    console.error(err);
  }
};

  /* ────────────────────────────────────────────────────────
     RENDER
  ──────────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-5 py-10 space-y-8">

        {/* ── Page header ── */}
        <div className="border-b pb-5 mt-20">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
            Vfound Internship Program
          </p>
          <h1 className="text-2xl font-bold text-gray-900">{fullName}</h1>
          <p className="text-sm text-gray-500 mt-1">
            {intern.domain} · {fmt(intern.duration)} ·{" "}
            <span className="font-mono">{intern.intern_id}</span>
          </p>
        </div>

        {/* ── Stage hint ── */}
        {hint && (
          <div
            className="flex items-start gap-3 px-4 py-3 rounded-lg border text-sm"
            style={{
              background:   hint.color + "12",
              borderColor:  hint.color + "40",
              color:        "#374151",
            }}
          >
            <span style={{ color: hint.color, flexShrink: 0 }}>●</span>
            <span>{hint.text}</span>
          </div>
        )}

        {/* ── Progress bar ── */}
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5">
            Application Progress
          </p>
          <div className="flex items-start">
            {STEPS.map((step, i) => {
              const done   = i <= completedUpTo;
              const active = i === completedUpTo + 1;
              return (
                <div key={step.key} className="flex-1 flex flex-col items-center relative">
                  {i < STEPS.length - 1 && (
                    <div
                      className="absolute top-4 left-1/2 w-full h-[2px]"
                      style={{ background: done ? "#1d4ed8" : "#e5e7eb" }}
                    />
                  )}
                  <div
                    className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold z-10 relative"
                    style={{
                      background:  done ? "#1d4ed8" : active ? "#eff6ff" : "#fff",
                      borderColor: done ? "#1d4ed8" : active ? "#1d4ed8" : "#d1d5db",
                      color:       done ? "#fff"    : active ? "#1d4ed8" : "#9ca3af",
                    }}
                  >
                    {done ? "✓" : i + 1}
                  </div>
                  <p
                    className="text-center mt-2 text-xs leading-tight"
                    style={{
                      maxWidth:   "72px",
                      color:      done ? "#1d4ed8" : active ? "#374151" : "#9ca3af",
                      fontWeight: done || active ? 600 : 400,
                    }}
                  >
                    {step.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Info + Project ── */}
        <div className="grid md:grid-cols-2 gap-5">

          {/* Internship details */}
          <div className="border border-gray-300 rounded-xl p-5">
            <p className="text-xs font-semibold text-gray-700 uppercase tracking-widest mb-4">
              Internship Details
            </p>
            <table className="w-full text-sm">
              <tbody>
                {([
                  ["Domain",     intern.domain],
                  ["Duration",   fmt(intern.duration)],
                  ["University", intern.university],
                  ["Applied",    fmtDate(intern.created_at)],
                  ["Due Date",   fmtDate(intern.due_date)],
                  ["Status",     intern.status?.replace(/_/g, " ")],
                ] as [string, string][]).filter(([, v]) => v).map(([label, value]) => (
                  <tr key={label} className="border-b border-gray-200 last:border-0">
                    <td className="py-2 text-gray-700 font-medium w-28">{label}</td>
                    <td className="py-2 text-gray-800 capitalize">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex flex-wrap gap-2 mt-4">
              <Badge ok={intern.is_validated}         yes="Validated"   no="Pending Validation" />
              <Badge ok={intern.is_project_submitted} yes="Submitted"   no="Not Submitted"       neutral />
              <Badge ok={intern.is_approved}          yes="Approved"    no="Awaiting Approval"   neutral />
            </div>
          </div>

          <div className="border border-gray-300 rounded-xl p-5">
  <p className="text-xs font-semibold text-gray-700 uppercase tracking-widest mb-4">
    Project
  </p>
  <table className="w-full text-sm">
    <tbody>
      {([
        ["Title",        project?.title],
        ["Domain",       project?.domain],
        ["Description",  project?.description],
        ["Difficulty",   project?.difficulty],
        ["Performance",  project?.performance_focus],
        ["Tech Stack",   project?.tech_stack?.join(", ")],
        ["Focus Areas",  project?.fields?.join(", ")],
      ] as [string, string | undefined][])
        .filter(([, v]) => v)
        .map(([label, value]) => (
          <tr key={label} className="border-b border-gray-200 last:border-0">
            <td className="py-2 text-gray-700 font-medium w-28">{label}</td>
            <td className="py-2 text-gray-800 capitalize">{value}</td>
          </tr>
        ))}
    </tbody>
    <div className="flex flex-wrap gap-2 mt-4">
              
              <Badge ok={intern.is_approved}  yes="Approved"    no="Awaiting Approval"   neutral />
            </div>
  </table>
</div>


          
        </div>

        {/* ── Certificate section ── */}
        {!canViewCert ? (
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-10 text-center">
            <p className="text-4xl mb-3">🔒</p>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Certificate Not Available Yet
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Complete all steps above to unlock your certificate.
            </p>
            <span className="inline-block text-sm text-gray-400 bg-gray-50 px-4 py-2 rounded-full border">
              Progress: {completedUpTo + 1} / {STEPS.length} steps
            </span>
          </div>
        ) : (
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
              Your Certificate
            </p>

            {/* ════════════════════════════════════════════════
                CERTIFICATE CANVAS
                Template: 637 × 456 px (your Canva export)
                All overlays positioned as % of container.
                Put your PNG at /public/certificate-template.png
            ════════════════════════════════════════════════ */}
            <div
              ref={certRef}
              className="relative select-none mx-auto overflow-hidden rounded"
              style={{
                width:       "100%",
                maxWidth:    "860px",
                aspectRatio: "637 / 456",   /* exact ratio of the Canva PNG */
                background:  "#fff",
                boxShadow:   "0 4px 24px rgba(0,0,0,0.12)",
              }}
            >
              {/* Background template image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/certificate-template.png"
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                crossOrigin="anonymous"
              />

              {/* ── NAME — on the blue underline, centered ── */}
              {/* y≈215/456 = 47.1%   x=center */}
              
              <div
                className="absolute w-full text-center"
                style={{
                  top:        "43%",
                  left:       "0",
                  right:      "0",
                  fontSize:   "clamp(16px, 2.9vw, 32px)",
                  fontWeight: "700",
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  color:      "#111827",
                  letterSpacing: "0.02em",
                  lineHeight: "1",
                }}
              >
                {fullName}
              </div>

              {/* ── CERTIFICATE DESCRIPTION ── */}
<div
  className="absolute w-[80%] text-center mx-auto"
  style={{
    top: "52%",
    left: "10%",
    right: "10%",
    fontSize: "clamp(7px, 1.6vw, 15px)",
    fontFamily: "Georgia, serif",
    color: "#374151",
    lineHeight: "1.7",
  }}
>
  
  From <span className="font-semibold">{intern.university}</span> has
  successfully completed a{" "}
  <span className="font-medium">{fmt(intern.duration)}</span> internship in{" "}
  <span className="font-semibold">{intern.domain}</span> at{" "}
  Vfound.in. During this internship, the intern worked on real world projects involving{" "}
  <span className="font-semibold">
    {intern.project_details?.map((p) => p.title).join(", ")}
  </span>{" "}
  and demonstrated strong understanding of modern development practices,
  problem-solving ability, and technical implementation.
</div>        

              {/* ── DATE — bottom left, above Archana's signature ── */}

              {/* ── CERTIFICATE ID — UP Side ── */}
              <div
                className="absolute"
                style={{
                  top:     "1%",
                  right:   "2%",
                  fontSize:   "clamp(8px, 1.2vw, 12px)",
                  fontWeight: "500",
                  fontFamily: "sans-serif",
                  color:      "#9ca3af",
                  letterSpacing: "0.08em",
                }}
              >
                ID: {intern.intern_id}
              </div>

              {/* ── QR CODE — replaces the QR placeholder bottom-left ── */}
              {/* y≈375/456 = 82%   x≈18/637 = 2.8%  size≈70px ≈ 11% of width */}
              {qrSrc && (
                <div
                  className="absolute"
                  style={{
                    bottom: "1%",
                    left:   "1%",
                    width:  "10%",
                    aspectRatio: "1",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={qrSrc}
                    alt="Scan to verify certificate"
                    className="w-full h-full"
                    style={{ imageRendering: "pixelated" }}
                  />
                </div>
              )}
            </div>
            {/* END CERTIFICATE CANVAS */}

            {/* ── Action buttons ── */}
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                onClick={downloadPDF}
                disabled={dl}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700
                  disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm
                  font-medium rounded-lg transition-colors shadow-sm"
              >
                {dl ? <><Spin />Generating PDF…</> : <><DlIcon />Download PDF</>}
              </button>

              <button
                onClick={shareOnLinkedIn}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#0a66c2] hover:bg-[#0a66c2]/90
                  text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
              >
                <LinkedinIcon /> Share on LinkedIn
              </button>

              <button
                onClick={copyLink}
                className="flex items-center gap-2 px-5 py-2.5 border border-gray-200
                  hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg transition-colors"
              >
                {copied ? <><CheckIcon />Link Copied!</> : <><CopyIcon />Copy Link</>}
              </button>
            </div>

            <p className="mt-3 text-xs text-gray-400">
              Last view on Vfound · {today}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

/* ─────────────────────────────────
   Reusable components
───────────────────────────────── */
function Spinner() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
        <p className="text-sm text-gray-400">Loading…</p>
      </div>
    </div>
  );
}

function LinkedinIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5a3.5 3.5 0 00-3.5-3.5 3.5 3.5 0 00-3.5 3.5v5M8.5 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
    </svg>
  );
}

function NotFound({ internId, message }: { internId: string; message: string | null }) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="rounded-xl border border-gray-100 shadow-sm p-10 max-w-sm w-full text-center">
        <p className="text-4xl mb-3">⚠️</p>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Certificate Not Found</h2>
        <p className="text-sm text-gray-400">{message ?? "Invalid or unissued certificate."}</p>
        {internId && <p className="mt-3 text-xs font-mono text-gray-300">ID: {internId}</p>}
      </div>
    </div>
  );
}

function Badge({ ok, yes, no, neutral }: { ok: boolean; yes: string; no: string; neutral?: boolean }) {
  const bg = ok ? "#dcfce7" : neutral ? "#f3f4f6" : "#fef3c7";
  const fg = ok ? "#15803d" : neutral ? "#6b7280" : "#92400e";
  return (
    <span className="text-xs px-2.5 py-0.5 rounded-full font-medium" style={{ background: bg, color: fg }}>
      {ok ? `✓ ${yes}` : no}
    </span>
  );
}

function Spin() {
  return <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />;
}
function DlIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
    </svg>
  );
}
function CopyIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
    </svg>
  );
}