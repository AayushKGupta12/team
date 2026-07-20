'use client'

import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
// import Navbar from '../components/Navbar'
// import Footer from '../components/Footer'
// import Component_1 from '../components/Component_1'
// import Component_2 from '../components/Component_2'

interface PageProps {}

/*
  Intern ID: [Your ID] If Not given, leave it blank
  Intern Full Name: [YOUR NAME IN CAPITAL LETTERS] AAYUSH KUMAR GUPTA
  Intern Email: [your.email@domain.com] aayush***@gmail.com
  Intern Contact Number: [+91-XXXXXXXXXX] 
  Assigned Mentor: [MENTOR NAME] 
  Start Date: [DD/MM/YYYY]

  Files Used:
  - Figma File
  - Video Demonstration
  - Any other files used for reference or design inspiration
  - Unsplash Files / Links (if any)
  - Design Assets (if any)
*/

const Page: React.FC<PageProps> = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-16 mt-50">

        - Blank Space to import your components. and use it for demonstration <br/>
        - Components must be highly optimised for Fast Rendering for Desktop, Tablet and Mobile Devices. [Mandatory] <br/>
        - Whatso ever content you are using in your components must be copyright free and royalty free. [Mandatory] <br/>
        - Check the Console for any errors and warnings. [Mandatory] <br/>

        {/* <Component_1 />
        <Component_2 />
        <Component_3 />
        <Component_4 />
        <Component_5 /> */}
      </main>
    </div>
  )
}

export default Page