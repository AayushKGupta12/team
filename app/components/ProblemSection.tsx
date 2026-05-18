"use client";

import { Ban, FileWarning, UserX,CheckCircle, Users, ShieldCheck, Globe, IndianRupee, RefreshCw } from "lucide-react";

const PROBLEMS = [
  {
    icon: Ban,
    title: "Common Practice",
    body: "Most internship programs give certificates just for watching videos or taking quizzes. Students complete them without writing any real code.",
    badges: ["Theory Only", "No Real Coding"],
  },
  {
    icon: FileWarning,
    title: "Market Reality",
    body: "When certificates are given automatically, they lose all value. Recruiters ignore PDFs that have no proof of actual work.",
    badges: ["Auto-generated", "Low Value"],
  },
  {
    icon: UserX,
    title: "Trust Deficit",
    body: "Hiring managers want proof. Certificates without a public verification link are usually rejected in the first round.",
    badges: ["Unverifiable", "No Proof"],
  },
];

const SOLUTIONS = [
  {
    icon: CheckCircle,           // Import from lucide-react
    title: "Proof of Work",
    body: "Build real, production-grade projects instead of just watching videos or taking quizzes. Every submission is properly implemented and tested.",
    badges: ["Real Coding", "Project Implementation", "Industry Standards"],
  },
  {
    icon: Users,                 // Import from lucide-react
    title: "Mentor Validation",
    body: "All projects are reviewed by experienced industry mentors. You receive detailed feedback and guidance to improve your work.",
    badges: ["Expert Mentors", "Personalized Feedback", "Quality Assurance"],
  },
  {
    icon: ShieldCheck,           // Import from lucide-react
    title: "Credential Integrity",
    body: "Earn certificates that actually hold value. Every certificate comes with a unique verification link and QR code for instant validation.",
    badges: ["Public Verification", "QR Code", "Tamper Proof"],
  },
  {
    icon: RefreshCw,             // Import from lucide-react
    title: "Industry-Aligned Projects",
    body: "Projects are updated monthly according to current industry demands and technologies, ensuring you work on relevant and in-demand skills.",
    badges: ["Monthly Updates", "Latest Tech Stack", "Market Relevant"],
  },
  {
    icon: Globe,                 // Import from lucide-react
    title: "Pan-India Recognition",
    body: "Join a growing network of talented students and get visibility across recruiters and companies looking for verified talent.",
    badges: ["National Network", "Recruiter Trusted", "Talent Pool"],
  },
  {
    icon: IndianRupee,           // Import from lucide-react
    title: "Transparent Pricing",
    body: "One-time registration fee with no hidden charges. Pay only for certification after successful mentor approval.",
    badges: ["One-time Fee", "No Hidden Cost", "Pay After Approval"],
  },
];

export default function ProblemSection() {
  return (
    <div>
    <section className="w-full bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-16">
          <div className="inline-block border border-slate-900 bg-red-200 rounded-full px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
            THE PROBLEM
          </div>
          <h2 className="text-5xl font-bold tracking-tighter leading-[0.95]">
            Other certificates offers<br />
          </h2>
        </div>

        {/* Problem Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {PROBLEMS.map(({ icon: Icon, title, body, badges }) => (
            <div
              className=" border border-slate-200 rounded-3xl p-8 hover:border-slate-900 transition-all duration-300 flex flex-col"
            >
              <h3 className="text-xl font-bold mb-4 tracking-tighter">{title}</h3>

              <p className="text-slate-600 leading-relaxed text-[15px] mb-8 flex-grow">
                {body}
              </p>

              <div className="flex flex-wrap gap-2">
                {badges.map((b) => (
                  <span
                    key={b}
                    className="text-[10px] font-bold bg-red-100 px-3 py-1 rounded-full uppercase tracking-wider"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>

    <section className="w-full bg-white py-2 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <div className="inline-block border border-slate-900 bg-green-200 rounded-full px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
            THE SOLUTION
          </div>
          <h2 className="text-5xl font-bold tracking-tighter leading-[0.95]">
            Our certificates offers<br />
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {SOLUTIONS.map(({ icon: Icon, title, body, badges }) => (
            <div
              className=" border border-slate-200 rounded-3xl p-8 hover:border-slate-900 transition-all duration-300 flex flex-col"
            >
              <h3 className="text-xl font-bold mb-4 tracking-tighter">{title}</h3>

              <p className="text-slate-600 leading-relaxed text-[15px] mb-8 flex-grow">
                {body}
              </p>

              <div className="flex flex-wrap gap-2">
                {badges.map((b) => (
                  <span
                    key={b}
                    className="text-[10px] font-bold bg-green-100 px-3 py-1 rounded-full uppercase tracking-wider"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Footer */}
        <div className="mt-10 text-center">
          <p className="text-lg font-medium text-slate-900">
            Tauzand fixes this — <span className="text-emerald-600 font-semibold">Real Proof. Real Certificate.</span>
          </p>
        </div>
    </section>
    </div>
  );
}