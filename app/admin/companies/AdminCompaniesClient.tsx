"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase-client";
import Footer from "../../components/Footer";

/* -------------------- TYPES -------------------- */

type Company = {
  id: string;
  company_name: string;
  role: string;
};

type FormState = {
  company_name: string;
  domain: string;
  role: string;
  stipend: string;
  location: string;
  batch: string;
  link: string;
};

/* -------------------- CONSTANTS -------------------- */

const LOCATION_OPTIONS = [
  "Pan India",
  "Ahmedabad",
  "Bhubaneswar",
  "Chennai",
  "Delhi",
  "Goa",
  "Bangalore",
  "Gurugram",
  "Hybrid",
  "Hyderabad",
  "Mumbai",
  "Mysore",
  "Other",
  "Pune",
  "Remote",
];

const ROLE_OPTIONS = [
  "AI Engineer",
  "Backend Developer",
  "Blockchain Developer",
  "Business Analyst",
  "Cloud Engineer",
  "Content Strategist",
  "Cybersecurity Analyst",
  "Data Analyst",
  "Data Engineer",
  "Data Scientist",
  "Database Administrator",
  "DevOps Engineer",
  "Digital Marketing Analyst",
  "Embedded Systems Engineer",
  "Frontend Developer",
  "Full Stack Developer",
  "HR Tech Specialist",
  "IT Tech Executive",
  "Machine Learning Engineer",
  "Mobile Developer",
  "Product Designer",
  "Product Manager",
  "Quality Analyst",
  "Sales Engineer",
  "SEO Specialist",
  "Software Developer",
  "Software Engineer",
  "Systems Administrator",
  "Technical Support Engineer",
  "Technical Writer",
  "UI/UX Designer",
];

const BATCH_OPTIONS = [
  "2029 Batch",
  "2028 Batch",
  "2027 Batch",
  "2026 Batch",
  "2025 Batch",
  "2024 Batch",
  "2023 Batch",
  "2022 Batch",
  "2021 Batch",
  "2020 Batch",
  "1 Year Experience",
  "2 Years Experience",
  "3 Years Experience",
  "4 Years Experience",
  "5 Years Experience",
  "Other",
];

/* -------------------- COMPONENT -------------------- */

