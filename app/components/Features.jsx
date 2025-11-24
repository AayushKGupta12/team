"use client";
import Link from "next/link";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

const IMG_PADDING = 12;

const Features = () => {
  return (
    <div className="bg-white">
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop"
        subheading="Ongoing IT hiring for Internships & Fresh Undergrads in India. Starting from 4 LPA to 50 LPA+."
        heading="Explore IT Jobs"
      >
        <ExampleContent
          title="Work in India's Top IT Companies"
          desc1="Explore IT jobs across software engineering, data, AI, cloud, and cybersecurity. Updated daily with real hiring opportunities."
          desc2="Find internships and full-time roles with filters for skills, salary, and location from 4 LPA to 50 LPA+."
          route="/it-jobs"
        />
      </TextParallaxContent>

      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?q=80&w=2564&auto=format&fit=crop"
        subheading="Free AI-powered resume analysis built for Indian IT roles, including ATS score & industry match."
        heading="AI Resume Analysis"
      >
        <ExampleContent
          title="Improve Your Resume with AI"
          desc1="Our AI Resume Analyzer checks your resume’s technical depth, ATS score, and industry match."
          desc2="Get instant suggestions to improve clarity, format, keywords, and job-fit. Trained on 100,000+ Indian IT resumes."
          route="/ai-resume-analysis"
        />
      </TextParallaxContent>

      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1504610926078-a1611febcad3?q=80&w=2416&auto=format&fit=crop"
        subheading="Clear step-by-step learning paths and insightful blog posts one place for career guidance"
        heading="Roadmaps & Blogs"
      >
        <ExampleContent
          title="Roadmaps & Tech Blogs"
          desc1="Follow career roadmaps for Software, Data and AI, and read practical blog posts that explain the why and how behind each skill."
          desc2="Roadmaps are updated monthly; blogs are published weekly. Learn, practice, and apply with guided tasks and examples."
          route="/resources"
        />
      </TextParallaxContent>
    </div>
  );
};

export default Features;

const TextParallaxContent = ({ imgUrl, subheading, heading, children }) => {
  const targetRef = useRef(null);

  return (
    <div style={{ paddingLeft: IMG_PADDING, paddingRight: IMG_PADDING }}>
      <div className="relative h-[150vh]">
     
        <StickyImage imgUrl={imgUrl} targetRef={targetRef} />
        <OverlayCopy heading={heading} subheading={subheading} targetRef={targetRef} />
      </div>
      {children}
    </div>
  );
};

const StickyImage = ({ imgUrl, targetRef }) => {

  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["end end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      ref={targetRef}
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div className="absolute inset-0 bg-neutral-950/70" style={{ opacity }} />
    </motion.div>
  );
};

const OverlayCopy = ({ subheading, heading, targetRef }) => {

  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start end", "end start"] });

    const y = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.4, 0.6], [0, 1, 0.8]);

  return (
    <motion.div
      style={{ y, opacity }}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white pointer-events-none"
    >
      <p className="text-center text-4xl font-bold md:text-7xl mb-4">{heading}</p>
      <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl">{subheading}</p>
    </motion.div>
  );
};

const ExampleContent = ({ title, desc1, desc2, route }) => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4 text-[#0d2440]">{title}</h2>

    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-neutral-600 md:text-2xl">{desc1}</p>

      <p className="mb-8 text-xl text-neutral-600 md:text-2xl">{desc2}</p>

      <Link
        href={route}
        className="w-full rounded bg-[#0d2440] px-9 py-4 text-xl text-white transition-colors hover:bg-[#234a79] md:w-fit inline-flex items-center"
      >
        Explore <FiArrowUpRight className="inline ml-2" />
      </Link>
    </div>
  </div>
);
