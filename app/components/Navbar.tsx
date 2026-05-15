"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";

import {
  Menu,
} from "lucide-react";

import UsageProvider from "./UsageProvider";

// Reorganized NavItems structure to meet your blueprint
const navItems = [
  { 
    label: "Services", 
    dropdown: [
      { label: "Skill & Internships validation", href: "/internship" },
      { label: "User_Dashboard", href: "/internship/userdashboard" },
      { label: "Available Project", href: "/internship/project" },
      { label: "Validate Certificate", href: "/internship/validate" },
    ]
  },
  { 
    label: "Tools", 
    dropdown: [
      { label: "iATS Resume Analysis", href: "/ai-resume-analyser" },
      { label: "iCL Cover Letter", href: "/cover-letter" },
    ]
  },
  {
    label:"Research Agent",
    dropdown :[
      { label: "Research Extension", href: "/extension" },
      { label : "Download Extension", href: "https://github.com/AayushKGupta12/Tauzand_extension/archive/refs/heads/main.zip"},
      { label: "Documentation", href:"/extension/api-doc"},
      { label: "Term of Use", href:"/term-of-use"}
    ]
  },
  { 
    label: "Cheat Sheet", 
    dropdown: [
      { label: "Company's DSA PYQ", href: "/DSA" },
      { label: "DSA Dashboard", href: "/DSA/userdashboard" },
    ]
  },
  { 
    label: "Updates & Jobs", 
    dropdown: [
      { label: "IT Jobs", href: "/it-jobs" },
      { label: "Blogs", href: "/blog" },
      { label: "NewsLetter", href: "/news" },
    ]
  },
  { 
    label: "Companies info", 
    dropdown: [
      { label: "About us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "FAQ's", href: "/FAQ" },
      { label: "Careers with us", href: "/careers" },
      { label: "Pricing", href: "/pricing" },
    ]
  },
  {
    label: "We are Hiring",
    dropdown: [
      { label: "Technical Roles", href: "https://docs.google.com/forms/d/e/1FAIpQLScUZ5y_RpNN9FXlm5U5ZtGaZuAmOeb_PDwldEUrMG6RO-lRXA/alreadyresponded" },
      { label: "Non-Technical Roles", href: "https://docs.google.com/forms/d/e/1FAIpQLSe4tiJZCXpelNcGauAiqCDtROksL15gXo9I7V18UyPnUFP7Yw/viewform" },
    ]
  }
];

export default function Navbar(): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  // Track open state for individual category dropdowns in mobile view
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  const lastY = useRef(0);
  const ticking = useRef(false);
  const { user } = useUser();
  const pathname = usePathname();

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          if (currentY > lastY.current + 10) setVisible(false);
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

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  if (pathname === "/sign-in" || pathname === "/sign-up") return null;

  return (
    <>
      {/* ================= DESKTOP & MOBILE TOP NAV ================= */}
      <header className="fixed inset-x-0 top-2 z-40 flex justify-end pointer-events-none">
        <div className={`w-full pointer-events-auto transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-32"}`}>
          <div className="max-w-110 md:max-w-110 ml-auto px-2 md:px-1">
            <div className="flex items-center justify-between gap-2 md:gap-4 rounded-2xl bg-[#7ba4d0]/10 border border-black/50 backdrop-blur-xl shadow-xl pr-4 md:pr-6 py-2 md:py-3">
              
              <div className="flex items-center gap-3 ml-2">
                <img src="/tauzand.png" alt="logo" className="md:hidden h-10 w-10 rounded-lg" />
                <Link href="/" className="text-[#0d2440] kaushan-script-regular text-2xl md:text-4xl font-bold">
                  Tauzand.in
                </Link>
              </div>

              <div className="flex items-center gap-2">
                <SignedIn>
                  <div className="hidden md:flex items-center gap-3 rounded-full border border-white bg-[#ffd77a]/80 px-4 pr-1 py-2 shadow-md backdrop-blur-md">
                    <span className="font-semibold text-gray-900">{user?.firstName || user?.username}</span>
                    <div className="scale-140 -mb-2.5"><UserButton /></div>
                  </div>
                </SignedIn>

                <button onClick={() => setOpen(true)} className="md:hidden p-1.5 rounded-lg hover:bg-black/10">
                  <Menu className="h-7 w-7 text-[#0d2440]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ================= MOBILE SIDEBAR WITH DROPDOWNS ================= */}
      <div className={`fixed inset-0 z-[99] md:hidden transition-opacity ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div onClick={() => setOpen(false)} className="absolute inset-0 bg-black/40" />
        <aside className={`fixed right-0 inset-y-0 w-2/3 bg-white shadow-md transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"} p-6 overflow-y-auto`}>
          <button onClick={() => setOpen(false)} className="mb-6 h-8 w-8 rounded bg-[#0d2440] text-white font-bold">✕</button>

          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isDropdownOpen = openDropdown === item.label;
              return (
                <div key={item.label} className="border-b border-gray-100 py-1">
                  {/* Category Toggle Button */}
                  <button 
                    onClick={() => toggleDropdown(item.label)}
                    className="flex items-center justify-between w-full py-2 text-left text-[#0d2440] font-bold text-sm uppercase tracking-widest"
                  >
                    <span>{item.label}</span>
                    <span className="text-xs text-gray-400">
                      {isDropdownOpen ? "▲" : "▼"}
                    </span>
                  </button>
                  
                  {/* Dropdown Items Links Container */}
                  {isDropdownOpen && (
                    <div className="pl-2 flex flex-col bg-gray-50/50 rounded-lg mt-1">
                      {item.dropdown.map((d) => (
                        <Link 
                          key={d.href} 
                          href={d.href} 
                          onClick={() => {
                            setOpen(false);
                            setOpenDropdown(null);
                          }} 
                          className="flex items-center gap-2 py-2 text-[#0d2440] font-medium text-sm active:bg-blue-50"
                        >
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                          {d.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <hr className="bg-gray-300 my-4"/>

          <SignedIn>
            <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-[#fff8e7] px-4 py-3 shadow-sm">
              <span className="text-sm font-semibold">{user?.firstName}</span>
              <UserButton />
            </div>
            <div className="mt-4"><UsageProvider /></div>
          </SignedIn>
          
          <SignedOut>
             <div className="flex flex-col gap-3">
               <a href="/sign-in" className="w-full py-2 text-center border rounded-xl font-bold">Sign In</a>
               <a href="/sign-up" className="w-full py-2 text-center bg-[#0d2440] text-white rounded-xl font-bold">Sign Up</a>
             </div>
          </SignedOut>
        </aside>
      </div>
    </>
  );
}