'use client';
import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function Footer() {
  const logoUrl = "/mnt/data/38d2223f-ef6a-42e3-98db-181046034e36.png";

  const services = [
    { label: "IT Jobs", href: "/it-jobs" },
    { label: "Analysis", href: "/ai-resume-analysis" },
    { label: "Blogs", href: "/blog" },
    { label: "CV", href: "/cover-letter" },
  ];

  const company = [
    { label: "About us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
    { label: "Our Contributors", href:"/team"},
    { label: "Term of Use", href: "/term-of-use"},
    { label: "Disclaimer", href: "/term-of-use#disclaimer"},
    // { label: "Pricing", href: "/pricing" } Pricing ka route nai dalenge abhi, om namah shivay
  ];

  // const products = [
  //   { label: "Launching New Products", href: "#" }
    
  //     duplicated on purpose for easy access
  // ];

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          {/* Branding */}
          <div className="flex-1 min-w-[200px]">
            <Link href="https://vfound.in" className="flex items-center gap-3">
                <span className="sm:inline kaushan-script-regular text-4xl">
                  Vfound.in
                </span>
              </Link>

            <p className="mt-4 text-sm text-white/80">
              <span className="text-[#ffe8b1]">Helping developers</span> find jobs, build Industry standard resumes & cover letter.
            </p>
          </div>

          {/* Links columns */}
          <div className="flex-1 flex gap-8 md:gap-12">
            <div>
              <h4 className="text-md font-medium mb-3 mr-10">Services</h4>
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
              <h4 className="text-md font-medium mb-3 mr-10">Company</h4>
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

            {/* <div>
              <h4 className="text-md font-medium mb-3 mr-10">Products</h4>
              <ul className="space-y-2">
                {products.map((p) => (
                  <li key={p.href}>
                    <Link href={p.href} className="text-sm text-white hover:text-[#7ba4d0] transition-colors">
                      {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div> */}


          </div>

          {/* Newsletter / CTA */}
          <div className="flex-1 min-w-[220px]">
            <h4 className="text-sm font-medium mb-3">Address</h4>

            <p className="mt-3 text-white text-2xs">
              Infocity Bhubaneswar, Odisha <br />
              India - 751024 <br/>
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
