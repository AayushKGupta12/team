"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase-client";

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

  async function fetchCompanies() {
    const { data } = await supabase
      .from("companies")
      .select("*")
      .order("created_at", { ascending: false });

    setCompanies(data || []);
  }

  function validateForm(): FormState | null {
    if (!form.company_name.trim())
      return setError("Company name is required"), null;

    if (!form.domain.trim())
      return setError("Domain is required"), null;

    if (!form.role.trim())
      return setError("Role is required"), null;

    if (!form.link.trim())
      return setError("Application link is required"), null;

    // Clear errors if all checks pass
    setError("");

    return {
      ...form,
      stipend: form.stipend.trim() || "Competitive",
      location: form.location.trim() || "Pan India",
    };
  }

  async function submitCompany() {
    setSuccess("");
    setError("");

    const payload = validateForm();
    if (!payload) return;

    try {
      setLoading(true);

      const res = await fetch("/api/admin/companies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
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
      } else {
        setError("Failed to add company. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 p-6">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Dashboard Header */}
        <div className="flex items-center justify-between bg-white/80 backdrop-blur rounded-xl border border-slate-200 px-6 py-4 shadow-sm mt-30">
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">
              Admin Dashboard
            </h1>
            <p className="text-sm text-slate-500">
              Manage company listings and roles
            </p>
          </div>

          <div className="text-md text-slate-500">
            Status: <span className="text-green-600 font-medium text-2xl">Active</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white/90 backdrop-blur rounded-xl border border-slate-200 p-6 shadow-lg">
              <h2 className="text-lg font-medium text-slate-800 mb-4">
                Add New Company
              </h2>

              {error && (
                <div className="mb-4 rounded-md bg-red-100 border border-red-200 px-4 py-2 text-sm text-red-700">
                  ❌ {error}
                </div>
              )}

              {success && (
                <div className="mb-4 rounded-md bg-green-100 border border-green-200 px-4 py-2 text-sm text-green-800">
                  ✅ {success}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(form).map(([key, value]) => (
                  <div key={key} className="flex flex-col">
                    <label className="text-xs font-medium text-slate-500 mb-1 capitalize">
                      {key.replace("_", " ")}
                    </label>
                    <input
                      type={key === "stipend" ? "number" : "text"}
                      value={value}
                      onChange={(e) =>
                        setForm({ ...form, [key]: e.target.value })
                      }
                      placeholder={getPlaceholder(key)}
                      min={key === "stipend" ? 0 : undefined}
                      step={key === "stipend" ? 1 : undefined}
                      className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm
                                focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={submitCompany}
                  disabled={loading}
                  className="rounded-md bg-indigo-600 px-6 py-2 text-sm font-medium text-white
                            hover:bg-indigo-700 disabled:opacity-60 shadow"
                >
                  {loading ? "Adding..." : "Add Company"}
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar / Stats */}
          <div className="space-y-4">
            <div className="bg-white/80 backdrop-blur rounded-xl border border-slate-200 p-5 shadow-sm">
              <h3 className="text-sm font-medium text-slate-600 mb-1">
                Admin Access
              </h3>
              <p className="text-sm text-green-700 font-medium">
                Verified
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


/* Helpers */
function getPlaceholder(key: string) {
  switch (key) {
    case "domain":
      return "google.com";

    case "link":
      return "application form link ";

    case "role":
      return "eg. Software Engineer 1";
    case "stipend":
      return "Competitive";
    case "location":
      return "Pan India";
    case "batch":
      return "e.g. 2+ years experience required";
    default:
      return "Google";
  }

}
