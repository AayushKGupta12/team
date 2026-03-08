import { useState } from "react";

const tabs = [
  {
    id: "apply",
    label: "Apply",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    description: "Apply for an industry-verified internship across 3 domains. Choose your track and get matched with a real project.",
    accentColor: "#2E5E99",
    lightAccent: "#EEF4FF",
    imagePlaceholder: "./screenshotApply.png",
  },
  {
    id: "status",
    label: "Status & Get Your Project",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    description: "Track your application status, get assigned your industry project, and connect with your dedicated mentor from our team of 70+.",
    accentColor: "#0EA47A",
    lightAccent: "#EDFAF5",
    imagePlaceholder: "./screenshotStatus.png",
  },
  {
    id: "submission",
    label: "Submission Link",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    ),
    description: "Submit your completed project for mentor review. Your profile gets verified only after a mentor approves your submission.",
    accentColor: "#D97706",
    lightAccent: "#FFFBEB",
    imagePlaceholder: "./screenshotSubmit.png",
  },
  {
    id: "certificate",
    label: "Certificate Issue",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    ),
    description: "Once you are done with all legal amendements, your certificate will be issue",
    accentColor: "#2563EB",
    lightAccent: "#DBEAFE",
    imagePlaceholder: "./screenshotComplete.png",
  },
];

export default function InternshipShowcase() {
  const [active, setActive] = useState(0);
  const tab = tabs[active];

  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900">
            Your internship journey, <span className="bg-yellow-300 -rotate-1 px-1 py-1.5 rounded-2xl">simplified</span>
          </h2>
        </div>

        {/* Tab Pills */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {tabs.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border ${
                active === i
                  ? "shadow-sm border-transparent"
                  : "bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }`}
              style={
                active === i
                  ? { background: t.lightAccent, color: t.accentColor, borderColor: `${t.accentColor}40` }
                  : {}
              }
            >
              <span style={{ color: active === i ? t.accentColor : "#9CA3AF" }}>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* Image area */}
        <div
          key={active}
          className="rounded-3xl border border-gray-200 overflow-hidden shadow-xl shadow-gray-100"
          style={{ transition: "all 0.7s ease" }}
        >
          {/* Window chrome bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-300" />
              <div className="w-3 h-3 rounded-full bg-amber-300" />
              <div className="w-3 h-3 rounded-full bg-green-300" />
            </div>
            <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg px-3 py-1 text-xs text-gray-400 w-44 justify-center">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
              </svg>
              vfound.in/dashboard
            </div>
            <div className="w-20" />
          </div>

          {/* Screenshot placeholder — replace <div> with <img src="..." /> */}
          <div
            className="w-full flex items-center justify-center bg-gray-50"
            style={{ minHeight: 420 }}
          >
            {/* ↓↓↓ REPLACE THIS BLOCK WITH YOUR <img> TAG ↓↓↓
                <img
                  src={`/screenshots/${tab.id}.png`}
                  alt={tab.imagePlaceholder}
                  className="w-full h-auto object-cover"
                />
            */}

                <img src={tab.imagePlaceholder} alt="" className="w-full h-auto object-cover -left-2" />
          </div>
        </div>

        <div className="mt-16">
  <style>{`
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .fade-up-1 { animation: fadeUp 0.5s ease both 0.0s; }
    .fade-up-2 { animation: fadeUp 0.5s ease both 0.1s; }
    .fade-up-3 { animation: fadeUp 0.5s ease both 0.2s; }
    .fade-up-4 { animation: fadeUp 0.5s ease both 0.3s; }
  `}</style>

  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 ">
    {[
      { val: "70+",   label: "Domain Mentors",        sub: "Across Dev, Design & Data",       cls: "fade-up-1" },
      { val: "3",     label: "Internship Tracks",      sub: "30 · 45 · 60 day programs",       cls: "fade-up-2" },
      { val: "100%",  label: "Verified Certificates",  sub: "Mentor-reviewed, not just issued", cls: "fade-up-4" },
    ].map((s) => (
      <div
        key={s.label}
        className={`${s.cls} group rounded-2xl bg-[#0d2440] border border-gray-100 px-6 py-7 flex flex-col gap-1 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300`}
      >
        <div className="text-5xl font-bold text-[#e7f0fa] tracking-tight">
          {s.val}
        </div>
        <div className="text-sm font-semibold text-[#e7f0fa] mt-1">
          {s.label}
        </div>
        <div className="text-xs text-[#e7f0fa] leading-relaxed">
          {s.sub}
        </div>
        <div className="mt-3 w-8 h-0.5 bg-gray-200 group-hover:w-full group-hover:bg-[#2E5E99] transition-all duration-300 rounded-full" />
      </div>
    ))}
  </div>

  {/* CTA */}
  <div className="mt-4 rounded-2xl bg-black px-7 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
    <div className="flex flex-col gap-0.5">
      <p className="text-yellow-400 font-semibold text-xl">
        Top performers get hired
      </p>
    </div>
    <button className="shrink-0 bg-yellow-400 hover:scale-110 text-black font-semibold text-md px-6 py-2.5 rounded-xl transition-transform duration-100 whitespace-nowrap">
      Apply Now →
    </button>
  </div>
</div>

      </div>
    </section>
  );
}