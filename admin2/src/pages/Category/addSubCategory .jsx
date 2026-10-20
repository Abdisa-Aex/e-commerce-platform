import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { LazyLoadImage } from "react-lazy-load-image-component";
import UploadBox from "../../components/UpLoadBox";
import { Button, MenuItem, Select } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
 

const AddSubCategory = () => {
    const [productCat, setProductCat] = useState("");
  const handleChangeProductCat = (e) => {
    setProductCat(e.target.value);
  };
  return (
    <section className="p-5 bg-gray-50">
      <form className="form py-3 p-8 ">
        <div className="scroll max-h-[72vh] overflow-y-scroll pr-4 pt-4">
          <div className="grid grid-cols-4 mb-3 gap-5">
            <div className="col  ">
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
              <h3 className="text-[14px] font-[500] mb-1">Sub category Name</h3>
              <input
                type="text"
                className="w-full h-[53px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-primary rounded-sm p-3 text-sm"
              />
            </div>


          </div>
          <br />
        </div>

         
        <div className="w-[250px]">
          <Button type="button" className="btn-blue btn-lg w-full flex gap-2  ">
            {" "}
            <FaCloudUploadAlt className="text-white text-[25px]" />
            publish and view
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AddSubCategory;
