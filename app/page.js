import FAQ from './components/FAQ'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Features from './components/Features'
import CompaniesTimeline from './components/Timeline'
import HeroCTA from './components/HeroCTA'

const Page = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <CompaniesTimeline/>
      <Features />
      <FAQ />
      <HeroCTA />
      <Footer />
    </div>
  )
}

export default Page