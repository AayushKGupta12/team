import React from 'react'
import Navbar from '../components/Navbar'
import BlogHero from '../components/BlogHero'
import Footer from '../components/Footer'
import Blogs from '../components/Blogs' 
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
