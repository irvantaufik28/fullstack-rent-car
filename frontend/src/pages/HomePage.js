import React from 'react'
import Banner from '../components/homepage/Banner'
import BestCar from '../components/homepage/BestCar'
import WhyUs from '../components/homepage/WhyUs'
// import Testimonial from '../components/homepage/Testimonial'
import CtaBanner from '../components/homepage/CtaBanner'
import Faq from '../components/homepage/Faq'



export default function HomePage() {
  return (
    <>
      <Banner />
      <BestCar />
      <WhyUs />
      {/* <Testimonial /> */}
      <CtaBanner />
      <Faq />

    </>
  )
}
