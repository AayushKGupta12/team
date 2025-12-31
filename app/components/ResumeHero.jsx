'use client';

export default function ResumeHero() {
  return (
    <>
      {/* RESUME CHECKER HERO – Premium & Powerful */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#e7f0fa] via-white to-[#d0e2f7] py-24 md:py-32 lg:py-28 px-6 lg:px-8">

        <div className="relative max-w-7xl mx-auto">

          {/* Subtle Grid Background – now visible on mobile */}
          <div className="pointer-events-none absolute inset-0 block scale-176">
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
                
                /* Slightly reduce opacity ONLY on mobile */
                opacity: 0.45,
              }}
            />
          </div>

          {/* Main Content */}
          <div className="relative z-10 max-w-3xl text-center md:text-left mt-5">
            <div className="inline-flex items-center gap-3 bg-[#ffe8b1] backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white/50 mb-8">
              <span className="w-3 h-3 bg-[#2e5e99] rounded-full animate-pulse"></span>
              <span className="text-sm font-semibold text-[#0d2440] uppercase tracking-wider">
                Resume Scanner
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-[#0b1724] leading-tight md:leading-none">
              <span className="block">Resume,</span>
              <span className="text-[#2e5e99]">Evaluated in Seconds</span>
            </h1>

            <p className="mt-2 text-xl md:text-2xl lg:text-3xl text-gray-700 font-light max-w-3xl leading-relaxed">
              <span className="font-semibold text-[#0d2440]">
                Your resume is evaluated across <span className="text-[#2e5e99]">32 key parameters</span>.
              </span>
            </p>

            {/* Trust + Stats */}
            <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-4 text-left">
              <div className="flex flex-col items-center md:items-start">
                <div className="text-3xl sm:text-5xl font-bold text-[#0d2440]">7000+</div>
                <p className="mt-1 text-sm sm:text-lg text-gray-600">Resumes Scanned</p>
              </div>

              <div className="flex flex-col items-center md:items-start">
                <div className="text-3xl sm:text-5xl font-bold text-[#0d2440]">4.4 <span className="text-amber-400">★</span></div>
                <p className="mt-1 text-sm sm:text-lg text-gray-600">User Rating</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
