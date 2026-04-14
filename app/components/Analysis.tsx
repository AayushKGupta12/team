"use client";

import { useState, useRef, useEffect } from "react";
import {
  CheckCircle, XCircle, Loader2, Upload, FileText,
  Award, Target, Sparkles, AlertCircle, Brain, Zap, CheckCheck,
  Shield, Users, Briefcase, Code, Star, Github, Linkedin, Globe,
  Trophy, Download, Cpu, GraduationCap, TrendingUp,
  AlertTriangle, ExternalLink, Lock, ArrowUpRight, Hash,
  AlignLeft, MessageSquare, CheckSquare, RefreshCw, LayoutGrid,
  Phone, Activity, FileCheck, BookOpen,
} from "lucide-react";
import { useAuth, useClerk } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Cell,
} from "recharts";
import { consumeCredit } from "../../lib/consumeCredit";
import CreditUsedToast from "./CreditUsedToast";
import {
  generateOverallInsight, generateRoadmapSummary,
  generateQuantificationInsight, generateAchievementInsight,
  generateSummaryInsight, generateContactInsight,
  generateSectionOrderInsight, generateFormattingInsight,
  generateSkillsInsight, generateClicheInsight,
  generatePronounInsight, generateConsistencyInsight,
  generateSkillRecencyInsight, generateCPInsight,
  generateCertInsight, generateEduInsight, generateDigitalInsight,
} from "./Resumeinsights";

/* ─────────────── TYPES ────────────────────────────────────── */
interface LockedField { locked: true; unlock_message: string; }
interface ImprovementItem { priority: "High"|"Medium"|"Low"; category: string; action: string; impact: string; }

interface AnalyzeData {
  resume_score: { score: number; grade: string; breakdown: { experience_contribution: number; project_contribution: number; certifications_contribution: number; digital_presence_contribution: number; education_contribution: number; }; };
  ats_compatibility: { score: number; rating: string; issues: string[] };
  technical_skills_compatibility: { overall_score: number; target_domain: string; total_skills_identified: number; skills_by_category: Record<string,string[]>; category_breakdown: Record<string,{found:number;required:number;priority:string;skills:string[]}>; };
  experience_analysis: { score: number; project_quality_score: number; has_professional_experience: boolean; experience_level: string; };
  certifications: { found: string[]; count: number; score_contribution: number };
  digital_presence: { github_url?: string; linkedin_url?: string; portfolio_url?: string; has_github: boolean; has_linkedin: boolean; has_portfolio: boolean; score_contribution: number; };
  bullet_quality: { total_bullets: number; strong_count: number; weak_count: number; quality_score: number; overall_quality: string; weak_bullets: Array<{original:string;issues:string[];hint:string}>|LockedField; };
  education_profile: { institution_tier: string; branch: string; cgpa_normalised: number|null; graduation_year: number|null; score_contribution: number; };
  competitive_programming: { platform_count: number; score_contribution: number; platforms: Record<string,{rating:number|null;rank_title:string|null;problem_count:number|null}>|LockedField; };
  recommended_job_profiles: Array<{ job_title: string; match_score: number; reason: string; gaps: string[]|LockedField; }>;
  candidate_level: { level: string; percentile: number; description: string };
  visualization_data: { score_breakdown: { categories: string[]; scores: number[] }; competitive_positioning: { levels: Array<{name:string;percentile:number}>; current_level: string; current_percentile: number; }; summary_stats: { average_score: number; top_skill_gap: string }; };
  cliches?: { cliches_found: Array<{phrase:string;context:string}>; count: number; penalty: number; verdict: string }|LockedField;
  quantification?: { quantified: number; total_bullets: number; ratio_percent: number; verdict: string };
  resume_length?: { word_count: number; estimated_pages: number; length_verdict: string; missing_sections: string[] };
  consistency?: { issues: Array<{type:string;detail:string}>; issue_count: number; verdict: string }|LockedField;
  personal_pronouns?: { hits: Array<{line:string;pronouns:string[]}>; count: number; verdict: string }|LockedField;
  achievement_ratio?: { achievement_count: number; responsibility_count: number; achievement_ratio: number; verdict: string }|LockedField;
  summary_quality?: { present: boolean; score: number; verdict: string; feedback: string[]; word_count?: number };
  employment_gaps?: { gaps_detected: Array<{from_year:number;to_year:number;gap_years:number}>; verdict: string };
  skill_recency?: { modern_tech_found: string[]; dated_tech_found: string[]; recency_score: number; verdict: string }|LockedField;
  section_order?: { detected_order: string[]; recommended_layout: string; ideal_order: string[]; missing_sections: string[]; verdict: string };
  formatting?: { flags: string[]; flag_count: number; ats_risk: string; verdict: string };
  contact_completeness?: { fields: Record<string,boolean>; missing: string[]; score: number; verdict: string };
  jd_match?: { match_percent: number|null; high_priority_missing: string[]; verdict: string }|LockedField;
  improvement_roadmap?: ImprovementItem[]|LockedField;
}

function isLocked(val: unknown): val is LockedField {
  return typeof val === "object" && val !== null && "locked" in val;
}

