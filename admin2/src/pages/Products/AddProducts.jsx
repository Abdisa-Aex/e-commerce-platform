import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { MenuItem, Rating, Select } from "@mui/material";
import UploadBox from "../../components/UpLoadBox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IoMdClose } from "react-icons/io";
import { FaCloudUploadAlt } from "react-icons/fa";
const AddProducts = () => {
  const [productCat, setProductCat] = useState("");
  const [productSubCat, setProductSubCat] = useState("");
  const [productCatFeatured, setProductCatFeatured] = useState("");
  const [productRams, setProductRams] = useState("");
  const [productWeight, setProductWeight] = useState("");
  const [productSize, setProductSize] = useState("");
  const handleChangeProductSubCat = (e) => {
    setProductSubCat(e.target.value);
  };
  const handleChangeProductCat = (e) => {
    setProductCat(e.target.value);
  };
  const handleChangeProductCatFeatured = (e) => {
    setProductCatFeatured(e.target.value);
  };
  const handleChangeProductRams = (e) => {
    setProductRams(e.target.value);
  };
  const handleChangeProductWeight = (e) => {
    setProductWeight(e.target.value);
  };
  const handleChangeProductSize = (e) => {
    setProductSize(e.target.value);
  };
  return (
    <section className="p-5 bg-gray-50">
      <form className="form py-3 p-8 ">
        <div className="scroll max-h-[72vh] overflow-y-scroll pr-4">

          <div className="grid grid-cols-1 mb-3">
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1">Product Name</h3>
              <input
                type="text"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-primary rounded-sm p-3 text-sm"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 mb-3">
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Description
              </h3>
              <textarea
                type="text"
                className="w-full h-[140px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-primary rounded-sm p-3 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-4 mb-3 gap-4">
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product category
              </h3>
              <Select
                labelId="demp-simple-select-label"
                id="productCatSrop"
                className="w-full"
                label="Category"
                value={productCat}
                onChange={handleChangeProductCat}>
                <MenuItem value={""}>None</MenuItem>
                <MenuItem value={10}>Fashion</MenuItem>
                <MenuItem value={20}>Beauty</MenuItem>
                <MenuItem value={30}>Wellness</MenuItem>
              </Select>
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1">
                Product sub category
              </h3>
              <Select
                labelId="demp-simple-select-label"
                id="productCatSrop"
                className="w-full"
                label="Category"
                value={productSubCat}
                onChange={handleChangeProductSubCat}>
                <MenuItem value={""}>None</MenuItem>
                <MenuItem value={10}>Men</MenuItem>
                <MenuItem value={20}>Women</MenuItem>
                <MenuItem value={30}>Kids</MenuItem>
              </Select>
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Price
              </h3>
              <input
                type="number"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-6 text-sm"
              />
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product old Price
              </h3>
              <input
                type="number"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-6 text-sm    "
              />
            </div>
          </div>

          <div className="grid grid-cols-4 mb-3 gap-4">
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                is featurd
              </h3>
              <Select
                labelId="demp-simple-select-label"
                id="productCatSrop"
                className="w-full"
                label="Category"
                value={productCatFeatured}
                onChange={handleChangeProductCatFeatured}>
                <MenuItem value={10}>true</MenuItem>
                <MenuItem value={20}>false</MenuItem>
              </Select>
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product stock
              </h3>
              <input
                type="number"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-6 text-sm"
              />
            </div>
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product brand
              </h3>
              <input
                type="text"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-6 text-sm"
              />
            </div>
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product discount
              </h3>
              <input
                type="number"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-6 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-4 mb-3 gap-4">
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product RAMS
              </h3>
              <Select
                labelId="demp-simple-select-label"
                id="productCatSrop"
                className="w-full"
                label="Category"
                value={productRams}
                onChange={handleChangeProductRams}>
                <MenuItem value={"4GB"}>4GB</MenuItem>
                <MenuItem value={"6GB"}>6GB</MenuItem>
                <MenuItem value={"8GB"}>8GB</MenuItem>
              </Select>
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1">Product Weight</h3>
              <Select
                labelId="demp-simple-select-label"
                id="productCatSrop"
                className="w-full"
                label="Category"
                value={productWeight}
                onChange={handleChangeProductWeight}>
                <MenuItem value={""}>None</MenuItem>
                <MenuItem value={10}>2KG</MenuItem>
                <MenuItem value={20}>4KG</MenuItem>
                <MenuItem value={30}>6KG</MenuItem>
              </Select>
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Size
              </h3>
              <Select
                labelId="demp-simple-select-label"
                id="productCatSrop"
                className="w-full"
                label="Category"
                value={productSize}
                onChange={handleChangeProductSize}>
                <MenuItem value={""}>None</MenuItem>
                <MenuItem value={"S"}>S</MenuItem>
                <MenuItem value={"M"}>M</MenuItem>
                <MenuItem value={"L"}>L</MenuItem>
              </Select>
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Rating
              </h3>
              <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
            </div>
          </div>

          <div className="col w-full p-5 px-0   ">
            <h3 className="font-[700] text-[18px] mb-3 ">Media and Images</h3>
            <div className="grid grid-cols-7 gap-4">
              <div className="uploadBoxWrapper relative">
                <span className="absolute -top-[5px] -right-[5px] flex items-center justify-center w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 z-50 cursor-pointer">
                  {" "}
                  <IoMdClose className="text-white text-[17px]" />{" "}
                </span>

                <div className="uploadBox p-0  rounded-md overflow-hidden border-4 border-dashed border-[rgba([0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 hover:bg-gray-200 cursor-pointer flex items-center justify-center flex-col relative">
                  <LazyLoadImage
                    className="w-full h-full object-cover"
                    alt={"image"}
                    src={"/1.jpg"}
                    effect="blur"
                    wrapperProps={{
                      style: { transitionDelay: "1s" },
                    }}
                  />
                </div>
              </div>
              <div className="uploadBoxWrapper relative">
                <span className="absolute -top-[5px] -right-[5px] flex items-center justify-center w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 z-50 cursor-pointer">
                  {" "}
                  <IoMdClose className="text-white text-[17px]" />{" "}
                </span>

                <div className="uploadBox p-0  rounded-md overflow-hidden border-4 border-dashed border-[rgba([0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 hover:bg-gray-200 cursor-pointer flex items-center justify-center flex-col relative">
                  <LazyLoadImage
                    className="w-full h-full object-cover"
                    alt={"image"}
                    src={"/1.jpg"}
                    effect="blur"
                    wrapperProps={{
                      style: { transitionDelay: "1s" },
                    }}
                  />
                </div>
              </div>
              <div className="uploadBoxWrapper relative">
                <span className="absolute -top-[5px] -right-[5px] flex items-center justify-center w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 z-50 cursor-pointer">
                  {" "}
                  <IoMdClose className="text-white text-[17px]" />{" "}
                </span>

                <div className="uploadBox p-0  rounded-md overflow-hidden border-4 border-dashed border-[rgba([0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 hover:bg-gray-200 cursor-pointer flex items-center justify-center flex-col relative">
                  <LazyLoadImage
                    className="w-full h-full object-cover"
                    alt={"image"}
                    src={"/1.jpg"}
                    effect="blur"
                    wrapperProps={{
                      style: { transitionDelay: "1s" },
                    }}
                  />
                </div>
              </div>
              <div className="uploadBoxWrapper relative">
                <span className="absolute -top-[5px] -right-[5px] flex items-center justify-center w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 z-50 cursor-pointer">
                  {" "}
                  <IoMdClose className="text-white text-[17px]" />{" "}
                </span>

                <div className="uploadBox p-0  rounded-md overflow-hidden border-4 border-dashed border-[rgba([0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 hover:bg-gray-200 cursor-pointer flex items-center justify-center flex-col relative">
                  <LazyLoadImage
                    className="!w-full !h-full  !object-cover"
                    alt={"image"}
                    src={"/1.jpg"}
                    effect="blur"
                    wrapperProps={{
                      style: { transitionDelay: "1s" },
                    }}
                  />
                </div>
              </div>
              <div className="uploadBoxWrapper relative">
                <span className="absolute -top-[5px] -right-[5px] flex items-center justify-center w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 z-50 cursor-pointer">
                  {" "}
                  <IoMdClose className="text-white text-[17px]" />{" "}
                </span>

                <div className="uploadBox p-0  rounded-md overflow-hidden border-4 border-dashed border-[rgba([0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 hover:bg-gray-200 cursor-pointer flex items-center justify-center flex-col relative">
                  <LazyLoadImage
                    className="w-full h-full object-cover"
                    alt={"image"}
                    src={"/1.jpg"}
                    effect="blur"
                    wrapperProps={{
                      style: { transitionDelay: "1s" },
                    }}
                  />
                </div>
              </div>
              <UploadBox multiple={true} />
            </div>
          </div>
        </div>

        <hr />
        <br />
        <Button type="button" className="btn-blue btn-lg w-full flex gap-2">
          {" "}
          <FaCloudUploadAlt className="text-white text-[25px]" />
          publish and view
        </Button>
      </form>
    </section>
  );
};

export default AddProducts;
