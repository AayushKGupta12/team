import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import TeamHero from '../components/TeamHero'
import Contributors from '../components/Contributors'

const page = () => {
  return (
    <div>
        <Navbar/>
        <TeamHero/>
        <Contributors/>
        <Footer/>
    </div>
  )
}

export default page