export default function AdminCompaniesClient() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [form, setForm] = useState<FormState>({
    company_name: "",
    domain: "",
    role: "",
    stipend: "",
    location: "",
    batch: "",
    link: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCompanies();
  }, []);

  /* -------------------- FETCH -------------------- */

  async function fetchCompanies() {
    const { data } = await supabase
      .from("companies")
      .select("*")
      .order("created_at", { ascending: false });

    setCompanies(data || []);
  }

  /* -------------------- VALIDATION -------------------- */

  function validateForm(): FormState | null {
    if (!form.company_name.trim())
      return setError("Company name is required"), null;

    if (!form.domain.trim())
      return setError("Domain is required"), null;

    if (!form.role.trim())
      return setError("Role is required"), null;

    if (!form.link.trim())
      return setError("Application link is required"), null;

    setError("");

    return {
      ...form,
      stipend:
        form.stipend.trim() === ""
          ? "Competitive"
          : `${form.stipend}`,
      location: form.location.trim() || "Pan India",
    };
  }

  /* -------------------- SUBMIT -------------------- */

  async function submitCompany() {
    setError("");
    setSuccess("");

    const payload = validateForm();
    if (!payload) return;

    try {
      setLoading(true);

      const res = await fetch("/api/admin/companies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        setError("Failed to add company. Please try again.");
        return;
      }

      setSuccess("Company added successfully");

      setForm({
        company_name: "",
        domain: "",
        role: "",
        stipend: "",
        location: "",
        batch: "",
        link: "",
      });

      fetchCompanies();
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }

  /* -------------------- UI -------------------- */

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 p-6">
        <div className="max-w-6xl mx-auto space-y-8">

          {/* Header */}
          <div className="mt-25 flex items-center justify-between bg-white/80 backdrop-blur rounded-xl border border-slate-200 px-6 py-4 shadow-sm">
            <div>
              <h1 className="text-2xl font-semibold text-slate-800">
                Admin Dashboard
              </h1>
              <p className="text-sm text-slate-500">
                Manage company listings and roles
              </p>
            </div>
            <span className="text-green-600 font-semibold text-sm">
              Active
            </span>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white/90 rounded-xl border border-slate-200 p-6 shadow-lg">
                <h2 className="text-lg font-medium mb-4">
                  Add New Company
                </h2>

                {error && (
                  <div className="mb-4 bg-red-100 border border-red-200 px-4 py-2 text-sm text-red-700 rounded">
                    ❌ {error}
                  </div>
                )}

                {success && (
                  <div className="mb-4 bg-green-100 border border-green-200 px-4 py-2 text-sm text-green-800 rounded">
                    ✅ {success}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(form).map(([key, value]) => (
                    <div key={key} className="flex flex-col">
                      <label className="text-xs font-medium text-slate-500 mb-1 capitalize">
                        {key.replace("_", " ")}
                      </label>

                      {/* ROLE DROPDOWN */}
                      {key === "role" ? (
                        <select
                          value={value}
                          onChange={(e) =>
                            setForm({ ...form, role: e.target.value })
                          }
                          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm
                                     focus:outline-none focus:ring-2 focus:ring-indigo-500
                                     max-h-[100px] overflow-y-auto"
                        >
                          <option value="">Select role</option>
                          {ROLE_OPTIONS.map((role) => (
                            <option key={role} value={role}>
                              {role}
                            </option>
                          ))}
                        </select>

                      /* LOCATION DROPDOWN */
                      ) : key === "location" ? (
                        <select
                          value={value}
                          onChange={(e) =>
                            setForm({ ...form, location: e.target.value })
                          }
                          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm
                                     focus:outline-none focus:ring-2 focus:ring-indigo-500
                                     max-h-[100px] overflow-y-auto"
                        >
                          <option value="">Select location</option>
                          {LOCATION_OPTIONS.map((loc) => (
                            <option key={loc} value={loc}>
                              {loc}
                            </option>
                          ))}
                        </select>

                      /* BATCH DROPDOWN */
                      ) : key === "batch" ? (
                        <select
                          value={value}
                          onChange={(e) =>
                            setForm({ ...form, batch: e.target.value })
                          }
                          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm
                                     focus:outline-none focus:ring-2 focus:ring-indigo-500
                                     max-h-[100px] overflow-y-auto"
                        >
                          <option value="">Select batch / experience</option>
                          {BATCH_OPTIONS.map((batch) => (
                            <option key={batch} value={batch}>
                              {batch}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={key === "stipend" ? "number" : "text"}
                          value={value}
                          min={key === "stipend" ? 0 : undefined}
                          step={key === "stipend" ? 1 : undefined}
                          onWheel={(e) => e.currentTarget.blur()}
                          onChange={(e) => {
                            if (key === "stipend") {
                              const val = e.target.value;
                              if (/^\d*$/.test(val)) {
                                setForm({ ...form, stipend: val });
                              }
                            } else {
                              setForm({ ...form, [key]: e.target.value });
                            }
                          }}
                          placeholder={getPlaceholder(key)}
                          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm
                                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={submitCompany}
                    disabled={loading}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md
                               text-sm font-medium disabled:opacity-60"
                  >
                    {loading ? "Adding..." : "Add Company"}
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-white/80 rounded-xl border border-slate-200 p-5 shadow-sm">
                <h3 className="text-sm font-medium text-slate-600">
                  Admin Access
                </h3>
                <p className="text-green-700 font-semibold mt-1">
                  Verified
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

/* -------------------- HELPERS -------------------- */

function getPlaceholder(key: string) {
  switch (key) {
    case "domain":
      return "google.com";
    case "link":
      return "Application link";
    case "stipend":
      return "Competitive";
    default:
      return "Google";
  }
}
