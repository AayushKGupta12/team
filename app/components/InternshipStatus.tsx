import { useEffect, useState } from "react";

interface ProjectData {
  id?: string;
  title?: string;
  description?: string;
  domain?: string;
  fields?: string[];
  tech_stack?: string[];
  performance_focus?: string;
}

interface StatusData {
  intern_id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  university?: string;
  course?: string;
  graduation_year?: string | number;
  cgpa?: string | number;
  duration?: string;
  domain?: string;
  status?: string;
  applied_at?: string;
  due_date?: string;
  assigned_projects?: any;
  project_details?: ProjectData[]; // resolved by backend
}

const STATUS_LABELS: Record<string, { label: string; color: string; bg: string; ring: string; dot: string }> = {
  pending_validation: {
    label: "Pending Validation",
    color: "text-amber-700", bg: "bg-amber-50", ring: "border-amber-200", dot: "bg-amber-400",
  },
  validated: {
    label: "Validated ✓",
    color: "text-emerald-700", bg: "bg-emerald-50", ring: "border-emerald-200", dot: "bg-emerald-500",
  },
  project_submitted: {
    label: "Project Submitted",
    color: "text-sky-700", bg: "bg-sky-50", ring: "border-sky-200", dot: "bg-sky-400",
  },
  approved: {
    label: "Project Approved ✓",
    color: "text-emerald-700", bg: "bg-emerald-50", ring: "border-emerald-200", dot: "bg-emerald-500",
  },
  payment_pending: {
    label: "Payment Pending",
    color: "text-violet-700", bg: "bg-violet-50", ring: "border-violet-200", dot: "bg-violet-400",
  },
  completed: {
    label: "Completed 🎉",
    color: "text-indigo-700", bg: "bg-indigo-50", ring: "border-indigo-200", dot: "bg-indigo-500",
  },
};

const DURATION_LABELS: Record<string, string> = {
  "30_days": "30 Days",
  "60_days": "60 Days",
  "90_days": "90 Days",
  "6_months": "6 Months",
};

const formatDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "—";

interface Props {
  internId?: string;
  onValidated?: () => void;
}

