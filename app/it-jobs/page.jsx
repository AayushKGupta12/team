import React from 'react'
import JobHero from '../components/JobHero'
import Jobs from '../components/Jobs'

export const metadata = {
  title: "Latest IT Jobs in India – Freshers & Experienced | VFound",
  description:
    "Browse verified IT jobs in India. Software engineering, data science, AI, cloud, and off-campus jobs updated daily.",
};


const page = () => {
  return (
    <div>
        {/* <JobHero /> */}
        <Jobs/>
    </div>
  )
}

export default page
