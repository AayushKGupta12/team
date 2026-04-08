import React from 'react'
import PYQSection from '../components/PYQSection'
import ToolsExplorer from '../components/ToolsExplorer'
import Banner from '../components/Banner'
import ThanksButton from '../components/ThanksButton'
import Geurilla from '../components/Geurilla'


const page = () => {
  return (
    <div>
        <Geurilla/>
        <PYQSection/>
        <ThanksButton/>
        <ToolsExplorer/>

        <Banner
        isPositive={true}
        message="Best of Luck your End Semester Exams! Study Well "
      />
      
    </div>
  )
}

export default page
