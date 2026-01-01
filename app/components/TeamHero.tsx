'use client';

export default function TeamHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#e7f0fa] via-white to-[#d0e2f7] py-24 md:py-32 lg:py-28 px-6 lg:px-8">
      <div className="relative max-w-7xl mx-auto">

        {/* Subtle Grid Background (visible on all devices, opacity 0.45) */}
        <div className="pointer-events-none absolute inset-0 block scale-150">
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
          <div className="inline-flex items-center gap-3 bg-red-100 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-red-500 mb-9 mt-5">
            <span className="w-3 h-3 bg-[#ff0000] rounded-full animate-pulse"></span>
            <span className="text-sm font-semibold text-[#0d2a40] uppercase tracking-wider">
              In Progress
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-[#0b1724] leading-tight md:leading-none">
            <span className="block">Contributors</span>
            <span className="text-[#2e5e99]">Building Developers</span>
          </h1>

        </div>

        {/* Subtext / Quote */}
          <div className="mt-14 max-w-3xl mx-auto text-center">
            <p className="text-base sm:text-lg md:text-xl italic text-gray-700 leading-relaxed">
              “Every contributor to vfound brought curiosity, care, and craftsmanship —
              together we built more than a product, we built opportunity.”
            </p>
            <span className="mt-4 block text-sm font-semibold text-[#0d2440] tracking-wide">
              ~ vfound Contributors
            </span>
          </div>

      </div>
    </section>
  );
}
