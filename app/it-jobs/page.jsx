import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import JobHero from '../components/JobHero'
import Jobs from '../components/Jobs'

const page = () => {
  return (
    <div>
        <Navbar />
        <JobHero />
        <Jobs/>
        <Footer />
      
    </div>
  )
}

export default page
