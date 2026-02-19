import { Metadata } from 'next'
import ExtensionCTA from '../components/ExtensionCTA';
import ExtensionDashboard from '../components/ExtenionDashboard';
import ExtensionFeature from '../components/ExtensionFeature'
import FAQ4 from '../components/FAQ4';

// ✅ SEO METADATA
export const metadata: Metadata = {
  metadataBase: new URL('https://www.vfound.in'),
  title: 'VFound Chrome Extension - AI Research Assistant & Productivity Tool',
  description:
    'AI-powered Chrome extension for research, coding help, assessment support, translation, and summarization. Work faster without switching tabs. Beta version available now.',
  keywords: [
    'Chrome extension',
    'AI research assistant',
    'productivity tool',
    'coding assistant',
    'translation extension',
    'summarization tool',
    'study helper',
    'research tool',
    'AI extension',
    'browser assistant',
    'VFound extension',
    'assessment help',
    'learning assistant',
    'no tab switching',
    'screen intelligence'
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
    url: 'https://www.vfound.in/extension',
    siteName: 'VFound',
    title: 'VFound Chrome Extension - AI Research & Productivity Assistant',
    description:
      'AI-powered Chrome extension that helps with research, coding, assessments, and more. Work without switching tabs.',
    images: [
      {
        url: 'https://www.vfound.in/extension-og.jpg',
        width: 1200,
        height: 630,
        alt: 'VFound Chrome Extension Features',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VFound Chrome Extension - AI Research Assistant',
    description: 'AI extension for research, coding, translation, and more. No tab switching needed.',
    images: ['https://www.vfound.in/extension-og.jpg'],
    creator: '@vfound',
  },
  alternates: {
    canonical: 'https://www.vfound.in/extension',
  },
}

// ✅ STRUCTURED DATA
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "VFound Chrome Extension",
      "applicationCategory": "BrowserApplication",
      "operatingSystem": "Chrome",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR"
      },
      "description": "AI-powered Chrome extension for research, coding assistance, assessment help, translation, and summarization",
      "featureList": [
        "Research Assistance",
        "Assessment Help",
        "Coding Support",
        "Translation",
        "Summarization",
        "No Tab Switching",
        "AI-Powered Responses",
        "Learning Assistant"
      ],
      "screenshot": "https://www.vfound.in/extension-screenshot.jpg",
      "softwareVersion": "1.0 Beta",
      "releaseNotes": "Beta version supports textual input. Upcoming: File upload, image analysis, voice support, on-screen intelligence"
    },
    {
      "@type": "Product",
      "name": "VFound Chrome Extension",
      "description": "AI research and productivity assistant browser extension",
      "brand": {
        "@type": "Brand",
        "name": "VFound"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.7",
        "ratingCount": "320"
      }
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
      "name": "Chrome Extension"
    }
  ]
}

export default function ExtensionPage() {
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

      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">
        VFound Chrome Extension - AI Research Assistant and Productivity Tool for Students and Professionals
      </h1>

        <ExtensionDashboard/>
        <ExtensionFeature/>
        <ExtensionCTA/>
        <FAQ4/>

    </>
  );
}