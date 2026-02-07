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
// import GuidedPath from './components/GuidedPath'



export const metadata = {
  title: "VFound | Career Intelligence",
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
        isPositive={false}
        message="Happy valentine's week! Find your perfect job match with VFound."
      />
      <Navbar />
      <Hero />
      <ToolsExplorer/>
      <Features />
      {/* <GuidedPath/> */}
      <Testimonials/>
      <FAQ />
      <CongratsPopup />
      <HeroCTA />
      <Countdown />
    </div>
  )
}

export default Page
