"use client";

import { useState } from "react";
import { 
  FileSearch, 
  Sparkles, 
  Chrome, 
  QrCode, 
  Cpu, 
  Newspaper,
  Volume2,
  VolumeX
} from "lucide-react";

interface YouTubePreviewProps {
  videoId?: string;
  title?: string;
  description?: string;
}

export default function YouTubePreview({
  videoId = "674Dj3HwsNM",
  title = "See How It Works",
}: YouTubePreviewProps) {
  const [muted, setMuted] = useState(true);

  return (
    <section className="w-full bg-gradient-to-b from-white to-neutral-50 py-24 px-6 lg:px-16 rounded-b-4xl">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-16 lg:gap-20">
          
          {/* ── LEFT CONTENT (Storytelling Flowchart) ── */}
          <div className="flex flex-col items-start gap-12 max-w-xl order-2 lg:order-1">
            <div className="flex flex-col gap-3">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 leading-[1.05] tracking-tighter">
                Find What's Holding Back Your Career
              </h2>
            </div>

            {/* Vertical Timeline/Flowchart */}
            <div className="relative flex flex-col gap-12 pl-2">
              {/* Decorative Gradient Line */}
              <div className="absolute left-[30px] top-4 bottom-4 w-[8px] bg-gradient-to-b from-rose-200 via-blue-200 to-yellow-200" />

              {/* Step 1 */}
              <div className="relative flex gap-6 items-start group">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white border border-neutral-900 shadow-sm text-neutral-900">
                  <FileSearch className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-1.5 pt-1">
                  <h3 className="text-xl font-bold text-neutral-900 tracking-tight">1. Not Getting Interview Calls?</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed font-medium">
                    Get a comprehensive evaluation of your resume across 32 key parameters. Receive actionable insights to significantly improve your chances with recruiters.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative flex gap-6 items-start group">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white border border-neutral-900 shadow-sm text-neutral-900">  <Sparkles className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-1.5 pt-1">
                  <h3 className="text-xl font-bold text-neutral-900 tracking-tight">2. Applications Getting Ignored?</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed font-medium">
                    Generate personalized cover letters that match job descriptions and improve response rates.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative flex gap-6 items-start group">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white border border-neutral-900 shadow-sm text-neutral-900">  <Chrome className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-1.5 pt-1">
                  <h3 className="text-xl font-bold text-neutral-900 tracking-tight">3. Learning Taking Too Much Time?</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed font-medium">
                    Get instant explanations, summaries, and technical insights while browsing the web. Accelerate your learning and research.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative flex gap-6 items-start group">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white border border-neutral-900 shadow-sm text-neutral-900">  <QrCode className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-1.5 pt-1">
                  <h3 className="text-xl font-bold text-neutral-900 tracking-tight">4. No Internship Experience?</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed font-medium">
                    Work on real projects and earn a mentor-verified certificate with public validation and QR authentication.
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="relative flex gap-6 items-start group">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white border border-neutral-900 shadow-sm text-neutral-900">
                  <Cpu className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-1.5 pt-1">
                  <h3 className="text-xl font-bold text-neutral-900 tracking-tight">5. Struggling in Coding Interviews?</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed font-medium">
                    Practice company-specific DSA questions with structured tracking and performance insights.
                  </p>
                </div>
              </div>

              {/* Step 6 */}
              <div className="relative flex gap-6 items-start group">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white border border-neutral-900 shadow-sm text-neutral-900">
                  <Newspaper className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-1.5 pt-1">
                  <h3 className="text-xl font-bold text-neutral-900 tracking-tight">6. Unsure What To Learn Next?</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed font-medium">
                    Stay updated with high-quality blogs covering latest technologies, career strategies, and industry trends.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT CONTENT (Sticky Video Panel) ── */}
          <div className="flex justify-center order-1 lg:order-2 lg:sticky lg:top-24">
            <div className="relative w-full max-w-3xl">
              {/* Accent Glow Backplate */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-yellow-400 to-yellow-400 rounded-3xl opacity-95" />

              {/* Video container */}
              <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-black shadow-2xl ring-1 ring-neutral-900/10 z-10">
                <iframe
                  className="w-full h-full object-cover"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${muted ? 1 : 0}&controls=0&modestbranding=1&rel=0&playsinline=1&loop=1&playlist=${videoId}`}
                  title="Product overview layout"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />

                {/* Sound Control Toggle */}
                <div className="absolute bottom-4 right-4 z-20">
                  <button
                    onClick={() => setMuted(!muted)}
                    className="flex items-center gap-2 px-3.5 py-2 bg-black/70 backdrop-blur-md rounded-full text-xs font-semibold text-white hover:bg-black/90 active:scale-95 transition-all border border-white/10 shadow-lg"
                  >
                    {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    <span>{muted ? "Unmute" : "Mute"}</span>
                  </button>
                </div>
              </div>

              {/* Status Indicator pill */}
              <p className="text-center mt-6">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider text-[#0d2440] shadow-sm border border-neutral-200/80">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Live Product Demo
                </span>
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}