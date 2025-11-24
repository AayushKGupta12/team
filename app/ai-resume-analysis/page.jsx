import React from 'react'
import Navbar from '../components/Navbar'
import ResumeHero from '../components/ResumeHero'
import Footer from '../components/Footer'
import ATSResumeCheckerApp from '../components/Analysis'

const page = () => {
  return (
    <div>
      <Navbar />
      <ResumeHero />
      <ATSResumeCheckerApp />
      <Footer/>
      
    </div>
  )
}

export default page
