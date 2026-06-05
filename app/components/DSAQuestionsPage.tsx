'use client';

import { useEffect, useState, useMemo } from 'react';
import { useUser } from '@clerk/nextjs';
import {
  Search, CheckCircle, ExternalLink,
  ChevronRight, Sun, Moon, Info, Tag,
  Layout, SlidersHorizontal, X, ChevronLeft,
  TrendingUp, Target, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Tiny pie chart (SVG, no deps) ──────────────────────────
function PieChart({ slices }: { slices: { value: number; color: string; label: string }[] }) {
  const total = slices.reduce((s, sl) => s + sl.value, 0);
  if (total === 0) return null;

  let cursor = 0;
  const paths = slices.map((sl) => {
    const pct = sl.value / total;
    const startAngle = cursor * 2 * Math.PI - Math.PI / 2;
    cursor += pct;
    const endAngle = cursor * 2 * Math.PI - Math.PI / 2;
    const r = 40;
    const cx = 50; const cy = 50;
    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);
    const large = pct > 0.5 ? 1 : 0;
    return { d: `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large},1 ${x2},${y2} Z`, color: sl.color, label: sl.label, value: sl.value };
  });

  return (
    <div className="flex items-center gap-4">
      <svg viewBox="0 0 100 100" className="w-20 h-20 shrink-0">
        {paths.map((p, i) => (
          <path key={i} d={p.d} fill={p.color} stroke="transparent" strokeWidth="1" />
        ))}
        <circle cx="50" cy="50" r="22" fill="currentColor" className="text-white dark:text-gray-900" />
      </svg>
      <div className="flex flex-col gap-1">
        {paths.map((p, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: p.color }} />
            <span className="text-[10px] font-semibold text-gray-600 dark:text-gray-400">{p.label}</span>
            <span className="text-[10px] font-black text-gray-800 dark:text-gray-200 ml-auto">{p.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DSAQuestionsPage() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [activeQuestion, setActiveQuestion] = useState<any>(null);

  // Sidebar & filter panel
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All'); // All / Done / Pending

  const { user, isSignedIn, isLoaded } = useUser();

  // Dark mode
  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    if (isDark) document.documentElement.classList.add('dark');
  }, []);

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem('darkMode', String(next));
    if (next) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  };

  // Fetch questions + progress
  useEffect(() => {
    const fetchData = async () => {
      try {
        const qRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dsa/questions`);
        const qData = await qRes.json();
        setQuestions(qData.questions || []);
        if (qData.questions?.length > 0) setSelectedCompany(qData.questions[0].company_name);

        if (isSignedIn && user?.id) {
          const pRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dsa/progress/${user.id}`);
          const pData = await pRes.json();
          if (pData.success) setCompletedQuestions(new Set(pData.completed_questions || []));
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    if (isLoaded) fetchData();
  }, [isLoaded, isSignedIn, user?.id]);

  // Mark done
  const markAsDone = async (questionId: string) => {
    if (!isSignedIn) return alert('Please sign in to save progress');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dsa/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user?.id, question_id: questionId, is_solved: true }),
      });
      const data = await res.json();
      if (data.success) setCompletedQuestions(prev => new Set(prev).add(questionId));
    } catch (e) {
      console.error(e);
    }
  };

  // Memos
  const companies = useMemo(() => {
    const counts: Record<string, number> = {};
    questions.forEach(q => { counts[q.company_name] = (counts[q.company_name] || 0) + 1; });
    return Object.entries(counts).sort();
  }, [questions]);

  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      const matchesCompany = q.company_name === selectedCompany;
      const matchesSearch = q.problem_name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDiff = difficultyFilter === 'All' || q.difficulty === difficultyFilter;
      const isDone = completedQuestions.has(q.id);
      const matchesStatus = statusFilter === 'All' || (statusFilter === 'Done' ? isDone : !isDone);
      return matchesCompany && matchesSearch && matchesDiff && matchesStatus;
    });
  }, [questions, selectedCompany, searchQuery, difficultyFilter, statusFilter, completedQuestions]);

  // Stats for pie chart
  const stats = useMemo(() => {
    const companyQs = questions.filter(q => q.company_name === selectedCompany);
    const done = companyQs.filter(q => completedQuestions.has(q.id)).length;
    const left = companyQs.length - done;
    const easy = companyQs.filter(q => q.difficulty === 'Easy').length;
    const medium = companyQs.filter(q => q.difficulty === 'Medium').length;
    const hard = companyQs.filter(q => q.difficulty === 'Hard').length;
    return { total: companyQs.length, done, left, easy, medium, hard };
  }, [questions, selectedCompany, completedQuestions]);

  const activeFiltersCount = [
    difficultyFilter !== 'All',
    statusFilter !== 'All',
    searchQuery !== '',
  ].filter(Boolean).length;

  // Shared sidebar content
