import { Inter } from 'next/font/google'
import React from 'react'
import InternshipFeature from '../components/InternshipFeature'

const inter = Inter({ subsets: ['latin'] })

const page = () => {
  return (
    <div>
      <InternshipFeature />
      
    </div>
  )
}

export default page
