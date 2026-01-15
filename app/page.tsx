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


export const metadata = {
  title: "VFound – IT Jobs, AI Resume Analyzer & Cover Letter Maker",
  description:
    "Find off-campus IT jobs, analyze your resume with AI, and generate ATS-friendly cover letters. Built for freshers and professionals.",
  robots: {
    index: true,
    follow: true,
  },
};



const Page = () => {
    <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "VFound",
        applicationCategory: "CareerApplication",
        operatingSystem: "Web",
        url: "https://vfound.in",
      }),
    }}
  />

  return (
    <div>

      <Banner
        isPositive={true}
        message="KIIT PYQ's are added for 4 & 6th semester Mid semester exam (2 Feb 2026)"
      />
      <Navbar />
      <Hero />
      <ToolsExplorer/>
      <Features />
      <Testimonials/>
      <FAQ />
      <CongratsPopup />
      <HeroCTA />
      <Countdown />
    </div>
  )
}

export default Page
