'use client';

export default function BlogHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#e7f0fa] via-white to-[#d0e2f7] py-32 md:py-40 lg:py-48 px-6 lg:px-8">
      <div className="relative max-w-7xl mx-auto">

        {/* Subtle Grid Background – Light & Faded from Top */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block scale-180">
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
              opacity: 0.45,
            }}
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-5xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white/50 mb-8">
            <span className="w-3 h-3 bg-[#2e5e99] rounded-full animate-pulse"></span>
            <span className="text-sm font-semibold text-[#0d2440] uppercase tracking-wider">
              Latest from Indian IT world
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-[#0b1724] leading-tight md:leading-none">
            <span className="block">Insights that</span>
            <span className="text-[#2e5e99]">actually matter</span>
          </h1>

          {/* Subtext */}
          <p className="mt-5 text-xl md:text-2xl lg:text-3xl text-gray-700 max-w-3xl leading-relaxed font-light">
            Just real talk about tech careers, hiring trends,
            layoffs, salary leaks, and everything shaping the Indian IT scene.
          </p>

          {/* Stats / Trust */}
          <div className="mt-8 flex flex-wrap gap-12 text-gray-600">
            <div>
              <div className="text-4xl font-bold text-[#0d2440]">7K+</div>
              <div className="text-lg">Monthly readers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#0d2440]">40+</div>
              <div className="text-lg">Articles / hour</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#0d2440]">Zero</div>
              <div className="text-lg">Sponsored</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}