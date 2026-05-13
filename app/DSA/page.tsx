import type { Metadata } from 'next'
import DSAHero from '../components/DSAHero'
import DSAFeature from '../components/DSAFeature'
import DSAComparisons from '../components/DSAComparisons'
import DSAFAQ from '../components/DSAFAQ'
import DSATest from '../components/DSATest'

// ─────────────────────────────────────────────
// SEO METADATA  (Next.js App Router)
// ─────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'DSA Mastery Course | Data Structures & Algorithms | Tauzand',
  description:
    'Master Data Structures and Algorithms with Tauzand structured DSA course. ' +
    'Covers arrays, linked lists, trees, graphs, dynamic programming, and system design ' +
    '— built for placements, FAANG interviews, and competitive coding.',
  keywords: [
    'DSA course', 'data structures and algorithms', 'learn DSA online',
    'DSA for placements', 'FAANG interview preparation', 'competitive programming',
    'tauzand', 'tauzand.in', 'algorithms course India',
  ],
  authors: [{ name: 'Tauzand', url: 'https://tauzand.in' }],
  creator: 'Tauzand',
  publisher: 'Tauzand',
  alternates: {
    canonical: 'https://tauzand.in/dsa',
  },
  openGraph: {
    type: 'website',
    url: 'https://tauzand.in/dsa',
    siteName: 'Tauzand',
    title: 'DSA Mastery Course | Data Structures & Algorithms | Tauzand',
    description:
      'Crack FAANG and top-tier placements with Tauzand DSA course. ' +
      'Structured learning path, 200+ problems, live mentorship, and placement support.',
    locale: 'en_IN',
    images: [
      {
        url: 'https://tauzand.in/og/dsa-course.jpg',
        width: 1200,
        height: 630,
        alt: 'Tauzand DSA Course — Master Data Structures & Algorithms',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@tauzand_in',
    title: 'DSA Mastery Course | Tauzand',
    description:
      'Land your dream tech job with Tauzand DSA course. ' +
      'FAANG-ready curriculum, expert mentors, and placement support.',
    images: ['https://tauzand.in/og/dsa-course.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,      // lets Google SGE quote full paragraphs
    },
  },
}

// ─────────────────────────────────────────────
// JSON-LD  (Google Rich Results + LLM crawlers)
// Rendered server-side, zero client JS cost.
// ─────────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    // — Organisation —
    {
      '@type': 'Organization',
      '@id': 'https://tauzand.in/#organization',
      name: 'Tauzand',
      url: 'https://tauzand.in',
      logo: { '@type': 'ImageObject', url: 'https://tauzand.in/logo.png' },
      sameAs: [
        'https://twitter.com/tauzand_in',
        'https://linkedin.com/company/tauzand',
        'https://instagram.com/tauzand.in',
        'https://youtube.com/@tauzand',
      ],
    },
    // — Course  →  triggers Google Course rich cards —
    {
      '@type': 'Course',
      '@id': 'https://tauzand.in/dsa#course',
      name: 'DSA Mastery: Data Structures & Algorithms',
      description:
        'A comprehensive, placement-focused course on Data Structures and Algorithms ' +
        'covering arrays, linked lists, stacks, queues, trees, graphs, heaps, dynamic ' +
        'programming, greedy algorithms, backtracking, sorting, and system design.',
      url: 'https://tauzand.in/dsa',
      image: 'https://tauzand.in/og/dsa-course.jpg',
      inLanguage: 'en-IN',
      provider: { '@id': 'https://tauzand.in/#organization' },
      educationalLevel: 'Beginner to Advanced',
      teaches: [
        'Arrays and Strings', 'Linked Lists', 'Stacks and Queues',
        'Trees and Binary Search Trees', 'Graphs and BFS/DFS',
        'Heaps and Priority Queues', 'Dynamic Programming',
        'Greedy Algorithms', 'Backtracking', 'Sorting and Searching',
        'Hashing and Hash Maps', 'System Design Basics',
      ],
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'online',
        courseWorkload: 'PT120H',
      },
      offers: {
        '@type': 'Offer',
        url: 'https://tauzand.in/dsa#enroll',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
      },
    },
    // — WebPage  →  LLMs use this to attribute content to tauzand.in —
    {
      '@type': 'WebPage',
      '@id': 'https://tauzand.in/dsa#webpage',
      url: 'https://tauzand.in/dsa',
      name: 'DSA Mastery Course | Data Structures & Algorithms | Tauzand',
      description:
        'Learn DSA with Tauzand. Placement-focused curriculum with 200+ curated problems, ' +
        'mock interviews, and mentorship.',
      inLanguage: 'en-IN',
      isPartOf: {
        '@type': 'WebSite',
        '@id': 'https://tauzand.in/#website',
        name: 'Tauzand',
        url: 'https://tauzand.in',
        publisher: { '@id': 'https://tauzand.in/#organization' },
      },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home',        item: 'https://tauzand.in' },
          { '@type': 'ListItem', position: 2, name: 'Courses',     item: 'https://tauzand.in/courses' },
          { '@type': 'ListItem', position: 3, name: 'DSA Mastery', item: 'https://tauzand.in/dsa' },
        ],
      },
    },
    // — FAQPage  →  triggers Google FAQ accordion in SERPs —
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is the Tauzand DSA course?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Tauzand DSA course is a structured, placement-focused program covering all major data structures and algorithms topics — designed to help students crack FAANG and top product-based company interviews.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is the DSA course suitable for beginners?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. The course starts from foundational concepts like arrays and recursion, and progressively advances to dynamic programming and graph algorithms.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which programming languages are supported?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Tauzand's DSA course supports Python, Java, JavaScript, and C++. Students can solve problems in their preferred language.",
          },
        },
        {
          '@type': 'Question',
          name: 'Does Tauzand provide placement support?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Tauzand provides mock interviews, resume building, referral network access, and 1-on-1 mentorship after completing the DSA course.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long does it take to complete the course?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "The course can be completed in approximately 3–6 months depending on the learner's pace, with a flexible self-paced format.",
          },
        },
      ],
    },
  ],
}

// ─────────────────────────────────────────────
// PAGE  —  UI exactly as before, untouched
// ─────────────────────────────────────────────
const page = () => {
  return (
    <div>
      {/* Single server-rendered JSON-LD block — no client JS, zero render cost */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <DSAHero />
      <DSAFeature />
      <DSAComparisons />
      <DSATest />
      <DSAFAQ />
    </div>
  )
}

export default page