'use client';

export default function Hero() {
  const logoUrl = "/mnt/data/38d2223f-ef6a-42e3-98db-181046034e36.png";

  return (
    <>
      {/* HERO SECTION - 100% UNCHANGED */}
      <div className="relative overflow-hidden w-full bg-[#e7f0fa] py-12 md:py-20 lg:py-25 px-4 sm:px-6 md:px-16 lg:px-20">

        {/* BACKGROUND STATIC LETTERS */}
        <div className="absolute inset-0 flex flex-col justify-center items-center md:items-end md:mr-2 px-4">

              <div className="text-[clamp(24px,8vw,150px)] md:text-[clamp(50px,15vw,150px)]
              font-extrabold leading-[1.1] md:leading-[0.85]
              text-[#7ba4d0]/45 text-center md:text-right whitespace-nowrap md:whitespace-normal">

            {/* MOBILE VERSION - visible only on mobile */}
            <div className="block md:hidden mt-100 text-7xl">  
              Contact
            </div>
            <div className="text-sm text-[#2e5e99]">Always available to serve you</div>

            {/* DESKTOP VERSION - visible only on md+ */}
            <div className="hidden md:block mt-19">
              <br /><br /><br />
              Contact
              <div className="text-4xl text-[#2e5e99]">Always available to serve you</div>
            </div>
            

          </div>
        </div>




        {/* MAIN HEADLINE */}
        <div className="relative z-20 min-h-[450px] md:min-h-[450px] flex items-center justify-center md:justify-start md:items-end">
          <div className="w-full max-w-md md:max-w-lg text-center md:text-left px-4 sm:px-6 md:px-0">
            <h1 className="font-extrabold tracking-tight text-[clamp(22px,6vw,60px)] md:text-[clamp(36px,6vw,80px)] leading-[1.05] md:leading-[0.92] text-[#0b1724]">
            <span className="block text-4xl sm:text-5xl md:text-6xl">
              India's Largest
            </span>
            <span className="text-[#2e5e99] text-5xl sm:text-6xl md:text-8xl">
              Developer Builder
            </span>
          </h1>
          </div>
        </div>
      </div>

      {/* About + Contact Section – Left-aligned, spacious & modern */}
<section className="py-24 px-6 lg:px-8 bg-gray-50">
  <div className="max-w-4xl mx-auto">

    {/* Intro */}
    <div className="mb-16">
      <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
        Your next tech role shouldn’t feel impossible
      </h2>
      <p className="text-xl text-gray-700 leading-relaxed max-w-3xl">
        We’re a small, passionate team that hates the broken job search experience as much as you do. 
      </p>
    </div>

    {/* Feature Cards – Vertical stack with nice spacing */}
    <div className="space-y-8 mb-20">

      {/* Card 1 */}
      <div className="flex gap-6 items-start bg-white rounded-2xl p-8 shadow-md border border-indigo-100 hover:shadow-xl hover:border-indigo-200 transition-all">
        <div className="flex-shrink-0 w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m0 16v1m8.227-9.5l-.707.707M5.48 12.207l-.707-.707m14.954 3.5l-.707-.707M4.773 8.707l-.707.707M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">No more ghosting</h3>
          <p className="text-lg text-gray-600">Every single application you send through us gets a reply</p>
        </div>
      </div>

      {/* Card 2 */}
      <div className="flex gap-6 items-start bg-white rounded-2xl p-8 shadow-md border border-emerald-100 hover:shadow-xl hover:border-emerald-200 transition-all">
        <div className="flex-shrink-0 w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">Fast & brutally honest feedback</h3>
          <p className="text-lg text-gray-600">We tell you exactly what hiring managers think no fluff, just truth that helps you improve.</p>
        </div>
      </div>

      {/* Card 3 */}
      <div className="flex gap-6 items-start bg-white rounded-2xl p-8 shadow-md border border-amber-100 hover:shadow-xl hover:border-amber-200 transition-all">
        <div className="flex-shrink-0 w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">Real jobs from real people</h3>
          <p className="text-lg text-gray-600">We work directly with founders and hiring teams never just scrape job boards.</p>
        </div>
      </div>

    </div>

    {/* Contact CTA – Prominent left-aligned card */}
    <div className="bg-gradient-to-r from-[#0d2440] to-[#1e3a5c] text-white rounded-3xl p-10 lg:p-12 shadow-2xl">
      <h3 className="text-3xl lg:text-4xl font-bold mb-6">
        Ready to make your next move?
      </h3>
      <p className="text-xl opacity-90 mb-10 leading-relaxed max-w-2xl">
        Whether you’re actively job hunting, just curious, or want a quick resume review drop us a line. 
        We read and reply to every email personally.
      </p>

      <a
        href="mailto:hello@vfound.in"
        className="group inline-flex items-center gap-4 bg-white text-[#0d2440] font-bold text-xl px-10 py-5 rounded-full hover:bg-gray-100 transform hover:scale-105 transition-all shadow-lg"
      >
        <span>hello@vfound.in</span>
        <svg className="w-7 h-7 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </a>

      <p className="mt-8 text-white/80 text-lg">
        You’ll hear back from us within <span className="font-bold text-white">48 hours</span>
      </p>
    </div>

  </div>
</section>
    </>
  );
}
