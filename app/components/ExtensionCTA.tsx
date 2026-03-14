"use client";

/**
 * SEO & AI VISIBILITY IMPROVEMENTS:
 * 1. Nested <section> inside <section> replaced with proper structure (invalid HTML)
 * 2. ImageCard hover text is now always in DOM (was opacity-0 only — hidden from crawlers)
 * 3. Descriptive, keyword-rich alt text on all images (was just the title string)
 * 4. Feature list uses semantic <ul>/<li> instead of bare divs
 * 5. CTA buttons have descriptive aria-labels and rel="noopener noreferrer"
 * 6. itemScope/itemProp microdata added to features for entity recognition
 * 7. Download button href should be updated to real extension URL
 * 8. Fixed empty <div></div> inside Feature component
 *
 * MOBILE RESPONSIVENESS IMPROVEMENTS:
 * 9.  Image grid stacks to single column on mobile (was always 2-col)
 * 10. Image cards taller on mobile for better thumb tap area
 * 11. CTA section padding scales down on mobile
 * 12. Chrome icon hidden on mobile (takes up space, adds no value)
 * 13. Feature grid is single column on mobile, 2-col on sm+
 * 14. Button group wraps cleanly on small screens with full-width buttons on mobile
 * 15. Typography scales fluidly across breakpoints
 */

import Image from "next/image";
import {
  Settings2,
  ThumbsUp,
  LayoutGrid,
  Zap,
  User,
  BarChart3,
  Chrome,
} from "lucide-react";

// ── Updated image data with keyword-rich alt text ─────────────────────────────
const imageCards = [
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    title: "Real-Time Analytics",
    desc: "Monitor usage, performance & activity instantly",
    alt: "Dashboard showing real-time analytics and performance metrics for the VFound Chrome extension",
  },
  {
    src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800",
    title: "Seamless Integration",
    desc: "Works smoothly with modern web platforms",
    alt: "Team collaborating seamlessly using AI-powered browser extension integration across web platforms",
  },
  {
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
    title: "AI-Powered Assistance",
    desc: "Automate tasks and boost efficiency",
    alt: "Professionals using AI-powered assistance to automate tasks and boost browser productivity",
  },
  {
    src: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=800",
    title: "Secure & Reliable",
    desc: "Built with privacy and performance in mind",
    alt: "Secure and reliable browser extension built with privacy-first architecture and encrypted data handling",
  },
];

// ── Features list ─────────────────────────────────────────────────────────────
const features = [
  { icon: <Settings2 size={22} aria-hidden="true" />, text: "Simplify Account Changes" },
  { icon: <ThumbsUp size={22} aria-hidden="true" />, text: "Easy to Customize" },
  { icon: <LayoutGrid size={22} aria-hidden="true" />, text: "Various Categories" },
  { icon: <Zap size={22} aria-hidden="true" />, text: "Lightning Fast" },
  { icon: <User size={22} aria-hidden="true" />, text: "Accurate Insights" },
  { icon: <BarChart3 size={22} aria-hidden="true" />, text: "Maximize Results" },
];

