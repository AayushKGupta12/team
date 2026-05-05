"use client";

import { useEffect, useState, useMemo } from "react";
import { useAuth, useClerk, useUser } from "@clerk/nextjs";
import { consumeCredit } from "../../lib/consumeCredit"; // ✅ ENABLE THIS
import CreditUsedToast from "./CreditUsedToast";




const API_BASE = process.env.NEXT_PUBLIC_API_URL;

const CATEGORY_MAP = {
  "Software Engineer": `${API_BASE}/software-engineering`,
};


const SOURCES = Object.values(CATEGORY_MAP);

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const { user } = useUser();
  const [showToast, setShowToast] = useState(false);

  // New dynamic filters
  const [selectedDomains, setSelectedDomains] = useState(new Set());
  const [selectedRoles, setSelectedRoles] = useState(new Set());
  const [selectedCompanies, setSelectedCompanies] = useState(new Set());
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedStipendRange, setSelectedStipendRange] = useState(""); // e.g., "0-200000"

  // Clerk
  const { isSignedIn } = useAuth();
  const clerk = useClerk();
  const [pendingApplyLink, setPendingApplyLink] = useState(null);

  useEffect(() => {
    fetchAll();
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  // When user signs in and there was a pending apply link, open it
  useEffect(() => {
  const continueAfterLogin = async () => {
    if (isSignedIn && pendingApplyLink && user) {
      setShowToast(true);

      const usage = await consumeCredit(user.id, "job_apply");

      if (!usage.allowed) {
        alert("You have reached your job application limit. Please upgrade.");
        setPendingApplyLink(null);
        return;
      }

      window.open(pendingApplyLink, "_blank", "noopener,noreferrer");
      setPendingApplyLink(null);
    }
  };

  continueAfterLogin();
}, [isSignedIn, pendingApplyLink, user]);


  const fetchAll = async () => {
    try {
      setLoading(true);
      const responses = await Promise.all(
        SOURCES.map((url) =>
          fetch(url)
            .then((r) => (r.ok ? r.json() : {}))
            .catch(() => ({}))
        )
      );

      const combined = [];
      responses.forEach((res, idx) => {
        const categoryName = Object.keys(CATEGORY_MAP).find(
          (k) => CATEGORY_MAP[k] === SOURCES[idx]
        );
        Object.keys(res || {}).forEach((company) => {
          combined.push({ company, ...res[company], _category: categoryName });
        });
      });

      setJobs(combined);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  

  

  // const parseStipend = (s) => {
  //   if (!s) return 0;
  //   const str = String(s).toLowerCase();
  //   const match = str.match(/([\d.]+)\s*lpa/) || str.match(/([\d.]+)\s*k/) || str.match(/([\d.]+)/);
  //   if (!match) return 0;
  //   let num = parseFloat(match[1]);
  //   if (str.includes("k") && !str.includes("lpa") && num < 1000) num *= 1000;
  //   if (str.includes("lpa")) num *= 100000;
  //   return Math.round(num);
  // };

  const getWhatsappLink = (job) => {
  const msg = `*Exciting Off-Campus Opportunity!*

  *${job.company}* is hiring

  *Role:* ${job.Role}
  *Stipend/CTC:* ${job.Stipend || "Not disclosed"}
  *Eligible Batch:* ${job.Batch || "Check official notification"}

  *Apply here:* ${job.Link || "https://Tauzand.in"}

  Stay updated with latest IT jobs → https://Tauzand.in`;

    return `https://wa.me/?text=${encodeURIComponent(msg)}`;
  };


  // Dynamic filter options derived from fetched jobs
  const availableLocations = useMemo(() => {
    const set = new Set(jobs.map((j) => (j.Loc || "Remote").trim()).filter(Boolean));
    return Array.from(set).sort();
  }, [jobs]);

  const availableDomains = useMemo(() => {
    const set = new Set(jobs.map((j) => j._category).filter(Boolean));
    return Array.from(set).sort();
  }, [jobs]);

  const availableRoles = useMemo(() => {
    const set = new Set(jobs.map((j) => j.Role).filter(Boolean));
    return Array.from(set).sort();
  }, [jobs]);

  const availableCompanies = useMemo(() => {
    const set = new Set(jobs.map((j) => j.company).filter(Boolean));
    return Array.from(set).sort();
  }, [jobs]);

  // Stipend ranges: 0–2L, 2L–4L, ..., up to >10L (in rupees)
  const stipendRanges = useMemo(() => {
    const ranges = [];
    for (let low = 0; low < 10000000; low += 200000) {
      const high = low + 200000;
      ranges.push({
        label: low === 0 ? "₹0 - ₹2 Lakh" : `₹${low / 100000} - ₹${high / 100000} Lakh`,
        value: `${low}-${high}`,
        low,
        high,
      });
    }
    ranges.push({
      label: "> ₹10 Lakh",
      value: "10000000+",
      low: 10000000,
      high: Infinity,
    });
    return ranges;
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      if (query) {
        const q = query.toLowerCase();
        const inCompany = job.company?.toLowerCase().includes(q);
        const inRole = job.Role?.toLowerCase().includes(q);
        const inLoc = (job.Loc || "remote").toLowerCase().includes(q);
        if (!(inCompany || inRole || inLoc)) return false;
      }

      if (selectedDomains.size > 0 && !selectedDomains.has(job._category)) return false;
      if (selectedRoles.size > 0 && !selectedRoles.has(job.Role)) return false;
      if (selectedCompanies.size > 0 && !selectedCompanies.has(job.company)) return false;
      if (selectedLocation && (job.Loc || "Remote") !== selectedLocation) return false;

      if (selectedStipendRange) {
        const stipend = parseStipend(job.Stipend);
        if (selectedStipendRange === "10000000+") {
          if (stipend < 10000000) return false;
        } else {
          const [low, high] = selectedStipendRange.split("-").map(Number);
          if (stipend < low || stipend >= high) return false;
        }
      }

      return true;
    });
  }, [jobs, query, selectedDomains, selectedRoles, selectedCompanies, selectedLocation, selectedStipendRange]);

  // Example for Domain
{availableDomains.map((domain) => (
  <label key={domain} className="flex items-center gap-3 text-sm">
    <input
      type="checkbox"
      checked={selectedDomains.has(domain)}
      onChange={() =>
        setSelectedDomains((prev) => {
          const next = new Set(prev);
          if (next.has(domain)) next.delete(domain);
          else next.add(domain);
          return next;
        })
      }
      className="w-4 h-4 text-[#2e5e99] rounded focus:ring-[#2e5e99]"
    />
    <span>{domain}</span>
  </label>
))}

  const clearFilters = () => {
    setSelectedDomains(new Set());
    setSelectedRoles(new Set());
    setSelectedCompanies(new Set());
    setSelectedLocation("");
    setSelectedStipendRange("");
  };

// ✅ Proper Credit + Clerk Apply Flow
const handleApply = async (e, job) => {
  e.preventDefault();
  const link = job.Link;
  if (!link) return;

  // 🔐 If not signed in → open login first
  if (!isSignedIn) {
    setPendingApplyLink(link);
    clerk.openSignIn();
    return;
  }

  if (!user) return;

  try {
    // 💳 Show credit toast
    setShowToast(true);

    const usage = await consumeCredit(user.id, "job_apply");

    if (!usage.allowed) {
      alert("You have reached your job application limit. Please upgrade.");
      return;
    }

    // ✅ Credit successful → open job link
    window.open(link, "_blank", "noopener,noreferrer");

  } catch (err) {
    console.error("Error consuming credit:", err);
  }
};


  useEffect(() => {
    if (isSignedIn && pendingApplyLink) {
     setPendingApplyLink(null);
      window.open(pendingApplyLink, "_blank", "noopener,noreferrer");
    }
  }, [isSignedIn, pendingApplyLink]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center">
        <div className="text-2xl font-semibold text-gray-700 mb-6">
          Loading fresh opportunities...
        </div>

        <div className="loader">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }

  const toggleSet = (setState, value) => {
  setState((prev) => {
    const next = new Set(prev);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    return next;
  });
};


  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="w-full mx-0">
        {/* Dynamic Premium Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-[#0d2440] leading-tight">
            Fresh Off-Campus Jobs
          </h1>
          <p className="mt-4 text-xl text-gray-600 font-medium">
            Handpicked roles for recent undergrads • Updated daily
          </p>
        </div>

        {/* Feature Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-8 mb-16 w-full px-6">
          <FeatureCard
            title="Advance Resume Analyser"
            desc="2-step ATS check + score on 32 technical parameters"
            link="/ai-resume-analysis"
            cta="Get Started"
            cta2="Right Now"
          />
          <FeatureCard
            title="Generate Cover Letter"
            desc="AI-powered, job-specific cover letters that get shortlists"
            link="/cover-letter"
            cta="Create Now"
            cta2="Instantly"
          />
          <FeatureCard
            title="AI Resume Builder"
            desc="Trained on 10,000+ Indian IT resumes • Coming soon"
            link="#"
            cta="Coming Soon"
            cta2="Almost Ready"
          />
        </div>

        {/* Filters + Jobs Grid */}
        <div className="bg-white shadow-sm border border-gray-100 overflow-hidden">
          <div className="text-center bg-red-100 text-red-500 font-bold text-2xl p-1">
            Live Jobs
          </div>
          <div className="p-5">
            <div className="flex flex-col lg:flex-row gap-8">
              <aside className="lg:w-80 space-y-8">
                <div className="bg-gray-200 text-black rounded-2xl p-6 border border-gray-200">
                  <h3 className="font-bold text-lg mb-5">Filters</h3>

                  {/* Role Filter */}
                  <div className="mt-6 space-y-3">
                    <p className="text-sm font-semibold text-gray-700">Role</p>
                    {availableRoles.map((role) => (
                      <label key={role} className="flex items-center gap-3 text-sm">
                        <input
                          type="checkbox"
                          checked={selectedRoles.has(role)}
                          onChange={() => toggleSet(setSelectedRoles, role)}
                          className="w-4 h-4 text-[#2e5e99] rounded focus:ring-[#2e5e99]"
                        />
                        <span>{role}</span>
                      </label>
                    ))}
                  </div>

                  {/* Location Filter */}
                  <div className="mt-6">
                    <label className="text-sm font-semibold text-gray-700">Location</label>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="mt-2 w-full sm:w-72 px-4 py-3 rounded-xl border border-gray-500 focus:outline-none focus:ring-1 focus:ring-[#2e5e99]"
                    >
                      <option value="">All Locations</option>
                      {availableLocations.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>

                  {/* Stipend Range Filter */}
                  <div className="mt-6">
                    <label className="text-sm font-semibold text-gray-700">
                      Stipend / Salary (per annum)
                    </label>
                    <select
                      value={selectedStipendRange}
                      onChange={(e) => setSelectedStipendRange(e.target.value)}
                      className="mt-2 w-full sm:w-72 px-4 py-3 rounded-xl border border-gray-500 focus:outline-none focus:ring-1 focus:ring-[#2e5e99] mr-3"
                    >
                      <option value="">All Ranges</option>
                      {stipendRanges.map((range) => (
                        <option key={range.value} value={range.value}>
                          {range.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={clearFilters}
                    className="mt-6 w-full text-white py-3 rounded-xl bg-[#0d2440] font-medium transition"
                  >
                    Clear All Filters
                  </button>
                </div>

                <div className="mt-6 w-full max-w-2xl mx-auto">
                  {/* Toggle Button */}
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex items-center justify-between px-6 py-4 bg-red-200/75 rounded-xl hover:border-red-500 transition-colors duration-200 shadow-sm"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 border border-red-300 bg-white rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-red-300" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Job Application Notice</p>
                        <p className="text-xs text-gray-600">Application deadlines may change</p>
                      </div>
                    </div>
                    <svg 
                      className={`w-4 h-4 text-red-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Content */}
                  <div
                    className={`overflow-hidden bg-white border border-red-300/20 rounded-xl shadow-md transition-all duration-300 ease-in-out ${
                      isOpen
                        ? 'mt-2 max-h-auto border-red-400'
                        : 'max-h-0 mt-0'
                    }`}
                  >
                    <div className="p-3">
                      <div className="flex items-start space-x-4">
                        <div className="flex-1 pt-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">Positions may close without notice</h3>
                          <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                            Job openings can be filled anytime. Apply promptly to avoid missing opportunities.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>

              <main className="flex-1">
                <div className="relative w-full text-gray-300">
                  <input
                    type="text"
                    placeholder="Search company, role, or location..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-12 pr-5 py-4 rounded-xl border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2e5e99] text-lg text-gray-600"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 30 30"
                    fill="#6B7280"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
                  >
                    <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"/>
                  </svg>
                </div>

                {filteredJobs.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
                    {filteredJobs.map((job, i) => (
                      <JobCard key={`${job.company}-${i}`} job={job} getWhatsappLink={getWhatsappLink} onApply={handleApply} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-24">
                    <p className="text-2xl font-semibold text-gray-600">No jobs found</p>
                    <p className="mt-3 text-gray-500">Try adjusting your filters</p>
                  </div>
                )}
              </main>
            </div>
          </div>
        </div>
      </div>
      
      <CreditUsedToast
        show={showToast}
        onClose={() => setShowToast(false)}
      />

    </div>
  );
}

function FeatureCard({ title, desc, link, cta, cta2 }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg border border-gray-100 transition-all">
      <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-[#7ba4d0]/70 blur-3xl"></div>

      <div className="relative">
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        <p className="mt-4 text-gray-600 leading-relaxed">{desc}</p>
      </div>

      <a
        href={link}
        className="mt-8 inline-flex items-center gap-3 rounded-full px-7 py-3.5 font-medium transition-all bg-[#0d2440] text-amber-50" >
        <span className="relative overflow-hidden">
          <span className="block transition-transform duration-300 group-hover:-translate-y-full">{cta}</span>
          <span className="absolute inset-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
            {cta2}
          </span>
        </span>
          <svg className="w-5 h-5 transition-all group-hover:translate-x-1 group-hover:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
      </a>
    </div>
  );
}

function JobCard({ job, getWhatsappLink, onApply }) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-300 overflow-hidden">
      <div className="p-5">
        <div className="flex items-center gap-4 mb-4">
          <img
            className="w-14 h-14 rounded-lg object-cover"
            src={job.Logo?.trim() ? job.Logo : `https://via.placeholder.com/56x56/4F46E5/ffffff?text=${job.company[0]}`}
            alt={job.company}
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              target.src = `https://via.placeholder.com/56x56/4F46E5/ffffff?text=${job.company[0]}`;
            }}
          />
          <div>
            <h3 className="font-bold text-gray-900">{job.company}</h3>
            <p className="text-sm text-gray-600">{job.Role}</p>
          </div>
        </div>

        <div className="text-sm text-gray-600 space-y-2 mb-3">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5">
              <path d="M12 2c-4.15 0-7.5 3.35-7.5 7.5 0 5.62 6.45 11.07 7.05 11.58a1 1 0 0 0 1.3 0c.6-.51 7.15-5.96 7.15-11.58C20 5.35 16.65 2 12 2zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
            </svg>
            <span>{job.Loc || "Remote"}</span>
          </div>

          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5">
              <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm.5-13h-1v6l5.25 3.15.5-.85-4.75-2.8V7z"/>
            </svg>
            <span>{job.Batch || "immediate"} +</span>
          </div>

          <div className="font-semibold text-green-600 text-xl">
            {formatSalary(job.Stipend)}
          </div>

          
        </div>

        <div className="flex gap-3">
          <button
            onClick={(e) => onApply(e, job)}
            className="border relative py-2 px-8 text-black text-base font-bold overflow-hidden bg-white rounded-4xl transition-all duration-200 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-700 before:to-blue-400 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
          >
            Apply Now
          </button>

          <a
            href={getWhatsappLink(job)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-lg "
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-11 h-11" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Jobs;


// ================= SALARY UTILS =================

// Convert any stipend to annual number (for filtering)
const parseStipend = (raw) => {
  if (!raw) return 0;

  const str = String(raw).toLowerCase();

  // Competitive or text
  if (str.includes("competitive")) return 0;

  const amount = Number(str.replace(/[^\d.]/g, ""));
  if (!amount || isNaN(amount)) return 0;

  // Internship → convert monthly to annual
  if (amount < 250000) {
    return amount * 12;
  }

  return amount;
};

// Format salary for UI
const formatSalary = (raw) => {
  if (!raw) return "Competitive";

  const str = String(raw).toLowerCase();

  if (str.includes("competitive")) return "Competitive";

  const amount = Number(str.replace(/[^\d.]/g, ""));
  if (!amount || isNaN(amount)) return "Competitive";

  // Internship (Monthly)
  if (amount < 250000) {
    return `${amount} per month`;
  }

  // Full-time (Annual)
  const lpa = amount / 100000;
  return `${Number.isInteger(lpa) ? lpa : lpa.toFixed(1)} LPA`;
};