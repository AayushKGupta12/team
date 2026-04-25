"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase-client";

/* -------------------- TYPES -------------------- */

type Intern = {
  id: string;
  intern_id: string | null;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  assigned_projects: object | null;
};

const TABLES = ["interns", "companies", "users"];

/* -------------------- STATUS LOGIC -------------------- */

// Which dropdown options to show based on current status
function getAllowedStatusOptions(currentStatus: string): string[] {
  if (currentStatus === "pending_validation") return ["approved"];
  if (currentStatus === "project_submitted") return ["submission_approved"];
  return ["approved", "submission_approved"]; // fallback
}

// Whether to show each email button
function showSelectProjectBtn(intern: Intern) {
  return !intern.assigned_projects; // hide if project already assigned
}

function showApproveMailBtn(intern: Intern) {
  const done = ["approved", "submission_approved"];
  return !done.includes(intern.status);
}

function showSubmissionMailBtn(intern: Intern) {
  return intern.status !== "submission_approved";
}

// Whether the status dropdown + save should be visible at all
function canUpdateStatus(currentStatus: string) {
  const terminal = ["submission_approved"];
  return !terminal.includes(currentStatus);
}

/* -------------------- STATUS BADGE COLOR -------------------- */

function statusBadgeClass(status: string) {
  switch (status) {
    case "approved":           return "bg-green-50 text-green-700 border-green-200";
    case "submission_approved": return "bg-purple-50 text-purple-700 border-purple-200";
    case "project_submitted":  return "bg-yellow-50 text-yellow-700 border-yellow-200";
    case "pending_validation": return "bg-slate-100 text-slate-500 border-slate-200";
    default:                   return "bg-slate-100 text-slate-500 border-slate-200";
  }
}

/* -------------------- COMPONENT -------------------- */

