import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiMenu2Line } from "react-icons/ri";
import { AiOutlineMenuFold } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { RiLockPasswordLine } from "react-icons/ri";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MyContest } from "../../App";

const Header = () => {
  const [anchor, setAnchor] = useState(null);
  const { user, logout, isSidebarOpen, setIsSidebarOpen } = useContext(MyContest);
  const navigate = useNavigate();
  const close = () => setAnchor(null);

  return (
    <header className="w-full py-2 px-3 md:px-7 shadow-md bg-[#fff] flex items-center justify-between sticky top-0 z-30">
      <Button
        className="!w-[60px] !rounded-full !min-w-[40px] !text-[rgba(0,0,0,0.8)]"
        aria-label="toggle menu"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        {isSidebarOpen ? (
          <AiOutlineMenuFold className="text-[18px]" />
        ) : (
          <RiMenu2Line className="text-[18px]" />
        )}
      </Button>

      <div className="flex items-center gap-3">
        <div
          role="button"
          tabIndex={0}
          className="flex items-center gap-2 cursor-pointer"
          onClick={(e) => setAnchor(e.currentTarget)}>
          <div className="rounded-full w-[35px] h-[35px] overflow-hidden bg-[#f1f1f1] flex items-center justify-center">
            {user?.avatar ? (
              <img src={user.avatar} alt="" className="w-full h-full object-cover" />
            ) : (
              <FaRegUser />
            )}
          </div>
          <span className="hidden sm:block text-[14px] font-[500]">{user?.name}</span>
        </div>

        <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={close}>
          <MenuItem disabled className="!opacity-100">
            <div>
              <h3 className="text-[15px] font-[600] leading-5">{user?.name}</h3>
              <p className="text-[12px] font-[400] opacity-70 mb-0">{user?.email}</p>
            </div>
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              close();
              navigate("/change-password");
            }}
            className="flex items-center gap-3">
            <RiLockPasswordLine className="text-[16px]" />
            <span className="text-[14px]">Change password</span>
          </MenuItem>
          <MenuItem
            onClick={async () => {
              close();
              await logout();
              navigate("/login");
            }}
            className="flex items-center gap-3">
            <IoMdLogOut />
            <span className="text-[14px]">Sign out</span>
          </MenuItem>
        </Menu>
      </div>
    </header>
  );
};

export default Header;
