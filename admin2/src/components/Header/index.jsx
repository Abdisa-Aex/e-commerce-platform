import React, { useContext, useState } from "react";
import { RiMenu2Line } from "react-icons/ri";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FaRegBell, FaRegUser } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { MyContest } from "../../App";
import { AiOutlineMenuFold } from "react-icons/ai";
import { NavLink } from "react-router-dom";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3, // ✅ fixed typo
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Header = () => {
  const [anchorElMyAcc, setAnchorElMyAcc] = useState(null);
  const openMyAcc = Boolean(anchorElMyAcc);

  const handleClickMyAcc = (event) => {
    setAnchorElMyAcc(event.currentTarget);
  };

  const handleCloseMyAcc = () => {
    setAnchorElMyAcc(null);
  };
  const context = useContext(MyContest);
  return (
    <header
      className={`w-full h-auto py-2 pl-64 ${
        context.isSidebarOpen === true ? "pl-96" : "pl-5"
      } shadow-md pr-7 bg-[#fff] flex items-center justify-between transition-all`}>
      {/* Left Menu */}
      <div className="part1">
        <Button
          className="!w-[90px] !rounded-full !min-w-[40px] !text-[rgba(0,0,0,0.8)]"
          onClick={() => context.setIsSidebarOpen(!context.isSidebarOpen)}>
          {context.isSidebarOpen === true ? (
        <AiOutlineMenuFold className="text-[18px]  text-[rgba(0,0,0,0.8)]" />
 
          ) : (
            <RiMenu2Line className="text-[18px] text-[rgba(0,0,0,0.8)]" />
          )}
        </Button>
      </div>

      {/* Right Actions */}
      <div className="part2 w-[40%] flex items-center justify-end gap-5">
        {/* Notifications */}
        <IconButton aria-label="notifications" size="small" sx={{ ml: 2 }}>
          <StyledBadge badgeContent={4} color="secondary">
            <FaRegBell />
          </StyledBadge>
        </IconButton>

        {context.isLogin === true ? (
          <div className="relative">
            <div
              role="button"
              tabIndex={0}
              className="rounded-full w-[35px] h-[35px] overflow-hidden cursor-pointer"
              onClick={handleClickMyAcc}>
              <img
                src="/1.jpg"
                alt="user"
                className="w-full h-full object-cover"
              />
            </div>

            <Menu
              anchorEl={anchorElMyAcc}
              id="account-menu"
              open={openMyAcc}
              onClose={handleCloseMyAcc}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
              <MenuItem onClick={handleCloseMyAcc} className="!bg-white">
                <div className="flex items-center gap-3">
                  <div className="rounded-full w-[35px] h-[35px] overflow-hidden cursor-pointer">
                    <img
                      src="/1.jpg"
                      alt="user"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="info">
                    <h3 className="text-[15px] font-[600] leading-5">
                      Angelina Julia
                    </h3>
                    <p className="text-[12px] font-[400] opacity-70">
                      admin-01@gmail.com
                    </p>
                  </div>
                </div>
              </MenuItem>
              <Divider />

              <MenuItem
                onClick={handleCloseMyAcc}
                className="flex items-center gap-3">
                <FaRegUser className="text-[16px]" />
                <span className="text-[14px]">Profile</span>
              </MenuItem>
              <MenuItem
                onClick={handleCloseMyAcc}
                className="flex items-center gap-3">
                <IoMdLogOut />
                <span className="text-[14px]">sign out</span>
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <NavLink to="/login" exact={true}> 
          <Button className="btn-blue btn-sm !rounded-full">Sign  In</Button>
        </NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
