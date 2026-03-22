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
        message="Best of Luck your End Semester Exams! Study Well "
      />
      
    </div>
  )
}

export default page
