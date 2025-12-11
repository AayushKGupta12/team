// Updated mobile responsive sidebar version of Navbar.tsx
// --- ONLY MOBILE VIEW CHANGED ---
// Sidebar opens 2/3rd of the mobile screen
// Desktop view remains exactly the same

"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";

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
      { label: "Advance Analysis", href: "/ai-resume-analysis" },
      { label: "Cover Letter", href: "/cover-letter" },
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
      { label: "Contact Us", href: "/contact" },
    ],
  },
  // { label: "Pricing", href: "/pricing" }, //Pricing ka route nai dalenge abhi, om namah shivay
];

export default function Navbar(): React.JSX.Element {
  const [open, setOpen] = useState(false); // mobile sidebar
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);
  const ticking = useRef(false);

  // scroll hide logic
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

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center pointer-events-none">
      <div
        className={`w-full max-w-7xl pointer-events-auto transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-32"
        }`}
      >
        <div className="flex flex-col items-center">
          {/* NAVBAR */}
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4 rounded-3xl bg-[#7ba4d0]/10 border border-black/50 backdrop-blur-xl shadow-xl px-6 py-3">
              {/* Logo */}
              <div className="w-fit bg-[#0d2440] p-0.5 rounded-2xl">
                <Link href="/" className="flex items-center gap-3">
                  <span className="inline sm:inline text-[#e7f0fa] kaushan-script-regular text-3xl mr-1.5 ml-1.5 mt-0.5 mb-0.5">
                    Vfound.in
                  </span>
                </Link>
              </div>


              {/* Desktop Nav */}
              <nav className="hidden font-semibold md:flex ml-auto mr-22 gap-8">
                {navItems.map((item) => {
                  if (item.hasDropdown && item.dropdown) {
                    return (
                      <div key={item.label} className="relative group">
                        <button className="font-semibold text-[#0d2440] text-xl px-2 py-1">
                          {item.label}
                        </button>
                        <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute left-1/2 -translate-x-1/2 mt-3 w-48 rounded-xl bg-[#7ba4d0]/10 border border-[#7ba4d0]/20 backdrop-blur-xl shadow-lg py-2 z-40 transition-all duration-200">
                          {item.dropdown.map((d) => (
                            <Link key={d.href} href={d.href} className="block px-4 py-2 text-sm text-[#0d2440]">
                              {d.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-xl text-[#0d2440] px-2 py-1 font-semibold"
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              {/* CTA + Mobile */}
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-3">
                  <SignedOut>
                    <SignInButton>
                      <button className="border relative py-2 px-5 text-black text-base font-bold overflow-hidden bg-white rounded-4xl transition-all duration-200 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-700 before:to-blue-400 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0">
                        Sign in
                      </button>
                    </SignInButton>


                    <SignUpButton>
                      <button className="border relative py-2 px-5 text-black text-base font-bold overflow-hidden bg-white rounded-4xl transition-all duration-200 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-700 before:to-blue-400 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0">
                        Sign Up
                      </button>
                    </SignUpButton>
                  </SignedOut>

                  <SignedIn>
                    <div className="scale-135 mt-1">
                    <UserButton />
                    </div>
                  </SignedIn>
                </div>

                {/* Mobile toggle */}
                <button
                  onClick={() => setOpen(true)}
                  className="md:hidden p-2 rounded-lg hover:bg-[#7ba4d0]/20"
                >
                  <svg className="h-8 w-10 text-[#0d2440]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE SIDEBAR — 2/3 SCREEN */}
      <div
        className={`fixed inset-0 z-[99] md:hidden transition-opacity duration-400 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-black/40 backdrop-blur-xs"
        ></div>

        {/* Sidebar */}
        <div className={`fixed inset-y-0 right-0 w-[280px] max-w-[85vw] bg-white shadow-2xl border-l border-gray-100 
                transform transition-transform duration-400 ease-out z-[99]
                ${open ? 'translate-x-0' : 'translate-x-full'} p-6 overflow-y-auto`}>
          <button
            className="mb-6 p-0.5 h-9 w-9 rounded-sm bg-[#0d2440] float-right text-white font-bold"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>

          {navItems.map((item) => (
            <div key={item.label} className="mb-4">
              <p className="font-bold text-[#0d2440] text-lg">{item.label}</p>
              {item.dropdown && (
                <div className="mt-2 ml-2">
                  {item.dropdown.map((d) => (
                    <Link
                      key={d.href}
                      href={d.href}
                      onClick={() => setOpen(false)}
                      className="block py-1 text-[#0d2440]"
                    >
                      {d.label}
                    </Link>
                  ))}
                </div>
              )}
              {!item.dropdown && (
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block mt-1 text-[#0d2440]"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}

          <hr className="w-full bg-[#0d2440] mt-5"/>
          {/* Mobile Auth */}
          <SignedOut>
            <div className="mt-4 flex gap-3">
              <SignInButton>
                <button className="border relative py-2 px-5 text-black text-base font-bold overflow-hidden bg-white rounded-4xl shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-700 before:to-blue-400 before:transition-all before:duration-500 before:ease-in-out before:z-[-1]">Sign In</button>
              </SignInButton>

              <SignUpButton>
                <button className="border relative py-2 px-5 text-black text-base font-bold overflow-hidden bg-white rounded-4xl shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-700 before:to-blue-400 before:transition-all before:duration-500 before:ease-in-out before:z-[-1]">Sign Up</button>
              </SignUpButton>
            </div>
          </SignedOut>

          <SignedIn>
            <div className="mt-4 bg-[#96b8dc] rounded-xl shadow-md flex items-center justify-between px-6 py-4">
            {/* Left side text */}
            <span className="text-black font-semibold text-lg">
              Edit profile
            </span>

            {/* Enlarged UserButton on the right */}
            <div className="scale-140 py-1">
              <UserButton />
            </div>
          </div>
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
