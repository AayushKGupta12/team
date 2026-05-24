"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase-client";

/* ═══════════════════════════════════════════════════
   MENTOR LIST
═══════════════════════════════════════════════════ */
const mentors = [
  {
    name: "Aayush Gupta",
    role: "CEO & Founder at Tauzand",
    university: "KIIT University",
    specialization: "Strategy, Operations, Growth",
    linkedin: "",
  },
  {
    name: "Durgesh Panda",
    role: "Mentor & HR Executive at Tauzand",
    university: "BIT Mesra",
    specialization: "Computer Science & Engineering, AIR 1489 JEE MAINS' 21",
    linkedin: "",
  },
  {
    name: "Avneet Singhla",
    role: "Mentor & Business Executive at Tauzand",
    university: "IIT Goa",
    specialization: "School of Mathematics and Computing Science, AIR 890 JEE ADV'21",
    linkedin: "",
  },
  {
    name: "Chawala Gupta",
    role: "Mentor at Tauzand",
    university: "Jadavpur University",
    specialization: "Department of Mathematics & Geological Science",
    linkedin: "",
  },
  {
    name: "Avishikta Anand",
    role: "Mentor at Tauzand",
    university: "IISc Bangalore",
    specialization: "Mathematics & Computing, AIR 705 JEE ADV'25",
    linkedin: "",
  },
];

type Mentor = (typeof mentors)[0];
function randomMentor(): Mentor {
  return mentors[Math.floor(Math.random() * mentors.length)];
}

/* ═══════════════════════════════════════════════════
   LINKS
═══════════════════════════════════════════════════ */
const LINKS = {
  projects:  "https://www.tauzand.in/internship/project",
  validate:  "https://www.tauzand.in/internship/validate",
  dashboard: "https://www.tauzand.in/internship/userdashboard",
  home:      "https://www.tauzand.in",
};

/* ═══════════════════════════════════════════════════
   EMAIL BUILDERS
   Long-form corporate templates to avoid spam filters.
═══════════════════════════════════════════════════ */
function emailFooter(m: Mentor) {
  return `

With regards,
${m.name}
${m.role}
${m.university} : ${m.specialization}
${m.linkedin ? `LinkedIn: ${m.linkedin}` : ""}
Website: ${LINKS.home}
Cert. Verification: ${LINKS.validate}
CONFIDENTIALITY NOTICE
This email and any attachments are confidential and intended solely for the named recipient(s). If you have received this email in error, please notify the sender immediately and delete it from your system. Unauthorized use, disclosure, or copying of this email is strictly prohibited and may be unlawful.
`.trim();
}

function buildApprovedEmail(name: string, internId: string, m: Mentor) {
  return {
    subject: `Application Approved — Tauzand Internship Program | Intern ID: ${internId}`,

    body: `Dear ${name},

Greetings from Tauzand.
We are pleased to formally inform you that, following a comprehensive review of your application and profile, your application for the Tauzand Internship Program has been officially approved.
On behalf of the entire Tauzand team, we extend a warm welcome to you. We are confident that this internship journey will provide meaningful exposure, practical experience, and valuable professional growth opportunities.

INTERN DETAILS

Full Name   : ${name}
Intern ID   : ${internId}
Status      : Approved
Programme   : Tauzand Internship Program


ONBOARDING PROCESS
STEP 1 :- PROJECT SELECTION
Please browse the available industry projects and select the project that best aligns with your interests, technical background, and career objectives.

Browse Projects: ${LINKS.projects}

We recommend completing your project selection at the earliest convenience, as project allocations may become unavailable over time.

STEP 2 :- PROJECT EXECUTION
After project allocation, you may begin working on your assigned project. Guidance and support will be provided throughout the internship period by the assigned mentor team.

STEP 3 :- PROJECT SUBMISSION
Once your work is completed, submit your project through the Intern Dashboard for evaluation and mentor review.

STEP 4 :- CERTIFICATION PROCESS
Upon successful approval of your submission, your official Tauzand Internship Certificate will be issued. and depending on the project and performance, you may also be eligible for additional recognition and Full-time opportunities at Tauzand.

Each certificate issued by Tauzand includes:
• QR-based verification support
• Unique Certificate Identification
• Online employer verification support

Cert. Verification Portal:  ${LINKS.validate}
Intern Dashboard: ${LINKS.dashboard}

IMPORTANT NOTICE REGARDING CERTIFICATES
Tauzand issues only digitally authenticated certificates. Every valid certificate contains a functional QR verification system and a unique Certificate ID verifiable through the official verification portal.
If you encounter any unverifiable certificate claiming association with Tauzand, please report it immediately.

Once again, congratulations and welcome to the Tauzand Internship Program.

${emailFooter(m)}`,
  };
}

