'use client';

export default function Hero() {
  const logoUrl = "/mnt/data/38d2223f-ef6a-42e3-98db-181046034e36.png";

  return (
    <div>
      {/* HERO SECTION */}
      <div className="relative overflow-hidden w-full bg-[#e7f0fa] py-12 md:py-20 lg:py-25 px-4 sm:px-6 md:px-16 lg:px-20">

        {/* BACKGROUND STATIC LETTERS */}
        <div className="absolute inset-0 flex flex-col justify-center items-center md:items-end md:mr-2 px-4">

              <div className="text-[clamp(24px,8vw,150px)] md:text-[clamp(50px,15vw,150px)]
              font-extrabold leading-[1.1] md:leading-[0.85]
              text-[#7ba4d0]/45 text-center md:text-right whitespace-nowrap md:whitespace-normal">

            {/* MOBILE VERSION - visible only on mobile */}
            <div className="block md:hidden mt-100 text-7xl">  
              About
            </div>
            <div className="text-sm text-[#2e5e99]">Every thing you need to know about us</div>

            {/* DESKTOP VERSION - visible only on md+ */}
            <div className="hidden md:block mt-19">
              <br /><br /><br />
              About us
              <div className="text-4xl text-[#2e5e99]">Every thing you need to know about us</div>
            </div>
            

          </div>
        </div>


        {/* OVERLAY TEXT CONTENT */}
        <div className="relative z-20 min-h-[450px] md:min-h-[450px] flex items-center justify-center md:justify-start md:items-end">
          <div className="w-full max-w-md md:max-w-lg text-center md:text-left px-4 sm:px-6 md:px-0">
            <h1 className="font-extrabold tracking-tight text-[clamp(28px,8vw,80px)] md:text-[clamp(36px,6vw,80px)] leading-[0.95] md:leading-[0.92] text-[#0b1724]">
              <span className="block">India's Largest IT</span>
              <span className="block">
                Jobs Portal for <span className="text-[#2e5e99]">Recent Undergrads</span>
              </span>
            </h1>
          </div>
        </div>
      </div>

      {/* ABOUT SECTION - Clean & Professional */}
      <div className="bg-[#7ba4d0]">
        <div className="bg-white py-20 px-6">
          <div className="max-w-5xl mx-auto space-y-20">

            {/* Who We Are */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-[#0d2440]">
                Who We Are
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                We are an organization redefining the job search experience. Observing the youth's skill mismatch and employment challenges, we've developed a platform that aligns users' skills with suitable companies. Using Artificial Intelligence, we parse resumes, recommend roles, and provide structured learning roadmaps for trending IT jobs. Our integrated news feature also keeps users updated across seven domains: technology, science, Indian stock market, IT, health, sports, and fitness.
              </p>
            </div>

            {/* Our Mission */}
            <div className="bg-[#0d2440] text-white p-10 rounded-2xl">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h3>
              <p className="text-lg md:text-xl leading-relaxed opacity-95">
                To revolutionize job searching in India by helping users find the best-fit company at a single click.
              </p>
            </div>

            {/* Our Values */}
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-[#0d2440]">
                Our Values
              </h2>
              <div className="grid md:grid-cols-2 gap-10">
                {[
                  { title: "Excellence", desc: "We aim to maintain a seamless and high-quality user experience." },
                  { title: "Innovation", desc: "We constantly explore creative and impactful approaches." },
                  { title: "Integrity", desc: "We operate transparently and uphold ethical values." },
                  { title: "Partnership", desc: "We value lasting collaborations with teams and clients." },
                ].map((value) => (
                  <div
                    key={value.title}
                    className="border-l-4 border-[#0d2440] pl-6 py-4 bg-gray-50 rounded-r-lg"
                  >
                    <h4 className="text-2xl font-semibold text-[#0d2440] mb-2">
                      {value.title}
                    </h4>
                    <p className="text-gray-700 text-base leading-relaxed">
                      {value.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Our Approach */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-[#0d2440]">
                Our Approach
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                We adopt a collaborative methodology that places users and clients at the core of our decisions. Our process integrates understanding, strategic planning, and efficient execution.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                By combining proven frameworks with creative problem-solving, we deliver practical and transformative results ensuring long-term success.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}