"use client";

import { useState, useRef, useEffect } from "react";
import {
  CheckCircle, XCircle, Loader2, Upload, FileText,
  Award, Target, Sparkles, AlertCircle, Brain, Zap, CheckCheck,
  Shield, Users, Briefcase, Code, Star, Github, Linkedin, Globe,
  Trophy, Download, Cpu, GraduationCap, TrendingUp,
  AlertTriangle, ExternalLink, Lock, ArrowUpRight, Hash, BookOpen,
} from "lucide-react";
import { useAuth, useClerk } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { consumeCredit } from "../../lib/consumeCredit";
import CreditUsedToast from "./CreditUsedToast";

/* ─────────────── TYPES ────────────────────────────────────── */
interface ImprovementItem { priority: "High"|"Medium"|"Low"; category: string; action: string; impact: string; }
interface GrammarExample { original: string; fix: string; type?: string; }
interface RedFlag { flag: string; detail: string; severity: "Low"|"Medium"|"High"; fix?: string; }
interface Contradiction { element: string; detail: string; fix?: string; }

interface AnalyzeData {
  ats_score: {
    score: number;
    rating: string;
    verdict: string;
  };
  skills_score: {
    score: number;
    total_detected: number;
    by_category: Record<string, string[]>;
    top_skills: string[];
    verdict: string;
  };
  formatting_score: {
    score: number;
    flags: string[];
    ats_risk: string;
    verdict: string;
  };
  experience_score: {
    score: number;
    level: string;
    verdict: string;
  };
  market_trend: {
    score: number;
    modern_tech: string[];
    dated_tech: string[];
    verdict: string;
    insight: string;
  };
  grammar: {
    score: number;
    errors_found: number;
    examples: GrammarExample[];
    verdict: string;
    insight: string;
  };
  red_flags: {
    count: number;
    severity: "None"|"Low"|"Medium"|"High";
    flags: RedFlag[];
    verdict: string;
    insight: string;
  };
  contradictions: {
    count: number;
    items: Contradiction[];
    verdict: string;
    insight: string;
  };
  recruiter_3s: {
    score: number;
    first_impression: string;
    what_works: string[];
    what_hurts: string[];
    verdict: string;
    insight: string;
  };
  overall_verdict: {
    summary: string;
    single_best_action: string;
    hire_likelihood: "Strong Yes"|"Leaning Yes"|"Maybe"|"Leaning No"|"No";
    hire_reasoning: string;
  };
}


