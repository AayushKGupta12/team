import FAQ from './components/FAQ'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Features from './components/Features'
import HeroCTA from './components/HeroCTA'
import Countdown from './components/Countdown'
// import PricingSection from './components/Price' Pricing ka route nai dalenge abhi, om namah shivay
import Testimonials from './components/test'

const Page = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <Testimonials/>
      <FAQ />
      // <PricingSection /> Pricing ka route nai dalenge abhi, om namah shivay
      <HeroCTA />
      <Countdown />
      <Footer />
    </div>
  )
}

export default Page
