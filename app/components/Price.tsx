"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Zap,
  Globe,
  GraduationCap,
  FileText,
  Mail,
  Code2,
  Briefcase,
  Newspaper,
  ShieldCheck,
  ArrowRight,
  Check,
  Gift,
  ExternalLink,
  Info,
} from "lucide-react";

// ─── Feature catalogue ─────────────────────────────────────────────────────

const freeFeatures = [
  {
    id: "iats",
    label: "AI Resume Analyzer",
    abbr: "IATS",
    desc: "Deep ATS analysis, keyword gaps, and improvement suggestions for your resume.",
    href: "/ai-resume-analyser",
    icon: FileText,
    freeUses: 75,
    color: "amber",
  },
  {
    id: "icl",
    label: "AI Cover Letter Generator",
    abbr: "ICL",
    desc: "Personalized, job-specific cover letters generated in seconds.",
    href: "/cover-letter",
    icon: Mail,
    freeUses: 75,
    color: "amber",
  },
];

const paidFeatures = [
  {
    id: "internship",
    label: "Skill & Internship Validation",
    desc: "Get your internship and skills officially verified by industry mentors. Receive a shareable Tauzand certificate.",
    href: "/internship",
    icon: GraduationCap,
    pricingLabel: "Starts at",
    price: "₹249",
    priceSub: "30 / 45 / 60 day tracks",
    highlight: true,
    tag: "Most Used",
    features: ["Live Project Access", "Mentor Support", "Verified Certificate"],
  },
  {
    id: "extension",
    label: "AI Research Extension",
    desc: "Instant AI insights while browsing technical content in Chrome. 300,000 tokens included.",
    href: "/extension",
    icon: Globe,
    pricingLabel: "One-time",
    price: "₹160",
    priceSub: "300,000 tokens included",
    highlight: false,
    tag: "Browser Tool",
    features: ["300K Generation Tokens", "One-click Insights", "Lifetime Access"],
  },
  {
    id: "dsa",
    label: "Company-wise DSA",
    desc: "800+ interview questions sorted by company. Prep for Placement 2026 with a tracked dashboard.",
    href: "/DSA",
    icon: Code2,
    pricingLabel: "Credit-based",
    price: "₹60",
    priceSub: "75 credits · scales up to ₹120",
    highlight: false,
    tag: "Placement 2026",
    features: ["800+ Questions", "Company Filters", "Progress Dashboard"],
  },
  {
    id: "projects",
    label: "Available Projects",
    desc: "Browse and apply to verified internship project listings curated for students.",
    href: "/internship/project",
    icon: Briefcase,
    pricingLabel: "Bundled with",
    price: "Internship Plan",
    priceSub: "No separate fee",
    highlight: false,
    tag: "Bundled",
    features: ["Verified Listings", "Direct Applications", "Mentor Connect"],
  },
  {
    id: "newsletter",
    label: "Weekly Newsletter",
    desc: "Curated IT industry updates, job alerts, and career moves delivered weekly.",
    href: "/news",
    icon: Newspaper,
    pricingLabel: "Pricing on",
    price: "Page",
    priceSub: "view tauzand.in/news",
    highlight: false,
    tag: "Updates",
    features: ["Weekly Digest", "IT Job Alerts", "Industry Trends"],
  },
  {
    id: "validate",
    label: "Validate Certificate",
    desc: "Verify the authenticity of any Tauzand-issued certificate in seconds.",
    href: "/internship/validate",
    icon: ShieldCheck,
    pricingLabel: "Free",
    price: "₹0",
    priceSub: "Always free to verify",
    highlight: false,
    tag: "Verification",
    features: ["Instant Check", "QR & ID Based", "Publicly Accessible"],
  },
];

// ─── Toast ──────────────────────────────────────────────────────────────────

