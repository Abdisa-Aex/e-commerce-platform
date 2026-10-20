import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import BannerBoxv2 from "../BannerBoxv2";
 
const AdsBannerSlider = (props) => {
  return (
    <div className="py-5 w-full">
      <Swiper
      
        slidesPerView={props.items}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="smlBtn"
      >
        <SwiperSlide>
          <BannerBoxv2
             info="left" image={'asset2/side.jpg'}
            link={"/"}
          />
        </SwiperSlide>
         <SwiperSlide>
          <BannerBoxv2
            info="left" image={'asset2/side.jpg'}
            link={"/"}
          />
        </SwiperSlide>
         <SwiperSlide>
          <BannerBoxv2
            info="left" image={'asset2/side.jpg'}
            link={"/"}
          />
        </SwiperSlide>
         <SwiperSlide>
          <BannerBoxv2
         info="left" image={'asset2/side.jpg'}
            link={"/"}
          />
        </SwiperSlide>
         <SwiperSlide>
          <BannerBoxv2
             info="left" image={'asset2/side.jpg'}
            link={"/"}
          />
        </SwiperSlide>
         <SwiperSlide>
          <BannerBoxv2
           info="left" image={'asset2/side.jpg'}
            link={"/"}
          />
        </SwiperSlide>
         <SwiperSlide>
          <BannerBoxv2
           info="left" image={'asset2/side.jpg'}
            link={"/"}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default AdsBannerSlider;
