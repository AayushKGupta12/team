"use client";
import Link from "next/link";
import React, { useState } from "react";
import {
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import {
  Sparkles,
  Briefcase,
  FileText,
  Phone,
  Info,
  Menu,
  Book,
  Chrome,
  ChevronLeft, 
  ChevronRight,
  ChevronDown,
  FileQuestionMark,
  LayoutDashboard,
  ShieldCheck,
  BookOpen
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import UsageProvider from "./UsageProvider";

export default function DesktopSidebar({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}) {
  const [internshipOpen, setInternshipOpen] = useState(false);
  const [analysisOpen, setAnalysisOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [newsOpen, setNewsOpen] = useState(false);

  return (
    <>
      {/* Mobile Overlay */}
      {!collapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-50
          h-screen bg-[#2e5e99] border-r
          transition-all duration-200 ease-in-out
          overflow-y-auto overflow-x-hidden
          flex flex-col
          ${collapsed
            ? "w-20 -translate-x-full lg:translate-x-0 no-scrollbar bg-[#7ba4d0] overflow-y-auto overflow-x-visible"
            : "w-54 translate-x-0 bg-[#e7f0fa] no-scrollbar"}
        `}
      >
        {/* LOGO */}
        <div className="h-20 flex items-center justify-center">
          {collapsed ? (
            <a href="/">
              <div className="w-13 h-13 bg-[#fff] rounded-lg flex items-center justify-center font-bold text-[#e7f0fa] mt-5">
                <img
                  src="/tauzand.png"
                  alt="Logo"
                  className="rounded-3xl"
                />
              </div>
            </a>
          ) : (
            <a href="/">
              <div className="mt-12 px-3 w-full flex justify-center">
                <img
                  src="/tauzand.png"
                  alt="Logo"
                  className="w-42 h-auto rounded-3xl object-contain"
                />
              </div>
            </a>
          )}
        </div>

        {/* TOGGLE BUTTON */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="
            absolute right-[-14] top-2/3 -translate-y-1/2
            px-3 rounded-full bg-[#ffd77a]
            shadow-md ring-1 ring-[#e6a520]
            hover:bg-[#e7f0fa]
            text-[#0d2440]
            transition-all duration-300
            z-[99]
          "
        >
          <AnimatePresence mode="wait">
            {collapsed ? (
              <motion.div
                key="menu"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronLeft size={22} />
              </motion.div>
            ) : (
              <motion.div
                key="ChevronLeft"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronRight size={22} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        {/* SERVICES */}
        <div className="mt-14 px-2">
          {!collapsed && (
            <p className="text-xs text-[#0d2440] px-3 mb-2">SERVICES</p>
          )}

          {/* ANALYSIS */}
          <div className="flex flex-col">
            {!collapsed && (
              <button 
                onClick={() => setAnalysisOpen(!analysisOpen)}
                className="group relative flex items-center justify-between w-full gap-3 px-4 py-2 rounded-xs hover:bg-[#7ba4d0] hover:scale-108 text-[#0d2440] transition duration-100 ease-in-out"
              >
                <div className="flex items-center gap-3">
                  <Sparkles size={25} />
                  <span className="text-sm font-medium">Analysis</span>
                </div>
                <ChevronDown size={16} className={`transition-transform ${analysisOpen ? "rotate-180" : ""}`} />
              </button>
            )}

            <AnimatePresence initial={false}>
              {(analysisOpen || collapsed) && (
                <motion.div 
                  initial={collapsed ? { opacity: 1 } : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className={`overflow-hidden flex flex-col ${!collapsed ? "ml-4 border-l border-gray-400" : ""}`}
                >
                  <NavItem icon={Sparkles} label="Advance Analysis" href="/ai-resume-analyser" collapsed={collapsed} isNested />
                  <NavItem icon={FileText} label="Cover Letter" href="/cover-letter" collapsed={collapsed} isNested />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* SKILL VALIDATION */}
          <div className="flex flex-col">
            {!collapsed && (
              <button 
                onClick={() => setInternshipOpen(!internshipOpen)}
                className="group relative flex items-center justify-between w-full gap-3 px-4 py-2 rounded-xs hover:bg-[#7ba4d0] hover:scale-108 text-[#0d2440] transition duration-100 ease-in-out"
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck size={25} />
                  <span className="text-sm font-medium">Skill validation</span>
                </div>
                <ChevronDown size={16} className={`transition-transform ${internshipOpen ? "rotate-180" : ""}`} />
              </button>
            )}
            
            <AnimatePresence initial={false}>
              {(internshipOpen || collapsed) && (
                <motion.div 
                  initial={collapsed ? { opacity: 1 } : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className={`overflow-hidden flex flex-col ${!collapsed ? "ml-4 border-l border-gray-400" : ""}`}
                >
                  <NavItem icon={FileQuestionMark} label="How it works ?" href="/internship" collapsed={collapsed} isNested />
                  <NavItem icon={LayoutDashboard} label="Dashboard" href="/internship/userdashboard" collapsed={collapsed} isNested />
                  <NavItem icon={ShieldCheck} label="Validate" href="/internship/validate" collapsed={collapsed} isNested />
                  <NavItem icon={BookOpen} label="Project" href="/internship/project" collapsed={collapsed} isNested />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* TOOLS */}
          <div className="flex flex-col">
            {!collapsed && (
              <button 
                onClick={() => setToolsOpen(!toolsOpen)}
                className="group relative flex items-center justify-between w-full gap-3 px-4 py-2 rounded-xs hover:bg-[#7ba4d0] hover:scale-108 text-[#0d2440] transition duration-100 ease-in-out"
              >
                <div className="flex items-center gap-3">
                  <Briefcase size={25} />
                  <span className="text-sm font-medium">Tools & Jobs</span>
                </div>
                <ChevronDown size={16} className={`transition-transform ${toolsOpen ? "rotate-180" : ""}`} />
              </button>
            )}

            <AnimatePresence initial={false}>
              {(toolsOpen || collapsed) && (
                <motion.div 
                  initial={collapsed ? { opacity: 1 } : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className={`overflow-hidden flex flex-col ${!collapsed ? "ml-4 border-l border-gray-400" : ""}`}
                >
                  <NavItem icon={Chrome} label="Extension" href="/extension" collapsed={collapsed} isNested />
                  <NavItem icon={Briefcase} label="IT Jobs" href="/it-jobs" collapsed={collapsed} isNested />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* NEWS */}
          <div className="flex flex-col">
            {!collapsed && (
              <button 
                onClick={() => setNewsOpen(!newsOpen)}
                className="group relative flex items-center justify-between w-full gap-3 px-4 py-2 rounded-xs hover:bg-[#7ba4d0] hover:scale-108 text-[#0d2440] transition duration-100 ease-in-out"
              >
                <div className="flex items-center gap-3">
                  <Menu size={25} />
                  <span className="text-sm font-medium">News</span>
                </div>
                <ChevronDown size={16} className={`transition-transform ${newsOpen ? "rotate-180" : ""}`} />
              </button>
            )}

            <AnimatePresence initial={false}>
              {(newsOpen || collapsed) && (
                <motion.div 
                  initial={collapsed ? { opacity: 1 } : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className={`overflow-hidden flex flex-col ${!collapsed ? "ml-4 border-l border-gray-400" : ""}`}
                >
                  <NavItem icon={Menu} label="Blogs" href="/blog" collapsed={collapsed} isNested />
                  <NavItem icon={Menu} label="News" href="/news" collapsed={collapsed} isNested />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* COMPANY */}
        <div className="mt-6 px-2 pb-28">
          {!collapsed && (
            <p className="text-xs text-[#0d2440] px-3 mb-2">COMPANY</p>
          )}
          <NavItem icon={Info} label="About Us" href="/about" collapsed={collapsed} />
          <NavItem icon={Phone} label="Contact us" href="/contact" collapsed={collapsed} />
          <NavItem icon={Book} label="FAQ" href="/FAQ" collapsed={collapsed} />
        </div>

        {/* BOTTOM */}
        <div className="mt-auto px-3 pb-4 pt-4 border-t border-yellow-300 bg-[#ffd77a]/90 rounded-t-3xl">
          <SignedIn>
            <div className="flex items-center justify-between">
              {!collapsed && <UsageProvider />}
              <div className={`flex items-center justify-center ${collapsed ? 'w-full scale-125' : 'scale-150'}`}>
                <UserButton />
              </div>
            </div>
          </SignedIn>

          <SignedOut>
            {!collapsed && (
              <div className="flex flex-col gap-3 mt-2">
                <a href="/sign-in" className="border h-9 flex items-center justify-center text-black font-bold rounded-3xl hover:bg-white transition-all">Sign in</a>
                <a href="/sign-up" className="border h-9 flex items-center justify-center text-black font-bold rounded-3xl hover:bg-white transition-all">Sign up</a>
              </div>
            )}
          </SignedOut>
        </div>
      </aside>
    </>
  );
}

/* ---------- NAV ITEM ---------- */

function NavItem({
  icon: Icon,
  label,
  href,
  collapsed,
  isNested = false
}: {
  icon: any;
  label: string;
  href: string;
  collapsed: boolean;
  isNested?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group relative flex items-center gap-3 px-4 py-2 rounded-xs 
            hover:bg-[#7ba4d0] hover:scale-108
            text-[#0d2440] transform 
            transition duration-100 ease-in-out
            ${isNested && !collapsed ? "ml-2 scale-95 opacity-90" : ""}
            ${collapsed ? "justify-center px-0" : ""}`}
    >
      <Icon size={(isNested && !collapsed) ? 20 : 25} />
      {!collapsed && <span className="text-sm font-medium">{label}</span>}
      
      {collapsed && (
        <div className="absolute left-14 bg-[#0d2440] text-white text-lg py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-[500ms] whitespace-nowrap z-[100]">
          {label}
        </div>
      )}
    </Link>
  );
}