const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => (
  <>
    <div className={`h-12 no-scrollbar border-b border-slate-200 flex items-center justify-between bg-white shrink-0 ${sidebarCollapsed && !mobile ? 'px-0 justify-center' : 'px-4'}`}>
      {(!sidebarCollapsed || mobile) && (
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md flex items-center justify-center shrink-0">
            <Layout size={22} className="text-black" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-700">Companies</span>
        </div>
      )}
      {mobile ? (
        <button onClick={() => setMobileSidebarOpen(false)} className="p-1 rounded-md text-slate-400 ml-auto no-scrollbar">
          <X size={14} />
        </button>
      ) : (
        <button
          onClick={() => setSidebarCollapsed(v => !v)}
          className={`p-1 rounded-md text-slate-400 ${sidebarCollapsed ? '' : 'ml-auto'}`}
        >
          {sidebarCollapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
        </button>
      )}
    </div>

    <div className="flex-1 overflow-y-auto bg-white py-3 px-2 space-y-0.5 no-scrollbar">
      {companies.map(([name, count]: any) => {
        const isSelected = selectedCompany === name;
        const companyQs = questions.filter(q => q.company_name === name);
        const donePct = companyQs.length > 0
          ? Math.round((companyQs.filter(q => completedQuestions.has(q.id)).length / companyQs.length) * 100)
          : 0;

        return (
          <button
            key={name}
            onClick={() => { setSelectedCompany(name); if (mobile) setMobileSidebarOpen(false); }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-[14px] transition-colors ${
              isSelected
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            {(!sidebarCollapsed || mobile) && (
              <div className="flex flex-col items-start gap-1 min-w-0 flex-1 pr-2">
                <span className="truncate font-medium w-full text-left">{name}</span>
                {isSelected && donePct > 0 && (
                  <div className="w-full h-1 rounded-full bg-white/20">
                    <div className="h-1 rounded-full bg-emerald-400" style={{ width: `${donePct}%` }} />
                  </div>
                )}
              </div>
            )}
            <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded shrink-0 font-semibold ${
              isSelected ? 'bg-emerald-400' : 'text-slate-600'
            } ${sidebarCollapsed && !mobile ? 'mx-auto' : ''}`}>
              {count}
            </span>
          </button>
        );
      })}
    </div>
  </>
);


return (
  <div className="flex mt-21 h-screen overflow-hidden bg-slate-50 text-slate-900">

    {/* ── DESKTOP SIDEBAR ─────────────────────────── */}
    <aside className={`hidden lg:flex flex-col border-r border-slate-200 bg-white transition-all duration-200 ${sidebarCollapsed ? 'w-14' : 'w-60'}`}>
      <SidebarContent />
    </aside>

    {/* ── MOBILE SIDEBAR OVERLAY ──────────────────── */}
    <AnimatePresence>
      {mobileSidebarOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-40 lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <motion.aside
            initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="fixed left-0 top-0 h-full w-60 z-50 flex flex-col bg-white border-r border-slate-200 lg:hidden"
          >
            <SidebarContent mobile />
          </motion.aside>
        </>
      )}
    </AnimatePresence>

    {/* ── MAIN ──────────────────────────────────── */}
    <main className="flex-1 flex flex-col overflow-hidden min-w-0">

      {/* TOPBAR */}
      <header className="shrink-0 bg-white border-b border-slate-200 px-5 py-2.5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button onClick={() => setMobileSidebarOpen(true)} className="lg:hidden p-1.5 rounded-md text-slate-400">
              <Layout size={16} />
            </button>
            <div className="min-w-0">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.16em]">DSA Dashboard</p>
              <h1 className="text-sm font-bold truncate text-slate-900">
                {user?.firstName ? `Hey, ${user.firstName} 👋` : 'Dashboard'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
              <input
                type="text"
                placeholder="Search problems…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-7 pr-3 py-1.5 rounded-md border border-slate-700 bg-slate-50 text-xs outline-none focus:ring-2 ring-blue-300 w-48 text-slate-900 placeholder:text-slate-700"
              />
            </div>

            <button
              onClick={() => setFiltersOpen(v => !v)}
              className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold border transition-colors ${
                filtersOpen
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'border-slate-700 text-slate-700 bg-slate-50'
              }`}
            >
              <SlidersHorizontal size={16} />
              <span className="hidden sm:inline">Filters</span>
              {activeFiltersCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-slate-900 text-white text-[9px] font-black flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Dark mode button — COMMENTED OUT */}
            {/* <button onClick={toggleDarkMode} className="p-1.5 rounded-md transition-colors">
              {darkMode ? <Sun size={14} /> : <Moon size={14} />}
            </button> */}
           
          </div>
        </div>

        {/* FILTERS PANEL */}
        <AnimatePresence initial={false}>
          {filtersOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="overflow-hidden"
            >
              <div className="pt-3 flex flex-col sm:flex-row gap-2 flex-wrap">
                <div className="relative md:hidden flex-1">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={12} />
                  <input
                    type="text" placeholder="Search problems…" value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-7 pr-3 py-1.5 rounded-md border border-slate-200 bg-slate-50 text-xs outline-none text-slate-900"
                  />
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[12px] font-semibold text-slate-800 uppercase tracking-wider mr-1">Difficulty</span>
                  {['All', 'Easy', 'Medium', 'Hard'].map(d => (
                    <button key={d} onClick={() => setDifficultyFilter(d)}
                      className={`px-2.5 py-1 rounded-md text-[10px] font-semibold border transition-colors ${
                        difficultyFilter === d
                          ? d === 'Easy' ? 'bg-emerald-300 border-emerald-600'
                            : d === 'Medium' ? 'bg-amber-300 border-amber-600'
                            : d === 'Hard' ? 'bg-red-300 border-red-600'
                            : 'bg-slate-900 text-white border-slate-900'
                          : 'border-slate-600 text-slate-600 bg-white'
                      }`}>{d}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[12px] font-bold text-slate-800 uppercase tracking-wider mr-1">Status</span>
                  {['All', 'Done', 'Pending'].map(s => (
                    <button key={s} onClick={() => setStatusFilter(s)}
                      className={`px-2.5 py-1 rounded-md text-[10px] font-semibold border transition-colors ${
                        statusFilter === s ? 'bg-slate-900 text-white border-slate-900' : 'border-slate-600 text-slate-600 bg-white'
                      }`}>{s}
                    </button>
                  ))}
                </div>

                {activeFiltersCount > 0 && (
                  <button
                    onClick={() => { setDifficultyFilter('All'); setStatusFilter('All'); setSearchQuery(''); }}
                    className="flex items-center gap-1 px-1.5 rounded-md text-[10px] font-semibold text-red-600 border bg-red-100 border-red-600 ml-auto cursor-pointer"
                  >
                    <X size={14} /> Clear
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── COMPANY STATS BAR ─────────────────────── */}
      <div className="shrink-0 bg-white border-b border-slate-300 px-5 py-3">
        <div className="flex flex-col gap-2.5">

          {/* Row 1: Title + pills */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-baseline gap-2.5">
              <h2 className="text-base font-bold text-slate-900">{selectedCompany}</h2> ---
              <span className="text-[15px] text-slate-600">
                {filteredQuestions.length} problem{filteredQuestions.length !== 1 ? 's' : ''}
                {activeFiltersCount > 0 && <span className="text-slate-500"> · filtered</span>}
              </span>
            </div>

            {/* Difficulty breakdown pills */}
            <div className="flex items-center gap-1.5">
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-100 border border-emerald-500 text-[10px] font-semibold text-emerald-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />{stats.easy} Easy
              </span>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-100 border border-amber-500 text-[10px] font-semibold text-amber-700">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />{stats.medium} Med
              </span>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-red-100 border border-red-500 text-[10px] font-semibold text-red-600">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600" />{stats.hard} Hard
              </span>
            </div>
          </div>

          {/* Row 2: Progress bar */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-emerald-500"
                initial={{ width: 0 }}
                animate={{ width: stats.total > 0 ? `${Math.round((stats.done / stats.total) * 100)}%` : '0%' }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-lg font-black text-slate-900" style={{ fontFamily: 'monospace' }}>
                {stats.done}/{stats.total}
              </span>
              <span className="text-[12px] font-semibold text-emerald-700 bg-emerald-100 px-1 py-0.2 rounded-xs border border-emerald-500">
                {stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* QUESTIONS GRID */}
      <div className="flex-1 overflow-y-auto p-4 bg-slate-200/80 not-scrollbar">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 max-w-6xl mx-auto">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-36 rounded-xl bg-slate-200 animate-pulse" />
            ))}
          </div>
        ) : filteredQuestions.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-3 border border-slate-400">
              <Search size={20} className="text-slate-700" />
            </div>
            <p className="font-semibold text-slate-500 text-sm">No problems match your filters</p>
            <button
              onClick={() => { setDifficultyFilter('All'); setStatusFilter('All'); setSearchQuery(''); }}
              className="mt-2 text-xs text-slate-500 font-semibold underline underline-offset-2 cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            <AnimatePresence mode="popLayout">
              {filteredQuestions.map((q) => {
                const isDone = completedQuestions.has(q.id);
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    key={q.id}
                    className={`p-4 rounded-xl bg-white flex flex-col ${
                      isDone ? 'border-emerald-200' : 'border-slate-200'
                    }`}
                  >
                    {/* Top */}
                    <div className="flex justify-between items-center mb-2.5 no-scrollbar">
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                        q.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-600 border border-emerald-500' :
                        q.difficulty === 'Medium' ? 'bg-amber-100 text-amber-600 border border-amber-500' :
                        'bg-red-100 text-red-600 border border-red-500'
                      }`}>{q.difficulty}</span>
                      <div className="flex items-center gap-1.5">
                        {isDone && (
                          <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded-md border border-emerald-500">
                            <CheckCircle size={9} /> Solved
                          </span>
                        )}
                        <button onClick={() => setActiveQuestion(q)} className="text-slate-500 transition-colors cursor-pointer">
                          <Info size={18} />
                        </button>
                      </div>
                    </div>

                    <h3 className="font-semibold text-slate-800 mb-2 text-sm leading-snug">{q.problem_name}</h3>

                    <div className="flex flex-wrap gap-1 mb-3 no-scrollbar">
                      {q.topics?.map((topic: string) => (
                        <span key={topic} className="text-[9px] flex items-center gap-0.5 text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded-md border border-slate-100">
                          <Tag size={12} /> {topic}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2 mt-auto">
                      <button
                        onClick={() => window.open(q.problem_link, '_blank')}
                        className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md bg-slate-900 text-white text-[11px] font-bold tracking-wide cursor-pointer"
                      >
                        <ExternalLink size={15}/> SOLVE
                      </button>
                      <button
                        onClick={() => markAsDone(q.id)}
                        disabled={isDone}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md border text-[11px] font-bold tracking-wide ${
                          isDone
                            ? 'bg-emerald-100 border-emerald-600 text-emerald-600 cursor-pointer'
                            : 'border-slate-600 text-slate-600 bg-gray-50 hover:bg-gray-100 cursor-pointer'
                        }`}
                      >
                        {isDone ? <><CheckCircle size={15} /> DONE</> : 'MARK DONE'}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </main>


    {/* ── QUESTION DETAIL DRAWER ─────────────────── */}
    <AnimatePresence>
      {activeQuestion && (
        <div className="fixed inset-0 z-[60] flex items-center justify-end bg-black/30 backdrop-blur-[2px]">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="w-full max-w-md h-full bg-white border-l border-slate-200 shadow-xl p-6 overflow-y-auto flex flex-col"
          >
            <button
              onClick={() => setActiveQuestion(null)}
              className="mb-5 text-slate-700 flex items-center gap-1.5 text-md font-semibold self-start cursor-pointer underline underline-offset-2"
            >
              <ChevronRight className="rotate-180" size={20} /> Back to list
            </button>

            <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md w-fit mb-2 ${
              activeQuestion.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-600 border border-emerald-500' :
              activeQuestion.difficulty === 'Medium' ? 'bg-amber-100 text-amber-600 border border-amber-500' :
              'bg-red-100 text-red-600 border border-red-500'
            }`}>{activeQuestion.difficulty}</span>

            <h2 className="text-xl font-bold mb-3 text-slate-900 leading-tight">{activeQuestion.problem_name}</h2>

            <div className="flex gap-2 mb-5 flex-wrap">
              <span className="px-2 py-0.5 rounded-md bg-slate-200 border border-slate-500 text-[11px] font-medium text-slate-600">
                {activeQuestion.company_name}
              </span>
              {completedQuestions.has(activeQuestion.id) && (
                <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-100 text-emerald-600 border border-emerald-500 flex items-center gap-1">
                  <CheckCircle size={15} /> Solved
                </span>
              )}
            </div>

            <p className="text-[12px] font-bold text-slate-700 mb-1.5 underline-offset-2 underline">Description</p>
            <p className="text-sm text-slate-600 leading-relaxed mb-5">
              {activeQuestion.description || 'No detailed description provided for this question yet.'}
            </p>

            <p className="text-[12px] font-bold text-slate-700 mb-1.5 underline-offset-2 underline">Topics</p>
            <div className="flex flex-wrap gap-1.5 mb-auto">
              {activeQuestion.topics?.map((t: string) => (
                <span key={t} className="px-2 py-0.5 rounded-md bg-slate-200 border border-slate-600 text-[11px] text-slate-600">
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-yellow-200 border border-yellow-600">
              <p className="text-[12px] font-semibold mb-2.5 text-slate-800">Ready to attempt this problem?</p>
              <button
                onClick={() => window.open(activeQuestion.problem_link, '_blank')}
                className="w-full py-2.5 rounded-md bg-slate-900 text-white font-bold text-sm tracking-wide"
              >
                Open on {activeQuestion.problem_source || 'LeetCode'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  </div>
);
}