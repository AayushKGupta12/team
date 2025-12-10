'use client';

export default function ITJobsHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#e7f0fa] via-white to-[#d0e2f7] py-24 md:py-32 lg:py-44 px-6 lg:px-8">
      <div className="relative max-w-7xl mx-auto">

        {/* Subtle Grid Background */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block scale-150">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, #cbd5e1 1px, transparent 1px),
                linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)
              `,
              backgroundSize: '52px 52px',
              backgroundPosition: 'center top',
              maskImage: `radial-gradient(ellipse 110% 85% at 50% 0%, black 40%, transparent 90%)`,
              WebkitMaskImage: `radial-gradient(ellipse 110% 85% at 50% 0%, black 40%, transparent 90%)`,
              opacity: 0.45,
            }}
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-4xl text-center md:text-left mt-4 md:mt-0">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 bg-red-200 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white/50 mb-8">
            <span className="w-3 h-3 bg-[#ff0000] rounded-full animate-pulse"></span>
            <span className="text-sm font-semibold text-[#0d2a40] uppercase tracking-wider">
              Live
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-[#0b1724] leading-tight md:leading-none">
            <span className="block">Jobs Updates</span>
            <span className="text-[#2e5e99]">Apply before it gets too late</span>
          </h1>

          {/* Subtext */}
          <div className="mt-8 flex flex-wrap gap-12 text-gray-600">
              <div>
                <div className="text-3xl font-bold text-[#0d2440]">580+</div>
                <div className="text-lg">Companies Listed</div>
                
              </div>
              <div>
                <div className="text-3xl font-bold text-[#0d2440]">11000+</div>
                <div className="text-lg">Applied</div>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
}