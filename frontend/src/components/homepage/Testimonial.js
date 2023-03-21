import React from "react";

import { Swiper, SwiperSlide} from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";

export default function Testimonial() {
  return (
    <>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        <SwiperSlide style={{width:800}}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci delectus commodi pariatur rem exercitationem maiores dignissimos sit quidem unde officiis perspiciatis debitis illo labore saepe, veritatis tempore quibusdam fugiat sequi!</SwiperSlide>
        <SwiperSlide style={{width:800}}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci delectus commodi pariatur rem exercitationem maiores dignissimos sit quidem unde officiis perspiciatis debitis illo labore saepe, veritatis tempore quibusdam fugiat sequi!</SwiperSlide>
        <SwiperSlide style={{width:800}}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci delectus commodi pariatur rem exercitationem maiores dignissimos sit quidem unde officiis perspiciatis debitis illo labore saepe, veritatis tempore quibusdam fugiat sequi!</SwiperSlide>
        <SwiperSlide style={{width:800}}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci delectus commodi pariatur rem exercitationem maiores dignissimos sit quidem unde officiis perspiciatis debitis illo labore saepe, veritatis tempore quibusdam fugiat sequi!</SwiperSlide>
        <SwiperSlide style={{width:800}}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci delectus commodi pariatur rem exercitationem maiores dignissimos sit quidem unde officiis perspiciatis debitis illo labore saepe, veritatis tempore quibusdam fugiat sequi!</SwiperSlide>
        <SwiperSlide style={{width:800}}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci delectus commodi pariatur rem exercitationem maiores dignissimos sit quidem unde officiis perspiciatis debitis illo labore saepe, veritatis tempore quibusdam fugiat sequi!</SwiperSlide>
      </Swiper>
    </>
  );
}
