import React from 'react';

const testimonials = [
  {
    quote: "Tauzadn's DSA course was a game-changer for me. The pattern-first approach made it so much easier to understand and solve problems. I went from struggling with basic questions to confidently tackling complex ones in just a few weeks.",
    name: "Ishita Kapoor",
    role: "SDE Internship",
    batch: "Batch of 2026",
    avatar: "https://i.pravatar.cc/150?u=arjun",
    projectUrl: "https://Tauzand.in/certificate/VF2026DO00001"
  },
  {
    quote: "DSA used to be my nightmare, but Tauzand's method of teaching patterns first really clicked for me. The retention was incredible - I still remember the concepts clearly even after months. It’s like they’ve cracked the code to learning DSA effectively.",
    name: "Arjun Mehta",
    role: "Frontend Developer",
    batch: "Batch of 2025",
    avatar: "https://i.pravatar.cc/150?u=ishita",
    projectUrl: "https://Tauzand.in/certificate/VF2025SD00001"
  },
  {
    quote: "I rember spending hours on end trying to memorize solutions from YouTube videos, but it never stuck. Tauzand's approach of teaching the underlying patterns and principles made it so much easier to learn and apply. I felt ready for interviews in just a couple of months.",
    name: "Priya Patel",
    role: "Full Stack Engineer",
    batch: "Batch of 2026",
    avatar: "https://i.pravatar.cc/150?u=rahul",
    projectUrl: "https://Tauzand.in/certificate/VF2026SD00002"
  },
  {
    quote: "The code reviews were intense but incredibly helpful. My mentor pushed me to write cleaner, more optimized code. I could see a clear improvement in my problem-solving skills and coding style. This isn’t just a course; it’s a real validation of your engineering abilities.",
    name: "Rahul Sharma",
    role: "Java Intern",
    batch: "Batch of 2025",
    avatar: "https://i.pravatar.cc/150?u=priya",
    projectUrl: "https://Tauzand.in/certificate/VF2025BJ00001"
  },
  {
    quote: "Company wise preparation was a huge help. I could focus on the specific patterns and questions that were relevant to the companies I was targeting. It made my preparation much more efficient and effective.",
    name: "Aman Gupta",
    role: "Data Science Intern",
    batch: "Batch of 2026",
    avatar: "https://i.pravatar.cc/150?u=aman",
    projectUrl: "https://Tauzand.in/certificate/VF2026DS00001"
  },
];

export default function InfiniteScrollingTestimonials() {
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-24 bg-[#0d1626] overflow-hidden rounded-3xl ">
      {/* Inline Styles for the Marquee Animation */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 140s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />

      <div className="w-full">
        {/* Header */}
         <div className="text-center mb-24">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter mb-4">
            Start Solving <span className="italic font-light text-yellow-500">Today itself</span>
          </h2>
          <p className="text-slate-400">Company-wise preparation for DSA interviews & Coding round's</p>
        </div>

        {/* Marquee Container */}
        <div className="relative group">
          {/* Side Fades */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0d1626] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0d1626] to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee gap-8 flex">
            {duplicatedTestimonials.map((t, i) => (
              <div 
                key={i} 
                className="w-[450px] flex flex-col bg-[#142033] border border-slate-800 p-8 rounded-2xl transition-all hover:border-blue-900/50 hover:bg-[#1a2942]"
              >
                <p className="text-slate-300 leading-relaxed text-[15px] mb-8 italic">
                  "{t.quote}"
                </p>

                <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-800/50">
                  <div className="flex items-center gap-3">
                    <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full border border-slate-700" />
                    <div>
                      <h4 className="text-sm font-semibold text-white">{t.name}</h4>
                      <p className="text-[12px] text-slate-300">{t.role} • {t.batch}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Proof Line */}
        <div className="mt-16 flex justify-center items-center gap-2 px-6">
           <div className="flex -space-x-2">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0d1626] bg-slate-800 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i+30}`} alt="user" />
                </div>
              ))}
           </div>
           <p className="text-sm text-slate-300 ml-2">
             Joined by <span className="text-white font-medium">1380+</span> engineering students.
           </p>
        </div>
      </div>
    </section>
  );
}