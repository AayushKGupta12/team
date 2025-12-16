import React from 'react'
import Navbar from '../components/Navbar'
import BlogHero from '../components/BlogHero'
import Footer from '../components/Footer'
import Blogs from '../components/Blogs' 

export const metadata = {
  title: "Career & Resume Tips for IT Jobs | VFound Blog",
  description:
    "Read expert tips on IT jobs, resume building, ATS optimization, and interview preparation for freshers and professionals.",
};


const page = () => {
  return (
    <div>
        <Navbar />
        <BlogHero />
        <Blogs /> 
        <Footer />
    </div>
  )
}

export default page