function buildSelectProjectEmail(name: string, internId: string, m: Mentor) {
  return {
    subject: `Action Required : Project Selection Pending | Tauzand Internship Program | Intern ID: ${internId}`,

    body: `Dear ${name},

Greetings from Tauzand.

This is a reminder regarding your internship onboarding process.
Our records indicate that your internship application (Intern ID: ${internId}) has already been approved; however, your project selection is still pending.
Please note that project selection is a mandatory requirement for internship continuation and certificate eligibility.

Browse Projects: ${LINKS.projects}

The listed projects are designed to provide practical industry exposure and real-world implementation experience.


WHY PROJECT SELECTION IS IMPORTANT

Your selected project forms the core component of your internship evaluation and final certification process.
Timely project selection and completion will help ensure smooth progression through the internship programme.

Intern Dashboard: ${LINKS.dashboard}

Cert. Verification Portal: ${LINKS.validate}

If you require any clarification regarding available projects or selection guidance, please feel free to contact the Tauzand support team.

${emailFooter(m)}`,
  };
}

function buildSubmissionApprovedEmail(name: string, internId: string, m: Mentor) {
  return {
    subject: `Project Submission Approved : Tauzand Internship Program | Intern ID: ${internId}`,

    body: `Dear ${name},
We are pleased to inform you that your project submission for the Tauzand Internship Program has been successfully reviewed and approved by our mentor panel.

SUBMISSION STATUS

Intern ID    : ${internId}
Candidate    : ${name}
Status       : Submission Approved

NEXT PROCESS
Your submission has successfully satisfied the required quality and evaluation standards established by the Tauzand review committee.
The certification process will now proceed accordingly.


CERTIFICATE INFORMATION

Your verified Tauzand Internship Certificate will include:
• Secure QR verification
• Unique Certificate ID
• Employer verification support

Intern Dashboard: ${LINKS.dashboard}
Cert. Verification: ${LINKS.validate}

${emailFooter(m)}`,
  };
}

function buildCompletedEmail(name: string, internId: string, m: Mentor) {
  return {
    subject: `Internship Successfully Completed — Certificate Available | Intern ID: ${internId}`,

    body: `Dear ${name},

We are delighted to formally confirm the successful completion of your internship under the Tauzand Internship Program. Your dedication, consistency, and professional commitment throughout the programme are sincerely appreciated.

COMPLETION SUMMARY

Intern ID    : ${internId}
Candidate    : ${name}
Programme    : Tauzand Internship & Certification Program
Status       : Successfully Completed within Due_date
Certificate    : Available
Certificate ID   : ${internId}
Certificate_URL: https://www.tauzand.in/certificate/${internId}

CERTIFICATE STATUS

Your official Tauzand Internship Certificate has now been generated and is available through your Intern Dashboard.

Access Dashboard: ${LINKS.dashboard}
Cert. Verification: ${LINKS.validate}

Your certificate includes:

• Secure QR verification support
• Unique Certificate Identification
• Official online verification system

IMPORTANT CERTIFICATION NOTICE

Tauzand maintains strict standards regarding certificate authenticity and verification. Please ensure that all certificates are verified exclusively through the official verification portal.

ADDITIONAL OPPORTUNITIES

You may continue exploring additional projects and certification programmes through the Tauzand platform.

Projects Portal: ${LINKS.projects}

Dashboard: ${LINKS.dashboard}

We sincerely appreciate your contribution and participation in the programme.
We wish you continued success in your academic and professional journey.

${emailFooter(m)}`,
  };
}

function buildCustomEmail(
  name: string,
  internId: string,
  message: string,
  m: Mentor,
) {
  return {
    subject: `Important Update — Tauzand Internship Program | Intern ID: ${internId}`,

    body: `Dear ${name},

Greetings from Tauzand.

We are writing to you regarding your internship profile and programme updates.

INTERN DETAILS

Intern ID : ${internId}

MESSAGE

${message}

IMPORTANT LINKS

Browse Projects:
${LINKS.projects}

Intern Dashboard:
${LINKS.dashboard}

Cert. Verification:
${LINKS.validate}

If you require any assistance, please feel free to contact the Tauzand support team.

${emailFooter(m)}`,
  };
}

