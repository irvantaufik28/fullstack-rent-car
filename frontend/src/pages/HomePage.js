import React from 'react'
import Banner from '../components/homepage/Banner'
import BestCar from '../components/homepage/BestCar'
import WhyUs from '../components/homepage/WhyUs'
import Testimonial from '../components/homepage/Testimonial'
import CtaBanner from '../components/homepage/CtaBanner'
import Faq from '../components/homepage/Faq'
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import { whyUsStatic, faqStatic, bestCarStatic } from '../components/internal/constanta/static'
const props = {
  whyUsStatic,
  faqStatic,
  bestCarStatic
}


export default function HomePage() {
  return (
    <>
    <Navbar/>
    <div>

      <Banner />
      <BestCar {...props}/>
      <WhyUs {...props}/>
      <Testimonial />
      <CtaBanner />
      <Faq {...props}/>
    </div>
    <Footer />
    </>
  )
}
