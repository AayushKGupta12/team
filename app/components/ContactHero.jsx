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

      {/* NEW SECTION: About + Contact (Added AFTER Hero) */}
      <section className="bg-white py-16 px-6 md:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            We are dedicated to connecting talented individuals with their dream IT jobs. 
            Our platform is designed to simplify your job search and help you find the 
            perfect opportunity to kickstart your career in the tech industry.
          </p>

          <p className="text-lg text-gray-800">
            If you have any queries, feel free to reach out to us anytime.
          </p>

          {/* Contact CTA */}
          <div className="pt-6">
            <p className="text-gray-700 font-medium mb-4">
              Have questions or ready to get started?
            </p>
            <a
              href="mailto:hello@vfound.in"
              className="inline-flex items-center gap-3 text-[#0d2440] font-bold text-xl underline underline-offset-4 hover:text-[#2e5e99] transition-colors"
            >
              Write to us :  hello@vfound.in
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <p className="text-sm text-gray-600 mt-3">
              We reply within <strong>48 hours</strong>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}