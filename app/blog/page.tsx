import React from 'react'
import Blogs from '../components/Blogs' 

export const metadata = {
  title: "Latest Tech News - Hourly Updates",
  description: "Fresh technology, science & business stories curated hourly",
  openGraph: {
    images: ["/og-image.jpg"],
    type: "website"
  }
};


const page = () => {
  return (
    <div>
        <Blogs /> 
    </div>
  )
}

export default page
