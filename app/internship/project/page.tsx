'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { createClient } from '@supabase/supabase-js'

// ─── Types ────────────────────────────────────────────────────────────────────
interface Project {
  id: string
  title: string
  description: string
  domain: string
  difficulty: string | null
  use_cases: string[] | null
  fields: string[] | null
  tech_stack: string[] | null
  algorithms: string[] | null
  performance_focus: string | null
  dataset_required: boolean | null
  api_required: boolean | null
  deployment_ready: boolean | null
  estimated_duration: string | null
  learning_outcome: string | null
  created_at: string
}

// ─── Supabase READ-ONLY client (anon key only) ────────────────────────────────
const supabase = createClient(
  'https://ttmokypbvoquoonaiizb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0bW9reXBidm9xdW9vbmFpaXpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5NTI0ODgsImV4cCI6MjA4MDUyODQ4OH0.BqhvkamylNnOCqPZsvYz2iT-AJtMxzTKHXdj7oNJrlM'
)

// ─── Domain colour map ────────────────────────────────────────────────────────
const DOMAIN_COLORS: Record<string, { badge: string; dot: string; accent: string }> = {
  'Machine Learning':   { badge: 'bg-violet-50 text-violet-700 border-violet-200',  dot: 'bg-violet-400',  accent: 'text-violet-600'  },
  'Data Science':       { badge: 'bg-blue-50 text-blue-700 border-blue-200',        dot: 'bg-blue-400',    accent: 'text-blue-600'    },
  'Data Analyst':       { badge: 'bg-sky-50 text-sky-700 border-sky-200',           dot: 'bg-sky-400',     accent: 'text-sky-600'     },
  'Backend - Flask':    { badge: 'bg-orange-50 text-orange-700 border-orange-200',  dot: 'bg-orange-400',  accent: 'text-orange-600'  },
  'Backend - Django':   { badge: 'bg-green-50 text-green-700 border-green-200',     dot: 'bg-green-400',   accent: 'text-green-600'   },
  'Backend - Java':     { badge: 'bg-red-50 text-red-700 border-red-200',           dot: 'bg-red-400',     accent: 'text-red-600'     },
  'Frontend':           { badge: 'bg-pink-50 text-pink-700 border-pink-200',        dot: 'bg-pink-400',    accent: 'text-pink-600'    },
  'MLOps':              { badge: 'bg-indigo-50 text-indigo-700 border-indigo-200',  dot: 'bg-indigo-400',  accent: 'text-indigo-600'  },
  'DevOps':             { badge: 'bg-slate-50 text-slate-700 border-slate-200',     dot: 'bg-slate-400',   accent: 'text-slate-600'   },
  'UI/UX':              { badge: 'bg-rose-50 text-rose-700 border-rose-200',        dot: 'bg-rose-400',    accent: 'text-rose-600'    },
  'Internship Project': { badge: 'bg-amber-50 text-amber-700 border-amber-200',     dot: 'bg-amber-400',   accent: 'text-amber-600'   },
}
const DEFAULT_COLOR = { badge: 'bg-gray-50 text-gray-600 border-gray-200', dot: 'bg-gray-400', accent: 'text-gray-600' }
const dc = (domain: string) => DOMAIN_COLORS[domain] ?? DEFAULT_COLOR

