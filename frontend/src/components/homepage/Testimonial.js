import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "../styles/testimonial.css"
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";

export default function Testimonial({ testimonialStatic }) {
  return (
    <>
    <div className="mb-5 title-slide">
        <h3 className="mb-3">Testimonial</h3>
        <p >Berbagai review positif dari para pelanggan kami</p>
    </div>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {testimonialStatic.map((item) => {
          return (
            <SwiperSlide className="swiper-slide">
              <div className="main-content" key={item.id}>
                <div className="row">
                  <div className="align-items-center col-md-3 d-flex justify-content-center">
                    <img 
                    src={item.image} 
                    alt="" 
                    className="img-fluid rounded" 
                    style={{width:'50%'}}
                    />
                  </div>
                  <div className="col-md-9">
                    <div className="start">
                      <h4>bintang {item.star}</h4>
                    </div>
                    <div className="desc">
                      <p style={{fontSize: 14}}>{item.testimonial}</p>
                    </div>
                    <div className="fullname">
                      <h5 style={{fontSize: 15}}>
                        {item.name} {item.age} {item.city}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