function Toast({ message }: { message: string }) {
  return (
    <div
      style={{
        position: "fixed",
        top: "24px",
        left: "50%",
        transform: "translateX(-50%)",
        background: "#0d2440",
        color: "white",
        padding: "14px 24px",
        borderRadius: "12px",
        fontWeight: "700",
        fontSize: "14px",
        zIndex: 9999,
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        whiteSpace: "nowrap",
        letterSpacing: "0.01em",
      }}
    >
      {message}
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────

export default function PricingSection() {
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      {toast && <Toast message={toast} />}

      {/* ═══════════════════════════════════════════════
          HERO Model Explanation
      ═══════════════════════════════════════════════ */}
      <section className="py-20 bg-[#0d2440] text-white overflow-hidden relative">

        {/* Background grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">

          {/* Pill badge */}
          <div className="flex justify-center mb-8 mt-15">
            <span className="inline-flex items-center gap-2 bg-[#ffd77a]/15 border border-[#ffd77a]/30 text-[#ffd77a] text-xs font-black uppercase tracking-[0.15em] px-4 py-2 rounded-full">
              <Gift size={12} />
              No Subscriptions. Ever.
            </span>
          </div>

          {/* Headline */}
          <div className="text-center mb-6">
            <h2 className="text-4xl md:text-6xl font-black mb-5 tracking-tight leading-[1.08]">
              Pay only for the{" "}
              <span className="text-[#ffd77a]">feature</span>
              <br className="hidden md:block" /> you actually use.
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
              Tauzand has no all-access plans. Every tool on this platform is independent 
              you pay the minimum for that specific page, nothing else. Two tools are always free.
            </p>
          </div>

          {/* Model pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            {[
              { icon: "🎁", text: "2 Features Free Forever" },
              { icon: "💳", text: "Pay Per Feature" },
              { icon: "🔒", text: "No Hidden Charges" },
              { icon: "⚡", text: "Instant Access" },
            ].map((pill) => (
              <div
                key={pill.text}
                className="flex items-center gap-2 bg-white/8 border border-white/10 rounded-full px-4 py-2 text-sm font-semibold text-gray-200"
              >
                <span>{pill.icon}</span>
                <span>{pill.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FREE FEATURES ICL + IATS
      ═══════════════════════════════════════════════ */}
      <section className="py-16 bg-[#fffbf0]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">

          <div className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-px flex-1 bg-amber-200" />
              <span className="text-xs font-black uppercase tracking-[0.18em] text-amber-600">
                Complementary Features Always Free
              </span>
              <div className="h-px flex-1 bg-amber-200" />
            </div>
            <p className="text-center text-sm text-amber-700 font-medium mt-2">
              Use ICL &amp; IATS up to <strong>75 times each</strong> no credit card, no credits required.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {freeFeatures.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.id}
                  className="group relative bg-white rounded-3xl border-2 border-amber-200 shadow-sm overflow-hidden"
                >
                  {/* Top accent stripe */}
                  <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 to-yellow-300" />

                  <div className="p-8">
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-[#0d2440]">
                          <Icon size={22} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-0.5">
                            {feat.abbr}
                          </p>
                          <h3 className="text-lg font-black text-[#0d2440] leading-tight">
                            {feat.label}
                          </h3>
                        </div>
                      </div>
                      {/* Free badge */}
                      <div className="flex flex-col items-end gap-1">
                        <span className="bg-[#0d2440] text-[#ffd77a] text-xs font-black px-3 py-1.5 rounded-xl">
                          FREE
                        </span>
                        <span className="text-[10px] text-gray-400 font-bold">{feat.freeUses} uses</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 font-medium leading-relaxed mb-6">
                      {feat.desc}
                    </p>

                    {/* Usage bar */}
                    <div className="mb-6">
                      <div className="flex justify-between text-[11px] font-bold text-gray-500 mb-1.5">
                        <span>Free uses included</span>
                        <span className="text-amber-600">{feat.freeUses} / {feat.freeUses}</span>
                      </div>
                      <div className="h-2 bg-amber-50 border border-amber-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full"
                          style={{ width: "100%" }}
                        />
                      </div>
                    </div>

                    <Link
                      href={feat.href}
                      className="flex items-center justify-between w-full py-3.5 px-5 bg-[#0d2440] text-white rounded-xl font-bold text-sm"
                    >
                      <span>Try for Free</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          PAID FEATURES GRID
      ═══════════════════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">

          <div className="mb-12">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs font-black uppercase tracking-[0.18em] text-[#0d2440]">
                Paid Features Access Only What You Need
              </span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>
            <p className="text-center text-sm text-slate-500 font-medium mt-2">
              Each feature is independently priced. Pay the minimum shown on that page no bundles, no bloat.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paidFeatures.map((feat) => {
              const Icon = feat.icon;
              const isFree = feat.price === "₹0";
              return (
                <div
                  key={feat.id}
                  className={`relative bg-white rounded-3xl border overflow-hidden flex flex-col ${
                    feat.highlight
                      ? "border-2 border-[#0d2440] shadow-xl"
                      : "border-slate-100 shadow-sm"
                  }`}
                >
                  {/* Highlight top bar */}
                  {feat.highlight && (
                    <div className="h-1.5 w-full bg-gradient-to-r from-[#0d2440] to-blue-600" />
                  )}

                  {/* Tag badge */}
                  <div className="absolute top-4 right-4">
                    <span
                      className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${
                        feat.highlight
                          ? "bg-[#0d2440] text-[#ffd77a]"
                          : isFree
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-slate-50 text-slate-500 border border-slate-200"
                      }`}
                    >
                      {feat.tag}
                    </span>
                  </div>

                  <div className="p-7 flex flex-col flex-1">
                    {/* Icon + label */}
                    <div className="flex items-center gap-3 mb-4 pr-16">
                      <div
                        className={`p-2.5 rounded-xl border ${
                          feat.highlight
                            ? "bg-[#0d2440]/5 border-[#0d2440]/15 text-[#0d2440]"
                            : "bg-slate-50 border-slate-100 text-[#0d2440]"
                        }`}
                      >
                        <Icon size={18} />
                      </div>
                      <h3 className="text-[15px] font-black text-[#0d2440] leading-tight">
                        {feat.label}
                      </h3>
                    </div>

                    <p className="text-[13px] text-slate-500 font-medium leading-relaxed mb-5">
                      {feat.desc}
                    </p>

                    {/* Included features */}
                    <ul className="space-y-2 mb-6 flex-1">
                      {feat.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-[12px] text-slate-600 font-semibold">
                          <Check size={13} className="text-amber-500 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    {/* Price block */}
                    <div
                      className={`rounded-2xl p-4 mb-5 border ${
                        feat.highlight
                          ? "bg-[#0d2440]/4 border-[#0d2440]/10"
                          : isFree
                          ? "bg-green-50 border-green-100"
                          : "bg-[#ffd77a]/15 border-amber-200/50"
                      }`}
                    >
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                        {feat.pricingLabel}
                      </p>
                      <div className="flex items-baseline gap-1.5">
                        <span
                          className={`text-2xl font-black ${
                            isFree ? "text-green-600" : "text-[#0d2440]"
                          }`}
                        >
                          {feat.price}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-semibold mt-0.5">
                        {feat.priceSub}
                      </p>
                    </div>

                    {/* CTA */}
                    <Link
                      href={feat.href}
                      className={`flex items-center justify-between w-full py-3 px-5 rounded-xl font-bold text-sm border transition-colors ${
                        feat.highlight
                          ? "bg-[#0d2440] text-white border-[#0d2440]"
                          : isFree
                          ? "bg-green-600 text-white border-green-600"
                          : "bg-white text-[#0d2440] border-[#0d2440] hover:bg-[#0d2440] hover:text-white"
                      }`}
                    >
                      <span>{isFree ? "Verify Now" : "View & Pay"}</span>
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          HOW IT WORKS
      ═══════════════════════════════════════════════ */}
      <section className="py-16 bg-[#0d2440]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">

          <h3 className="text-2xl md:text-3xl font-black text-white text-center mb-10 tracking-tight">
            How Tauzand pricing works
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Pick the feature you need",
                desc: "Navigate to any tool or service page on Tauzand each one is independent.",
                icon: "🎯",
              },
              {
                step: "02",
                title: "See the price on that page",
                desc: "Each feature shows its exact minimum payment. No surprises, no bundled fees.",
                icon: "💰",
              },
              {
                step: "03",
                title: "Pay once. Use it.",
                desc: "Your access is immediate. ICL & IATS are always free up to 75 uses each.",
                icon: "⚡",
              },
            ].map((step) => (
              <div
                key={step.step}
                className="bg-white/6 border border-white/10 rounded-3xl p-7"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{step.icon}</span>
                  <span className="text-[10px] font-black text-[#ffd77a] uppercase tracking-[0.2em]">
                    Step {step.step}
                  </span>
                </div>
                <h4 className="text-[15px] font-black text-white mb-2 leading-snug">
                  {step.title}
                </h4>
                <p className="text-[13px] text-gray-400 font-medium leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Info note */}
          <div className="mt-8 flex items-start gap-3 bg-[#ffd77a]/10 border border-[#ffd77a]/20 rounded-2xl p-5">
            <Info size={16} className="text-[#ffd77a] mt-0.5 flex-shrink-0" />
            <p className="text-sm text-[#ffd77a]/90 font-medium leading-relaxed">
              <strong className="text-[#ffd77a]">ICL (AI Cover Letter)</strong> and{" "}
              <strong className="text-[#ffd77a]">IATS (AI Resume Analyzer)</strong> are
              Tauzand's complementary tools use them up to 75 times each without any payment.
              All other features are priced independently on their respective pages.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CTA
      ═══════════════════════════════════════════════ */}
      <section className="relative py-20 px-6 overflow-hidden bg-[#e7f0fa]">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="bg-amber-400 rounded-[3rem] p-1 shadow-[0_20px_50px_rgba(251,191,36,0.3)]">
            <div
              className="bg-amber-400 border-4 border-[#0d2440] rounded-[2.7rem] px-8 py-16 md:px-16 text-center relative overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230d2440' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-black text-[#0d2440] mb-5 leading-tight">
                  Not sure which feature{" "}
                  <span className="underline decoration-8 decoration-[#0d2440]/90 underline-offset-4">
                    you need?
                  </span>
                </h2>
                <p className="text-[#0d2440]/75 text-lg font-bold max-w-xl mx-auto mb-10">
                  Start with ICL &amp; IATS for free or talk to us about credits, internship plans, or any custom query.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/contact"
                    className="w-full sm:w-auto px-10 py-4 bg-[#0d2440] text-amber-400 rounded-2xl font-black text-lg shadow-[0_8px_0_0_#2e5e99] active:shadow-none active:translate-y-[4px] transition-all flex items-center justify-center gap-3"
                  >
                    Talk to Us
                    <ArrowRight size={18} />
                  </Link>
                  <Link
                    href="/ai-resume-analyser"
                    className="w-full sm:w-auto px-10 py-4 bg-white/30 border-2 border-[#0d2440] text-[#0d2440] rounded-2xl font-black text-lg flex items-center justify-center gap-3"
                  >
                    <Gift size={18} />
                    Try Free Tools
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}