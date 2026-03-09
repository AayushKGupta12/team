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
            <div className="inline-block px-4 py-1.5 bg-[#e7f0fa] text-[#2e5e99] text-sm font-black uppercase tracking-widest rounded-lg mb-2">
              Our Story
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-[#0d2440] leading-[1.1] tracking-tight">
              We’re building the future of tech careers in India
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed font-medium">
              Most job platforms treat you like a resume. We see you as a developer with dreams, gaps, and insane potential. Founded by <span className="text-[#0d2440] font-black underline decoration-[#ffd77a] decoration-4 underline-offset-4">Aayush Kumar Gupta</span>, Developer Builder was born out of a simple frustration: the gap between skill and opportunity.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              That’s why we use AI not just to match jobs but to <span className="font-bold text-[#2e5e99]">actually understand your skills</span>, show you exactly what’s missing, give you a clear learning path, and connect you with companies that will fight to hire you.
            </p>
          </div>

          {/* Mission – Bold Card */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#0d2440] to-[#1e3a5c] text-white p-12 md:p-16 rounded-[2.5rem] shadow-2xl">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
            <h3 className="text-3xl md:text-4xl font-black mb-6 text-[#ffd77a]">Our Mission</h3>
            <p className="text-2xl md:text-3xl leading-tight font-bold opacity-95 tracking-tight">
              One click → the perfect company that deserves <em className="text-[#ffd77a] not-italic underline decoration-2 underline-offset-8">you</em>.
            </p>
            <p className="mt-6 text-lg opacity-80 font-medium">
              No noise. No spam. No praying your resume isn’t ignored. Just engineering excellence meeting industry demand.
            </p>
          </div>

          {/* Our Values – Beautiful Cards */}
          <div className="space-y-12">
            <h2 className="text-4xl md:text-5xl font-black text-[#0d2440] tracking-tight">What we stand for</h2>

            <div className="grid grid-cols-1 gap-8">
              {[
                { title: "Radical Honesty", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", desc: "We’ll tell you what’s wrong with your profile because sugarcoating helps no one." },
                { title: "Real Growth", icon: "M13 10V3L4 14h7v7l9-11h-7z", desc: "Personalized roadmaps that actually turn juniors into seniors." },
                { title: "Zero BS", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", desc: "No fake jobs. No ghosting. We work only with companies that respect developers." },
                { title: "Community First", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z", desc: "Everything we build is shaped by real developers—not boardrooms." },
              ].map((value) => (
                <div key={value.title} className="group flex flex-col md:flex-row gap-6 items-start bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:border-[#2e5e99] hover:shadow-xl transition-all duration-300">
                  <div className="flex-shrink-0 w-16 h-16 bg-[#7ba4d0]/10 rounded-2xl flex items-center justify-center group-hover:bg-[#2e5e99] transition-colors duration-300">
                    <svg className="w-8 h-8 text-[#2e5e99] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={value.icon} />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-[#0d2440] mb-2">{value.title}</h4>
                    <p className="text-lg text-gray-600 leading-snug font-medium">{value.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Final Touch – Warm Closing */}
          <div className="bg-[#0d2440] rounded-[3rem] p-10 md:p-16 text-center shadow-2xl relative overflow-hidden">
             <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#2e5e99] opacity-20 blur-3xl" />
            <h3 className="text-3xl md:text-5xl font-black text-white mb-6 leading-none">
              Ready to stop applying and <br />
              <span className="text-[#ffd77a] mt-10">start getting noticed?</span>
            </h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-15">
              <a
                href="mailto:support@vfound.in"
                className="group border relative h-16 px-12 flex items-center justify-center text-[#0d2440] text-2xl font-black overflow-hidden bg-[#ffd77a] rounded-2xl transition-all duration-200 ease-in-out shadow-[0_8px_0_0_#b45309] hover:translate-y-[-2px] hover:shadow-[0_10px_0_0_#b45309] active:translate-y-[4px] active:shadow-none"
              >
                Let&apos;s Talk
              </a>
              <div className="text-left">
                <p className="text-white/40 text-xs font-black uppercase tracking-widest">Typical response</p>
                <p className="text-white font-bold text-lg">Under 24 Hours</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}