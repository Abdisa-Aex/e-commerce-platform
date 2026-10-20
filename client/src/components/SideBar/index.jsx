import React from "react";

import CategoryCollapse from "../CategoryCollapse";
import { Button, Checkbox, FormControlLabel, Rating } from "@mui/material";

import "./style.css";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { useState } from "react";
import { Collapse } from "react-collapse";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
const Sidebar = () => {
  const [isOpenCategoryFilter, setOpenCategoryFilter] = useState(false);
  const [isOpenAvailFilter, setOpenAvaiFilter] = useState(false);
  const [isOpenSizeFilter, setOpenSizeFilter] = useState(false);
  return (
    <aside className="sidebar py-5">
      <div className="box ">
        <h3 className=" w-full mb-3 text-[16px] font-[600] flex items-center pr-5">
          Shop by Category
          <Button
            className="!w-[30px] !h-[30px] !min-w-[3opx] !rounded-full !ml-auto !text-[#000]"
            onClick={() => setOpenCategoryFilter(!isOpenCategoryFilter)}
          >
            {isOpenCategoryFilter === true ? <FaAngleUp /> : <FaAngleDown />}
          </Button>
        </h3>
        <Collapse isOpened={isOpenCategoryFilter}>
          <div className="scroll px-4 relative -left-[13px] ">
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Fashion"
              className="w-full "
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Electronics"
              className="w-full "
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Bags"
              className="w-full "
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="FootWear"
              className="w-full "
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Grocereis"
              className="w-full "
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Beauty"
              className="w-full "
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="WellNess"
              className="w-full "
              size="small"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Jewellery"
              className="w-full "
            />
          </div>
        </Collapse>
      </div>

      <div className="box ">
        <h3 className=" w-full mb-3 text-[16px] font-[600] flex items-center pr-5">
          Availability
          <Button
            className="!w-[30px] !h-[30px] !min-w-[3opx] !rounded-full !ml-auto !text-[#000]"
            onClick={() => setOpenAvaiFilter(!isOpenAvailFilter)}
          >
            {isOpenAvailFilter === true ? <FaAngleUp /> : <FaAngleDown />}
          </Button>
        </h3>
        <Collapse isOpened={isOpenAvailFilter}>
          <div className="scroll px-4 relative -left-[13px] ">
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Available(17)"
              className="w-full "
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="in stock(10)"
              className="w-full "
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="not available(1)"
              className="w-full "
            />
          </div>
        </Collapse>
      </div>

      <div className="box mt-4">
        <h3 className=" w-full mb-3 text-[16px] font-[600] flex items-center pr-5">
          size
          <Button
            className="!w-[30px] !h-[30px] !min-w-[3opx] !rounded-full !ml-auto !text-[#000]"
            onClick={() => setOpenSizeFilter(!isOpenSizeFilter)}
          >
            {isOpenSizeFilter === true ? <FaAngleUp /> : <FaAngleDown />}
          </Button>
        </h3>
        <Collapse isOpened={isOpenSizeFilter}>
          <div className="scroll px-4 relative -left-[13px] ">
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="small(17)"
              className="w-full "
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="medium(10)"
              className="w-full "
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="large(1)"
              className="w-full "
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="xl(1)"
              className="w-full "
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="xxl(1)"
              className="w-full "
            />
          </div>
        </Collapse>
      </div>
      <div className="box mt-3">
        <h3 className=" w-full mb-3 text-[16px] font-[600] flex items-center pr-5">
          filter by price
        </h3>

        <RangeSlider />
        <div className="flex pt-4 pb-2 priceRange">
          <span className="text-[13px]">
            from: <strong className="text-dark">Rs: {100}</strong>
          </span>
          <span className="ml-auto text-[13px]">
            from: <strong className="text-dark">Rs: {500}</strong>
          </span>
        </div>
      </div>
      <div className="box mt-3">
        <h3 className=" w-full mb-3 text-[16px] font-[600] flex items-center pr-5">
          filter by Rating
        </h3>

        <div className="w-full cursor-pointer">
          <Rating size="small" defaultValue={5} />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
