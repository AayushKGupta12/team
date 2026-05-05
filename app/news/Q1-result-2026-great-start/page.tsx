'use client';
import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar,
} from "recharts";

const activityData = [
  { month: "Jan 01", users: 85,  prev: 120 },
  { month: "Jan 15", users: 180, prev: 300 },
  { month: "Feb 01", users: 320, prev: 260 },
  { month: "Feb 15", users: 260, prev: 220 },
  { month: "Mar 01", users: 145, prev: 130 },
  { month: "Mar 15", users: 130, prev: 110 },
  { month: "Apr 01", users: 200, prev: 95  },
  { month: "Apr 10", users: 380, prev: 85  },
];

const countryData = [
  { country: "India",       newUsers: 1100, returning: 353 },
  { country: "USA",         newUsers: 321,  returning: 12  },
  { country: "Singapore",   newUsers: 32,   returning: 4   },
  { country: "Japan",       newUsers: 18,   returning: 11  },
  { country: "Netherlands", newUsers: 15,   returning: 11  },
  { country: "Australia",   newUsers: 10,   returning: 5   },
  { country: "Ireland",     newUsers: 6,    returning: 2   },
];

const metrics = [
  { label: "Total Website Views", value: "76,484", sub: "Jan – Apr 13, 2026",       bg: "bg-indigo-50",  border: "border-indigo-100", val: "text-indigo-600" },
  { label: "Total Event Counts",  value: "35,536", sub: "All tracked interactions", bg: "bg-green-50",   border: "border-green-100",  val: "text-green-600" },
  { label: "Returning User Rate", value: "23.2%",  sub: "↑ 76.7% vs prior period", bg: "bg-amber-50",   border: "border-amber-100",  val: "text-amber-600" },
  { label: "Views / Active User", value: "6.9×",   sub: "↑ 81.8% vs prior period", bg: "bg-purple-50",  border: "border-purple-100", val: "text-purple-600" },
];

const highlights = [
  { icon: "🌍", title: "Global Footprint",          text: "Users active across 8+ countries India, United States, Singapore, Japan, Netherlands, Australia, Ireland signalling cross-border relevance for career intelligence." },
  { icon: "📈", title: "30-Day Active Users Surge",  text: "Monthly active users reached 26,690, a 269.6% increase, demonstrating that Tauzand.in's career intelligence content is driving sustained, recurring engagement month over month." },
  { icon: "🇺🇸", title: "USA Traction Accelerating", text: "United States added 321 new users this quarter, a 57.4% rise, validating Tauzand.in's value proposition across competitive, English-speaking job markets." },
  { icon: "🔁", title: "Loyalty Signals",            text: "With 353 returning users from India and 11 each from Japan and the Netherlands, Tauzand.in is building a loyal, repeat audience the hallmark of a trusted B2C platform." },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm shadow-sm">
      <p className="font-semibold text-gray-900 mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-gray-600 m-0">
          {p.name}: <span className="font-semibold" style={{ color: p.color }}>{p.value}</span>
        </p>
      ))}
    </div>
  );
};

