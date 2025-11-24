import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import JobHero from '../components/JobHero'
import Jobs from '../components/Jobs'
import Jobs2 from '../components/Jobs2'
import Jobs3 from '../components/Jobs3'
import Jobs4 from '../components/Jobs4'

const page = () => {
  return (
    <div>
        <Navbar />
        <JobHero />
        <Jobs/>
        <Jobs2/>
        <Jobs3/>
        <Jobs4/>
        <Footer />
      
    </div>
  )
}

export default page
