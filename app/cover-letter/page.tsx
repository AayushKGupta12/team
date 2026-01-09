import CoverHero from '../components/CoverHero'
import Cover from '../components/Cover'
import CoverFeatures from '../components/CoverFeatures'
import FAQ3 from '../components/FAQ3'

export const metadata = {
  title: "AI Cover Letter Maker – ATS Friendly | VFound",
  description:
    "Create a professional ATS-friendly cover letter using AI. Tailored for IT jobs, freshers, and experienced candidates.",
};



const page = () => {
  return (
    <div>
        <CoverHero />
        <Cover/>
        <CoverFeatures/>
        <FAQ3/>
      
    </div>
  )
}

export default page