/* ─────────────── PDF REPORT ───────────────────────────────── */
function generatePDFReport(data: AnalyzeData, fileName: string) {
  const d = data;
  const jobs = d.recommended_job_profiles;
  const certs = d.certifications?.found;
  const dp = d.digital_presence;
  const edu = d.education_profile;
  const cp = d.competitive_programming;
  const bq = d.bullet_quality;
  const roadmap = !isLocked(d.improvement_roadmap) ? (d.improvement_roadmap ?? []) : [];
  const cpPlatforms = !isLocked(cp.platforms) ? Object.entries(cp.platforms ?? {}).map(([p,v]) => `${p.charAt(0).toUpperCase()+p.slice(1)}${v.rating?` — ${v.rating}`:""}${v.rank_title?` (${v.rank_title})`:""}${v.problem_count?` · ${v.problem_count} problems`:""}`).join(", ") : "Unlock with Pro";
  const overallText  = generateOverallInsight(d);
  const roadmapText  = generateRoadmapSummary(d);

  const html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Resume Analysis Report</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Times New Roman',serif;color:#111;background:#fff;font-size:11.5pt;line-height:1.65;padding:2.5cm 2.8cm}
h1{font-size:20pt;font-weight:bold;letter-spacing:.02em;margin-bottom:2px}h2{font-size:12pt;font-weight:bold;margin:20px 0 7px;border-bottom:1.5px solid #111;padding-bottom:3px;text-transform:uppercase}
.sub{font-size:9.5pt;color:#555;margin-bottom:22px}.rule{border:none;border-top:2px solid #111;margin:8px 0 18px}
.score-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:8px}.score-box{border:1px solid #bbb;padding:10px 12px;text-align:center}
.score-num{font-size:18pt;font-weight:bold}.score-lbl{font-size:8pt;color:#666;margin-top:2px}
.two-col{display:grid;grid-template-columns:1fr 1fr;gap:22px}.row{display:flex;justify-content:space-between;padding:3.5px 0;border-bottom:.5px solid #e8e8e8;font-size:10pt}
.row:last-child{border-bottom:none}.lbl{color:#555}.val{font-weight:bold}
.insight{background:#f9f9f9;border-left:3px solid #888;padding:8px 12px;margin:8px 0;font-size:10pt;line-height:1.6}
.job-block{border:1px solid #ccc;padding:11px 14px;margin-bottom:9px;page-break-inside:avoid}.job-title{font-size:11.5pt;font-weight:bold}
.job-match{display:inline-block;border:1.5px solid #111;padding:1px 8px;font-size:9pt;font-weight:bold;float:right}
.gap-tag{display:inline-block;border:.5px solid #999;padding:1px 7px;font-size:8.5pt;margin:2px 2px 0 0;color:#444}
.bullet-block{border-left:2px solid #ccc;padding:5px 10px;margin-bottom:7px;font-size:10pt}
.bullet-hint{font-size:8.5pt;color:#555;font-style:italic;margin-top:2px}.cert-pill{display:inline-block;border:.5px solid #aaa;padding:1px 7px;font-size:8.5pt;margin:2px 2px 0 0}
.bar-wrap{margin:3px 0 7px}.bar-label{display:flex;justify-content:space-between;font-size:9pt;margin-bottom:2px}
.bar-track{height:7px;background:#eee;border:.5px solid #ddd}.bar-fill{height:100%;background:#444}
.footer{margin-top:32px;border-top:1px solid #ccc;padding-top:8px;font-size:8pt;color:#888;text-align:center}
@media print{body{padding:1.4cm 1.8cm}}</style></head><body>
<h1>Resume Analysis Report</h1>
<p class="sub">Generated ${new Date().toLocaleDateString("en-IN",{year:"numeric",month:"long",day:"numeric"})} · ${fileName}</p>
<hr class="rule"/>
<h2>Overall Assessment</h2>
<div class="insight">${overallText}</div>
<h2>Score Summary</h2>
<div class="score-grid">
  <div class="score-box"><div class="score-num">${d.resume_score?.score??'—'}</div><div class="score-lbl">Grade ${d.resume_score?.grade??'—'} · Resume</div></div>
  <div class="score-box"><div class="score-num">${d.ats_compatibility?.score??'—'}</div><div class="score-lbl">${d.ats_compatibility?.rating??'—'} · ATS</div></div>
  <div class="score-box"><div class="score-num">${d.technical_skills_compatibility?.overall_score??'—'}</div><div class="score-lbl">Technical Match</div></div>
  <div class="score-box"><div class="score-num">${d.candidate_level?.percentile??'—'}%</div><div class="score-lbl">${d.candidate_level?.level??'—'}</div></div>
</div>
<h2>Improvement Roadmap</h2>
<div class="insight">${roadmapText}</div>
${roadmap.length>0?roadmap.map(r=>`<p style="margin:4px 0;font-size:10pt"><strong>[${r.priority}] ${r.category}:</strong> ${r.action} <em>(${r.impact})</em></p>`).join(""):''}
<h2>Score Breakdown</h2>
${(d.visualization_data?.score_breakdown?.categories??[]).map((cat,i)=>`<div class="bar-wrap"><div class="bar-label"><span>${cat}</span><span>${d.visualization_data.score_breakdown.scores[i]}%</span></div><div class="bar-track"><div class="bar-fill" style="width:${d.visualization_data.score_breakdown.scores[i]}%"></div></div></div>`).join("")}
<h2>Education Profile</h2>
<div class="two-col">
<div><div class="row"><span class="lbl">Institution Tier</span><span class="val">${edu.institution_tier??'—'}</span></div>
<div class="row"><span class="lbl">Branch</span><span class="val">${edu.branch??'—'}</span></div>
<div class="row"><span class="lbl">CGPA (/10)</span><span class="val">${edu.cgpa_normalised??'—'}</span></div>
<div class="row"><span class="lbl">Graduation Year</span><span class="val">${edu.graduation_year??'—'}</span></div></div>
<div><div class="row"><span class="lbl">GitHub</span><span class="val">${dp.github_url??'Not found'}</span></div>
<div class="row"><span class="lbl">LinkedIn</span><span class="val">${dp.linkedin_url??'Not found'}</span></div>
<div class="row"><span class="lbl">Contact Score</span><span class="val">${d.contact_completeness?.score??'—'}%</span></div></div></div>
<div class="insight">${generateEduInsight(d)}</div>
<h2>Certifications</h2>
${certs.length>0?`<p>${certs.map(c=>`<span class="cert-pill">${c}</span>`).join("")}</p>`:`<p style="font-size:10pt;color:#777">No certifications detected.</p>`}
<div class="insight">${generateCertInsight(d)}</div>
<h2>Competitive Programming</h2>
<div class="row"><span class="lbl">Platforms</span><span class="val">${cp.platform_count??0}</span></div>
<div class="row"><span class="lbl">Details</span><span class="val">${cpPlatforms}</span></div>
<div class="insight">${generateCPInsight(d)}</div>
<h2>Bullet Quality</h2>
<div class="two-col">
<div><div class="row"><span class="lbl">Total bullets</span><span class="val">${bq.total_bullets??'—'}</span></div>
<div class="row"><span class="lbl">Strong</span><span class="val">${bq.strong_count??'—'}</span></div></div>
<div><div class="row"><span class="lbl">Weak</span><span class="val">${bq.weak_count??'—'}</span></div>
<div class="row"><span class="lbl">Quality Score</span><span class="val">${bq.quality_score??'—'}%</span></div></div></div>
${!isLocked(bq.weak_bullets)&&Array.isArray(bq.weak_bullets)&&bq.weak_bullets.length>0?`<p style="font-weight:bold;margin:10px 0 5px">Bullets to improve:</p>${bq.weak_bullets.map(b=>`<div class="bullet-block"><div>${b.original}</div><div class="bullet-hint">${b.hint}</div></div>`).join("")}`:`<p style="font-size:9.5pt;color:#888;font-style:italic">Detailed rewrites available in Pro.</p>`}
<h2>Writing Quality Insights</h2>
<div class="insight">${generateQuantificationInsight(d).text}</div>
<div class="insight">${generateAchievementInsight(d).text}</div>
<div class="insight">${generateClicheInsight(d)}</div>
<h2>Technical Skills</h2>
<div class="insight">${generateSkillsInsight(d)}</div>
<h2>Job Recommendations</h2>
${jobs.map(job=>`<div class="job-block"><span class="job-title">${job.job_title}</span><span class="job-match">${job.match_score}%</span><p style="font-size:9.5pt;margin-top:5px;color:#444">${job.reason}</p>${!isLocked(job.gaps)&&Array.isArray(job.gaps)&&job.gaps.length>0?`<div style="margin-top:6px">${job.gaps.map(g=>`<span class="gap-tag">${g}</span>`).join("")}</div>`:``}</div>`).join("")}
<div class="footer">AI Resume Analyser · For reference only. Scores are indicative and based on automated analysis.</div>
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
        <h3 className="text-lg font-bold text-slate-800">{title}</h3>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

function StatRow({ label, value, accent = false }: { label: string; value: string|number; accent?: boolean }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0 text-sm">
      <span className="text-slate-500">{label}</span>
      <span className={`font-semibold ${accent ? "text-violet-600" : "text-slate-800"}`}>{value}</span>
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
    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
      <div className={`h-full bg-gradient-to-r ${colorMap[color]??colorMap.violet} rounded-full transition-all duration-700`} style={{ width:`${Math.min(score,100)}%` }} />
    </div>
  );
}

function LockedBadge({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 border border-dashed border-slate-300 rounded-xl text-slate-500 text-xs">
      <Lock className="w-3.5 h-3.5 shrink-0" />{message}
    </div>
  );
}

function SignalBadge({ label, variant }: { label: string; variant: "good"|"warn"|"bad"|"neutral" }) {
  const map = { good:"bg-emerald-50 text-emerald-700 border-emerald-200", warn:"bg-amber-50 text-amber-700 border-amber-200", bad:"bg-rose-50 text-rose-700 border-rose-200", neutral:"bg-slate-100 text-slate-600 border-slate-200" };
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${map[variant]}`}>{label}</span>;
}

/** Readable insight paragraph box */
function InsightBox({ text, className = "" }: { text: string; className?: string }) {
  if (!text) return null;
  return (
    <div className={`mt-4 p-4 bg-gradient-to-br from-slate-50 to-blue-50/30 border border-slate-200/70 rounded-xl ${className}`}>
      <p className="text-sm text-slate-600 leading-relaxed">{text}</p>
    </div>
  );
}

/** Inline stat + large number */
function BigStat({ value, label, color = "text-slate-900" }: { value: string|number; label: string; color?: string }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className={`text-4xl font-bold ${color}`}>{value}</span>
      <span className="text-sm text-slate-400">{label}</span>
    </div>
  );
}

const scoreColor = (s: number) => s >= 75 ? "emerald" : s >= 55 ? "amber" : "rose";
const ratioVariant = (r: number): "good"|"warn"|"bad" => r >= 60 ? "good" : r >= 35 ? "warn" : "bad";

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
  const [activeTab, setActiveTab] = useState<"overview"|"writing"|"skills"|"roadmap">("overview");
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
        body: JSON.stringify({ resume_text: resumeText, is_premium: false }),
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
    { category: "Resume",     value: d.resume_score?.score ?? 0,                           fullMark: 100 },
    { category: "ATS",        value: d.ats_compatibility?.score ?? 0,                      fullMark: 100 },
    { category: "Experience", value: d.experience_analysis?.score ?? 0,                    fullMark: 100 },
    { category: "Technical",  value: d.technical_skills_compatibility?.overall_score ?? 0, fullMark: 100 },
    { category: "Bullets",    value: d.bullet_quality?.quality_score ?? 0,                 fullMark: 100 },
  ] : [];
  const positionData = d?.visualization_data?.competitive_positioning?.levels?.map(l => ({ name: l.name, value: l.percentile })) ?? [];
  const PASTEL = ["#A7C7E7","#B4E7CE","#FFD4A3","#E7B4D7","#C5A7E7"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/40 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-7">

        {/* ══════ UPLOAD SECTION ══════ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-slate-200/60 p-8">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 bg-gradient-to-br from-violet-100 to-purple-100 rounded-xl"><Upload className="w-6 h-6 text-violet-600" /></div>
                <h2 className="text-2xl font-bold text-slate-800">Upload Resume</h2>
              </div>
              <p className="text-slate-500 text-sm">Get advanced insights across 14 modules in seconds</p>
            </div>
            <div
              className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${file ? "border-emerald-300 bg-gradient-to-br from-emerald-50 to-teal-50" : "border-violet-200 bg-gradient-to-br from-violet-50/50 to-purple-50/50 hover:border-violet-400"}`}
              onDragOver={e => e.preventDefault()} onDrop={handleDrop} onClick={() => fileInputRef.current?.click()}
            >
              <div className="space-y-4">
                <div className={`mx-auto w-20 h-20 rounded-2xl flex items-center justify-center ${file ? "bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-600" : "bg-gradient-to-br from-violet-100 to-purple-100 text-violet-600"}`}>
                  {file ? <CheckCheck className="w-10 h-10" /> : <Upload className="w-10 h-10" />}
                </div>
                <div>
                  <p className="text-slate-800 font-semibold text-lg mb-1">{file ? "File Ready" : "Drop your resume here"}</p>
                  <p className="text-sm text-slate-500">or click to browse · PDF only</p>
                </div>
              </div>
              <input ref={fileInputRef} type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
            </div>
            {error && (
              <div className="mt-4 bg-red-50/80 border border-red-200 text-red-700 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" /><p className="text-sm">{error}</p>
              </div>
            )}
            {file && (
              <div className="mt-4 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/60 rounded-xl p-4 flex items-center gap-3">
                <div className="p-2.5 bg-emerald-100 rounded-lg"><FileText className="w-5 h-5 text-emerald-600" /></div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 truncate">{file.name}</p>
                  <p className="text-sm text-slate-600 mt-0.5">{(file.size/1024).toFixed(2)} KB</p>
                </div>
              </div>
            )}
            <button onClick={handleAnalyzeClick} disabled={testing||!file}
              className={`mt-6 w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition-all duration-300 ${testing||!file ? "bg-slate-200 text-slate-400 cursor-not-allowed" : "bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"}`}>
              {testing ? <><Loader2 className="w-5 h-5 animate-spin" />Analysing Resume…</> : <><Sparkles className="w-5 h-5" />Analyse with AI</>}
            </button>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-slate-200/60 p-8">
            <div className="mb-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl"><Sparkles className="w-6 h-6 text-blue-600" /></div>
                <h2 className="text-2xl font-bold text-slate-800">What You'll Get</h2>
              </div>
              <p className="text-slate-500 text-sm">14 AI-powered analysis modules with readable insights</p>
            </div>
            <div className="space-y-2.5">
              {[
                { icon:<Shield className="w-5 h-5"/>, title:"ATS Compatibility + Formatting Risk", desc:"Detailed explanation of every formatting issue that could cause automated rejection", c:"from-emerald-100 to-teal-100", ic:"text-emerald-600" },
                { icon:<Zap className="w-5 h-5"/>,    title:"Bullet Quality + Rewrite Hints",     desc:"Each weak bullet shown with exact issues and how to fix it",                     c:"from-rose-100 to-pink-100",    ic:"text-rose-600" },
                { icon:<Hash className="w-5 h-5"/>,   title:"Quantification Ratio Analysis",      desc:"Tells you exactly how many bullets lack numbers and why it matters",             c:"from-blue-100 to-indigo-100",  ic:"text-blue-600" },
                { icon:<TrendingUp className="w-5 h-5"/>, title:"Achievement vs Duty Ratio",      desc:"Counts how many bullets show results vs just listing tasks",                    c:"from-amber-100 to-orange-100", ic:"text-amber-600" },
                { icon:<MessageSquare className="w-5 h-5"/>, title:"Cliché & Pronoun Detector",   desc:"Finds every 'hardworking', 'team player', 'I developed' in your resume",        c:"from-violet-100 to-purple-100",ic:"text-violet-600" },
                { icon:<Activity className="w-5 h-5"/>, title:"Full Improvement Roadmap",         desc:"Prioritised action list with score impact estimates — High / Medium / Low",      c:"from-pink-100 to-rose-100",    ic:"text-pink-600" },
                { icon:<Cpu className="w-5 h-5"/>,    title:"CP Platform Ratings + Problem Count", desc:"LeetCode/Codeforces ratings, rank titles, and problem count extracted",          c:"from-amber-100 to-yellow-100", ic:"text-amber-600" },
                { icon:<BookOpen className="w-5 h-5"/>, title:"Readable Paragraph Insights",       desc:"Every section explains what the data means in plain English — not just numbers", c:"from-teal-100 to-cyan-100",   ic:"text-teal-600" },
              ].map((f,i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/50 border border-slate-100 hover:shadow-sm transition-all">
                  <div className={`p-2.5 bg-gradient-to-br ${f.c} rounded-xl ${f.ic} shrink-0`}>{f.icon}</div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{f.title}</p>
                    <p className="text-xs text-slate-500 leading-relaxed mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════ LOADING ══════ */}
        {showPlaceholder && (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-slate-200/60 p-16 text-center space-y-6">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-violet-100 to-purple-100 rounded-3xl">
              <Loader2 className="w-12 h-12 text-violet-600 animate-spin" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-slate-900 mb-3">Analysing Your Resume</h3>
              <p className="text-slate-600 text-lg">Running 14 analysis modules and generating insights…</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              {[0,1,2].map(i => <div key={i} className="w-3 h-3 bg-violet-400 rounded-full animate-pulse" style={{animationDelay:`${i*0.2}s`}} />)}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════
            DASHBOARD
        ══════════════════════════════════════════════════════ */}
        {!showPlaceholder && analyzeResult?.success && d && (() => {
          // Pre-compute all insights once
          const overallText     = generateOverallInsight(d);
          const roadmapText     = generateRoadmapSummary(d);
          const quantInfo       = generateQuantificationInsight(d);
          const achieveInfo     = generateAchievementInsight(d);
          const summaryInfo     = generateSummaryInsight(d);
          const contactText     = generateContactInsight(d);
          const sectionText     = generateSectionOrderInsight(d);
          const formattingText  = generateFormattingInsight(d);
          const skillsText      = generateSkillsInsight(d);
          const clicheText      = generateClicheInsight(d);
          const pronounText     = generatePronounInsight(d);
          const consistencyText = generateConsistencyInsight(d);
          const recencyText     = generateSkillRecencyInsight(d);
          const cpText          = generateCPInsight(d);
          const certText        = generateCertInsight(d);
          const eduText         = generateEduInsight(d);
          const digitalText     = generateDigitalInsight(d);

          return (
            <div className="space-y-6">

              {/* Result header */}
              <div className="bg-gradient-to-br from-violet-500/90 via-purple-500/90 to-indigo-500/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 text-white">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl"><CheckCircle className="w-10 h-10" /></div>
                    <div>
                      <h2 className="text-3xl font-bold mb-1">Analysis Complete</h2>
                      <p className="text-violet-100 text-sm">{file?.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                      <p className="text-xs text-violet-200">Candidate level</p>
                      <p className="text-xl font-bold">{d.candidate_level?.level} · {d.candidate_level?.percentile}th percentile</p>
                    </div>
                    <button onClick={() => generatePDFReport(d, file?.name ?? "resume.pdf")}
                      className="flex items-center gap-2 px-5 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-xl font-semibold text-sm transition-all">
                      <Download className="w-4 h-4" />Download Report
                    </button>
                  </div>
                </div>
                {/* Overall insight in header */}
                <div className="mt-5 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                  <p className="text-sm text-white/90 leading-relaxed">{overallText}</p>
                </div>
              </div>

              {/* Score row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon:<Award className="w-5 h-5"/>,    label:"Resume Score",    value:d.resume_score?.score,                                sub:`Grade ${d.resume_score?.grade}`,                              c:"from-blue-100 to-indigo-100",   ic:"text-blue-600",   bar:"blue" },
                  { icon:<Shield className="w-5 h-5"/>,   label:"ATS Score",       value:d.ats_compatibility?.score,                           sub:d.ats_compatibility?.rating,                                   c:"from-emerald-100 to-teal-100",  ic:"text-emerald-600",bar:"emerald" },
                  { icon:<Code className="w-5 h-5"/>,     label:"Technical Match", value:d.technical_skills_compatibility?.overall_score,      sub:d.technical_skills_compatibility?.target_domain?.split(" ")[0], c:"from-violet-100 to-purple-100", ic:"text-violet-600", bar:"violet" },
                  { icon:<Briefcase className="w-5 h-5"/>,label:"Experience",      value:d.experience_analysis?.score,                         sub:d.experience_analysis?.experience_level,                       c:"from-amber-100 to-orange-100",  ic:"text-amber-600",  bar:"amber" },
                ].map((s,i) => (
                  <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-md p-5">
                    <div className={`p-2.5 bg-gradient-to-br ${s.c} rounded-xl w-fit mb-3`}><div className={s.ic}>{s.icon}</div></div>
                    <p className="text-3xl font-bold text-slate-900 mb-0.5">{s.value ?? "—"}</p>
                    <p className="text-xs text-slate-500 mb-1">{s.sub}</p>
                    <p className="text-sm font-semibold text-slate-700 mb-3">{s.label}</p>
                    <ScorePill score={s.value ?? 0} color={s.bar} />
                  </div>
                ))}
              </div>

              {/* Tab bar */}
              <div className="flex gap-1 p-1 bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-2xl w-fit shadow-sm">
                {(["overview","writing","skills","roadmap"] as const).map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all capitalize ${activeTab === tab ? "bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-md" : "text-slate-500 hover:text-slate-800 hover:bg-white/60"}`}>
                    {tab}
                  </button>
                ))}
              </div>

              {/* ══════════════ TAB: OVERVIEW ══════════════ */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Radar + positioning */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-slate-200/60 p-6">
                      <SectionHeader icon={<Target className="w-5 h-5"/>} title="Overall Performance" colorFrom="from-violet-100" colorTo="to-purple-100" iconColor="text-violet-600" />
                      <ResponsiveContainer width="100%" height={250}>
                        <RadarChart data={radarData}>
                          <PolarGrid stroke="#D1D5DB" />
                          <PolarAngleAxis dataKey="category" tick={{fill:"#334155",fontSize:12}} />
                          <PolarRadiusAxis angle={90} domain={[0,100]} tick={{fill:"#334155",fontSize:10}} />
                          <Radar name="Score" dataKey="value" stroke="#8b5cf6" fill="#a78bfa" fillOpacity={0.4} strokeWidth={2} />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-slate-200/60 p-6">
                      <SectionHeader icon={<Users className="w-5 h-5"/>} title="Competitive Positioning" colorFrom="from-indigo-100" colorTo="to-blue-100" iconColor="text-indigo-600" />
                      <ResponsiveContainer width="100%" height={180}>
                        <BarChart data={positionData} layout="vertical" margin={{left:0,right:20}}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                          <XAxis type="number" domain={[0,100]} tick={{fill:"#64748b",fontSize:11}} />
                          <YAxis type="category" dataKey="name" tick={{fill:"#64748b",fontSize:12}} />
                          <Tooltip contentStyle={{background:"white",border:"1px solid #e2e8f0",borderRadius:10,fontSize:12}} />
                          <Bar dataKey="value" radius={[0,8,8,0]}>
                            {positionData.map((_,i) => <Cell key={i} fill={PASTEL[i%PASTEL.length]} />)}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                      <div className="mt-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-4 border border-indigo-100">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-semibold text-slate-700">Your level</span>
                          <span className="text-sm font-bold text-indigo-600">{d.visualization_data?.competitive_positioning?.current_level} · {d.visualization_data?.competitive_positioning?.current_percentile}th percentile</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">{d.candidate_level?.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Profile quartet */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

                    {/* Education */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-md p-5">
                      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                        <div className="p-2 bg-gradient-to-br from-violet-100 to-purple-100 rounded-lg"><GraduationCap className="w-4 h-4 text-violet-600" /></div>
                        <span className="font-semibold text-slate-800 text-sm">Education Profile</span>
                      </div>
                      <StatRow label="Institution" value={d.education_profile?.institution_tier ?? "—"} accent />
                      <StatRow label="Branch"      value={d.education_profile?.branch ?? "—"} />
                      <StatRow label="CGPA (/10)"  value={d.education_profile?.cgpa_normalised ?? "—"} />
                      <StatRow label="Grad year"   value={d.education_profile?.graduation_year ?? "—"} />
                      <div className="mt-2 flex items-center gap-1 text-xs text-violet-600 font-semibold">
                        <ArrowUpRight className="w-3.5 h-3.5" />+{d.education_profile?.score_contribution ?? 0} pts to score
                      </div>
                      {eduText && <InsightBox text={eduText} />}
                    </div>

                    {/* Competitive Programming */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-md p-5">
                      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                        <div className="p-2 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg"><Cpu className="w-4 h-4 text-amber-600" /></div>
                        <span className="font-semibold text-slate-800 text-sm">Competitive Prog.</span>
                      </div>
                      <StatRow label="Platforms found" value={d.competitive_programming?.platform_count ?? 0} />
                      <StatRow label="Score boost"     value={`+${d.competitive_programming?.score_contribution ?? 0} pts`} accent />
                      <div className="mt-3">
                        {isLocked(d.competitive_programming?.platforms)
                          ? <LockedBadge message={d.competitive_programming.platforms.unlock_message} />
                          : Object.entries(d.competitive_programming?.platforms ?? {}).length > 0
                            ? Object.entries(d.competitive_programming?.platforms ?? {}).map(([platform,data]) => (
                                <div key={platform} className="flex items-center justify-between py-1.5 border-b border-slate-100 last:border-0">
                                  <span className="text-xs capitalize text-slate-600">{platform}</span>
                                  <div className="text-right">
                                    {data.rating && <span className="text-xs font-bold text-amber-600">{data.rating}</span>}
                                    {data.rank_title && <span className="text-xs text-slate-500 block">{data.rank_title}</span>}
                                    {data.problem_count && <span className="text-xs text-slate-400 block">{data.problem_count} solved</span>}
                                  </div>
                                </div>
                              ))
                            : null
                        }
                      </div>
                      {cpText && <InsightBox text={cpText} />}
                    </div>

                    {/* Certifications */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-md p-5">
                      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                        <div className="p-2 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-lg"><Award className="w-4 h-4 text-teal-600" /></div>
                        <span className="font-semibold text-slate-800 text-sm">Certifications</span>
                      </div>
                      <StatRow label="Detected"    value={d.certifications?.count ?? 0} />
                      <StatRow label="Score boost" value={`+${d.certifications?.score_contribution ?? 0} pts`} accent />
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {(d.certifications?.found?.length ?? 0) > 0
                          ? d.certifications.found.slice(0,4).map((cert,i) => (
                              <span key={i} className="px-2 py-1 bg-teal-50 border border-teal-200 text-teal-700 text-xs rounded-lg font-medium">{cert.length > 24 ? cert.slice(0,24)+"…" : cert}</span>
                            ))
                          : null
                        }
                      </div>
                      {certText && <InsightBox text={certText} />}
                    </div>

                    {/* Digital Presence */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-md p-5">
                      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                        <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg"><Globe className="w-4 h-4 text-blue-600" /></div>
                        <span className="font-semibold text-slate-800 text-sm">Digital Presence</span>
                      </div>
                      <StatRow label="Score boost" value={`+${d.digital_presence?.score_contribution ?? 0} pts`} accent />
                      <div className="mt-3 space-y-2.5">
                        {d.digital_presence?.github_url
                          ? <a href={d.digital_presence.github_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-blue-600 hover:underline"><Github className="w-3.5 h-3.5 shrink-0" /><span className="truncate">{d.digital_presence.github_url.replace(/^https?:\/\//,"")}</span></a>
                          : <div className="flex items-center gap-2 text-xs text-rose-500 font-medium"><Github className="w-3.5 h-3.5" />GitHub not found — add it (+7 pts)</div>}
                        {d.digital_presence?.linkedin_url
                          ? <a href={d.digital_presence.linkedin_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-blue-600 hover:underline"><Linkedin className="w-3.5 h-3.5 shrink-0" /><span className="truncate">{d.digital_presence.linkedin_url.replace(/^https?:\/\//,"")}</span></a>
                          : <div className="flex items-center gap-2 text-xs text-rose-500 font-medium"><Linkedin className="w-3.5 h-3.5" />LinkedIn not found — add it (+4 pts)</div>}
                        {d.digital_presence?.portfolio_url && <a href={d.digital_presence.portfolio_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-blue-600 hover:underline"><ExternalLink className="w-3.5 h-3.5 shrink-0" />Portfolio detected</a>}
                      </div>
                      {digitalText && <InsightBox text={digitalText} />}
                    </div>
                  </div>

                  {/* Contact · Section order · Formatting */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                    {/* Contact completeness */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-md p-5">
                      <SectionHeader icon={<Phone className="w-4 h-4"/>} title="Contact Completeness" colorFrom="from-slate-100" colorTo="to-gray-100" iconColor="text-slate-600" />
                      {d.contact_completeness ? (
                        <>
                          <div className="mb-3">
                            <div className="flex justify-between mb-1.5">
                              <span className="text-xs text-slate-500">Completeness</span>
                              <span className="text-xs font-bold text-violet-600">{d.contact_completeness.score}%</span>
                            </div>
                            <ScorePill score={d.contact_completeness.score} color={scoreColor(d.contact_completeness.score)} />
                          </div>
                          <div className="grid grid-cols-2 gap-1.5 mt-2">
                            {Object.entries(d.contact_completeness.fields).map(([field,present]) => (
                              <div key={field} className={`flex items-center gap-1.5 text-xs ${present ? "text-emerald-600" : "text-rose-500"}`}>
                                {present ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                <span className="capitalize">{field}</span>
                              </div>
                            ))}
                          </div>
                        </>
                      ) : null}
                      {/* Always show insight paragraph — derived even without new backend */}
                      <InsightBox text={contactText} />
                    </div>

                    {/* Section order */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-md p-5">
                      <SectionHeader icon={<LayoutGrid className="w-4 h-4"/>} title="Section Order" colorFrom="from-blue-100" colorTo="to-indigo-100" iconColor="text-blue-600" />
                      {d.section_order ? (
                        <>
                          <div className="flex items-center gap-2 mb-3">
                            <SignalBadge label={`${d.section_order.recommended_layout} layout`} variant={d.section_order.recommended_layout === "Fresher" ? "good" : "warn"} />
                          </div>
                          <div className="flex flex-wrap gap-1.5 mb-2">
                            {d.section_order.detected_order.map((s,i) => (
                              <span key={i} className="flex items-center gap-1 px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 font-medium">
                                <span className="text-slate-400 text-[10px]">{i+1}</span>{s}
                              </span>
                            ))}
                          </div>
                          {d.section_order.missing_sections.length > 0 && (
                            <p className="text-xs text-amber-600 font-medium">Missing: {d.section_order.missing_sections.join(", ")}</p>
                          )}
                        </>
                      ) : null}
                      <InsightBox text={sectionText} />
                    </div>

                    {/* Formatting risk */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-md p-5">
                      <SectionHeader icon={<Shield className="w-4 h-4"/>} title="ATS Formatting Risk" colorFrom="from-emerald-100" colorTo="to-teal-100" iconColor="text-emerald-600" />
                      {d.formatting ? (
                        <>
                          <div className="flex items-center gap-2 mb-3">
                            <SignalBadge label={`${d.formatting.ats_risk} risk`} variant={d.formatting.ats_risk === "Low" ? "good" : d.formatting.ats_risk === "Medium" ? "warn" : "bad"} />
                          </div>
                          {d.formatting.flags.length > 0 && (
                            <ul className="space-y-2 mb-3">
                              {d.formatting.flags.map((flag,i) => (
                                <li key={i} className="flex items-start gap-2 text-xs text-rose-700 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2">
                                  <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />{flag}
                                </li>
                              ))}
                            </ul>
                          )}
                        </>
                      ) : null}
                      <InsightBox text={formattingText} />
                    </div>
                  </div>

                  {/* Score breakdown */}
                  {d.visualization_data && (
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-slate-200/60 p-6">
                      <SectionHeader icon={<Target className="w-5 h-5"/>} title="Score Breakdown" subtitle="Contribution of each dimension to your overall profile" colorFrom="from-amber-100" colorTo="to-orange-100" iconColor="text-amber-600" />
                      <div className="space-y-4">
                        {d.visualization_data.score_breakdown.categories.map((cat,i) => (
                          <div key={i} className="space-y-1.5">
                            <div className="flex justify-between text-sm">
                              <span className="font-medium text-slate-700">{cat}</span>
                              <span className="text-amber-600 font-bold">{d.visualization_data.score_breakdown.scores[i]}%</span>
                            </div>
                            <ScorePill score={d.visualization_data.score_breakdown.scores[i]} color="amber" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Job recommendations */}
                  {(d.recommended_job_profiles?.length ?? 0) > 0 && (
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-slate-200/60 p-8">
                      <SectionHeader icon={<Star className="w-6 h-6"/>} title="Recommended Job Profiles" subtitle="Best career fits based on your complete profile analysis" colorFrom="from-emerald-100" colorTo="to-teal-100" iconColor="text-emerald-600" />
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                        {d.recommended_job_profiles.map((job,i) => (
                          <div key={i} className="bg-gradient-to-br from-slate-50/80 to-white/80 border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:border-violet-200 transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-start justify-between mb-3">
                              <h4 className="font-bold text-slate-900 text-base leading-tight pr-2">{job.job_title}</h4>
                              <div className="shrink-0 px-2.5 py-1 bg-gradient-to-r from-emerald-400 to-teal-400 text-white rounded-xl font-bold text-xs shadow">{job.match_score}%</div>
                            </div>
                            <p className="text-xs text-slate-600 mb-4 leading-relaxed">{job.reason}</p>
                            {isLocked(job.gaps)
                              ? <LockedBadge message={job.gaps.unlock_message} />
                              : Array.isArray(job.gaps) && job.gaps.length > 0 && (
                                  <div>
                                    <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">Skills to add:</p>
                                    <div className="flex flex-wrap gap-1.5">
                                      {job.gaps.slice(0,3).map((gap,j) => (
                                        <span key={j} className="px-2 py-1 bg-amber-50 border border-amber-200 text-amber-700 text-xs rounded-lg font-medium">{gap.length > 32 ? gap.slice(0,32)+"…" : gap}</span>
                                      ))}
                                    </div>
                                  </div>
                                )
                            }
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ══════════════ TAB: WRITING ══════════════ */}
              {activeTab === "writing" && (
                <div className="space-y-6">

                  {/* Bullet Quality */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-slate-200/60 p-8">
                    <SectionHeader icon={<Zap className="w-6 h-6"/>} title="Bullet Quality Analysis" subtitle="Every bullet scored: action verb · measurable impact · technology mentioned" colorFrom="from-rose-100" colorTo="to-pink-100" iconColor="text-rose-600" />
                    <div className="grid grid-cols-3 gap-4 mb-5">
                      {[
                        { label:"Total bullets", value:d.bullet_quality?.total_bullets??0, color:"text-slate-700", bg:"from-slate-50 to-slate-50" },
                        { label:"Strong",         value:d.bullet_quality?.strong_count??0,  color:"text-emerald-600",bg:"from-emerald-50 to-teal-50" },
                        { label:"Needs work",     value:d.bullet_quality?.weak_count??0,    color:"text-rose-600",   bg:"from-rose-50 to-pink-50" },
                      ].map((s,i) => (
                        <div key={i} className={`bg-gradient-to-br ${s.bg} rounded-xl p-4 text-center border border-slate-100`}>
                          <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                          <p className="text-xs text-slate-500 mt-1">{s.label}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="font-medium text-slate-700">Quality score</span>
                      <span className={`font-bold ${(d.bullet_quality?.quality_score??0)>=55?"text-emerald-600":"text-rose-600"}`}>{d.bullet_quality?.quality_score??0}% · {d.bullet_quality?.overall_quality}</span>
                    </div>
                    <ScorePill score={d.bullet_quality?.quality_score??0} color={(d.bullet_quality?.quality_score??0)>=55?"emerald":"rose"} />

                    {/* Weak bullets */}
                    <div className="mt-5">
                      {isLocked(d.bullet_quality?.weak_bullets)
                        ? <LockedBadge message={(d.bullet_quality.weak_bullets as LockedField).unlock_message} />
                        : Array.isArray(d.bullet_quality?.weak_bullets) && d.bullet_quality.weak_bullets.length > 0
                          ? <>
                              <p className="text-sm font-semibold text-slate-700 mb-3">Bullets to rewrite:</p>
                              <div className="space-y-3">
                                {d.bullet_quality.weak_bullets.map((b,i) => (
                                  <div key={i} className="border border-rose-100 bg-rose-50/40 rounded-xl p-4">
                                    <p className="text-sm text-slate-800 font-medium mb-2">"{b.original}"</p>
                                    <div className="flex flex-wrap gap-1.5 mb-2">
                                      {b.issues.map((issue,j) => <span key={j} className="px-2 py-0.5 bg-rose-100 text-rose-700 text-xs rounded-full font-medium">{issue}</span>)}
                                    </div>
                                    <p className="text-xs text-slate-600 italic leading-relaxed">{b.hint}</p>
                                  </div>
                                ))}
                              </div>
                            </>
                          : <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium mt-3"><CheckCircle className="w-4 h-4" />All detected bullets look strong!</div>
                      }
                    </div>
                  </div>

                  {/* Quantification + Achievement + Summary */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                    {/* Quantification */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-md p-5">
                      <SectionHeader icon={<Hash className="w-5 h-5"/>} title="Quantification Ratio" subtitle="How many bullets contain real numbers?" colorFrom="from-blue-100" colorTo="to-indigo-100" iconColor="text-blue-600" />
                      <div className="flex items-baseline gap-2 mb-3">
                        <BigStat value={`${quantInfo.ratio}%`} label="of bullets" color={quantInfo.ratio>=60?"text-emerald-600":quantInfo.ratio>=35?"text-amber-600":"text-rose-600"} />
                        <SignalBadge label={quantInfo.ratio>=60?"Excellent":quantInfo.ratio>=40?"Average":"Weak"} variant={ratioVariant(quantInfo.ratio)} />
                      </div>
                      <ScorePill score={quantInfo.ratio} color={quantInfo.ratio>=60?"emerald":quantInfo.ratio>=40?"amber":"rose"} />
                      <p className="text-xs text-slate-400 mt-1">{quantInfo.quantified} of {quantInfo.total} bullets have a metric</p>
                      <InsightBox text={quantInfo.text} />
                      {quantInfo.tip && <p className="mt-2 text-xs text-violet-600 font-medium italic">{quantInfo.tip}</p>}
                    </div>

                    {/* Achievement vs Duty */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-md p-5">
                      <SectionHeader icon={<TrendingUp className="w-5 h-5"/>} title="Achievement vs Duty" subtitle="Are you showing results or listing responsibilities?" colorFrom="from-amber-100" colorTo="to-orange-100" iconColor="text-amber-600" />
                      <div className="flex items-baseline gap-2 mb-3">
                        <BigStat value={`${achieveInfo.ratio}%`} label="achievement" color={achieveInfo.ratio>=70?"text-emerald-600":achieveInfo.ratio>=50?"text-amber-600":"text-rose-600"} />
                        <SignalBadge label={achieveInfo.ratio>=70?"Strong":achieveInfo.ratio>=50?"Average":"Weak"} variant={ratioVariant(achieveInfo.ratio)} />
                      </div>
                      <ScorePill score={achieveInfo.ratio} color={achieveInfo.ratio>=70?"emerald":"amber"} />
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <div className="text-center p-2.5 bg-emerald-50 rounded-xl border border-emerald-100">
                          <p className="text-lg font-bold text-emerald-600">{achieveInfo.achievements}</p>
                          <p className="text-xs text-slate-500 mt-0.5">achievement bullets</p>
                        </div>
                        <div className="text-center p-2.5 bg-rose-50 rounded-xl border border-rose-100">
                          <p className="text-lg font-bold text-rose-500">{achieveInfo.duties}</p>
                          <p className="text-xs text-slate-500 mt-0.5">duty bullets</p>
                        </div>
                      </div>
                      <InsightBox text={achieveInfo.text} />
                    </div>

                    {/* Summary Quality */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-md p-5">
                      <SectionHeader icon={<AlignLeft className="w-5 h-5"/>} title="Summary Quality" subtitle="Is your opening statement compelling?" colorFrom="from-violet-100" colorTo="to-purple-100" iconColor="text-violet-600" />
                      {summaryInfo.present ? (
                        <>
                          <div className="flex items-baseline gap-2 mb-3">
                            <BigStat value={summaryInfo.score} label="/100" color={summaryInfo.score>=75?"text-emerald-600":summaryInfo.score>=45?"text-amber-600":"text-rose-600"} />
                            <SignalBadge label={d.summary_quality?.verdict??""} variant={summaryInfo.score>=75?"good":summaryInfo.score>=45?"warn":"bad"} />
                          </div>
                          <ScorePill score={summaryInfo.score} color={summaryInfo.score>=75?"emerald":summaryInfo.score>=45?"amber":"rose"} />
                          {d.summary_quality?.word_count && <p className="text-xs text-slate-400 mt-1">{d.summary_quality.word_count} words detected</p>}
                        </>
                      ) : (
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-2">
                          <p className="text-xs font-semibold text-amber-800 mb-1">No summary section found</p>
                        </div>
                      )}
                      <InsightBox text={summaryInfo.text} />
                    </div>
                  </div>

                  {/* Clichés + Pronouns + Consistency */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                    {/* Clichés */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-md p-5">
                      <SectionHeader icon={<MessageSquare className="w-5 h-5"/>} title="Cliché Detector" subtitle="Overused phrases recruiters instantly discard" colorFrom="from-rose-100" colorTo="to-pink-100" iconColor="text-rose-600" />
                      {!isLocked(d.cliches) && d.cliches && (
                        <>
                          <div className="flex items-center gap-3 mb-2">
                            <BigStat value={d.cliches.count} label="found" color={d.cliches.count===0?"text-emerald-600":"text-rose-600"} />
                            <SignalBadge label={d.cliches.count===0?"Clean":`${d.cliches.count} clichés`} variant={d.cliches.count===0?"good":"bad"} />
                          </div>
                          {d.cliches.cliches_found.slice(0,3).map((c,i) => (
                            <div key={i} className="p-2.5 bg-rose-50 border border-rose-100 rounded-lg mb-2">
                              <p className="text-xs font-semibold text-rose-700">"{c.phrase}"</p>
                              <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{c.context}</p>
                            </div>
                          ))}
                        </>
                      )}
                      <InsightBox text={clicheText} />
                    </div>

                    {/* Personal Pronouns */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-md p-5">
                      <SectionHeader icon={<Users className="w-5 h-5"/>} title="Personal Pronouns" subtitle={`"I", "my", "we" are red flags in a resume`} colorFrom="from-slate-100" colorTo="to-gray-100" iconColor="text-slate-600" />
                      {!isLocked(d.personal_pronouns) && d.personal_pronouns && (
                        <>
                          <div className="flex items-center gap-3 mb-2">
                            <BigStat value={d.personal_pronouns.count} label="lines" color={d.personal_pronouns.count===0?"text-emerald-600":"text-rose-600"} />
                            <SignalBadge label={d.personal_pronouns.count===0?"Clean":`${d.personal_pronouns.count} line(s)`} variant={d.personal_pronouns.count===0?"good":"bad"} />
                          </div>
                          {d.personal_pronouns.hits.slice(0,2).map((h,i) => (
                            <div key={i} className="p-2.5 bg-rose-50 border border-rose-100 rounded-lg mb-2">
                              <p className="text-xs text-slate-700 line-clamp-2">{h.line}</p>
                              <p className="text-xs text-rose-600 mt-1">Contains: {h.pronouns.join(", ")}</p>
                            </div>
                          ))}
                        </>
                      )}
                      <InsightBox text={pronounText} />
                    </div>

                    {/* Consistency */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-md p-5">
                      <SectionHeader icon={<CheckSquare className="w-5 h-5"/>} title="Consistency Check" subtitle="Date formats, tense, abbreviations" colorFrom="from-teal-100" colorTo="to-cyan-100" iconColor="text-teal-600" />
                      {!isLocked(d.consistency) && d.consistency && (
                        <>
                          <div className="mb-3">
                            <SignalBadge label={d.consistency.issue_count===0?"Fully consistent":`${d.consistency.issue_count} issue(s)`} variant={d.consistency.issue_count===0?"good":"warn"} />
                          </div>
                          {d.consistency.issues.slice(0,2).map((issue,i) => (
                            <div key={i} className="p-3 bg-amber-50 border border-amber-100 rounded-xl mb-2">
                              <p className="text-xs font-semibold text-amber-800">{issue.type}</p>
                              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{issue.detail}</p>
                            </div>
                          ))}
                        </>
                      )}
                      <InsightBox text={consistencyText} />
                    </div>
                  </div>

                  {/* Skill Recency */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-slate-200/60 p-6">
                    <SectionHeader icon={<RefreshCw className="w-5 h-5"/>} title="Skill Recency Estimator" subtitle="Modern in-demand stack vs dated legacy technologies" colorFrom="from-green-100" colorTo="to-lime-100" iconColor="text-green-600" />
                    {!isLocked(d.skill_recency) && d.skill_recency && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-4">
                        <div>
                          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-2">Modern / in-demand</p>
                          <div className="flex flex-wrap gap-1.5">
                            {(d.skill_recency as any).modern_tech_found.length > 0
                              ? (d.skill_recency as any).modern_tech_found.map((t: string,i: number) => <span key={i} className="px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-lg font-medium">{t}</span>)
                              : <p className="text-xs text-slate-400 italic">None detected</p>}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-rose-600 uppercase tracking-wide mb-2">Dated / de-emphasise</p>
                          <div className="flex flex-wrap gap-1.5">
                            {(d.skill_recency as any).dated_tech_found.length > 0
                              ? (d.skill_recency as any).dated_tech_found.map((t: string,i: number) => <span key={i} className="px-2.5 py-1 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg font-medium">{t}</span>)
                              : <p className="text-xs text-slate-400 italic">None detected</p>}
                          </div>
                        </div>
                      </div>
                    )}
                    <InsightBox text={recencyText} />
                  </div>
                </div>
              )}

              {/* ══════════════ TAB: SKILLS ══════════════ */}
              {activeTab === "skills" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-slate-200/60 p-6">
                      <SectionHeader icon={<Code className="w-6 h-6"/>} title={`${d.technical_skills_compatibility?.total_skills_identified ?? 0} Skills Detected`} subtitle="Grouped by technology category" colorFrom="from-blue-100" colorTo="to-indigo-100" iconColor="text-blue-600" />
                      <div className="space-y-4">
                        {Object.entries(d.technical_skills_compatibility?.skills_by_category ?? {})
                          .filter(([,skills]) => (skills as string[]).length > 0)
                          .map(([cat,skills]) => (
                            <div key={cat}>
                              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{cat.replace(/_/g," ")}</p>
                              <div className="flex flex-wrap gap-1.5">
                                {(skills as string[]).map((s,i) => <span key={i} className="px-2.5 py-1 bg-blue-50 border border-blue-200 text-blue-700 text-xs rounded-lg font-medium">{s}</span>)}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-slate-200/60 p-6">
                      <SectionHeader icon={<Target className="w-6 h-6"/>} title={`${d.technical_skills_compatibility?.target_domain} Fit`} subtitle="How your skills align to the detected role requirements" colorFrom="from-violet-100" colorTo="to-purple-100" iconColor="text-violet-600" />
                      <div className="space-y-4 mb-4">
                        {Object.entries(d.technical_skills_compatibility?.category_breakdown ?? {}).map(([cat,data]) => (
                          <div key={cat}>
                            <div className="flex justify-between items-center mb-1.5">
                              <span className="text-sm text-slate-700 capitalize">{cat.replace(/_/g," ")}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-slate-500">{data.found}/{data.required}</span>
                                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${data.priority==="critical"?"bg-rose-100 text-rose-700":data.priority==="required"?"bg-amber-100 text-amber-700":"bg-slate-100 text-slate-600"}`}>{data.priority}</span>
                              </div>
                            </div>
                            <ScorePill score={data.required>0?(data.found/data.required)*100:0} color={data.found>=data.required?"emerald":data.priority==="critical"?"rose":"amber"} />
                          </div>
                        ))}
                      </div>
                      <InsightBox text={skillsText} />
                    </div>
                  </div>

                  {(d.ats_compatibility?.issues?.length ?? 0) > 0 && (
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-slate-200/60 p-6">
                      <SectionHeader icon={<AlertTriangle className="w-5 h-5"/>} title="ATS Compatibility Issues" subtitle="Fix these to improve your automated screening pass rate" colorFrom="from-amber-100" colorTo="to-orange-100" iconColor="text-amber-600" />
                      <div className="space-y-3">
                        {d.ats_compatibility.issues.map((issue,i) => (
                          <div key={i} className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                            <p className="text-sm text-amber-800">{issue}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ══════════════ TAB: ROADMAP ══════════════ */}
              {activeTab === "roadmap" && (
                <div className="space-y-5">

                  {/* Summary paragraph — always shown, not just "Looking Strong" */}
                  <div className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Activity className="w-5 h-5 text-violet-600" />
                      <h3 className="text-base font-bold text-slate-800">Roadmap Summary</h3>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">{roadmapText}</p>
                  </div>

                  {isLocked(d.improvement_roadmap)
                    ? <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-slate-200/60 p-12 text-center">
                        <LockedBadge message={(d.improvement_roadmap as LockedField).unlock_message} />
                      </div>
                    : Array.isArray(d.improvement_roadmap) && d.improvement_roadmap.length > 0
                      ? <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          {d.improvement_roadmap.map((item,i) => (
                            <div key={i} className={`bg-white/80 backdrop-blur-sm rounded-2xl border shadow-md p-5 ${item.priority==="High"?"border-rose-200":item.priority==="Medium"?"border-amber-200":"border-slate-200/60"}`}>
                              <div className="flex items-start justify-between mb-3 gap-2">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${item.priority==="High"?"bg-rose-100 text-rose-700":item.priority==="Medium"?"bg-amber-100 text-amber-700":"bg-slate-100 text-slate-600"}`}>{item.priority}</span>
                                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{item.category}</span>
                                </div>
                                <span className="shrink-0 text-xs font-semibold px-2.5 py-1 bg-violet-50 border border-violet-200 text-violet-700 rounded-lg">{item.impact}</span>
                              </div>
                              <p className="text-sm text-slate-700 leading-relaxed">{item.action}</p>
                            </div>
                          ))}
                        </div>
                      : <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-slate-200/60 p-10 text-center">
                          <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
                          <p className="text-lg font-bold text-slate-900 mb-1">No critical action items</p>
                          <p className="text-sm text-slate-500 max-w-md mx-auto">The analysis found no high-priority structural or content issues. See the roadmap summary above for what's working well and what fine-tuning remains.</p>
                        </div>
                  }

                  {d.resume_length && (
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-md p-5">
                      <SectionHeader icon={<FileText className="w-5 h-5"/>} title="Resume Length Check" subtitle={d.resume_length.length_verdict} colorFrom="from-slate-100" colorTo="to-gray-100" iconColor="text-slate-600" />
                      <div className="grid grid-cols-3 gap-4 mb-3">
                        {[{ label:"Word count",value:d.resume_length.word_count },{ label:"Estimated pages",value:d.resume_length.estimated_pages },{ label:"Missing sections",value:d.resume_length.missing_sections.length }].map((s,i) => (
                          <div key={i} className="text-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                            <p className="text-xl font-bold text-slate-800">{s.value}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
                          </div>
                        ))}
                      </div>
                      {d.resume_length.missing_sections.length > 0 && (
                        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
                          <p className="text-xs font-semibold text-amber-800">Add these sections: {d.resume_length.missing_sections.join(", ")}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

            </div>
          );
        })()}
      </div>
      <CreditUsedToast show={showToast} onClose={() => setShowToast(false)} />
    </div>
  );
}