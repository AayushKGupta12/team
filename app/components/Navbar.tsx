"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, UserButton, useClerk, useUser } from "@clerk/nextjs";
import { Menu, ChevronDown, Home, Layers, Cpu, Compass, Users, X, Settings, LogOut, Briefcase, GraduationCap, Newspaper, Building2, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import UsageProvider from "./UsageProvider";

// Merged & expanded structural layout for a massive screen footprint
const navItems = [
  {
    label: "Research & Placements",
    icon: Cpu,
    subtitle: "Learning & Development",
    sections: [
      {
        title: "Developer Tools",
        items: [
          { label: "AI Research Extension", href: "/extension", desc: "Instant insights while browsing technical content." },
          { label: "Extension Dashboard", href:"/extension/extension_userdashboard", desc:"See your usages, re-generate API & more"},
          { label: "Download Core Extension", href: "https://github.com/AayushKGupta12/Tauzand_extension/archive/refs/heads/main.zip", desc: "Download the browser extension package." },
          { label: "API Documentation", href: "/extension/api-doc", desc: "Technical documentation and integration guides." },
        ]
      },
      {
        title: "Placement Prep 2026",
        items: [
          { label: "Company-wise DSA", href: "/DSA", desc: "800+ interview questions from top companies." },
          { label: "DSA Dashboard", href: "/DSA/userdashboard", desc: "Track your DSA practice and performance." },
          { label: "Terms of Use", href: "/term-of-use", desc: "Platform rules and guidelines." },
        ]
      }
    ]
  },
  {
    label: "Services",
    icon: Layers,
    subtitle: "Career Development",
    sections: [
      {
        title: "Skill's & Internship",
        items: [
          { label: "Skill & Internship Validation", href: "/internship", desc: "Get your skills and internships officially verified by industry mentors." },
          { label: "Project Dashboard", href: "/internship/userdashboard", desc: "Manage your projects, track progress, and access all tools." },
          { label: "Available Projects", href: "/internship/project", desc: "Browse and apply for verified internship projects." },
          { label: "Validate Certificate", href: "/internship/validate", desc: "Verify the authenticity of any Tauzand certificate." },
        ]
      },
      {
        title: "Intelligent Tools",
        items: [
          { label: "AI Resume Analyzer", href: "/ai-resume-analyser", desc: "Get deep insights and improvement suggestions for your resume." },
          { label: "AI Cover Letter Generator", href: "/cover-letter", desc: "Create personalized, job-specific cover letters instantly." },
        ]
      }
    ]
  },

  {
    label: "Updates & Media",
    icon: Compass,
    subtitle: "News & Opportunities",
    sections: [
      {
        title: "Intelligence Channels",
        items: [
          { label: "IT Job Openings", href: "/it-jobs", desc: "Discover active job opportunities in tech." },
          { label: "Engineering Blog", href: "/blog", desc: "Insights on technology, career, and industry trends." },
          { label: "Weekly Newsletter", href: "/news", desc: "Curated industry updates delivered to your inbox." },
        ]
      }
    ]
  },
  {
    label: "Company",
    icon: Users,
    subtitle: "About Us & Careers",
    sections: [
      {
        title: "Corporate Identity",
        items: [
          { label: "About Tauzand", href: "/about", desc: "Our mission, vision, and story." },
          { label: "Contact Us", href: "/contact", desc: "Get in touch with our team." },
          { label: "Frequently Asked Questions", href: "/FAQ", desc: "Quick answers to common questions." },
          { label: "Pricing", href: "/pricing", desc: "Transparent plans and pricing." },
        ]
      },
      {
        title: "We Us Ours",
        items: [
          { label: "Careers", href: "/careers", desc: "Life at Tauzand and open opportunities." },
          { label: "Teams" , href: "/team", desc: "Face Behind Execution"},
          ]
      }
    ]
  }
];

// Mobile-drawer-only accent colors per category (desktop styling is untouched)
// Mobile-drawer-only icons per category (desktop icons/styling are untouched)
const mobileIcons: Record<string, typeof Briefcase> = {
  "Services": Briefcase,
  "Research & Placements": GraduationCap,
  "Updates & Media": Newspaper,
  "Company": Building2,
};

const mobileAccentColors: Record<string, { bg: string; text: string }> = {
  "Services": { bg: "bg-orange-50", text: "text-orange-500" },
  "Research & Placements": { bg: "bg-amber-50", text: "text-amber-600" },
  "Updates & Media": { bg: "bg-pink-50", text: "text-pink-500" },
  "Company": { bg: "bg-purple-50", text: "text-purple-500" },
};

export default function Navbar(): React.JSX.Element {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [mobileAccountOpen, setMobileAccountOpen] = useState(false);
  const [mobileUsage, setMobileUsage] = useState<{ plan: string; used: number; total: number } | null>(null);
  const [clerkLogoFailed, setClerkLogoFailed] = useState(false);

  const lastY = useRef(0);
  const ticking = useRef(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  useEffect(() => {
    if (!user) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/usage-status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.id }),
    })
      .then((res) => res.json())
      .then(setMobileUsage)
      .catch(() => {});
  }, [user]);

  const mobileUsagePercent = mobileUsage
    ? Math.min(Math.round((mobileUsage.used / mobileUsage.total) * 100), 100)
    : 0;

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          if (currentY > lastY.current + 10 && currentY > 100) setVisible(false);
          else if (currentY < lastY.current - 10) setVisible(true);
          lastY.current = currentY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  if (pathname === "/sign-in" || pathname === "/sign-up") return null;

  return (
    <>
      {/* ================= DESKTOP STRETCH NAVBAR ================= */}
      <header
        className={`rounded-4xl fixed top-2 left-15 right-15 h-18 
        bg-[#e7f0fa]/40 
        border border-gray-300 
        shadow-xl
        backdrop-blur-xs
        bg-gradient-to-r from-white/20 to-white/10 
        z-50 items-center justify-between px-10 
        transition-transform duration-500 hidden md:flex 
        ${visible ? "translate-y-0" : "-translate-y-full"}`}
        ref={dropdownRef}
      >
        {/* Left Side: Brand Logo Wrapper */}
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/tauzand.png" alt="Logo" className="h-17 w-auto object-contain rounded-md" />
          </Link>
        </div>

        {/* Center: Merged Large Target Triggers */}
        <nav className="flex items-center gap-2">

          {navItems.map((item) => {
            const isCurrentlyOpen = activeDropdown === item.label;
            return (
              <button
                key={item.label}
                onClick={() => setActiveDropdown(isCurrentlyOpen ? null : item.label)}
                className={`flex items-center gap-1 px-2 py-1.5 text-[15px] font-semibold transition-all rounded-md cursor-pointer${
                  isCurrentlyOpen 
                    ? "text-[#0d2440] bg-blue-200" 
                    : "hover:bg-[#ffd77a] cursor-pointer"
                }`}
              >
                <span>{item.label}</span>
                <ChevronDown
                  size={15}
                  className={`transition-transform duration-200 text-gray-800 ${isCurrentlyOpen ? "rotate-180 text-blue-600" : ""}`}
                />
              </button>
            );
          })}
        </nav>

        {/* Right Side: Auth & System Controls */}
        <div className="flex items-center gap-4">
          <SignedIn>
            <div className="flex items-center gap-5">
              <div className="hidden lg:block">
                <UsageProvider />
              </div>
              <div className="scale-180 px-1 rounded-full shadow-inner">
                <UserButton afterSignOutUrl="/"/>
              </div>
            </div>
          </SignedIn>

          <SignedOut>
            <div className="flex items-center gap-5">
              <Link
                href="/sign-in"
                className="text-[15px] font-bold text-gray-600 hover:text-blue-600 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="bg-[#3b82f6] text-white px-5 py-2.5 rounded-xl font-bold text-[15px] shadow-lg shadow-blue-500/10 hover:bg-blue-600 transition-all active:scale-[0.98]"
              >
                Get Started
              </Link>
            </div>
          </SignedOut>
        </div>

        {/* ================= MASSIVE FULL-WIDTH HORIZONTAL FLYOUT PANELS ================= */}
        <AnimatePresence>
          {activeDropdown && (() => {
            const currentConfig = navItems.find((n) => n.label === activeDropdown);
            if (!currentConfig) return null;
            const TargetIcon = currentConfig.icon;

            return (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute left-0 right-0 top-21 w-full bg-white border-b border-slate-200 shadow-2xl grid grid-cols-12 overflow-hidden z-40 max-h-[520px] rounded-2xl"
              >
                {/* Left Segment: Broad Hero Overview Column */}
                <div className="col-span-3 bg-[#ffd77a]/40 border-r border-slate-300 p-8 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="p-3 bg-white border border-slate-200 rounded-xl w-fit shadow-xs text-blue-600">
                      <TargetIcon size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-[#0d2440] tracking-tight">
                        {currentConfig.label}
                      </h3>
                      <p className="text-xs font-medium text-[#0d2440] mt-0.5 uppercase tracking-wider">
                        {currentConfig.subtitle}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Optimize operational throughput and manage core technical intelligence components efficiently.
                    </p>
                  </div>
                  <div className="text-xs font-semibold text-slate-600">
                    Tauzand Platform v4.4.0
                  </div>
                </div>

                {/* Right Segment: dynamic layout columns (1 or 2 columns based on contents) */}
                <div className={`col-span-9 p-8 grid gap-8 overflow-y-auto ${
                  currentConfig.sections.length > 1 ? "grid-cols-2" : "grid-cols-1"
                }`}>
                  {currentConfig.sections.map((sect, sIdx) => (
                    <div key={sIdx} className="space-y-4">
                      <h4 className="text-xs font-bold text-[#0d2440] uppercase tracking-widest border-b border-slate-400 pb-2">
                        {sect.title}
                      </h4>
                      <div className="grid gap-2">
                        {sect.items.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            onClick={() => setActiveDropdown(null)}
                            className="group flex flex-col p-3 rounded-2xl hover:bg-[#ffd77a]/40 border border-transparent hover:border-yellow-500 transition-all"
                          >
                            <span className="text-sm font-bold text-[#0d2440] transition-colors">
                              {subItem.label}
                            </span>
                            <span className="text-xs text-slate-700 font-medium mt-1 transition-colors line-clamp-1">
                              {subItem.desc}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </header>

      {/* ================= COMPACT MOBILE HEADER BAR ================= */}

      <header
        className={`rounded-xs fixed top-2 left-3 right-3 h-15 bg-[#e7f0fa]/70  border border-gray-300 
        shadow-xl backdrop-blur-xs z-50 flex md:hidden items-center justify-between px-10  transition-transform duration-500 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <Link href="/" className="flex items-center gap-2.5">
          <img src="/tauzand.png" alt="Logo" className="h-10 w-auto object-contain rounded-md" />
          <span className="text-xl font-semibold text-gray-700">
            Tauzand
          </span>
        </Link>
        <div className="flex items-center gap-3">
          {/* Show UserButton inline in header when signed in */}
          <SignedIn>
            <div className="p-0.5 scale-130 mt-2 ">
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-md text-[#0d2440]"
            aria-label="Open menu"
          >
            <Menu size={25} strokeWidth={2.5} />
          </button>
        </div>
      </header>

      {/* ================= MOBILE NAVIGATION DRAWER ================= */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[100] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* Backdrop */}
            <div
              onClick={() => setMobileOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Drawer Panel — matches desktop: white/95, rounded-3xl, border gray-100, shadow-md */}
            <motion.aside
              className="fixed right-3 top-3 bottom-3 w-[82vw] max-w-[340px] bg-white/95 border border-gray-100 shadow-md rounded-3xl flex flex-col overflow-hidden"
              initial={{ x: "calc(100% + 16px)" }}
              animate={{ x: 0 }}
              exit={{ x: "calc(100% + 16px)" }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              {/* Drawer Header — mirrors desktop header height & padding feel */}
          <div className="h-16 px-5 border-b border-gray-100 flex items-center justify-between shrink-0">
            <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5">
              <img src="/tauzand.png" alt="Logo" className="h-12 w-auto object-contain rounded-md" />
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="text-[#0d2440]"
              aria-label="Close menu"
            >
              <X size={26} strokeWidth={2.5} />
            </button>
          </div>

          {/* Signed-out promo banner — mirrors Figma top-of-drawer bar for logged-out state */}
          <SignedOut>
            <div className="px-5 pt-2.5 pb-1 shrink-0">
              <Link
                href="/sign-up"
                onClick={() => setMobileOpen(false)}
                className="block text-center text-[12px] font-bold text-[#3b82f6]"
              >
                Sign up to get FREE credits
              </Link>
            </div>
          </SignedOut>

          {/* Active Workspace usage — mirrors Figma top-of-drawer bar */}
          <SignedIn>
            <div className="px-5 pt-3 pb-1 shrink-0">
              <div className="rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3">
                <div className="flex items-center justify-between text-[13px] font-semibold text-slate-500 mb-2">
                  <span>Active Workspace</span>
                  <span className="text-[#0d2440]">
                    {mobileUsage ? `${mobileUsage.used}/${mobileUsage.total}` : "0/75"}
                  </span>
                  <span className="text-[#0d2440] font-bold">{mobileUsage?.plan?.toUpperCase() ?? "Free"}</span>
                </div>
                <div className="relative w-full h-6 rounded-full bg-gray-200 overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full bg-blue-100"
                    initial={{ width: 0 }}
                    animate={{ width: `${mobileUsagePercent}%` }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold text-slate-500">
                    {mobileUsagePercent}%
                  </span>
                </div>
              </div>
            </div>
          </SignedIn>

          {/* Browse label */}
          <p className="px-5 pt-2 pb-1 text-[11px] font-bold text-black uppercase tracking-widest shrink-0">
            Browse
          </p>

          {/* Scrollable Nav Items */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
            {navItems.map((item) => {
              const isDropdownOpen = mobileDropdown === item.label;
              const ItemIcon = mobileIcons[item.label] ?? item.icon;
              const accent = mobileAccentColors[item.label] ?? { bg: "bg-slate-100", text: "text-slate-600" };
              const sectionSummary = item.sections.map((s) => s.title).join(" | ");
              return (
                <div
                  key={item.label}
                  className={`rounded-xl border overflow-hidden transition-colors ${
                    isDropdownOpen
                      ? "border-gray-600 bg-slate-50"
                      : "border-gray-100 bg-slate-50"
                  }`}
                >
                  {/* Section trigger */}
                  <button
                    onClick={() => setMobileDropdown(isDropdownOpen ? null : item.label)}
                    className="flex items-center justify-between w-full py-3.5 px-4 text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`p-1.5 rounded-lg ${accent.bg} ${accent.text}`}>
                        <ItemIcon size={18} strokeWidth={2.5} />
                      </div>
                      <div>
                        <span className="text-[14px] font-bold text-[#0d2440] block leading-tight">
                          {item.label}
                        </span>
                        <span className="text-[10px] font-medium text-slate-500 normal-case tracking-normal">
                          {sectionSummary}
                        </span>
                      </div>
                    </div>
                    <ChevronDown
                      size={15}
                      strokeWidth={2.5}
                      className={`text-slate-400 transition-transform duration-200 ${
                        isDropdownOpen ? "rotate-180 text-blue-600" : ""
                      }`}
                    />
                  </button>

                  {/* Expanded section — mirrors flyout panel section titles & items */}
                  <AnimatePresence initial={false}>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-3 pb-3 pt-2 space-y-3">
                          {item.sections.map((sect, sIdx) => (
                            <div key={sIdx}>
                              {/* Section heading — bolder, darker underline */}
                              <p className="text-[9px] font-extrabold text-[#0d2440] uppercase tracking-widest border-b-2 border-slate-400 pb-1.5 mb-2 px-1">
                                {sect.title}
                              </p>
                              <div className="space-y-1">
                                {sect.items.map((subItem) => (
                                  <Link
                                    key={subItem.href}
                                    href={subItem.href}
                                    onClick={() => {
                                      setMobileOpen(false);
                                      setMobileDropdown(null);
                                    }}
                                    className="flex flex-col p-2.5 rounded-2xl border border-transparent"
                                  >
                                    <span className="text-[11px] font-semibold text-[#0d2440]">
                                      {subItem.label}
                                    </span>
                                    <span className="text-[10px] text-slate-500 font-medium mt-0.5 line-clamp-1">
                                      {subItem.desc}
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Drawer Footer — Auth controls, mirrors desktop right-side auth */}
          <div className="px-4 pb-4 pt-3 border-t border-gray-300 shrink-0">
            <SignedIn>
              {/* Expandable account menu */}
              <AnimatePresence>
                {mobileAccountOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="rounded-2xl border border-gray-200 bg-white mb-2 overflow-hidden">
                      <div className="flex items-center gap-2.5 px-3 py-2.5 border-b border-gray-300">
                        <img
                          src={user?.imageUrl}
                          alt={user?.fullName ?? "User"}
                          className="h-9 w-9 rounded-full object-cover"
                        />
                        <div className="min-w-0">
                          <p className="text-[13px] font-bold text-[#0d2440] truncate">{user?.fullName}</p>
                          <p className="text-[11px] text-slate-500 truncate">
                            {user?.primaryEmailAddress?.emailAddress}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => openUserProfile()}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 text-[13px] font-semibold text-[#0d2440] border-b border-gray-300"
                      >
                        <Settings size={16} strokeWidth={2.25} />
                        Manage Account
                      </button>
                      <button
                        onClick={() => signOut()}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 text-[13px] font-semibold text-[#0d2440] border-b border-gray-300"
                      >
                        <LogOut size={16} strokeWidth={2.25} />
                        Sign out
                      </button>
                      <div className="flex justify-center py-2.5 bg-slate-50">
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-slate-500">
                          Secured by
                          {/* Download the official icon SVG from https://clerk.com/brand-assets
                              and save it as /public/clerk-logo.svg — this references that file.
                              Falls back to text if the file isn't found yet.
                              Note: the downloaded logo already includes the "Clerk" wordmark,
                              so we don't repeat "Clerk" as separate text. */}
                          {clerkLogoFailed ? (
                            <span className="inline-flex items-center gap-1 font-semibold text-slate-700">
                              <ShieldCheck size={14} strokeWidth={2.25} />
                              Clerk
                            </span>
                          ) : (
                            <img
                              src="/clerk-logo.svg"
                              alt="Clerk"
                              className="h-[10px] w-auto"
                              onError={() => setClerkLogoFailed(true)}
                            />
                          )}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Collapsed profile trigger row */}
              <button
                onClick={() => setMobileAccountOpen((o) => !o)}
                className="w-full flex items-center gap-2.5 rounded-2xl bg-[#0074D933] px-3 py-2.5"
              >
                <img
                  src={user?.imageUrl}
                  alt={user?.fullName ?? "User"}
                  className="h-9 w-9 rounded-full object-cover"
                />
                <div className="min-w-0 flex-1 text-left">
                  <p className="text-[13px] font-bold text-[#0d2440] truncate">{user?.fullName}</p>
                  <p className="text-[11px] text-slate-500 truncate">
                    {user?.primaryEmailAddress?.emailAddress}
                  </p>
                </div>
                <ChevronDown
                  size={16}
                  strokeWidth={2.5}
                  className={`text-slate-400 transition-transform duration-200 ${
                    mobileAccountOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </SignedIn>

            <SignedOut>
              <div className="grid grid-cols-2 gap-2.5">
                <Link
                  href="/sign-in"
                  onClick={() => setMobileOpen(false)}
                  className="w-full py-3 text-center border border-gray-100 rounded-xl font-bold text-[14px] text-[#0d2440] bg-white shadow-sm"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  onClick={() => setMobileOpen(false)}
                  className="w-full py-3 text-center bg-[#3b82f6] text-white rounded-xl font-bold text-[14px] shadow-lg shadow-blue-500/10"
                >
                  Get Started
                </Link>
              </div>
            </SignedOut>

            {/* Platform badge — mirrors desktop flyout footer */}
            <p className="text-[10px] font-semibold text-slate-400 text-center">
              Tauzand Platform v4.4.0
            </p>
          </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}