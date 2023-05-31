import React, { useRef } from 'react'
import Banner from './components/banner/Banner'
import BestCar from './components/bestcar/BestCar'
import WhyUs from './components/whyus/WhyUs'
import Testimonial from './components/testimonial/Testimonial'
import CtaBanner from './components/ctabanner/CtaBanner'
import Faq from './components/faq/Faq'
import Navbar from "../../../components/layouts/Navbar";
import Footer from "../../../components/layouts/Footer";
import { whyUsStatic, faqStatic, bestCarStatic, testimonialStatic } from '../../../internal/constanta/static'




export default function HomePage() {
  const linkOurService = useRef(null);
  const linkWhyUs = useRef(null);
  const linkTestimonial = useRef(null);
  const linkFaq = useRef(null);

  const props = {
    whyUsStatic,
    faqStatic,
    bestCarStatic,
    testimonialStatic,
    linkOurService,
    linkWhyUs,
    linkTestimonial,
    linkFaq
  }
  return (
    <>
      <Navbar {...props} />
      
        <Banner />
        <BestCar {...props} />
        <WhyUs {...props} />
        <Testimonial {...props} />
        <CtaBanner {...props} />
        <Faq {...props} />
      
      <Footer />
    </>
  )
}