export default function InternshipStatus({ internId: propId, onValidated }: Props) {
  const [query,   setQuery]   = useState(propId ?? "");
  const [data,    setData]    = useState<StatusData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");
  const [fetched, setFetched] = useState(false);

  /* Auto-fetch when propId is provided */
  useEffect(() => {
    if (propId) {
      setQuery(propId);
      doFetch(propId);
    }
  }, [propId]);

  /* When status changes to a "done" state, fire onValidated */
  // useEffect(() => {
  //   if (!data?.status) return;
  //   const advanceOn = ["validated", "approved", "payment_pending", "completed"];
  //   if (advanceOn.includes(data.status)) {
  //     const t = setTimeout(() => onValidated?.(), 7000);
  //     return () => clearTimeout(t);
  //   }
  // }, [data?.status]);

  const doFetch = async (id?: string) => {
    const target = (id ?? query).trim();
    if (!target) { setError("Please enter your Intern ID."); return; }

    setLoading(true); setError(""); setData(null); setFetched(false);

    try {
      const res  = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/internship/status/${target}`);
      const json = await res.json();
      if (!res.ok || json.error) {
        setError(json.error || "No application found for this ID.");
      } else {
        setData(json);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false); setFetched(true);
    }
  };

  const cfg        = data?.status ? STATUS_LABELS[data.status] ?? STATUS_LABELS.pending_validation : null;
  const canAdvance = data?.status && ["validated", "approved", "payment_pending", "completed"].includes(data.status);
  const projects   = data?.project_details ?? [];

  return (
    <div className="w-full p-8 space-y-5">

      {/* Search row */}
      <div>
        <label className="block text-md font-semibold uppercase tracking-widest text-gray-800 mb-2">
          Intern ID
        </label>
        <div className="flex gap-3">
          <input
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value); setError(""); }}
            onKeyDown={e => e.key === "Enter" && doFetch()}
            placeholder="e.g. VF2026DS15***"
            readOnly={!!propId}
            className={`flex-1 px-4 py-2.5 bg-gray-50 border rounded-xl text-sm text-gray-900
              placeholder-gray-300 focus:outline-none focus:border-indigo-400 focus:ring-2
              focus:ring-indigo-100 transition-all
              ${propId ? "opacity-70 cursor-default" : "border-gray-200"}`}
          />
          <button
            onClick={() => doFetch()}
            disabled={loading}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm
              font-medium rounded-xl transition-colors shadow-sm disabled:opacity-60
              flex items-center gap-2 whitespace-nowrap">
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                </svg>
                Checking…
              </>
            ) : "Check Status"}
          </button>
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-500 flex items-center gap-1.5">
            <span>⚠</span> {error}
          </p>
        )}
      </div>

      {/* Result card */}
      {data && (
        <div className="border border-gray-400 rounded-2xl overflow-hidden">

          {/* Status banner */}
          {cfg && (
            <div className={`flex items-center gap-3 px-5 py-4 border-b ${cfg.bg} ${cfg.ring}`}>
              <span className={`w-2.5 h-2.5 rounded-full ${cfg.dot} shrink-0 animate-pulse`}/>
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-950 mb-0.5">Status</p>
                <p className={`text-base font-semibold ${cfg.color}`}>{cfg.label}</p>
              </div>
              {data.intern_id && (
                <div className="text-right">
                  <p className="text-sm font-mono font-bold text-gray-700">{data.intern_id}</p>
                </div>
              )}
            </div>
          )}

          <div className="p-5 space-y-5">

            {/* Applicant */}
            {(data.first_name || data.email) && (
              <Section title="Applicant">
                <Row label="Name"  value={[data.first_name, data.last_name].filter(Boolean).join(" ")} />
                <Row label="Email" value={data.email} />
                <Row label="Phone" value={data.phone} />
              </Section>
            )}

            {/* Education */}
            {(data.university || data.course) && (
              <Section title="Education">
                <Row label="University" value={data.university} />
                <Row label="Course"     value={data.course} />
                <Row label="Grad. Year" value={String(data.graduation_year ?? "")} />
                <Row label="CGPA"       value={String(data.cgpa ?? "")} />
              </Section>
            )}

            {/* Internship details */}
            {(data.domain || data.duration) && (
              <Section title="Internship">
                <Row label="Domain"   value={data.domain} />
                <Row label="Duration" value={DURATION_LABELS[data.duration ?? ""] ?? data.duration} />
                <Row label="Applied"  value={formatDate(data.applied_at)} />
                <Row label="Due Date" value={formatDate(data.due_date)} />
              </Section>
            )}

            {/* Assigned Projects — populated from backend-resolved project_details */}
            {projects.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
                  Assigned Project{projects.length > 1 ? "s" : ""}
                </p>
                <div className="space-y-3">
                  {projects.map((proj, idx) => (
                    <div key={proj.id ?? idx} className="bg-gray-50 border border-gray-100 rounded-xl overflow-hidden">

                      {/* Project header: title + short ID */}
                      <div className="px-4 py-3 border-b border-gray-100 flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-800">
                            {proj.title ?? "Untitled Project"}
                          </p>
                          {proj.description && (
                            <p className="text-xs text-gray-700 leading-relaxed line-clamp-2">
                              Description : {proj.description}
                            </p>
                          )}
                        </div>
                        {proj.id && (
                          <span className="text-[10px] font-mono text-gray-700 bg-gray-200 border border-gray-300 rounded px-2 py-1.5">
                            {proj.id}
                          </span>
                        )}
                      </div>

                      {/* Project meta */}
                      <Row label="Domain"            value={proj.domain} />
                      <Row label="Performance Focus" value={proj.performance_focus} />
                      <TagRow label="Fields"         tags={proj.fields} />
                      <TagRow label="Tech Stack"     tags={proj.tech_stack} />

                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Pending notice */}
          {data.status === "pending_validation" && (
            <div className="mx-5 mb-5 flex items-start gap-2.5 bg-amber-50 border border-amber-100
              rounded-xl px-4 py-3">
              <span className="text-amber-500 mt-0.5 text-base">⏳</span>
              <p className="text-sm text-amber-700 leading-relaxed">
                Your application is under review. <br/>
                It may take up to 3 business days to validate your details. We appreciate your patience!
              </p>
            </div>
          )}

          {/* Advance button */}
          {canAdvance && onValidated && (
            <div className="px-5 pb-5">
              <button onClick={onValidated}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm
                  font-medium rounded-xl transition-colors flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                </svg>
                Continue to Project Submission
              </button>
            </div>
          )}
        </div>
      )}

      {/* Empty state */}
      {fetched && !data && !error && (
        <div className="text-center py-10 bg-gray-50 rounded-2xl border border-gray-100">
          <p className="text-3xl mb-2">🔍</p>
          <p className="font-medium text-gray-700">No application found</p>
          <p className="text-sm text-gray-400 mt-1">Double-check your Intern ID and try again.</p>
        </div>
      )}

      {/* Waiting hint */}
      {!fetched && !loading && propId && (
        <div className="flex items-center justify-center py-10 gap-3">
          <svg className="animate-spin w-5 h-5 text-indigo-400" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
          </svg>
          <p className="text-sm text-gray-400">Loading your status…</p>
        </div>
      )}
    </div>
  );
}

/* ── Sub-components (unchanged) ── */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-950 mb-2">{title}</p>
      <div className="bg-gray-50 border border-gray-100 rounded-md overflow-hidden">
        {children}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value?: string }) {
  if (!value || value === "—") return null;
  return (
    <div className="flex justify-between items-center px-4 py-2.5 border-b border-gray-300 last:border-0">
      <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</span>
      <span className="text-sm text-gray-700 font-medium text-right max-w-[60%]">{value}</span>
    </div>
  );
}

/* Renders array fields as small pill badges, matching the existing gray palette */
function TagRow({ label, tags }: { label: string; tags?: string[] }) {
  if (!tags?.length) return null;
  return (
    <div className="flex items-start justify-between gap-3 px-4 py-2.5 border-b border-gray-300 last:border-0">
      <span className="text-xs font-medium text-gray-400 uppercase tracking-wider shrink-0 pt-0.5">{label}</span>
      <div className="flex flex-wrap gap-1 justify-end max-w-[60%]">
        {tags.map(tag => (
          <span key={tag}
            className="font-semibold text-gray-600 bg-amber-100 border border-amber-200 rounded-md px-2">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}