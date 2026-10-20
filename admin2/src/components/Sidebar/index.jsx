import Button from "@mui/material/Button";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FaAngleDown, FaRegImage } from "react-icons/fa";
import { RiProductHuntLine } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import { TbCategory } from "react-icons/tb";
import { IoBagCheckOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { Collapse } from "react-collapse";
import { MyContest } from "../../App";

const Sidebar = () => {
  const [submenuIndex, setSubmenuIndex] = useState(null);
  const isOpenSubMenu = (index) => {
    if (submenuIndex === index) {
      setSubmenuIndex(null);
    } else {
      setSubmenuIndex(index);
    }
  };

  const context = useContext(MyContest);
  return (
    <>
      <div
        className={`sidebar fixed top-0 left-0    bg-[#fff] border-r border-[rgba(0,0,0,0.1)]    h-full py-2 px-4 w-[${
          context.isSidebarOpen === true ? "18%" : "0px"
        }]`}>
        <div className="py-2 w-full ">
          <Link to={"/"}>
            <div className="flex items-center justify-between gap-5 flex-col">
              <img src=" isomor.svg" alt="" className="w-[120px]" />
              <img src=" public/iosmor2.svg" alt="" className=" w-[90px]" />
            </div>
          </Link>
        </div>
        <ul className="mt-4">
          <li>
            <Link to="/">
              <Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[#f1f1f1f1]">
                <RxDashboard className="text-[18px]" /> <span> DashBoard</span>
              </Button>
            </Link>
          </li>
          <li>
            <Button
              className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[#f1f1f1f1]"
              onClick={() => isOpenSubMenu(1)}>
              <FaRegImage className="text-[18px] " /> <span> Home Slides</span>
              <span className="ml-auto   w-[30px] h-[30px] flex items-center justify-center ">
                <FaAngleDown
                  className={`transition-all ${
                    submenuIndex === 1 ? "rotate-180" : ""
                  }`}
                />
              </span>
            </Button>
            <Collapse isOpened={submenuIndex === 1 ? true : false}>
              <ul className="w-full">
                <li className="w-full">
                  <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3">
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)] ">
                      {" "}
                    </span>{" "}
                    Home Banner Slide list
                  </Button>
                </li>
                <li className="w-full">
                  <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3 ">
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)] "></span>{" "}
                    Add Home Banner Slide
                  </Button>
                </li>
              </ul>
            </Collapse>
          </li>
          <li>
            <Link to="/users">
              <Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[#f1f1f1f1]">
                <FiUsers className="text-[18px]" /> <span> Users</span>
              </Button>
            </Link>
          </li>
          <li>
            <Button
              className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[#f1f1f1f1]"
              onClick={() => isOpenSubMenu(3)}>
              <RiProductHuntLine className="text-[18px] " />{" "}
              <span> products</span>
              <span className="ml-auto   w-[30px] h-[30px] flex items-center justify-center ">
                <FaAngleDown
                  className={`transition-all ${
                    submenuIndex === 3 ? "rotate-180" : ""
                  }`}
                />
              </span>
            </Button>
            <Collapse isOpened={submenuIndex === 3 ? true : false}>
              <ul className="w-full">
                <li className="w-full">
                  <Link to="/products">
                    <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3">
                      <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)] "></span>
                      products
                    </Button>
                  </Link>
                </li>
                <li className="w-full">
                  <Button
                    className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3 "
                    onClick={() =>
                      context.setIsOpenFullScreenPanel({
                        open: true,
                        model: "Add Product",
                      })
                    }>
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)] "></span>
                    product upload
                  </Button>
                </li>
              </ul>
            </Collapse>
          </li>

          <li>
            <Button
              className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[#f1f1f1f1]"
              onClick={() => isOpenSubMenu(4)}>
              <TbCategory className="text-[18px] " /> <span> category</span>
              <span className="ml-auto   w-[30px] h-[30px] flex items-center justify-center ">
                <FaAngleDown
                  className={`transition-all ${
                    submenuIndex === 4 ? "rotate-180" : ""
                  }`}
                />
              </span>
            </Button>
            <Collapse isOpened={submenuIndex === 4 ? true : false}>
              <ul className="w-full">
                <li className="w-full">
                  <Link to="/category/List">
                    <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3">
                      <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)] "></span>
                      category list
                    </Button>
                  </Link>
                </li>

                <li className="w-full">
                  <Button
                    className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3 "
                    onClick={() =>
                      context.setIsOpenFullScreenPanel({
                        open: true,
                        model: "Add New Category",
                      })
                    }>
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)] "></span>
                    Add category
                  </Button>
                </li>
                <li className="w-full">
                  <Link to="/subCategory/list">
                    <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3 ">
                      <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)] "></span>
                      sub category list
                    </Button>
                  </Link>
                </li>
                <li className="w-full">
                  <Button
                    className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3 "
                    onClick={() =>
                      context.setIsOpenFullScreenPanel({
                        open: true,
                        model: "Add New Sub Category",
                      })
                    }>
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)] "></span>
                    Add a sub category
                  </Button>
                </li>
              </ul>
            </Collapse>
          </li>

          <li>
            <Link to="/orders">
              <Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[#f1f1f1f1]">
                <IoBagCheckOutline className="text-[20px]" />{" "}
                <span> Orders</span>
              </Button>
            </Link>
          </li>
          <li>
            <Button className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[#f1f1f1f1]">
              <IoMdLogOut className="text-[20px]" /> <span> Logout</span>
            </Button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
