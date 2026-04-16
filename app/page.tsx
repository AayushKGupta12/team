import { Metadata } from 'next'
import FAQ from './components/FAQ'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Features from './components/FeatureSection'
import HeroCTA from './components/HeroCTA'
import Countdown from './components/Countdown'
import Testimonials from './components/test'
import CongratsPopup from './components/CongratsPopUp'
import Banner from './components/Banner'
import ToolsExplorer from './components/ToolsExplorer'
import YouTubePreview from './components/Youtube'
import Dashboard from './components/Dashboard'
import Updates from './components/Updates'
// import PricingSection from './components/Price'

// FIXED: Complete metadata with OpenGraph and Twitter cards
export const metadata: Metadata = {
  metadataBase: new URL('https://www.vfound.in'),
  title: 'VFound | Career Intelligence',
  description:
    'VFound.in helps IT professionals and freshers find jobs with AI-powered resume analysis, ATS checker, cover letter generator, and curated IT job listings. Get hired faster with our career intelligence platform. We will soon be changing our Domain name. To Tauzand.in Stay tuned for more updates.',
  keywords: [
    'Tauzand.in',
    'Tauzand',
    'tauzand.in',
    'VFound',
    'Vfound.in',
    'ATS checker',
    'resume analysis',
    'AI resume analyzer',
    'cover letter generator',
    'IT jobs India',
    'off-campus jobs',
    'resume ATS score',
    'interview practice',
    'career platform for developers',
    'fresher jobs India',
    'resume builder',
    'job search platform'
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
    url: 'https://www.vfound.in',
    siteName: 'VFound',
    title: 'VFound - AI Resume Analysis & ATS Checker for IT Jobs',
    description:
      'Find IT jobs, analyze your resume with AI, and generate ATS-friendly cover letters. Built for freshers and professionals in India.',
    images: [
      {
        url: 'https://www.vfound.in/og-image.jpg', // You need to add this image
        width: 1200,
        height: 630,
        alt: 'VFound - Career Intelligence Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VFound - AI Resume Analysis & ATS Checker',
    description: 'AI-powered resume analysis, cover letter generator, and IT job search for Indian developers',
    images: ['https://www.vfound.in/og-image.jpg'],
    creator: '@vfound', // Add your Twitter handle
  },
  alternates: {
    canonical: 'https://www.vfound.in',
  },
  verification: {
    google: 'your-google-verification-code', // Add from Google Search Console
  },
}

// FIXED: Proper structured data implementation
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.vfound.in/#website",
      "url": "https://www.vfound.in",
      "name": "VFound",
      "description": "AI-powered career intelligence platform for IT professionals",
      "publisher": {
        "@id": "https://www.vfound.in/#organization"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://www.vfound.in/it-jobs?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "Organization",
      "@id": "https://www.vfound.in/#organization",
      "name": "VFound",
      "url": "https://www.vfound.in",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.vfound.in/logo.png"
      },
      "description": "Career intelligence platform helping IT professionals land better jobs",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Infocity Area",
        "addressLocality": "Bhubaneswar",
        "addressRegion": "Odisha",
        "postalCode": "751024",
        "addressCountry": "IN"
      },
      "sameAs": [
        "https://twitter.com/vfound",
        "https://www.linkedin.com/company/vfound"
      ]
    },
    {
      "@type": "SoftwareApplication",
      "name": "VFound Resume Analyzer",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "740",
        "bestRating": "5"
      },
      "url": "https://www.vfound.in/ai-resume-analysis"
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is resume analysis free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, VFound offers a completely free resume analysis feature designed specifically for IT students, recent graduates, and early career professionals. Our system deeply evaluates your resume against current hiring expectations including technical depth, ATS-compatibility, and market competition."
          }
        },
        {
          "@type": "Question",
          "name": "Does VFound provide IT jobs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, VFound actively helps candidates discover real and relevant IT job opportunities through its dedicated jobs section. The focus is on fresher-friendly and off-campus hiring with live IT job openings from trusted sources."
          }
        },
        {
          "@type": "Question",
          "name": "How is VFound different from other platforms?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "VFound is built specifically for recent IT graduates and early-career professionals in India. Every feature is designed with fresher-level hiring expectations including resume analysis focused on technical depth, live fresher-friendly IT job listings, and AI-powered insights tailored to specific job roles."
          }
        }
      ]
    }
  ]
}

const Page = () => {
  return (
    <>
      {/* FIXED: Properly render structured data in head */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      
      <div>
        <Banner
          isPositive={true}
          message="Welcome to VFound! 🎉"
        />
        <Navbar />
        <Hero />
        <YouTubePreview/>
        <ToolsExplorer/>
        <Features />
        <Dashboard/>
        <Testimonials/>
        <FAQ />
        {/* <PricingSection/> */}
        <CongratsPopup />
        <Updates/>
        <HeroCTA />
        <Countdown />
      </div>
    </>
  )
}

export default Page