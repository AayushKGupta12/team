"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API = process.env.NEXT_PUBLIC_API_URL;

/* ─── Types ─────────────────────────────────────────── */
interface InternRecord {
  intern_id: string;
  first_name: string;
  last_name: string;
  domain: string;
  university: string;
  due_date: string | null;
  created_at: string;
  is_completed: boolean;
  project_title: string | null;
  project_description: string | null;
}

const fmtDate = (iso?: string | null) =>
  iso ? new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short" }) : "N/A";

const getDaysLeft = (due?: string | null): number | null => {
  if (!due) return null;
  return Math.ceil((new Date(due).getTime() - Date.now()) / 86_400_000);
};

/* ─── Main Component ─────────────────────────────────── */
export default function InternDashboard() {
  const { user, isLoaded, isSignedIn } = useUser();
  const email = isLoaded && isSignedIn ? user.primaryEmailAddress?.emailAddress ?? "" : "";

  const [records, setRecords] = useState<InternRecord[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!email) return;
    setLoading(true);
    (async () => {
      try {
        const res = await fetch(`${API}/api/internship/by-email?email=${encodeURIComponent(email)}`);
        const json = await res.json();
        setRecords(json.internships || []);
      } catch (e) {
        console.error("Fetch error", e);
      } finally {
        setLoading(false);
      }
    })();
  }, [email]);

  // Remove card from local state after deletion
  const handleDelete = (intern_id: string) => {
    setRecords(prev => prev.filter(r => r.intern_id !== intern_id));
  };

  if (!isLoaded || loading)
    return <div className="py-20 text-center text-xs font-mono text-gray-400 animate-pulse">SYNCHRONIZING_RECORDS...</div>;
  if (!isSignedIn || !records.length) return <EmptyState />;

  const firstRecord = records[0];

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <header className="mb-12 border-l-4 border-gray-900 pl-6">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase">
          {firstRecord.first_name} {firstRecord.last_name}
        </h1>
        <p className="text-lg text-gray-500 font-medium">
          {firstRecord.university}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {records.map((r, i) => (
          <InternCard key={r.intern_id} record={r} index={i} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

/* ─── Square Bento Card with Delete ─────────────────── */
function InternCard({
  record: r,
  index,
  onDelete,
}: {
  record: InternRecord;
  index: number;
  onDelete: (intern_id: string) => void;
}) {
  const { user } = useUser();
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting,    setDeleting]    = useState(false);

  const days     = getDaysLeft(r.due_date);
  const isDone   = r.is_completed;
  const isUrgent = !isDone && days !== null && days <= 3;

  const statusTheme = isDone
    ? { border: "border-emerald-500", text: "text-emerald-600" }
    : isUrgent
      ? { border: "border-rose-500",    text: "text-rose-600" }
      : { border: "border-amber-400",   text: "text-amber-600" };

  const handleDelete = async () => {
    if (!user?.id) return;
    setDeleting(true);
    try {
      await fetch(`${API}/api/internship/delete/${r.intern_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      onDelete(r.intern_id);
    } catch {
      setDeleting(false);
      setShowConfirm(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="aspect-square relative group overflow-hidden bg-white border border-gray-100 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500"
      >
        {/* Background vector overlay */}
        <div
          className="absolute inset-0 opacity-[0.075] pointer-events-none group-hover:opacity-[0.175] transition-opacity duration-500"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop')`,
            backgroundSize: "cover",
          }}
        />

        <div className="relative h-full flex flex-col p-8 z-10">

          {/* Status + ID + Delete button */}
          <div className="flex justify-between items-center mb-6">
            <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${statusTheme.border} ${statusTheme.text}`}>
              {isDone ? "Completed" : isUrgent ? "Action Required" : "Ongoing"}
            </span>

            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-gray-500 group-hover:text-gray-900 transition-colors">
                Id: {r.intern_id}
              </span>

              {/* ── Delete (×) button ── */}
              {!isDone && (
                <button
                  onClick={() => setShowConfirm(true)}
                  title="Delete application"
                  className="w-6 h-6 rounded-full flex items-center justify-center
                    text-gray-700 hover:text-rose-500 hover:bg-rose-50
                    transition-colors duration-150"
                >
                  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Domain & Project */}
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 leading-tight mb-2">
              {r.domain}
            </h3>
            <div className="h-px w-8 bg-gray-400 mb-4 group-hover:w-full transition-all duration-700" />
            <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-1">
              {r.project_title || "General Internship"}
            </h4>
            <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
              {r.project_description || "Evaluation of core competencies and industrial application."}
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-50">
            <div>
              <p className="text-[10px] font-semibold text-gray-400 uppercase">
                {isDone ? "Completion Date" : "Submission Due"}
              </p>
              <p className={`text-sm font-black ${isUrgent ? "text-rose-500" : "text-gray-900"}`}>
                {isDone ? fmtDate(r.created_at) : fmtDate(r.due_date)}
              </p>
            </div>

            {isDone && (
              <a
                href={`https://vfound.in/certificate/${r.intern_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 w-12 rounded-2xl bg-gray-900 flex items-center justify-center text-white hover:bg-black transition-transform hover:scale-110 shadow-lg"
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </motion.div>

      {/* ── Confirm Delete Popup ── */}
      <AnimatePresence>
        {showConfirm && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !deleting && setShowConfirm(false)}
              className="fixed inset-0 bg-black/40 z-50 backdrop-blur-xs"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 10 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-none"
            >
              <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full pointer-events-auto">

                {/* Icon */}
                <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center mx-auto mb-5">
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#e11d48" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </div>

                <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
                  Delete Application?
                </h3>
                <p className="text-sm text-gray-500 text-center leading-relaxed mb-1">
                  You are about to delete your internship application for the domain of {" "}
                  <span className="font-semibold text-gray-800">{r.domain}</span>.
                </p>
                <p className="text-xs text-rose-500 font-semibold text-center mb-7">
                  ⚠ This cannot be undone.
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowConfirm(false)}
                    disabled={deleting}
                    className="flex-1 py-3 rounded-2xl border border-gray-200 text-sm
                      font-semibold text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="flex-1 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white
                      text-sm font-semibold transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {deleting && (
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                      </svg>
                    )}
                    {deleting ? "Deleting…" : "Yes, Delete"}
                  </button>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function EmptyState() {
  return (
    <div className="py-24 text-center">
      <h3 className="text-xl font-bold text-gray-900">Archive Empty</h3>
      <p className="text-gray-400">No internship records were found associated with this account.</p>
    </div>
  );
}