/* ─────────────── PDF REPORT ───────────────────────────────── */
function generatePDFReport(data: AnalyzeData, fileName: string) {
  const d = data;
  const html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Resume Analysis Report</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Times New Roman',serif;color:#111;background:#fff;font-size:11.5pt;line-height:1.65;padding:2.5cm 2.8cm}
h1{font-size:20pt;font-weight:bold;letter-spacing:.02em;margin-bottom:2px}h2{font-size:12pt;font-weight:bold;margin:20px 0 7px;border-bottom:1.5px solid #111;padding-bottom:3px;text-transform:uppercase}
.sub{font-size:9.5pt;color:#555;margin-bottom:22px}.rule{border:none;border-top:2px solid #111;margin:8px 0 18px}
.score-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:8px}.score-box{border:1px solid #bbb;padding:10px 12px;text-align:center}
.score-num{font-size:18pt;font-weight:bold}.score-lbl{font-size:8pt;color:#666;margin-top:2px}
.insight{background:#f9f9f9;border-left:3px solid #888;padding:8px 12px;margin:8px 0;font-size:10pt;line-height:1.6}
.flag-block{border-left:3px solid #e44;padding:5px 10px;margin-bottom:7px;font-size:10pt;background:#fff5f5}
.bar-wrap{margin:3px 0 7px}.bar-label{display:flex;justify-content:space-between;font-size:9pt;margin-bottom:2px}
.bar-track{height:7px;background:#eee;border:.5px solid #ddd}.bar-fill{height:100%;background:#444}
.pill{display:inline-block;border:.5px solid #aaa;padding:1px 7px;font-size:8.5pt;margin:2px 2px 0 0}
.footer{margin-top:32px;border-top:1px solid #ccc;padding-top:8px;font-size:8pt;color:#888;text-align:center}
@media print{body{padding:1.4cm 1.8cm}}</style></head><body>
<h1>Resume Analysis Report</h1>
<p class="sub">Generated ${new Date().toLocaleDateString("en-IN",{year:"numeric",month:"long",day:"numeric"})} · ${fileName}</p>
<hr class="rule"/>
<h2>Overall Verdict</h2>
<div class="insight">${d.overall_verdict?.summary ?? "—"}</div>
<p style="margin:6px 0;font-size:10pt"><strong>Hire likelihood:</strong> ${d.overall_verdict?.hire_likelihood ?? "—"} — ${d.overall_verdict?.hire_reasoning ?? ""}</p>
<p style="margin:6px 0;font-size:10pt"><strong>Top action:</strong> ${d.overall_verdict?.single_best_action ?? "—"}</p>
<h2>Score Summary</h2>
<div class="score-grid">
  <div class="score-box"><div class="score-num">${d.ats_score?.score ?? "—"}</div><div class="score-lbl">${d.ats_score?.rating ?? ""} · ATS</div></div>
  <div class="score-box"><div class="score-num">${d.skills_score?.score ?? "—"}</div><div class="score-lbl">${d.skills_score?.total_detected ?? 0} skills · Skills</div></div>
  <div class="score-box"><div class="score-num">${d.formatting_score?.score ?? "—"}</div><div class="score-lbl">${d.formatting_score?.ats_risk ?? ""} risk · Formatting</div></div>
  <div class="score-box"><div class="score-num">${d.experience_score?.score ?? "—"}</div><div class="score-lbl">${d.experience_score?.level ?? ""} · Experience</div></div>
  <div class="score-box"><div class="score-num">${d.market_trend?.score ?? "—"}</div><div class="score-lbl">Market Trend</div></div>
  <div class="score-box"><div class="score-num">${d.grammar?.score ?? "—"}</div><div class="score-lbl">${d.grammar?.errors_found ?? 0} errors · Grammar</div></div>
</div>
<h2>Recruiter 3-Second Scan</h2>
<p style="font-size:10pt;margin-bottom:6px"><em>"${d.recruiter_3s?.first_impression ?? ""}"</em></p>
<p style="font-size:10pt"><strong>Score:</strong> ${d.recruiter_3s?.score ?? "—"}/100 — ${d.recruiter_3s?.verdict ?? ""}</p>
${d.recruiter_3s?.what_works?.length ? `<p style="margin-top:6px;font-size:10pt"><strong>Works:</strong> ${d.recruiter_3s.what_works.join(" · ")}</p>` : ""}
${d.recruiter_3s?.what_hurts?.length ? `<p style="margin-top:4px;font-size:10pt"><strong>Hurts:</strong> ${d.recruiter_3s.what_hurts.join(" · ")}</p>` : ""}
<h2>Red Flags</h2>
<p style="font-size:10pt;margin-bottom:6px"><strong>Severity:</strong> ${d.red_flags?.severity ?? "None"} · ${d.red_flags?.count ?? 0} flag(s)</p>
${(d.red_flags?.flags ?? []).map(f => `<div class="flag-block"><strong>${f.flag}</strong> [${f.severity}]<br/>${f.detail}</div>`).join("")}
<div class="insight">${d.red_flags?.insight ?? ""}</div>
<h2>Grammar & Spelling</h2>
${(d.grammar?.examples ?? []).length > 0
  ? d.grammar.examples.map(e => `<p style="font-size:10pt;margin:4px 0">❌ "${e.original}" → ✓ "${e.fix}"</p>`).join("")
  : `<p style="font-size:10pt;color:#555">No errors detected.</p>`}
<div class="insight">${d.grammar?.insight ?? ""}</div>
<h2>Contradictions</h2>
${(d.contradictions?.items ?? []).length > 0
  ? d.contradictions.items.map(c => `<p style="font-size:10pt;margin:4px 0"><strong>${c.element}:</strong> ${c.detail}</p>`).join("")
  : `<p style="font-size:10pt;color:#555">No contradictions found.</p>`}
<h2>Formatting Issues</h2>
${(d.formatting_score?.flags ?? []).length > 0
  ? d.formatting_score.flags.map(f => `<div class="flag-block">${f}</div>`).join("")
  : `<p style="font-size:10pt;color:#555">No formatting issues — ATS friendly.</p>`}
<h2>Market Trend</h2>
<p style="font-size:10pt"><strong>Modern tech:</strong> ${(d.market_trend?.modern_tech ?? []).join(", ") || "None detected"}</p>
<p style="font-size:10pt;margin-top:4px"><strong>Dated tech:</strong> ${(d.market_trend?.dated_tech ?? []).join(", ") || "None"}</p>
<div class="insight">${d.market_trend?.insight ?? ""}</div>
<h2>Skills Detected (${d.skills_score?.total_detected ?? 0})</h2>
${Object.entries(d.skills_score?.by_category ?? {}).filter(([,s])=>(s as string[]).length>0).map(([cat,skills])=>`<p style="font-size:9.5pt;margin:4px 0"><strong>${cat.replace(/_/g," ")}:</strong> ${(skills as string[]).join(", ")}</p>`).join("")}
<div class="footer">AI Resume Analyser · Scores are indicative and based on automated analysis.</div>
<script>window.onload=function(){window.print()}<\/script>
</body></html>`;
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, "_blank");
  if (!win) alert("Please allow popups to download the report.");
}

/* ─────────────── SHARED UI COMPONENTS ─────────────────────── */
function SectionHeader({ icon, title, subtitle, colorFrom, colorTo, iconColor }: {
  icon: React.ReactNode; title: string; subtitle?: string;
  colorFrom: string; colorTo: string; iconColor: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className={`p-2.5 bg-gradient-to-br ${colorFrom} ${colorTo} rounded-xl`}>
        <div className={iconColor}>{icon}</div>
      </div>
      <div>
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

function StatRow({ label, value, accent = false }: { label: string; value: string|number; accent?: boolean }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0 text-sm">
      <span className="text-gray-500">{label}</span>
      <span className={`font-semibold ${accent ? "text-violet-600" : "text-gray-800"}`}>{value}</span>
    </div>
  );
}

function ScorePill({ score, color = "violet" }: { score: number; color?: string }) {
  const colorMap: Record<string,string> = {
    violet: "from-violet-400 to-purple-500", emerald: "from-emerald-400 to-teal-500",
    amber: "from-amber-400 to-orange-500",   blue: "from-blue-400 to-indigo-500",
    rose: "from-rose-400 to-pink-500",
  };
  return (
    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
      <div className={`h-full bg-gradient-to-r ${colorMap[color]??colorMap.violet} rounded-full transition-all duration-700`} style={{ width:`${Math.min(score,100)}%` }} />
    </div>
  );
}

function LockedBadge({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 border border-dashed border-gray-300 rounded-xl text-gray-500 text-xs">
      <Lock className="w-3.5 h-3.5 shrink-0" />{message}
    </div>
  );
}

function SignalBadge({ label, variant }: { label: string; variant: "good"|"warn"|"bad"|"neutral" }) {
  const map = { good:"bg-emerald-50 text-emerald-700 border-emerald-200", warn:"bg-amber-50 text-amber-700 border-amber-200", bad:"bg-rose-50 text-rose-700 border-rose-200", neutral:"bg-gray-100 text-gray-600 border-gray-200" };
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${map[variant]}`}>{label}</span>;
}

/** Readable insight paragraph box */
function InsightBox({ text, className = "" }: { text: string; className?: string }) {
  if (!text) return null;
  return (
    <div className={`mt-4 p-4 bg-gradient-to-br from-gray-50 to-blue-50/30 border border-grey-100 rounded-xl ${className}`}>
      <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
    </div>
  );
}

/** Inline stat + large number */
function BigStat({ value, label, color = "text-gray-900" }: { value: string|number; label: string; color?: string }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className={`text-4xl font-bold ${color}`}>{value}</span>
      <span className="text-sm text-gray-400">{label}</span>
    </div>
  );
}

const scoreColor = (s: number) => s >= 75 ? "emerald" : s >= 55 ? "amber" : "rose";
const ratioVariant = (r: number): "good"|"warn"|"bad" => r >= 60 ? "good" : r >= 35 ? "warn" : "bad";

function Expandable({ items, renderItem, initialShow = 3 }: {
  items: any[];
  renderItem: (item: any, i: number) => React.ReactNode;
  initialShow?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, initialShow);
  const hasMore = items.length > initialShow;
  return (
    <div>
      <div className="space-y-2">
        {visible.map((item, i) => renderItem(item, i))}
      </div>
      {hasMore && (
        <button
          onClick={() => setExpanded(e => !e)}
          className="mt-2 text-[10px] font-bold uppercase tracking-widest text-gray-700 flex items-center gap-1"
        >
          {expanded ? "▲ Show less" : `▼ View ${items.length - initialShow} more`}
        </button>
      )}
    </div>
  );
}

/* ─────────────── MAIN ──────────────────────────────────────── */
export default function Analysis() {
  const { isSignedIn } = useAuth();
  const clerk = useClerk();
  const { user } = useUser();
  const [file, setFile] = useState<File|null>(null);
  const [testing, setTesting] = useState(false);
  const [analyzeResult, setAnalyzeResult] = useState<{success:boolean;data:AnalyzeData}|null>(null);
  const [error, setError] = useState<string|null>(null);
  const [showPlaceholder, setShowPlaceholder] = useState(false);
  const [pendingAnalyze, setPendingAnalyze] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview"|"analysis"|"skills">("overview");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (isSignedIn && pendingAnalyze) { setPendingAnalyze(false); runAnalysis(); }
  }, [isSignedIn, pendingAnalyze]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f?.type === "application/pdf") { setFile(f); setError(null); setAnalyzeResult(null); }
    else { setError("Please select a valid PDF file."); setFile(null); }
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f?.type === "application/pdf") { setFile(f); setError(null); setAnalyzeResult(null); }
    else setError("Please drop a valid PDF file.");
  };

  const runAnalysis = async () => {
    if (!file) { setError("Please select a PDF file first."); return; }
    setTesting(true); setError(null); setAnalyzeResult(null); setShowPlaceholder(true); setActiveTab("overview");
    try {
      const formData = new FormData();
      formData.append("resume", file);
      const uploadRes = await fetch(`${API_BASE}/upload-resume`, { method: "POST", body: formData });
      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadData.error || "Upload failed");
      const resumeText: string = uploadData.text || uploadData.TEXT || "";
      const analyzeRes = await fetch(`${API_BASE}/analyze`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume_text: resumeText, is_premium: true }),
      });
      const analyzeData: AnalyzeData = await analyzeRes.json();
      await fetch(`${API_BASE}/career-intelligence`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clerk_user_id: user?.id, resume_text: resumeText }),
      }).catch(() => {});
      setAnalyzeResult({ success: analyzeRes.ok, data: analyzeData });
      if (!analyzeRes.ok) throw new Error((analyzeData as any).error || "Analysis failed");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally { setTesting(false); setShowPlaceholder(false); }
  };

  const handleAnalyzeClick = async () => {
    if (!file) { setError("Please select a PDF file first."); return; }
    if (!isSignedIn) {
      setPendingAnalyze(true);
      try { clerk.openSignIn(); } catch { window.location.href = "/sign-in"; }
      return;
    }
    setShowToast(true);
    const usage = await consumeCredit(user!.id, "resume_analysis");
    if (!usage.allowed) { alert("Credits exhausted. Please upgrade to continue."); return; }
    await runAnalysis();
  };

  const d = analyzeResult?.data;

