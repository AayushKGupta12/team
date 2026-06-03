'use client';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#e7f0fa] via-white to-[#d0e2f7] py-20 md:py-28 lg:py-28 px-6 lg:px-8">
      <div className="relative max-w-7xl mx-auto">

        {/* === LIGHT, MODERN GRID – FADED FROM TOP CENTER (FIXED & PERFECT) === */}
        <div className="pointer-events-none absolute inset-0 block scale-177">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, #cbd5e1 1px, transparent 1px),
                linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)
              `,
              backgroundSize: '48px 48px',
              backgroundPosition: 'center top',
              maskImage: `radial-gradient(
                ellipse 100% 80% at 50% 0%,
                black 45%,
                transparent 85%
              )`,
              WebkitMaskImage: `radial-gradient(
                ellipse 100% 80% at 50% 0%,
                black 45%,
                transparent 85%
              )`,
              opacity: 0.45,
            }}
          />
        </div>

        {/* Optional: Very subtle circuit overlay (hidden on small screens to avoid clutter) */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1920 1080" fill="none">
            <g stroke="#2e5e99" strokeWidth="1.2" opacity="0.25">
              <path d="M380 120 L980 720" />
              <path d="M940 180 L1580 780" />
              <path d="M200 680 L880 180" />
              <circle cx="980" cy="720" r="10" fill="#7ba4d0" opacity="0.5"/>
              <circle cx="620" cy="540" r="12" fill="#2e5e99" opacity="0.6"/>
            </g>
          </svg>
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-4xl text-center md:text-left mt-18">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-[#0b1724] leading-tight md:leading-none">
            <span className="block">Developer-First</span>
            <span className="text-[#2e5e99]">Career Platform</span>
          </h1>

          <p className="mt-8 text-xl md:text-2xl text-gray-700 font-light max-w-2xl">
           Career Operating System<br />
            <span className="font-semibold text-[#0d2440]">Get your first <span className="bg-[#ffe8b1] px-2">Interview Calls.</span></span>
          </p>

          {/* Premium Gradient Button */}
          <div className="mt-12">
            <a
              href="/sign-up"
              className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full bg-[#0d2440] px-10 py-5 text-xl font-bold text-white shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              {/* Outer glow */}
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 blur-2xl scale-150"></span>
              </span>

              <span className="relative flex items-center gap-4">
                Get Started
                <svg className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>

              {/* Inner shine swipe */}
              <span className="absolute inset-0 -z-10 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"></span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
