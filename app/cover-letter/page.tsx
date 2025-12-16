import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CoverHero from '../components/CoverHero'
import Cover from '../components/Cover'

export const metadata = {
  title: "AI Cover Letter Maker – ATS Friendly | VFound",
  description:
    "Create a professional ATS-friendly cover letter using AI. Tailored for IT jobs, freshers, and experienced candidates.",
};



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
