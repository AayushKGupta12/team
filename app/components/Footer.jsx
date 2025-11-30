'use client';
import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function Footer() {
  const logoUrl = "/mnt/data/38d2223f-ef6a-42e3-98db-181046034e36.png";

  const services = [
    { label: "IT Jobs", href: "/it-jobs" },
    { label: "Advance Analysis", href: "/ai-resume-analysis" },
    { label: "Blogs", href: "/blog" },
    { label: "Cover Letter", href: "/cover-letter" },
  ];

  const company = [
    { label: "About us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
    { label: "Pricing", href: "/pricing" }
  ];

  const products = [
    { label: "Launching New Products Soon :D", href: "#" }
    
     // duplicated on purpose for easy access
  ];

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          {/* Branding */}
          <div className="flex-1 min-w-[200px]">
            <Link href="https://vfoundin.vercel.app" className="flex items-center gap-3">
                <span className="hidden sm:inline kaushan-script-regular text-4xl">
                  Vfound.in
                </span>
              </Link>

            <p className="mt-4 text-sm text-white/80">
              Helping developers find jobs, build resumes with AI and follow clear technical roadmaps.
            </p>

            <div className="mt-6 flex items-center gap-3">
                
              <a
                href="https://x.com/AayushKGupta?t=cGgssllgz8zfZ5J78TBkvw&s=09"
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-[#7ba4d0] transition-colors"
              >
                <img src="https://img.logo.dev/x.com?token=pk_djKZ3gIOQqyja8btgxBpBA" alt="" className="h-9 w-9 rounded-2xl"/>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-[#7ba4d0] transition-colors"
              >
                <img src="https://img.logo.dev/github.com?token=pk_djKZ3gIOQqyja8btgxBpBA" alt="" className="h-9 w-9 rounded-2xl"/>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-[#7ba4d0] transition-colors"
              >
                <img src="https://img.logo.dev/instagram.com?token=pk_djKZ3gIOQqyja8btgxBpBA" alt="" className="h-9 w-9 rounded-xl"/>

              </a>
              <a
                href="https://t.me/EdstackUpdates"
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-[#7ba4d0] transition-colors"
              >
                <img src="https://img.logo.dev/telegram.org?token=pk_djKZ3gIOQqyja8btgxBpBA" alt="" className="h-9 w-9 rounded-2xl"/>
                
              </a>
            </div>
          </div>

          {/* Links columns */}
          <div className="flex-1 flex gap-8 md:gap-12">
            <div>
              <h4 className="text-sm font-medium mb-3">Services</h4>
              <ul className="space-y-2">
                {services.map((s) => (
                  <li key={s.href}>
                    <Link href={s.href} className="text-sm text-white hover:text-[#7ba4d0] transition-colors">
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-3">Company</h4>
              <ul className="space-y-2">
                {company.map((c) => (
                  <li key={c.href}>
                    <Link href={c.href} className="text-sm text-white hover:text-[#7ba4d0] transition-colors">
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-3">Products</h4>
              <ul className="space-y-2">
                {products.map((p) => (
                  <li key={p.href}>
                    <Link href={p.href} className="text-sm text-white hover:text-[#7ba4d0] transition-colors">
                      {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter / CTA */}
          <div className="flex-1 min-w-[220px]">
            <h4 className="text-sm font-medium mb-3">Address</h4>

            <p className="mt-3 text-white text-2xs">
              Infocity Bhubaneswar, Odisha <br />
              India - 751024 <br/>
              Email: hello@vfound.in
            </p>
          </div>
        </div>

        {/* bottom row */}
        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/70">© {new Date().getFullYear()} Vfound. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