// ─── Roadmap builder (generated from DB fields) ───────────────────────────────
function buildRoadmap(p: Project) {
  return [
    {
      step: '01',
      title: 'Setup & Exploration',
      tasks: [
        'Read the project brief fully and note the expected output',
        ...(p.dataset_required ? ['Download and inspect the dataset — check shape, nulls, data types'] : []),
        ...(p.api_required ? ['Obtain required API credentials and verify connectivity'] : []),
        'Create project folder, initialise version control (git init)',
        'Install dependencies and confirm environment is working',
      ],
    },
    {
      step: '02',
      title: 'Core Implementation',
      tasks: [
        ...(p.tech_stack?.length ? [`Primary stack: ${p.tech_stack.slice(0, 4).join(', ')}${p.tech_stack.length > 4 ? ` (+${p.tech_stack.length - 4} more)` : ''}`] : []),
        ...(p.algorithms?.length ? [`Key concepts to apply: ${p.algorithms.slice(0, 3).join(', ')}`] : []),
        'Build the main feature / model / module described in the brief',
        'Validate outputs incrementally — do not wait until the end to test',
        'Ensure at least 60 % of the expected output is demonstrable before moving on',
      ],
    },
    {
      step: '03',
      title: 'Evaluation & Optimisation',
      tasks: [
        ...(p.performance_focus ? [`Target metric: ${p.performance_focus}`] : []),
        'Run tests across multiple inputs and edge cases',
        'Compare results against the performance goal and iterate if needed',
        'Record results in a short notes file for your write-up',
      ],
    },
    {
      step: '04',
      title: 'Submission',
      tasks: [
        'Clean and comment your code — reviewers read it',
        'Write a README: what it does, how to run it, what you learnt',
        'Add output screenshots or a demo GIF / video',
        ...(p.deployment_ready ? ['Deploy to a public URL (Vercel / Render / Railway) and include the link'] : []),
        'Push to GitHub and share the repository link with your mentor',
      ],
    },
  ]
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Page() {
  const [projects, setProjects]     = useState<Project[]>([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState<string | null>(null)
  const [search, setSearch]         = useState('')
  const [domain, setDomain]         = useState('All')
  const [difficulty, setDifficulty] = useState('All')
  const [selected, setSelected]     = useState<Project | null>(null)

  // Fetch — READ ONLY
  useEffect(() => {
    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        console.log('[Supabase] fetching project_catalog...')
        const { data, error: err, status } = await supabase
          .from('project_catalog')
          .select('*')
          .order('domain')
          .order('created_at')

        console.log('[Supabase] status:', status, '| rows:', data?.length ?? 0)
        if (err) {
          console.error('[Supabase] error:', err)
          setError(`${err.message} (code: ${err.code})`)
          return
        }
        setProjects(data ?? [])
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e)
        console.error('[Supabase] exception:', msg)
        setError('Fetch failed: ' + msg)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const domains     = ['All', ...Array.from(new Set(projects.map(p => p.domain))).sort()]
  const difficulties = ['All', 'Basic', 'Intermediate']

  const filtered = projects.filter(p => {
    const q = search.toLowerCase()
    return (
      (!q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)) &&
      (domain === 'All' || p.domain === domain) &&
      (difficulty === 'All' || p.difficulty === difficulty)
    )
  })

  const grouped = filtered.reduce<Record<string, Project[]>>((acc, p) => {
    ;(acc[p.domain] ??= []).push(p)
    return acc
  }, {})

  const close = useCallback(() => setSelected(null), [])

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Top bar ── */}
      <header className="h-50  sticky top-0 z-30 bg-yellow-400 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 bg-gray-900 rounded-lg flex items-center justify-center text-white text-[11px] font-bold tracking-tight select-none">
              IP
            </span>
            <span className="text-sm font-semibold text-gray-900 tracking-tight">Intern Projects</span>
            <span className="hidden sm:block text-xs text-gray-400">·  {projects.length} projects across 11 domains</span>
          </div>
          <span className="text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
            ≥ 60 % correct output required
          </span>
        </div>
      </header>




      <div className="max-w-6xl mx-auto px-5 py-7">

        {/* ── Filters ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
            </svg>
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by title or description…"
              className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 placeholder:text-gray-400"
            />
          </div>
          <select value={domain} onChange={e => setDomain(e.target.value)}
            className="text-sm bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 min-w-[160px]">
            {domains.map(d => <option key={d}>{d}</option>)}
          </select>
          <select value={difficulty} onChange={e => setDifficulty(e.target.value)}
            className="text-sm bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 min-w-[130px]">
            {difficulties.map(d => <option key={d}>{d}</option>)}
          </select>
          <div className="flex items-center text-xs text-gray-400 px-1 whitespace-nowrap">{filtered.length} shown</div>
        </div>

        {/* ── States ── */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 animate-pulse">
                <div className="h-3 w-24 bg-gray-100 rounded mb-3"/>
                <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"/>
                <div className="h-3 w-full bg-gray-100 rounded mb-1"/>
                <div className="h-3 w-2/3 bg-gray-100 rounded"/>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-5 text-sm space-y-2">
            <p className="font-semibold">Could not load projects from Supabase</p>
            <p className="text-red-600 font-mono text-xs bg-red-100 px-3 py-2 rounded-lg">{error}</p>
            <div className="text-red-500 text-xs space-y-1">
              <p>Things to check:</p>
              <ul className="list-disc list-inside space-y-0.5 ml-1">
                <li>The table <code className="bg-red-100 px-1 rounded">project_catalog</code> exists in your Supabase project</li>
                <li>Row Level Security (RLS) is either disabled or has a policy allowing SELECT for anon</li>
                <li>Open browser DevTools → Console for more detail</li>
              </ul>
            </div>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-24 text-gray-400 text-sm">No projects match your filters.</div>
        )}

        {/* ── Project grid grouped by domain ── */}
        {!loading && !error && filtered.length > 0 && (
          <div className="space-y-10">
            {Object.entries(grouped).map(([dom, list]) => (
              <section key={dom}>
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${dc(dom).badge}`}>{dom}</span>
                  <div className="flex-1 h-px bg-gray-100"/>
                  <span className="text-xs text-gray-400">{list.length} project{list.length !== 1 ? 's' : ''}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {list.map(p => <ProjectCard key={p.id} p={p} onClick={() => setSelected(p)}/>)}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>

      {/* ── Modal ── */}
      {selected && <Modal p={selected} onClose={close}/>}
    </div>
  )
}

// ─── Card ─────────────────────────────────────────────────────────────────────
function ProjectCard({ p, onClick }: { p: Project; onClick: () => void }) {
  const c = dc(p.domain)
  return (
    <button onClick={onClick}
      className="group text-left w-full bg-white border border-gray-100 rounded-xl p-5
                 hover:border-gray-300 hover:shadow-sm transition-all duration-150
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300">

      <div className="flex items-start justify-between gap-2 mb-3">
        <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${c.badge}`}>{p.domain}</span>
        <div className="flex flex-col items-end gap-1 shrink-0 text-[10px] text-gray-400">
          {p.difficulty && <span className={p.difficulty === 'Intermediate' ? 'text-amber-500 font-medium' : ''}>{p.difficulty}</span>}
          {p.estimated_duration && <span>{p.estimated_duration}</span>}
        </div>
      </div>

      <h3 className="text-sm font-semibold text-gray-900 mb-1.5 leading-snug">{p.title}</h3>
      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-3">{p.description}</p>

      {p.tech_stack && p.tech_stack.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {p.tech_stack.slice(0, 3).map(t => (
            <span key={t} className="text-[10px] px-1.5 py-0.5 bg-gray-50 border border-gray-200 text-gray-500 rounded">{t}</span>
          ))}
          {p.tech_stack.length > 3 && (
            <span className="text-[10px] text-gray-400 px-1">+{p.tech_stack.length - 3}</span>
          )}
        </div>
      )}

      {p.performance_focus && (
        <div className="flex items-center gap-1.5 pt-2.5 border-t border-gray-50">
          <span className="text-[10px] text-gray-400 uppercase tracking-wide">Goal</span>
          <span className={`text-[11px] font-medium truncate ${c.accent}`}>{p.performance_focus}</span>
        </div>
      )}

      <div className="flex items-center gap-2 mt-2">
        {p.dataset_required  && <span className="text-[10px] text-gray-400">📂 Dataset</span>}
        {p.api_required      && <span className="text-[10px] text-gray-400">🔌 API</span>}
        {p.deployment_ready  && <span className="text-[10px] text-gray-400">🌐 Deploy</span>}
        <span className="ml-auto text-[10px] text-gray-300 group-hover:text-gray-400 transition-colors">View →</span>
      </div>
    </button>
  )
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function Modal({ p, onClose }: { p: Project; onClose: () => void }) {
  const c = dc(p.domain)
  const roadmap = buildRoadmap(p)

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', fn)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', fn); document.body.style.overflow = '' }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/25 backdrop-blur-[2px]" onClick={onClose}/>
      <div className="relative w-full sm:max-w-2xl max-h-[94vh] bg-white sm:rounded-2xl rounded-t-2xl flex flex-col shadow-xl overflow-hidden">

        {/* Header */}
        <div className="shrink-0 px-6 pt-5 pb-4 border-b border-gray-100">
          <div className="flex items-start gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${c.badge}`}>{p.domain}</span>
                {p.difficulty && (
                  <span className={`text-[11px] px-2 py-0.5 rounded-full border font-medium
                    ${p.difficulty === 'Intermediate' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                    {p.difficulty}
                  </span>
                )}
                {p.estimated_duration && (
                  <span className="text-[11px] text-gray-400 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-full">
                    {p.estimated_duration}
                  </span>
                )}
              </div>
              <h2 className="text-base font-semibold text-gray-900 leading-snug">{p.title}</h2>
            </div>
            <button onClick={onClose}
              className="shrink-0 w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition"
              aria-label="Close">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-6">

          {/* Description */}
          <Block label="Project Description">
            <p className="text-sm text-gray-700 leading-relaxed">{p.description}</p>
          </Block>

          {/* Learning outcome */}
          {p.learning_outcome && (
            <Block label="What You Will Learn">
              <p className="text-sm text-gray-700 leading-relaxed">{p.learning_outcome}</p>
            </Block>
          )}

          {/* Use cases + fields */}
          {((p.use_cases?.length ?? 0) > 0 || (p.fields?.length ?? 0) > 0) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {p.use_cases && p.use_cases.length > 0 && (
                <Block label="Use Cases">
                  <div className="flex flex-wrap gap-1.5">
                    {p.use_cases.map(u => <Chip key={u} label={u}/>)}
                  </div>
                </Block>
              )}
              {p.fields && p.fields.length > 0 && (
                <Block label="Fields / Topics">
                  <div className="flex flex-wrap gap-1.5">
                    {p.fields.map(f => <Chip key={f} label={f}/>)}
                  </div>
                </Block>
              )}
            </div>
          )}

          {/* Tech stack */}
          {p.tech_stack && p.tech_stack.length > 0 && (
            <Block label="Suggested Tech Stack">
              <div className="flex flex-wrap gap-1.5 mb-3">
                {p.tech_stack.map(t => (
                  <span key={t} className={`text-xs px-2.5 py-1 rounded-md border font-medium ${c.badge}`}>{t}</span>
                ))}
              </div>
              <p className="text-xs text-gray-400 leading-relaxed bg-gray-50 border border-gray-100 rounded-lg px-3 py-2.5">
                <span className="font-medium text-gray-500">Flexible stack — </span>
                you may use any equivalent technology as long as it is appropriate for the task.
                Well-reasoned alternative choices (e.g. FastAPI instead of Flask, Vue instead of React)
                are accepted and will earn <span className="font-medium text-gray-600">extra points</span>.
              </p>
            </Block>
          )}

          {/* Algorithms */}
          {p.algorithms && p.algorithms.length > 0 && (
            <Block label="Core Algorithms / Concepts to Implement">
              <ul className="space-y-2">
                {p.algorithms.map(a => (
                  <li key={a} className="flex items-center gap-2.5 text-sm text-gray-700">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${c.dot}`}/>
                    {a}
                  </li>
                ))}
              </ul>
            </Block>
          )}

          {/* Performance goal */}
          {p.performance_focus && (
            <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-start gap-3">
              <span className="text-xl shrink-0">🎯</span>
              <div>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-1">Performance Goal</p>
                <p className={`text-sm font-semibold ${c.accent}`}>{p.performance_focus}</p>
              </div>
            </div>
          )}

          {/* 60 % rule */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <span className="text-xl shrink-0">📋</span>
            <div>
              <p className="text-[11px] font-semibold text-amber-800 uppercase tracking-wide mb-1">Minimum Output Requirement</p>
              <p className="text-sm text-amber-700 leading-relaxed">
                At least <span className="font-bold">60 % of the project output</span> must be functionally correct
                and demonstrable. Partial implementations are acceptable provided the core logic works and results
                are clearly visible. Code quality, comments, and documentation also contribute to your final score.
              </p>
            </div>
          </div>

          {/* Requirements */}
          <div className="grid grid-cols-3 gap-3">
            <RequireBadge icon="📂" label="Dataset"    required={!!p.dataset_required}/>
            <RequireBadge icon="🔌" label="API Key"    required={!!p.api_required}/>
            <RequireBadge icon="🌐" label="Deployment" required={!!p.deployment_ready}/>
          </div>

          {/* Roadmap */}
          <Block label="Project Roadmap">
            <div className="space-y-3">
              {roadmap.map((phase, i) => (
                <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
                  <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-50 border-b border-gray-100">
                    <span className="w-5 h-5 rounded-full bg-gray-200 text-gray-600 text-[11px] font-bold flex items-center justify-center shrink-0">
                      {phase.step}
                    </span>
                    <span className="text-xs font-semibold text-gray-700">{phase.title}</span>
                  </div>
                  <ul className="px-4 py-3 space-y-2">
                    {phase.tasks.map((t, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <span className="mt-2 w-1 h-1 rounded-full bg-gray-300 shrink-0"/>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Block>

          {/* Submission */}
          <Block label="Submission Checklist">
            <ul className="space-y-2">
              {[
                'Push final code to a GitHub repository (public or shared with your mentor)',
                'Include a README — what it does, how to run it, key learnings',
                'Attach output screenshots or a short demo GIF / video',
                'Add inline comments explaining important decisions in your code',
                p.deployment_ready ? 'Include the live deployment URL in your submission' : null,
              ].filter(Boolean).map((s, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                  <span className="mt-0.5 text-gray-300 shrink-0">☐</span>
                  {s}
                </li>
              ))}
            </ul>
          </Block>

        </div>
      </div>
    </div>
  )
}

// ─── Micro components ─────────────────────────────────────────────────────────
function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-2">{label}</p>
      {children}
    </div>
  )
}

function Chip({ label }: { label: string }) {
  return (
    <span className="text-xs px-2 py-1 bg-gray-50 border border-gray-200 text-gray-600 rounded-md">{label}</span>
  )
}

function RequireBadge({ icon, label, required }: { icon: string; label: string; required: boolean }) {
  return (
    <div className={`rounded-xl border text-center p-3 ${required ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-100 opacity-40'}`}>
      <div className="text-lg mb-1">{icon}</div>
      <p className="text-[10px] font-medium text-gray-600">{label}</p>
      <p className={`text-[10px] mt-0.5 font-medium ${required ? 'text-green-600' : 'text-gray-400'}`}>
        {required ? 'Required' : 'Optional'}
      </p>
    </div>
  )
}