export default function AdminInternPanel() {
  const [interns, setInterns]           = useState<Intern[]>([]);
  const [statusMap, setStatusMap]       = useState<Record<string, string>>({});
  const [loadingId, setLoadingId]       = useState<string | null>(null);
  const [emailLoadingKey, setEmailLoadingKey] = useState<string | null>(null);
  const [toast, setToast]               = useState<{ msg: string; ok: boolean } | null>(null);

  const [tableData, setTableData]       = useState<object[]>([]);
  const [activeTable, setActiveTable]   = useState<string | null>(null);
  const [tableLoading, setTableLoading] = useState(false);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => { fetchInterns(); }, []);

  function showToast(msg: string, ok = true) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  }

  /* ---- Fetch ---- */
  async function fetchInterns() {
    const { data } = await supabase
      .from("interns")
      .select("id, intern_id, first_name, last_name, email, status, assigned_projects")
      .eq("active_applicant", true)
      .order("created_at", { ascending: false });

    if (data) {
      setInterns(data);
      const map: Record<string, string> = {};
      data.forEach((i) => (map[i.id] = i.status ?? ""));
      setStatusMap(map);
    }
  }

  /* ---- Update Status ---- */
  async function updateStatus(id: string) {
    setLoadingId(id);
    const intern    = interns.find((i) => i.id === id)!;
    const newStatus = statusMap[id];

    const { error } = await supabase
      .from("interns")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      showToast("Failed to update status", false);
      setLoadingId(null);
      return;
    }

    if (newStatus === "approved" || newStatus === "submission_approved") {
      await sendEmail(intern.email, intern.first_name, newStatus);
    }

    showToast("Status updated");
    fetchInterns();
    setLoadingId(null);
  }

  /* ---- Send Email ---- */
  async function sendEmail(to: string, name: string, type: string, key?: string) {
    if (key) setEmailLoadingKey(key);
    try {
      const res  = await fetch("/api/admin/send-email", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ to, name, type }),
      });
      const json = await res.json();
      res.ok
        ? showToast("Email sent")
        : showToast(json.error ?? "Email failed", false);
    } catch {
      showToast("Network error", false);
    } finally {
      if (key) setEmailLoadingKey(null);
    }
  }

  /* ---- Table Explorer ---- */
  async function loadTable(table: string) {
    setActiveTable(table);
    setTableLoading(true);
    const { data } = await supabase.from(table).select("*").limit(10);
    setTableData(data || []);
    setTableLoading(false);
  }

  /* -------------------- RENDER -------------------- */

  const filtered = interns.filter((i) => {
  if (filter === "needs_approval")    return i.status === "pending_validation";
  if (filter === "needs_submission")  return i.status === "project_submitted";
  if (filter === "no_project")        return !i.assigned_projects;
  return true;
});

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 shadow-lg px-4 py-2.5 rounded-lg text-sm border
          ${toast.ok
            ? "bg-white border-green-200 text-green-800"
            : "bg-white border-red-200 text-red-700"
          }`}>
          {toast.ok ? "✅" : "❌"} {toast.msg}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* Header */}
        <div className="pt-4">
          <h1 className="text-lg sm:text-xl font-semibold text-slate-700">Intern Management</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">Review and update intern statuses</p>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Total",      value: interns.length,                                           color: "text-slate-700" },
            { label: "Pending",    value: interns.filter(i => i.status === "pending_validation").length, color: "text-amber-600" },
            { label: "Approved",   value: interns.filter(i => i.status === "approved").length,      color: "text-green-600" },
            { label: "Completed",  value: interns.filter(i => i.status === "submission_approved").length, color: "text-purple-600" },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white border border-slate-200 rounded-lg px-4 py-3 shadow-sm">
              <p className="text-xs text-slate-400">{label}</p>
              <p className={`text-xl font-semibold mt-0.5 ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        <div className="pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
  <div>
    <h1 className="text-lg sm:text-xl font-semibold text-slate-700">Intern Management</h1>
    <p className="text-xs sm:text-sm text-slate-400 mt-0.5">Review and update intern statuses</p>
  </div>

  <div className="flex items-center gap-2">
    <select
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700
                 focus:outline-none focus:ring-1 focus:ring-indigo-400 shadow-sm"
    >
      <option value="all">All Interns ({interns.length})</option>
      <option value="needs_approval">
        Needs Approval ({interns.filter(i => i.status === "pending_validation").length})
      </option>
      <option value="needs_submission">
        Needs Submission Review ({interns.filter(i => i.status === "project_submitted").length})
      </option>
      <option value="no_project">
        No Project Selected ({interns.filter(i => !i.assigned_projects).length})
      </option>
    </select>

    {filter !== "all" && (
      <button
        onClick={() => setFilter("all")}
        className="text-xs text-slate-400 hover:text-slate-600 border border-slate-200 px-2.5 py-2 rounded-lg bg-white"
      >
        Clear
      </button>
    )}
  </div>
