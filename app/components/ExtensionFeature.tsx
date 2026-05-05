"use client";

/**
 * SEO & AI VISIBILITY IMPROVEMENTS:
 * 1. Semantic <section> with aria-labelledby and itemScope/itemType for Schema.org
 * 2. Each use-case card uses <article> with itemProp markup (ItemList schema)
 * 3. Image alt text is descriptive and keyword-rich (not just the title)
 * 4. h2/h3 hierarchy is clean and crawlable
 * 5. Images have descriptive filenames via Unsplash slugs (Google indexes image URLs)
 * 6. Added a hidden <meta> description block for LLM crawlers
 * 7. Images updated to topically relevant Unsplash photos
 * 8. Added loading="lazy" on non-priority images for Core Web Vitals
 */

import Image from "next/image";
import React from "react";

const UseCasesSection: React.FC = () => {
  const items = [
    {
      // Relevant: person thinking/answering at a laptop — "instant query" feel
      image:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
      alt: "Person getting instant answers on a laptop using an AI browser assistant",
      title: "Instant solutions to your queries",
      description:
        "In General Query mode, receive concise, direct answers—one-line facts, quick explanations, or ready-to-use code snippets delivered instantly in your browser without interrupting your workflow.",
      keywords: "instant answers, quick AI queries, browser assistant",
    },
    {
      // Relevant: researcher reading papers / deep analysis setup
      image:
        "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&q=80&w=800",
      alt: "Researcher analyzing complex information using an AI-powered research assistant",
      title: "Intelligent research assistant",
      description:
        "Activate Research Mode for advanced, highly intelligent explanations. Dive deep into complex topics, get comprehensive breakdowns, structured insights, or even complete solutions built step-by-step for your toughest problems.",
      keywords: "AI research assistant, deep research mode, complex topic analysis",
    },
    {
      // Relevant: clean code on a monitor — coding companion
      image:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800",
      alt: "Developer using an AI coding assistant for debugging and writing code in the browser",
      title: "Smart coding companion",
      description:
        "Seamlessly switch modes while coding: quick fixes, boilerplate, or debugging help in General Query mode; full architecture design, refactoring strategies, or multi-file solutions in Research Mode.",
      keywords: "AI coding assistant, browser coding helper, debugging AI tool",
    },
    {
      // Relevant: organized workspace / productivity setup
      image:
        "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=800",
      alt: "Professional boosting productivity with AI-powered workflow automation and task planning",
      title: "Productivity & workflow booster",
      description:
        "Streamline daily tasks in General Query mode with fast summaries, email drafts, or task breakdowns. In Research Mode, build complete plans, research-backed strategies, or automate repetitive workflows with intelligent depth.",
      keywords: "AI productivity tool, workflow automation, task planning AI",
    },
    {
      // Relevant: content creator writing at a desk
      image:
        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800",
      alt: "Content creator writing articles and campaigns with an AI creative writing partner",
      title: "Content & creative partner",
      description:
        "Generate polished copy, ideas, or outlines instantly in General Query mode. Switch to Research Mode for in-depth content strategies, audience analysis, or fully structured articles and campaigns crafted with advanced reasoning.",
      keywords: "AI content creation, creative writing assistant, content strategy AI",
    },
    {
      // Relevant: keyboard close-up — shortcut / quick toggle feel
      image:
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=800",
      alt: "Keyboard shortcut keys for toggling between AI query modes quickly in the browser",
      title: "Quick Toggle Between Modes",
      description:
        "Tap Ctrl + Q for rapid ideas, copy, or outlines. Use Ctrl + Win to engage Research Mode for audience analysis, in-depth content strategies, or fully structured articles and campaigns.",
      keywords: "AI keyboard shortcut, quick toggle AI, browser extension shortcut",
    },
  ];

  return (
    /*
     * itemScope + itemType adds Schema.org ItemList markup directly to the DOM.
     * Google reads this to understand the section as a structured list of features —
     * improving eligibility for rich results and AI knowledge panels.
     */
    <section
      className="bg-white py-32 md:py-44 px-5 sm:px-8 lg:px-12"
      aria-labelledby="use-cases-heading"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      {/* Hidden LLM/crawler context — describes the section's purpose for AI indexing */}
      <meta
        itemProp="name"
        content="Tauzand Chrome Extension Use Cases – AI Query, Research, Coding, Productivity, and Content Creation"
      />
      <meta
        itemProp="description"
        content="Tauzand Chrome Extension supports six core use cases: instant query answering, intelligent research assistance, smart coding help, productivity and workflow automation, AI-powered content creation, and quick keyboard shortcut toggling between modes."
      />

      <div className="max-w-7xl mx-auto">

        {/* Section Headline */}
        <h2
          id="use-cases-heading"
          className="text-center text-4xl sm:text-5xl md:text-6xl font-semibold text-gray-900 leading-tight tracking-tight mb-20 md:mb-32"
          itemProp="headline"
        >
          Your 24/7 Solution Engineer
        </h2>

        {/* Use Case Cards Grid */}
        <ol
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10 md:gap-12 lg:gap-16"
          aria-label="Tauzand Chrome Extension use cases"
        >
          {items.map((item, index) => (
            /*
             * <article> + itemProp="itemListElement" marks each card as a named
             * list item in Schema.org, making individual features indexable entities.
             * <ol> + position gives Google the correct ordered relationship.
             */
            <li
              key={index}
              itemScope
              itemType="https://schema.org/ListItem"
              itemProp="itemListElement"
            >
              <article
                className="space-y-6 h-full"
                aria-labelledby={`use-case-title-${index}`}
              >
                <meta itemProp="position" content={String(index + 1)} />

                {/* Image */}
                <div className="overflow-hidden rounded-2xl bg-gray-50">
                  <Image
                    src={item.image}
                    // Descriptive alt text — improves Google Image Search ranking
                    // and accessibility score (Core Web Vitals signal)
                    alt={item.alt}
                    width={600}
                    height={360}
                    className="w-full h-auto object-cover aspect-[5/3] transition-transform duration-300 hover:scale-105"
                    // Priority load for first two cards (above-the-fold LCP optimization)
                    priority={index < 2}
                    loading={index < 2 ? undefined : "lazy"}
                    itemProp="image"
                  />
                </div>

                {/* Card Title — h3 under the section h2 maintains correct heading hierarchy */}
                <h3
                  id={`use-case-title-${index}`}
                  className="text-2xl font-semibold text-gray-900 leading-tight"
                  itemProp="name"
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p
                  className="text-gray-600 text-[17px] leading-relaxed"
                  itemProp="description"
                >
                  {item.description}
                </p>

                {/* Hidden keywords for LLM crawlers — not shown visually */}
                <meta itemProp="keywords" content={item.keywords} />
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default UseCasesSection;