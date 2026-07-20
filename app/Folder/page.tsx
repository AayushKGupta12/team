'use client'

import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { AlertCircle, FileText, ExternalLink, CheckCircle2, AlertTriangle } from 'lucide-react'

/*
  PROJECT: Tauzand Intelligence - Frontend Contribution Guidelines
  PAGE: Code of Contribution (Enhanced)
  OWNER: Aayush Kumar Gupta
  DESCRIPTION: Comprehensive formal contribution documentation page for interns, students, and contractual contributors
  
  This page outlines the complete contribution methodology, standards, and guidelines for the team project.
  Frontend-only contributions with no backend API dependencies required.
  Deployment: https://team-six-rosy.vercel.app/
  Repository: https://github.com/AayushKGupta12/team
  Documentation Link: https://drive.google.com/file/d/1r2ZqUKwjWEVir1dilernOPYjgsCMrEVu/view?usp=drive_link
  
  CRITICAL: Code of Conduct Violations
  - Any violation of these contribution guidelines will result in PERMANENT RESTRICTION from the platform
  - Employment agreements will be IMMEDIATELY REVOKED without prior notice
  - This applies to all interns, students, contractual personnel, and contributors at Tauzand Intelligence
*/

interface SectionProps {
  title: string
  children: React.ReactNode
  withBorder?: boolean
}

interface CodeBlockProps {
  code: string
  language?: string
}

// Component for section headers with consistent styling
const Section: React.FC<SectionProps> = ({ title, children, withBorder = true }) => (
  <section className={`mb-12 ${withBorder ? 'border-l-4 border-blue-600 pl-6' : ''}`}>
    <h2 className="text-2xl font-bold text-slate-900 mb-6">{title}</h2>
    <div className="space-y-4">{children}</div>
  </section>
)

// Component for code blocks
const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'typescript' }) => (
  <div className="bg-slate-900 text-slate-100 p-6 overflow-x-auto rounded-lg border border-slate-700">
    <pre className="text-sm font-mono leading-relaxed whitespace-pre-wrap break-words">
      {code}
    </pre>
  </div>
)

// Component for warning boxes
const WarningBox: React.FC<{ children: React.ReactNode; severity?: 'critical' | 'warning' }> = ({ 
  children, 
  severity = 'warning' 
}) => {
  const isCritical = severity === 'critical'
  return (
    <div className={`p-4 rounded-lg border-l-4 ${
      isCritical 
        ? 'bg-red-50 border-red-600 text-red-900' 
        : 'bg-yellow-50 border-yellow-600 text-yellow-900'
    }`}>
      <div className="flex items-start gap-3">
        {isCritical ? (
          <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
        ) : (
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
        )}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}

// Component for info boxes
const InfoBox: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-blue-50 p-4 border border-blue-200 rounded-lg">
    {children}
  </div>
)

