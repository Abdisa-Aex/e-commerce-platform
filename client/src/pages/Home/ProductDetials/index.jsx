import React, { useState } from "react";

import { Link } from "react-router-dom";

import { Breadcrumbs, Button, Rating, TextField } from "@mui/material";
import ProductZoom from "../../../components/ProductZoom";
import QtyBox from "../../../components/OtpBox";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa6";
import { IoGitCompareOutline } from "react-icons/io5";
import ProductsSlider from "../../../components/productsSlider";
import ProductDetialsComponent from "../../../components/ProductDetails";

const ProductDetials = () => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <>
      <div className="py-5 ">
        <div className="container">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              href="/"
              className="link transition !text-[14px]"
            >
              Home
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="/"
              className="link transition !text-[14px]"
            >
              Fashion
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="/"
              className="link transition !text-[14px]"
            >
              Fashion next
            </Link>
          </Breadcrumbs>
        </div>
      </div>

      <section className="bg-white py-5">
        <div className="container flex gap-8">
          <div className="productZoomContainer w-[40%]  ">
            <ProductZoom />
          </div>

          <div className="productContent w-[60%]  pr-10 pl-10">
            <ProductDetialsComponent />
          </div>
        </div>

        <div className="container py-8 ">
          <div className="flex items-center gap-5">
            <span
              className={`link text-[17px] cursor-pointer font-[500] ${
                activeTab === 0 && "text-primary"
              }`}
              onClick={() => setActiveTab(0)}
            >
              Description
            </span>
            <span
              className={`link text-[17px] cursor-pointer font-[500] ${
                activeTab === 1 && "text-primary"
              }`}
              onClick={() => setActiveTab(1)}
            >
              Product Details
            </span>
            <span
              className={`link text-[17px] cursor-pointer font-[500] ${
                activeTab === 2 && "text-primary"
              }`}
              onClick={() => setActiveTab(2)}
            >
              Reviews(6)
            </span>
          </div>
          {activeTab === 0 && (
            <div className="shadow-md w-full px-8 py-5 rounded-md">
              <p>
                lorem what have to be have to for that it ust do doing that work
                fo r further of value is going to habbe for pop kool look good
                lorem what have to be have to for that it ust do doing that work
                for further of value is going to habben for pop kool look good
              </p>

              <h4>LightWeight Design </h4>
              <p>
                lorem what have to be have to for that it ust do doing that work
                fo r further of value is going to habbe for pop kool look good
                lorem what have to be have to for that it ust do doing that work
                for further of value is going to habben for pop kool look good
              </p>
              <h4>free shipping and return </h4>
              <p>
                lorem what have to be have to for that it ust do doing that work
                fo r further of value is going to habbe for pop kool look good
              </p>
              <h4> money guarante </h4>
              <p>
                lorem what have to be have to for that it ust do doing that work
                fo r further of value is going to habbe for pop kool look good
              </p>
              <h4>online support </h4>
              <p>
                you will get 24 hour support with this purchase and you can
                return it within 30 days for exchange
              </p>
            </div>
          )}

          {activeTab === 1 && (
            <div className="shadow-md w-full px-8 py-5 rounded-md">
              <div className="relative overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-700  ">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        stand up
                      </th>
                      <th scope="col" className="px-6 py-3">
                        folded
                      </th>
                      <th scope="col" className="px-6 py-3">
                        stand up
                      </th>
                      <th scope="col" className="px-6 py-3">
                        stand up
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b dark:text-gray-800       dark:border-gray-700">
                      <td className="px-6 py-4 font-[500]">
                        35"l * 37-45"h(front to back )
                      </td>{" "}
                      <td className="px-6 py-4 font-[500]">
                        32.5"l * 18.5"w*16.5"h
                      </td>
                      <td className="px-6 py-4 font-[500]">32.5"l*24"w*18.5</td>
                      <td className="px-6 py-4 font-[500]">24</td>
                    </tr>
                    <tr className="bg-white border-b dark:text-gray-800       dark:border-gray-700">
                      <td className="px-6 py-4 font-[500]">
                        35"l * 37-45"h(front to back )
                      </td>{" "}
                      <td className="px-6 py-4 font-[500]">
                        32.5"l * 18.5"w*16.5"h
                      </td>
                      <td className="px-6 py-4 font-[500]">32.5"l*24"w*18.5</td>
                      <td className="px-6 py-4 font-[500]">24</td>
                    </tr>
                    <tr className="bg-white border-b dark:text-gray-800       dark:border-gray-700">
                      <td className="px-6 py-4 font-[500]">
                        35"l * 37-45"h(front to back )
                      </td>{" "}
                      <td className="px-6 py-4 font-[500]">
                        32.5"l * 18.5"w*16.5"h
                      </td>
                      <td className="px-6 py-4 font-[500]">32.5"l*24"w*18.5</td>
                      <td className="px-6 py-4 font-[500]">24</td>
                    </tr>
                    <tr className="bg-white border-b dark:text-gray-800       dark:border-gray-700">
                      <td className="px-6 py-4 font-[500]">
                        35"l * 37-45"h(front to back )
                      </td>{" "}
                      <td className="px-6 py-4 font-[500]">
                        32.5"l * 18.5"w*16.5"h
                      </td>
                      <td className="px-6 py-4 font-[500]">32.5"l*24"w*18.5</td>
                      <td className="px-6 py-4 font-[500]">24</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 2 && (
            <div className="shadow-md w-[80%] px-8 py-5 rounded-md">
              <div className="w-full productReviewsContainer">
                <h2 className="text-[18px]">customer questions and answers</h2>
                <div className="reviewScroll w-full max-h-[300px] overflow-y-scroll overflow-x-hidden mt-5 pr-5">
                  <div className="review pb-5 border-b border-[rgba(0,0,0,0.1)]   w-full flex items-center justify-between">
                    <div className="info w-[60%] flex items-center gap-3">
                      <div className="img w-[80px] h-[80px] overflow-hidden rounded-full">
                        <img src="/asset/1.jpg" className="w-full" />
                      </div>
                      <div className="w-[80%]">
                        <h4 className="text-[16px]">look e-co photo</h4>
                        <h4 className="text-[13px] mb-0">2024-12-01</h4>
                        <p className="mt-0 mb-0">
                          the good price of the clothe for you ever today goshop
                          noe we go then you what wait for he good price of the
                          oday goshopnow he good price of
                        </p>
                      </div>
                    </div>

                    <Rating name="size-small" defaultValue={4} readOnly />
                  </div>

                  <div className="review pt-5 pb-5 border-b border-[rgba(0,0,0,0.1)]   w-full flex items-center justify-between">
                    <div className="info w-[60%] flex items-center gap-3">
                      <div className="img w-[80px] h-[80px] overflow-hidden rounded-full">
                        <img src="/asset/1.jpg" className="w-full" />
                      </div>
                      <div className="w-[80%]">
                        <h4 className="text-[16px]">look e-co photo</h4>
                        <h4 className="text-[13px] mb-0">2024-12-01</h4>
                        <p className="mt-0 mb-0">
                          the good price of the clothe for you ever today goshop
                          noe we go then you what wait for he good price of the
                          oday goshopnow he good price of
                        </p>
                      </div>
                    </div>

                    <Rating name="size-small" defaultValue={4} readOnly />
                  </div>
                  <div className="review pt-5 pb-5 border-b border-[rgba(0,0,0,0.1)]   w-full flex items-center justify-between">
                    <div className="info w-[60%] flex items-center gap-3">
                      <div className="img w-[80px] h-[80px] overflow-hidden rounded-full">
                        <img src="/asset/1.jpg" className="w-full" />
                      </div>
                      <div className="w-[80%]">
                        <h4 className="text-[16px]">look e-co photo</h4>
                        <h4 className="text-[13px] mb-0">2024-12-01</h4>
                        <p className="mt-0 mb-0">
                          the good price of the clothe for you ever today goshop
                          noe we go then you what wait for he good price of the
                          oday goshopnow he good price of
                        </p>
                      </div>
                    </div>

                    <Rating name="size-small" defaultValue={4} readOnly />
                  </div>
                  <div className="review pt-5 pb-5 border-b border-[rgba(0,0,0,0.1)]   w-full flex items-center justify-between">
                    <div className="info w-[60%] flex items-center gap-3">
                      <div className="img w-[80px] h-[80px] overflow-hidden rounded-full">
                        <img src="/asset/1.jpg" className="w-full" />
                      </div>
                      <div className="w-[80%]">
                        <h4 className="text-[16px]">look e-co photo</h4>
                        <h4 className="text-[13px] mb-0">2024-12-01</h4>
                        <p className="mt-0 mb-0">
                          the good price of the clothe for you ever today goshop
                          noe we go then you what wait for he good price of the
                          oday goshopnow he good price of
                        </p>
                      </div>
                    </div>

                    <Rating name="size-small" defaultValue={4} readOnly />
                  </div>
                  <div className="review pt-5 pb-5 border-b border-[rgba(0,0,0,0.1)]   w-full flex items-center justify-between">
                    <div className="info w-[60%] flex items-center gap-3">
                      <div className="img w-[80px] h-[80px] overflow-hidden rounded-full">
                        <img src="/asset/1.jpg" className="w-full" />
                      </div>
                      <div className="w-[80%]">
                        <h4 className="text-[16px]">look e-co photo</h4>
                        <h4 className="text-[13px] mb-0">2024-12-01</h4>
                        <p className="mt-0 mb-0">
                          the good price of the clothe for you ever today goshop
                          noe we go then you what wait for he good price of the
                          oday goshopnow he good price of
                        </p>
                      </div>
                    </div>

                    <Rating name="size-small" defaultValue={4} readOnly />
                  </div>
                </div>

                <br />

                <div className="reviewForm bg-[#fafafa] p-4 rounded-md">
                  <h2 className="text-[18px]">Add review</h2>

                  <form className="w-full mt-5 ">
                    <TextField
                      id="outlined-multiline-flexible"
                      label="write a review"
                      className="w-full "
                      multiline
                      rows={5}
                      // maxRows={4}
                    />
                    <br /> <br />
                    <Rating name="size-small" defaultValue={4} />
                    <div className="flex items-center mt-5">
                      <Button className="btn-org">submit review</Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="container pt-8">
          <h2 className="text-[20px] font-[600] pb-0">Related Product</h2>
          <ProductsSlider items={5} />
        </div>
      </section>
    </>
  );
};

export default ProductDetials;
