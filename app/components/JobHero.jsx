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
              IT Jobs
            </div>
            <div className="text-sm text-[#2e5e99]">Genuine | Secure | Safe</div>

            {/* DESKTOP VERSION - visible only on md+ */}
            <div className="hidden md:block mt-19">
              <br /><br /><br />
              IT Jobs
              <div className="text-4xl text-[#2e5e99] mb-7">Genuine | Secure | Safe</div>
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
    </div>


    


      
  );
}