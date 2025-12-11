'use client';

export default function AboutPage() {
  return (
    <>
      {/* HERO – Clean, Modern, Floating "Contact" on large screens */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#e7f0fa] via-white to-[#d0e2f7] py-24 md:py-32 lg:py-40 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Floating "Contact" – visible ONLY on lg+ screens */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none overflow-hidden">
            <div 
              className="absolute right-0 top-3/4 -translate-y-1/2 
                         text-[17vw] leading-none font-black 
                         text-[#7ba4d0]/12 tracking-tighter select-none"
              style={{ letterSpacing: '-0.05em' }}
            >
              Contact
            </div>
          </div>

          {/* Main Hero Content */}
          <div className="relative z-10 max-w-4xl mt-8">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-[#0b1724] leading-tight md:leading-none">
              <span className="block">India’s Largest</span>
              <span className="text-[#2e5e99]">Developer</span>
              <span className="block text-[#2e5e99]">Builder</span>
            </h1>

            <p className="mt-8 text-xl md:text-2xl text-gray-700 max-w-2xl leading-relaxed">
              You can contact us anytime you like
            </p>

            <div className="mt-10 flex gap-6">
              <a
                href="#contact"
                className="border relative h-14 py-2 p-15 text-black text-3xl font-bold overflow-hidden bg-white rounded-4xl transition-all duration-200 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-700 before:to-blue-400 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0">
                Contact us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION – Warm, left-aligned, modern */}
      <section id="contact" className="py-24 lg:py-32 px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto space-y-24">

          {/* Intro */}
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0d2440] leading-tight">
              Your next tech role shouldn’t feel impossible
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-3xl">
              We’re a small team that got fed up with endless applications, ghosting, and fake job posts.
              So we built something different — honest, fast, and actually human.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="space-y-10">
            {[
              { 
                title: "No more ghosting", 
                desc: "Every application gets a real reply. No exceptions.",
                color: "blue"
              },
              { 
                title: "Fast & brutally honest feedback", 
                desc: "We tell you exactly what hiring managers think — no fluff, just truth that helps you improve.",
                color: "emerald"
              },
              { 
                title: "Real jobs from real people", 
                desc: "We work directly with founders and hiring teams — never just scrape job boards.",
                color: "amber"
              },
            ].map((item) => (
              <div 
                key={item.title} 
                className={`flex gap-6 items-start bg-white rounded-2xl p-8 shadow-lg border border-${item.color}-100 
                            hover:shadow-xl hover:border-${item.color}-200 transition-all duration-300`}
              >
                <div className={`flex-shrink-0 w-16 h-16 bg-${item.color}-100 rounded-full flex items-center justify-center`}>
                  <svg className={`w-9 h-9 text-${item.color}-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#0d2440] mb-2">{item.title}</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Final Contact CTA */}
          <div className="bg-gradient-to-r from-[#0d2440] to-[#1e3a5c] text-white rounded-3xl p-12 lg:p-16 shadow-2xl">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6">
              Got questions? Say hello
            </h3>
            <p className="text-xl md:text-2xl opacity-90 mb-10 leading-relaxed max-w-2xl">
              Resume advice, career doubts, or just want to chat? We reply to everyone personally.
            </p>

            <div className="mt-10 flex gap-6">
              <a
                href="mailto:aayushgupta120305@gmail.com"
                className="border relative h-14 py-2 p-15 text-black text-3xl font-bold overflow-hidden bg-white rounded-4xl transition-all duration-200 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-700 before:to-blue-400 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0">
                Mail us
              </a>
            </div>

            <p className="mt-8 text-lg md:text-xl text-white/80">
              You’ll hear back within <span className="font-bold text-white">48 hours</span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}