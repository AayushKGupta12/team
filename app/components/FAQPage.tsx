'use client'

// FILE: app/components/FAQPage.tsx

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

// ── Data ───────────────────────────────────────────────────
const categories = [
  { id: 'all',         label: 'All Questions'       },
  { id: 'platform',   label: 'VFound Platform'      },
  { id: 'iats',       label: 'iATS Score'           },
  { id: 'icl',        label: 'iCL Cover Letter'     },
  { id: 'extension',  label: 'Chrome Extension'     },
  { id: 'internship', label: 'Internship'           },
  { id: 'pricing',    label: 'Pricing & Credits'    },
  { id: 'privacy',    label: 'Privacy & Safety'     },
  { id: 'freshers',   label: 'Students & Freshers'  },
]

const faqs = [
  // ── Platform ──
  {
    category: 'platform',
    q: 'What is VFound?',
    a: 'VFound is India\'s AI-powered career intelligence platform built for students, freshers, and IT professionals. It helps users improve employability and compete in the Indian IT job market through intelligent tools — iATS Resume Analysis, iCL Cover Letter, Internship Certification, IT Jobs, and a Chrome Extension. VFound continuously ships new features as the IT industry evolves.',
  },
  {
    category: 'platform',
    q: 'Who is VFound built for?',
    a: 'VFound is built for college students, engineering freshers, internship seekers, early-career IT professionals, and working professionals across India who want to improve employability, get shortlisted faster, and compete confidently in the Indian IT job market.',
  },
  {
    category: 'platform',
    q: 'How does VFound improve employability?',
    a: 'VFound gives you data — not just advice. iATS scores your resume against the entire IT industry and shows your exact percentile. iCL writes cover letters that sound professionally crafted. Internship Certification validates real experience. Together they turn your career profile into something measurable, improvable, and competitive.',
  },
  {
    category: 'platform',
    q: 'Does VFound keep adding new features?',
    a: 'Yes. VFound continuously works on new tools and improvements. The iATS AI model is updated every month to match the fast-changing IT industry. New features, scoring metrics, and platform upgrades are released regularly. Follow vfound.in/blog for the latest.',
  },

  // ── iATS ──
  {
    category: 'iats',
    q: 'What is iATS?',
    a: 'iATS stands for Intelligent and Predictive Applicant Tracking System — VFound\'s proprietary AI resume engine. It parses your resume word by word, aligns every word with real-time IT market data, detects technical gaps, and predicts with 99.99% accuracy whether an ATS will shortlist or reject your resume. No job description or company name needed.',
  },
  {
    category: 'iats',
    q: 'What scores does iATS generate?',
    a: 'iATS gives you 8 scores: iATS Score (overall ATS prediction), Selection Score (shortlisting probability), Percentile Rank (vs other IT candidates), Career Health Score (long-term profile strength), Resume Quality Score (formatting & ATS-friendliness), Experience Score (depth & relevance), Technical Compatibility Score (tech stack vs market), and Market Positioning (where your profile stands in the IT landscape).',
  },
  {
    category: 'iats',
    q: 'Do I need a job description or company name for iATS?',
    a: 'No — and this is what makes iATS unique. It evaluates your resume against the entire IT industry\'s current hiring standards, not just one job or company. Upload your resume and get a complete score instantly.',
  },
  {
    category: 'iats',
    q: 'How accurate is the iATS score?',
    a: 'iATS achieves 99.99% accuracy in predicting ATS rejection or shortlisting. It is trained on 60,000+ real Indian IT resumes, covers 32+ hiring parameters, and is retrained every month.',
  },
  {
    category: 'iats',
    q: 'How often is the iATS model updated?',
    a: 'Every month. The IT industry changes daily — new frameworks, shifting hiring expectations, evolving ATS logic. VFound retrains iATS monthly so your score always reflects the current market.',
  },
  {
    category: 'iats',
    q: 'What is the Percentile Rank in iATS?',
    a: 'Your Percentile Rank shows where your resume stands compared to thousands of real IT job applicants. A score of 75 means your resume outperforms 75% of candidates in a similar profile pool — giving you a clear, data-backed view of your competition.',
  },

  // ── iCL ──
  {
    category: 'icl',
    q: 'What is iCL?',
    a: 'iCL stands for Intelligent Cover Letter. It is VFound\'s 2-step AI cover letter generator that reads your actual resume and writes a professional, ATS-optimized cover letter in under 10 seconds — in the voice of a 20+ year experienced Indian IT HR professional. Free, editable, and downloadable as PDF.',
  },
  {
    category: 'icl',
    q: 'How does iCL work?',
    a: 'Two steps: Step 1 — Upload your resume and enter the job title and company name. Step 2 — iCL generates your cover letter in under 10 seconds. Edit if needed and download as a PDF. No templates, no forms, no extra inputs.',
  },
  {
    category: 'icl',
    q: 'What makes iCL different from other AI cover letter tools?',
    a: 'iCL reads your actual resume — not a generic profile. It writes in the tone of a seasoned Indian IT HR professional with 20+ years of experience. Fine-tuned on real Indian IT hiring patterns. The result sounds genuinely human, is ATS-optimized, and is tailored to the exact role and company.',
  },
  {
    category: 'icl',
    q: 'Can I edit the iCL cover letter after generation?',
    a: 'Yes. Every iCL cover letter is fully editable after generation. Make any changes before downloading your final PDF.',
  },

  // ── Extension ──
  {
    category: 'extension',
    q: 'What does the VFound Chrome Extension do?',
    a: 'The VFound Chrome Extension brings career intelligence tools into your browser — directly on job portals you already use. It helps you apply smarter by surfacing resume insights and career scores without switching platforms.',
  },
  {
    category: 'extension',
    q: 'Is the Chrome Extension free?',
    a: 'Yes. The VFound Chrome Extension is free to download and use. Get it at vfound.in/extension.',
  },

  // ── Internship ──
  {
    category: 'internship',
    q: 'What is VFound\'s Internship Certification?',
    a: 'VFound\'s Internship Certification validates and certifies real internship experience for students and freshers. It provides a verified credential you can add to your resume and LinkedIn — making your practical experience credible and trustworthy to recruiters.',
  },
  {
    category: 'internship',
    q: 'Why does Internship Certification matter for freshers?',
    a: 'Most freshers struggle because recruiters can\'t verify the quality of their experience. VFound\'s certification gives your internship and project work a verified stamp of authenticity — helping you stand out in a pool of unverified candidates.',
  },

  // ── Pricing ──
  {
    category: 'pricing',
    q: 'How many free credits does VFound give?',
    a: 'Every user gets up to 75 free lifetime AI resume analysis credits — meaning you can analyze and re-analyze your resume up to 75 times for free, tracking improvement every time you update your skills or experience.',
  },
  {
    category: 'pricing',
    q: 'What is included in the free plan?',
    a: 'The free plan includes: up to 75 lifetime iATS resume analysis credits, free iCL cover letter generation, access to IT job listings, the Chrome Extension, and the Intelligent Performance Tracking Dashboard. No credit card required.',
  },
  {
    category: 'pricing',
    q: 'What happens after I use all 75 free credits?',
    a: 'You can upgrade to a VFound premium plan for unlimited analyses, advanced features, and priority processing. Visit vfound.in/pricing for current plan details.',
  },

  // ── Privacy ──
  {
    category: 'privacy',
    q: 'Is my resume data safe on VFound?',
    a: 'Yes. VFound processes your resume securely and uses it only to generate your analysis results. Your data is never shared with third parties or advertisers. Full details at vfound.in/privacy_policy.',
  },
  {
    category: 'privacy',
    q: 'Does VFound sell my personal data?',
    a: 'No. VFound does not sell user data to any third party. Your resume, scores, and personal information are used only to power the platform\'s features for you.',
  },
  {
    category: 'privacy',
    q: 'Is VFound a recruiting agency?',
    a: 'No. VFound is an AI-powered career intelligence platform — not a recruiting agency. All insights and scores are AI-generated guidance. VFound does not directly place candidates in jobs.',
  },

  // ── Freshers ──
  {
    category: 'freshers',
    q: 'Is VFound useful for students with no work experience?',
    a: 'Absolutely. iATS fairly evaluates academic projects, hackathons, certifications, and internships — not just full-time jobs. iCL writes professional cover letters from your student profile. You don\'t need years of experience to compete — you need the right tools.',
  },
  {
    category: 'freshers',
    q: 'How does VFound help students beat extreme competition in India?',
    a: 'India produces millions of IT graduates every year. VFound gives students a real edge: exact percentile rank vs thousands of other candidates, technical gap analysis showing what skills to build, career health score showing long-term profile strength, and iCL cover letters that sound professionally crafted from day one.',
  },
]

