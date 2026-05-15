"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
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
  BookOpen,
  Code,
  Laptop,
  Download,
  ShieldAlert,
  DollarSign,
  UserCheck,
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
  const [mounted, setMounted] = useState(false);
  
  // Dropdown States for expanded sidebar view
  const [servicesOpen, setServicesOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [researchOpen, setResearchOpen] = useState(false);
  const [cheatSheetOpen, setCheatSheetOpen] = useState(false);
  const [updatesOpen, setUpdatesOpen] = useState(false);
  const [companiesOpen, setCompaniesOpen] = useState(false);
  const [hiringOpen, setHiringOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

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

        {/* SERVICES GROUP */}
        <div className="mt-14 px-2 flex flex-col gap-1">
          {!collapsed && (
            <p className="text-xs text-[#0d2440] px-3 mb-2">SERVICES</p>
          )}

          {/* 1. Services Dropdown */}
          <CollapseHoldGroup
            collapsed={collapsed}
            icon={ShieldCheck}
            label="Services"
            isOpen={servicesOpen}
            setIsOpen={setServicesOpen}
            items={[
              { icon: FileQuestionMark, label: "Skill & Internships validation", href: "/internship" },
              { icon: LayoutDashboard, label: "User_Dashboard", href: "/internship/userdashboard" },
              { icon: BookOpen, label: "Available Project", href: "/internship/project" },
              { icon: ShieldCheck, label: "Validate Certificate", href: "/internship/validate" },
            ]}
          />

          {/* 2. Tools Dropdown */}
          <CollapseHoldGroup
            collapsed={collapsed}
            icon={Sparkles}
            label="Tools"
            isOpen={toolsOpen}
            setIsOpen={setToolsOpen}
            items={[
              { icon: Sparkles, label: "iATS Resume Analysis", href: "/ai-resume-analyser" },
              { icon: FileText, label: "iCL Cover Letter", href: "/cover-letter" },
            ]}
          />

          {/* 3. Research Agent Dropdown */}
          <CollapseHoldGroup
            collapsed={collapsed}
            icon={Chrome}
            label="Research Agent"
            isOpen={researchOpen}
            setIsOpen={setResearchOpen}
            items={[
              { icon: Chrome, label: "Research Extension", href: "/extension" },
              { icon: Download, label: "Download Extension", href: "https://github.com/AayushKGupta12/Tauzand_extension/archive/refs/heads/main.zip" },
              { icon: FileText, label: "Documentation", href: "/extension/api-doc" },
              { icon: ShieldAlert, label: "Term of Use", href: "/term-of-use" },
            ]}
          />

          {/* 4. Cheat Sheet Dropdown */}
          <CollapseHoldGroup
            collapsed={collapsed}
            icon={Code}
            label="Cheat Sheet"
            isOpen={cheatSheetOpen}
            setIsOpen={setCheatSheetOpen}
            items={[
              { icon: Laptop, label: "Company's DSA PYQ", href: "/DSA" },
              { icon: LayoutDashboard, label: "DSA Dashboard", href: "/DSA/userdashboard" },
            ]}
          />

          {/* 5. Updates & Jobs Dropdown */}
          <CollapseHoldGroup
            collapsed={collapsed}
            icon={Briefcase}
            label="Updates & Jobs"
            isOpen={updatesOpen}
            setIsOpen={setUpdatesOpen}
            items={[
              { icon: Briefcase, label: "IT Jobs", href: "/it-jobs" },
              { icon: Menu, label: "Blogs", href: "/blog" },
              { icon: Menu, label: "NewsLetter", href: "/news" },
            ]}
          />
        </div>

        {/* COMPANY SECTION GROUP */}
        <div className="mt-6 px-2 pb-28 flex flex-col gap-1">
          {!collapsed && (
            <p className="text-xs text-[#0d2440] px-3 mb-2">COMPANY</p>
          )}

          {/* 6. Companies Info Dropdown */}
          <CollapseHoldGroup
            collapsed={collapsed}
            icon={Info}
            label="Companies info"
            isOpen={companiesOpen}
            setIsOpen={setCompaniesOpen}
            items={[
              { icon: Info, label: "About us", href: "/about" },
              { icon: Phone, label: "Contact Us", href: "/contact" },
              { icon: Book, label: "FAQ's", href: "/FAQ" },
              { icon: Briefcase, label: "Careers with us", href: "/careers" },
            ]}
          />

          {/* 7. We Are Hiring Dropdown */}
          <CollapseHoldGroup
            collapsed={collapsed}
            icon={UserCheck}
            label="We are Hiring"
            isOpen={hiringOpen}
            setIsOpen={setHiringOpen}
            items={[
              { icon: Laptop, label: "Technical Roles", href: "https://docs.google.com/forms/d/e/1FAIpQLScUZ5y_RpNN9FXlm5U5ZtGaZuAmOeb_PDwldEUrMG6RO-lRXA/alreadyresponded" },
              { icon: Briefcase, label: "Non-Technical Roles", href: "https://docs.google.com/forms/d/e/1FAIpQLSe4tiJZCXpelNcGauAiqCDtROksL15gXo9I7V18UyPnUFP7Yw/viewform" },
            ]}
          />
        </div>

        {/* BOTTOM AUTHENTICATION FOOTER */}
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

/* ---------- COMPONENT FOR HOLD-TO-EXPAND DROP-DOWNS ---------- */

interface DropdownItem {
  icon: any;
  label: string;
  href: string;
}

function CollapseHoldGroup({
  collapsed,
  icon: MasterIcon,
  label,
  isOpen,
  setIsOpen,
  items,
}: {
  collapsed: boolean;
  icon: any;
  label: string;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  items: DropdownItem[];
}) {
  const [isHeld, setIsHeld] = useState(false);
  const holdTimer = useRef<NodeJS.Timeout | null>(null);

  const handlePointerDown = () => {
    if (!collapsed) return;
    // Activates if held down for more than 150ms
    holdTimer.current = setTimeout(() => {
      setIsHeld(true);
    }, 150);
  };

  const handlePointerUpOrLeave = () => {
    if (holdTimer.current) clearTimeout(holdTimer.current);
    setIsHeld(false);
  };

  useEffect(() => {
    return () => {
      if (holdTimer.current) clearTimeout(holdTimer.current);
    };
  }, []);

  // Normal rendering when sidebar is expanded
  if (!collapsed) {
    return (
      <div className="flex flex-col">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center justify-between w-full gap-3 px-4 py-2 rounded-xs hover:bg-[#7ba4d0] hover:scale-108 text-[#0d2440] transition duration-100 ease-in-out"
        >
          <div className="flex items-center gap-3">
            <MasterIcon size={25} />
            <span className="text-sm font-medium">{label}</span>
          </div>
          <ChevronDown size={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden flex flex-col ml-4 border-l border-gray-400"
            >
              {items.map((item, idx) => (
                <NavItem key={idx} icon={item.icon} label={item.label} href={item.href} collapsed={collapsed} isNested />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Collapsed View holding state logic
  return (
    <div 
      className="relative flex justify-center"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUpOrLeave}
      onPointerLeave={handlePointerUpOrLeave}
    >
      <div className={`group relative flex items-center justify-center px-0 py-2 w-full rounded-xs text-[#0d2440] hover:bg-[#7ba4d0] transition duration-100 ease-in-out cursor-pointer ${isHeld ? 'bg-[#7ba4d0]' : ''}`}>
        <MasterIcon size={25} />

        {/* Regular Tooltip when not held down */}
        {!isHeld && (
          <div className="absolute left-14 bg-[#0d2440] text-white text-lg py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-[500ms] whitespace-nowrap z-[100] pointer-events-none">
            {label} <span className="text-xs text-gray-400 ml-1">(Hold to preview)</span>
          </div>
        )}
      </div>

      {/* Floating Horizontal Submenu Icons Container upon continuous hold */}
      <AnimatePresence>
        {isHeld && (
          <motion.div
            initial={{ opacity: 0, x: -10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute left-16 top-0 bg-[#0d2440] p-1.5 rounded-xl shadow-2xl border border-blue-900/40 flex items-center gap-1.5 z-[200]"
          >
            <div className="text-[11px] font-bold text-yellow-300 px-2 uppercase border-r border-slate-700 select-none">
              {label}
            </div>
            {items.map((item, idx) => {
              const SubIcon = item.icon;
              return (
                <Link
                  key={idx}
                  href={item.href}
                  className="group/sub relative p-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-[#7ba4d0] hover:text-[#0d2440] transition-colors"
                >
                  <SubIcon size={18} />
                  {/* Floating labels for icons inside floating preview row */}
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover/sub:opacity-100 transition-opacity duration-150 whitespace-nowrap z-[210] pointer-events-none">
                    {item.label}
                  </div>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- NAV ITEM ---------- */

function NavItem({
  icon: Icon,
  label,
  href,
  collapsed,
  isNested = false,
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
      <Icon size={isNested && !collapsed ? 20 : 25} />
      {!collapsed && <span className="text-sm font-medium">{label}</span>}
    </Link>
  );
}