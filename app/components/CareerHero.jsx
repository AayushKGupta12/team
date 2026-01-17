'use client';

export default function CareersPage() {
  return (
    <>
      {/* HERO – "We Are Hiring" */}
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
              <span className="block">We’re Hiring :</span>
              <span className="text-[#2e5e99]">Developer</span>
            </h1>

            <p className="mt-8 text-xl md:text-2xl text-gray-700 max-w-2xl leading-relaxed">
             Not just coders. Not just designers.
              <span className="font-semibold text-[#0d2440]">People who want to shape the future of how India builds software.</span>
            </p>

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


      {/* HIRING SECTION – Left-aligned, modern, human */}
      <section id="roles" className="py-24 px-6 lg:px-8 bg-gradient-to-b from-white to-[#f8fbff]">
        <div className="max-w-4xl mx-auto space-y-24">

          {/* Intro */}
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0d2440]">
              Come build the future with us
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              We’re a fast-growing team obsessed with fixing the broken developer journey in India.
              If you’re passionate, a little crazy in a good way, and ready to move fast.
            </p>
          </div>

          {/* Roles – Beautiful Cards */}
          <div className="space-y-12">

            {[
              {
                title: "Software Engineer",
                desc: "You live for clean code, scalable systems, and shipping fast. You’ll build the core platform and modern backend tech.",
                stack: "Next.js ·  PostgreSQL · AWS"
              },
              {
                title: "UI/UX Designer",
                desc: "You turn complex problems into beautiful, intuitive experiences. You’ll design the entire user journey from onboarding to job matches with Figma and real user feedback.",
                stack: "Figma · Framer · Design Systems · User Research"
              },
              {
                title: "ML Engineer",
                desc: "You love turning data into magic. You’ll improve our resume parser, skill matching engine, and career recommendations using Python, PyTorch, and real-world impact.",
                stack: "Python · PyTorch · NLP · Docker · ML Ops"
              },
              {
                title: "Full-Stack Web Developer",
                desc: "You’re a builder at heart. You’ll work across the stack to ship features that developers actually love fast, responsive, and pixel-perfect.",
                stack: "Next.js · TypeScript · Tailwind · Key Database"
              },
            ].map((role) => (
              <div
                key={role.title}
                className="group flex gap-8 items-start bg-white rounded-2xl p-8 shadow-lg border border-gray-400"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-[#7ba4d0]/10 rounded-full flex items-center justify-center group-hover:bg-[#2e5e99]/10 transition-colors">
                  <svg className="w-9 h-9 text-[#2e5e99]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#0d2440] mb-3">{role.title}</h3>
                  <p className="text-lg text-gray-700 mb-4 leading-relaxed">{role.desc}</p>
                  <p className="text-sm font-medium text-[#2e5e99]/80 uppercase tracking-wider">{role.stack}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Apply Now – Stunning CTA */}
<div className="text-center py-25 bg-gradient-to-r from-[#ff5a57] to-[#e02f75] mt-8 rounded-3xl border border-amber-300 shadow-xl">

  {/* Heading */}
  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
    🚀 Think you’d be a great fit?
  </h2>
  <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto mb-10">
    Join our team that values curiosity, craftsmanship, and care. Your journey starts here.
  </p>

  {/* Centered Apply Button – preserved look */}
  <div className="mt-10 flex justify-center">
    <a
      href="https://docs.google.com/forms/d/e/1FAIpQLScUZ5y_RpNN9FXlm5U5ZtGaZuAmOeb_PDwldEUrMG6RO-lRXA/viewform?usp=publish-editor"
      target="_blank"
      rel="noopener noreferrer"
      className="border relative h-10 px-8 py-1 text-black text-2xl font-bold overflow-hidden bg-white rounded-3xl transition-all duration-200 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-700 before:to-blue-400 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
    >
      Apply Now
    </a>
  </div>
  </div>

        </div>
      </section>
    </>
  );
}