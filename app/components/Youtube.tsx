"use client";

import { useState } from "react";

interface YouTubePreviewProps {
  videoId?: string;
  title?: string;
  description?: string;
}

export default function YouTubePreview({
  videoId = "674Dj3HwsNM",
  title = "See how it works",
}: YouTubePreviewProps) {
  const [muted, setMuted] = useState(true);

  return (
    <section className="w-full bg-gradient-to-b from-white to-neutral-50 py-24 px-6 lg:px-16 rounded-b-4xl">
      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
          {/* ── LEFT CONTENT ── */}
          <div className="flex flex-col items-start gap-8 max-w-xl order-2 lg:order-1">
            <h2 className="text-4xl md:text-5xl md:mt-10 lg:text-6xl font-bold text-neutral-900 leading-[1.1] tracking-tight">
              {title}
            </h2>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-neutral-100 rounded-full text-sm font-medium text-neutral-700">
                🚀 No credit card required
              </span>
              <span className="px-4 py-2 bg-neutral-100 rounded-full text-sm font-medium text-neutral-700">
                ⏱️ 5-min setup
              </span>
              <span className="px-4 py-2 bg-neutral-100 rounded-full text-sm font-medium text-neutral-700">
                🔒 Enterprise security
              </span>
            </div>
          </div>

          {/* ── VIDEO ── */}
          <div className="flex justify-center order-1 lg:order-2">
            <div className="relative w-full max-w-3xl">
              {/* Decorative elements */}
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-yellow-400 rounded-3xl" />
              
              {/* Video container */}
              <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-black shadow-xl ring-1 ring-neutral-800/10">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${muted ? 1 : 0}&controls=0&modestbranding=1&rel=0&playsinline=1&loop=1&playlist=${videoId}`}
                  title="Product overview"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
                
                {/* ── FUNCTIONAL SOUND BUTTON (INSIDE VIDEO) ── */}
                <div className="absolute bottom-4 right-4 z-20">
                  <button
                    onClick={() => setMuted(!muted)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full text-xs font-semibold text-white hover:bg-black/80 transition-all border border-white/10"
                  >
                    <span>{muted ? "🔇" : "🔊"}</span>
                    <span>{muted ? "Unmute" : "Mute"}</span>
                  </button>
                </div>
              </div>

              {/* Caption */}
              <p className="text-center mt-4 mb-3">
                <span className="inline-flex items-center gap-2 px-5 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-semibold text-[#0d2440] shadow-sm border border-neutral-200/60">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Product Overview
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}