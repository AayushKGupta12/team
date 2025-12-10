'use client';

export default function CoverLetterHero() {
  return (
    <>
      {/* COVER LETTER HERO – Premium & Modern */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#e7f0fa] via-white to-[#d0e2f7] py-24 md:py-32 lg:py-44 px-6 lg:px-8">
        <div className="relative max-w-7xl mx-auto">

          {/* Subtle Grid Background – Light & Faded from Top */}
          <div className="pointer-events-none absolute inset-0 hidden lg:block scale-184">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(to right, #cbd5e1 1px, transparent 1px),
                  linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
                backgroundPosition: 'center top',
                maskImage: `radial-gradient(ellipse 110% 85% at 50% 0%, black 40%, transparent 90%)`,
                WebkitMaskImage: `radial-gradient(ellipse 110% 85% at 50% 0%, black 40%, transparent 90%)`,
                opacity: 0.45
              }}
            />
          </div>

          {/* Main Content – Clean & Powerful */}
          <div className="relative z-10 max-w-4xl text-center md:text-left mt-6">
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white/50 mb-8">
              <span className="w-3 h-3 bg-[#2e5e99] rounded-full animate-pulse"></span>
              <span className="text-sm font-semibold text-[#0d2440] uppercase tracking-wider">
                Cover letter Builder
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-[#0b1724] leading-tight md:leading-none">
              <span className="block">Your Story,</span>
              <span className="text-[#2e5e99]">Perfectly Told</span>
            </h1>

            <p className="mt-8 text-xl md:text-2xl lg:text-3xl text-gray-700 font-light max-w-3xl leading-relaxed">
              <span className="block font-bold text-[#0d2440] mb-1">
                Stop writing generic cover letters.
              </span>
              <span className="block font-medium text-gray-800 sm:text-base md:text-lg">
                Get a personalized, ATS‑friendly, recruiter‑approved cover letter in seconds.
              </span>
            </p>

            <div className="mt-8 flex flex-wrap gap-12 text-gray-600">
              <div>
                <div className="text-3xl font-bold text-[#0d2440]">6000+</div>
                <div className="text-lg">Letter Generated</div>
                
              </div>
              <div>
                <div className="text-3xl font-bold text-[#0d2440]">390+</div>
                <div className="text-lg">Companies targetted</div>
              </div>
            </div>


          </div>
        </div>
      </section>
    </>
  );
}