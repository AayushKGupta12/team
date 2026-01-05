"use client";

import { useState, useEffect } from "react";

interface Testimonial {
  quote: string;
  author: string;
  title: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "  vfound identified gaps in my stack, ranked my experience with AI parsing, and recommended roles where my percentile score was highest. The technical evaluation made my strengths obvious to recruiters.",
    author: "Kunal Sahu",
    title: "SOLUTIONS ENGINEER",
    avatar: "https://avatar.iran.liara.run/public/14"
  }
];

export default function ResumeCTA() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#ff5a57] to-[#e02f75] overflow-hidden bg-rotate-45">
      <div className="absolute inset-0" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center min-h-screen px-6 py-12 lg:px-12 max-w-7xl mx-auto gap-12 lg:gap-20">
        {/* Left: Testimonial Card Carousel */}
        <div className="relative w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10 text-gray-700">
            {/* Avatar */}
            <div className="flex justify-center -mt-16 mb-6">
              <div className="w-24 h-24 rounded-full border-4 border-[#6700a3] shadow-lg overflow-hidden bg-gray-200">
                <img
                  src={current.avatar}
                  alt={current.author}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/96?text=User";
                  }}
                />
              </div>
            </div>

            {/* Quote */}
            <blockquote className="text-lg lg:text-xl italic text-center mb-8 leading-relaxed">
              “{current.quote}”
            </blockquote>

            {/* Author */}
            <div className="text-center">
              <p className="font-semibold text-gray-900">{current.author}</p>
              <p className="text-sm text-gray-500 uppercase tracking-wider">
                {current.title}
              </p>
            </div>

          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentIndex
                    ? "bg-white w-8"
                    : "bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right: Hero Text & CTA */}
        <div className="text-center lg:text-left text-white max-w-2xl">
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-8">
            Resumes get calls
            <br />
            aren’t just polished 
            <br />
            they’re evaluated <span className="text-teal-300">By Us</span>
          </h1>

          <div className="mt-10 flex gap-6">
              <a
                href="#roles"
                className="border relative h-14 py-2 px-12 text-black text-3xl font-bold overflow-hidden bg-white rounded-4xl transition-all duration-200 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#6700a3] before:to-blue-400 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0">
                Analyse <span className="">Resume</span>
              </a>
            </div>
        </div>
      </div>
    </section>
  );
}