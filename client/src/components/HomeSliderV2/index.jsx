import { Button } from "@mui/material";
import React from "react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const HomeBannerV2 = () => {
  return (
    <Swiper
    loop={true}
      spaceBetween={30}
      effect={"fade"}
      navigation={true}
      pagination={{
        clickable: true,
      }}
      autoplay={{
            delay:2500,
            disableOnInteraction:false,
          }}
      modules={[EffectFade, Navigation, Pagination,Autoplay]}
      className="homeSliderV2"
    >
      <SwiperSlide>
        <div className="item w-full rounded-md overflow-hidden relative ">
          <img src="asset2/s1.jpg" alt="bv" className="w-full" />
          <div className="info absolute top-0 -right-[100%] opacity-0 w-[50%] z-50 p-8 h-[100%] flex items-center flex-col justify-center transition-all duration-700">
            <h4 className="text-[18px] font-[500] w-full text-left mb-3 relative -right-[100%] opacity-0 ">
              big saving days sales
            </h4>
            <h2 className="text-[35px] font-[700] w-full relative -right-[100%] opacity-0 ">
              Women solid round <br /> green t-shirt
            </h2>
            <h3 className=" flex items-center gap-3 text-[18px] font-[500] w-full text-left mt-3 mb-3 relative -right-[100%] opacity-0 ">
              starting at only{" "}
              <span className="text-primary text-[30px] font-[700]">
                $58.00
              </span>{" "}
            </h3>
            <div className="w-full relative -right-[100%] opacity-0 btn_">
              <Button className="btn-org ">Shop Now</Button>
            </div>
          </div>
        </div>
      </SwiperSlide>
           <SwiperSlide>
        <div className="item w-full rounded-md overflow-hidden relative ">
          <img src="asset2/s1.jpg" alt="bv" className="w-full" />
          <div className="info absolute top-0 -right-[100%] opacity-0 w-[50%] z-50 p-8 h-[100%] flex items-center flex-col justify-center transition-all duration-700">
            <h4 className="text-[18px] font-[500] w-full text-left mb-3 relative -right-[100%] opacity-0 ">
              big saving days sales
            </h4>
            <h2 className="text-[35px] font-[700] w-full relative -right-[100%] opacity-0 ">
              Women solid round <br /> green t-shirt
            </h2>
            <h3 className=" flex items-center gap-3 text-[18px] font-[500] w-full text-left mt-3 mb-3 relative -right-[100%] opacity-0 ">
              starting at only{" "}
              <span className="text-primary text-[30px] font-[700]">
                $58.00
              </span>{" "}
            </h3>
            <div className="w-full relative -right-[100%] opacity-0 btn_">
              <Button className="btn-org ">Shop Now</Button>
            </div>
          </div>
        </div>
      </SwiperSlide>
      
    </Swiper>
  );
};

export default HomeBannerV2;
