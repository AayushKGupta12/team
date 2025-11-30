import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CoverHero from '../components/CoverHero'
import Cover from '../components/Cover'

const page = () => {
  return (
    <div>
        <Navbar />
        <CoverHero />
        <Cover/>
        <Footer/>
      
    </div>
  )
}

export default page
