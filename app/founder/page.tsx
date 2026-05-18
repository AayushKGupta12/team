'use client'

import Image from 'next/image'
import { Metadata } from 'next'

export default function FounderPage() {
  const traction = [
    { value: '78K+', label: 'Students Reached' },
    { value: '38K+', label: 'Career Events Tracked' },
    { value: '99.9%', label: 'Platform Reliability' },
    { value: '13%', label: 'Organic Monthly Growth' },
  ]

  const systems = [
    'AI-powered career intelligence engine',
    'Microservice architecture with scalable infrastructure',
    'Real-time analytics and automated pipelines',
    'Personalised guidance systems for students',
  ]

  const thoughts = [
    'Making career intelligence accessible beyond tier-1 colleges',
    'Building AI systems that act, not just recommend',
    'Reducing career confusion through structured guidance',
    'Scaling meaningful mentorship with AI',
  ]

const metadata: Metadata = {
  // ── Core ──────────────────────────────────────────────────
  title: 'Aayush Kumar Gupta — Founder of Tauzand | AI-Powered Career OS',
  description:
    'Aayush Kumar Gupta is the founder of Tauzand Formerely Vfound, an AI-powered Career Operating System helping 8,000+ students discover direction, track progress, and make better career decisions. Built on microservices, RAG pipelines, and real-time analytics.',
 
  // ── Canonical ─────────────────────────────────────────────
  alternates: {
    canonical: "https://www.tauzand.in/",
  },
 
  // ── Keywords (helps LLM crawlers surface context) ─────────
  keywords: [
    'Aayush Kumar Gupta',
    'Tauzand founder',
    'Tauzand.in',
    'AI career platform India',
    'Career Operating System',
    'Student career AI',
    'KIIT',
    'AI SaaS founder India',
    'Agentic career platform',
    'Career intelligence platform',
  ],
 
  // ── Authors & Attribution ──────────────────────────────────
  authors: [{ name: 'Aayush Kumar Gupta', url: "https://www.tauzand.in/" }],
  creator: 'Aayush Kumar Gupta',
  publisher: 'Tauzand.in',
 
  // ── Open Graph ────────────────────────────────────────────
  openGraph: {
    type: 'profile',
    url: "https://www.tauzand.in/",
    siteName: 'Tauzand.in',
    title: 'Aayush Kumar Gupta — Founder, Tauzand.in',
    description:
      'Building an AI-powered Career OS for students. 78,000+ users, 99.9% uptime, 13% organic monthly growth. Meet the founder of Tauzand.in.',
    images: [
      {
        url: "https://www.tauzand.in/Aayush_Gupta.jpeg",
        width: 1200,
        height: 630,
        alt: 'Aayush Kumar Gupta - Founder of Tauzand.in',
      },
    ],
    firstName: 'Aayush Kumar',
    lastName: 'Gupta',
    username: 'AayushGupta',
  },
}

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900 antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {/* Soft Colorful Ambient Gradient Backdrops */}
      <div className="absolute top-0 left-1/4 -z-10 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-sky-200/40 to-emerald-200/40 blur-[140px]" />
      <div className="absolute top-[800px] right-0 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-amber-100/50 to-rose-100/40 blur-[140px]" />
      <div className="absolute bottom-[400px] left-[-100px] -z-10 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-indigo-100/40 to-sky-100/50 blur-[140px]" />

      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-6 pb-24 pt-20 md:px-10 lg:pt-32">
        <div className="grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="mb-6 inline-flex items-center rounded-full border border-yellow-300 bg-yellow-200 px-4 py-1.5 text-xs font-semibold tracking-wider shadow-sm backdrop-blur-md">
              BUILDING INTELLIGENT SYSTEM
            </div>

            <h1 className="max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight text-slate-900 md:text-7xl">
              Helping students grow with clarity
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl">
              I built Tauzand because career platforms were designed for recruiters, not for students trying to understand their own growth. Tauzand is an AI-powered Career Operating System that helps students discover direction, track progress, and make better decisions over time.
            </p>

            <div className="mt-10 flex flex-wrap gap-2.5">
              {[
                'KIIT University, Bhubaneshwar',
                'GSSoC Mentor',
                'GSOC, ML4Sci Contributor',
                'AI Systems Engineer',
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-full border border-slate-200/80 bg-white/60 px-4 py-1.5 text-sm font-medium text-slate-600 shadow-sm backdrop-blur-md"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
              <a
                href="https://tauzand.in"
                className="rounded-full bg-slate-900 px-8 py-3.5 text-sm font-semibold text-white shadow-md shadow-slate-900/10 transition-colors duration-200 hover:bg-slate-800"
              >
                Explore Tauzand
              </a>

              <a
                href="#mission"
                className="rounded-full border border-slate-200 bg-white/80 px-8 py-3.5 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-md transition-colors duration-200 hover:bg-white"
              >
                Read Mission
              </a>
            </div>
          </div>

          <div className="relative justify-center lg:justify-self">
            <div className="relative overflow-hidden rounded-md border border-slate-200/80 bg-white/80 p-8 shadow-xl shadow-slate-200/50 backdrop-blur-xl max-w-sm">
              <div className="mb-6">
                <h3 className="mt-1.5 text-2xl font-bold tracking-tight text-slate-900">
                  Aayush Kumar Gupta
                </h3>
              </div>
              
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                <Image
                  src="/Aayush_Gupta.jpeg"
                  alt="Aayush Kumar Gupta"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="mt-6 flex items-center justify-between rounded-xl border border-slate-300 bg-slate-100 px-4 py-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600">Status</p>
                  <p className="text-sm font-semibold text-slate-700">Founder & CEO</p>
                </div>
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_0_5px_rgba(16,185,129,0.15)] animate-ping" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section id="mission" className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
        <div className="rounded-[32px] border border-slate-200/80 bg-white/70 p-10 shadow-lg shadow-slate-100/50 backdrop-blur-md md:p-16">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-600">
            Vision & Mission
          </p>

          <h2 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight text-slate-900 md:text-5xl">
            Career growth should feel guided, not chaotic.
          </h2>

          <div className="mt-8 grid gap-8 md:grid-cols-2 border-t border-slate-100 pt-8">
            <p className="text-lg leading-relaxed text-slate-600">
              Tauzand exists to make career growth structured, intelligent, and accessible. Students deserve systems that understand their trajectory and help them move forward with confidence.
            </p>

            <p className="text-lg leading-relaxed text-slate-600">
              Instead of overwhelming students with endless job listings, Tauzand focuses on clarity, personalised recommendations, growth insights, and AI systems designed to genuinely help students improve over time.
            </p>
          </div>
        </div>
      </section>

      {/* Platform Traction Section */}
      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-600">
            Platform Traction
          </p>
          <h3 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Measured growth, real progress.
          </h3>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {traction.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200/80 bg-white/70 p-6 shadow-md shadow-slate-100/40 backdrop-blur-md"
            >
              <h3 className="text-4xl font-bold tracking-tight text-slate-900">
                {item.value}
              </h3>
              <p className="mt-2 text-sm font-medium text-slate-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Ecosystem Grid */}
      <section className="mx-auto grid max-w-7xl gap-8 px-6 pb-24 md:px-10 lg:grid-cols-2">
        {/* Why I Built It Card */}
        <div className="rounded-[32px] border border-slate-200/80 bg-white/70 p-10 shadow-lg shadow-slate-100/40 backdrop-blur-md md:p-12">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-600">
            Why I Built It
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Built from personal frustration.
          </h2>

          <div className="mt-8 space-y-6 text-slate-600 border-t border-slate-100 pt-6">
            <p className="leading-relaxed">
              As a student, I realised most career platforms were reactive. They helped students apply but not understand themselves.
            </p>

            <p className="leading-relaxed">
              Students quietly carry uncertainty around skills, direction, internships, interviews, and growth. Existing systems rarely help reduce that confusion meaningfully.
            </p>

            <p className="leading-relaxed">
              So I started building tools that could reason about career trajectories, surface relevant opportunities, and simplify decision-making through AI.
            </p>
          </div>
        </div>

        {/* Infrastructure Card */}
        <div className="rounded-[32px] border border-slate-200/80 bg-white/70 p-10 shadow-lg shadow-slate-100/40 backdrop-blur-md md:p-12">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-600">
            Infrastructure & Systems
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Designed for scale from day one.
          </h2>

          <div className="mt-8 space-y-4 border-t border-slate-100 pt-6">
            {systems.map((item) => (
              <div
                key={item}
                className="flex items-start gap-4 rounded-2xl border border-slate-400 bg-slate-200 p-4"
              >
                <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-slate-600" />
                <p className="text-md font-medium leading-relaxed text-slate-800">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What I'm Thinking About Section */}
      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
        <div className="rounded-[32px] border border-slate-200/80 bg-white/70 p-10 shadow-lg shadow-slate-100/40 backdrop-blur-md md:p-12">
          <p className="mb-6 text-xs font-bold uppercase tracking-widest text-slate-600">
            What I’m Thinking About
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            {thoughts.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-slate-400 bg-slate-200 p-5"
              >
                <p className="text-sm font-medium leading-relaxed text-slate-800">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="mx-auto max-w-5xl px-6 pb-24 text-center md:px-10">
        <blockquote className="text-3xl font-semibold leading-normal tracking-tight text-slate-900 md:text-4xl">
          “Career growth should feel guided, not overwhelming.”
        </blockquote>

        <p className="mt-4 text-xs font-bold uppercase tracking-widest text-slate-600">
          Aayush Kumar Gupta
        </p>
      </section>

      {/* Contact Section */}
      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
        <div className="rounded-[32px] border border-slate-800 bg-slate-900 p-10 text-white shadow-xl shadow-slate-900/20 md:p-16">
          <div className="flex flex-col justify-between gap-12 lg:flex-row">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-300">
                Get In Touch
              </p>

              <h2 className="max-w-2xl text-3xl font-bold tracking-tight md:text-5xl">
                Building something meaningful for students.
              </h2>

              <p className="mt-4 max-w-xl text-lg leading-relaxed text-yellow-300/80">
                Interested in the future of AI-driven career systems ? I’d love to connect.
              </p>
            </div>

            <div className="space-y-6 lg:min-w-[320px]">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Email</p>
                <a
                  href="mailto:aayushgupta120305@gmail.com"
                  className="mt-1 block font-medium text-white transition-colors duration-200 hover:text-emerald-400"
                >
                  aayushgupta120305@gmail.com
                </a>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">LinkedIn</p>
                <a
                  href="https://linkedin.com/in/aayushgupta"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 block font-medium text-white transition-colors duration-200 hover:text-emerald-600"
                >
                  linkedin.com/in/aayushgupta
                </a>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">PORTFOLIO</p>
                <a
                  href="https://aayushkgupta12.netlify.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 block font-medium text-white transition-colors duration-200 hover:text-emerald-600"
                >
                  website/aayushgupta
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}