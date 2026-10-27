import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

// Slides are managed from the admin dashboard (Home Slider)
const HomeSlider = ({ slides = [] }) => {
  if (!slides.length) return null;
  return (
    <div className="homeSlider py-4">
      <div className="container">
        <Swiper
          loop={slides.length > 1}
          spaceBetween={10}
          navigation={true}
          modules={[Navigation, Autoplay]}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          className="sliderHome">
          {slides.map((s, i) => (
            <SwiperSlide key={s._id}>
              <div className="item rounded-[20px] overflow-hidden">
                {s.link ? (
                  <Link to={s.link}>
                    <img src={s.image} alt={s.title || "banner slide"} className="w-full" loading={i ? "lazy" : "eager"} />
                  </Link>
                ) : (
                  <img src={s.image} alt={s.title || "banner slide"} className="w-full" loading={i ? "lazy" : "eager"} />
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HomeSlider;