const CodeOfContributionPage: React.FC = () => {
  const handleDocumentationLinkClick = (): void => {
    window.open(
      'https://drive.google.com/file/d/1r2ZqUKwjWEVir1dilernOPYjgsCMrEVu/view?usp=drive_link',
      '_blank',
      'noopener,noreferrer'
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        
        {/* ==================== HEADER SECTION ==================== */}
        <section className="mb-12">
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-slate-900 mb-6 mt-50">Code of Contribution</h1>
            <p className="text-lg text-slate-700 leading-relaxed mb-4">
              This folder is designated exclusively for contributions from interns, students, and contractual personnel at <span className="font-semibold">Tauzand Intelligence</span>. This project focuses on frontend-related work requiring no backend involvement or third-party APIs. All contributions are solely based on product design improvements, tweaks, and page reconstruction.
            </p>
            <p className="text-sm text-slate-600 space-y-2">
              <span className="block"><span className="font-semibold">Project Owner:</span> Aayush Kumar Gupta</span>
              <span className="block"><span className="font-semibold">Part of:</span> Tauzand.in Complete Codebase</span>
              <span className="block"><span className="font-semibold">Repository:</span> <code className="bg-slate-100 px-2 py-1 rounded">https://github.com/AayushKGupta12/team</code></span>
            </p>
          </div>

          {/* Documentation Link Card */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-lg shadow-lg border border-blue-500">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Official Documentation
                </h3>
                <p className="text-blue-50 mb-4">
                  Complete intern code documentation with detailed guidelines, examples, and technical specifications.
                </p>
                <button
                  onClick={handleDocumentationLinkClick}
                  className="inline-flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded font-semibold hover:bg-blue-50 transition-colors"
                >
                  View Documentation
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== CODE OF CONDUCT VIOLATIONS - CRITICAL SECTION ==================== */}
        <section className="mb-12 bg-red-900 text-white p-8 rounded-lg border-2 border-red-700">
          <div className="flex items-start gap-4 mb-4">
            <AlertTriangle className="w-8 h-8 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4">Code of Conduct & Violation Policy</h2>
              <div className="space-y-4">
                <div className="bg-red-800 p-4 rounded border border-red-600">
                  <p className="text-lg font-semibold mb-2">CRITICAL NOTICE:</p>
                  <p className="text-red-100 leading-relaxed">
                    Any individual found in violation of the Code of Contribution will face <span className="font-bold">PERMANENT RESTRICTION</span> from the Tauzand Intelligence platform and all allied organizations. Employment agreements, internship contracts, and contractual engagements will be <span className="font-bold">IMMEDIATELY REVOKED</span> without prior notice or further communication.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">Zero-Tolerance Violations Include:</h3>
                  <ul className="space-y-2 ml-4">
                    <li className="flex gap-3">
                      <span className="font-bold">•</span>
                      <span>Hardcoding API keys, environment variables, or credentials in any form</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold">•</span>
                      <span>Using copyrighted or licensed graphics, images, or intellectual property</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold">•</span>
                      <span>Implementing unauthorized backend access or API integrations</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold">•</span>
                      <span>Committing .env files or sensitive configuration to repository</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold">•</span>
                      <span>Adding excessive animations, spinning effects, or design violations</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold">•</span>
                      <span>Plagiarism or code theft from other contributors or repositories</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold">•</span>
                      <span>Failure to comply with formal Figma design specifications</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold">•</span>
                      <span>Leaving personal information (email, phone, ID) uncommented in production code</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-red-800 p-4 rounded border border-red-600 mt-4">
                  <p className="text-red-100">
                    <span className="font-bold">All contributors acknowledge understanding of these terms by proceeding with contributions. Ignorance of these guidelines is not an excuse for violation.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== ENVIRONMENT SETUP SECTION ==================== */}
        <Section title="Environment Setup">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Step 1: Fork Repository
              </h3>
              <p className="text-slate-700 mb-3">Fork the GitHub repository into your local system:</p>
              <CodeBlock code="https://github.com/AayushKGupta12/team" />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Step 2: Temporary Deployment Link
              </h3>
              <p className="text-slate-700 mb-3">Access the related temporary deployed link:</p>
              <CodeBlock code="https://team-six-rosy.vercel.app/" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Step 3: Project Setup
              </h3>
              <p className="text-slate-700">
                Open the project file in your local system. You will receive the project setup for Frontend Partial build Homepage. Navigate to the folder structure and select your desired designation for contribution.
              </p>
            </div>
          </div>
        </Section>

        {/* ==================== FOLDER STRUCTURE SECTION ==================== */}
        <Section title="Folder Structure & Naming Convention">
          <p className="text-slate-700">
            Each contributor must create a separate folder with their first name following the specified format:
          </p>
          <InfoBox>
            <p className="text-slate-900 font-mono text-sm mb-3">
              <span className="font-semibold block mb-2">Format:</span> [FirstName_intern]
            </p>
            <p className="text-slate-700 text-sm">
              <span className="font-semibold block mb-2">Example:</span> If your name is Aayush Kumar Gupta, create folder named <span className="bg-slate-200 text-slate-900 px-2 py-1 rounded font-mono">Aayush_intern</span>
            </p>
          </InfoBox>
          <p className="text-slate-700 mt-4">
            Inside this folder, create a separate <span className="font-mono bg-slate-100 px-2 py-1 rounded text-slate-900">page.tsx</span> file following the specified component structure.
          </p>
        </Section>

        {/* ==================== PAGE STRUCTURE TEMPLATE SECTION ==================== */}
        <Section title="Page Structure Template">
          <CodeBlock code={`'use client'

import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Component_1 from '../components/Component_1'
import Component_2 from '../components/Component_2'

interface PageProps {}

/*
  Intern ID: [Your ID]
  Intern Full Name: [YOUR NAME IN CAPITAL LETTERS]
  Intern Email: [your.email@domain.com]
  Intern Contact Number: [+91-XXXXXXXXXX]
  Assigned Mentor: [MENTOR NAME]
  Start Date: [DD/MM/YYYY]
*/

const Page: React.FC<PageProps> = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-16">
        <Component_1 />
        <Component_2 />
        <Component_3 />
        <Component_4 />
        <Component_5 />
      </main>
      <Footer />
    </div>
  )
}

export default Page`} language="typescript" />
          <WarningBox>
            <p className="font-semibold mb-2">Important Note:</p>
            <p>All personal information must be in commented format to prevent production issues. These details will be removed before deployment. Personal information LEFT UNCOMMENTED will result in code rejection and resubmission requirement.</p>
          </WarningBox>
        </Section>

        {/* ==================== COMPONENT DEVELOPMENT GUIDELINES ==================== */}
        <Section title="Component Development Guidelines">
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-3">Component Documentation</h3>
            <p className="text-slate-700 mb-3">Each component must include detailed comments covering:</p>
            <ul className="list-disc list-inside text-slate-700 ml-2 space-y-2">
              <li>Detailed list of implementations and features</li>
              <li>Area of impact on the application</li>
              <li>Assigned mentor information and contact details</li>
              <li>Logic explanation and approach</li>
              <li>Data structures and formatting used</li>
              <li>Dependencies and external libraries utilized</li>
              <li>Performance considerations and optimizations</li>
            </ul>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">Serial Component Development</h3>
            <p className="text-slate-700">
              Components must be imported and rendered in serial order as per their development sequence. Each component should be fully documented, tested, and reviewed before integration. Maintain a consistent naming pattern for all components.
            </p>
          </div>
        </Section>

        {/* ==================== ASSETS & RESOURCES SECTION ==================== */}
        <Section title="Assets & External Resources">
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-3">Image Guidelines</h3>
            <p className="text-slate-700 mb-3">Images must be sourced from:</p>
            <ul className="list-disc list-inside text-slate-700 ml-2 space-y-2">
              <li>Project public folder: <span className="font-mono bg-slate-100 px-2 py-1 rounded text-slate-900">/public</span></li>
              <li>Unsplash (Free tier): <span className="font-mono bg-slate-100 px-2 py-1 rounded text-slate-900">https://images.unsplash.com/</span> (non-copyrighted only)</li>
            </ul>
            <WarningBox severity="critical">
              <p><span className="font-bold">CRITICAL:</span> Copyrighted graphics, licensed images, or proprietary artwork are <span className="font-bold">strictly prohibited</span>. Violation will result in <span className="font-bold">IMMEDIATE TERMINATION</span> of employment or internship agreement at Tauzand.in and all affiliated organizations.</p>
            </WarningBox>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">Icon Library</h3>
            <p className="text-slate-700">
              Icons must be sourced exclusively from <span className="font-semibold">Lucide React</span> library. No other icon sources (FontAwesome, Material Icons without proper licensing, custom SVGs) are permitted without explicit approval from project owner.
            </p>
            <CodeBlock code="import { AlertCircle, CheckCircle2, Menu } from 'lucide-react'" language="typescript" />
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">External APIs & Third-Party Services</h3>
            <p className="text-slate-700">
              All external links, APIs, and images must be documented in commented format. For free tier services, contributors must create their own account and use local environment variables exclusively.
            </p>
            <InfoBox>
              <p className="text-slate-900 text-sm">
                <span className="font-semibold block mb-2">Example:</span>
                <code className="bg-slate-100 px-2 py-1 rounded text-xs">const API_KEY = process.env.NEXT_PUBLIC_UNSPLASH_KEY</code>
              </p>
            </InfoBox>
          </div>
        </Section>

        {/* ==================== CODING STANDARDS SECTION ==================== */}
        <Section title="Coding Standards & Best Practices">
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-3">TypeScript & Type Safety</h3>
            <p className="text-slate-700 mb-3">All code MUST be written in TypeScript with proper type annotations:</p>
            <CodeBlock code={`interface ComponentProps {
  title: string
  isActive: boolean
  onSubmit: (data: any) => void
}

const MyComponent: React.FC<ComponentProps> = ({ 
  title, 
  isActive, 
  onSubmit 
}) => {
  return <div>{title}</div>
}`} language="typescript" />
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">Naming Convention</h3>
            <p className="text-slate-700 mb-3">Follow standard, readable naming conventions:</p>
            <InfoBox>
              <p className="text-slate-900 font-mono text-sm space-y-1">
                <span className="block">✓ users_info, users_testimonial, product_card</span>
                <span className="block">✓ handleSubmit, calculateTotal, formatDate</span>
                <span className="block">✓ CONSTANT_VALUE, STATUS_ACTIVE</span>
                <span className="block">✗ usersInfo, ProductCard (inconsistent)</span>
                <span className="block">✗ func1, data2, x, y (unclear)</span>
              </p>
            </InfoBox>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">Code Organization</h3>
            <ul className="list-disc list-inside text-slate-700 ml-2 space-y-2">
              <li>Keep code length readable and concise (max 100 lines per component)</li>
              <li>Maintain proper indentation throughout (2 spaces)</li>
              <li>Extract repeated data logic into separate functions within the same component</li>
              <li>Functions for list data must be defined separately to prevent code duplication</li>
              <li>Place interfaces and types at the top of file</li>
              <li>Use destructuring for props and imports</li>
              <li>Keep JSX markup clean and readable</li>
            </ul>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">Logic Complexity</h3>
            <p className="text-slate-700">
              All logic must be at <span className="font-semibold">Easy level</span> and easily understandable by team members during code review. Avoid complex nested logic without proper documentation. If your component logic requires explanation, consider refactoring into smaller functions.
            </p>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">Design Compliance</h3>
            <p className="text-slate-700 mb-3">
              <span className="font-semibold">All code must align with Figma design specifications</span> provided by superior authority. Include Figma design links in comments for code review purposes only. Design links will not be included in production deployment.
            </p>
            <p className="text-slate-700 mb-3">
              <span className="font-semibold">Design Style:</span> Maintain formal, professional design elements throughout. Heavy animations, unnecessary transitions, spinning effects, and decorative flourishes are <span className="font-bold">strictly prohibited</span>.
            </p>
            <WarningBox severity="critical">
              <p><span className="font-bold">Violation of animation restrictions:</span> First violation = Warning. Repeated violations = <span className="font-bold">IMMEDIATE DISMISSAL from the project</span>.</p>
            </WarningBox>
          </div>
        </Section>

        {/* ==================== ENVIRONMENT VARIABLES SECTION ==================== */}
        <Section title="Environment Variables & Security">
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-3">Local Development Variables</h3>
            <p className="text-slate-700 mb-3">
              Environment variable format is provided in the main <span className="font-mono bg-slate-100 px-2 py-1 rounded text-slate-900">page.tsx</span> or Homepage in commented format. All interns and contributors must strictly follow the same variable names and structure.
            </p>
            <CodeBlock code={`// .env.local (NEVER COMMIT THIS FILE) The Exact content naming is given in the page.tsx file in commented format
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
NEXT_PUBLIC_UNSPLASH_KEY=your_key_here
DATABASE_PASSWORD=your_password

// Usage in component
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL`} language="typescript" />
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">Backend Access Request</h3>
            <p className="text-slate-700 mb-3">If backend access is needed:</p>
            <ol className="list-decimal list-inside text-slate-700 ml-2 space-y-2">
              <li>Raise a formal ticket with your assigned mentor with clear justification</li>
              <li>Obtain explicit written approval before implementing backend technologies</li>
              <li>Use environment variables as specified by mentor/project owner</li>
              <li>Document all backend access points in code comments</li>
            </ol>
          </div>

          <div className="mt-6">
            <WarningBox severity="critical">
              <p><span className="font-bold">CRITICAL SECURITY:</span> Environment variables must <span className="font-bold">NEVER</span> be hardcoded or pushed to repository. Hardcoding API keys, database passwords, or committing .env files will result in <span className="font-bold">IMMEDIATE TERMINATION</span> without prior notice. This is a non-negotiable security policy.</p>
            </WarningBox>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">Third-Party API Integration</h3>
            <p className="text-slate-700">
              For third-party APIs, contributors must create free accounts on respective services and use local environment variables throughout local deployment. Never hardcode API keys, access tokens, or credentials of any kind in your codebase.
            </p>
          </div>
        </Section>

        {/* ==================== DESIGN & UI GUIDELINES ==================== */}
        <Section title="Design & UI Guidelines">
          <p className="text-slate-700 mb-4">
            All interfaces must follow formal design patterns with a <span className="font-semibold">bluish color scheme</span>. Styling should be minimalist and functional, avoiding decorative elements.
          </p>
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-3">Color Palette</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="h-16 bg-slate-50 border border-slate-300 rounded mb-2"></div>
                <p className="text-sm text-slate-700">slate-50</p>
              </div>
              <div>
                <div className="h-16 bg-slate-100 border border-slate-300 rounded mb-2"></div>
                <p className="text-sm text-slate-700">slate-100</p>
              </div>
              <div>
                <div className="h-16 bg-[#E7F0FA] border border-[#E7F0FA] rounded mb-2"></div>
                <p className="text-sm text-[#E7F0FA]">#E7F0FA</p>
              </div>
              <div>
                <div className="h-16 bg-[#2E5E99] border border-[#2E5E99] rounded mb-2"></div>
                <p className="text-sm text-[#2E5E99]">#2E5E99</p>
              </div>
              <div>
                <div className="h-16 bg-[#0D2440] border border-[#0D2440] rounded mb-2"></div>
                <p className="text-sm text-[#0D2440]">#0D2440</p>
              </div>
              <div>
                <div className="h-16 bg-[#FFF8E7] border border-[#FFF8E7] rounded mb-2"></div>
                <p className="text-sm text-[#FFF8E7]">#FFF8E7</p>
              </div>
              <div>
                <div className="h-16 bg-[#FFD77A] border border-[#FFD77A] rounded mb-2"></div>
                <p className="text-sm text-[#FFD77A]">#FFD77A</p>
              </div>
              <div>
                <div className="h-16 bg-[#E6A520] border border-[#E6A520] rounded mb-2"></div>
                <p className="text-sm text-[#E6A520]">#E6A520</p>
              </div>
              <div>
                <div className="h-16 bg-[#7A4A00] border border-[#7A4A00] rounded mb-2"></div>
                <p className="text-sm text-[#7A4A00]">#7A4A00</p>
              </div>
              <div>
                <div className="h-16 bg-rose-300 border border-rose-300 rounded mb-2"></div>
                <p className="text-sm text-rose-300">rose-300 and All its shades</p>
              </div>

            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">Styling Requirements</h3>
            <ul className="list-disc list-inside text-slate-700 ml-2 space-y-2">
              <li>Use Tailwind CSS utility classes exclusively</li>
              <li>Avoid unnecessary font styling, italics, or decorative elements</li>
              <li>No hover effects, animations, or transitions unless specifically required by design</li>
              <li>Maintain consistent spacing and alignment (use 4px grid)</li>
              <li>Follow color palette: Slate (50, 100, 700, 900) and Blue (600) primary colors</li>
              <li>Ensure responsive design for all screen sizes (mobile, tablet, desktop)</li>
              <li>Use proper semantic HTML (buttons, links, form elements)</li>
              <li>Implement keyboard accessibility and focus states</li>
            </ul>
          </div>

          <div className="mt-6">
            <CodeBlock code={`// GOOD: Simple, formal styling
<div className="bg-slate-50 p-6 border border-slate-300 rounded-lg">
  <h2 className="text-2xl font-bold text-slate-900 mb-4">Title</h2>
  <p className="text-slate-700 leading-relaxed">Content here</p>
</div>

// BAD: Excessive animations and decorations
<div className="bg-gradient-to-r from-blue-400 to-purple-500 
             p-6 rounded-full shadow-2xl animate-bounce">
  <h2 className="text-3xl font-black text-white 
              drop-shadow-lg italic">Title</h2>
</div>`} language="typescript" />
          </div>
        </Section>

        {/* ==================== TESTING & DEPLOYMENT SECTION ==================== */}
        <Section title="Testing & Deployment">
          <p className="text-slate-700 mb-4">
            Before submitting your contribution, deploy the code in your local system and perform comprehensive testing:
          </p>
          <ul className="list-disc list-inside text-slate-700 ml-2 space-y-2">
            <li>Check for all vulnerabilities and security issues</li>
            <li>Test across different device sizes and browsers (Chrome, Firefox, Safari, Edge)</li>
            <li>Verify all links and external resources load correctly</li>
            <li>Validate TypeScript compilation without errors: <code className="bg-slate-100 px-2 py-1 rounded text-xs">tsc --noEmit</code></li>
            <li>Ensure no console warnings or errors</li>
            <li>Test with production build locally: <code className="bg-slate-100 px-2 py-1 rounded text-xs">npm run build</code></li>
            <li>Verify all images load with correct dimensions</li>
            <li>Check responsive design on mobile, tablet, and desktop viewports</li>
            <li>Validate color contrast for accessibility (WCAG AA standard)</li>
            <li>Test with keyboard navigation only (no mouse)</li>
          </ul>
          <WarningBox>
            <p><span className="font-bold">Prevention:</span> Code failures in production reflect poorly on the entire team. Thoroughly test your implementation before final submission.</p>
          </WarningBox>
        </Section>

        {/* ==================== KEY TAKEAWAYS SECTION ==================== */}
        <section className="bg-gradient-to-r from-blue-50 to-slate-50 border-l-4 border-blue-600 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Key Takeaways & Checklist</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <p className="text-slate-700 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span><span className="font-semibold">Frontend Only:</span> No unauthorized backend involvement or third-party APIs</span>
              </p>
              <p className="text-slate-700 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span><span className="font-semibold">Formal Design:</span> Bluish color scheme, minimal styling, no excessive animations</span>
              </p>
              <p className="text-slate-700 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span><span className="font-semibold">Code Quality:</span> Clear naming, proper TypeScript types, comprehensive documentation</span>
              </p>
              <p className="text-slate-700 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span><span className="font-semibold">Security:</span> No hardcoded environment variables, API keys, or credentials</span>
              </p>
            </div>
            <div className="space-y-3">
              <p className="text-slate-700 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span><span className="font-semibold">Assets:</span> Images from /public or Unsplash only, icons from Lucide React exclusively</span>
              </p>
              <p className="text-slate-700 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span><span className="font-semibold">Design Compliance:</span> Follow Figma specifications provided by project owner</span>
              </p>
              <p className="text-slate-700 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span><span className="font-semibold">Testing:</span> Thoroughly test locally before submission</span>
              </p>
              <p className="text-slate-700 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <span><span className="font-semibold">Zero Tolerance:</span> Violations result in permanent restriction and termination</span>
              </p>
            </div>
          </div>
        </section>

        {/* ==================== SUBMISSION CHECKLIST SECTION ==================== */}
        <Section title="Pre-Submission Checklist" withBorder={true}>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <p className="text-slate-900 font-semibold mb-4">Before submitting your pull request, verify:</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-3 text-slate-700">
                <input type="checkbox" disabled className="w-4 h-4" />
                <span>TypeScript compiles without errors</span>
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <input type="checkbox" disabled className="w-4 h-4" />
                <span>No console errors or warnings</span>
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <input type="checkbox" disabled className="w-4 h-4" />
                <span>All personal information is commented out</span>
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <input type="checkbox" disabled className="w-4 h-4" />
                <span>No hardcoded API keys or environment variables</span>
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <input type="checkbox" disabled className="w-4 h-4" />
                <span>Images are from /public or Unsplash (free tier)</span>
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <input type="checkbox" disabled className="w-4 h-4" />
                <span>Icons are from Lucide React only</span>
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <input type="checkbox" disabled className="w-4 h-4" />
                <span>Design aligns with Figma specifications</span>
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <input type="checkbox" disabled className="w-4 h-4" />
                <span>Responsive design tested on mobile and desktop</span>
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <input type="checkbox" disabled className="w-4 h-4" />
                <span>No .env file committed to repository</span>
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <input type="checkbox" disabled className="w-4 h-4" />
                <span>Code follows naming conventions and best practices</span>
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <input type="checkbox" disabled className="w-4 h-4" />
                <span>Components have proper TypeScript interfaces</span>
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <input type="checkbox" disabled className="w-4 h-4" />
                <span>Read and understood Code of Conduct violations policy</span>
              </li>
            </ul>
          </div>
        </Section>

      </main>

      <Footer />
    </div>
  )
}

export default CodeOfContributionPage