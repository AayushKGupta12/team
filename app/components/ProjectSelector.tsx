"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────
   Types matching project_catalog table
───────────────────────────────────────── */
interface Project {
  id: string;
  title: string;
  description: string;
  domain: string;
  difficulty: "Basic" | "Intermediate" | "Advanced";
  use_cases?: string[];
  fields?: string[];
  tech_stack?: string[];
  algorithms?: string[];
  performance_focus?: string;
  dataset_required?: boolean;
  api_required?: boolean;
  deployment_ready?: boolean;
  estimated_duration?: string;
  learning_outcome?: string;
}

interface Props {
  internId: string;               // e.g. VF2026DS12345
  domain: string;                 // e.g. "Data Science"
  onSuccess?: (project: Project) => void;
}

const DIFFICULTY_CONFIG = {
  Basic:        { color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200", dot: "bg-emerald-400" },
  Intermediate: { color: "text-amber-700",   bg: "bg-amber-50",   border: "border-amber-200",   dot: "bg-amber-400"   },
  Advanced:     { color: "text-red-700",     bg: "bg-red-50",     border: "border-red-200",     dot: "bg-red-400"     },
};

const API = process.env.NEXT_PUBLIC_API_URL;

/* ── Fisher-Yates shuffle, pick first N ── */
function sampleN<T>(arr: T[], n: number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, n);
}

