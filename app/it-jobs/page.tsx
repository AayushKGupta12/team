// import JobHero from '../components/JobHero'
// import Jobs from '../components/Jobs'
import { Metadata } from 'next'
import StaticJobs from '../components/StaticJobs'

// ✅ SEO METADATA
export const metadata: Metadata = {
  metadataBase: new URL('https://www.Tauzand.in'),
  title: 'IT Jobs in India | Tauzand',
  description:
    'Discover verified IT jobs for freshers and professionals in India. Software engineer, data science, AI, cloud computing, cybersecurity jobs. Updated daily. Direct company applications.',
  keywords: [
    'IT jobs India',
    'off-campus jobs',
    'fresher jobs India',
    'software engineer jobs',
    'data science jobs',
    'AI jobs India',
    'cloud computing jobs',
    'cybersecurity jobs',
    'IT jobs for freshers',
    'tech jobs India',
    'developer jobs',
    'programming jobs',
    'entry-level IT jobs',
    'graduate jobs India',
    'software developer jobs',
    'IT jobs 2026',
    'tech careers India',
    'coding jobs',
    'computer science jobs',
    'engineering jobs'
  ],
  authors: [{ name: 'Tauzand' }],
  creator: 'Tauzand',
  publisher: 'Tauzand',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.Tauzand.in/it-jobs',
    siteName: 'Tauzand',
    title: 'IT Jobs in India - Fresher & Off-Campus Jobs 2026',
    description:
      'Find verified IT jobs updated daily. Software engineering, data science, AI, cloud roles. Direct company applications for freshers and professionals.',
    images: [
      {
        url: 'https://www.Tauzand.in/it-jobs-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Tauzand IT Jobs India',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IT Jobs in India - Fresher Jobs 2026',
    description: 'Verified IT jobs for freshers. Software, data science, AI roles. Updated daily.',
    images: ['https://www.Tauzand.in/it-jobs-og.jpg'],
    creator: '@Tauzand',
  },
  alternates: {
    canonical: 'https://www.Tauzand.in/it-jobs',
  },
}

// ✅ STRUCTURED DATA
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.Tauzand.in/it-jobs#webpage",
      "url": "https://www.Tauzand.in/it-jobs",
      "name": "IT Jobs in India",
      "description": "Curated list of verified IT job opportunities for freshers and professionals",
      "inLanguage": "en-IN"
    },
    {
      "@type": "CollectionPage",
      "name": "IT Jobs in India",
      "description": "Curated list of verified IT job opportunities for freshers and professionals in India",
      "url": "https://www.Tauzand.in/it-jobs",
      "mainEntity": {
        "@type": "ItemList",
        "name": "IT Job Categories",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Software Engineering Jobs",
            "description": "Full-stack, frontend, backend developer positions"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Data Science Jobs",
            "description": "Data analyst, scientist, and ML engineer roles"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "AI/ML Jobs",
            "description": "Artificial intelligence and machine learning positions"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Cloud Computing Jobs",
            "description": "AWS, Azure, GCP cloud engineer roles"
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": "Cybersecurity Jobs",
            "description": "Security analyst and engineer positions"
          }
        ]
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Are these jobs verified?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, all IT jobs listed on Tauzand are verified and link directly to company career pages. We regularly update listings and remove expired positions."
          }
        },
        {
          "@type": "Question",
          "name": "Can freshers apply for these jobs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Tauzand specializes in fresher-friendly and off-campus IT jobs. Many positions are specifically targeted for recent graduates and entry-level candidates."
          }
        }
      ]
    }
  ]
}

const breadcrumbData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.Tauzand.in"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "IT Jobs"
    }
  ]
}

// ✅ SERVER COMPONENT
export default async function Page() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData),
        }}
      />

      <div>
        {/* Hidden H1 for SEO */}
        <h1 className="sr-only">
          IT Jobs in India - Off-Campus and Fresher Opportunities 2026
        </h1>
        {/* <Jobs/> */}
        <StaticJobs/>
        
    </div>
    </>
  )
};
