import FAQ from './components/FAQ'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Features from './components/FeatureSection'
import HeroCTA from './components/HeroCTA'
import Countdown from './components/Countdown'
import Testimonials from './components/test'

const Page = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <Testimonials/>
      <FAQ />
      <HeroCTA />
      <Countdown />
      <Footer />
    </div>
  )
}

export default Page