/* ═══════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════ */
export default function ProjectSelector({ internId, domain, onSuccess }: Props) {
  const [allProjects,  setAllProjects]  = useState<Project[]>([]);
  const [shown,        setShown]        = useState<Project[]>([]);
  const [selected,     setSelected]     = useState<Project | null>(null);
  const [expanded,     setExpanded]     = useState<string | null>(null);
  const [loading,      setLoading]      = useState(true);
  const [submitting,   setSubmitting]   = useState(false);
  const [confirmed,    setConfirmed]    = useState(false);
  const [done,         setDone]         = useState(false);
  const [error,        setError]        = useState("");
  const [shuffleCount, setShuffleCount] = useState(0);

  const [currentIndex, setCurrentIndex] = useState(0);

  /* ── Fetch all domain-matching projects once ── */
  useEffect(() => {
  if (!domain) return;

  const fetch_ = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API}/api/projects?domain=${encodeURIComponent(domain)}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to load projects");

      const projects = data.projects ?? data;

      setAllProjects(projects);
      setShown(projects.slice(0, 5)); // first 5
      setCurrentIndex(0);             // reset index
    } catch (e: any) {
      setError(e.message || "Could not load projects. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  fetch_();
}, [domain]);

  /* ── Reshuffle shown 5 from the full list ── */
  const reshuffle = useCallback(() => {
  if (allProjects.length === 0) return;

  setSelected(null);
  setExpanded(null);

  const nextIndex = currentIndex + 5;

  if (nextIndex >= allProjects.length) {
    // loop back to start
    setShown(allProjects.slice(0, 5));
    setCurrentIndex(0);
  } else {
    setShown(allProjects.slice(nextIndex, nextIndex + 5));
    setCurrentIndex(nextIndex);
  }

  setShuffleCount(c => c + 1);
}, [allProjects, currentIndex]);

  /* ── Submit chosen project ── */
  const handleSubmit = async () => {
    if (!selected) return;
    if (!confirmed) { setConfirmed(true); return; }

    setSubmitting(true); setError("");

    try {
      const res  = await fetch(`${API}/api/internship/select-project/${internId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project_id:  selected.id,
          title:       selected.title,
          description: selected.description,
          difficulty:  selected.difficulty,
          domain:      selected.domain,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        setDone(true);
        setTimeout(() => onSuccess?.(selected), 1200);
      } else {
        setError(data.error || "Could not save project. Please try again.");
        setConfirmed(false);
      }
    } catch {
      setError("Network error. Please check your connection.");
      setConfirmed(false);
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Success screen ── */
  if (done && selected) {
    return (
      <div className="w-full p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center text-center gap-5">
          <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center">
            <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-900">Project Selected!</p>
            <p className="text-sm text-gray-400 mt-1">Your project has been assigned successfully.</p>
          </div>
          <div className="w-full bg-gradient-to-br from-blue-50 to-violet-50 border border-blue-100
            rounded-2xl p-5 text-left space-y-3">
            <div className="flex items-start justify-between gap-3">
              <p className="font-semibold text-gray-900 leading-snug">{selected.title}</p>
              <DifficultyBadge level={selected.difficulty} />
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">{selected.description}</p>
            {selected.tech_stack && selected.tech_stack.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {selected.tech_stack.map(t => (
                  <span key={t} className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs
                    font-medium rounded-md">{t}</span>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="w-full p-8 flex flex-col items-center gap-4">
        <div className="flex gap-1.5">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-2 h-2 rounded-full bg-blue-300 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}/>
          ))}
        </div>
        <p className="text-sm text-gray-400">Loading {domain} projects…</p>
      </div>
    );
  }

  /* ── Error ── */
  if (error && allProjects.length === 0) {
    return (
      <div className="w-full p-8 text-center">
        <p className="text-2xl mb-2">⚠️</p>
        <p className="font-medium text-gray-700">Failed to load projects</p>
        <p className="text-sm text-gray-400 mt-1">{error}</p>
        <button onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm rounded-xl hover:bg-blue-700 transition-colors">
          Retry
        </button>
      </div>
    );
  }

  /* ── No projects ── */
  if (!loading && allProjects.length === 0) {
    return (
      <div className="w-full p-8 text-center">
        <p className="text-2xl mb-2">📭</p>
        <p className="font-medium text-gray-700">No projects available</p>
        <p className="text-sm text-gray-400 mt-1">No projects found for <strong>{domain}</strong>. Check back soon.</p>
      </div>
    );
  }

  return (
    <div className="w-full">

      {/* ── Header ── */}
      <div className="px-8 pt-8 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-500 bg-blue-50
                border border-blue-100 rounded-full px-2.5 py-0.5">
                {domain}
              </span>
              {allProjects.length > 5 && (
                <span className="text-xs text-gray-400">
                  Showing 5 of {allProjects.length}
                </span>
              )}
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Choose Your Project</h2>
            <p className="text-sm text-gray-400 mt-0.5">
              Select one project to work on during your internship.
            </p>
          </div>

          {/* Reshuffle button */}
          {allProjects.length > 5 && (
            <button
              onClick={reshuffle}
              disabled={submitting}
              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-blue-600
                bg-blue-50 hover:bg-blue-100 border border-blue-100 rounded-xl
                transition-colors whitespace-nowrap disabled:opacity-50 shrink-0">
              <motion.svg
                key={shuffleCount}
                className="w-3.5 h-3.5"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                animate={{ rotate: [0, 180] }}
                transition={{ duration: 0.4 }}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </motion.svg>
              Next set
            </button>
          )}
        </div>
      </div>

      {/* ── Project cards ── */}
      <div className="px-8 pb-2 space-y-3">
        <AnimatePresence>
          {shown.map((project, i) => {
            const isSelected = selected?.id === project.id;
            const isExpanded = expanded === project.id;
            const diff = DIFFICULTY_CONFIG[project.difficulty as keyof typeof DIFFICULTY_CONFIG]
              ?? DIFFICULTY_CONFIG.Basic;

            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ delay: i * 0.05, duration: 0.2 }}
                onClick={() => {
                  setSelected(isSelected ? null : project);
                  setConfirmed(false);
                  setExpanded(isExpanded ? null : project.id);
                }}
                className={`relative rounded-2xl border cursor-pointer transition-all duration-200
                  ${isSelected
                    ? "border-blue-500 bg-blue-50/80 ring-2 ring-blue-200 shadow-md"
                    : "border-gray-100 bg-white hover:border-blue-200 hover:shadow-sm"}`}>

                {/* Selection indicator */}
                <div className={`absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center
                  justify-center transition-all ${isSelected
                    ? "bg-blue-600 border-blue-600"
                    : "border-gray-300 bg-white"}`}>
                  {isSelected && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                  )}
                </div>

                <div className="p-5 pr-12">
                  {/* Title + badge row */}
                  <div className="flex items-start gap-3 mb-2">
                    <div>
                      <p className="font-semibold text-gray-900 leading-snug pr-1">{project.title}</p>
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <DifficultyBadge level={project.difficulty} />
                        {project.estimated_duration && (
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            {project.estimated_duration}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className={`text-sm text-gray-500 leading-relaxed transition-all
                    ${isExpanded ? "" : "line-clamp-2"}`}>
                    {project.description}
                  </p>

                  {/* Expand/collapse details */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 space-y-3">

                      {project.tech_stack && project.tech_stack.length > 0 && (
                        <TagGroup label="Tech Stack" tags={project.tech_stack} color="blue" />
                      )}
                      {project.algorithms && project.algorithms.length > 0 && (
                        <TagGroup label="Algorithms" tags={project.algorithms} color="violet" />
                      )}
                      {project.use_cases && project.use_cases.length > 0 && (
                        <TagGroup label="Use Cases" tags={project.use_cases} color="sky" />
                      )}
                      {project.fields && project.fields.length > 0 && (
                        <TagGroup label="Fields" tags={project.fields} color="emerald" />
                      )}

                      {/* Feature flags */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        {project.dataset_required && <FeatureTag icon="📊" label="Dataset Required" />}
                        {project.api_required && <FeatureTag icon="🔌" label="API Required" />}
                        {project.deployment_ready && <FeatureTag icon="🚀" label="Deployment Ready" />}
                      </div>

                      {project.learning_outcome && (
                        <div className="bg-amber-50 border border-amber-100 rounded-xl px-3 py-2.5">
                          <p className="text-xs font-semibold text-amber-700 uppercase tracking-widest mb-1">
                            Learning Outcome
                          </p>
                          <p className="text-xs text-amber-700 leading-relaxed">{project.learning_outcome}</p>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Show more / less */}
                  <button
                    onClick={e => { e.stopPropagation(); setExpanded(isExpanded ? null : project.id); }}
                    className="mt-2 text-xs font-semibold text-blue-500 hover:text-blue-700
                      transition-colors flex items-center gap-1">
                    {isExpanded ? "Show less ↑" : "See details ↓"}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* ── Footer: confirm + submit ── */}
      <div className="px-8 pb-8 pt-4 space-y-3">

        {/* Error */}
        {error && allProjects.length > 0 && (
          <div className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
            <span className="text-red-400 shrink-0">⚠</span>
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={!selected || submitting}
          className={`w-full py-3 text-sm font-semibold rounded-xl transition-all shadow-sm
            disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2
            ${confirmed
              ? "bg-emerald-600 hover:bg-emerald-700 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"}`}>
          {submitting ? (
            <>
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
              </svg>
              Saving…
            </>
          ) : !selected ? (
            "Select a project to continue"
          ) : confirmed ? (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
              Confirm & Lock In Project
            </>
          ) : (
            `Choose "${selected.title.length > 30 ? selected.title.slice(0, 30) + "…" : selected.title}"`
          )}
        </button>

        {/* Cancel confirm */}
        {confirmed && !submitting && (
          <button onClick={() => setConfirmed(false)}
            className="w-full text-gray-800 text-center py-2 bg-gray-300 rounded-xl ">
            ← Go back
          </button>
        )}
      </div>
    </div>
  );
}

/* ── Sub-components ── */

function DifficultyBadge({ level }: { level: string }) {
  const cfg = DIFFICULTY_CONFIG[level as keyof typeof DIFFICULTY_CONFIG] ?? DIFFICULTY_CONFIG.Basic;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-xs font-semibold
      ${cfg.color} ${cfg.bg} ${cfg.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`}/>
      {level}
    </span>
  );
}

function TagGroup({ label, tags, color }: { label: string; tags: string[]; color: string }) {
  const colors: Record<string, string> = {
    blue:  "bg-blue-100 text-blue-700",
    violet:  "bg-violet-100 text-violet-700",
    sky:     "bg-sky-100    text-sky-700",
    emerald: "bg-emerald-100 text-emerald-700",
  };
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {tags.map(t => (
          <span key={t} className={`px-2 py-0.5 rounded-md text-xs font-medium ${colors[color] ?? colors.blue}`}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function FeatureTag({ icon, label }: { icon: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-600
      rounded-lg text-xs font-medium">
      <span>{icon}</span> {label}
    </span>
  );
}