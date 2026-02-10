"use client";

import { useState, useRef, useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  Loader2,
  Upload,
  FileText,
  TrendingUp,
  Award,
  Target,
  Sparkles,
  AlertCircle,
  Brain,
  Zap,
  CheckCheck,
  Shield,
  Users,
  Briefcase,
  Code,
  Star,
} from "lucide-react";
import { useAuth, useClerk } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

import { consumeCredit } from "../../lib/consumeCredit";
import CreditUsedToast from "./CreditUsedToast";

function ConnectionTest() {
  /* =======================
     Clerk Auth Setup
  ======================= */
  const { isSignedIn } = useAuth();
  const clerk = useClerk();
  const [pendingAnalyze, setPendingAnalyze] = useState(false);

  /* =======================
     Local State
  ======================= */
  const [file, setFile] = useState(null);
  const [testing, setTesting] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [analyzeResult, setAnalyzeResult] = useState(null);
  const [error, setError] = useState(null);
  const [showPlaceholder, setShowPlaceholder] = useState(false);
  const { user } = useUser();
  const [showToast, setShowToast] = useState(false);

  const fileInputRef = useRef(null);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  /* =======================
     Resume after login
  ======================= */
  useEffect(() => {
    if (isSignedIn && pendingAnalyze) {
      setPendingAnalyze(false);
      testConnection();
    }
  }, [isSignedIn, pendingAnalyze]);

  /* =======================
     File Handlers
  ======================= */
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setError(null);
      setUploadResult(null);
      setAnalyzeResult(null);
    } else {
      setError("Please select a valid PDF file");
      setFile(null);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
      setError(null);
      setUploadResult(null);
      setAnalyzeResult(null);
    } else {
      setError("Please select a valid PDF file");
      setFile(null);
    }
  };

  /* =======================
     Main Analyze Function
  ======================= */
  const testConnection = async () => {
    if (!file) {
      setError("Please select a PDF file first");
      return;
    }

    setTesting(true);
    setError(null);
    setUploadResult(null);
    setAnalyzeResult(null);
    setShowPlaceholder(true);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const uploadResponse = await fetch(`${API_BASE}/upload-resume`, {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadResponse.json();
      setUploadResult({ success: uploadResponse.ok, data: uploadData });

      if (!uploadResponse.ok) {
        throw new Error(uploadData.error || "Upload failed");
      }

      const resumeText = uploadData.text || uploadData.TEXT || "";

      const analyzeResponse = await fetch(`${API_BASE}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume_text: resumeText }),
      });

      const analyzeData = await analyzeResponse.json();

      await fetch(`${API_BASE}/career-intelligence`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clerk_user_id: user.id,
          resume_text: resumeText,
        }),
      });

      setAnalyzeResult({
        success: analyzeResponse.ok,
        status: analyzeResponse.status,
        data: analyzeData,
      });

      if (!analyzeResponse.ok) {
        throw new Error(analyzeData.error || "Analysis failed");
      }
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setTesting(false);
      setShowPlaceholder(false);
    }
  };

  const handlePaidAnalyze = async () => {
    if (!user) return;
    setShowToast(true);

    // 1️⃣ consume credit first
    const usage = await consumeCredit(user.id, "resume_analysis");

    // 2️⃣ block if limit reached
    if (!usage.allowed) {
      alert("You have used all free credits. Please upgrade to continue.");
      return;
    }

    // 3️⃣ credit allowed → run existing logic
    await testConnection();
  };

  // Prepare radar chart data
  const getRadarData = () => {
    if (!analyzeResult?.data) return [];

    return [
      {
        category: "Resume",
        value: analyzeResult.data.resume_score?.score || 0,
        fullMark: 100,
      },
      {
        category: "ATS",
        value: analyzeResult.data.ats_compatibility?.score || 0,
        fullMark: 100,
      },
      {
        category: "Experience",
        value: analyzeResult.data.experience_analysis?.score || 0,
        fullMark: 100,
      },
      {
        category: "Technical",
        value:
          analyzeResult.data.technical_skills_compatibility
            ?.total_skills_identified || 0,
        fullMark: 100,
      },
    ];
  };

  // Get competitive positioning bar data
  const getCompetitiveData = () => {
    if (!analyzeResult?.data?.visualization_data?.competitive_positioning)
      return [];

    return analyzeResult.data.visualization_data.competitive_positioning.levels.map(
      (level) => ({
        name: level.label,
        value: level.percentile,
      })
    );
  };

  const PASTEL_COLORS = ["#A7C7E7", "#B4E7CE", "#FFD4A3", "#E7B4D7", "#C5A7E7"];

  /* =======================
     JSX
  ======================= */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/40 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* ========== TOP SECTION: File Drop (Left) + Features (Right) ========== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT: File Drop Zone */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-slate-200/60 p-8">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 bg-gradient-to-br from-violet-100 to-purple-100 rounded-xl">
                  <Upload className="w-6 h-6 text-violet-600" />
                </div>
                <h2 id="id1" className="text-2xl font-bold text-slate-800">
                  Upload Resume
                </h2>
              </div>
              <p className="text-slate-600 text-sm">
                Get Advance insights in seconds
              </p>
            </div>

            {/* Drop Zone */}
            <div
              className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
                file
                  ? "border-emerald-300 bg-gradient-to-br from-emerald-50 to-teal-50"
                  : "border-violet-200 bg-gradient-to-br from-violet-50/50 to-purple-50/50 hover:border-violet-400 hover:from-violet-100/50 hover:to-purple-100/50"
              }`}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="space-y-4">
                <div
                  className={`mx-auto w-20 h-20 rounded-2xl flex items-center justify-center transition-all ${
                    file
                      ? "bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-600"
                      : "bg-gradient-to-br from-violet-100 to-purple-100 text-violet-600"
                  }`}
                >
                  {file ? (
                    <CheckCheck className="w-10 h-10" />
                  ) : (
                    <Upload className="w-10 h-10" />
                  )}
                </div>

                <div>
                  <p className="text-slate-800 font-semibold text-lg mb-1">
                    {file ? "File Ready" : "Drop your resume here"}
                  </p>
                  <p className="text-sm text-slate-500">
                    or click to browse • PDF only
                  </p>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-4 bg-red-50/80 border border-red-200 text-red-700 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* File Info */}
            {file && (
              <div className="mt-4 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/60 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-emerald-100 rounded-lg">
                    <FileText className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-sm text-slate-600 mt-0.5">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Analyze Button */}
            <button
              onClick={() => {
                if (!file) {
                  setError("Please select a PDF file first");
                  return;
                }

                if (isSignedIn) {
                  handlePaidAnalyze();
                } else {
                  setPendingAnalyze(true);
                  try {
                    clerk.openSignIn();
                  } catch {
                    window.location.href = "/sign-in";
                  }
                }
              }}
              disabled={testing || !file}
              className={`mt-6 w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition-all duration-300 ${
                testing || !file
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              }`}
            >
              {testing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing Resume...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Analyze with AI
                </>
              )}
            </button>
            
            </div>

          {/* RIGHT: Features */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-slate-200/60 p-8">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl">
                  <Sparkles className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">
                  What You'll Get
                </h2>
              </div>
              <p className="text-slate-600 text-sm">
                Comprehensive AI-powered resume analysis
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: <Shield className="w-6 h-6" />,
                  title: "ATS Compatibility Score",
                  desc: "Check if your resume passes applicant tracking systems",
                  color: "from-emerald-100 to-teal-100",
                  iconColor: "text-emerald-600",
                },
                {
                  icon: <Code className="w-6 h-6" />,
                  title: "Technical Skills Analysis",
                  desc: "Detailed breakdown of your tech stack and proficiency",
                  color: "from-blue-100 to-indigo-100",
                  iconColor: "text-blue-600",
                },
                {
                  icon: <Target className="w-6 h-6" />,
                  title: "Market Positioning",
                  desc: "See how you stack up against other candidates in your field",
                  color: "from-purple-100 to-pink-100",
                  iconColor: "text-purple-600",
                },
                {
                  icon: <TrendingUp className="w-6 h-6" />,
                  title: "Career Health Score",
                  desc: "See how you rank against other future candidates",
                  color: "from-amber-100 to-orange-100",
                  iconColor: "text-amber-600",
                },
                {
                  icon: <Award className="w-6 h-6" />,
                  title: "Resume Quality Score",
                  desc: "Overall assessment with actionable improvements",
                  color: "from-rose-100 to-red-100",
                  iconColor: "text-rose-600",
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-slate-50/50 to-white/50 border border-slate-100 hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
                >
                  <div
                    className={`p-3 bg-gradient-to-br ${feature.color} rounded-xl ${feature.iconColor} shrink-0`}
                  >
                    {feature.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-800 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========== BOTTOM SECTION: Analysis Dashboard ========== */}
        {showPlaceholder ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-slate-200/60 p-16">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-violet-100 to-purple-100 rounded-3xl">
                <Loader2 className="w-12 h-12 text-violet-600 animate-spin" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-slate-900 mb-3">
                  Analyzing Your Resume
                </h3>
                <p className="text-slate-600 text-lg">
                  Our advance algorithm is processing your resume...
                </p>
              </div>
              <div className="flex items-center justify-center gap-2">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-3 h-3 bg-violet-400 rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : analyzeResult?.success && analyzeResult?.data ? (
          <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-br from-violet-500/90 via-purple-500/90 to-indigo-500/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-1">
                      Analysis Complete
                    </h2>
                    <p className="text-violet-100">
                      Here's your comprehensive resume analysis
                    </p>
                  </div>
                </div>
                <Brain className="w-16 h-16 text-white/30" />
              </div>
            </div>

            {/* Main Metrics + Radar Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Radar Chart */}
              <div className="lg:col-span-1 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-slate-200/60 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-violet-100 to-purple-100 rounded-xl">
                    <Target className="w-5 h-5 text-violet-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">
                    Overall Performance
                  </h3>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={getRadarData()}>
                    <PolarGrid stroke="#D1D5DB" />
                    <PolarAngleAxis
                      dataKey="category"
                      tick={{ fill: "#334155", fontSize: 16 }}
                    />
                    <PolarRadiusAxis
                      angle={90}
                      domain={[0, 100]}
                      tick={{ fill: "#334155", fontSize: 14 }}
                    />
                    <Radar
                      name="Score"
                      dataKey="value"
                      stroke="#8b5cf6"
                      fill="#a78bfa"
                      fillOpacity={0.5}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Metric Cards */}
              <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Resume Score */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-md p-5 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl">
                      <Award className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-slate-900 mb-1">
                    {analyzeResult.data.resume_score?.score || "N/A"}
                  </p>
                  <p className="text-sm font-semibold text-slate-700 mb-3">
                    Resume Score
                  </p>
                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span>Experience</span>
                      <span className="font-semibold text-slate-800">
                        {analyzeResult.data.resume_score.breakdown
                          ?.experience_contribution || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Projects</span>
                      <span className="font-semibold text-slate-800">
                        {analyzeResult.data.resume_score.breakdown
                          ?.project_contribution || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Skills</span>
                      <span className="font-semibold text-slate-800">
                        {analyzeResult.data.resume_score.breakdown
                          ?.skills_contribution || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Technical Skills */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-md p-5 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl">
                      <Code className="w-5 h-5 text-purple-600" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-slate-900 mb-1">
                    {analyzeResult.data.technical_skills_compatibility
                      ?.total_skills_identified || 0}
                    +
                  </p>
                  <p className="text-sm font-semibold text-slate-700 mb-3">
                    Tech Skills
                  </p>
                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span>Cloud</span>
                      <span className="font-semibold text-slate-800">
                        {analyzeResult.data.technical_skills_compatibility
                          ?.category_breakdown?.cloud_platforms?.found || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Languages</span>
                      <span className="font-semibold text-slate-800">
                        {analyzeResult.data.technical_skills_compatibility
                          ?.category_breakdown?.core_languages?.found || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>ML/AI</span>
                      <span className="font-semibold text-slate-800">
                        {analyzeResult.data.technical_skills_compatibility
                          ?.category_breakdown?.ml_frameworks?.found || 0}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Experience */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-md p-5 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-xl">
                      <Briefcase className="w-5 h-5 text-teal-600" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-slate-900 mb-1">
                    {analyzeResult.data.experience_analysis?.score || "N/A"}
                  </p>
                  <p className="text-sm font-semibold text-slate-700 mb-3">
                    Experience
                  </p>
                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span>Level</span>
                      <span className="font-semibold text-slate-800">
                        {analyzeResult.data.experience_analysis
                          ?.experience_level || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Quality</span>
                      <span className="font-semibold text-slate-800">
                        {analyzeResult.data.experience_analysis
                          ?.project_quality_score || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ATS Score */}
                <div className="bg-gradient-to-br from-emerald-400/90 to-teal-400/90 backdrop-blur-sm rounded-2xl shadow-md p-5 text-white hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
                      <Shield className="w-5 h-5" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold mb-1">
                    {analyzeResult.data.ats_compatibility?.score || "N/A"}
                  </p>
                  <p className="text-sm font-semibold mb-2">ATS Score</p>
                  <p className="text-lg font-bold text-emerald-100">
                    {analyzeResult.data.ats_compatibility?.rating || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Visualization Section */}
            {analyzeResult.data.visualization_data && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Competitive Positioning */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-slate-200/60 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-xl">
                      <Users className="w-5 h-5 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">
                      Competitive Position
                    </h3>
                  </div>

                  <ResponsiveContainer width="100%" height={240}>
                    <BarChart
                      data={getCompetitiveData()}
                      layout="vertical"
                      margin={{ left: 0, right: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis
                        type="category"
                        dataKey="name"
                        tick={{ fill: "#64748b", fontSize: 12 }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e2e8f0",
                          borderRadius: "12px",
                        }}
                      />
                      <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                        {getCompetitiveData().map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={PASTEL_COLORS[index % PASTEL_COLORS.length]}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>

                  <div className="mt-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-4 border border-indigo-100">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-700">
                          Current Level
                        </span>
                        <span className="text-sm font-bold text-indigo-600">
                          {analyzeResult.data.visualization_data
                            .competitive_positioning.current_level}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {analyzeResult.data.candidate_level.description}
                      </p>
                      <div className="pt-2 border-t border-indigo-100 flex items-center justify-between">
                        <span className="text-xs text-slate-600">
                          Percentile
                        </span>
                        <span className="text-sm font-bold text-indigo-600">
                          {analyzeResult.data.visualization_data
                            .competitive_positioning.current_percentile}
                          %
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Score Breakdown */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-slate-200/60 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl">
                      <Target className="w-5 h-5 text-amber-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">
                      Score Breakdown
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {analyzeResult.data.visualization_data.score_breakdown.categories.map(
                      (category, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span className="font-medium text-slate-700">
                              {category}
                            </span>
                            <span className="text-amber-600 font-bold">
                              {analyzeResult.data.visualization_data
                                .score_breakdown.scores[index]}
                              %
                            </span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-amber-300 to-orange-400 rounded-full transition-all duration-700"
                              style={{
                                width: `${analyzeResult.data.visualization_data.score_breakdown.scores[index]}%`,
                              }}
                            />
                          </div>
                        </div>
                      )
                    )}
                  </div>

                  <div className="mt-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-100">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-semibold text-slate-700">
                        Average Score
                      </span>
                      <span className="text-xl font-bold text-amber-600">
                        {analyzeResult.data.visualization_data.summary_stats
                          .average_score}
                      </span>
                    </div>
                    <div className="pt-3 border-t border-amber-100">
                      <p className="text-xs font-semibold text-slate-700 mb-1">
                        Top Skill Gap
                      </p>
                      <p className="text-sm text-amber-700 font-medium">
                        {analyzeResult.data.visualization_data.summary_stats
                          .top_skill_gap}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Job Recommendations */}
            {analyzeResult.data.recommended_job_profiles &&
              analyzeResult.data.recommended_job_profiles.length > 0 && (
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-slate-200/60 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl">
                      <Star className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-800">
                        Recommended Job Profiles
                      </h3>
                      <p className="text-sm text-slate-600 mt-1">
                        Best matches based on your skills
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {analyzeResult.data.recommended_job_profiles.map(
                      (job, index) => (
                        <div
                          key={index}
                          className="group bg-gradient-to-br from-slate-50/80 to-white/80 border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:border-violet-200 transition-all duration-300 hover:-translate-y-1"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <h4 className="font-bold text-slate-900 text-lg leading-tight pr-3">
                              {job.job_title}
                            </h4>
                            <div className="shrink-0 px-3 py-1.5 bg-gradient-to-r from-emerald-400 to-teal-400 text-white rounded-xl font-bold text-sm shadow-md">
                              {job.match_score}%
                            </div>
                          </div>

                          <p className="text-sm text-slate-700 font-medium mb-4 leading-relaxed">
                            {job.reason}
                          </p>

                          {job.gaps && job.gaps.length > 0 && (
                            <div className="mb-4">
                              <p className="text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wide">
                                Skills to improve:
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {job.gaps.slice(0, 3).map((gap, idx) => (
                                  <span
                                    key={idx}
                                    className="px-3 py-1 bg-gradient-to-br from-amber-100 to-orange-100 text-amber-700 text-xs font-medium rounded-full border border-amber-200"
                                  >
                                    {gap}
                                  </span>
                                ))}
                                {job.gaps.length > 3 && (
                                  <span className="px-3 py-1 bg-slate-200 text-slate-600 text-xs font-medium rounded-full">
                                    +{job.gaps.length - 3} more
                                  </span>
                                )}
                              </div>
                            </div>
                          )}

                          {job.rationale && (
                            <div className="pt-4 border-t border-slate-200">
                              <p className="text-xs text-slate-600 italic leading-relaxed">
                                {job.rationale}
                              </p>
                            </div>
                          )}
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
          </div>
        ) : null}
      </div>

      <CreditUsedToast show={showToast} onClose={() => setShowToast(false)} />
    </div>
  );
}

export default ConnectionTest;