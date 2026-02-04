'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GuidedPath: React.FC = () => {
  const steps = [
    {
      title: 'Analyze Your Resume',
      description:
        'Boost 70% the chance of shortlisting by analyzing your resume with our advanced tools.',
      image:
        'https://images.unsplash.com/photo-1586281380349-632531db7ed4',
    },
    {
      title: 'Generate Cover Letter',
      description:
        'Boost impression on recruiters and allow resume shortlisting feature to give weightage to your application.',
      image:
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4',
    },
    {
      title: 'Use Our Trusted Chrome Extension',
      description:
        'For online assessments: Helps solve coding, behavioral questions, grammar, and aptitude tests.',
      image:
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
    },
    {
      title: 'English Speech Intelligence',
      description:
        "If you're not good at speaking English, use our tool. Helped over 9000+ candidates improve confidence in 7 days.",
      image:
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
    },
    {
      title: 'Interview Intelligence',
      description:
        'Practice with real-life interview simulations: Technical, Behavioral, HR rounds.',
      image:
        'https://images.unsplash.com/photo-1600880292203-757bb62b4baf',
    },
  ];

  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    sectionRefs.current.forEach((el) => {
      if (!el) return;

      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, []);

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Guided Path to Using Our Application
        </h2>

        {steps.map((step, index) => (
          <div
            key={index}
            ref={(el) => {
              sectionRefs.current[index] = el;
            }}
            className={`flex flex-col ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            } items-center mb-16`}
          >

            <div className="w-full md:w-1/2 p-4">
              <Image
                src={step.image}
                alt={step.title}
                width={600}
                height={400}
                className="rounded-lg shadow-lg object-cover"
                priority={index === 0}
              />
            </div>

            <div className="w-full md:w-1/2 p-4">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                {index + 1}. {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GuidedPath;
