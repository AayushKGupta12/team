'use client';
import Link from "next/link";
import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    { label: "KIIT PYQ's", href: "/kiit" },
    { label: "IT Jobs", href: "/it-jobs" },
    { label: "Resume Analysis", href: "/ai-resume-analysis" },
    { label: "Cover Letter", href: "/cover-letter" },
    { label: "Blogs", href: "/blog" },
    
  ];

  const company = [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
    // { label: "Our Team", href: "/team" },
    { label: "Terms of Use", href: "/term-of-use" },
    { label: "Disclaimer", href: "/term-of-use#disclaimer" },
  ];

  return (
    <footer className="bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="text-4xl sm:text-5xl font-bold kaushan-script-regular">
                Vfound.in
              </span>
            </Link>

            <p className="text-sm text-white/80 leading-relaxed max-w-xs">
              <span className="text-[#ffe8b1] font-medium">Helping developers</span> land better jobs with AI-powered resume analysis and career-focused resources.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-base font-semibold mb-4">Services</h4>
            <ul className="space-y-2.5 text-sm">
              {services.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/80 hover:text-[#7ba4d0] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-base font-semibold mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              {company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/80 hover:text-[#7ba4d0] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Address */}
          <div>
            <h4 className="text-base font-semibold mb-4">Address</h4>
            <address className="text-sm text-white/80 not-italic leading-relaxed">
              Infocity Area<br />
              Bhubaneswar, Odisha<br />
              India - 751024
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-white/60">
            <p>© {currentYear} Vfound.in. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/term-of-use" className="hover:text-white">Terms</Link>
              <Link href="/term-of-use#disclaimer" className="hover:text-white">Disclaimer</Link>
              <Link href="/contact" className="hover:text-white">Contact</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Career Intelligence – SaaS style animated footer text */}
      <div className="relative border-white/5 py-2 overflow-hidden -mt-13">
        <div className="whitespace-nowrap animate-[marquee_18s_linear_infinite] text-center">
          <span className="text-3xl md:text-8xl font-extrabold tracking-tight uppercase text-white/10">
            Career Intelligence
          </span>
        </div>
      </div>

    </footer>
  );
}