// ── Component ──────────────────────────────────────────────
export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [openIndex, setOpenIndex]           = useState<number | null>(null)

  const filtered = useMemo(() => {
    return faqs.filter((f) =>
      activeCategory === 'all' || f.category === activeCategory
    )
  }, [activeCategory])

  return (
    <div className="min-h-screen bg-[#0d2440] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">

        {/* ── Title ── */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-14 leading-tight max-w-sm">
          Frequently Asked<br /> <span className="text-yellow-500">Questions</span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

          {/* ── Left: Category Sidebar ── */}
          <aside className="lg:w-56 flex-shrink-0">
            <nav className="flex flex-row flex-wrap lg:flex-col gap-2" aria-label="FAQ categories">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { setActiveCategory(cat.id); setOpenIndex(null) }}
                  className={`text-left px-4 py-2 rounded-full text-sm font-medium border transition-all duration-150 whitespace-nowrap ${
                    activeCategory === cat.id
                      ? 'bg-white text-black border-white'
                      : 'bg-transparent text-[#e7f0fa] border-gray-700 hover:border-slate-300 hover:text-slate-200'
                  }`}
                  aria-pressed={activeCategory === cat.id}
                >
                  {cat.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* ── Right: Accordion ── */}
          <div className="flex-1 min-w-0">
            <div className="divide-y divide-gray-700 border border-gray-700 rounded-xl overflow-hidden">
              {filtered.map((faq, idx) => {
                const isOpen = openIndex === idx
                return (
                  <div key={`${faq.category}-${idx}`}>
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between gap-6 px-6 py-5 text-left hover:bg-[#0d2440] transition-colors duration-150"
                      aria-expanded={isOpen}
                    >
                      <span className={`text-[15px] font-medium leading-snug transition-colors duration-150 ${isOpen ? 'text-white' : 'text-[#e7f0fa]'}`}>
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 flex-shrink-0 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180 text-white' : ''}`}
                        aria-hidden="true"
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="answer"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <p className="px-6 pb-5 text-[#e7f0fa] text-[14px] leading-relaxed">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>

            {/* Count */}
            <p className="text-[#e7f0fa] text-xs mt-5 text-right">
              {filtered.length} of {faqs.length} questions
            </p>
          </div>

        </div>
      </div>
      <div className="py-20 px-6 max-w-5xl mx-auto">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">

  </div>
</div>
    </div>
    
  )
}