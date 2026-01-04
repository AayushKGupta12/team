import React from 'react'
import Navbar from '../components/Navbar'
import ResumeHero from '../components/ResumeHero'
import Footer from '../components/Footer'
import ATSResumeCheckerApp from '../components/Analysis'
import ResumeFAQ from '../components/ResumeFAQ'
import FAQ from '../components/FAQ2'

export const metadata = {
  title: "AI Resume Analyzer – Check ATS Resume Score | VFound",
  description:
    "Analyze your resume with AI. Get ATS score, technical skills review, experience analysis, and IT job recommendations.",
};



const page = () => {
  
  return (
    
    <div>
      <Navbar />
      <ResumeHero />
      <ATSResumeCheckerApp />
      <ResumeFAQ/>
      <FAQ/>
      <Footer/>
      
    </div>
  )
}

export default page
