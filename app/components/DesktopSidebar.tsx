"use client";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

import {
  Sparkles,
  Briefcase,
  FileText,
  Building2,
  Users,
  Phone,
  Info,
  Menu,
  Book,
  ChevronLeft, ChevronRight, Pen
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
            overflow-hidden
            ${collapsed
            ? "w-20 -translate-x-full lg:translate-x-0"
            : "w-54 translate-x-0 bg-[#e7f0fa]"}
        `}
        >

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
          
          <div className="mt-4 px-3">
            <Link href="/">
              <span className="block text-5xl font-bold kaushan-script-regular text-[#0d2440]">
                Vfound.in
              </span>
            </Link>
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

          <NavItem icon={Pen} label="KIIT Study Material" href="/kiit" collapsed={collapsed} />
          <NavItem icon={Sparkles} label="Advance Analysis" href="/ai-resume-analysis" collapsed={collapsed}/>
          <NavItem icon={FileText} label="Cover Letter" href="/cover-letter" collapsed={collapsed} />
          <NavItem icon={Briefcase} label="IT Jobs" href="/it-jobs" collapsed={collapsed} />
          <NavItem icon={Book} label="Read" href="/read" collapsed={collapsed} />
          <NavItem icon={Menu} label="Blogs" href="/blog" collapsed={collapsed} />
          

        </div>

        {/* COMPANY */}
        <div className="mt-6 px-2">
          {!collapsed && (
            <p className="text-xs text-[#0d2440] px-3 mb-2">COMPANY</p>
          )}

          <NavItem icon={Info} label="About Us" href="/about" collapsed={collapsed} />
          <NavItem icon={Users} label="Team" href="/team" collapsed={collapsed} />
          <NavItem icon={Phone} label="Contact" href="/contact" collapsed={collapsed} />
          <NavItem icon={Building2} label="Careers" href="/careers" collapsed={collapsed} />

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
                <SignInButton>
                  <div className="mt-2 flex gap-6">
                    <a
                        className="border relative h-8 py-0.5 px-2.5 text-black text-xl font-bold overflow-hidden bg-white rounded-4xl transition-all duration-200 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-700 before:to-blue-400 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0">
                        Sign in
                    </a>
                    </div>
                </SignInButton>

                <SignUpButton>
                  <div className="mt-2 flex gap-6">
                    <a
                        className="border relative h-8 py-0.5 p-2.5 text-black text-xl font-bold overflow-hidden bg-white rounded-4xl transition-all duration-200 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-700 before:to-blue-400 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0">
                        Sign up
                    </a>
                    </div>
                </SignUpButton>
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
}: {
  icon: any;
  label: string;
  href: string;
  collapsed: boolean;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-2 rounded-xs 
            hover:bg-[#7ba4d0] hover:scale-108
            text-[#0d2440] transform 
            transition duration-100 ease-in-out"
    >
      <Icon size={25} classname />
      {!collapsed && <span className="text-sm font-medium">{label}</span>}
    </Link>
  );
}