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
  Sparkles,
  Briefcase,
  FileText,
  Building2,
  Phone,
  Menu,
  MessageCircle,
} from "lucide-react";

import UsageProvider from "./UsageProvider";

// Updated NavItems to reflect your Sidebar structure
const navItems = [
  { 
    label: "Services", 
    dropdown: [
      { label: "iATS Analysis", href: "/ai-resume-analyser" },
      { label: "iCL Cover Letter", href: "/cover-letter" },
      { label: "Extension", href: "/extension" },
      { label: "Skill & Internships validation", href: "/internship" },
      { label: "User_Dashboard", href: "/internship/userdashboard" },
      { label: "Project", href: "/internship/project" },
      { label: "Project Validation", href: "/internship/validate" },
      { label: "IT Jobs", href: "/it-jobs" },
      { label: "Blogs", href: "/blog" },
    ]
  },
  { 
    label: "Company", 
    dropdown: [
      { label: "About us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "FAQ's", href: "/FAQ" },
      { label: "Careers with us", href: "/careers" },
      { label: "NewsLetter", href:"/news"},
      { label: "Pricing", href:"/pricing"},

    ]
  },
];

export default function Navbar(): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);
  const ticking = useRef(false);
  const { user } = useUser();
  const pathname = usePathname();

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent("Check out Tauzand...\nhttps://Tauzand.in");
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

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

  if (pathname === "/sign-in" || pathname === "/sign-up") return null;

  return (
    <>
      {/* ================= DESKTOP & MOBILE TOP NAV ================= */}
      <header className="fixed inset-x-0 top-2 z-40 flex justify-end pointer-events-none">
        <div className={`w-full pointer-events-auto transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-32"}`}>
          {/* Reduced max-width and padding for a sleeker look on mobile */}
          <div className="max-w-110 md:max-w-110 ml-auto px-2 md:px-1">
            <div className="flex items-center justify-between gap-2 md:gap-4 rounded-2xl bg-[#7ba4d0]/10 border border-black/50 backdrop-blur-xl shadow-xl pr-4 md:pr-6 py-2 md:py-3">
              
              {/* MINI LOGO (Mobile Only) */}
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

      {/* ================= MOBILE ICON RAIL (REDUCED SIZE) =================
      {!open && (
        <div className="fixed right-1.5 top-1/2 -translate-y-1/2 z-[90] md:hidden">
          <div className="flex flex-col items-center gap-2.5 bg-white/40 backdrop-blur-xl border border-gray-200 shadow-md rounded-2xl px-1.5 py-3 text-[#0d2440]">
            <IconLink href="/ai-resume-analyser" icon={<Sparkles size={14} />} active={pathname === "/ai-resume-analyser"} />
            <IconLink href="/cover-letter" icon={<FileText size={14} />} active={pathname === "/cover-letter"} />
            <IconLink href="/it-jobs" icon={<Briefcase size={14} />} active={pathname === "/it-jobs"} />
            <IconLink href="/blog" icon={<FileText size={14} />} active={pathname === "/blog"} />
            <IconLink href="/contact" icon={<Phone size={14} />} active={pathname === "/contact"} />
            <button onClick={shareOnWhatsApp} className="p-1.5 text-green-600"><MessageCircle size={14} /></button>
          </div>
        </div>
      )} */}

      {/* ================= MOBILE SIDEBAR ================= */}
      <div className={`fixed inset-0 z-[99] md:hidden transition-opacity ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div onClick={() => setOpen(false)} className="absolute inset-0 bg-black/40" />
        <aside className={`fixed right-0 inset-y-0 w-2/3 bg-white shadow-md transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"} p-6 overflow-y-auto`}>
          <button onClick={() => setOpen(false)} className="mb-6 h-8 w-8 rounded bg-[#0d2440] text-white font-bold">✕</button>

          {navItems.map((item) => (
            <div key={item.label} className="mb-6">
              <p className="font-bold text-sm uppercase tracking-widest text-gray-400 mb-2">{item.label}</p>
              {item.dropdown.map((d) => (
                <Link key={d.href} href={d.href} onClick={() => setOpen(false)} className="flex items-center gap-2 py-2 text-[#0d2440] font-medium border-b border-gray-50 active:bg-blue-50">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" /> {/* Sleek indicator */}
                  {d.label}
                </Link>
              ))}
            </div>
          ))}

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

function IconLink({ href, icon, active }: any) {
  return (
    <Link href={href} className={`p-1.5 rounded-lg transition ${active ? "bg-white/60 shadow-sm scale-110" : "hover:bg-black/5"}`}>
      {icon}
    </Link>
  );
}