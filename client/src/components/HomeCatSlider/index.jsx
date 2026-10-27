import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { NO_IMAGE } from "../../utils";

const HomeCatSlider = ({ categories = [] }) => {
  if (!categories.length) return null;
  return (
    <div className="HomeCatSlider pt-4 py-8">
      <div className="container">
        <Swiper
          slidesPerView={3}
          spaceBetween={10}
          navigation={true}
          modules={[Navigation]}
          breakpoints={{
            640: { slidesPerView: 4 },
            900: { slidesPerView: 6 },
            1200: { slidesPerView: 8 },
          }}
          className="mySwiper">
          {categories.map((cat) => (
            <SwiperSlide key={cat._id}>
              <Link to={`/ProductListing?category=${cat._id}`}>
                <div className="item py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
                  <img
                    src={cat.image || NO_IMAGE}
                    alt={cat.name}
                    loading="lazy"
                    className="w-[60px] h-[60px] object-cover rounded-full transition-all"
                  />
                  <h3 className="text-[14px] md:text-[16px] font-[500] mt-3">{cat.name}</h3>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HomeCatSlider;
