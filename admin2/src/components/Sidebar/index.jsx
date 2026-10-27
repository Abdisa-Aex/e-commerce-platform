import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { Collapse } from "react-collapse";
import { RxDashboard } from "react-icons/rx";
import { FaAngleDown, FaRegImage } from "react-icons/fa";
import { RiProductHuntLine } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import { TbCategory } from "react-icons/tb";
import { IoBagCheckOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { MyContest } from "../../App";

const btn =
  "w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[#f1f1f1f1]";
const subBtn =
  "!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3";
const dot = <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]"></span>;

const Item = ({ to, icon, children, onNavigate }) => (
  <li>
    <NavLink to={to} end onClick={onNavigate}>
      {({ isActive }) => (
        <Button className={`${btn} ${isActive ? "!bg-[#f1f1f1]" : ""}`}>
          {icon} <span>{children}</span>
        </Button>
      )}
    </NavLink>
  </li>
);

const Group = ({ icon, label, open, onToggle, children }) => (
  <li>
    <Button className={btn} onClick={onToggle}>
      {icon} <span>{label}</span>
      <span className="ml-auto w-[30px] h-[30px] flex items-center justify-center">
        <FaAngleDown className={`transition-all ${open ? "rotate-180" : ""}`} />
      </span>
    </Button>
    <Collapse isOpened={open}>
      <ul className="w-full">{children}</ul>
    </Collapse>
  </li>
);

const Sub = ({ to, children, onNavigate }) => (
  <li className="w-full">
    <Link to={to} onClick={onNavigate}>
      <Button className={subBtn}>
        {dot}
        {children}
      </Button>
    </Link>
  </li>
);

const Sidebar = ({ onNavigate }) => {
  const [open, setOpen] = useState(null);
  const toggle = (k) => setOpen(open === k ? null : k);
  const { logout } = useContext(MyContest);
  const navigate = useNavigate();

  return (
    <div className="sidebar bg-[#fff] border-r border-[rgba(0,0,0,0.1)] h-full py-2 px-4 overflow-y-auto">
      <div className="py-4 w-full">
        <Link to="/" onClick={onNavigate}>
          <div className="flex items-center justify-center gap-1 flex-col">
            <img src="/isomor.svg" alt="Admin" className="w-[120px]" />
          </div>
        </Link>
      </div>

      <ul className="mt-2">
        <Item to="/" icon={<RxDashboard className="text-[18px]" />} onNavigate={onNavigate}>Dashboard</Item>

        <Group icon={<FaRegImage className="text-[18px]" />} label="Home slides" open={open === 1} onToggle={() => toggle(1)}>
          <Sub to="/homeslider/list" onNavigate={onNavigate}>Slide list / add</Sub>
        </Group>

        <Item to="/users" icon={<FiUsers className="text-[18px]" />} onNavigate={onNavigate}>Users</Item>

        <Group icon={<RiProductHuntLine className="text-[18px]" />} label="Products" open={open === 3} onToggle={() => toggle(3)}>
          <Sub to="/products" onNavigate={onNavigate}>Product list</Sub>
          <Sub to="/products/new" onNavigate={onNavigate}>Add product</Sub>
        </Group>

        <Group icon={<TbCategory className="text-[18px]" />} label="Categories" open={open === 4} onToggle={() => toggle(4)}>
          <Sub to="/category/list" onNavigate={onNavigate}>Category list / add</Sub>
          <Sub to="/subcategory/list" onNavigate={onNavigate}>Sub category list / add</Sub>
        </Group>

        <Item to="/orders" icon={<IoBagCheckOutline className="text-[20px]" />} onNavigate={onNavigate}>Orders</Item>

        <li>
          <Button
            className={btn}
            onClick={async () => {
              await logout();
              navigate("/login");
            }}>
            <IoMdLogOut className="text-[20px]" /> <span>Logout</span>
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
