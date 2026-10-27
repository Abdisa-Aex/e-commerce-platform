import React, { useState } from "react";
import "./style.css";
import Button from "@mui/material/Button";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    const q = text.trim();
    if (q) navigate(`/ProductListing?search=${encodeURIComponent(q)}`);
  };

  return (
    <form onSubmit={submit} className="searchBox w-[100%] h-[50px] rounded-[5px] bg-[#e5e5e5] relative p-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Search for product..."
        className="w-full h-[35px] focus:outline-none bg-inherit p-2 text-[15px]"
      />
      <Button
        type="submit"
        aria-label="search"
        className="!absolute top-[8px] right-[5px] z-50 !w-[35px] !min-w-[35px] h-[37px] !rounded-full !text-black">
        <IoSearch className="text-[#4e4e4e] text-[22px]" />
      </Button>
    </form>
  );
};

export default Search;