export default function TauzandQ1Report() {
  const [activeTab, setActiveTab] = useState("activity");

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 font-serif">
      <link
        href="https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      {/* ── Hero ── */}
      <header className="bg-gradient-to-br from-indigo-50 via-white to-green-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 md:px-10 py-16 md:py-20">
          <div className="max-w-2xl">

            <h1
              className="text-3xl md:text-4xl font-bold text-slate-900 leading-snug mb-5 tracking-tight"
              style={{ fontFamily: "'Lora', Georgia, serif" }}
            >
              Tauzand.in Records 76,484 Total Views in Q1 FY2026 Career Intelligence Platform
              Achieves Strong Cross-Border Growth
            </h1>

            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-7 font-sans font-normal">
              India's emerging career intelligence platform,{" "}
              <strong className="text-indigo-600 font-semibold">Tauzand.in</strong>, closes the first
              quarter of FY2026 with measurable momentum 76,484 website views, 35,536 tracked user
              events, and a growing international audience spanning 8+ countries. The data reflects a
              platform moving confidently from early traction to repeatable, compounding growth.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 font-sans">
              <span>
                <span className="text-gray-600 font-medium">By</span> Tauzand.in Editorial Team
              </span>
              <span className="text-gray-300">·</span>
              <span>April 13, 2026</span>
              <span className="text-gray-300">·</span>
              <span>5 min read</span>
              <span className="text-xs font-medium bg-green-50 text-green-600 border border-green-100 px-3 py-1 rounded-full">
                Q1 Growth Report
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="max-w-4xl mx-auto px-6 md:px-10 pb-24">

        {/* ── Metrics Strip ── */}
        <section className="pt-10 pb-8" aria-label="Key performance metrics">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4 font-sans">
            Key Metrics Q1 FY2026
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {metrics.map((m, i) => (
              <div key={i} className={`${m.bg} ${m.border} border rounded-2xl p-5`}>
                <p className="text-xs font-medium text-gray-500 mb-1.5 font-sans">{m.label}</p>
                <p
                  className={`text-2xl font-bold ${m.val} mb-1 tracking-tight`}
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  {m.value}
                </p>
                <p className="text-xs text-gray-400 font-sans">{m.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Article Body ── */}
        <article className="border-t border-gray-200 pt-9">

          <h2
            className="text-xl md:text-2xl font-semibold text-slate-900 mb-4 tracking-tight"
            style={{ fontFamily: "'Lora', serif" }}
          >
            A Quarter That Established the Foundation
          </h2>

          <p className="text-base leading-loose text-gray-600 mb-5 font-sans font-normal">
            Q1 FY2026 (January – April 13, 2026) marks a pivotal chapter for{" "}
            <strong className="text-gray-900">Tauzand.in</strong>. The platform, which focuses on{" "}
            <em>career intelligence</em> curating actionable guidance for job seekers, early
            professionals, and career switchers recorded{" "}
            <strong>76,484 total page views</strong> and{" "}
            <strong>35,536 engagement events</strong> across its tracked sessions. These numbers
            collectively signal an audience that is not only growing in size but in engagement depth.
          </p>

          <p className="text-base leading-loose text-gray-600 mb-5 font-sans font-normal">
            At a daily peak of <strong>1,600 active users</strong> a 26.4% increase over the
            comparable prior period the platform is demonstrating consistent inbound pull. More
            importantly, the <strong>returning user rate of 23.2%</strong> climbed by 76.7%, a metric
            that reflects audience quality: users who come back are users who find value.
          </p>

          {/* Pull Quote */}
          <blockquote className="my-7 pl-6 pr-5 py-5 bg-indigo-50 border-l-4 border-indigo-500 rounded-r-xl">
            <p
              className="text-lg italic text-indigo-900 leading-relaxed m-0"
              style={{ fontFamily: "'Lora', serif" }}
            >
              "A 76.7% rise in returning users is not a vanity metric it is the clearest signal
              that Tauzand.in is becoming a trusted reference point in India's career intelligence
              space."
            </p>
          </blockquote>

          {/* ── Chart Card ── */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-7 my-8">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1 font-sans">
                  Analytics
                </p>
                <h3
                  className="text-lg font-semibold text-slate-900 m-0"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  User Activity Trend Q1 FY2026
                </h3>
              </div>
              <div className="flex gap-1.5">
                {["activity", "countries"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-xs font-medium px-3.5 py-1.5 rounded-lg border-0 cursor-pointer transition-all duration-150 font-sans capitalize ${
                      activeTab === tab
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    {tab === "activity" ? "User Activity" : "By Country"}
                  </button>
                ))}
              </div>
            </div>

            {activeTab === "activity" ? (
              <>
                <div className="flex gap-5 mb-4">
                  <span className="flex items-center gap-2 text-xs text-gray-500 font-sans">
                    <span className="inline-block w-6 h-0.5 bg-indigo-500 rounded" />
                    This period
                  </span>
                  <span className="flex items-center gap-2 text-xs text-gray-400 font-sans">
                    <span className="inline-block w-6 h-0.5 bg-gray-300 rounded" />
                    Prior period
                  </span>
                </div>
                <ResponsiveContainer width="100%" height={240}>
                  <LineChart data={activityData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                    <XAxis dataKey="month" tick={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                    <Line type="monotone" dataKey="users" name="This period"  stroke="#4F46E5" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: "#4F46E5" }} />
                    <Line type="monotone" dataKey="prev"  name="Prior period" stroke="#D1D5DB" strokeWidth={1.5} strokeDasharray="5 4" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </>
            ) : (
              <>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={countryData} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" horizontal={false} />
                    <XAxis type="number" tick={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                    <YAxis dataKey="country" type="category" tick={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, fill: "#374151" }} axisLine={false} tickLine={false} width={85} />
                    <Bar dataKey="newUsers"  name="New Users"       fill="#4F46E5" radius={[0, 4, 4, 0]} barSize={9} />
                    <Bar dataKey="returning" name="Returning Users" fill="#6EE7B7" radius={[0, 4, 4, 0]} barSize={9} />
                  </BarChart>
                </ResponsiveContainer>
                <div className="flex gap-4 mt-3">
                  {[{ c: "#4F46E5", l: "New Users" }, { c: "#6EE7B7", l: "Returning Users" }].map((it, i) => (
                    <span key={i} className="flex items-center gap-1.5 text-xs text-gray-500 font-sans">
                      <span className="w-2.5 h-2.5 rounded-sm inline-block shrink-0" style={{ background: it.c }} />
                      {it.l}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* ── Global Reach ── */}
          <h2
            className="text-xl md:text-2xl font-semibold text-slate-900 mt-9 mb-4 tracking-tight"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Global Reach: India Leads, International Momentum Builds
          </h2>

          <p className="text-base leading-loose text-gray-600 mb-5 font-sans font-normal">
            India remains the dominant traffic source contributing over{" "}
            <strong>26,690 new users</strong> and <strong>17,744 returning visitors</strong> in Q1.
            However, the international dimension of Tauzand.in's growth is where the story becomes
            compelling. The United States added <strong>321 new users</strong>, reflecting a 57.4%
            increase. Singapore saw a staggering <strong>3,100%+ rise</strong> in new user
            registrations, pointing to untapped demand in Southeast Asia's knowledge economy.
          </p>

          <p className="text-base leading-loose text-gray-600 mb-5 font-sans font-normal">
            Additionally, Japan recorded over <strong>1,000% growth</strong> in returning users a
            data point that underscores that even markets outside Tauzand.in's primary focus are
            independently discovering and bookmarking the platform's content as a career resource.
          </p>

          {/* ── Highlights Grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-7">
            {highlights.map((h, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5">
                <p className="text-2xl mb-2.5 m-0">{h.icon}</p>
                <p className="text-sm font-semibold text-gray-900 mb-1.5 m-0 font-sans">{h.title}</p>
                <p className="text-sm text-gray-500 leading-relaxed m-0 font-sans">{h.text}</p>
              </div>
            ))}
          </div>

          {/* ── Engagement Depth ── */}
          <h2
            className="text-xl md:text-2xl font-semibold text-slate-900 mb-4 tracking-tight"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Engagement Depth: Users Come, Users Stay, Users Return
          </h2>

          <p className="text-base leading-loose text-gray-600 mb-5 font-sans font-normal">
            One of the most important quality signals in Q1 is the{" "}
            <strong>views-per-active-user ratio of 6.9×</strong> up 81.8% compared to the prior
            period. This means each visitor who engages with Tauzand.in explores nearly 7 pages or
            content pieces per session, a strong indicator of content discoverability, internal
            linking quality, and topical relevance.
          </p>

          <p className="text-base leading-loose text-gray-600 mb-5 font-sans font-normal">
            The <strong>35,536 registered event counts</strong> covering clicks, scroll depth, form
            interactions, and content engagement validate that Tauzand.in's audience is not passive.
            Users are actively interacting with resources, tools, and editorial content. This level of
            interaction depth is characteristically seen in platforms where users perceive genuine
            utility.
          </p>

          {/* ── Dark Stats Callout ── */}
          <div className="bg-slate-900 rounded-2xl p-7 md:p-8 my-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { val: "26690", label: "30-Day Active Users", badge: "↑ 269.6%",  bgBadge: "bg-green-500/20",  txtBadge: "text-green-400",  borderBadge: "border-green-500/30"  },
              { val: "4218", label: "7-Day Active Users",  badge: "↑ 952.4%",  bgBadge: "bg-blue-500/20",   txtBadge: "text-blue-400",   borderBadge: "border-blue-500/30"   },
              { val: "8+",  label: "Countries Reached",   badge: "Global Reach", bgBadge: "bg-purple-500/20", txtBadge: "text-purple-400", borderBadge: "border-purple-500/30" },
            ].map((s, i) => (
              <div key={i}>
                <p
                  className="text-4xl font-bold text-white mb-1.5 tracking-tight m-0"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  {s.val}
                </p>
                <p className="text-sm text-slate-400 mb-3 m-0 font-sans">{s.label}</p>
                <span
                  className={`text-xs font-semibold font-sans ${s.bgBadge} ${s.txtBadge} border ${s.borderBadge} px-3 py-1 rounded-full`}
                >
                  {s.badge}
                </span>
              </div>
            ))}
          </div>

          {/* ── Outlook ── */}
          <h2
            className="text-xl md:text-2xl font-semibold text-slate-900 mb-4 tracking-tight"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Platform Outlook: Q2 FY2026 and Beyond
          </h2>

          <p className="text-base leading-loose text-gray-600 mb-5 font-sans font-normal">
            The Q1 data establishes Tauzand.in as a platform with strong early-stage network effects.
            A 23.2% returning user rate in a platform's formative growth phase is a signal that
            content-market fit is already being achieved. As SEO indexing deepens, content coverage
            expands, and user acquisition scales, Q2 FY2026 is positioned to see compounded returns
            on the foundation laid this quarter.
          </p>

          <p className="text-base leading-loose text-gray-600 mb-5 font-sans font-normal">
            With <strong>India, USA, Singapore, and Japan</strong> all demonstrating independent,
            organic traction, Tauzand.in's career intelligence model is proving relevant across
            geographies a rare indicator for a platform that launched without a formal international
            GTM strategy. The next quarter will focus on deepening these markets, improving
            event-to-registration conversion, and expanding the breadth of career resources offered
            to the platform's growing subscriber base.
          </p>

          {/* ── Footnote ── */}
          <div className="border-t border-gray-200 mt-10 pt-6">
            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              <strong className="text-gray-500">Data Sources:</strong> All metrics referenced in
              this report are sourced directly from Tauzand.in's Google Analytics 4 dashboard for
              the period January 1, 2026 to April 13, 2026. Event counts and session data are
              captured via GA4's enhanced measurement configuration. Country-level data reflects
              user-declared and IP-derived geolocation.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {[
                "#CareerIntelligence", "#Tauzand", "#Q1FY2026",
                "#StartupGrowth", "#IndiaStartups", "#SaaS",
                "#CareerTech", "#JobSearch", "#GrowthMetrics",
              ].map((tag) => (
                <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full font-sans">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}