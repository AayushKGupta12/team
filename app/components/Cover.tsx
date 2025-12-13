'use client'
import { useState, useRef, useEffect } from 'react';
import { Upload, FileText, Loader2, Download, Copy, Check } from 'lucide-react';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useAuth, useClerk } from "@clerk/nextjs";


export default function CoverLetterGenerator() {
  const [file, setFile] = useState(null);
  const [isResumeUploaded, setIsResumeUploaded] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);


  // Clerk Auth
  const { isSignedIn } = useAuth();
  const clerk = useClerk();
  const [pendingCoverLetter, setPendingCoverLetter] = useState(false);

  useEffect(() => {
  if (isSignedIn && pendingCoverLetter) {
    setPendingCoverLetter(false);
    handleGenerateCoverLetter();
  }
  }, [isSignedIn, pendingCoverLetter]);



  // Refs for uncontrolled editing
  const editableRef = useRef(null);
  const isEditingRef = useRef(false);
  const latestHtmlRef = useRef(''); // track latest html while editing

  // Your Flask backend URL - update if needed
  const API_BASE_URL = 'https://edstack.onrender.com';

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError('');
    } else {
      setError('Please select a valid PDF file');
      setFile(null);
    }
  };

  const handleUploadResume = async () => {
    if (!file) {
      setError('Please select a PDF file first');
      return;
    }

    setIsUploading(true);
    setError('');
    setIsResumeUploaded(false);

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const response = await fetch(`${API_BASE_URL}/upload-resume`, {
        method: 'POST',
        body: formData,
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Backend server not responding correctly. Make sure Flask is running on port 5000.');
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload resume');
      }

      setIsResumeUploaded(true);
      setError('');
    } catch (err) {
      if (err.message && err.message.includes('fetch')) {
        setError('Cannot connect to backend');
      } else {
        setError(err.message || 'Failed to upload resume');
      }
      setIsResumeUploaded(false);
    } finally {
      setIsUploading(false);
    }
  };

  const handleGenerateCoverLetter = async () => {
    if (!isResumeUploaded) {
      setError('Please upload your resume first');
      return;
    }

    if (!jobTitle || !company) {
      setError('Please enter both job title and company name');
      return;
    }

    setIsGenerating(true);
    setError('');
    setCoverLetter('');

    try {
      const response = await fetch(`${API_BASE_URL}/cover`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          job_title: jobTitle,
          company: company,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate cover letter');
      }

      // store HTML safe version (backend should send plain text or simple HTML)
      const newHtml = data.cover_letter ?? data.coverLetter ?? data.cover_letter_html ?? String(data.cover_letter || '');
      setCoverLetter(newHtml);

      // If not editing, update the editable area directly:
      if (editableRef.current && !isEditingRef.current) {
        editableRef.current.innerHTML = newHtml;
        latestHtmlRef.current = newHtml;
      }
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to generate cover letter');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    try {
      // copy plain text to clipboard
      const text = editableRef.current ? editableRef.current.innerText : coverLetter;
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError('Failed to copy to clipboard');
    }
  };

  const handleDownload = () => {
    const text = editableRef.current ? editableRef.current.innerText : coverLetter;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cover-letter-${(company || 'company').replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadPDF = async () => {
    const element = document.getElementById("pdf-content");
    const canvas = await html2canvas(element, {
      scale: 2,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "pt", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("CoverLetter.pdf");
  };

  // Keep editableRef in sync with coverLetter when not editing
  useEffect(() => {
    if (!editableRef.current) return;
    if (!isEditingRef.current) {
      // Only overwrite when user isn't actively editing
      editableRef.current.innerHTML = coverLetter ?? '';
      latestHtmlRef.current = coverLetter ?? '';
    }
  }, [coverLetter]);

  // onFocus -> mark editing started
  const handleFocus = () => {
    isEditingRef.current = true;
  };

  // onInput -> update latestHtmlRef but DO NOT set React state each keystroke
  const handleInput = (e) => {
    latestHtmlRef.current = editableRef.current ? editableRef.current.innerHTML : e.currentTarget.innerHTML;
  };

  // onBlur -> user stopped editing, sync to React state
  const handleBlur = () => {
    isEditingRef.current = false;
    const newHtml = latestHtmlRef.current ?? (editableRef.current ? editableRef.current.innerHTML : '');
    setCoverLetter(newHtml);
  };

  // handle paste -> force plain-text paste (preserve newlines). This prevents messy markup from external sources.
  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
  e.preventDefault();

  // Always safe in React
  const text = e.clipboardData.getData("text");

  // Escape HTML and preserve line breaks
  const escaped = text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\n", "<br/>");

  // Insert HTML at caret position
  if (document.queryCommandSupported("insertHTML")) {
    document.execCommand("insertHTML", false, escaped);
  } else {
    if (editableRef.current) {
      editableRef.current.innerHTML += escaped;
    }
  }

  latestHtmlRef.current = editableRef.current
    ? editableRef.current.innerHTML
    : escaped;
};


  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 via-white to-amber-100 p-4 sm:p-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Professional CV, Built in Seconds
          </h1>
          <p className="mt-2 text-xl text-gray-600 max-w-3xl mx-auto">
            Upload your resume. Enter the job. Get a perfect ATS-friendly cover letter instantly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column - Upload & Input */}
          <div className="space-y-6">
            {/* Step 1: Upload Section */}
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-[#7ba4d0] border-2 border-[#0d2440] text-white rounded-full flex items-center justify-center font-semibold">
                  1
                </div>
                <h2 className="text-xl font-bold text-[#0d2440]">Upload Resume</h2>
              </div>
              
              <div className="space-y-4">
                <div className="hover:scale-102 transition duration-200 border-2 border-dashed border-gray-400 rounded-lg p-6 text-center hover:border-[#7ba4d0] bg-blue-50/30">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label
                    htmlFor="resume-upload"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <FileText className="w-12 h-12 text-[#0d2440]" />
                    <span className="text-sm text-gray-700">
                      {file ? file.name : 'Click to upload PDF'}
                      <p className="text-sm text-gray-500 mt-2">Max 5MB • PDF only</p>
                    </span>
                  </label>
                </div>

                <button
                  onClick={handleUploadResume}
                  disabled={!file || isUploading}
                  className="w-full bg-[#0d2440] text-white py-2 px-4 rounded-lg hover:bg-[#185196] disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 cursor-pointer">
                        <Upload className="w-4 h-4 text-gray-50 font-bold" />
                        <span className="text-gray-50 font-bold">Upload Resume</span>
                      </div>
                    </>
                  )}
                </button>

                {isResumeUploaded && (
                  <div className="bg-green-100 border border-green-300 rounded-lg p-3">
                    <p className="text-sm text-green-950 flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      Resume uploaded successfully
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Step 2: Job Details Section */}
            <div className={`bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-gray-200 transition-all ${!isResumeUploaded ? 'opacity-50' : ''}`}>
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-10 h-10 ${isResumeUploaded ? 'bg-[#7ba4d0] border-2 border-[#0d2440]' : 'bg-gray-400'} text-white rounded-full flex items-center justify-center font-semibold`}>
                  2
                </div>
                <h2 className="text-xl font-semibold text-[#0d2440]">Enter Job Details</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Title*
                  </label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g, Senior Software Engineer"
                    disabled={!isResumeUploaded}
                    className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-[#7ba4d0] focus:border-[#7ba4d0] disabled:bg-gray-100 disabled:cursor-not-allowed bg-white/70"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g, Microsoft"
                    disabled={!isResumeUploaded}
                    className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-[#7ba4d0] focus:border-[#7ba4d0] disabled:bg-gray-100 disabled:cursor-not-allowed bg-white/70"
                  />
                </div>

                <button
                  onClick={() => {
                    if (!isResumeUploaded || !jobTitle || !company) {
                      return;
                    }

                    if (isSignedIn) {
                      handleGenerateCoverLetter();
                    } else {
                      setPendingCoverLetter(true);
                      try {
                        clerk.openSignIn();
                      } catch {
                        window.location.href = "/sign-in";
                      }
                    }
                  }}
                  disabled={!isResumeUploaded || !jobTitle || !company || isGenerating}
                  className="w-full bg-[#0d2440] text-white py-3 px-4 rounded-lg hover:bg-[#2e5e99] disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold transition-colors"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Building
                    </>
                  ) : (
                    "Build My Cover Letter Now"
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Output + PDF Preview + PDF Download */}
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-3 border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="border-b border-gray-200 px-2 mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 ${
                      isResumeUploaded ? "bg-[#7ba4d0] border-2 border-[#0d2440]" : "bg-gray-400"
                    } text-white rounded-full flex items-center justify-center font-semibold`}
                  >
                    3
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900">
                    Your Cover Letter
                  </h2>
                </div>
              </div>

              {coverLetter && (
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Copy to clipboard"
                  >
                    {copied ? <Check className="w-6 h-6 text-green-600" /> : <Copy className="w-5 h-5" />}
                  </button>

                  <button
                    onClick={downloadPDF}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Download PDF"
                  >
                    <Download className="w-6 h-6 mb-2" />
                  </button>
                </div>
              )}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <div className="min-h-[500px] max-h-[600px] overflow-y-auto bg-gradient-to-b from-blue-50/50 to-pink-50/30 rounded-lg border border-gray-200">
              {coverLetter ? (
                <div
                  id="pdf-content"
                  className="border-1 w-full mx-auto text-black bg-white"
                  style={{
                    padding: "18px",
                    fontSize: "11.5px",
                    lineHeight: "18px",
                    fontFamily: "Arial, Helvetica, sans-serif",
                  }}
                >
                  <h1 className="text-4xl font-bold mt-3 text-center font-serif text-[#0d2440] mb-8">Cover Letter</h1>
                  <hr className="h-px border-[#2e5e99] mt-4 mb-8" />
                  
                  <div
                    ref={editableRef}
                    contentEditable
                    suppressContentEditableWarning
                    onInput={handleInput}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    onPaste={handlePaste}
                    className="whitespace-pre-wrap text-left mb-8"
                    style={{
                      fontSize: "11.5px",
                      lineHeight: "18px",
                      fontFamily: "Arial, Helvetica, sans-serif",
                    }}
                  />
                </div>
              ) : (
                <div className="text-center py-28 text-gray-400">
                  <div className="text-center py-32 text-gray-400">
                    <FileText className="w-20 h-20 mx-auto mb-6 opacity-40" />
                    <p className="text-xl font-medium text-gray-600">
                      {isGenerating ? 'Generating your cover letter...' : 'Your cover letter will appear here'}
                      <p className="text-gray-500 mt-3">Fully editable after generation</p>
                      {isGenerating && (
                        <div className="flex justify-center mb-6 mt-4">
                          <div className="w-7 h-7 border-4 border-[#0d2440] border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}