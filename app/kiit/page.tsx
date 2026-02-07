import React from 'react'
import PYQSection from '../components/PYQSection'
import ToolsExplorer from '../components/ToolsExplorer'
import Banner from '../components/Banner'


const page = () => {
  return (
    <div>
        <PYQSection/>
        <ToolsExplorer/>

        <Banner
        isPositive={true}
        message="Best of Luck your Mid Semester Exams!"
      />
      
    </div>
  )
}

export default page
