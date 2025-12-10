"use client";

import { useEffect, useState, useMemo } from "react";

const CATEGORY_MAP = {
  "Software Engineer": "https://edstack.onrender.com/software-engineering", 
  "Graduate Trainee": "https://edstack.onrender.com/Graduate-Engineering-Trainee",
  "Data Science": "https://edstack.onrender.com/data-science-and-Ml-ai", 
  "Internship" : "https://edstack.onrender.com/internship",
  "Devops" : "https://edstack.onrender.com/other-roles",
};

const SOURCES = Object.values(CATEGORY_MAP);

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [selectedLocation, setSelectedLocation] = useState("");
  const [maxStipend, setMaxStipend] = useState(null);

  useEffect(() => {
    fetchAll();
  }, []);

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
      const { max } = computeStipendRange(combined);
      setMaxStipend(max);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  const parseStipend = (s) => {
    if (!s) return 0;
    const str = String(s).toLowerCase();
    const match = str.match(/([\d.]+)\s*k/) || str.match(/([\d.]+)/);
    if (!match) return 0;
    let num = parseFloat(match[1]);
    if (str.includes("k") && num < 1000) num *= 1000;
    return Math.round(num);
  };

  const computeStipendRange = (list) => {
    const values = list.map((j) => parseStipend(j.Stipend)).filter((v) => v > 0);
    if (values.length === 0) return { min: 0, max: 0 };
    return { min: Math.min(...values), max: Math.max(...values) };
  };

  const getWhatsappLink = (job) => {
    const msg = `*Exciting Opportunity!* 🎉\n\n*${job.company}* is hiring off-campus!\n\nRole: ${job.Role}\nApply here: ${job.Link || "https://edstack.netlify.app"}\n\nStay updated → https://edstack.netlify.app`;
    return `https://wa.me/?text=${encodeURIComponent(msg)}`;
  };

  const availableLocations = useMemo(() => {
    const set = new Set(jobs.map((j) => (j.Loc || "Remote").trim()).filter(Boolean));
    return Array.from(set).sort();
  }, [jobs]);

  const stipendRange = useMemo(() => computeStipendRange(jobs), [jobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      if (query) {
        const q = query.toLowerCase();
        const inCompany = job.company?.toLowerCase().includes(q);
        const inRole = job.Role?.toLowerCase().includes(q);
        const inLoc = (job.Loc || "remote").toLowerCase().includes(q);
        if (!(inCompany || inRole || inLoc)) return false;
      }
      if (selectedCategories.size > 0 && !selectedCategories.has(job._category)) return false;
      if (selectedLocation && (job.Loc || "Remote") !== selectedLocation) return false;
      if (maxStipend != null && parseStipend(job.Stipend) > maxStipend) return false;
      return true;
    });
  }, [jobs, query, selectedCategories, selectedLocation, maxStipend]);

  const toggleCategory = (cat) => {
    const next = new Set(selectedCategories);
    next.has(cat) ? next.delete(cat) : next.add(cat);
    setSelectedCategories(next);
  };

  const clearFilters = () => {
    setSelectedCategories(new Set());
    setSelectedLocation("");
    setMaxStipend(stipendRange.max || 0);
  };

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

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="w-full mx-0 px-6">
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
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-8 mb-16 w-full">
          {/* Card 1 */}
          <FeatureCard
            title="Advance Resume Analyser"
            desc="2-step ATS check + score on 32 technical parameters"
            link="/ai-resume-analysis"
            cta="Get Started"
            cta2="Right Now"
          />
          {/* Card 2 */}
          <FeatureCard
            title="Generate Cover Letter"
            desc="AI-powered, job-specific cover letters that get shortlists"
            link="/cover-letter"
            cta="Create Now"
            cta2="Instantly"
          />
          {/* Card 3 - Coming Soon */}
          <FeatureCard
            title="AI Resume Builder"
            desc="Trained on 10,000+ Indian IT resumes • Coming soon"
            link="#"
            cta="Coming Soon"
            cta2="Almost Ready"
            comingSoon
          />
        </div>

        {/* Filters + Jobs Grid */}
        <div className="bg-white shadow-sm border border-gray-100 overflow-hidden">
          <div class="text-center bg-red-100 text-red-500 font-bold text-2xl p-1">
          Live Jobs
        </div>
          <div className="p-5">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar */}
              <aside className="lg:w-80 space-y-8">
                <div className="bg-gray-200 rounded-2xl p-6 border border-gray-200">
                  <h3 className="font-bold text-lg mb-5">Filters</h3>

                  {/* Categories */}
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-gray-700">Job Type</p>
                    {Object.keys(CATEGORY_MAP).map((cat) => (
                      <label key={cat} className="flex items-center gap-3 text-sm">
                        <input
                          type="checkbox"
                          checked={selectedCategories.has(cat)}
                          onChange={() => toggleCategory(cat)}
                          className="w-4 h-4 text-[#2e5e99] rounded focus:ring-[#2e5e99]"
                        />
                        <span>{cat}</span>
                      </label>
                    ))}
                  </div>

                  {/* Location */}
                  <div className="mt-6">
                    <label className="text-sm font-semibold text-gray-700">Location</label>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-500 focus:outline-none focus:ring-1 focus:ring-[#2e5e99]"
                    >
                      <option value="">All Locations</option>
                      {availableLocations.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
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
              </aside>

              {/* Main Content */}
              <main className="flex-1">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search company, role, or location..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-12 pr-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2e5e99] text-lg"
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
                      <JobCard key={`${job.company}-${i}`} job={job} getWhatsappLink={getWhatsappLink} />
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
    </div>
  );
}

