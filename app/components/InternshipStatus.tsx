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
  project_details?: ProjectData[];
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
  "45_days": "45 Days",
  "60_days": "60 Days",
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

  useEffect(() => {
    if (propId) {
      setQuery(propId);
      doFetch(propId);
    }
  }, [propId]);

  const doFetch = async (id?: string) => {
    const target = (id ?? query).trim();
    if (!target) { 
      setError("Please enter your Intern ID."); 
      return; 
    }

    setLoading(true); 
    setError(""); 
    setData(null); 
    setFetched(false);

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
      setLoading(false); 
      setFetched(true);
    }
  };

  const cfg      = data?.status ? STATUS_LABELS[data.status] ?? STATUS_LABELS.pending_validation : null;
  const projects   = data?.project_details ?? [];

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">

      {/* Search Row */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 uppercase tracking-wider">
          Intern ID
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value); setError(""); }}
            onKeyDown={e => e.key === "Enter" && doFetch()}
            placeholder="e.g. VF2026DS15***"
            readOnly={!!propId}
            className={`flex-1 px-4 py-2.5 bg-gray-50 border rounded-xl text-sm text-gray-900
              placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2
              focus:ring-indigo-100 transition-all w-full
              ${propId ? "opacity-70 cursor-default border-gray-200" : "border-gray-300"}`}
          />
          <button
            onClick={() => doFetch()}
            disabled={loading}
            className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm
              font-medium rounded-xl transition-colors shadow-sm disabled:opacity-60
              flex items-center justify-center gap-2 whitespace-nowrap">
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                </svg>
                Checking…
              </>
            ) : "Check Status"}
          </button>
        </div>
        {error && (
          <p className="text-sm text-red-600 flex items-center gap-2 mt-1">
            <span>⚠</span> {error}
          </p>
        )}
      </div>

      {/* Result Card */}
      {data && (
        <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm">

          {/* Status Banner */}
          {cfg && (
            <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b ${cfg.bg} ${cfg.ring}`}>
              <div className="flex items-center gap-3">
                <span className={`w-2.5 h-2.5 rounded-full ${cfg.dot} shrink-0 animate-pulse`}/>
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wider text-gray-500 mb-0.5">Status</p>
                  <p className={`text-base font-semibold ${cfg.color}`}>{cfg.label}</p>
                </div>
              </div>
              {data.intern_id && (
                <div className="sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-gray-200/40">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">Intern ID</p>
                  <p className="text-sm font-mono font-medium text-gray-700">{data.intern_id}</p>
                </div>
              )}
            </div>
          )}

          <div className="p-5 space-y-6">

            {/* Applicant Section */}
            {(data.first_name || data.email) && (
              <Section title="Applicant">
                <Row label="Name"  value={[data.first_name, data.last_name].filter(Boolean).join(" ")} />
                <Row label="Email" value={data.email} />
                <Row label="Phone" value={data.phone} />
              </Section>
            )}

            {/* Education Section */}
            {(data.university || data.course) && (
              <Section title="Education">
                <Row label="University" value={data.university} />
                <Row label="Course"     value={data.course} />
                <Row label="Grad. Year" value={String(data.graduation_year ?? "")} />
                <Row label="CGPA"       value={String(data.cgpa ?? "")} />
              </Section>
            )}

            {/* Internship Section */}
            {(data.domain || data.duration) && (
              <Section title="Internship">
                <Row label="Domain"   value={data.domain} />
                <Row label="Duration" value={DURATION_LABELS[data.duration ?? ""] ?? data.duration} />
                <Row label="Applied"  value={formatDate(data.applied_at)} />
                <Row label="Due Date" value={formatDate(data.due_date)} />
              </Section>
            )}

            {/* Assigned Projects Section */}
            {projects.length > 0 && (
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Assigned Project{projects.length > 1 ? "s" : ""}
                </p>
                <div className="space-y-4">
                  {projects.map((proj, idx) => (
                    <div key={proj.id ?? idx} className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
                      <div className="px-4 py-3.5 border-b border-gray-200 flex flex-col sm:flex-row items-start justify-between gap-3 bg-white">
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-gray-800 text-sm sm:text-base">
                            {proj.title ?? "Untitled Project"}
                          </p>
                          {proj.description && (
                            <p className="text-xs text-gray-600 leading-relaxed mt-1">
                              {proj.description}
                            </p>
                          )}
                        </div>
                        {proj.id && (
                          <span className="text-[11px] font-mono font-medium text-gray-600 bg-gray-100 border border-gray-200 rounded-md px-2.5 py-1 shrink-0 self-start sm:self-auto">
                            {proj.id}
                          </span>
                        )}
                      </div>

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

          {/* Pending Notice Box */}
          {data.status === "pending_validation" && (
            <div className="mx-5 mb-5 flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3.5">
              <span className="text-amber-500 text-base shrink-0">⏳</span>
              <div className="text-sm text-amber-800 space-y-2 leading-relaxed">
                <p className="font-medium">Your application is under review.</p>
                <p>It may take up to 3 business days to validate your details. We appreciate your patience!</p>
                <p>
                  In the meantime, feel free to explore our{" "}
                  <a href="/internship/project" className="underline font-medium text-blue-600 hover:text-blue-800 transition-colors">
                    Guide
                  </a>{" "}
                  to prepare for your internship journey.
                </p>
                <p className="text-xs pt-1 border-t border-amber-200/60">
                  Questions? Contact us at{" "}
                  <a href="mailto:support@Tauzand.in" className="underline font-medium text-blue-600 hover:text-blue-800 transition-colors">
                    support@Tauzand.in
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Empty State Box */}
      {fetched && !data && !error && (
        <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-200 p-4">
          <p className="text-3xl mb-3">🔍</p>
          <p className="font-medium text-gray-800 text-sm">No application found</p>
          <p className="text-xs text-gray-500 mt-1">Double-check your Intern ID and try again.</p>
        </div>
      )}

      {/* Standby Loader */}
      {!fetched && !loading && propId && (
        <div className="flex items-center justify-center py-12 gap-3">
          <svg className="animate-spin w-5 h-5 text-indigo-500" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
          </svg>
          <p className="text-sm text-gray-500 font-medium">Loading your status…</p>
        </div>
      )}
    </div>
  );
}

/* ── Refined & Harmonized Sub-components ── */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">{title}</p>
      <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-200">
        {children}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value?: string }) {
  if (!value || value === "—") return null;
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 py-3 gap-1 sm:gap-4 bg-gray-50">
      <span className="text-xs font-medium text-gray-400 uppercase tracking-wider sm:w-36 shrink-0">
        {label}
      </span>
      <span className="text-sm text-gray-700 font-normal break-all sm:text-right flex-1">
        {value}
      </span>
    </div>
  );
}

function TagRow({ label, tags }: { label: string; tags?: string[] }) {
  if (!tags?.length) return null;
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start px-4 py-3 gap-2 sm:gap-4 bg-gray-50">
      <span className="text-xs font-medium text-gray-400 uppercase tracking-wider sm:w-36 shrink-0 sm:pt-1">
        {label}
      </span>
      <div className="flex flex-wrap gap-1.5 sm:justify-end flex-1">
        {tags.map(tag => (
          <span 
            key={tag}
            className="text-xs font-normal text-gray-700 bg-amber-100 border border-amber-200 rounded-md px-2.5 py-0.5"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}