/* ═══════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════ */
// AFTER
type Intern = {
  id: string;
  intern_id: string | null;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  university: string | null;
  course: string | null;
  graduation_year: number | null;
  duration: string | null;
  domain: string | null;
  status: string;
  due_date: string | null;
  google_drive_link: string | null;
  payment_status: string | null;
  transaction_id: string | null;
  assigned_projects: object | null;
  active_applicant: boolean;
};

const TABLES = ["interns", "companies", "users"];

/* ═══════════════════════════════════════════════════
   STATUS FLOW
   pending_validation → approved → project_submitted → submission_approved → completed
═══════════════════════════════════════════════════ */
const STATUS_SORT: Record<string, number> = {
  pending_validation:  0,
  project_submitted:   1,
  approved:            2,
  submission_approved: 3,
  completed:           4,
};

function nextStatusOptions(status: string): string[] {
  switch (status) {
    case "pending_validation":  return ["approved"];
    case "project_submitted":   return ["submission_approved"];
    case "submission_approved": return ["completed"];
    default:                    return [];   // approved = candidate working; completed = terminal
  }
}

function statusLabel(s: string) {
  const map: Record<string, string> = {
    pending_validation:  "Pending Validation",
    approved:            "Approved",
    project_submitted:   "Project Submitted",
    submission_approved: "Submission Approved",
    completed:           "Completed",
  };
  return map[s] ?? s;
}

function statusBadge(s: string) {
  switch (s) {
    case "pending_validation":  return "bg-amber-50 text-amber-700 border-amber-200";
    case "approved":            return "bg-green-50 text-green-700 border-green-200";
    case "project_submitted":   return "bg-blue-50 text-blue-700 border-blue-200";
    case "submission_approved": return "bg-purple-50 text-purple-700 border-purple-200";
    case "completed":           return "bg-slate-100 text-slate-500 border-slate-300";
    default:                    return "bg-slate-100 text-slate-500 border-slate-200";
  }
}

/* ═══════════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════════ */
export default function AdminApplicantsClient() {
  const [interns, setInterns]               = useState<Intern[]>([]);
  const [statusMap, setStatusMap]           = useState<Record<string, string>>({});
  const [savingId, setSavingId]             = useState<string | null>(null);
  const [emailKey, setEmailKey]             = useState<string | null>(null);
  const [activeToggleId, setActiveToggleId] = useState<string | null>(null);
  const [toast, setToast]                   = useState<{ msg: string; ok: boolean } | null>(null);
  const [filter, setFilter]                 = useState("all");

  // Table explorer
  const [tableData, setTableData]     = useState<object[]>([]);
  const [activeTable, setActiveTable] = useState<string | null>(null);
  const [tableLoading, setTableLoading] = useState(false);

  // Custom email modal
  const [modalIntern, setModalIntern]       = useState<Intern | null>(null);
  const [modalSubject, setModalSubject]     = useState("");
  const [modalMessage, setModalMessage]     = useState("");
  const [modalMentor, setModalMentor]       = useState(mentors[0].name);

  useEffect(() => { fetchInterns(); }, []);

  function toast$(msg: string, ok = true) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 4000);
  }

  /* ── Fetch ── */
  async function fetchInterns() {
    const { data } = await supabase
      .from("interns")
      .select("id, intern_id, first_name, last_name, email, phone, university, course, graduation_year, duration, domain, status, due_date, google_drive_link, payment_status, transaction_id, assigned_projects, active_applicant")
      .eq("active_applicant", true)
      .order("created_at", { ascending: false });

    if (data) {
      setInterns(data);
      const map: Record<string, string> = {};
      data.forEach((i) => (map[i.id] = ""));
      setStatusMap(map);
    }
  }

  /* ── Send email via API ── */
