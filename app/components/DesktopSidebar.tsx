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
  Building2,
  Phone,
  Info,
  Menu,
  DollarSignIcon,
  Book,
  Chrome,
  ChevronLeft, ChevronRight, Pen,
  ChevronDown,
  FileQuestionMark,
  LayoutDashboard,
  ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import UsageProvider from "./UsageProvider";
import { usePathname } from "next/navigation";

export default function DesktopSidebar({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}) {
  const [internshipOpen, setInternshipOpen] = useState(false);

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
            transition-all duration-300 ease-in-out
            overflow-y-auto overflow-x-hidden
            ${collapsed
            ? "w-20 -translate-x-full lg:translate-x-0"
            : "w-54 translate-x-0 bg-[#e7f0fa] no-scrollbar "}
        `}
      >
        {/* LOGO PLACEHOLDER */}
        <div className="h-20 flex items-center justify-center">
          {collapsed ? (
            <a href="/">
            <div className="w-13 h-13 bg-[#0d2440] rounded-lg flex items-center justify-center font-bold text-[#e7f0fa] shadow-md">
              <img src="/vfound.png" alt="Logo" className="rounded-3xl"/>
            </div>
            </a>
          ) : (
            <a href="/">
            <div className="mt-4 px-3 w-full ">
                <span className="block text-5xl font-bold kaushan-script-regular text-[#0d2440]">
                  Vfound.in
                </span>
            </div>
            </a>
          )}
        </div>

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


        {/* TAGLINE */}
        {!collapsed && (
          <div className="px-3">
            <p className="mt-2 ml-3 text-sm text-gray-800">
              Your AI Developer Builder
            </p>
            <hr className="mt-3 text-gray-300"/>
          </div>
        )}

        {/* SERVICES */}
        <div className="mt-6 px-2">
          {!collapsed && (
            <p className="text-xs text-[#0d2440] px-3 mb-2">SERVICES</p>
          )}

          <NavItem icon={Sparkles} label="Advance Analysis" href="/ai-resume-analysis" collapsed={collapsed}/>
          <NavItem icon={FileText} label="Cover Letter" href="/cover-letter" collapsed={collapsed} />
          
          {/* NESTED NAVBAR START */}
          <div className="flex flex-col">
            <button 
              onClick={() => !collapsed && setInternshipOpen(!internshipOpen)}
              className="group relative flex items-center justify-between w-full gap-3 px-4 py-2 rounded-xs hover:bg-[#7ba4d0] hover:scale-108 text-[#0d2440] transition duration-100 ease-in-out"
            >
              <div className="flex items-center gap-3">
                <ShieldCheck size={25} />
                {!collapsed && <span className="text-sm font-medium">Certification</span>}
                {collapsed && (
                  <div className="absolute left-14 bg-[#0d2440] text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-[2500ms] whitespace-nowrap z-[100]">
                    Certification
                  </div>
                )}
              </div>
              {!collapsed && (
                <ChevronDown size={16} className={`transition-transform ${internshipOpen ? "rotate-180" : ""}`} />
              )}
            </button>
            
            <AnimatePresence>
              {internshipOpen && !collapsed && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden flex flex-col ml-4 border-l border-gray-400"
                >
                  <NavItem icon={FileQuestionMark} label="How it works ?" href="/internship" collapsed={collapsed} isNested />
                  <NavItem icon={LayoutDashboard} label="Dashboard" href="/internship/userdashboard" collapsed={collapsed} isNested />
                  <NavItem icon={ShieldCheck} label="Validate" href="/internship/validate" collapsed={collapsed} isNested />
                  
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {/* NESTED NAVBAR END */}

          <NavItem icon={Pen} label="KIIT Study Material" href="/kiit" collapsed={collapsed} />
          <NavItem icon={Chrome} label="Extension" href="/extension" collapsed={collapsed} />
          <NavItem icon={Briefcase} label="IT Jobs" href="/it-jobs" collapsed={collapsed} />
          <NavItem icon={Menu} label="Blogs" href="/blog" collapsed={collapsed} />
        </div>

        {/* COMPANY */}
        <div className="mt-6 px-2">
          {!collapsed && (
            <p className="text-xs text-[#0d2440] px-3 mb-2">COMPANY</p>
          )}
          <NavItem icon={Info} label="About Us" href="/about" collapsed={collapsed} />
          <NavItem icon={DollarSignIcon} label="Pricing" href="/pricing" collapsed={collapsed} />
          <NavItem icon={Phone} label="Contact us" href="/contact" collapsed={collapsed} />
          <NavItem icon={Book} label="FAQ" href="/FAQ" collapsed={collapsed} />
        </div>

        {/* BOTTOM */}
        <div className="absolute bottom-0 w-full bg-[#ffd77a]/70 rounded-t-3xl p-3">
          <SignedIn>
            <div className="flex items-center justify-between">
              {!collapsed && <UsageProvider />}
              <div className="flex items-center justify-center scale-150">
                <UserButton />
              </div>
            </div>
          </SignedIn>

          <SignedOut>
            {!collapsed && (
              <div className="flex gap-2">
                  <div className="mt-2 flex gap-6">
                    <a
                        href="/sign-in"
                        className="border relative h-8 py-0.5 px-2.5 text-black text-xl font-bold overflow-hidden bg-white rounded-4xl transition-all duration-200 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-700 before:to-blue-400 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0">
                        Sign in
                    </a>
                    </div>
                  <div className="mt-2 flex gap-6">
                    <a
                        href="/sign-up"
                        className="border relative h-8 py-0.5 p-2.5 text-black text-xl font-bold overflow-hidden bg-white rounded-4xl transition-all duration-200 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-700 before:to-blue-400 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0">
                        Sign up
                    </a>
                    </div>
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
            ${isNested ? "ml-2 scale-95 opacity-90" : ""}`}
    >
      <Icon size={isNested ? 20 : 25} />
      {!collapsed && <span className="text-sm font-medium">{label}</span>}
      
      {/* 2.5s Tooltip for collapsed mode */}
      {collapsed && (
        <div className="absolute left-14 bg-[#0d2440] text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-[2500ms] whitespace-nowrap z-[100]">
          {label}
        </div>
      )}
    </Link>
  );
}