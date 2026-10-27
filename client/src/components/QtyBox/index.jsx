import { Button } from "@mui/material";
import React from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

// Controlled quantity input: the parent owns `value`
const QtyBox = ({ value, onChange, max = 99 }) => {
  const set = (n) => onChange(Math.min(max, Math.max(1, n)));
  return (
    <div className="qtyBox flex items-center relative">
      <input
        type="number"
        min={1}
        max={max}
        value={value}
        onChange={(e) => set(parseInt(e.target.value, 10) || 1)}
        className="w-full h-[40px] p-2 pl-3 text-[15px] focus:outline-none border border-[rgba(0,0,0,0.2)] rounded-md"
      />
      <div className="flex items-center flex-col justify-between h-[40px] absolute top-0 right-0 z-10 border-[#000] border-l-[1px]">
        <Button
          className="!min-w-[30px] !w-[30px] !h-[20px] !text-[#000] !rounded-none hover:!bg-[#f1f1f1]"
          onClick={() => set(value + 1)}
          aria-label="increase quantity">
          <FaAngleUp className="text-[12px] opacity-55" />
        </Button>
        <Button
          className="!min-w-[30px] !w-[30px] !h-[20px] !text-[#000] !rounded-none hover:!bg-[#f1f1f1]"
          onClick={() => set(value - 1)}
          aria-label="decrease quantity">
          <FaAngleDown className="text-[12px] opacity-55" />
        </Button>
      </div>
    </div>
  );
};

export default QtyBox;
