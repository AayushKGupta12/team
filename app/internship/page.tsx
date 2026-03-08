"use client"
import { Inter } from 'next/font/google'
import InternshipFeature from '../components/InternshipFeature'
import FAQ5 from '../components/FAQ5'
import InternshipShowcase from '../components/InternshipFeature2'
import InternshipHero from '../components/InternshipHero'


const page = () => {
  return (
    <div>
      <InternshipHero />
      <InternshipFeature />
      <InternshipShowcase />
      <FAQ5 />
      
    </div>
  )
}

export default page
