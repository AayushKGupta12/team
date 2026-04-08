import React from 'react';

const AayushBillboard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-6 font-sans">
      {/* The Billboard Container */}
      <div className="relative w-full bg-amber-50 mt-18 max-w-4xl rounded-3xl shadow-2xl overflow-hidden border-8 border-black">
        
        {/* Decorative "Spotlights" */}
        <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-white/20 to-transparent"></div>
        
        <div className="p-10 md:p-16 flex flex-col items-start space-y-6">
          
          {/* Brand-style Tag */}
          <div className="bg-red-200 text-red-600 font-black px-4 py-1 rounded-md text-sm uppercase tracking-widest">
            Urgent Notification
          </div>

          {/* The Main Hook */}
          <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tighter">
            SHREYA,<br />
            <span className="text-yellow-400">Unblock kar de, please🙏</span><br />
          </h1>

          {/* The Subtext */}
          <p className="text-gray-700 text-xl md:text-2xl font-medium max-w-2xl">
            Exam ke baad jitna sunana hai sunaa lena. I Promise ki ab se <span className="underline decoration-yellow-400">repeat nai karunga</span>.
          </p>

          {/* CTA / Signature Style */}
          <div className="mt-8 flex items-center space-y-0 space-x-4">
            <div className="h-14 w-14 bg-white rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl">🙏</span>
            </div>
            <div className="text-lg text-gray-600">
              <p className="text-2xl font-bold italic tracking-tight">Bhai, Please shreya ko bolo. unblock karde.</p>
            </div>
          </div>
          <div className="text-md font-bold italic tracking-tight">(scroll karo niche, PYQs are available)</div>
        </div>
        <div className="absolute top-6 right-6 group">
            <button className="bg-white hover:text-black rounded-full w-8 h-8 flex items-center justify-center font-bold transition-all duration-300 ring-2 ring-gray-400">
                i
            </button>
            
            {/* The Hidden Disclaimer Box */}
            <div className="absolute right-0 top-10 w-64 bg-black/80 text-white text-[10px] p-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none text-center">
                This is an example of guerrilla advertisement. 
                There is no real-world entity or personal relationship 
                implied with Shreya in this matter.
            </div>
            </div>
      </div>

      {/* Billboard Stand Legs */}
      <div className="flex justify-between w-full max-w-2xl px-20">
        <div className="w-6 h-20 bg-gray-800"></div>
        <div className="w-6 h-20 bg-gray-800"></div>
      </div>
    </div>
  );
};

export default AayushBillboard;