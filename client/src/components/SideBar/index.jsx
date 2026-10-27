import React, { useContext, useEffect, useState } from "react";
import { Button, Checkbox, FormControlLabel, Rating } from "@mui/material";
import "./style.css";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { Collapse } from "react-collapse";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { MyContest } from "../../App";
import { formatPrice } from "../../utils";

const MAX_PRICE = 50000;

// Filters are stored in the page URL (?category=..&minPrice=..) so that
// links can be shared and the browser back button works.
const Sidebar = ({ params, onChange }) => {
  const { categories } = useContext(MyContest);
  const [openCat, setOpenCat] = useState(true);
  const [price, setPrice] = useState([
    Number(params.get("minPrice")) || 0,
    Number(params.get("maxPrice")) || MAX_PRICE,
  ]);

  useEffect(() => {
    setPrice([Number(params.get("minPrice")) || 0, Number(params.get("maxPrice")) || MAX_PRICE]);
  }, [params]);

  const category = params.get("category");
  const subCategory = params.get("subCategory");
  const rating = Number(params.get("rating")) || 0;

  return (
    <aside className="sidebar py-5">
      <div className="box">
        <h3 className="w-full mb-3 text-[16px] font-[600] flex items-center pr-5">
          Shop by Category
          <Button
            className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto !text-[#000]"
            onClick={() => setOpenCat(!openCat)}>
            {openCat ? <FaAngleUp /> : <FaAngleDown />}
          </Button>
        </h3>
        <Collapse isOpened={openCat}>
          <div className="scroll px-4 relative -left-[13px]">
            {categories.map((c) => (
              <div key={c._id}>
                <FormControlLabel
                  className="w-full"
                  label={c.name}
                  control={
                    <Checkbox
                      size="small"
                      checked={category === c._id && !subCategory}
                      onChange={(e) => onChange({ category: e.target.checked ? c._id : null, subCategory: null })}
                    />
                  }
                />
                {category === c._id &&
                  c.children?.map((s) => (
                    <FormControlLabel
                      key={s._id}
                      className="w-full !ml-4"
                      label={s.name}
                      control={
                        <Checkbox
                          size="small"
                          checked={subCategory === s._id}
                          onChange={(e) => onChange({ category: c._id, subCategory: e.target.checked ? s._id : null })}
                        />
                      }
                    />
                  ))}
              </div>
            ))}
          </div>
        </Collapse>
      </div>

      <div className="box mt-3">
        <h3 className="w-full mb-3 text-[16px] font-[600]">Filter by price</h3>
        <RangeSlider min={0} max={MAX_PRICE} step={50} value={price} onInput={setPrice} />
        <div className="flex pt-4 pb-2 priceRange">
          <span className="text-[13px]">
            from: <strong>{formatPrice(price[0])}</strong>
          </span>
          <span className="ml-auto text-[13px]">
            to: <strong>{formatPrice(price[1])}</strong>
          </span>
        </div>
        <Button
          className="btn-org btn-sm !mt-1"
          onClick={() =>
            onChange({
              minPrice: price[0] > 0 ? price[0] : null,
              maxPrice: price[1] < MAX_PRICE ? price[1] : null,
            })
          }>
          Apply
        </Button>
      </div>

      <div className="box mt-4">
        <h3 className="w-full mb-3 text-[16px] font-[600]">Filter by Rating</h3>
        <div className="w-full cursor-pointer">
          <Rating
            size="small"
            value={rating}
            onChange={(e, v) => onChange({ rating: v || null })}
          />
          {rating > 0 && (
            <button type="button" className="link text-[13px] ml-2" onClick={() => onChange({ rating: null })}>
              clear
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
