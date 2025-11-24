"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

function Jobs3() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:5000/data-science-and-Ml-ai");
      const jsonData = await response.json();

      const companyJobs = Object.keys(jsonData || {}).map((company) => ({
        company,
        ...jsonData[company],
      }));

      setJobs(companyJobs);
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const hasContent = jobs.length > 0;

  const getWhatsappLink = (job) => {
    const msg = `*Exciting Opportunity!*\n\n*${job.company}* is hiring!\nThey’ve opened up _off-campus recruitment_\n\nVisit their site: ${job.Link || "https://edstack.netlify.app"}\n\n━━━━━━━━━━━━━━━━━━━━━━━\nStay updated with IT Jobs, Internships & Tech News\nhttps://edstack.netlify.app`;
    return `https://wa.me/?text=${encodeURIComponent(msg)}`;
  };

  if (loading) {
    return (
      <div className="px-4 py-6 min-h-screen flex items-center justify-center bg-[#e7f0fa]">
        <div className="text-gray-500 text-lg font-semibold">Loading jobs...</div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 bg-gray-50">
      {/* Main Container */}
      <div
        className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#0d2440] shadow-2xl cursor-pointer select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 text-white">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
             Data Science & ML Jobs
          </h2>
          <motion.div
            animate={{ rotate: isHovered ? 180 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <ChevronDown className="w-8 h-8" />
          </motion.div>
        </div>

        {/* Expandable Body – No fixed height when collapsed */}
        <motion.div
          initial={false}
          animate={{
            height: isHovered ? "auto" : "auto", // let content decide the height
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="bg-white"
          style={{ borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }}
        >
          <div className="p-6 pt-2 pb-8"> {/* extra pb-8 to give breathing room */}

            {/* Collapsed: Show only first 4 */}
            {!isHovered && hasContent && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {jobs.slice(0, 4).map((job, index) => (
                  <Card key={index} job={job} getWhatsappLink={getWhatsappLink} />
                ))}
              </div>
            )}

            {/* Expanded: Show all */}
            <AnimatePresence>
              {isHovered && hasContent && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6"
                >
                  {jobs.map((job, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card job={job} getWhatsappLink={getWhatsappLink} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Empty state */}
            {!hasContent && (
              <div className="py-24 text-center text-gray-600">
                <p className="text-xl font-medium">No jobs available right now</p>
                <p className="mt-2">Check back soon!</p>
              </div>
            )}
          </div>
        </motion.div>

        </div>
    </div>
  );
}

/* Extracted Card Component – keeps code clean */
function Card({ job, getWhatsappLink }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
      <div className="p-5">
        <div className="flex items-center space-x-4 mb-4">
          <img
            className="w-14 h-14 rounded-lg object-cover ring-2 ring-gray-100 shadow-md"
            src={
              job.Logo && typeof job.Logo === "string" && job.Logo.trim() !== ""
                ? job.Logo
                : `https://via.placeholder.com/56x56/4F46E5/ffffff?text=${encodeURIComponent(job.company.charAt(0))}`
            }
            alt={`${job.company} logo`}
            loading="lazy"
            onError={(e) => (e.currentTarget.src = `https://via.placeholder.com/56x56/4F46E5/ffffff?text=${encodeURIComponent(job.company.charAt(0))}`)}
          />
          <div className="min-w-0">
            <h3 className="font-bold text-gray-900 line-clamp-1">{job.company}</h3>
            <p className="text-sm text-gray-600 line-clamp-1">{job.Role}</p>
          </div>
        </div>

        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div>Location {job.Loc || "Remote"}</div>
          <div>Batch: {job.Batch || "N/A"}</div>
          <div className="font-bold text-green-600 text-lg">{job.Stipend || "Not specified"}</div>
        </div>

        <div className="flex gap-3">
          <a
            href={job.Link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center rounded-lg font-medium text-sm transition shadow-sm hover:shadow-md flex items-center justify-center gap-1"
          >
            Apply Now
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          <a
            href={getWhatsappLink(job)}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-green-100 rounded-lg hover:bg-green-200 transition"
          >
            <img
              src="https://img.logo.dev/whatsapp.com?token=pk_djKZ3gIOQqyja8btgxBpBA"
              alt="WhatsApp"
              className="w-8 h-8"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Jobs3;