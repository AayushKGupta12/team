// components/Navbar.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
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
  { label: "Pricing", href: "/pricing" },
];

export default function Navbar(): JSX.Element {
  const [open, setOpen] = useState(false); // mobile menu
  const [visible, setVisible] = useState(true); // hide on scroll
  const lastY = useRef(0);
  const ticking = useRef(false);

  // hide / show navbar on scroll (down -> hide, up -> show)
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

  // close mobile menu on navigation
  useEffect(() => {
    const onRouteChange = () => setOpen(false);
    // next/router route change events could be used if desired
    return () => {};
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
                  {/* If you later want to use next/image, replace the span with <Image ... /> */}
                  <span className="inline sm:inline text-[#e7f0fa] kaushan-script-regular text-3xl mr-1.5 ml-1.5 mt-0.5 mb-0.5">

                    Vfound.in
                  </span>
                </Link>
              </div>

              {/* Desktop Nav */}
              <nav className="hidden font-semibold md:flex items-center gap-8">
                {navItems.map((item) => {
                  if (item.hasDropdown && item.dropdown) {
                    return (
                      <div key={item.label} className="relative group">
                        <button
                          aria-haspopup="menu"
                          aria-expanded="false"
                          className="relative font-semibold text-[#0d2440] hover:text-[#0d2440] transition-colors px-2 py-1 rounded-md text-xl"
                        >
                          {item.label}
                        </button>

                        {/* Dropdown panel (appears on hover/focus) */}
                        <div
                          aria-hidden="true"
                          className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200 absolute left-1/2 -translate-x-1/2 mt-3 w-48 rounded-xl bg-[#7ba4d0]/10 border border-[#7ba4d0]/20 backdrop-blur-xl shadow-lg py-2 z-40"
                        >
                          {item.dropdown.map((d) => (
                            <Link
                              key={d.href}
                              href={d.href}
                              className="block px-4 py-2 text-sm text-[#0d2440] transition-colors"
                            >
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
                      className="text-xl relative text-[#0d2440] hover:text-[#0d2440] transition-colors px-2 py-1 rounded-md group font-semibold"
                    >
                      {item.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#0d2440] transition-all duration-300 group-hover:w-full" />
                    </Link>
                  );
                })}
              </nav>

              {/* CTA + Mobile toggle */}
              <div className="flex items-center gap-4">
                
                {/* Auth area (desktop) */}
                <div className="hidden md:flex items-center gap-3">
                  <SignedOut>
                    <SignInButton>
                      <button
                        type="submit"
                        className="flex text-black justify-center gap-2 items-center mx-auto shadow-xl text-lg bg-gray-50 lg:font-semibold hover:bg-[#0d2440] hover:text-white relative z-10 px-2 py-1.5 overflow-hidden rounded-full group">
                        Sign in
                        <svg
                          className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-[#ee5a57] text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
                          viewBox="0 0 16 19"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                            className="fill-gray-800 group-hover:fill-gray-800"
                          ></path>
                        </svg>
                      </button>

                    </SignInButton>

                    <SignUpButton>
                      <button
                      className="overflow-hidden w-26 p-2 h-11 bg-[#0d2440] text-white border-none rounded-md text-xl font-bold cursor-pointer relative z-10 group"
                    >
                      Sign Up
                      <span
                        className="absolute w-36 h-32 -top-8 -left-2 bg-[#ff5a57] rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-left"
                      ></span>
                      <span
                        className="absolute w-36 h-32 -top-8 -left-2 bg-[#e02f75] rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-left"
                      ></span>
                      <span
                        className="absolute w-36 h-32 -top-8 -left-2 bg-[#6700a3] rotate-12 transform scale-x-0 group-hover:scale-x-50 transition-transform group-hover:duration-1000 duration-500 origin-left"></span>
                      <span
                        className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-6 z-10">Yayy..!!</span>
                    </button>
                    </SignUpButton>
                  </SignedOut>

                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                </div>

                {/* Mobile button */}
                <button
                  onClick={() => setOpen((v) => !v)}
                  className="md:hidden p-2 rounded-lg hover:bg-[#7ba4d0]/20 transition-colors"
                  aria-label="Toggle menu"
                  aria-expanded={open}
                >
                  <svg
                    className={`h-8 w-6 text-[#0d2440] transition-transform ${open ? "rotate-90" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    {open ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile dropdown */}
          <div
            className={`w-full px-4 sm:px-6 lg:px-8 mt-3 overflow-hidden transition-all duration-300 ${
              open ? "max-h-200 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="rounded-2xl bg-[#7ba4d0]/10 border border-[#7ba4d0]/20 backdrop-blur-xl shadow-2xl p-4">
              {/* Mobile: render items and dropdowns inline */}
              {navItems.map((item) => {
                if (item.hasDropdown && item.dropdown) {
                  return (
                    <div key={item.label} className="mb-2">
                      <div className="px-4 py-3 text-[#0d2440] font-semibold rounded-lg">
                        <span>{item.label}</span>
                      </div>
                      <div className="ml-2 rounded-lg">
                        {item.dropdown.map((d) => (
                          <Link
                            key={d.href}
                            href={d.href}
                            onClick={() => setOpen(false)}
                            className="block py-2 px-4 text-[#0d2440] font-medium hover:bg-[#7ba4d0]/10 rounded-md transition-colors"
                          >
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
                    onClick={() => setOpen(false)}
                    className="block py-3 px-4 text-[#0d2440] font-medium hover:bg-[#7ba4d0]/10 rounded-lg transition-colors"
                  >
                    {item.label}
                  </Link>
                );
              })}

              {/* Mobile auth area */}
              <div className="mt-3">
                <SignedOut>
                  <div className="flex gap-3">
                    <SignInButton>
                      <button className="flex-1 px-4 py-2 rounded-md font-medium">Sign In</button>
                    </SignInButton>

                    <SignUpButton>
                      <button className="hidden md:block px-5 py-2.5 rounded-full bg-[#0d2440] text-white font-medium hover:bg-[#0d2440] hover:scale-105 transition-all shadow-lg">
                        Sign up
                      </button>
                    </SignUpButton>
                  </div>
                </SignedOut>

                <SignedIn>
                  <div className="mt-3">
                    <UserButton />
                  </div>
                </SignedIn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
