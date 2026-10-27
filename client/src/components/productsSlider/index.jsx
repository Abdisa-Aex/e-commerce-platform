import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ProductItem from "../productItem";

// `items` = how many cards fit on a wide screen; fewer on tablets and phones
const ProductsSlider = ({ products = [], items = 5 }) => {
  if (!products.length) {
    return <p className="py-6 text-[14px]">No products yet.</p>;
  }
  return (
    <div className="productsSlider py-3">
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        breakpoints={{
          640: { slidesPerView: 3 },
          900: { slidesPerView: Math.min(4, items) },
          1200: { slidesPerView: items },
        }}
        className="mySwiper">
        {products.map((p) => (
          <SwiperSlide key={p._id} className="!h-auto">
            <ProductItem product={p} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductsSlider;
