import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./testimonial.css";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import star_icon from '../../../assets/icon/star.svg'

export default function Testimonial({ testimonialStatic }) {
  return (
    <>
      <div className="mb-5 title-slide">
        <h3 className="mb-3">Testimonial</h3>
        <p>Berbagai review positif dari para pelanggan kami</p>
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
          const stars = [];

          for (let i = 0; i < item.star; i++) {
            stars.push(<
            img
            key={i}
            src={star_icon}
            alt="star"
            />
            );
          }
          return (
            <SwiperSlide className="swiper-slide">
              <div className="main-content" key={item.id}>
                <div className="row">
                  <div className="align-items-center col-md-3 d-flex justify-content-center">
                    <img
                      src={item.image}
                      alt=""
                      className="img-fluid rounded-circle"
                      style={{ width: "80px", height: "80px" }}
                    />
                  </div>
                  <div className="col-md-9">
                    <div className="start">
                      <h4>{stars}</h4>
                    </div>
                    <div className="desc">
                      <p>"{item.testimonial}"</p>
                    </div>
                    <div className="fullname">
                      <p>
                        {item.name} {item.age}, {item.city}
                      </p>
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

