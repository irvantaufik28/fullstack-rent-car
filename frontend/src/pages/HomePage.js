import React, { useRef } from 'react'
import Banner from '../components/homepage/banner/Banner'
import BestCar from '../components/homepage/bestcar/BestCar'
import WhyUs from '../components/homepage/whyus/WhyUs'
import Testimonial from '../components/homepage/testimonial/Testimonial'
import CtaBanner from '../components/homepage/ctabanner/CtaBanner'
import Faq from '../components/homepage/faq/Faq'
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import { whyUsStatic, faqStatic, bestCarStatic, testimonialStatic } from '../components/internal/constanta/static'




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
      <div>
        <Banner />
        <BestCar {...props} />
        <WhyUs {...props} />
        <Testimonial {...props} />
        <CtaBanner {...props} />
        <Faq {...props} />
      </div>
      <Footer />
    </>
  )
}
