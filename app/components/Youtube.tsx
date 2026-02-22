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
  description = "A calm walkthrough of our product experience.",
}: YouTubePreviewProps) {
  const [muted, setMuted] = useState(true);

  return (
    <section className="w-full bg-gradient-to-b from-white to-neutral-50 py-24 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header Badge */}
        <div className="flex justify-center lg:justify-start mb-8 lg:mb-0">
          <span className="inline-flex items-center px-4 py-2 bg-neutral-900/5 rounded-full text-xl font-medium text-neutral-700 tracking-wide">
            ⚡ Product Tour
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* ── LEFT CONTENT ── */}
          <div className="flex flex-col items-start gap-8 max-w-xl order-2 lg:order-1">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 leading-[1.1] tracking-tight">
              {title}
            </h2>

            <p className="text-lg text-neutral-600 leading-relaxed max-w-md">
              {description}
            </p>

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

            {/* Speaker Toggle - Made bolder */}
            <button
              onClick={() => setMuted(!muted)}
              className="group inline-flex items-center gap-3 px-4 py-2.5 
                       bg-emerald-500/50 border border-neutral-200 rounded-full
                       text-sm font-semibold text-neutral-700
                       hover:border-yellow-300 hover:bg-yellow-50 
                       hover:text-neutral-900 transition-all"
            >
              <span className="text-base">
                {muted ? "🔇" : "🔊"}
              </span>
              <span className="tracking-wide">
                {muted ? "Sound off" : "Sound on"}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 group-hover:bg-neutral-400 transition-colors" />
            </button>
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
                
                {/* Optional overlay indicator */}
                <div className="absolute bottom-4 right-4">
                  <div className="px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full text-xs font-medium text-white/90">
                    {muted ? "🔇 Muted" : "🔊 Audio on"}
                  </div>
                </div>
              </div>

              {/* Caption - Fixed z-index and typo */}
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