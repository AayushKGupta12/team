"use client";

import { useState, useRef, useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  Loader2,
  Upload,
  FileText,
} from "lucide-react";
import { useAuth, useClerk } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

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

  const API_BASE =
    process.env.NEXT_PUBLIC_API_URL;

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


  /* =======================
     JSX
  ======================= */
  return (
    <div className="bg-white p-4 sm:p-6 md:p-3 flex flex-col md:flex-row gap-4 md:gap-10 items-start justify-center font-sans">
      {/* Upload Section */}
      <div className="w-full md:w-1/3 lg:w-1/4 rounded-xl border border-[#0d2440] bg-[#e7f0fa] p-4 sm:p-6 shadow-lg">
        <div className="text-left mb-6 flex items-center justify-center">
          <FileText className="w-8 h-8 text-[#0d2440]" />
          <h1 id="roles" className="text-2xl font-semibold text-gray-800 mx-3">
            Upload Resume
          </h1>
        </div>

        <div
          className="border-2 border-dashed border-[#2e5e99] rounded-xl p-6 mb-6 text-center cursor-pointer hover:scale-101 transition duration-300 hover:bg-amber-50 hover:border-amber-600"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-8 h-8 text-emerald-700 mx-auto mb-4" />
          <p className="text-gray-700 font-light">
            Drag and drop your resume, or click to browse
          </p>
          <p className="text-sm text-gray-500 font-light">PDF files only</p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 rounded-lg p-4 mb-4 flex items-center">
            <XCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}

        {file && (
          <div className="bg-gray-200 rounded-lg p-4 mb-4 flex items-center">
            <FileText className="w-6 h-6 mr-3" />
            <div>
              <p className="font-semibold">{file.name}</p>
              <p className="text-xs text-gray-500">
                {(file.size / 1024).toFixed(2)} KB
              </p>
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
            }else {
              setPendingAnalyze(true);
              try {
                clerk.openSignIn();
              } catch {
                window.location.href = "/sign-in";
              }
            }
          }}
          disabled={testing}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center cursor-pointer"
        >
          {testing ? (
            <>
              <Loader2 className="w-5 h-5 mr-3 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Upload className="w-5 h-5 mr-3" />
              Analyze Resume
            </>
          )}
        </button>

        <CreditUsedToast
        show={showToast}
        onClose={() => setShowToast(false)}
        />

      </div>


      {/* Result Display (Right Section) */}
      <div className="w-full md:flex-1">
        <div className="bg-amber-50/80 rounded-xl shadow-lg p-6 sm:p-8 transition-all duration-300 hover:shadow-xl">

          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text- sm:text-sm font-semibold text-amber-800 uppercase tracking-wide">
                AI Resume Insights
              </p>
              <p className="text-sm sm:text-base text-gray-700 mt-1">
                Visual analysis of your resume in seconds.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <img
                src="https://raw.githubusercontent.com/AayushKGupta12/asset/refs/heads/main/WhatsApp%20Image%202025-11-01%20at%2000.56.19_aacc0583.jpg"
                alt="Resume card illustration"
                className="w-14 h-14 rounded-lg shadow-md object-cover"
              />
            </div>
          </div>

          {showPlaceholder ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-pulse text-center">
                <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 text-[#0d2440] mx-auto animate-spin" />
                <p className="text-gray-700 mt-4 font-medium text-sm sm:text-base">Analyzing your resume...</p>
              </div>
            </div>
          ) : (
            analyzeResult && (
              <div className="space-y-6 sm:space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 flex items-center">
                    <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 mr-3 text-gray-700 transition-transform duration-300 group-hover:scale-110" />
                    Results
                  </h2>
                </div>

                <div className="space-y-6 sm:space-y-8">
                  {/* Main Scores */}
                  {analyzeResult.success && analyzeResult.data && (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-sm text-gray-700">
                        {/* Resume Score */}
                        <div className="bg-[#e7f0fa] border border-[#0d2440] rounded-lg p-4 sm:p-6 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                          <p className="mb-3 font-semibold text-[#0d2440] text-base sm:text-lg">Resume Score</p>
                          <p className="text-lg sm:text-xl font-semibold text-gray-800">
                            {analyzeResult.data.resume_score?.score || "N/A"} /100
                          </p>
                          <p className="mt-2 sm:mt-3">Experience: {analyzeResult.data.resume_score.breakdown?.experience_contribution || "N/A"}</p>
                          <p className="mt-1 sm:mt-2">Projects: {analyzeResult.data.resume_score.breakdown?.project_contribution || "N/A"}</p>
                          <p className="mt-1 sm:mt-2">Skills: {analyzeResult.data.resume_score.breakdown?.skills_contribution || "N/A"}</p>
                        </div>

                        {/* Technical Skills */}
                        <div className="bg-[#e7f0fa] border border-[#0d2440] rounded-lg p-4 sm:p-6 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                          <p className="mb-3 font-semibold -[#0d2440] text-base sm:text-lg">Technical Score</p>
                          <p className="text-lg sm:text-xl font-semibold text-gray-800">
                            {analyzeResult.data.technical_skills_compatibility?.total_skills_identified || 0}+
                          </p>
                          <p className="mt-2 sm:mt-3">Cloud: {analyzeResult.data.technical_skills_compatibility?.category_breakdown?.cloud_platforms?.found || 0}</p>
                          <p className="mt-1 sm:mt-2">Languages: {analyzeResult.data.technical_skills_compatibility?.category_breakdown?.core_languages?.found || 0}</p>
                          <p className="mt-1 sm:mt-2">ML: {analyzeResult.data.technical_skills_compatibility?.category_breakdown?.ml_frameworks?.found || 0}</p>
                        </div>

                        {/* Experience */}
                        <div className="bg-[#e7f0fa] border border-[#0d2440] rounded-lg p-4 sm:p-6 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                          <p className="mb-3 font-semibold text-[#0d2440] text-base sm:text-lg">Experience Score</p>
                          <p className="text-lg sm:text-xl font-semibold text-gray-800">
                            {analyzeResult.data.experience_analysis?.score || "N/A"}
                          </p>
                          <p className="mt-2 sm:mt-3">Level: {analyzeResult.data.experience_analysis?.experience_level || "N/A"}</p>
                          <p className="mt-1 sm:mt-2">Projects: {analyzeResult.data.experience_analysis?.project_quality_score || "N/A"}</p>
                        </div>

                        {/* ATS Score */}
                        <div className="bg-emerald-50 border border-amber-500 rounded-lg p-4 sm:p-6 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                          <p className="mb-3 font-semibold text-teal-800 text-base sm:text-lg">ATS Score</p>
                          <p className="text-lg sm:text-xl font-semibold text-gray-800">
                            {analyzeResult.data.ats_compatibility?.score || "N/A"}/100
                          </p>
                          <p className=" text-2xl mt-2 sm:mt-3 font-semibold text-teal-800">
                            {analyzeResult.data.ats_compatibility?.rating || "N/A"}
                          </p>
                        </div>
                      </div>

                      {/* Visualization Data */}
                      {analyzeResult.data.visualization_data && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-sm text-gray-700">
                          {/* Competitive Positioning */}
                          <div className="bg-white border border-[#0d2440] rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                            <h3 className="mb-3 sm:mb-4 font-semibold text-[#0d2440] text-base sm:text-lg">Competitive Positioning</h3>
                            <div className="space-y-3">
                              {analyzeResult.data.visualization_data.competitive_positioning.levels.map(
                                (level, index) => (
                                  <div key={index} className="flex justify-between items-center">
                                    <span className="text-xs sm:text-sm">{level.label}</span>
                                    <div className="w-2/3 sm:w-3/4 bg-emerald-100 rounded-full h-2 sm:h-3 overflow-hidden">
                                      <div
                                        className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                                        style={{ width: `${level.percentile}%` }}
                                      ></div>
                                    </div>
                                    <span className="text-xs text-gray-500">{level.percentile}%</span>
                                  </div>
                                )
                              )}
                            </div>
                            <p className="mt-4 text-xs sm:text-sm text-gray-600">
                              <div className="mb-2">Current Level: <span className="font-semibold text-emerald-800">{analyzeResult.data.visualization_data.competitive_positioning.current_level}</span><br /></div>
                              <div className="mb-2">Description: <span className="font-semibold text-emerald-800">{analyzeResult.data.candidate_level.description}</span><br /></div>
                              
                              Percentile: <span className="font-semibold text-emerald-800">{analyzeResult.data.visualization_data.competitive_positioning.current_percentile}%</span><br />
                              <span className="font-semibold text-emerald-800">{analyzeResult.data.visualization_data.competitive_positioning.description}</span>
                            </p>
                          </div>

                          {/* Score Breakdown */}
                          <div className="bg-white border border-[#0d2440] rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                            <h3 className="mb-3 sm:mb-4 font-semibold text-[#0d2440] text-base sm:text-lg">Score Breakdown</h3>
                            <div className="space-y-3">
                              {analyzeResult.data.visualization_data.score_breakdown.categories.map(
                                (category, index) => (
                                  <div key={index} className="flex justify-between items-center">
                                    <span className="text-xs sm:text-sm">{category}</span>
                                    <div className="w-1/2 sm:w-2/3 bg-amber-100 rounded-full h-2 sm:h-3 overflow-hidden">
                                      <div
                                        className="h-full rounded-full bg-amber-400 transition-all duration-500"
                                        style={{
                                          width: `${analyzeResult.data.visualization_data.score_breakdown.scores[index]}%`,
                                        }}
                                      ></div>
                                    </div>
                                    <span className="text-xs text-gray-500">
                                      {analyzeResult.data.visualization_data.score_breakdown.scores[index]}%
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                            <p className="mt-5 text-xs sm:text-sm text-gray-600">
                              <div className="mb-2">Average Score: <span className="font-semibold text-emerald-800">{analyzeResult.data.visualization_data.summary_stats.average_score}</span><br /></div>
                              Top Skill Gap: <span className="font-semibold text-emerald-800">{analyzeResult.data.visualization_data.summary_stats.top_skill_gap}</span>
                            </p>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* Recommended Job Profiles */}
                  {analyzeResult.data.recommended_job_profiles && analyzeResult.data.recommended_job_profiles.length > 0 && (
                    <div className="mt-6 sm:mt-8">
                      <h3 className="mb-4 sm:mb-6 font-semibold text-[#0d2440] text-base sm:text-lg">Recommended Job Profiles</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {analyzeResult.data.recommended_job_profiles.map((job, index) => (
                          <div
                            key={index}
                            className="bg-white border border-[#2e5e99] rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                          >
                            <div className="flex items-start justify-between mb-3 sm:mb-4">
                              <h4 className="font-semibold text-gray-800 text-base sm:text-lg">{job.job_title}</h4>
                              <span className="bg-amber-100 text-amber-800 rounded-md px-3 py-1 text-xs sm:text-sm font-semibold transition-all duration-300 hover:bg-amber-200">
                                {job.match_score}%
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-600 mb-3 font-semibold">{job.reason}</p>
                            <div className="space-y-4">
                              {job.gaps && job.gaps.length > 0 && (
                                <div>
                                  <p className="text-xs font-semibold text-gray-700 mb-2">Areas for Improvement:</p>
                                  <div className="flex flex-wrap gap-2">
                                    {job.gaps.slice(0, 3).map((gap, idx) => (
                                      <span
                                        key={idx}
                                        className="text-xs bg-amber-100 text-amber-700 px-2 sm:px-3 py-1 rounded-full transition-all duration-200"
                                      >
                                        {gap}
                                      </span>
                                    ))}
                                    {job.gaps.length > 3 && (
                                      <span className="text-xs text-gray-500">+{job.gaps.length - 3} more</span>
                                    )}
                                  </div>
                                </div>
                              )}
                              {job.rationale && (
                                <p className="text-xs text-gray-500 italic pt-3 border-t border-emerald-200">{job.rationale}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default ConnectionTest;
