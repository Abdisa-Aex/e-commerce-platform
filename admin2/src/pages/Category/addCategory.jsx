import React from "react";
import { IoMdClose } from "react-icons/io";
import { LazyLoadImage } from "react-lazy-load-image-component";
import UploadBox from "../../components/UpLoadBox";
import { Button } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";

const AddCategory = () => {
  return (
    <section className="p-5 bg-gray-50">
      <form className="form py-3 p-8 ">
        <div className="scroll max-h-[72vh] overflow-y-scroll pr-4 pt-4">
          <div className="grid grid-cols-1 mb-3">
            <div className="col w-[25%]">
              <h3 className="text-[14px] font-[500] mb-1"> Category Name</h3>
              <input
                type="text"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-primary rounded-sm p-3 text-sm"
              />
            </div>
          </div>
<br />
          <h3 className="text-[18px] font-[500] mb-2"> Category Image</h3>

          <div className="grid grid-cols-7 gap-4">
            <div className="uploadBoxWrapper relative">
              <span className="absolute -top-[5px] -right-[5px] flex items-center justify-center w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 z-50 cursor-pointer">
                {" "}
                <IoMdClose className="text-white text-[17px]" />{" "}
              </span>

              <div className="uploadBox p-0  rounded-md overflow-hidden border-4 border-dashed border-[rgba([0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 hover:bg-gray-200 cursor-pointer flex items-center justify-center flex-col relative">
                <LazyLoadImage
                  alt={"image"}
                  src={"/1.jpg"}
                  effect="blur"
                  wrapperProps={{
                    style: { transitionDelay: "1s" },
                  }}
                  className="w-full h-full object-cover"
                  wrapperClassName="w-full h-full"
                />
              </div>
            </div>

            <UploadBox multiple={true} />
          </div>
        </div>
      </form>

      <br />
      {/* <hr /> */}
      <br />
      <div className="w-[250px]">
        <Button type="button" className="btn-blue btn-lg w-full flex gap-2  ">
          {" "}
          <FaCloudUploadAlt className="text-white text-[25px]" />
          publish and view
        </Button>
      </div>
    </section>
  );
};

export default AddCategory;
