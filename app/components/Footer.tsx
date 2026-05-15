'use client';
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  // Renamed from 'services' to 'solutions' to match high-end SaaS feel
  const solutions = [
    { label: "Skill & Internship Validation", href: "/internship" },
    { label: "Project Dashboard", href: "/internship/userdashboard" },
    { label: "Available Projects", href: "/internship/project" },
    { label: "Validate Certificate", href: "/internship/validate" },
    { label: "iATS Resume Analysis", href: "/ai-resume-analyser" },
    { label: "iCL Cover Letter", href: "/cover-letter" },
    { label: "Company's DSA PYQs", href: "/DSA" },
    { label: "DSA Tracker", href: "/DSA/userdashboard" },
    { label: "Research Extension", href: "/extension" },
    { label: "IT Job Board", href: "/it-jobs" },
    { label: "Tech Blogs", href: "/blog" },
    { label: "Career Newsletter", href: "/news" },
  ];

  const company = [
    { label: "Our Story", href: "/about" },
    { label: "Join Our Team", href: "/careers" },
    { label: "Get in Touch", href: "/contact" },
    { label: "Latest News", href: "/news" },
    { label: "Pricing Plans", href: "/pricing" },
  ];

  const legal = [
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Refund Policy", href: "/refund-policy" },
    { label: "Terms of Use", href: "/term-of-use" },
    { label: "Service Disclaimer", href: "/term-of-use#disclaimer" },
  ];

  if (pathname === "/sign-in" || pathname === "/sign-up") return null;

  return (
    <footer className="bg-[#050505] text-[#d1d5db] border-t border-white/10 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Section */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-12 py-20">
          
          {/* Brand & Logo Section */}
          <div className="col-span-2 md:col-span-2 pr-10">
            <Link href="/" className="flex items-center gap-3 group mb-6">
              <div className="relative h-20 w-20 flex-shrink-0">
                <Image 
                    src="/tauzand.png" 
                    alt="Tauzand Logo" 
                    fill 
                    className="object-contain rounded-md" 
                    sizes="40px"
                    priority
                />
              </div>
              <span className="text-4xl font-normal text-white kaushan-script-regular">
                Tauzand.in
              </span>
            </Link>
            
            <p className="text-sm leading-relaxed text-zinc-400 max-w-sm mb-8">
              Revolutionizing the way developers navigate their careers. 
              Built with precision and AI-driven intelligence.
            </p>

            {/* Accreditation Badges */}
<div className="flex items-center gap-4 mt-8 mb-8">
  <div className="bg-white p-1.5 rounded-md shadow-sm flex items-center justify-center">
    <div className="relative h-15 w-30">
      <Image 
        src="/MSME_Logo.png" 
        alt="MSME Registered" 
        fill 
        className="object-contain"
      />
    </div>
  </div>
  
  {/* Elegant Divider */}
  <div className="h-10 w-[1px] bg-white/20"></div>

  <div className="bg-white p-1.5 rounded-md shadow-sm flex items-center justify-center">
    <div className="relative h-15 w-30">
      <Image 
        src="/startup_logo.png" 
        alt="Startup India Recognized" 
        fill 
        className="object-contain"
      />
    </div>
  </div>
</div>

            <Link href="/contact" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors group">
                <span className="w-6 h-[1px] bg-white/20 group-hover:bg-[#7ba4d0] group-hover:w-8 transition-all"></span>
                Need assistance? Contact us
            </Link>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-1">
            <h4 className="text-sm font-semibold text-white mb-6">Solutions</h4>
            <ul className="space-y-3.5">
              {solutions.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center group">
                    <span className="h-1 w-1 rounded-full bg-zinc-700 mr-2 opacity-0 group-hover:opacity-100 group-hover:bg-[#7ba4d0] transition-all"></span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-1">
            <h4 className="text-sm font-semibold text-white mb-6">Company</h4>
            <ul className="space-y-3.5">
              {company.map((item) => (
                <li key={item.href}>
                   <Link href={item.href} className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center group">
                    <span className="h-1 w-1 rounded-full bg-zinc-700 mr-2 opacity-0 group-hover:opacity-100 group-hover:bg-[#7ba4d0] transition-all"></span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-1">
            <h4 className="text-sm font-semibold text-white mb-6">Legal</h4>
            <ul className="space-y-3.5">
              {legal.map((item) => (
                <li key={item.href}>
                   <Link href={item.href} className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center group">
                    <span className="h-1 w-1 rounded-full bg-zinc-700 mr-2 opacity-0 group-hover:opacity-100 group-hover:bg-[#7ba4d0] transition-all"></span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform Status */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-sm font-semibold text-white mb-6">Platform Status</h4>
            <div className="p-1 rounded-xl backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-3">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-emerald-400 text-xs font-medium uppercase tracking-wider">All Systems Live</span>
                </div>
              </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-sm text-zinc-500">
            <p>© {currentYear} Tauzand Career Intelligence. All rights reserved.</p>
            
            <div className="flex items-center gap-3 text-white">
                <span className="text-yellow-400">|</span>
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-600">Built for the future of tech</span>
            </div>
          </div>
          
          <div className="mt-4 text-[10px] text-zinc-700 max-w-lg leading-relaxed">
              Disclaimer: This platform uses artificial intelligence to analyze data. Insights provided should be considered guidance. Recognized by Startup India & MSME. Bhubaneswar, India.
          </div>
        </div>
      </div>

      <div className="py-2 overflow-hidden relative pointer-events-none opacity-70 text-center">
        <div className="whitespace-nowrap animate-[marquee_30s_linear_infinite]">
          <span className="text-[7vw] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-blue-500/20 to-yellow-400/20">
            Career Intelligence
          </span>
        </div>
      </div>

    </footer>
  );
}