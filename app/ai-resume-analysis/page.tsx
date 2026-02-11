// FILE: app/ai-resume-analysis/page.tsx
// REPLACE your current resume analysis page with this

import { Metadata } from 'next'
import { auth } from "@clerk/nextjs/server";
import ResumeHero from "../components/ResumeHero";
import ATSResumeCheckerApp from "../components/Analysis";
import CareerHealthDashboard from "../components/CareerHealthDashboard";
import ResumeFAQ from "../components/ResumeFAQ";
import FAQ from "../components/FAQ2";
import ResumeCTA from "../components/ResumeCTA";

// ✅ SEO METADATA - Fully optimized for ranking
export const metadata: Metadata = {
  metadataBase: new URL('https://www.vfound.in'),
  title: 'Resume Insights | VFound',
  description:
    'Get instant AI-powered resume analysis with ATS compatibility score. Check your resume against 32+ hiring parameters used by recruiters. Free resume checker for IT professionals and freshers in India.',
  keywords: [
    'AI resume analysis',
    'ATS checker',
    'resume checker',
    'ATS score',
    'resume ATS compatibility',
    'free resume analysis',
    'resume scanner',
    'CV checker',
    'resume score',
    'ATS resume checker India',
    'resume analyzer',
    'resume evaluation',
    'IT resume checker',
    'technical resume analysis',
    'resume grader',
    'ATS optimization',
    'resume feedback',
    'resume review',
    'job resume checker',
    'resume analysis tool'
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
    url: 'https://www.vfound.in/ai-resume-analysis',
    siteName: 'VFound',
    title: 'Free AI Resume Analysis & ATS Checker - Get Your Resume Score',
    description:
      'Check your resume ATS score instantly. AI-powered analysis covering 32+ parameters including technical depth, formatting, and role relevance. Free for IT professionals.',
    images: [
      {
        url: 'https://www.vfound.in/resume-analysis-og.jpg',
        width: 1200,
        height: 630,
        alt: 'VFound AI Resume Analysis - ATS Compatibility Checker',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI Resume Analysis & ATS Checker - VFound',
    description: 'Check your resume ATS score with AI. Get detailed feedback on 32+ parameters instantly.',
    images: ['https://www.vfound.in/resume-analysis-og.jpg'],
    creator: '@vfound',
  },
  alternates: {
    canonical: 'https://www.vfound.in/ai-resume-analysis',
  },
}

// ✅ STRUCTURED DATA - Helps Google understand the page
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.vfound.in/ai-resume-analysis#webpage",
      "url": "https://www.vfound.in/ai-resume-analysis",
      "name": "AI Resume Analysis & ATS Checker",
      "description": "Free AI-powered resume analysis tool that evaluates resumes against 32+ hiring parameters",
      "inLanguage": "en-IN",
      "isPartOf": {
        "@id": "https://www.vfound.in/#website"
      }
    },
    {
      "@type": "SoftwareApplication",
      "name": "VFound AI Resume Analyzer",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR"
      },
      "description": "AI-powered resume analysis tool that evaluates resumes against 32+ hiring parameters including ATS compatibility, technical depth, and role relevance",
      "featureList": [
        "ATS Compatibility Score",
        "Technical Depth Analysis",
        "32+ Parameter Evaluation",
        "Role Relevance Matching",
        "Industry Benchmark Comparison",
        "Instant Feedback",
        "Format Optimization Suggestions",
        "Keyword Analysis",
        "Career Growth Insights",
        "Career Health Dashboard",
        "Dashboard",        
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "740",
        "bestRating": "5",
        "worstRating": "1"
      },
      "url": "https://www.vfound.in/ai-resume-analysis"
    },
    {
      "@type": "HowTo",
      "name": "How to Check Your Resume ATS Score",
      "description": "Step-by-step guide to analyze your resume with VFound AI",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Upload Resume",
          "text": "Upload your resume in PDF or DOCX format",
          "position": 1
        },
        {
          "@type": "HowToStep",
          "name": "AI Analysis",
          "text": "Our AI analyzes your resume against 32+ parameters",
          "position": 2
        },
        {
          "@type": "HowToStep",
          "name": "Get Score",
          "text": "Receive detailed ATS score and improvement suggestions",
          "position": 3
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is an ATS checker?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "An ATS (Applicant Tracking System) checker is a tool that analyzes your resume to see how well it will perform when scanned by automated recruitment systems. VFound's ATS checker evaluates your resume against 32+ parameters that real ATS systems use."
          }
        },
        {
          "@type": "Question",
          "name": "Is the resume analysis really free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, VFound offers completely free resume analysis. Our AI evaluates your resume against current hiring expectations including technical depth, ATS compatibility, and provides actionable improvement suggestions at no cost."
          }
        },
        {
          "@type": "Question",
          "name": "How accurate is the ATS score?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "VFound's ATS checker uses the same parameters that real Applicant Tracking Systems evaluate, including keyword matching, formatting, sections, and technical skills. Our AI is trained on actual hiring data to provide accurate, relevant scores."
          }
        }
      ]
    }
  ]
}

// ✅ BREADCRUMB STRUCTURED DATA
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
      "name": "AI Resume Analysis"
    }
  ]
}

// ✅ SERVER COMPONENT - Great for SEO!
export default async function Page() {
  const { userId } = await auth();

  console.log("🔥 Resume Analysis page rendered with userId:", userId);

  return (
    <>
      {/* ✅ Structured Data Scripts */}
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

      {/* ✅ Main Content with Semantic HTML */}
      <div>
        {/* Hidden H1 for SEO (if ResumeHero doesn't have one) */}
        <h1 className="sr-only">
          AI Resume Analysis & ATS Checker - Free Resume Score for IT Jobs
        </h1>
        
        <ResumeHero />
        <ATSResumeCheckerApp />

        {userId ? (
          <div className="mt-12 px-4 max-w-7xl mx-auto">
            <CareerHealthDashboard clerkUserId={userId} />
          </div>
        ) : (
          <div className="text-center py-10 text-gray-600 bg-red-200">
            Please sign in to view your career health dashboard
          </div>
        )}

        <ResumeFAQ />
        <FAQ />
        <ResumeCTA />
      </div>
    </>
  );
}