import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PricingHero from '../components/PriceHero'
import Price from '../components/Price'
import Countdown from '../components/Countdown'


const page = () => {
  return (
    <div>
        <Navbar />
        <PricingHero/>
        <Price/>
        <Countdown/>
        <Footer/>
      
    </div>
  )
}

export default page
