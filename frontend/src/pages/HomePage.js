import React from 'react'
import Banner from '../components/homepage/banner/Banner'
import BestCar from '../components/homepage/bestcar/BestCar'
import WhyUs from '../components/homepage/whyus/WhyUs'
import Testimonial from '../components/homepage/testimonial/Testimonial'
import CtaBanner from '../components/homepage/ctabanner/CtaBanner'
import Faq from '../components/homepage/faq/Faq'
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import { whyUsStatic, faqStatic, bestCarStatic, testimonialStatic } from '../components/internal/constanta/static'
const props = {
  whyUsStatic,
  faqStatic,
  bestCarStatic,
  testimonialStatic
}


export default function HomePage() {
  return (
    <>
    <Navbar/>
    <div>

      <Banner />
      <BestCar {...props}/>
      <WhyUs {...props}/>
      <Testimonial {...props} />
      <CtaBanner />
      <Faq {...props}/>
    </div>
    <Footer />
    </>
  )
}
