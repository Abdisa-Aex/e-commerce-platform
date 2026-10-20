import { Button, Menu, MenuItem, Rating } from "@mui/material";
import React, { useState } from "react";
import { GoTriangleDown } from "react-icons/go";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const MyListItems = () => {
 
  return (
    <div>
      <div
        className="cartItem w-full  p-3 flex items-center gap-4 
pb-5 border-b border-[rgba(0,0,0,0.1)]"
      >
        <div className="img w-[15%]  rounded-md overflow-hidden">
          <Link to="/product/7845" className="group">
            <img
              src=" /asset/file_1734530651344_ksc-khatushyam-collection-grey-pu-for-women-handheld-bag-product-images-rvoxe6ocho-0-202405282359.webp"
              className="w-full  group-hover:scale-105 transition-all"
            />
          </Link>
        </div>

        <div className="info  w-[85%] relative">
          <IoCloseSharp className="cursor-pointer absolute top-[0px] right-[0px] link text-[22px]" />
          <span className="text-[13px]">Sangria</span>
          <h3 className="text-[15px]">
            <Link className="link" to={""}>A-line kurti with sharara & dear</Link>
          </h3>
          <Rating name="size-small" defaultValue={4} size="small" readOnly />
          

          <div className="flex items-center gap-4  mt-2 mb-2  ">
            <span className="price text-black   text-[14px] font-[600]">
              $50.00
            </span>
            <span className="oldPrice line-through text-gray-500 text-[14px] font-[500]">
              $25.00
            </span>
            <span className="price text-red-500   text-[14px] font-[600]">
              50% off
            </span>
          </div>

          <br />
          
          <Button className="btn-org btn-sm">Add to Cart</Button>


        </div>
      </div>
    </div>
  );
};

export default MyListItems;
