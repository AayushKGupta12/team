'use client';

export default function HeroAndAbout() {
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
              <span className="block">About :</span>
              <span className="text-[#2e5e99]">Developer</span>
              <span className="block text-[#2e5e99]">Builder</span>
            </h1>

            {/* <p className="mt-8 text-xl md:text-2xl text-gray-700 max-w-2xl leading-relaxed">
              We don’t just help developers find jobs.<br />
              <span className="font-semibold text-[#0d2440]">We help them become unstoppable.</span>
            </p> */}

            <div className="mt-10 flex gap-6">
              <a
                href="#about"
                className="border relative h-14 py-2 p-15 text-black text-3xl font-bold overflow-hidden bg-white rounded-4xl transition-all duration-200 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-700 before:to-blue-400 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0">
                About us
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* ABOUT SECTION – Warm, Modern, Left-Aligned */}
      <section id="about" className="py-24 px-6 lg:px-8 bg-gradient-to-b from-white to-[#f8fbff]">
        <div className="max-w-4xl mx-auto space-y-24">

          {/* Who We Are */}
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0d2440]">
              We’re building the future of tech careers in India
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              Most job platforms treat you like a resume. We see you as a developer with dreams, gaps, and insane potential.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              That’s why we use AI not just to match jobs but to <span className="font-semibold text-[#2e5e99]">actually understand your skills</span>, show you exactly what’s missing, give you a clear learning path, and connect you with companies that will fight to hire you.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              Oh, and we keep you updated daily on tech, markets, health, sports everything a developer cares about in one clean feed.
            </p>
          </div>

          {/* Mission – Bold Card */}
          <div className="bg-gradient-to-r from-[#0d2440] to-[#1e3a5c] text-white p-12 rounded-3xl shadow-xl">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h3>
            <p className="text-2xl leading-relaxed opacity-95">
              One click → the perfect company that deserves <em>you</em>.
            </p>
            <p className="mt-4 text-lg opacity-80">
              No noise. No spam. No praying your resume isn’t ignored.
            </p>
          </div>

          {/* Our Values – Beautiful Cards */}
          <div className="space-y-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0d2440]">What we stand for</h2>

            <div className="space-y-10">
              {[
                { title: "Radical Honesty", icon: "HeartHandshake", desc: "We’ll tell you what’s wrong with your profile because sugarcoating helps no one." },
                { title: "Real Growth", icon: "Rocket", desc: "Personalized roadmaps that actually turn juniors into seniors." },
                { title: "Zero BS", icon: "Shield", desc: "No fake jobs. No ghosting. We work only with companies that respect developers." },
                { title: "Community First", icon: "Users", desc: "Everything we build is shaped by real developers not boardrooms." },
              ].map((value) => (
                <div key={value.title} className="flex gap-6 items-start bg-white rounded-2xl p-8 shadow-md border border-gray-200 transition-all">
                  <div className="flex-shrink-0 w-16 h-16 bg-[#7ba4d0]/10 rounded-full flex items-center justify-center">
                    <svg className="w-9 h-9 text-[#2e5e99]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {value.icon === "HeartHandshake" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />}
                      {value.icon === "Rocket" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />}
                      {value.icon === "Shield" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />}
                      {value.icon === "Users" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />}
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-[#0d2440] mb-3">{value.title}</h4>
                    <p className="text-lg text-gray-700 leading-relaxed">{value.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Final Touch – Warm Closing */}
          <div className="bg-[#7ba4d0]/10 rounded-3xl p-12 text-center md:text-left">
            <h3 className="text-3xl md:text-4xl font-bold text-[#0d2440] mb-6">
              Ready to stop applying and start getting noticed?
            </h3>
            <p className="text-xl text-gray-700 mb-8">
              Join thousands of developers who’ve already taken control of their careers.
            </p>
            <div className="mt-10 flex gap-6">
              <a
                href="mailto:info@vfound.in"
                className="border relative h-14 py-2 p-15 text-black text-3xl font-bold overflow-hidden bg-white rounded-4xl transition-all duration-200 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-700 before:to-blue-400 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0">
                Mail us
              </a>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}