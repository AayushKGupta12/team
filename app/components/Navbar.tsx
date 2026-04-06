"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SignInButton,
  SignUpButton,
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


type NavItem = {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdown?: { label: string; href: string }[];
};

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Service",
    href: "#",
    hasDropdown: true,
    dropdown: [
      { label: "KIIT PYQ", href: "/kiit" },
      { label: "Advance Analysis", href: "/ai-resume-analyser" },
      { label: "Cover Letter", href: "/cover-letter" },
      { label: "Extension", href: "/extension" },
      { label: "IT Jobs", href: "/it-jobs" },
      { label: "Blogs", href: "/blog" },
    ],
  },
  {
    label: "Company",
    href: "#",
    hasDropdown: true,
    dropdown: [
      { label: "About us", href: "/about" },
      { label: "Careers", href: "/careers" },
      // { label: "Team", href: "/team" },
      { label: "Contact Us", href: "/contact" },
      { label: "FAQ's", href: "/FAQ" },
    ],
  },
];

/* ---------------- COMPONENT ---------------- */

export default function Navbar(): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);
  const ticking = useRef(false);
  const { user } = useUser();
  const pathname = usePathname();

  const shareOnWhatsApp = () => {
  const text = encodeURIComponent(
    "Check out Vfound - A complete developer builder toolkit for your  *In and Off campus* job opportunities \nhttps://vfound.in"
  );
  window.open(`https://wa.me/?text=${text}`, "_blank");
};


  /* Scroll hide logic (UNCHANGED) */
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

  // Hide navbar on auth pages
  if (pathname == "/sign-in" || pathname == "/sign-up") {
    return null;
  }

  return (
    <>
      {/* ================= DESKTOP TOP NAV (UNCHANGED) ================= */}
      <header className="fixed inset-x-0 top-2 z-40 flex justify-end pointer-events-none">
        <div
          className={`w-full pointer-events-auto transition-transform duration-300 ${
            visible ? "translate-y-0" : "-translate-y-32"
          }`}
        >
          <div className="max-w-110 ml-auto px-4 sm:px-6 lg:px-1">
            <div className="flex items-center justify-between gap-4 rounded-2xl bg-[#7ba4d0]/10 border border-black/50 backdrop-blur-xl shadow-xl pr-6 py-3">
              <Link
                href="/"
                className="text-[#0d2440] kaushan-script-regular text-4xl font-bold sm:ml-6"
              >
                Vfound.in
              </Link>

              <nav className="hidden md:flex ml-auto gap-6">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-xl text-[#0d2440]"
                  >
                    {/* {item.label} */}
                  </Link>
                ))}
              </nav>

              <div className="hidden md:flex items-center gap-2">
                <SignedOut>
                    <div className="flex gap-2">
                    <a
                        href="/sign-in"
                        className="border relative h-8 py-0.5 p-2 text-black text-base font-bold overflow-hidden bg-white rounded-4xl transition-all duration-200 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-700 before:to-blue-400 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0">
                        Sign in
                    </a>
                    </div>

                    <div className="flex gap-2">
                    <a
                        href="/sign-up"
                        className="border relative h-8 py-0.5 p-2 text-black text-base font-bold overflow-hidden bg-white rounded-4xl transition-all duration-200 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-700 before:to-blue-400 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0">
                        Sign up
                    </a>
                    </div>
                </SignedOut>

                <SignedIn>
                  <SignedIn>
                    <div className="flex items-center gap-3 rounded-full border border-white bg-[#ffd77a]/80 px-4 pr-1 py-2 shadow-md backdrop-blur-md">
                      
                      {/* Welcome Text */}
                        <span className="font-semibold text-gray-900">
                          {user?.firstName || user?.username}
                        </span>

                      {/* User Button */}
                      <div className="scale-140 -mb-2.5">
                        <UserButton />
                      </div>

                    </div>
                  </SignedIn>

                  
                </SignedIn>
              </div>

              <button
                onClick={() => setOpen(true)}
                className="md:hidden p-2 rounded-lg hover:bg-black/10"
              >
                <Menu className="h-8 w-8 text-[#0d2440]" />
              </button>
              
            </div>
          </div>
        </div>
      </header>

      {/* ================= MOBILE ICON RAIL (CENTERED & COMPACT) ================= */}
{!open && (
  <div className="fixed right-1.5 top-1/2 -translate-y-1/2 z-[90] md:hidden">
    <div
      className="
        flex flex-col items-center gap-3
        bg-white/40 backdrop-blur-xl
        border border-gray-200
        shadow-md
        rounded-2xl
        px-2 py-3
        text-[#0d2440]
      "
      >

      <IconLink
        href="/ai-resume-analyser"
        icon={<Sparkles size={15} />}
        active={pathname === "/ai-resume-analyser"}
      />

      <IconLink
        href="/cover-letter"
        icon={<FileText size={15} />}
        active={pathname === "/cover-letter"}
      />

      <IconLink
        href="/it-jobs"
        icon={<Briefcase size={15} />}
        active={pathname === "/it-jobs"}
      />

      <IconLink
        href="/blog"
        icon={<FileText size={15} />}
        active={pathname === "/blog"}
      />

      {/* <IconLink
        href="/team"
        icon={<Users size={15} />}
        active={pathname === "/team"}
      /> */}

      <IconLink
        href="/contact"
        icon={<Phone size={15} />}
        active={pathname === "/contact"}
      />

      <IconLink
        href="/careers"
        icon={<Building2 size={15} />}
        active={pathname === "/careers"}
      />

      <button
        onClick={shareOnWhatsApp}
        aria-label="Share on WhatsApp"
        className="p-1.5 rounded-lg text-green-600 hover:scale-105"> <MessageCircle size={15} />
      </button>

    </div>
  </div>
)}


      {/* ================= MOBILE FULL SIDEBAR (75%) ================= */}
      <div
        className={`fixed inset-0 z-[99] md:hidden transition-opacity ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-black/40"
        />

        <aside
          className={`fixed right-0 inset-y-0 w-[3/4]
            bg-white shadow-2xl transform transition-transform duration-300
            ${open ? "translate-x-0" : "translate-x-full"}
            p-6 overflow-y-auto`} >

              
          <button
            onClick={() => setOpen(false)}
            className="mb-6 h-9 w-9 rounded bg-[#0d2440] text-white font-bold"
          >
            ✕
          </button>

          {navItems.map((item) => (
            <div key={item.label} className="mb-4">
              <p className="font-bold text-lg text-[#0d2440]">{item.label}</p>
              {item.dropdown &&
                item.dropdown.map((d) => (
                  <Link
                    key={d.href}
                    href={d.href}
                    onClick={() => setOpen(false)}
                    className="block ml-2 py-1 text-[#0d2440]"
                  >
                    {d.label}
                  </Link>
                ))}
            </div>
          ))}

            <hr  className="h-2px bg-gray-900 mt-6 mb-6"/>

          <SignedOut>
            <div className="mt-6 flex gap-3">
              <SignInButton>
                <button className="border px-4 py-2 rounded-full font-bold text-[#0d2440]">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="border px-4 py-2 rounded-full font-bold text-[#0d2440]">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          </SignedOut>

          <SignedIn>
            <div className="flex items-center justify-between rounded-lg border border-[#0d2440]/40 bg-[#fff8e7] shadow-sm backdrop-blur px-4 py-2">
              {/* Welcome Text */}
              <span className="text-sm font-semibold text-gray-800">
                {user?.firstName || user?.username}
              </span>

              {/* Divider */}
              <div className="h-6 w-px bg-gray-600" />

              {/* User Button */}
              <UserButton />
            </div>

            <div className="mt-3">
              <UsageProvider />
            </div>
          </SignedIn>
        </aside>
      </div>
    </>
  );
}

/* ---------------- ICON LINK ---------------- */

function IconLink({
  href,
  icon,
  active,
}: {
  href: string;
  icon: React.ReactNode;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`relative p-1 rounded transition
        ${active ? "text-[#7a4a00] scale-155" : "hover:bg-black/10"}`}
    >
      {icon}
    </Link>
  );
}