// Reusable Feature Card
function FeatureCard({ title, desc, link, cta, cta2, comingSoon }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg border border-gray-100 transition-all">
      <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-[#7ba4d0]/70 blur-3xl"></div>
      
      <div className="relative">
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        <p className="mt-4 text-gray-600 leading-relaxed">{desc}</p>
      </div>

      <a
        href={link}
        className={`mt-8 inline-flex items-center gap-3 rounded-full px-7 py-3.5 font-medium transition-all ${
          comingSoon
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-[#0d2440] text-white hover:bg-[#1e3a5f] hover:shadow-xl hover:-translate-y-0.5"
        }`}
      >
        <span className="relative overflow-hidden">
          <span className="block transition-transform duration-300 group-hover:-translate-y-full">{cta}</span>
          <span className="absolute inset-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
            {cta2}
          </span>
        </span>
        {!comingSoon && (
          <svg className="w-5 h-5 transition-all group-hover:translate-x-1 group-hover:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        )}
      </a>
    </div>
  );
}

// Job Card (unchanged style you love)
function JobCard({ job, getWhatsappLink }) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-300 overflow-hidden">
      <div className="p-5">
        <div className="flex items-center gap-4 mb-4">
          <img
            className="w-14 h-14 rounded-lg object-cover ring-3 ring-gray-200"
            src={job.Logo?.trim() ? job.Logo : `https://via.placeholder.com/56x56/4F46E5/ffffff?text=${job.company[0]}`}
            alt={job.company}
            onError={(e) => (e.target.src = `https://via.placeholder.com/56x56/4F46E5/ffffff?text=${job.company[0]}`)}
          />
          <div>
            <h3 className="font-bold text-gray-900">{job.company}</h3>
            <p className="text-sm text-gray-600">{job.Role}</p>
          </div>
        </div>

        <div className="text-sm text-gray-600 space-y-2 mb-3">
          {/* Location */}
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-5 h-5">
              <path d="M12 2c-4.15 0-7.5 3.35-7.5 7.5 0 5.62 6.45 11.07 7.05 11.58a1 1 0 0 0 1.3 0c.6-.51 7.15-5.96 7.15-11.58C20 5.35 16.65 2 12 2zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
            </svg>
            <span>{job.Loc || "Remote"}</span>
          </div>

          {/* Batch */}
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-5 h-5">
              <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm.5-13h-1v6l5.25 3.15.5-.85-4.75-2.8V7z"/>
            </svg>
            <span>{job.Batch || "immediate"} +</span>
          </div>

          {/* Stipend */}
          <div className="font-semibold text-green-600 text-xl">
            ₹{job.Stipend || "Competitive"} LPA
          </div>
        </div>

        <div className="flex gap-3">
          <a
            href={job.Link}
            target="_blank"
            rel="noopener noreferrer"
            className="border relative py-2 px-8 text-black text-base font-bold overflow-hidden bg-white rounded-4xl transition-all duration-200 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-700 before:to-blue-400 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
          >
            Apply Now
          </a>
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