async function callSendEmail(payload: object, key: string) {
  setEmailKey(key);

  try {
    const res = await fetch("/api/admin/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const json = await res.json();

    if (res.ok) {
      toast$("Email sent ✓");
    } else {
      toast$(json.error ?? "Email failed", false);
    }

  } catch (error) {
    console.error(error);

    toast$("Network error — email not sent", false);

  } finally {
    setEmailKey(null);
  }
}

  /* ── Update status ── */
  async function saveStatus(intern: Intern) {
    const newStatus = statusMap[intern.id];
    if (!newStatus) return;
    setSavingId(intern.id);

    const { error } = await supabase
      .from("interns")
      .update({ status: newStatus })
      .eq("id", intern.id);

    if (error) { toast$("Failed to update status", false); setSavingId(null); return; }

    // Auto-send email on key transitions
    const m = randomMentor();
    const id = intern.intern_id ?? "N/A";

    if (newStatus === "approved") {
      const { subject, body } = buildApprovedEmail(intern.first_name, id, m);
      await callSendEmail({ to: intern.email, subject, body }, `${intern.id}_auto`);
    } else if (newStatus === "submission_approved") {
      const { subject, body } = buildSubmissionApprovedEmail(intern.first_name, id, m);
      await callSendEmail({ to: intern.email, subject, body }, `${intern.id}_auto`);
    } else if (newStatus === "completed") {
      const { subject, body } = buildCompletedEmail(intern.first_name, id, m);
      await callSendEmail({ to: intern.email, subject, body }, `${intern.id}_auto`);
    }

    toast$(`Status → ${statusLabel(newStatus)}`);
    fetchInterns();
    setSavingId(null);
  }

  /* ── Toggle active_applicant ── */
  async function deactivate(id: string) {
    setActiveToggleId(id);
    const { error } = await supabase
      .from("interns")
      .update({ active_applicant: false })
      .eq("id", id);
    error ? toast$("Failed to deactivate", false) : toast$("Applicant deactivated");
    fetchInterns();
    setActiveToggleId(null);
  }

  /* ── Manual email buttons ── */
  function sendSelectProject(intern: Intern) {
    const m = randomMentor();
    const { subject, body } = buildSelectProjectEmail(intern.first_name, intern.intern_id ?? "N/A", m);
    callSendEmail({ to: intern.email, subject, body }, `${intern.id}_sp`);
  }

  function sendApprovalMail(intern: Intern) {
    const m = randomMentor();
    const { subject, body } = buildApprovedEmail(intern.first_name, intern.intern_id ?? "N/A", m);
    callSendEmail({ to: intern.email, subject, body }, `${intern.id}_ap`);
  }

  function sendSubmissionMail(intern: Intern) {
    const m = randomMentor();
    const { subject, body } = buildSubmissionApprovedEmail(intern.first_name, intern.intern_id ?? "N/A", m);
    callSendEmail({ to: intern.email, subject, body }, `${intern.id}_sub`);
  }

  /* ── Send custom email ── */
  async function sendCustomEmail() {
    if (!modalIntern || !modalMessage.trim()) return;
    const m = mentors.find((x) => x.name === modalMentor) ?? mentors[0];
    // ✅ AFTER — destructure just like the other email senders do
    const { subject: autoSubject, body } = buildCustomEmail(
      modalIntern.first_name, modalIntern.intern_id ?? "N/A", modalMessage, m
    );
    const subject = modalSubject.trim() || autoSubject;
    await callSendEmail({ to: modalIntern.email, subject, body }, `${modalIntern.id}_custom`);
    setModalIntern(null);
    setModalMessage("");
    setModalSubject("");
  }

  /* ── Table explorer ── */
  async function loadTable(table: string) {
    setActiveTable(table);
    setTableLoading(true);
    const { data } = await supabase.from(table).select("*").limit(10);
    setTableData(data ?? []);
    setTableLoading(false);
  }

  /* ── Sorted + filtered list ── */
  const sorted = [...interns].sort(
    (a, b) => (STATUS_SORT[a.status] ?? 99) - (STATUS_SORT[b.status] ?? 99),
  );
  const filtered = sorted.filter((i) => {
    if (filter === "pending")   return i.status === "pending_validation";
    if (filter === "submitted") return i.status === "project_submitted";
    if (filter === "approved")  return i.status === "approved";
    if (filter === "done")      return ["submission_approved", "completed"].includes(i.status);
    if (filter === "no_proj")   return !i.assigned_projects;
    return true;
  });

  /* ── Email action buttons (shared between desktop + mobile) ── */
  function EmailActions({ intern }: { intern: Intern }) {
    return (
      <div className="flex items-center gap-1.5 flex-wrap">
        {!intern.assigned_projects && (
          <Btn
            label="📋 Select Project"
            loading={emailKey === `${intern.id}_sp`}
            color="slate"
            onClick={() => sendSelectProject(intern)}
          />
        )}
        {intern.status === "pending_validation" && (
          <Btn
            label="✅ Approve Mail"
            loading={emailKey === `${intern.id}_ap`}
            color="green"
            onClick={() => sendApprovalMail(intern)}
          />
        )}
        {intern.status === "project_submitted" && (
          <Btn
            label="🏆 Submission ✓"
            loading={emailKey === `${intern.id}_sub`}
            color="purple"
            onClick={() => sendSubmissionMail(intern)}
          />
        )}
        <Btn
          label="✉️ Custom Mail"
          loading={false}
          color="indigo"
          onClick={() => {
            setModalIntern(intern);
            setModalMessage("");
            setModalSubject("");
            setModalMentor(randomMentor().name);
          }}
        />
      </div>
    );
  }

  /* ═══════════════════════════════════════════════
     RENDER
  ═══════════════════════════════════════════════ */
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">

      {/* ── Toast ── */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 shadow-lg px-4 py-2.5 rounded-lg text-sm border
          ${toast.ok ? "bg-white border-green-200 text-green-800" : "bg-white border-red-200 text-red-700"}`}>
          {toast.ok ? "✅" : "❌"} {toast.msg}
        </div>
      )}

      {/* ── Custom Email Modal ── */}
      {modalIntern && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg border border-slate-200 overflow-hidden">

            <div className="px-5 py-4 border-b border-slate-100 flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-700">Custom Email</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  To: <span className="text-slate-600">{modalIntern.first_name} {modalIntern.last_name}</span>
                  {" "}— {modalIntern.email}
                </p>
              </div>
              <button onClick={() => setModalIntern(null)} className="text-slate-400 hover:text-slate-600 text-xl leading-none">×</button>
            </div>

            <div className="px-5 py-4 space-y-3 max-h-[70vh] overflow-y-auto">

              {/* Auto-header preview */}
              <div>
                <p className="text-xs text-slate-500 mb-1">Auto-header (always prepended)</p>
                <div className="text-xs bg-slate-50 border border-slate-100 rounded px-3 py-2 text-slate-400 leading-5 whitespace-pre-wrap font-mono">
{`Dear ${modalIntern.first_name},

Intern ID: ${modalIntern.intern_id ?? "N/A"}`}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs text-slate-500 mb-1">Subject <span className="text-slate-300">(optional — auto-filled if blank)</span></label>
                <input
                  type="text"
                  value={modalSubject}
                  onChange={(e) => setModalSubject(e.target.value)}
                  placeholder={`Important Update — Tauzand Internship | ${modalIntern.first_name} ${modalIntern.last_name}`}
                  className="w-full text-xs border border-slate-200 rounded px-3 py-2 bg-white text-slate-700
                             focus:outline-none focus:ring-1 focus:ring-indigo-400"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs text-slate-500 mb-1">Your Message <span className="text-red-400">*</span></label>
                <textarea
                  rows={6}
                  value={modalMessage}
                  onChange={(e) => setModalMessage(e.target.value)}
                  placeholder="Write your message here…"
                  className="w-full text-xs border border-slate-200 rounded px-3 py-2 bg-white text-slate-700
                             focus:outline-none focus:ring-1 focus:ring-indigo-400 resize-none"
                />
              </div>

              {/* Mentor selector */}
              <div>
                <label className="block text-xs text-slate-500 mb-1">Sign-off Mentor</label>
                <select
                  value={modalMentor}
                  onChange={(e) => setModalMentor(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded px-3 py-2 bg-white text-slate-700
                             focus:outline-none focus:ring-1 focus:ring-indigo-400"
                >
                  {mentors.map((m) => (
                    <option key={m.name} value={m.name}>{m.name} — {m.role}</option>
                  ))}
                </select>
                {/* Live sign-off preview */}
                {(() => {
                  const m = mentors.find((x) => x.name === modalMentor) ?? mentors[0];
                  return (
                    <div className="text-xs bg-slate-50 border border-slate-100 rounded px-3 py-2 mt-1.5 text-slate-400 leading-5 whitespace-pre-wrap font-mono">
{`With warm regards,
${m.name}
${m.role}
${m.university} — ${m.specialization}
${m.linkedin ? `LinkedIn: ${m.linkedin}` : ""}
Tauzand | ${LINKS.home}`}
                    </div>
                  );
                })()}
              </div>

            </div>

            <div className="px-5 py-3 border-t border-slate-100 flex justify-end gap-2">
              <button
                onClick={() => setModalIntern(null)}
                className="text-xs border border-slate-200 text-slate-600 px-4 py-2 rounded hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={sendCustomEmail}
                disabled={!modalMessage.trim() || emailKey === `${modalIntern.id}_custom`}
                className="text-xs bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded
                           disabled:opacity-40 transition-colors"
              >
                {emailKey === `${modalIntern.id}_custom` ? "Sending…" : "Send Email"}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ── Page ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* Header */}
        <div className="pt-2">
          <h1 className="text-lg sm:text-xl font-semibold text-slate-700">Intern Management</h1>
          <p className="text-xs text-slate-400 mt-0.5">Sorted: Pending → Submitted → Approved → Done</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { label: "Total",      value: interns.length,                                                   color: "text-slate-700"  },
            { label: "Pending",    value: interns.filter(i => i.status === "pending_validation").length,     color: "text-amber-600"  },
            { label: "Submitted",  value: interns.filter(i => i.status === "project_submitted").length,      color: "text-blue-600"   },
            { label: "Approved",   value: interns.filter(i => i.status === "approved").length,               color: "text-green-600"  },
            { label: "Completed",  value: interns.filter(i => ["submission_approved","completed"].includes(i.status)).length, color: "text-purple-600" },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white border border-slate-200 rounded-lg px-4 py-3 shadow-sm">
              <p className="text-xs text-slate-400">{label}</p>
              <p className={`text-xl font-semibold mt-0.5 ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700
                       focus:outline-none focus:ring-1 focus:ring-indigo-400 shadow-sm"
          >
            <option value="all">All ({interns.length})</option>
            <option value="pending">Needs Approval ({interns.filter(i => i.status === "pending_validation").length})</option>
            <option value="submitted">Needs Review ({interns.filter(i => i.status === "project_submitted").length})</option>
            <option value="approved">Working ({interns.filter(i => i.status === "approved").length})</option>
            <option value="done">Completed ({interns.filter(i => ["submission_approved","completed"].includes(i.status)).length})</option>
            <option value="no_proj">No Project ({interns.filter(i => !i.assigned_projects).length})</option>
          </select>
          {filter !== "all" && (
            <button onClick={() => setFilter("all")}
              className="text-xs text-slate-400 hover:text-slate-600 border border-slate-200 px-2.5 py-2 rounded-lg bg-white">
              Clear
            </button>
          )}
          <span className="text-xs text-slate-400 ml-auto">{filtered.length} intern{filtered.length !== 1 ? "s" : ""}</span>
        </div>

        {/* ── Desktop Table ── */}
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wide">
                  <th className="px-4 py-3 text-left">ID</th>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Phone</th>
                  <th className="px-4 py-3 text-left">University</th>
                  <th className="px-4 py-3 text-left">Course</th>
                  <th className="px-4 py-3 text-left">Grad Year</th>
                  <th className="px-4 py-3 text-left">Duration</th>
                  <th className="px-4 py-3 text-left">Domain</th>
                  <th className="px-4 py-3 text-left">Due Date</th>
                  <th className="px-4 py-3 text-left">Project</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">View_Proj.</th>
                  <th className="px-4 py-3 text-left">Update Status</th>
                  <th className="px-4 py-3 text-left">Action</th>
                  <th className="px-4 py-3 text-left">Payment</th>
                  <th className="px-4 py-3 text-left">Reg Txn ID</th>
                  <th className="px-4 py-3 text-left">Active</th>
                </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="px-4 py-12 text-center text-slate-400 text-sm">No interns found</td></tr>
              )}
              {filtered.map((intern) => {
                const opts = nextStatusOptions(intern.status);
                return (
                  <tr key={intern.id} className="border-b border-slate-100 hover:bg-slate-50/70 transition-colors">

                    <td className="px-4 py-3 text-slate-400 text-xs font-mono whitespace-nowrap">
                      {intern.intern_id ?? "—"}
                    </td>

                    <td className="px-4 py-3 font-medium text-slate-700 whitespace-nowrap">
                      {intern.first_name} {intern.last_name}
                    </td>

                    <td className="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">
                      {intern.email}
                    </td>

                    <td className="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">
                      {intern.phone ?? "—"}
                    </td>

                    <td className="px-4 py-3 text-slate-600 text-xs max-w-[160px] truncate" title={intern.university ?? ""}>
                      {intern.university ?? "—"}
                    </td>

                    <td className="px-4 py-3 text-slate-600 text-xs whitespace-nowrap">
                      {intern.course ?? "—"}
                    </td>

                    <td className="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">
                      {intern.graduation_year ?? "—"}
                    </td>

                    <td className="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">
                      {intern.duration ?? "—"}
                    </td>

                    <td className="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">
                      {intern.domain ?? "—"}
                    </td>

                    <td className="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">
                      {intern.due_date
                        ? new Date(intern.due_date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
                        : "—"}
                    </td>

                    {/* Project assigned */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        {intern.assigned_projects
                          ? <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-md">Assigned</span>
                          : <span className="text-xs bg-slate-100 text-slate-400 px-2 py-0.5 rounded-md">None</span>}
                      </td>

                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`text-xs border px-2 py-0.5 rounded-md ${statusBadge(intern.status)}`}>
                        {statusLabel(intern.status)}
                      </span>
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap">
                      {intern.google_drive_link
                        ? (
                          
                           <a href={intern.google_drive_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-indigo-600 border border-indigo-200 bg-indigo-50 px-2 py-0.5 rounded-md
                                      hover:bg-indigo-100 transition-colors inline-flex items-center gap-1"
                          >
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                              <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                            </svg>
                            Open
                          </a>
                        )
                        : <span className="text-xs text-slate-300">—</span>}
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap">
                      {opts.length > 0 ? (
                        <div className="flex items-center gap-2">
                          <select
                            value={statusMap[intern.id] ?? ""}
                            onChange={(e) => setStatusMap({ ...statusMap, [intern.id]: e.target.value })}
                            className="text-xs border border-slate-200 rounded px-2 py-1.5 bg-white text-slate-700
                                       focus:outline-none focus:ring-1 focus:ring-indigo-400"
                          >
                            <option value="">— select —</option>
                            {opts.map((s) => <option key={s} value={s}>{statusLabel(s)}</option>)}
                          </select>
                          <button
                            onClick={() => saveStatus(intern)}
                            disabled={savingId === intern.id || !statusMap[intern.id]}
                            className="text-xs bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1.5 rounded
                                       disabled:opacity-40 transition-colors"
                          >
                            {savingId === intern.id ? "…" : "Save"}
                          </button>
                        </div>
                      ) : intern.status === "approved" ? (
                        <span className="text-xs text-green-500 italic">Working…</span>
                      ) : (
                        <span className="text-xs text-slate-300 italic">Done</span>
                      )}
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap">
                      <EmailActions intern={intern} />
                    </td>

                      {/* Payment status */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        {intern.payment_status === "paid"
                          ? <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-md">Paid</span>
                          : intern.payment_status === "unpaid"
                          ? <span className="text-xs bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded-md">Unpaid</span>
                          : <span className="text-xs bg-amber-50 text-amber-600 border border-amber-200 px-2 py-0.5 rounded-md">
                              {intern.payment_status ?? "—"}
                            </span>}
                      </td>

                      {/* Transaction ID */}
                      <td className="px-4 py-3 text-slate-400 text-xs font-mono whitespace-nowrap">
                        {intern.transaction_id ?? "—"}
                      </td>

                    <td className="px-4 py-3 whitespace-nowrap">
                      <select
                        defaultValue="active"
                        disabled={activeToggleId === intern.id}
                        onChange={(e) => { if (e.target.value === "off") deactivate(intern.id); }}
                        className="text-xs border border-slate-200 rounded px-2 py-1.5 bg-white text-slate-700
                                   focus:outline-none focus:ring-1 focus:ring-red-300 disabled:opacity-40"
                      >
                        <option value="active">🟢 Active</option>
                        <option value="off">🔴 Deactivate</option>
                      </select>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ── Mobile Cards ── */}
        <div className="md:hidden space-y-3">
          {filtered.length === 0 && (
            <div className="bg-white border border-slate-200 rounded-lg p-6 text-center text-slate-400 text-sm">
              No interns found
            </div>
          )}
          {filtered.map((intern) => {
            const opts = nextStatusOptions(intern.status);
            return (
              <div key={intern.id} className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm space-y-3">

                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium text-slate-700">{intern.first_name} {intern.last_name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{intern.email}</p>
                  </div>
                  <span className={`text-xs border px-2 py-0.5 rounded-full shrink-0 ${statusBadge(intern.status)}`}>
                    {statusLabel(intern.status)}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="font-mono">{intern.intern_id ?? "No ID"}</span>
                  <span>·</span>
                  {intern.assigned_projects
                    ? <span className="text-green-600">Project Assigned</span>
                    : <span>No Project</span>}
                </div>

                {opts.length > 0 && (
                  <div className="flex items-center gap-2">
                    <select
                      value={statusMap[intern.id] ?? ""}
                      onChange={(e) => setStatusMap({ ...statusMap, [intern.id]: e.target.value })}
                      className="flex-1 text-xs border border-slate-200 rounded px-2 py-1.5 bg-white text-slate-700
                                 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                    >
                      <option value="">— update status —</option>
                      {opts.map((s) => <option key={s} value={s}>{statusLabel(s)}</option>)}
                    </select>
                    <button
                      onClick={() => saveStatus(intern)}
                      disabled={savingId === intern.id || !statusMap[intern.id]}
                      className="text-xs bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1.5 rounded disabled:opacity-40"
                    >
                      {savingId === intern.id ? "…" : "Save"}
                    </button>
                  </div>
                )}
                {intern.status === "approved" && opts.length === 0 && (
                  <p className="text-xs text-green-500 italic">Candidate is working on project</p>
                )}

                <div className="pt-1 border-t border-slate-100">
                  <EmailActions intern={intern} />
                </div>

                <div className="pt-1 border-t border-slate-100">
                  <select
                    defaultValue="active"
                    disabled={activeToggleId === intern.id}
                    onChange={(e) => { if (e.target.value === "off") deactivate(intern.id); }}
                    className="w-full text-xs border border-slate-200 rounded px-2 py-1.5 bg-white text-slate-700
                               focus:outline-none focus:ring-1 focus:ring-red-300 disabled:opacity-40"
                  >
                    <option value="active">🟢 Active Applicant</option>
                    <option value="off">🔴 Deactivate</option>
                  </select>
                </div>

              </div>
            );
          })}
        </div>

        {/* ── Table Explorer ── */}
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4 sm:p-5 space-y-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-600">Table Explorer</h2>
            <p className="text-xs text-slate-400 mt-0.5">First 10 rows</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {TABLES.map((t) => (
              <button key={t} onClick={() => loadTable(t)}
                className={`text-xs px-3 py-1.5 rounded border transition-colors ${
                  activeTable === t
                    ? "bg-indigo-500 text-white border-indigo-500"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
                {t}
              </button>
            ))}
          </div>
          {tableLoading && <p className="text-xs text-slate-400">Loading…</p>}
          {!tableLoading && tableData.length > 0 && (
            <div className="overflow-x-auto rounded border border-slate-100">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    {Object.keys(tableData[0]).map((col) => (
                      <th key={col} className="px-3 py-2 text-left text-slate-500 font-medium whitespace-nowrap">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, i) => (
                    <tr key={i} className="border-b border-slate-50 hover:bg-slate-50">
                      {Object.values(row as Record<string, unknown>).map((val, j) => (
                        <td key={j} className="px-3 py-2 text-slate-600 whitespace-nowrap max-w-[160px] truncate">
                          {val === null
                            ? <span className="text-slate-300">null</span>
                            : typeof val === "object"
                              ? <span className="text-slate-400">{JSON.stringify(val).slice(0, 40)}</span>
                              : String(val)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   TINY BUTTON HELPER
═══════════════════════════════════════════════════ */
function Btn({
  label, loading, color, onClick,
}: {
  label: string;
  loading: boolean;
  color: "slate" | "green" | "purple" | "indigo";
  onClick: () => void;
}) {
  const colors = {
    slate:  "border-slate-200 text-slate-600 hover:bg-slate-100",
    green:  "border-green-200 text-green-700 hover:bg-green-50",
    purple: "border-purple-200 text-purple-700 hover:bg-purple-50",
    indigo: "border-indigo-200 text-indigo-700 hover:bg-indigo-50",
  };
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`text-xs border px-2.5 py-1 rounded transition-colors disabled:opacity-40 ${colors[color]}`}
    >
      {loading ? "…" : label}
    </button>
  );
}