const radarData = d ? [
  { category: "ATS",         value: d.ats_score?.score ?? 0,         fullMark: 100 },
  { category: "Skills",      value: d.skills_score?.score ?? 0,       fullMark: 100 },
  { category: "Formatting",  value: d.formatting_score?.score ?? 0,   fullMark: 100 },
  { category: "Experience",  value: d.experience_score?.score ?? 0,   fullMark: 100 },
  { category: "Market Fit",  value: d.market_trend?.score ?? 0,       fullMark: 100 },
] : [];
const PASTEL = ["#A7C7E7","#B4E7CE","#FFD4A3","#E7B4D7","#C5A7E7"];

  return (
  <div className="min-h-screen bg-[#F3F4F6] text-gray-800 py-10 px-4 sm:px-6 lg:px-8 font-sans antialiased">
    <div className="max-w-7xl mx-auto space-y-6">

      {/* ══════ MASTER CONTROLS HEADLINE ══════ */}
      <div className="bg-white/90 backdrop-blur-md border border-gray-200/80 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-5">
  {/* Left: Text Info */}
  <div>
    <h2 className="text-lg font-bold text-gray-900 tracking-tight">Document Parser</h2>
    <p className="text-xs text-gray-500 mt-0.5 font-medium">
      Evaluating 14 structural rules. PDF configuration format alignment.
    </p>
  </div>

  {/* Right: Actions */}
  <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
    
    {/* Modernized File Drop/Click Zone */}
    <div 
      onClick={() => fileInputRef.current?.click()}
      className={`relative group px-4 py-2.5 border rounded-xl cursor-pointer transition-all duration-300 flex items-center gap-2 text-xs font-semibold select-none
        ${file 
          ? "border-emerald-500/30 bg-emerald-50/40 text-emerald-800" 
          : "border-gray-200 bg-gray-50/50 text-gray-600 hover:border-gray-400 hover:bg-gray-100/50"
        }`}
    >
      <input 
        ref={fileInputRef} 
        type="file" 
        accept=".pdf" 
        onChange={handleFileChange} 
        className="hidden" 
      />
      
      {/* Dynamic Icon Indicator */}
      <span className={`w-1.5 h-1.5 rounded-full transition-transform duration-300 group-hover:scale-125
        ${file ? "bg-emerald-500 animate-pulse" : "bg-gray-400"}`} 
      />
      
      <span className="truncate max-w-[180px]">
        {file ? file.name : "Choose PDF Target"}
      </span>
    </div>

    {/* Modern Dark/Neutral Primary Button */}
    <button 
      onClick={handleAnalyzeClick} 
      disabled={testing || !file}
      className={`px-5 py-2.5 rounded-xl font-semibold text-xs tracking-wide transition-all duration-200 shadow-xs
        ${testing || !file 
          ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
          : "bg-gray-900 text-white hover:bg-gray-800 active:scale-[0.98] hover:shadow-sm"
        }`}
    >
      {testing ? "Analyzing..." : "Analyze"}
    </button>

    {/* Action Button */}
    {file && d && (
      <button 
        className="p-2.5 border border-gray-200 bg-white hover:bg-gray-50 active:scale-[0.98] rounded-xl text-gray-600 transition-all shadow-xs"
        title="Download Report Assembly"
      >
        <Download className="w-4 h-4" />
      </button>
    )}
  </div>
</div>

      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-900 rounded-2xl p-4 text-xs flex gap-3 shadow-xs">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" /> <span>{error}</span>
        </div>
      )}

      {/* ══════ VISUALLY ENGAGING MULTI-STEP 6S VISUAL PAUSE STATE ══════ */}
      {/* ══════ VISUALLY ENGAGING MULTI-STEP ENGINE LOADING STATE (7s PURE CSS) ══════ */}
{showPlaceholder && (
  <div className="bg-white border border-gray-200/80 rounded-2xl p-12 text-center shadow-md max-w-xl mx-auto my-16 transition-all duration-300">
    
    {/* Clean, Non-Indigo Status Icon */}
    <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-50 text-gray-700 rounded-xl border border-gray-200 shadow-2xs mb-5">
      <Loader2 className="w-5 h-5 animate-spin text-emerald-600" />
    </div>
    
    {/* Text Context */}
    <div className="space-y-1.5 mb-6">
      <h3 className="text-base font-bold text-gray-900 tracking-tight">
        Deep Structural Engine Processing
      </h3>
      <p className="text-xs text-gray-700 font-medium">
        Time-slice multi-pass layout validator active.
      </p>
    </div>

    {/* Premium Step Progression and Animated Status Rail */}
    <div className="max-w-xs mx-auto space-y-4">
      
      {/* Sleek Progress Container */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[10px] font-mono tracking-wider text-gray-400 uppercase px-0.5">
          <span>Engine Progress</span>
          <span className="font-bold text-gray-600 animate-[pulse_1.5s_infinite]">
            Running...
          </span>
        </div>
        
        {/* Progress Track */}
        <div className="bg-gray-100 h-1.5 w-full rounded-full overflow-hidden border border-gray-200/20">
          <div 
            className="bg-emerald-600 h-full rounded-full [animation:progress_7s_linear_infinite]" 
            style={{
              animationName: 'progress',
              animationDuration: '7s',
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite'
            }}
          />
        </div>
      </div>

      {/* Dynamic Text Box (Using Tailwind Custom Arbitrary Animation values) */}
      <div className="bg-emerald-50/30 border border-emerald-500/10 rounded-xl py-2.5 px-4 shadow-3xs flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
        <div className="text-xs font-semibold text-emerald-800 tracking-wide truncate h-4 relative overflow-hidden w-full">
          <div className="absolute w-full top-0 [animation:textShift_7s_step-end_infinite] flex flex-col">
            <span className="h-4 leading-4">Initializing structural framework...</span>
            <span className="h-4 leading-4">Evaluating layout ruleset grid...</span>
            <span className="h-4 leading-4">Validating font-mapping vectors...</span>
            <span className="h-4 leading-4">Finalizing integrity output matrix...</span>
          </div>
        </div>
      </div>
    </div>

    {/* Inline CSS Keyframe injections so it runs natively out-of-the-box */}
    <style dangerouslySetInnerHTML={{__html: `
      @keyframes progress {
        0% { width: 0%; }
        100% { width: 100%; }
      }
      @keyframes textShift {
        0%, 25% { transform: translateY(0px); }
        25%, 50% { transform: translateY(-16px); }
        50%, 75% { transform: translateY(-32px); }
        75%, 100% { transform: translateY(-48px); }
      }
    `}} />
  </div>
)}

      {/* ══════ MAIN SINGLE PAGE DASHBOARD ══════ */}
      {!showPlaceholder && analyzeResult?.success && d && (
  <div className="space-y-6 transition-all duration-500 animate-in fade-in slide-in-from-bottom-2">
    
    {/* TOP EXECUTIVE METRIC CARDS */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: "ATS Core Score", value: d.ats_score?.score, tag: d.ats_score?.rating, color: "text-emerald-700 bg-emerald-50/50 border-emerald-200/60" },
        { label: "Skill Alignment Vector", value: d.skills_score?.score, tag: `${d.skills_score?.total_detected ?? 0} Terms`, color: "text-gray-700 bg-gray-50 border-gray-200" },
        { label: "Experience Velocity", value: d.experience_score?.score, tag: d.experience_score?.level, color: "text-cyan-700 bg-cyan-50/60 border-cyan-200/60" },
        { label: "Market Life Index", value: d.market_trend?.score, tag: "Modernity Pass", color: "text-amber-700 bg-amber-50/60 border-amber-200/60" }
      ].map((kpi, i) => (
        <div key={i} className="bg-white rounded-2xl border border-grey-100 p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-all duration-200">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{kpi.label}</span>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-bold tracking-tight text-gray-900">{kpi.value ?? "—"}</span>
            <span className={`text-[10px] font-semibold uppercase px-2.5 py-0.5 rounded-md border ${kpi.color}`}>{kpi.tag}</span>
          </div>
        </div>
      ))}
    </div>

    {/* TWO-COLUMN GRID ARCHITECTURE */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      
      {/* LEFT BODY: PARSED VECTORS & DETAILS */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Keywords Categories Grid */}
        <div className="bg-white rounded-2xl border border-grey-100 p-6 shadow-xs">
          <div className="border-b border-gray-100 pb-4 mb-4 flex items-center justify-between">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <Code className="w-4 h-4 text-gray-400" /> Parsed Keywords by Core Segment
            </h3>
            <span className="text-[10px] font-bold text-gray-700 bg-gray-50 border border-gray-200 px-2.5 py-0.5 rounded-md">
              {d.skills_score?.total_detected ?? 0} Frameworks Indexed
            </span>
          </div>

          <div className="divide-y divide-gray-100">
            {Object.entries(d.skills_score?.by_category ?? {})
              .filter(([, skills]) => (skills as string[]).length > 0)
              .map(([category, skills]) => (
                <div key={category} className="grid grid-cols-1 sm:grid-cols-4 items-start gap-4 py-3.5 first:pt-1 last:pb-1">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider pt-1">{category.replace(/_/g, " ")}</span>
                  <div className="sm:col-span-3 flex flex-wrap gap-1.5">
                    {(skills as string[]).map((sk, idx) => (
                      <span key={idx} className="px-2.5 py-0.5 bg-gray-50 border border-gray-200/80 text-gray-700 text-xs font-medium rounded-md shadow-3xs">{sk}</span>
                    ))}
                  </div>
                </div>
              ))}
          </div>

          <div className="mt-5 p-4 bg-emerald-50 border border-emerald-500 text-gray-700 rounded-xl text-xs leading-relaxed">
            <span className="font-bold text-emerald-900 block mb-0.5">Core Vector Recommendation</span>
            {d.skills_score?.verdict}
          </div>
        </div>

        {/* ATS Compliance Matrix */}
        <div className="bg-white rounded-2xl border border-grey-100 p-6 shadow-xs">
          <div className="border-b border-gray-100 pb-4 mb-4 flex items-center justify-between">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <Shield className="w-4 h-4 text-gray-400" /> Structure & Multi-Column Compliance
            </h3>
            <span className="text-[10px] font-bold uppercase text-emerald-800 bg-emerald-50 px-2 rounded-md border border-emerald-100">
              Risk Matrix: {d.formatting_score?.ats_risk ?? "Low"}
            </span>
          </div>

          {(d.formatting_score?.flags ?? []).length > 0 ? (
            <div className="space-y-2 mb-4">
              {d.formatting_score.flags.map((flag, i) => (
                <div key={i} className="flex items-start gap-2 px-3 py-2 bg-rose-50/60 border border-rose-100 rounded-xl">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-rose-700">{flag}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-500 rounded-xl mb-4">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <p className="text-xs text-emerald-800 font-medium">No formatting issues — ATS friendly.</p>
            </div>
          )}

          <div className="p-4 bg-gray-50 border border-gray-200/60 text-gray-700 rounded-xl text-xs leading-relaxed">
            <span className="font-bold text-gray-800 block mb-0.5">Automated Layout Analysis</span>
            {d.formatting_score?.verdict}
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="space-y-6">

        {/* Recruiter 3-Second Scan */}
        <div className="bg-white rounded-2xl border border-grey-100 p-6 shadow-xs space-y-4">
          <div className="border-b border-gray-100 pb-4 flex items-center justify-between">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-gray-400" /> Executive Rapid Scan
            </h3>
            <span className="text-xs font-bold font-mono text-gray-600 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-md">
              {d.recruiter_3s?.score ?? "—"}/100
            </span>
          </div>

          {d.recruiter_3s?.first_impression ? (
            <div className="bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-3">
              <p className="text-[9px] font-bold uppercase tracking-wider text-gray-700 mb-1">First Impression</p>
              <p className="text-xs text-gray-700 leading-relaxed italic">"{d.recruiter_3s.first_impression}"</p>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-3 py-2 bg-amber-50/60 border border-amber-200 rounded-xl">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <p className="text-xs text-amber-800">Analysis metrics incomplete. Verify backend configuration streams.</p>
            </div>
          )}

          {/* What works */}
          {(d.recruiter_3s?.what_works ?? []).length > 0 && (
            <div className="space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Structural Assets</p>
              <Expandable
                items={d.recruiter_3s.what_works}
                initialShow={3}
                renderItem={(w, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-600 list-none">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" /><span>{w}</span>
                  </li>
                )}
              />
            </div>
          )}

          {/* What hurts */}
          {(d.recruiter_3s?.what_hurts ?? []).length > 0 && (
            <div className="space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-rose-500">Risk Liabilities</p>
              <Expandable
                items={d.recruiter_3s.what_hurts}
                initialShow={3}
                renderItem={(w, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-600 list-none">
                    <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" /><span>{w}</span>
                  </li>
                )}
              />
            </div>
          )}

          {d.recruiter_3s?.insight && (
            <div className="pt-3 border-t border-gray-100">
              <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400 mb-1">Strategic Overview</p>
              <p className="text-xs text-gray-500 leading-relaxed">{d.recruiter_3s.insight}</p>
            </div>
          )}
        </div>

        {/* Red Flags */}
        <div className="bg-white rounded-2xl border border-grey-100 p-6 shadow-xs space-y-4">
          <div className="border-b border-gray-100 pb-4 flex items-center justify-between">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-gray-400" /> Operational Red Flags
            </h3>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
              d.red_flags?.severity === "None" ? "bg-emerald-50 border-emerald-200 text-emerald-700" :
              d.red_flags?.severity === "Low"  ? "bg-amber-50 border-amber-200 text-amber-700" :
              "bg-rose-50 border-rose-200 text-rose-700"
            }`}>{d.red_flags?.severity ?? "None"} · {d.red_flags?.count ?? 0} total</span>
          </div>

          {(d.red_flags?.flags ?? []).length > 0 ? (
            <Expandable
              items={d.red_flags.flags}
              initialShow={2}
              renderItem={(f, i) => (
                <div key={i} className={`px-3 py-2.5 rounded-xl border text-xs mb-2 last:mb-0 ${
                  f.severity === "High"   ? "bg-rose-50/40 border-rose-200/60" :
                  f.severity === "Medium" ? "bg-amber-50/40 border-amber-200/60" :
                  "bg-gray-50 border-gray-200"
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-gray-800">{f.flag}</span>
                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded ${
                      f.severity === "High"   ? "bg-rose-100 text-rose-700" :
                      f.severity === "Medium" ? "bg-amber-100 text-amber-700" :
                      "bg-gray-100 text-gray-600"
                    }`}>{f.severity}</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-[11px]">{f.detail}</p>
                  {f.fix && (
                    <p className="text-[10px] text-gray-500 font-medium mt-1.5 pt-1.5 border-t border-gray-200/60">
                      <span className="text-rose-400 font-bold uppercase tracking-wider mr-1">Correction:</span>{f.fix}
                    </p>
                  )}
                </div>
              )}
            />
          ) : (
            <div className="flex items-center gap-2 px-3 py-2.5 bg-emerald-50/40 border border-emerald-500/10 rounded-xl">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <p className="text-xs text-emerald-700 font-medium">No critical exceptions identified.</p>
            </div>
          )}

          {d.red_flags?.insight && (
            <div className="pt-3 border-t border-gray-100">
              <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400 mb-1">Exception Insight</p>
              <p className="text-xs text-gray-500 leading-relaxed">{d.red_flags.insight}</p>
            </div>
          )}
        </div>

        {/* Contradictions */}
        <div className="bg-white rounded-2xl border border-grey-100 p-6 shadow-xs space-y-4">
          <div className="border-b border-gray-100 pb-4 flex items-center justify-between">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-gray-400" /> Data Contradictions
            </h3>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
              d.contradictions?.count === 0 ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-amber-50 border-amber-200 text-amber-700"
            }`}>{d.contradictions?.count ?? 0} detected</span>
          </div>

          {(d.contradictions?.items ?? []).length > 0 ? (
            <Expandable
              items={d.contradictions.items}
              initialShow={2}
              renderItem={(c, i) => (
                <div key={i} className="px-3 py-2.5 bg-gray-50/60 border border-gray-200 rounded-xl mb-2 last:mb-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[9px] font-bold tracking-wide uppercase text-rose-500">Conflict</p>
                    <span className="text-[9px] font-mono text-gray-600 bg-gray-50 border border-gray-400 px-1.5 py-0.2">integrity</span>
                  </div>
                  <p className="text-xs text-gray-700 mb-1.5">{c.detail}</p>
                  <p className="text-[9px] font-bold tracking-wide uppercase text-emerald-600 mb-0.5">Resolution</p>
                  <p className="text-xs text-gray-600">{c.fix ?? "—"}</p>
                </div>
              )}
            />
          ) : (
            <div className="flex items-center gap-2 px-3 py-2.5 bg-emerald-50/40 border border-emerald-500/10 rounded-xl">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <p className="text-xs text-emerald-700 font-medium">Logical integrity verified.</p>
            </div>
          )}
        </div>

        {/* Market Trend */}
        <div className="bg-white rounded-2xl border border-grey-100 p-6 shadow-xs space-y-4">
          <div className="border-b border-gray-100 pb-4 flex items-center justify-between">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-gray-400" /> Velocity & Market Trends
            </h3>
            <span className="text-xs font-bold font-mono bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-md">
              {d.market_trend?.score ?? "—"}/100
            </span>
          </div>

          {(d.market_trend?.modern_tech ?? []).length > 0 && (
            <div className="space-y-1.5">
              <p className="text-[9px] font-bold uppercase tracking-wider text-emerald-600">High Modernity Vectors</p>
              <div className="flex flex-wrap gap-1">
                {d.market_trend.modern_tech.map((t, i) => (
                  <span key={i} className="px-2 py-0.5 bg-emerald-50 border border-emerald-500/10 text-emerald-700 text-[10px] font-medium rounded-md">{t}</span>
                ))}
              </div>
            </div>
          )}

          {(d.market_trend?.dated_tech ?? []).length > 0 && (
            <div className="space-y-1.5">
              <p className="text-[9px] font-bold uppercase tracking-wider text-amber-600">Legacy Tech Anchors</p>
              <div className="flex flex-wrap gap-1">
                {d.market_trend.dated_tech.map((t, i) => (
                  <span key={i} className="px-2 py-0.5 bg-amber-50/60 border border-amber-200 text-amber-700 text-[10px] font-medium rounded-md">{t}</span>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>

    {/* OVERALL VERDICT + GRAMMAR BLOCK */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* Overall Verdict */}
      <div className="bg-gray-900 text-gray-100 p-6 rounded-2xl border border-gray-800 space-y-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Structural Core Index</span>
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-md border ${
              d.overall_verdict?.hire_likelihood === "Strong Yes" || d.overall_verdict?.hire_likelihood === "Leaning Yes" 
                ? "bg-emerald-950 border-emerald-500/30 text-emerald-400" 
                : d.overall_verdict?.hire_likelihood === "Maybe" 
                  ? "bg-amber-950 border-amber-500/30 text-amber-400" 
                  : "bg-rose-950 border-rose-500/30 text-rose-400"
            }`}>{d.overall_verdict?.hire_likelihood ?? "—"}</span>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed font-medium">{d.overall_verdict?.summary}</p>
          {d.overall_verdict?.hire_reasoning && (
            <p className="text-xs text-gray-400 leading-relaxed border-t border-gray-800 pt-3 mt-3">{d.overall_verdict.hire_reasoning}</p>
          )}
        </div>
        
        {d.overall_verdict?.single_best_action && (
          <div className="bg-gray-950/60 border border-gray-800 rounded-xl px-3.5 py-3 mt-4">
            <p className="text-[9px] font-bold uppercase tracking-wider text-emerald-500 mb-0.5">Primary Priority Action</p>
            <p className="text-xs font-medium text-gray-200">{d.overall_verdict.single_best_action}</p>
          </div>
        )}
      </div>

      {/* Grammar & Spelling */}
      <div className="bg-white rounded-2xl border border-grey-100 p-6 shadow-xs space-y-4">
        <div className="border-b border-gray-100 pb-4 flex items-center justify-between">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-gray-400" /> Syntax & Structural Grammar
          </h3>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
            (d.grammar?.errors_found ?? 0) === 0 ? "bg-emerald-50 border-emerald-200 text-emerald-700" :
            (d.grammar?.errors_found ?? 0) <= 2   ? "bg-amber-50 border-amber-200 text-amber-700" :
                                                    "bg-rose-50 border-rose-200 text-rose-700"
          }`}>{d.grammar?.score ?? "—"}/100 · {d.grammar?.errors_found ?? 0} issues</span>
        </div>

        {(d.grammar?.examples ?? []).length > 0 ? (
          <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
            {d.grammar.examples.map((ex, i) => (
              <div key={i} className="px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[9px] font-bold uppercase text-rose-500">As Written</p>
                  {ex.type && <span className="text-[9px] font-mono text-gray-400 bg-gray-100 px-1.5 py-0.2 rounded">{ex.type}</span>}
                </div>
                <p className="text-xs text-gray-700 mb-2 font-medium">"{ex.original}"</p>
                <p className="text-[9px] font-bold uppercase text-emerald-600 mb-0.5">Proposed Correction</p>
                <p className="text-xs text-gray-800 font-semibold bg-white border border-gray-200/60 rounded px-1.5 py-0.5 inline-block">"{ex.fix}"</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-2 px-3 py-2.5 bg-emerald-50/40 border border-emerald-500/10 rounded-xl">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <p className="text-xs text-emerald-700 font-medium">Syntactical review passed without exceptions.</p>
          </div>
        )}
      </div>

    </div>

  </div>
)}

    </div>
  </div>
);
}