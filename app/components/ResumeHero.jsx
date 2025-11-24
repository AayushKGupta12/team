'use client';

export default function ResumeHero() {
  const logoUrl = "/mnt/data/38d2223f-ef6a-42e3-98db-181046034e36.png";

  return (
    <div>
      {/* HERO SECTION */}
      <div className="relative overflow-hidden w-full bg-[#e7f0fa] py-12 md:py-20 lg:py-25 px-4 sm:px-6 md:px-16 lg:px-20">

        {/* BACKGROUND STATIC LETTERS */}
        <div className="absolute inset-0 flex flex-col justify-center place-items-center md:place-items-end pointer-events-none mr-0 md:mr-2 px-4">
          <div className="text-[clamp(24px,8vw,150px)] md:text-[clamp(50px,10vw,115px)] font-extrabold leading-[1.1] md:leading-[0.85] text-[#7ba4d0]/45 text-center md:text-right whitespace-nowrap md:whitespace-normal">
            <div className="hidden md:block">
              <br /><br /><br /><br />Check Your<br/>Resume Now !
            </div>
            <div className="block md:hidden space-y-2">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div>AI Resume Analysis</div>
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