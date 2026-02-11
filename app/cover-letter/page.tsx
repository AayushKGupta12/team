import CoverHero from '../components/CoverHero'
import Cover from '../components/Cover'
import CoverFeatures from '../components/CoverFeatures'
import FAQ3 from '../components/FAQ3'
import { Metadata } from 'next'

// ✅ SEO METADATA - Fully optimized for ranking

export const metadata: Metadata = {
  metadataBase: new URL('https://www.vfound.in'),
  title: 'AI Cover Letter Generator - Free Professional Cover Letters | VFound',
  description:
    'Generate professional, ATS-friendly cover letters in seconds with AI. Job-specific, recruiter-optimized, and instantly downloadable. Free cover letter generator for IT jobs in India.',
  keywords: [
    'cover letter generator',
    'AI cover letter',
    'free cover letter generator',
    'cover letter maker',
    'cover letter builder',
    'job application letter',
    'ATS cover letter',
    'professional cover letter',
    'IT cover letter generator',
    'cover letter for freshers',
    'resume cover letter',
    'cover letter template',
    'automated cover letter',
    'cover letter AI',
    'job cover letter',
    'application letter generator',
    'cover letter writer',
    'instant cover letter'
  ],
  authors: [{ name: 'VFound' }],
  creator: 'VFound',
  publisher: 'VFound',
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
    url: 'https://www.vfound.in/cover-letter',
    siteName: 'VFound',
    title: 'Free AI Cover Letter Generator - Create Professional Cover Letters',
    description:
      'Create professional cover letters in seconds. AI-powered, job-specific, and ATS-optimized for IT roles. Free to use.',
    images: [
      {
        url: 'https://www.vfound.in/cover-letter-og.jpg',
        width: 1200,
        height: 630,
        alt: 'VFound AI Cover Letter Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI Cover Letter Generator - VFound',
    description: 'Generate professional cover letters in seconds with AI. Job-specific and ATS-optimized.',
    images: ['https://www.vfound.in/cover-letter-og.jpg'],
    creator: '@vfound',
  },
  alternates: {
    canonical: 'https://www.vfound.in/cover-letter',
  },
}

// ✅ STRUCTURED DATA
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.vfound.in/cover-letter#webpage",
      "url": "https://www.vfound.in/cover-letter",
      "name": "AI Cover Letter Generator",
      "description": "Free AI-powered cover letter generator for IT professionals",
      "inLanguage": "en-IN"
    },
    {
      "@type": "SoftwareApplication",
      "name": "VFound Cover Letter Generator",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR"
      },
      "description": "AI-powered cover letter generator that creates professional, role-specific cover letters optimized for recruiters and ATS systems",
      "featureList": [
        "Job-Specific Content",
        "Recruiter Tone Optimization",
        "Instant PDF Export",
        "ATS-Friendly Format",
        "Professional Templates",
        "Free Unlimited Use",
        "Role-Based Customization"
      ],
      "url": "https://www.vfound.in/cover-letter"
    },
    {
      "@type": "HowTo",
      "name": "How to Generate a Cover Letter with AI",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Upload Resume",
          "text": "Upload your resume or paste job description",
          "position": 1
        },
        {
          "@type": "HowToStep",
          "name": "AI Generation",
          "text": "AI creates a personalized cover letter for the role",
          "position": 2
        },
        {
          "@type": "HowToStep",
          "name": "Download",
          "text": "Edit if needed and download instantly",
          "position": 3
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
      "item": "https://www.vfound.in"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Cover Letter Generator"
    }
  ]
}

// ✅ SERVER COMPONENT
export default async function CoverLetterPage() {
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
          AI Cover Letter Generator - Free Professional Cover Letters for IT Jobs
        </h1>

        <CoverHero />
        <Cover/>
        <CoverFeatures/>
        <FAQ3/>
      </div>
    </>
  );
}