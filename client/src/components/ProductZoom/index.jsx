// @ts-ignore
import React, { useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useRef } from "react";
const ProductZoom = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  // @ts-ignore
  const zoomSliderBig = useRef();
  // @ts-ignore
  const zoomSliderSml = useRef();
  const goto = (index) => {
    setSlideIndex(index);
    zoomSliderBig.current.swiper.slideTo(index);
    zoomSliderSml.current.swiper.slideTo(index);
  };
  return (
    <>
      <div className="flex gap-3">
        <div className="slider w-[15%]">
          <Swiper
            ref={zoomSliderSml}
            direction="vertical"
            slidesPerView={5}
            spaceBetween={0}
            navigation={true}
            modules={[Navigation]}
            className="zoomProductSliderThumbs h-[500px]  overflow-hidden"
          >
            <SwiperSlide>
              <div
                className={`item rounded-md overflow-hidden cursor-pointer group   ${
                  slideIndex === 0 ? "opacity-1" : "opacity-30"
                }`}
                onClick={() => goto(0)}
              >
                <img
                  src="/asset2/ img1.jpg "
                  alt="alt"
                  className="w-full transition-all group-hover:scale-105"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className={`item rounded-md overflow-hidden cursor-pointer group   ${
                  slideIndex === 1 ? "opacity-1" : "opacity-30"
                }`}
                onClick={() => goto(1)}
              >
                <img
                  src="/asset2/ img2.jpg "
                  alt="alt"
                  className="w-full transition-all group-hover:scale-105"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className={`item rounded-md overflow-hidden cursor-pointer group   ${
                  slideIndex === 2 ? "opacity-1" : "opacity-30"
                }`}
                onClick={() => goto(2)}
              >
                <img
                  src="/asset2/ img3.jpg "
                  alt="alt"
                  className="w-full transition-all group-hover:scale-105"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className={`item rounded-md overflow-hidden cursor-pointer group   ${
                  slideIndex === 3 ? "opacity-1" : "opacity-30"
                }`}
                onClick={() => goto(3)}
              >
                <img
                  src="/asset2/ img2.jpg "
                  alt="alt"
                  className="w-full transition-all group-hover:scale-105"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className={`item rounded-md overflow-hidden cursor-pointer group   ${
                  slideIndex === 4 ? "opacity-1" : "opacity-30"
                }`}
                onClick={() => goto(4)}
              >
                <img
                  src="/asset2/ img3.jpg "
                  alt="alt"
                  className="w-full transition-all group-hover:scale-105"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className={`item rounded-md overflow-hidden cursor-pointer group   ${
                  slideIndex === 5 ? "opacity-1" : "opacity-30"
                }`}
                onClick={() => goto(5)}
              >
                <img
                  src="/asset2/ img1.jpg "
                  alt="alt"
                  className="w-full transition-all group-hover:scale-105"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="zoomContainer w-[85%] h-[500px]  overflow-hidden">
          <Swiper
            ref={zoomSliderBig}
            slidesPerView={1}
            spaceBetween={0}
            navigation={false}
          >
            <SwiperSlide>
              <InnerImageZoom
                src="/asset2/ img1.jpg "
                zoomType="hover"
                zoomScale={1}
              />
            </SwiperSlide>
            <SwiperSlide>
              <InnerImageZoom
                src="/asset2/ img2.jpg "
                zoomType="hover"
                zoomScale={1}
              />
            </SwiperSlide>
            <SwiperSlide>
              <InnerImageZoom
                src="/asset2/ img3.jpg "
                zoomType="hover"
                zoomScale={1}
              />
            </SwiperSlide>
            <SwiperSlide>
              <InnerImageZoom
                src="/asset2/ img2.jpg "
                zoomType="hover"
                zoomScale={1}
              />
            </SwiperSlide>
            <SwiperSlide>
              <InnerImageZoom
                src="/asset2/ img3.jpg "
                zoomType="hover"
                zoomScale={1}
              />
            </SwiperSlide>
            <SwiperSlide>
              <InnerImageZoom
                src="/asset2/ img1.jpg "
                zoomType="hover"
                zoomScale={1}
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default ProductZoom;