// ── Main Component ────────────────────────────────────────────────────────────
export default function PortfolioCTA() {
  return (
    // Outer wrapper — use <div> since the page already has a <section> context
    <div className="bg-gray-50">

      {/* ── Features Section ──────────────────────────────── */}
      <section
        className="py-12 sm:py-16 px-5 sm:px-8 lg:px-12"
        aria-labelledby="features-heading"
        itemScope
        itemType="https://schema.org/Product"
      >
        {/* Hidden product name for schema entity linking */}
        <meta itemProp="name" content="VFound Chrome Extension" />
        <meta
          itemProp="description"
          content="VFound is a smart AI-powered Chrome extension for real-time analytics, seamless browser integration, AI assistance, and secure productivity tracking."
        />

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* LEFT — Image Grid ──────────────────────────────── */}
          {/*
           * Mobile: 2-col grid (images are small but visible)
           * On very small screens: 1-col so images aren't crushed
           * Tailwind: grid-cols-1 on xs, grid-cols-2 on sm+
           */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
            role="list"
            aria-label="VFound extension feature highlights"
          >
            {imageCards.map((card, i) => (
              <ImageCard
                key={i}
                src={card.src}
                alt={card.alt}
                title={card.title}
                desc={card.desc}
                priority={i < 2}
              />
            ))}
          </div>

          {/* RIGHT — Content ────────────────────────────────── */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              {/*
               * h2 scales from 2xl on mobile → 4xl on desktop
               * Avoids huge text that wraps badly on small screens
               */}
              <h2
                id="features-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 leading-tight mb-3 sm:mb-4"
                itemProp="headline"
              >
                Smart Browser Extension Built for Productivity &amp; Insights
              </h2>
              <p
                className="text-gray-600 text-base sm:text-lg leading-relaxed"
                itemProp="description"
              >
                VFound intelligently integrates with your browser to deliver
                real-time insights, automated AI workflows, and performance
                tracking — helping students, developers, and professionals work
                smarter, faster, and more efficiently.
              </p>
            </div>

            {/*
             * Semantic <ul>/<li> instead of bare divs.
             * Google reads lists as feature enumerations — eligible for feature snippets.
             * Single column on mobile, 2-col on sm+
             */}
            <ul
              className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 sm:gap-y-6 gap-x-6 sm:gap-x-8"
              aria-label="VFound extension features"
              itemProp="featureList"
            >
              {features.map((feature, i) => (
                <li key={i}>
                  <Feature icon={feature.icon} text={feature.text} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────── */}
      {/*
       * Moved from nested <section> inside <section> (invalid HTML)
       * to a sibling <section> — correct document structure
       */}
      <section
        className="px-5 sm:px-8 lg:px-12 pb-12 sm:pb-16"
        aria-labelledby="cta-heading"
      >
        <div className="relative overflow-hidden bg-emerald-600 rounded-2xl sm:rounded-3xl px-6 sm:px-10 py-12 sm:py-16 shadow-xl">

          {/* Glow decorations — hidden from assistive tech */}
          <div
            className="absolute -top-24 -left-24 w-60 sm:w-80 h-60 sm:h-80 bg-teal-400 opacity-30 blur-3xl rounded-full pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-24 -right-24 w-60 sm:w-80 h-60 sm:h-80 bg-emerald-300 opacity-30 blur-3xl rounded-full pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 grid md:grid-cols-2 items-center gap-8 sm:gap-12">

            {/* CTA Left — Text & Buttons ───────────────────── */}
            <div>
              <h2
                id="cta-heading"
                className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6 leading-tight"
              >
                Supercharge Your Productivity
              </h2>
              <p className="text-emerald-50 text-base sm:text-lg mb-8 sm:mb-10 max-w-xl leading-relaxed">
                Unlock real-time placement insights, automate tracking, and
                integrate seamlessly with VFound.in built for developers and
                ambitious students who want an AI edge in their browser.
              </p>

              {/*
               * Buttons: full-width on mobile (w-full sm:w-auto), side-by-side on sm+
               * flex-col on mobile → flex-row on sm+
               */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a
  href="https://github.com/AayushKGupta12/vfound_extension/archive/refs/heads/main.zip"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Download the VFound AI Chrome Extension for free"
  className="
    bg-white text-emerald-600 font-semibold
    px-6 sm:px-8 py-3 sm:py-4
    rounded-xl shadow-lg text-center
    hover:scale-105 hover:shadow-2xl
    transition-transform duration-200
    w-full sm:w-auto
  "
>
  Download Extension
</a>
                <a
                  href="/extension/api-doc"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Read VFound Chrome Extension API documentation"
                  className="
                    bg-transparent border border-white text-white font-semibold
                    px-6 sm:px-8 py-3 sm:py-4
                    rounded-xl text-center
                    hover:bg-white hover:text-emerald-600
                    transition-colors duration-200
                    w-full sm:w-auto
                  "
                >
                  API Docs
                </a>
              </div>
            </div>

            {/*
             * Chrome icon — hidden on mobile (md:flex) to save vertical space.
             * Decorative only, aria-hidden throughout.
             */}
            <div
              className="hidden md:flex justify-end items-center"
              aria-hidden="true"
            >
              <div className="relative">
                <Chrome size={280} className="text-gray-900 opacity-10" />
                <div className="absolute -z-10 right-10 w-48 h-48 bg-indigo-400 opacity-20 blur-3xl rounded-full" />
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

// ── ImageCard ─────────────────────────────────────────────────────────────────

interface ImageCardProps {
  src: string;
  alt: string;
  title: string;
  desc: string;
  priority?: boolean;
}

function ImageCard({ src, alt, title, desc, priority = false }: ImageCardProps) {
  return (
    /*
     * role="listitem" pairs with role="list" on the parent grid.
     * Taller on mobile (h-[200px]) for better readability and tap targets.
     * Text is ALWAYS visible to crawlers via sr-only span — hover effect is visual only.
     */
    <div
      className="relative h-[200px] sm:h-[180px] w-full overflow-hidden rounded-2xl shadow-sm group cursor-pointer"
      role="listitem"
    >
      {/* Image */}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:blur-sm"
        priority={priority}
        loading={priority ? undefined : "lazy"}
      />

      {/* Dark overlay on hover */}
      <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/*
       * Text overlay — visible on hover visually.
       * sr-only version below ensures title/desc are ALWAYS indexed by crawlers.
       */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        aria-hidden="true"
      >
        <p className="text-white font-semibold text-base sm:text-lg leading-tight">{title}</p>
        <p className="text-white/80 text-sm mt-0.5">{desc}</p>
      </div>

      {/* Always-visible to crawlers — invisible to sighted users */}
      <div className="sr-only">
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
    </div>
  );
}

// ── Feature Item ──────────────────────────────────────────────────────────────

interface FeatureProps {
  icon: React.ReactNode;
  text: string;
}

function Feature({ icon, text }: FeatureProps) {
  return (
    <div className="flex items-center gap-3 sm:gap-4 group">
      <div className="flex-shrink-0 bg-white text-indigo-600 p-2.5 sm:p-3 rounded-xl shadow-sm group-hover:shadow-md transition-shadow duration-200">
        {icon}
      </div>
      <span className="text-gray-700 font-medium text-sm sm:text-base">
        {text}
      </span>
    </div>
  );
}