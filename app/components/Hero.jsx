'use client';

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[100vh] flex items-center py-20 md:py-28 lg:py-32 px-6 lg:px-8 bg-black">
      
      {/* === SKYSCRAPER HIGH-RISE IMAGE BACKGROUND === */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        
        {/* Transparent Click Blocker + 60% Dark Overlay for optimal text readability */}
        <div className="absolute inset-0 bg-black/50 z-20 pointer-events-auto" /> 

        {/* Clean, lightweight high-rise image replacing the video element */}
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop" 
          alt="Modern high-rise buildings background"
          className="w-full h-full object-cover z-10"
        />
      </div>

      {/* === CONTENT OVERLAY === */}
      <div className="relative z-30 max-w-7xl mx-auto w-full">
        <div className="max-w-4xl text-center md:text-left">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-tight drop-shadow-md">
            <span className="block">Developer-First</span>
            <span className="text-[#a4c2f4]">Career Platform</span>
          </h1>

          <p className="mt-8 text-xl md:text-3xl text-gray-100 font-light max-w-2xl drop-shadow-sm">
            <span className="font-semibold text-white">Get your first <span className="bg-[#ffe8b1] text-black px-2 rounded-sm">Interview Calls.</span></span>
          </p>

          <div className="mt-12">
            <a
              href="/sign-up"
              className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full bg-white px-10 py-5 text-xl font-bold text-[#0d2440] shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <span className="relative flex items-center gap-4">
                Get Started
                <svg className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}