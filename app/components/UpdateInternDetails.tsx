"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API = process.env.NEXT_PUBLIC_API_URL;

const DOMAINS = [
  "Data Science", "Machine Learning", "Web Development",
  "Mobile Development", "UI/UX Design", "DevOps",
  "Cloud Computing", "Backend - Java", "Backend - Flask",
  "Data Analyst", "MLOps", "Frontend", "Other",
];

const DURATIONS = [
  { value: "30_days", label: "30 Days" },
  { value: "45_days", label: "45 Days" },
  { value: "60_days", label: "60 Days" },
];

interface InternRecord {
  intern_id: string;
  domain: string;
  duration: string;
  status: string;
  is_validated: boolean;
  is_project_submitted: boolean;
  is_approved: boolean;
  is_completed: boolean;
  created_at: string;
}

/* ── helpers ── */
const statusLabel = (r: InternRecord) => {
  if (r.is_completed)          return { text: "Completed",    color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" };
  if (r.is_approved)           return { text: "Approved",     color: "text-blue-600",    bg: "bg-blue-50",    border: "border-blue-200" };
  if (r.is_project_submitted)  return { text: "Under Review", color: "text-violet-600",  bg: "bg-violet-50",  border: "border-violet-200" };
  if (r.is_validated)          return { text: "Validated",    color: "text-sky-600",     bg: "bg-sky-50",     border: "border-sky-200" };
  return                              { text: "Pending",       color: "text-amber-600",   bg: "bg-amber-50",   border: "border-amber-200" };
};

const canEdit = (r: InternRecord) =>
  // Allow domain/duration changes only before project is submitted
  !r.is_project_submitted && !r.is_approved && !r.is_completed;

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

/* ══════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════ */
export default function UpdateInternDetails() {
  const { user, isLoaded } = useUser();

  const [records,   setRecords]   = useState<InternRecord[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [editId,    setEditId]    = useState<string | null>(null);
  const [editForm,  setEditForm]  = useState({ domain: "", duration: "" });
  const [saving,    setSaving]    = useState(false);
  const [error,     setError]     = useState("");
  const [success,   setSuccess]   = useState("");
  const [showWarn,  setShowWarn]  = useState(false); // "this resets validation" warning
  const [deleting,          setDeleting]          = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId,          setDeleteId]          = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded || !user?.id) return;
    fetch(`${API}/api/internship/by-clerk/${user.id}`)
      .then(r => r.json())
      .then(data => {
        // by-clerk may return one object or you can extend it to return array
        // If it returns a single object wrap it; adjust if your API returns array
        const arr = Array.isArray(data) ? data : data.intern_id ? [data] : [];
        setRecords(arr);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [isLoaded, user?.id]);

  const openEdit = (r: InternRecord) => {
    setEditId(r.intern_id);
    setEditForm({ domain: r.domain, duration: r.duration });
    setError("");
    setSuccess("");
    setShowWarn(r.is_validated); // warn if already validated
  };

  const closeEdit = () => {
    setEditId(null);
    setShowWarn(false);
    setError("");
  };

  const handleSave = async () => {
    if (!editForm.domain || !editForm.duration) {
      setError("Please select both domain and duration.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const res  = await fetch(`${API}/api/internship/update/${editId}`, {
        method:  "PATCH",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(editForm),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Update failed."); return; }

      // Update local state
      setRecords(prev => prev.map(r =>
        r.intern_id === editId
          ? { ...r, ...editForm, is_validated: false, is_project_submitted: false,
              is_approved: false, status: "pending_validation" }
          : r
      ));
      setSuccess("Updated successfully !");
      setEditId(null);
      setShowWarn(false);
    } catch {
      setError("Network error. Try again.");
    } finally {
      setSaving(false);
    }
  };



  const openDeleteConfirm = (internId: string) => {
    setDeleteId(internId);
    setShowDeleteConfirm(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);

    try {
      const res = await fetch(`${API}/api/internship/restart/${deleteId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setRecords(prev => prev.filter(r => r.intern_id !== deleteId));
        setSuccess("Internship Permanently Deactivated.");
      } else {
        setError("Failed to deactivate internship.");
      }
    } catch {
      setError("Network error while deleting.");
    } finally {
      setDeleting(false);
      setShowDeleteConfirm(false);
      setDeleteId(null);
    }
  };

  /* ── loading ── */
  if (loading || !isLoaded) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-8 flex items-center justify-center gap-3">
        <svg className="animate-spin w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
        </svg>
        <p className="text-sm text-gray-600">Loading internship records…</p>
      </div>
    );
  }

  const canAddNew = records.length < 3;

  return (
    <div className="space-y-4">

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-gray-900">Manage Ongoing Internships</h2>
        </div>

        {/* Slot indicator pills */}
        <div className="flex gap-1.5">
          {[0, 1, 2].map(i => (
            <div key={i} className={`w-2.5 h-2.5 rounded-full transition-colors
              ${i < records.length ? "bg-blue-500" : "bg-gray-200"}`}
            />
          ))}
        </div>
      </div>

      {/* ── Success toast ── */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50
              border border-emerald-200 rounded-xl px-4 py-3"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
            {success}
            <button onClick={() => setSuccess("")} className="ml-auto text-emerald-600 hover:text-emerald-700">
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Empty state ── */}
      {records.length === 0 && (
        <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-10 text-center">
          <p className="text-sm font-semibold text-gray-500 mb-1">No internships yet</p>
          <p className="text-xs text-gray-600">Complete the Apply step in your dashboard to get started.</p>
        </div>
      )}

      {/* ── Intern cards ── */}
      {records.map((r, i) => {
        const st      = statusLabel(r);
        const editable = canEdit(r);
        const isEditing = editId === r.intern_id;

        return (
          <motion.div
            key={r.intern_id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-gray-200 bg-white overflow-hidden"
          >
            {/* Card header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                {/* Slot number */}
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center
                  text-blue-600 text-xs font-bold shrink-0">
                  {i + 1}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{r.domain}</p>
                  <p className="text-xs text-gray-600 font-mono mt-0.5">{r.intern_id}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Status badge */}
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1
                  rounded-full border ${st.color} ${st.bg} ${st.border}`}>
                  {st.text}
                </span>

                {/* Edit button — only if editable and not already editing */}
                {editable && !isEditing && (
                  <button
                    onClick={() => openEdit(r)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-gray-500
                      hover:text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                    Edit
                  </button>
                )}

                {/* Lock icon — not editable */}
                {!editable && (
                  <span title="Cannot edit after project submission">
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#d1d5db" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                  </span>
                )}
              </div>
            </div>

            {/* Meta row */}
            <div className="flex items-center gap-6 px-5 py-3 bg-gray-50/60">
              <div>
                <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-wider">Duration</p>
                <p className="text-xs font-bold text-gray-700 mt-0.5">
                  {DURATIONS.find(d => d.value === r.duration)?.label ?? r.duration}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-wider">Applied</p>
                <p className="text-xs font-bold text-gray-700 mt-0.5">{fmtDate(r.created_at)}</p>
              </div>
              {!editable && (
                <div className="ml-auto">
                  <p className="text-[13px] text-gray-600">
                    {r.is_completed ? "Certificate issued." : "Locked after project submission."}
                  </p>
                </div>
              )}
            </div>

            {/* ── Edit panel ── */}
            <AnimatePresence>
              {isEditing && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 pt-4 border-t border-gray-100 space-y-4">

                    {/* Validation reset warning */}
                    {showWarn && (
                      <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-200
                        rounded-xl px-4 py-3">
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24"
                          stroke="#d97706" strokeWidth={2} className="shrink-0 mt-0.5">
                          <path strokeLinecap="round" strokeLinejoin="round"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                        </svg>
                        <div>
                          <p className="text-xs font-bold text-amber-700">Validation will be reset</p>
                          <p className="text-xs text-amber-600 mt-0.5">
                            Changing your domain or duration resets your approval status.
                            You'll need to wait for re-validation by the admin.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Domain picker */}
                    <div>
                      <p className="text-xs font-semibold text-gray-600 mb-2">Select Domain</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {DOMAINS.map(d => (
                          <button
                            key={d}
                            type="button"
                            onClick={() => setEditForm(p => ({ ...p, domain: d }))}
                            className={`px-3 py-2.5 rounded-xl border text-xs font-medium text-left transition-all
                              ${editForm.domain === d
                                ? "border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-200"
                                : "border-gray-200 bg-gray-50 text-gray-600 hover:border-blue-300"}`}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Duration picker */}
                    <div>
                      <p className="text-xs font-semibold text-gray-600 mb-2">Select Duration</p>
                      <div className="flex gap-2">
                        {DURATIONS.map(d => (
                          <button
                            key={d.value}
                            type="button"
                            onClick={() => setEditForm(p => ({ ...p, duration: d.value }))}
                            className={`flex-1 py-2.5 rounded-xl border text-xs font-semibold transition-all
                              ${editForm.duration === d.value
                                ? "border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-200"
                                : "border-gray-200 bg-gray-50 text-gray-600 hover:border-blue-300"}`}
                          >
                            {d.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Error */}
                    {error && (
                      <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                        ⚠ {error}
                      </p>
                    )}

                    {/* Actions */}
                                        {/* Actions */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex gap-3">
                        <button
                          onClick={closeEdit}
                          disabled={saving}
                          className="px-5 py-2.5 text-sm text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSave}
                          disabled={saving}
                          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-60"
                        >
                          {saving ? "Saving…" : "Save Changes"}
                        </button>
                      </div>

                      {/* Delete Button - Extreme Right */}
                      <button
                        onClick={() => openDeleteConfirm(r.intern_id)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                      >
                        <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Permanently Deactivate
                      </button>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}

      {/* ── All 3 slots used ── */}
      {!canAddNew && (
        <div className="rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 flex items-center gap-3">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
          <p className="text-xs text-gray-500">
            Maximum 3 Skill Validation & certification reached. Permanently Deactivate an existing one to apply for a new domain.
          </p>
        </div>
      )}

            {/* ── Delete Confirmation Popup ── */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDeleteConfirm(false)}
              className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-none"
            >
              <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full pointer-events-auto">
                <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-5">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#ef4444" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>

                <h3 className="text-xl font-bold text-center text-gray-900 mb-2">Permanently Deactivate Internship?</h3>
                <p className="text-center text-gray-600 mb-6">
                  This action <span className="font-semibold text-red-600">cannot be undone</span>.<br />
                  All progress and data for this internship will be permanently deactivated.
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 py-3 border border-gray-300 rounded-2xl text-gray-700 font-medium hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-2xl flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {deleting ? "Deactivating..." : "Yes, Deactivate"}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}