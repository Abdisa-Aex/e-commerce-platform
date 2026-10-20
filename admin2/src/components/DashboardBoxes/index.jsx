import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Pagination from "@mui/material/Pagination";
import {Navigation } from 'swiper/modules'
import {AiTwotoneGift} from 'react-icons/ai'
import {IoStatsChartSharp} from 'react-icons/io5'
import { AiTwotonePieChart } from "react-icons/ai";
import {BsBank, BsGift, BsGiftFill, BsPieChart} from 'react-icons/bs'
import { RiProductHuntLine } from "react-icons/ri";
const DashboardBoxes = () => {
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        navigation={true}
        modules={[Navigation]}
        className="dashboardBoxesSlider">
        <SwiperSlide>
          <div className="box bg-[#3872fa]  p-5 cursor-pointer   rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4">
            <BsGift className="text-[40px] text-[#fafafa] " />

            <div className="info w-[70%] text-white">
              <h3 className="text-[#fafafa]">new orders</h3>
              <b>1,342</b>
            </div>
            <IoStatsChartSharp className="text-[50px] text-white  ] " />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="box bg-[#10b981] p-5 cursor-pointer   rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4">
            <AiTwotonePieChart className="text-[40px] text-white" />
           
            <div className="info w-[70%] text-white">
              <h3 className="text-[#fafafa]">sales</h3>
              <b>1,342</b>
            </div>
            <IoStatsChartSharp className="text-[50px] text-white " />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="box bg-red-500 p-5 cursor-pointer   rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4">
            <BsBank className="text-[40px] text-white " />
            <div className="info w-[70%] text-white">
              <h3 className="text-[#fafafa]">revenue</h3>
              <b>1,342</b>
            </div>
            <IoStatsChartSharp className="text-[50px] text-white " />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="box bg-[#7928ca] p-5 cursor-pointer    rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4">
            <RiProductHuntLine className="text-[40px] text-white " />
            <div className="info w-[70%] text-white">
              <h3 className="text-[#fafafa]">total products</h3>
              <b>1,342</b>
            </div>
            <IoStatsChartSharp className="text-[50px] text-white " />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default DashboardBoxes;
