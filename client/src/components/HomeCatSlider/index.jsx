import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
const HomeCatSlider = () => {
  return (
    <div className="HomeCatSlider pt-4 py-8">
      <div className="container">
        <Swiper
          slidesPerView={8}
          // pagination={{
          //   clickable:true,}}
          spaceBetween={10}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <Link to="/">
              <div className="item py-7 px-3 bg-white rounbded-sm text-center flex items-center justify-center flex-col ">
                <img src="asset/filehomeCat1.png" alt="tablet" className="w-[60px] transition-all" />
                <h3 className="text-[16px] font-[500] mt-3">fashion</h3>
              </div>
            </Link>
          </SwiperSlide>
           <SwiperSlide>
            <Link to="/">
              <div className="item py-7 px-3 bg-white rounbded-sm text-center flex items-center justify-center flex-col ">
                <img src="asset/filehomeCat2.png" alt="tablet" className="w-[60px] transition-all" />
                <h3 className="text-[16px] font-[500] mt-3">Electronics</h3>
              </div>
            </Link>
          </SwiperSlide>
           <SwiperSlide>
            <Link to="/">
              <div className="item py-7 px-3 bg-white rounbded-sm text-center flex items-center justify-center flex-col ">
                <img src="asset/filehomeCat3.png" alt="tablet" className="w-[60px] transition-all" />
                <h3 className="text-[16px] font-[500] mt-3">bags</h3>
              </div>
            </Link>
          </SwiperSlide>
           <SwiperSlide>
            <Link to="/">
              <div className="item py-7 px-3 bg-white rounbded-sm text-center flex items-center justify-center flex-col ">
                <img src="asset/filehomeCat4.png" alt="tablet" className="w-[60px] transition-all" />
                <h3 className="text-[16px] font-[500] mt-3">footwear</h3>
              </div>
            </Link>
          </SwiperSlide>
           <SwiperSlide>
            <Link to="/">
              <div className="item py-7 px-3 bg-white rounbded-sm text-center flex items-center justify-center flex-col ">
                <img src="asset/filehomeCat5.png" alt="tablet" className="w-[60px] transition-all" />
                <h3 className="text-[16px] font-[500] mt-3">groceries</h3>
              </div>
            </Link>
          </SwiperSlide>
           <SwiperSlide>
            <Link to="/">
              <div className="item py-7 px-3 bg-white rounbded-sm text-center flex items-center justify-center flex-col ">
                <img src="asset/filehomeCat6.png" alt="tablet" className="w-[60px] transition-all" />
                <h3 className="text-[16px] font-[500] mt-3">beauty</h3>
              </div>
            </Link>
          </SwiperSlide>
           <SwiperSlide>
            <Link to="/">
              <div className="item py-7 px-3 bg-white rounbded-sm text-center flex items-center justify-center flex-col ">
                <img src="asset/filehomeCat7.png" alt="tablet" className="w-[60px] transition-all" />
                <h3 className="text-[16px] font-[500] mt-3">WellNess</h3>
              </div>
            </Link>
          </SwiperSlide>
           <SwiperSlide>
            <Link to="/">
              <div className="item py-7 px-3 bg-white rounbded-sm text-center flex items-center justify-center flex-col ">
                <img src="asset/filehomeCat8.png" alt="tablet" className="w-[60px] transition-all" />
                <h3 className="text-[16px] font-[500] mt-3"> jewellery</h3>
              </div>
            </Link>
          </SwiperSlide>
          
           <SwiperSlide>
            <Link to="/">
              <div className="item py-7 px-3 bg-white rounbded-sm text-center flex items-center justify-center flex-col ">
                <img src="download.jpeg" alt="tablet" className="w-[60px] transition-all" />
                <h3 className="text-[16px] font-[500] mt-3">smart tablet</h3>
              </div>
            </Link>
          </SwiperSlide>
           <SwiperSlide>
            <Link to="/">
              <div className="item py-7 px-3 bg-white rounbded-sm text-center flex items-center justify-center flex-col ">
                <img src="download.jpeg" alt="tablet" className="w-[60px] transition-all" />
                <h3 className="text-[16px] font-[500] mt-3">smart tablet</h3>
              </div>
            </Link>
          </SwiperSlide>
           <SwiperSlide>
            <Link to="/">
              <div className="item py-7 px-3 bg-white rounbded-sm text-center flex items-center justify-center flex-col ">
                <img src="download.jpeg" alt="tablet" className="w-[60px] transition-all" />
                <h3 className="text-[16px] font-[500] mt-3">smart tablet</h3>
              </div>
            </Link>
          </SwiperSlide>

           
        </Swiper>
      </div>
    </div>
  );
};

export default HomeCatSlider;
