"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function InternshipHero() {
  const router = useRouter();
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section className="w-full bg-white text-slate-900 py-24 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left: Minimalist Copy */}
        <div className="space-y-8">
          <div className="inline-block border border-slate-900 rounded-full px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em]">
            Summer Intake 2026
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter leading-[0.9]">
            Engineering <br />
            <span className="italic font-light text-slate-400">Validated.</span>
          </h1>

          <p className="text-xl text-slate-600 leading-relaxed max-w-md">
            Skip vanity certificates. Build professional-grade software, pass peer-reviewed audits, and earn a credential that actually moves the needle.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => router.push("/internship/userdashboard")}
              className="px-8 py-4 bg-slate-900 text-white font-bold text-sm rounded-full hover:bg-blue-600 transition"
            >
              START BUILD TRACK
            </button>
            <button className="px-8 py-4 border border-slate-200 font-bold text-sm rounded-full hover:bg-slate-50 transition">
              VERIFY CREDENTIAL
            </button>
          </div>
        </div>

        {/* Right: Floating Video Frame */}
        <div className="relative group">
          <div className="absolute inset-0 bg-slate-400 blur-[80px] rounded-full" />
          
          {/* Mobile Toggle (visible only on lg:hidden) */}
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="lg:hidden absolute top-4 right-4 z-20 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-200 text-[9px] font-bold"
          >
            {isMuted ? "🔇 TAP TO UNMUTE" : "🔊 MUTE"}
          </button>

          <div 
            className="relative bg-white border border-slate-200 rounded-3xl p-2 shadow-2xl rotate-2 group-hover:rotate-0 transition-all duration-500"
            onMouseEnter={() => setIsMuted(false)}
            onMouseLeave={() => setIsMuted(true)}
          >
            <div className="aspect-video bg-slate-900 rounded-2xl overflow-hidden">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/n81xhOqcVc8?autoplay=1&${isMuted ? 'mute=1' : 'mute=0'}&loop=1&playlist=n81xhOqcVc8&controls=0&modestbranding=1`}
                title="VFound Internship Preview"
                allow="autoplay; encrypted-media"
              />
            </div>
            {/* Desktop Hover Hint */}
            <div className="hidden lg:flex absolute bottom-6 left-6 text-[9px] font-bold text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
              {isMuted ? "HOVER TO HEAR" : "PLAYING AUDIO"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}