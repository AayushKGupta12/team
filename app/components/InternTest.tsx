import React from 'react';


const testimonials = [
  {
    quote: "The 'No-Nonsense' approach is what hooked me. They don't give you boring videos; you get a real pull request to solve. My mentor helped me fix structural flaws in my code. It's essentially real job experience.",
    name: "Arjun Mehta",
    role: "SDE Internship",
    batch: "Batch of 2026",
    avatar: "https://i.pravatar.cc/150?u=arjun",
    projectUrl: "https://Tauzand.in/certificate/VF2026DO00001"
  },
  {
    quote: "Placement season was stressful—I had no real projects on my resume. Tauzand changed that in 45 days. The globally verifiable certificate actually helped me stand out in my Bangalore startup interviews.",
    name: "Ishita Kapoor",
    role: "Frontend Developer",
    batch: "Batch of 2025",
    avatar: "https://i.pravatar.cc/150?u=ishita",
    projectUrl: "https://Tauzand.in/certificate/VF2025SD00001"
  },
  {
    quote: "Building a production-ready feature with CI/CD pipelines under guidance was incredibly insightful. Tauzand teaches you the industry standards that college courses usually skip.",
    name: "Rahul Sharma",
    role: "Full Stack Engineer",
    batch: "Batch of 2026",
    avatar: "https://i.pravatar.cc/150?u=rahul",
    projectUrl: "https://Tauzand.in/certificate/VF2026SD00002"
  },
  {
    quote: "The code reviews were brutal but necessary. My mentor pushed me to write clean, optimized code. This isn't just a certificate; it's a real validation of my engineering skills.",
    name: "Priya Patel",
    role: "Java Intern",
    batch: "Batch of 2025",
    avatar: "https://i.pravatar.cc/150?u=priya",
    projectUrl: "https://Tauzand.in/certificate/VF2025BJ00001"
  },
  {
    quote: "Tauzand provided the exact edge I needed for off-campus drives. Practical project work and mentor approvals made my resume extremely credible to recruiters.",
    name: "Aman Gupta",
    role: "Data Science Intern",
    batch: "Batch of 2026",
    avatar: "https://i.pravatar.cc/150?u=aman",
    projectUrl: "https://Tauzand.in/certificate/VF2026DS00001"
  },
  {
    quote: "I appreciated the heavy emphasis on testing and documentation. This experience gave me a massive head start when I joined my first company as a fresher.",
    name: "Sneha Reddy",
    role: "UI/UX Developer",
    batch: "Batch of 2025",
    avatar: "https://i.pravatar.cc/150?u=sneha",
    projectUrl: "https://Tauzand.in/certificate/VF2025SD00003"
  },
  {
    quote: "The weekly mentor check-ins were a game-changer. I wasn't just completing a task; I was finally understanding the 'why' behind big architectural decisions.",
    name: "Vikram Singh",
    role: "Python Backend Intern",
    batch: "Batch of 2026",
    avatar: "https://i.pravatar.cc/150?u=vikram",
    projectUrl: "https://Tauzand.in/certificate/VF2026BF00001"
  },
  {
    quote: "It felt like working in an agile environment. The deadlines were realistic, and the mentor support was fantastic whenever I got stuck on critical bugs.",
    name: "Ananya Iyer",
    role: "MERN Stack Intern",
    batch: "Batch of 2025",
    avatar: "https://i.pravatar.cc/150?u=ananya",
    projectUrl: "https://Tauzand.in/certificate/VF2025SD00004"
  },
  {
    quote: "Worked on real-world datasets and model deployment. The certificate is a huge boost for anyone targeting high-paying applied machine learning roles in India.",
    name: "Rohan Das",
    role: "ML Intern",
    batch: "Batch of 2026",
    avatar: "https://i.pravatar.cc/150?u=rohan",
    projectUrl: "https://Tauzand.in/certificate/VF2026ML00001"
  },
  {
    quote: "The peer review process opened my eyes to different problem-solving approaches. Tauzand is more than an internship; it's a high-quality developer community.",
    name: "Divya Sharma",
    role: "DevOps Intern",
    batch: "Batch of 2025",
    avatar: "https://i.pravatar.cc/150?u=divya",
    projectUrl: "https://Tauzand.in/certificate/VF2025DO00001"
  }
];


export default function InfiniteScrollingTestimonials() {
  const duplicatedTestimonials = [...testimonials, ...testimonials];


  return (
    <section className="py-24 bg-[#0d1626] overflow-hidden rounded-3xl ">
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
         <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter mb-4">
            Our Intern's <span className="text-5xl font-bold text-yellow-400 tracking-tighter leading-[0.95]"> feedback</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Real projects. Industry mentors. Globally verifiable certificates that prove your skills to recruiters.</p>
        </div>


        {/* Marquee Container */}
        <div className="relative group">
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


                  <a 
                    href={t.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[12px] font-medium text-white bg-blue-600 px-3 py-1.5 rounded-lg border border-blue-900/50 hover:text-white transition-all"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Verify Certificate
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* Proof Line */}
        <div className="mt-12 flex justify-center items-center gap-3 px-6">
           <div className="flex -space-x-2">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-9 h-9 rounded-full border-2 border-[#0d1626] bg-slate-800 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i+30}`} alt="student" />
                </div>
              ))}
           </div>
           <p className="text-sm text-slate-300">
            Join <span className="text-white font-medium">700+</span> engineering students who validated their skills with Tauzand
          </p>
        </div>
      </div>
    </section>
  );
}