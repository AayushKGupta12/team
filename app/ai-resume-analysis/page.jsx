import React from 'react'
import ResumeHero from '../components/ResumeHero'
import ATSResumeCheckerApp from '../components/Analysis'
import ResumeFAQ from '../components/ResumeFAQ'
import FAQ from '../components/FAQ2'
import ResumeCTA from '../components/ResumeCTA'

export const metadata = {
  title: "AI Resume Analyzer – Check ATS Resume Score | VFound",
  description:
    "Analyze your resume with AI. Get ATS score, technical skills review, experience analysis, and IT job recommendations.",
};



const page = () => {
  
  return (
    
    <div>
      <ResumeHero />
      <ATSResumeCheckerApp />
      <ResumeFAQ/>
      <FAQ/>
      <ResumeCTA/>
      
    </div>
  )
}

export default page