</div>

        {/* ── Interns Table (desktop) ── */}
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wide">
                <th className="px-4 py-3 text-left">Intern ID</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Projects</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Update</th>
                <th className="px-4 py-3 text-left">Email Actions</th>
              </tr>
            </thead>
            <tbody>
              {interns.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-slate-400 text-sm">
                    No interns found
                  </td>
                </tr>
              )}
              {filtered.map((intern) => {
                const allowedOptions = getAllowedStatusOptions(intern.status);
                const canUpdate      = canUpdateStatus(intern.status);

                return (
                  <tr key={intern.id} className="border-b border-slate-100 hover:bg-slate-50/70 transition-colors">

                    {/* Intern ID */}
                    <td className="px-4 py-3 text-slate-400 text-xs font-mono whitespace-nowrap">
                      {intern.intern_id ?? "—"}
                    </td>

                    {/* Name */}
                    <td className="px-4 py-3 font-medium text-slate-700 whitespace-nowrap">
                      {intern.first_name} {intern.last_name}
                    </td>

                    {/* Email */}
                    <td className="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">
                      {intern.email}
                    </td>

                    {/* Projects */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      {intern.assigned_projects ? (
                        <span className="text bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-md">
                          Assigned
                        </span>
                      ) : (
                        <span className="text bg-slate-100 text-slate-400 px-2 py-0.5 rounded-md">
                          None
                        </span>
                      )}
                    </td>

                    {/* Status badge */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`text border px-2 py-0.5 rounded-md ${statusBadgeClass(intern.status)}`}>
                        {intern.status ?? "—"}
                      </span>
                    </td>

                    {/* Dropdown + Save */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      {canUpdate ? (
                        <div className="flex items-center gap-2">
                          <select
                            value={statusMap[intern.id] ?? ""}
                            onChange={(e) => setStatusMap({ ...statusMap, [intern.id]: e.target.value })}
                            className="text-xs border border-slate-200 rounded px-2 py-1.5 bg-white text-slate-700
                                       focus:outline-none focus:ring-1 focus:ring-indigo-400"
                          >
                            <option value="">— select —</option>
                            {allowedOptions.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                          <button
                            onClick={() => updateStatus(intern.id)}
                            disabled={loadingId === intern.id || !statusMap[intern.id]}
                            className="text-xs bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1.5 rounded
                                       disabled:opacity-40 transition-colors"
                          >
                            {loadingId === intern.id ? "…" : "Save"}
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-300 italic">Done</span>
                      )}
                    </td>

                    {/* Email Actions */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 flex-wrap">

                        {showSelectProjectBtn(intern) && (
                          <button
                            onClick={() => sendEmail(intern.email, intern.first_name, "select_project", `${intern.id}_sp`)}
                            disabled={emailLoadingKey === `${intern.id}_sp`}
                            className="text-xs border border-slate-200 text-slate-600 hover:bg-slate-100
                                       px-2.5 py-1 rounded transition-colors disabled:opacity-40"
                          >
                            {emailLoadingKey === `${intern.id}_sp` ? "…" : "Select Project"}
                          </button>
                        )}

                        {showApproveMailBtn(intern) && (
                          <button
                            onClick={() => sendEmail(intern.email, intern.first_name, "approved", `${intern.id}_ap`)}
                            disabled={emailLoadingKey === `${intern.id}_ap`}
                            className="text-xs border border-green-200 text-green-700 hover:bg-green-50
                                       px-2.5 py-1 rounded transition-colors disabled:opacity-40"
                          >
                            {emailLoadingKey === `${intern.id}_ap` ? "…" : "Approve Mail"}
                          </button>
                        )}

                        {showSubmissionMailBtn(intern) && (
                          <button
                            onClick={() => sendEmail(intern.email, intern.first_name, "submission_approved", `${intern.id}_sub`)}
                            disabled={emailLoadingKey === `${intern.id}_sub`}
                            className="text-xs border border-blue-200 text-blue-700 hover:bg-blue-50
                                       px-2.5 py-1 rounded transition-colors disabled:opacity-40"
                          >
                            {emailLoadingKey === `${intern.id}_sub` ? "…" : "Submission ✓"}
                          </button>
                        )}

                        {/* All done — no actions available */}
                        {!showSelectProjectBtn(intern) && !showApproveMailBtn(intern) && !showSubmissionMailBtn(intern) && (
                          <span className="text-xs text-slate-300 italic">—</span>
                        )}

                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ── Mobile Cards ── */}
        <div className="md:hidden space-y-3">
          {interns.length === 0 && (
            <div className="bg-white border border-slate-200 rounded-lg p-6 text-center text-slate-400 text-sm">
              No interns found
            </div>
          )}
          {filtered.map((intern) => {
            const allowedOptions = getAllowedStatusOptions(intern.status);
            const canUpdate      = canUpdateStatus(intern.status);

            return (
              <div key={intern.id} className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm space-y-3">

                {/* Top row */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      {intern.first_name} {intern.last_name}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">{intern.email}</p>
                  </div>
                  <span className={`text-xs border px-2 py-0.5 rounded-full shrink-0 ${statusBadgeClass(intern.status)}`}>
                    {intern.status ?? "—"}
                  </span>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="font-mono">{intern.intern_id ?? "No ID"}</span>
                  <span>·</span>
                  {intern.assigned_projects ? (
                    <span className="text-green-600">Project Assigned</span>
                  ) : (
                    <span className="text-slate-400">No Project</span>
                  )}
                </div>

                {/* Status update */}
                {canUpdate && (
                  <div className="flex items-center gap-2">
                    <select
                      value={statusMap[intern.id] ?? ""}
                      onChange={(e) => setStatusMap({ ...statusMap, [intern.id]: e.target.value })}
                      className="flex-1 text-xs border border-slate-200 rounded px-2 py-1.5 bg-white text-slate-700
                                 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                    >
                      <option value="">— update status —</option>
                      {allowedOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => updateStatus(intern.id)}
                      disabled={loadingId === intern.id || !statusMap[intern.id]}
                      className="text-xs bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1.5 rounded
                                 disabled:opacity-40 transition-colors"
                    >
                      {loadingId === intern.id ? "…" : "Save"}
                    </button>
                  </div>
                )}

                {/* Email actions */}
                <div className="flex flex-wrap gap-1.5 pt-1 border-t border-slate-100">
                  {showSelectProjectBtn(intern) && (
                    <button
                      onClick={() => sendEmail(intern.email, intern.first_name, "select_project", `${intern.id}_sp`)}
                      disabled={emailLoadingKey === `${intern.id}_sp`}
                      className="text-xs border border-slate-200 text-slate-600 hover:bg-slate-100
                                 px-2.5 py-1 rounded transition-colors disabled:opacity-40"
                    >
                      {emailLoadingKey === `${intern.id}_sp` ? "…" : "Select Project"}
                    </button>
                  )}
                  {showApproveMailBtn(intern) && (
                    <button
                      onClick={() => sendEmail(intern.email, intern.first_name, "approved", `${intern.id}_ap`)}
                      disabled={emailLoadingKey === `${intern.id}_ap`}
                      className="text-xs border border-green-200 text-green-700 hover:bg-green-50
                                 px-2.5 py-1 rounded transition-colors disabled:opacity-40"
                    >
                      {emailLoadingKey === `${intern.id}_ap` ? "…" : "Approve Mail"}
                    </button>
                  )}
                  {showSubmissionMailBtn(intern) && (
                    <button
                      onClick={() => sendEmail(intern.email, intern.first_name, "submission_approved", `${intern.id}_sub`)}
                      disabled={emailLoadingKey === `${intern.id}_sub`}
                      className="text-xs border border-blue-200 text-blue-700 hover:bg-blue-50
                                 px-2.5 py-1 rounded transition-colors disabled:opacity-40"
                    >
                      {emailLoadingKey === `${intern.id}_sub` ? "…" : "Submission ✓"}
                    </button>
                  )}
                  {!showSelectProjectBtn(intern) && !showApproveMailBtn(intern) && !showSubmissionMailBtn(intern) && (
                    <span className="text-xs text-slate-300 italic">No actions available</span>
                  )}
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
              <button
                key={t}
                onClick={() => loadTable(t)}
                className={`text-xs px-3 py-1.5 rounded border transition-colors ${
                  activeTable === t
                    ? "bg-indigo-500 text-white border-indigo-500"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
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
                      <th key={col} className="px-3 py-2 text-left text-slate-500 font-medium whitespace-nowrap">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, i) => (
                    <tr key={i} className="border-b border-slate-50 hover:bg-slate-50">
                      {Object.values(row as Record<string, unknown>).map((val, j) => (
                        <td key={j} className="px-3 py-2 text-slate-600 whitespace-nowrap max-w-[160px] truncate">
                          {val === null ? (
                            <span className="text-slate-300">null</span>
                          ) : typeof val === "object" ? (
                            <span className="text-slate-400">{JSON.stringify(val).slice(0, 40)}</span>
                          ) : (
                            String(val)
                          )}
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