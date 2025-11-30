import React from 'react'
import Navbar from '../components/Navbar'
import ResumeHero from '../components/ResumeHero'
import Footer from '../components/Footer'
import ATSResumeCheckerApp from '../components/Analysis'
import LLM from '../components/LLM'

const page = () => {
  return (
    <div>
      <Navbar />
      <ResumeHero />
      <ATSResumeCheckerApp />
      <LLM />
      <Footer/>
      
    </div>
  )
}

export default page
