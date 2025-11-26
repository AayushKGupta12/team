"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  // local file path (you provided this earlier; your build will transform it)
  const logoUrl = "/mnt/data/38d2223f-ef6a-42e3-98db-181046034e36.png";

  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);
  const ticking = useRef(false);

  // structured nav: parents with hasDropdown have a `dropdown` array
  const navItems = [
    { label: "Home", href: "/" },

    {
      label: "Service",
      href: "",
      hasDropdown: true,
      dropdown: [
        { label: "AI Resume Analysis", href: "/ai-resume-analysis" },
        { label: "IT Jobs", href: "/it-jobs" },
        { label: "Roadmaps", href: "/roadmaps" },
        { label: "Blogs", href: "/blog" },
      ],
    },

    {
      label: "Company",
      href: "",
      hasDropdown: true,
      dropdown: [
        { label: "About us", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Contact Us", href: "/contact" },
      ],
    },

    { label: "Pricing", href: "/pricing" },
  ];

  // hide / show navbar on scroll (hide when scrolling down, show on scroll up)
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
                <Link href="http://localhost:3000" className="flex items-center gap-3">
                <span className="hidden sm:inline text-[#e7f0fa] kaushan-script-regular text-3xl mr-1.5 ml-1.5 mt-0.5 mb-0.5" >
                  Vfound.in
                </span>
              </Link>

              </div>
              

              {/* Desktop Nav */}
              <nav className="hidden font-semibold md:flex items-center gap-8">
                {navItems.map((item) => {
                  if (item.hasDropdown) {
                    return (
                      <div key={item.label} className="relative group">
                        <Link
                          href={item.href}
                          className="relative font-semibold text-[#0d2440] hover:text-[#0d2440] transition-colors px-2 py-1 rounded-md text-xl"
                        >
                          {item.label}
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#0d2440] transition-all duration-300 group-hover:w-full text-xl" />
                        </Link>

                        {/* Dropdown panel (appears on hover) */}
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
                <button className="hidden md:block px-5 py-2.5 rounded-full bg-[#0d2440] text-white font-medium hover:bg-[#0d2440] hover:scale-105 transition-all shadow-lg">
                  Get Started
                </button>
                

                {/* Mobile button */}
                <button
                  onClick={() => setOpen((v) => !v)}
                  className="md:hidden p-2 rounded-lg hover:bg-[#7ba4d0]/20 transition-colors"
                  aria-label="Toggle menu"
                >
                  <svg
                    className={`h-8 w-6 text-[#0d2440] transition-transform ${open ? "rotate-90" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
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
              open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="rounded-2xl bg-[#7ba4d0]/10 border border-[#7ba4d0]/20 backdrop-blur-xl shadow-2xl p-4">
              {/* Mobile: render items and dropdowns inline */}
              {navItems.map((item) => {
                if (item.hasDropdown) {
                  return (
                    <div key={item.label} className="mb-2">
                      <div className="px-4 py-3 text-[#0d2440] font-semibold rounded-lg">
                        <Link href={item.href} onClick={() => setOpen(false)}>
                          {item.label}
                        </Link>
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

              <button className="mt-4 w-full py-3 rounded-full bg-[#0d2440] text-[#7ba4d0] font-medium hover:bg-indigo-700 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
