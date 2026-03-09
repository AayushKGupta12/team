'use client';

export default function AboutPage() {
  return (
    <>
      {/* HERO SECTION – Clean, Bold, Human */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#e7f0fa] via-white to-[#ffd77a]/50 py-24 md:py-32 lg:py-40 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

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

          {/* Main Hero Content – Left-aligned, Punchy */}
          <div className="relative z-10 max-w-4xl mt-8">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-[#0b1724] leading-tight md:leading-none">
              <span className="block">Contact :</span>
              <span className="text-[#2e5e99]">Developer</span>
              <span className="block text-[#2e5e99]">Builder</span>
            </h1>

            {/* <p className="mt-8 text-xl md:text-2xl text-gray-700 max-w-2xl leading-relaxed">
              We don’t just help developers find jobs.<br />
              <span className="font-semibold text-[#0d2440]">We help them become unstoppable.</span>
            </p> */}

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
              So we built something different honest, fast, and actually human.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="space-y-10">
            {[
              { 
                title: "No more ghosting", 
                desc: "Every application gets a real reply. No exceptions.",
                color: "bg-amber-600"
              },
              { 
                title: "Fast & brutally honest feedback", 
                desc: "We tell you exactly what hiring managers think — no fluff, just truth that helps you improve.",
                color: "bg-emerald-600"
              },
              { 
                title: "Real jobs from real people", 
                desc: "We work directly with founders and hiring teams — never just scrape job boards.",
                color: "bg-pink-600"
              },
            ].map((item) => (
              <div 
                key={item.title} 
                className={`flex gap-6 items-start bg-white rounded-2xl p-8 shadow-lg border border-${item.color}-100 
                            hover:shadow-xl hover:border-${item.color}-200 transition-all duration-300`}
              >
                <div className={`flex-shrink-0 w-16 h-16 ${item.color} rounded-full flex items-center justify-center`}>
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
<div className="relative overflow-hidden bg-gradient-to-br from-[#0d2440] to-[#1e3a5c] text-white rounded-[2.5rem] p-10 lg:p-16 shadow-2xl border border-white/10">
  {/* Background Decorative Glow */}
  <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#2e5e99] rounded-full blur-[100px] opacity-20 pointer-events-none" />

  <div className="relative z-10">
    <h3 className="text-3xl md:text-5xl font-black mb-6 leading-tight tracking-tighter">
      Got questions? <br /> Say hello to
      <span className="text-amber-400 italic"> Aayush K. Gupta</span>
    </h3>

    {/* Contact Details Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
      <div className="space-y-1">
        <p className="text-amber-400 text-xs font-black uppercase tracking-widest">Support</p>
        <p className="text-2xl font-bold">Aayush Kumar Gupta</p>
      </div>
      <div className="space-y-1">
        <p className="text-amber-400 text-xs font-black uppercase tracking-widest">Direct Line</p>
        <p className="text-2xl font-bold">+91 8252802866</p>
      </div>
    </div>

    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
      <a
        href="mailto:aayushgupta120305@gmail.com"
        className="group relative inline-flex h-16 items-center justify-center px-10 bg-white text-[#0d2440] text-2xl font-black rounded-2xl shadow-[0_8px_0_0_#cbd5e1] active:shadow-none active:translate-y-[4px] transition-all hover:bg-amber-400 hover:shadow-[0_8px_0_0_#b45309]"
      >
        Mail Us
      </a>
      
      <div className="flex flex-col">
        <span className="text-white text-sm font-bold uppercase tracking-tighter underline decoration-amber-400/50 underline-offset-4">
          Official Email
        </span>
        <span className="text-xl font-bold">aayushgupta120305@gmail.com</span>
      </div>
    </div>

    <p className="mt-10 text-sm md:text-base text-white/80 font-medium">
      Typically responds within <span className="text-white font-bold">48 hours</span> • Business Working Day's
    </p>
  </div>
</div>
        </div>
      </section>
    </>
  );
}