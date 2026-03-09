'use client';

export default function Hero() {
  return (
    <section className="relative overflow-hidden w-full bg-[#e7f0fa] min-h-[70vh] flex items-center px-6 md:px-16 lg:px-24 mb-20">
      
      {/* CREATIVE BACKGROUND LAYER: Overlapping "PRICE" Typography */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none flex flex-col justify-between p-4 md:p-10">
        
        {/* Top Floating Text */}
        <div className="flex justify-between items-start opacity-30">
          <div className="text-[#7ba4d0] font-black text-xl tracking-widest uppercase">
            Est. 2024
          </div>
          <div className="hidden md:block text-[12vw] font-black text-transparent leading-none" style={{ WebkitTextStroke: '2px #7ba4d0' }}>
            PAYMENT
          </div>
        </div>

        {/* Bottom Floating Text */}
        <div className="flex items-end justify-center md:justify-end gap-10">
          <div className="hidden lg:block text-right mb-4">
            <p className="text-[#2e5e99] font-bold text-sm tracking-widest uppercase mb-1">Affordability Score</p>
            <div className="h-1 w-32 bg-[#2e5e99] rounded-full overflow-hidden">
              <div className="h-full bg-[#0d2440] w-[95%]"></div>
            </div>
            <p className="text-[#2e5e99] text-[10px] mt-1 font-black italic">Lower than a packet of chips</p>
          </div>
        </div>
      </div>

      {/* FOREGROUND CONTENT: The Command Center */}
      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        <div className="lg:col-span-8">

          <h1 className="font-black leading-[0.88] tracking-tighter">
            <span className="block text-4xl sm:text-5xl md:text-7xl text-[#0d2440] mb-2">
              India&apos;s Largest
            </span>
            <span className="block text-[#2e5e99] text-[clamp(50px,12vw,140px)]">
              Developer <br className="hidden md:block" />
              <span className="relative">
                Builder
                {/* Creative Underline */}
                <span className="absolute -bottom-2 left-0 w-full h-3 md:h-6 bg-[#7ba4d0]/30 -z-10 skew-x-[-12deg]" />
              </span>
            </span>
          </h1>
        </div>

        {/* Secondary Info Column */}
        <div className="lg:col-span-4 lg:pt-32">
          <div className="border-l-4 border-[#0d2440] pl-6 py-2">
            <p className="text-[#0d2440] font-bold text-lg md:text-xl leading-snug">
              Engineered for scale. <br />
              Priced for <span className="text-[#2e5e99] italic">everyone.</span>
            </p>
            <p className="text-[#2e5e99]/70 text-sm mt-4 font-medium max-w-[280px]">
              Join the movement of developers building the future without breaking the bank.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}