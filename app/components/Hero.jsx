'use client';

export default function Hero() {
  const logoUrl = "/mnt/data/38d2223f-ef6a-42e3-98db-181046034e36.png";

  return (
    <section className="relative overflow-hidden w-full bg-[#e7f0fa] py-12 md:py-20 lg:py-45 px-4 sm:px-6 md:px-16 lg:px-20">

      {/* BACKGROUND STATIC LETTERS – ONLY HIDDEN ON MOBILE */}
      <div className="absolute inset-0 flex flex-col justify-center place-items-center md:place-items-end pointer-events-none mr-0 md:mr-2 px-4">
        <div className="text-[clamp(24px,8vw,150px)] md:text-[clamp(50px,15vw,150px)] font-extrabold leading-[1.1] md:leading-[0.85] text-[#7ba4d0]/45 text-center md:text-right whitespace-nowrap md:whitespace-normal">

          {/* Desktop version – unchanged */}
          <div className="hidden md:block">
            Software <br /> Engineer <br /> Analyst <br /> Artificial Intelligence
          </div>

          {/* Mobile version – now completely hidden */}
          <div className="hidden md:hidden">
            <div className="space-y-2">
              <div>Software</div>
              <div>Engineer</div>
              <div>Analyst</div>
              <div>Artificial</div>
              <div>Intelligence</div>
            </div>
          </div>
        </div>
      </div>

      {/* OVERLAY TEXT CONTENT – 100% untouched */}
      <div className="relative z-20 min-h-[450px] md:min-h-[450px] flex items-center justify-center md:justify-start md:items-end">
        <div className="w-full max-w-md md:max-w-lg text-center md:text-left px-4 sm:px-6 md:px-0">
          <h1 className="font-extrabold tracking-tight text-[clamp(28px,8vw,80px)] md:text-[clamp(36px,6vw,80px)] leading-[0.95] md:leading-[0.92] text-[#0b1724]">
            <span className="block">India's Largest IT</span>
            <span className="block">
              Jobs Portal for <span className="text-[#2e5e99]">Recent Undergrads</span>
            </span>
          </h1>

          <div className="relative inline-flex items-center justify-center gap-4 group mt-6 md:mt-8 md:px-2">
            <div
              className="absolute inset-0 duration-1000 opacity-60 transitiona-all bg-gradient-to-r from-indigo-700 via-pink-700 to-yellow-700 rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200"
            ></div>
            <a
              role="button"
              className="group relative inline-flex items-center justify-center text-sm md:text-base rounded-xl bg-[#0d2440] px-6 py-2.5 md:px-8 md:py-3 font-semibold text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-gray-600/30"
              title="payment"
              href="/it-jobs"
            >
              Explore Jobs
              <svg
                aria-hidden="true"
                viewBox="0 0 10 10"
                height="10"
                width="10"
                fill="none"
                className="mt-0.5 -mr-1 ml-5 stroke-white stroke-2"
              >
                <path
                  d="M0 5h7"
                  className="transition opacity-0 group-hover:opacity-100"
                ></path>
                <path
                  d="M1 1l4 4-4 4"
                  className="transition group-hover:translate-x-[3px]"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}