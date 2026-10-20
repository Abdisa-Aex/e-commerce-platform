import React, { useState } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { IoGitCompareOutline } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
 
import { Button, Rating } from "@mui/material";
import QtyBox from "../QtyBox";

const ProductDetialsComponent = () => {
  const [productActionIndex, setProductActionIndex] = useState(null);
  return (
    <>
      <h1 className="text-[24px] font-[600]  mb-2">woven kurt</h1>
      <div className="flex items-center gap-3  ">
        <span className="text-gray-400 text-[13px]">
          Brands :{" "}
          <span className="font-[500] text-black opacity-75">
            {" "}
            chikaka kool
          </span>
        </span>
        <Rating name="size-small" defaultValue={4} size="small" />
        <span className="text-[13px] cursor-pointer">Review (4)</span>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <span className="oldPrice line-through text-gray-500 text-[18px] font-[500]">
          $60.00
        </span>
        <span className="price text-primary  text-[18px] font-[600]">
          $50.00
        </span>
        <span className="text-[14px]">
          Avalable in stock :{" "}
          <span className="text-green-600 text-[14px] font-bold">
            223 items
          </span>
        </span>
      </div>
      <br />
      <p className="mt-3 pr-10 mb-5">
        the good price of the clothe for you ever today goshop noe we go then
        you what wait for he good price of the clothe for you ever today goshop
        he good price of the clothe for you ever today goshopnow he good price
        of the clothe for you ever today goshop he good price of the clothe for
        you ever today goshop
      </p>
      <div className="flex items-center gap-3 ">
        <span className="text-[14px]">Size :</span>
        <div className="flex items-center gap-1 actions">
          <Button
            className={`${
              productActionIndex === 0 ? "!bg-primary !text-white" : ""
            }`}
            onClick={() => setProductActionIndex(0)}
          >
            S
          </Button>
          <Button
            className={`${
              productActionIndex === 1 ? "!bg-primary !text-white" : ""
            }`}
            onClick={() => setProductActionIndex(1)}
          >
            {" "}
            M
          </Button>
          <Button
            className={`${
              productActionIndex === 2 ? "!bg-primary !text-white" : ""
            }`}
            onClick={() => setProductActionIndex(2)}
          >
            {" "}
            L
          </Button>
          <Button
            className={`${
              productActionIndex === 3 ? "!bg-primary !text-white" : ""
            }`}
            onClick={() => setProductActionIndex(3)}
          >
            {" "}
            XL
          </Button>
        </div>
      </div>
      <p className="text-[14px] mt-5 mb-2 text-[#000]">
        free shipping (Est.Delivery Time 2-3 Days)
      </p>
      <div className="flex items-center    gap-4 py-4">
        <div className="qtyBoxWrapper w-[70px]">
         
          <QtyBox  />
        </div>
        <Button className="btn-org flex gap-2">
          <MdOutlineShoppingCart className="text-[22px]" /> Add to Cart
        </Button>
      </div>

      <div className="flex items-center gap-4 mt-6">
        <span className="flex items-center gap-2 link cursor-pointer text-[15px] font-[500]">
          {" "}
          <FaRegHeart className="text-[18px]" /> Add To wish list
        </span>
        <span className="flex items-center gap-2 link cursor-pointer text-[15px] font-[500]">
          {" "}
          <IoGitCompareOutline className="text-[18px]" /> Add To Compare
        </span>
      </div>
    </>
  );
};

export default ProductDetialsComponent;
