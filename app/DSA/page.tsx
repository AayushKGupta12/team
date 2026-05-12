import React from 'react'
import DSAHero from '../components/DSAHero'
import DSAFeature from '../components/DSAFeature'
import DSAComparisons from '../components/DSAComparisons'
import DSAFAQ from '../components/DSAFAQ'
import DSATest from '../components/DSATest'

const page = () => {
  return (
    <div>
        <DSAHero />
        <DSAFeature />
        <DSAComparisons />
        <DSATest/>
        <DSAFAQ />
    </div>
  )
}

export default page
