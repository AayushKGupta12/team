'use client'
import { useState } from 'react';
import { Upload, FileText, Loader2, Download, Copy, Check } from 'lucide-react';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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

  // Your Flask backend URL - update this to your actual backend URL
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
      if (err.message.includes('fetch')) {
        setError('Cannot connect to backend. Make sure Flask server is running on http://localhost:5000');
      } else {
        setError(err.message);
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

      setCoverLetter(data.cover_letter);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(coverLetter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError('Failed to copy to clipboard');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([coverLetter], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cover-letter-${company.replace(/\s+/g, '-')}.txt`;
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


  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-amber-200 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-5 mt-18">
            Perfect cover letters, instantly.
          </h1>
          <p className="text-gray-600">
            Your perfect cover letter, crafted in seconds.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column - Upload & Input */}
          <div className="space-y-6">
            {/* Step 1: Upload Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                  1
                </div>
                <h2 className="text-xl font-bold text-[#0d2440]">Upload Resume</h2>
              </div>
              
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
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
                    <FileText className="w-12 h-12 text-gray-700" />
                    <span className="text-sm text-gray-700">
                      {file ? file.name : 'Click to upload PDF'}
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
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-sm text-green-800 flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      Resume uploaded successfully
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Step 2: Job Details Section */}
            <div className={`bg-white rounded-lg shadow-md p-6 transition-opacity ${!isResumeUploaded ? 'opacity-50' : ''}`}>
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-10 h-10 ${isResumeUploaded ? 'bg-blue-600' : 'bg-gray-400'} text-white rounded-full flex items-center justify-center font-semibold`}>
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
                    className="w-full px-3 py-2 border text-gray-500 border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                    className="w-full px-3 py-2 border text-gray-500 border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                <button
                  onClick={handleGenerateCoverLetter}
                  disabled={!isResumeUploaded || !jobTitle || !company || isGenerating}
                  className="w-full bg-[#0d2440] text-white py-3 px-4 rounded-lg hover:bg-[#2e5e99] disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold transition-colors"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Building
                    </>
                  ) : (
                    'Build My Cover Letter Now'
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Output + PDF Preview + PDF Download */}
<div className="bg-white rounded-lg shadow-md p-6">

  <div className="flex items-center justify-between">
    <h2 className="text-xl font-bold text-[#0d2440]">Professional Cover Letter is Ready </h2>
    


    {coverLetter && (
      <div className="flex gap-2">
        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          title="Copy to clipboard"
        >
          {copied ? <Check className="w-6 h-6 text-green-600" /> : <Copy className="w-5 h-5" />}
        </button>

        {/* PDF Download Button */}
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

  {/* PDF-Friendly Preview Box */}
  <div className="min-h-[500px] max-h-[600px] overflow-y-auto bg-gray-50">
    {coverLetter ? (
      <div
        id="pdf-content"
        className="border-1 w-full mx-auto rounded-md text-black"
        style={{
          padding: "10px",
          fontSize: "11px",
          lineHeight: "16px",
        }}
      >
        <h1 className="text-4xl font-bold mb-4 mt-3 text-center font-sans text-[#0d2440]">Cover Letter</h1>
        <hr className="border-t-3 border-[#2e5e99] my-4" />
        <br />
        <pre
          className="whitespace-pre-wrap"
          style={{ fontSize: "10px", lineHeight: "15px" }}
        >
          {coverLetter}
        </pre>
        <br />
        <hr className="border-t-3 border-[#2e5e99] my-4" />
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center h-full text-gray-400 mt-50">
        <FileText className="w-18 h-18 mb-4" />
        <p className="text-center">
          {isGenerating ? "Building your cover letter..." : "Your cover letter will appear here"}
        </p>
      </div>
    )}
  </div>
</div>
        </div>
      </div>
    </div>
  );
}