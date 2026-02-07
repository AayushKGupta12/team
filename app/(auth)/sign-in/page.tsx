"use client";

import {
  SignIn ,
} from "@clerk/nextjs";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Quote, Star } from "lucide-react";

const images = [
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
  "https://images.unsplash.com/photo-1505761671935-60b3a7427bad",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
]

export default function SignInPage() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col bg-[#f4f9ff]">
      {/* ================= MAIN ================= */}
      <div className="grid flex-1 grid-cols-1 lg:grid-cols-2">
        
        {/* LEFT – Image Carousel */}
        <div className="relative hidden lg:flex items-center justify-center p-6">
  {/* Frame */}
  <div className="relative h-[calc(100vh-3rem)] w-full max-w-[560px] overflow-hidden rounded-3xl border border-white/10 shadow-xl">
    
    {/* Carousel */}
    <div
      className="flex h-full transition-transform duration-1000 ease-out"
      style={{ transform: `translateX(-${index * 100}%)` }}
    >
      {images.map((src, i) => (
        <div key={i} className="relative h-full w-full flex-shrink-0">
          <Image
            src={src}
            alt="Background"
            fill
            className="object-cover brightness-90"
            priority={i === 0}
            quality={85}
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      ))}
    </div>

    {/* Overlay text */}
    <div className="absolute bottom-10 left-10 right-10 text-white">
      <h2 className="text-3xl font-medium leading-tight">
        Build your future.
        <br />
        Step by step.
      </h2>
      <p className="mt-4 text-base text-white/70 max-w-md">
        Join thousands of professionals advancing their careers with
        smart tools and real insights.
      </p>
    </div>
  </div>
</div>


        {/* RIGHT – Sign In */}
        <div className="flex items-center justify-center px-6 py-12 lg:py-0 bg-[#f4f9ff]">
          <div className="w-full max-w-md space-y-8">

            {/* Small heading */}
            <div className="flex flex-col items-center mt-10">
                <p className="text-2xl text-gray-600 italic">
                    Sign in to continue your journey
                </p>
            </div>

            {/* Clerk */}
            <div className="flex justify-center">
              <SignIn routing="hash"/>
            </div>

            {/* Back link */}
            <div className="text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-[#2e5e99] hover:text-[#0d2440] transition-colors group"
              >
                <ArrowLeft
                  size={16}
                  className="group-hover:-translate-x-1 transition-transform"
                />
                <span>Return to homepage</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-16 px-6 bg-[#f4f9ff]">
        <div className="mx-auto max-w-6xl">
          <h3 className="text-center text-2xl font-bold text-gray-800 mb-12 tracking-wide">
            What our users say
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                quote: "VFound helped me tailor my resume exactly to what recruiters expect. The insights were surprisingly accurate.",
                author: "Final year CS student",
                rating: 5,
              },
              {
                quote: "The resume analysis and job alignment features saved me hours. It feels built for real-world hiring.",
                author: "Software Engineer",
                rating: 5,
              },
              {
                quote: "Clean UI, clear feedback, and no unnecessary fluff. Exactly what I needed while preparing for interviews.",
                author: "Job seeker",
                rating: 4,
              },
              {
                quote: "VFound feels like a career mentor rather than just another tool. The guidance actually makes sense.",
                author: "Early-career professional",
                rating: 5,
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="relative rounded-2xl bg-white p-6 shadow-lg border border-gray-200"
              >
                {/* Quote icon for creativity */}
                <Quote
                  size={24}
                  className="absolute top-4 left-4 text-[#2e5e99]"
                />

                {/* Stars */}
                <div className="flex mb-4 mt-2">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      size={16}
                      className={`${
                        starIndex < testimonial.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-yellow-400"
                      }`}
                    />
                  ))}
                </div>

                {/* Quote text */}
                <p className="text-sm text-gray-700 font-light leading-relaxed italic">
                  “{testimonial.quote}”
                </p>

                {/* Author */}
                <p className="mt-6 text-xs font-medium text-gray-600">
                  — {testimonial.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <hr />
      <footer className="border-t border-white/5 py-3 text-center text-sm text-gray-300 bg-gray-900">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <span>© {new Date().getFullYear()} VFound.in</span>
          <div className="flex gap-6">
            <Link href="/term-of-use" className="hover:text-gray-50">
              Terms of Use
            </Link>
            <Link href="/term-of-use#disclaimer" className="hover:text-gray-50">
              Disclaimer
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}