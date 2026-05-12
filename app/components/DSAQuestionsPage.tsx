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
      <div className={`p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between ${mobile ? '' : ''}`}>
        {(!sidebarCollapsed || mobile) && (
          <div className="flex items-center gap-2">
            <Layout size={18} className="text-emerald-500" />
            <span className="font-black text-sm tracking-tight text-gray-900 dark:text-gray-100">Companies</span>
          </div>
        )}
        {mobile ? (
          <button onClick={() => setMobileSidebarOpen(false)} className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
            <X size={16} className="text-gray-500" />
          </button>
        ) : (
          <button
            onClick={() => setSidebarCollapsed(v => !v)}
            className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ml-auto"
          >
            {sidebarCollapsed
              ? <ChevronRight size={16} className="text-gray-500" />
              : <ChevronLeft size={16} className="text-gray-500" />}
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {companies.map(([name, count]: any) => (
          <button
            key={name}
            onClick={() => { setSelectedCompany(name); if (mobile) setMobileSidebarOpen(false); }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md transition-all ${
              selectedCompany === name
                ? 'bg-emerald-500 text-white shadow-sm'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
            }`}
          >
            {(!sidebarCollapsed || mobile) && <span className="text-xs font-semibold truncate">{name}</span>}
            <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold shrink-0 ${
              selectedCompany === name ? 'bg-white/20 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
            } ${sidebarCollapsed && !mobile ? 'mx-auto' : ''}`}>
              {count}
            </span>
          </button>
        ))}
      </div>
    </>
  );

  return (
    <div className={`flex h-screen overflow-hidden ${darkMode ? 'dark bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>

      {/* ── DESKTOP SIDEBAR ─────────────────────────── */}
      <aside className={`hidden lg:flex flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-all duration-200 ${sidebarCollapsed ? 'w-14' : 'w-64'}`}>
        <SidebarContent />
      </aside>

      {/* ── MOBILE SIDEBAR OVERLAY ──────────────────── */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed left-0 top-0 h-full w-64 z-50 flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 lg:hidden"
            >
              <SidebarContent mobile />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── MAIN ──────────────────────────────────── */}
      <main className="flex-1 flex flex-col overflow-hidden min-w-0">

        {/* TOPBAR */}
        <header className="shrink-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 md:px-6 py-3">
          <div className="flex items-center justify-between gap-3">

            {/* Left */}
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Layout size={18} className="text-gray-500" />
              </button>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">DSA Dashboard</p>
                <h1 className="text-base font-black truncate text-gray-900 dark:text-gray-100">
                  {user?.firstName ? `Hey, ${user.firstName} 👋` : 'Dashboard'}
                </h1>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Search — desktop */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={13} />
                <input
                  type="text"
                  placeholder="Search problems…"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs focus:ring-1 ring-emerald-500 outline-none w-44 text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
                />
              </div>

              {/* Filters toggle */}
              <button
                onClick={() => setFiltersOpen(v => !v)}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all border ${
                  filtersOpen
                    ? 'bg-emerald-500 text-white border-emerald-500'
                    : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <SlidersHorizontal size={13} />
                <span className="hidden sm:inline">Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-emerald-500 text-white text-[9px] font-black flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              <button onClick={toggleDarkMode} className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                {darkMode ? <Sun size={15} className="text-amber-400" /> : <Moon size={15} className="text-gray-500" />}
              </button>
            </div>
          </div>

          {/* ── SLIDING FILTERS PANEL ─────────────── */}
          <AnimatePresence initial={false}>
            {filtersOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="pt-3 flex flex-col sm:flex-row gap-2 flex-wrap">
                  {/* Search — mobile */}
                  <div className="relative md:hidden flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={13} />
                    <input
                      type="text"
                      placeholder="Search problems…"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs outline-none focus:ring-1 ring-emerald-500 text-gray-900 dark:text-gray-100"
                    />
                  </div>

                  {/* Difficulty */}
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase mr-1">Difficulty</span>
                    {['All', 'Easy', 'Medium', 'Hard'].map(d => (
                      <button
                        key={d}
                        onClick={() => setDifficultyFilter(d)}
                        className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all border ${
                          difficultyFilter === d
                            ? d === 'Easy' ? 'bg-emerald-500 text-white border-emerald-500'
                              : d === 'Medium' ? 'bg-amber-500 text-white border-amber-500'
                              : d === 'Hard' ? 'bg-rose-500 text-white border-rose-500'
                              : 'bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-gray-900'
                            : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase mr-1">Status</span>
                    {['All', 'Done', 'Pending'].map(s => (
                      <button
                        key={s}
                        onClick={() => setStatusFilter(s)}
                        className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all border ${
                          statusFilter === s
                            ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-transparent'
                            : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>

                  {/* Clear */}
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={() => { setDifficultyFilter('All'); setStatusFilter('All'); setSearchQuery(''); }}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold text-rose-500 border border-rose-200 dark:border-rose-900 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors ml-auto"
                    >
                      <X size={10} /> Clear all
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* STATS + COMPANY TITLE ROW */}
        <div className="shrink-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 md:px-6 py-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Company title + count */}
            <div>
              <h2 className="text-xl font-black text-gray-900 dark:text-gray-100">{selectedCompany}</h2>
              <p className="text-[11px] text-gray-400 mt-0.5">
                {filteredQuestions.length} question{filteredQuestions.length !== 1 ? 's' : ''} shown
                {activeFiltersCount > 0 && <span className="text-emerald-500"> (filtered)</span>}
              </p>
            </div>

            {/* STATS CARDS + PIE */}
            <div className="flex items-center gap-4 flex-wrap">
              {/* Stat pills */}
              <div className="flex gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle size={12} className="text-emerald-500" />
                  <span className="text-[11px] font-black text-emerald-700 dark:text-emerald-400">{stats.done} Done</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <Target size={12} className="text-gray-400" />
                  <span className="text-[11px] font-black text-gray-600 dark:text-gray-300">{stats.left} Left</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <TrendingUp size={12} className="text-gray-400" />
                  <span className="text-[11px] font-black text-gray-600 dark:text-gray-300">{stats.total} Total</span>
                </div>
              </div>

              {/* Pie charts */}
              <div className="flex gap-4 flex-wrap">
                {/* Progress pie */}
                <div className="bg-gray-50 dark:bg-gray-800/60 rounded-md border border-gray-200 dark:border-gray-700 p-3">
                  <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2 flex items-center gap-1">
                    <Zap size={9} /> Progress
                  </p>
                  <PieChart slices={[
                    { value: stats.done, color: '#10b981', label: 'Done' },
                    { value: stats.left, color: '#e5e7eb', label: 'Left' },
                  ]} />
                </div>

                {/* Difficulty pie */}
                <div className="bg-gray-50 dark:bg-gray-800/60 rounded-md border border-gray-200 dark:border-gray-700 p-3">
                  <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2 flex items-center gap-1">
                    <Target size={9} /> Difficulty
                  </p>
                  <PieChart slices={[
                    { value: stats.easy, color: '#10b981', label: 'Easy' },
                    { value: stats.medium, color: '#f59e0b', label: 'Medium' },
                    { value: stats.hard, color: '#f43f5e', label: 'Hard' },
                  ]} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* QUESTIONS GRID */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 dark:bg-gray-950">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-44 rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse" />
              ))}
            </div>
          ) : filteredQuestions.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <Search size={32} className="text-gray-300 dark:text-gray-700 mb-3" />
              <p className="font-bold text-gray-400 dark:text-gray-600">No questions match your filters</p>
              <button onClick={() => { setDifficultyFilter('All'); setStatusFilter('All'); setSearchQuery(''); }} className="mt-3 text-xs text-emerald-500 font-bold hover:underline">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence mode="popLayout">
                {filteredQuestions.map((q) => {
                  const isDone = completedQuestions.has(q.id);
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      key={q.id}
                      className={`p-5 rounded-md bg-white dark:bg-gray-900 border flex flex-col transition-all ${
                        isDone
                          ? 'border-emerald-200 dark:border-emerald-900'
                          : 'border-gray-200 dark:border-gray-800'
                      }`}
                    >
                      <div className="flex justify-between mb-3">
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
                          q.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                          q.difficulty === 'Medium' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                          'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
                        }`}>{q.difficulty}</span>
                        <div className="flex items-center gap-2">
                          {isDone && <CheckCircle size={14} className="text-emerald-500" />}
                          <button onClick={() => setActiveQuestion(q)} className="text-gray-300 dark:text-gray-600 hover:text-emerald-500 transition-colors">
                            <Info size={18} />
                          </button>
                        </div>
                      </div>

                      <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-2 text-sm">{q.problem_name}</h3>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {q.topics?.map((topic: string) => (
                          <span key={topic} className="text-[9px] flex items-center gap-1 text-gray-400 bg-gray-50 dark:bg-gray-800 px-1.5 py-0.5 rounded-md border border-gray-100 dark:border-gray-700">
                            <Tag size={8} /> {topic}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-2 mt-auto">
                        <button
                          onClick={() => window.open(q.problem_link, '_blank')}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold hover:opacity-90 transition"
                        >
                          SOLVE <ExternalLink size={11} />
                        </button>
                        <button
                          onClick={() => markAsDone(q.id)}
                          disabled={isDone}
                          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md border text-xs font-bold transition ${
                            isDone
                              ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-600 cursor-default'
                              : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                          }`}
                        >
                          {isDone ? <><CheckCircle size={11} /> DONE</> : 'MARK DONE'}
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
          <div className="fixed inset-0 z-[60] flex items-center justify-end bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-full max-w-lg h-full bg-white dark:bg-gray-900 shadow-2xl p-6 md:p-8 overflow-y-auto flex flex-col"
            >
              <button
                onClick={() => setActiveQuestion(null)}
                className="mb-6 text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-2 text-xs font-bold self-start"
              >
                <ChevronRight className="rotate-180" size={14} /> Back to list
              </button>

              <h2 className="text-2xl font-black mb-3 text-gray-900 dark:text-gray-100">{activeQuestion.problem_name}</h2>
              <div className="flex gap-2 mb-6 flex-wrap">
                <span className="px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-xs font-bold text-gray-600 dark:text-gray-400">
                  {activeQuestion.company_name}
                </span>
                <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                  activeQuestion.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-700' :
                  activeQuestion.difficulty === 'Medium' ? 'bg-amber-100 text-amber-700' :
                  'bg-rose-100 text-rose-700'
                }`}>
                  {activeQuestion.difficulty}
                </span>
                {completedQuestions.has(activeQuestion.id) && (
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-100 text-emerald-700 flex items-center gap-1">
                    <CheckCircle size={10} /> Solved
                  </span>
                )}
              </div>

              <h4 className="text-[11px] font-black uppercase tracking-widest text-emerald-500 mb-2">Description</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                {activeQuestion.description || 'No detailed description provided for this question yet.'}
              </p>

              <h4 className="text-[11px] font-black uppercase tracking-widest text-emerald-500 mb-2">Topics</h4>
              <div className="flex flex-wrap gap-2 mb-auto">
                {activeQuestion.topics?.map((t: string) => (
                  <span key={t} className="px-2 py-1 rounded-md bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-400">
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-8 p-5 rounded-md bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800">
                <p className="text-xs font-medium mb-3 text-gray-500 dark:text-gray-400 italic">Ready to attempt this?</p>
                <button
                  onClick={() => window.open(activeQuestion.problem_link, '_blank')}
                  className="w-full py-3 rounded-md bg-emerald-500 text-white font-bold text-sm hover:bg-emerald-600 transition shadow-lg shadow-emerald-500/20"
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