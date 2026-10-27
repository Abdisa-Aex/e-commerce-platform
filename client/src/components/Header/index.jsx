import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Search from "../search";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoIosLogOut, IoMdHeartEmpty } from "react-icons/io";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { Button, Menu, MenuItem, Tooltip } from "@mui/material";
import Navigation from "./Navigation";
import { MyContest } from "../../App";
import { IoBagCheckOutline } from "react-icons/io5";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const contest = useContext(MyContest);
  const navigate = useNavigate();
  const { user } = contest;

  const handleLogout = async () => {
    handleClose();
    await contest.logout();
    contest.openAlertBox("success", "Logged out");
    navigate("/");
  };

  return (
    <header className="bg-white">
      <div className="top-strip py-2 border-t-[1px] border-gray-250 border-b-[1px] hidden md:block">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="cl1 w-[50%]">
              <p className="text-[12px] font-[500] mb-0">
                Fresh quality products, delivered to your door
              </p>
            </div>
            <div className="col2 flex items-center justify-end ">
              <ul className="flex items-center gap-3">
                <li className="list-none">
                  <Link to="/my-orders" className="text-[13px] link font-[500] transition">
                    Order Tracking
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="header py-3 border-gray-250 border-b-[1px]">
        <div className="container flex flex-wrap items-center justify-between gap-y-2">
          <div className="col1 w-[40%] md:w-[20%] order-1">
            <Link to="/">
              <img src="/vite.svg" alt="Home" className="h-[40px]" />
            </Link>
          </div>

          <div className="col2 w-full md:w-[40%] order-3 md:order-2">
            <Search />
          </div>

          <div className="col3 w-[55%] md:w-[40%] flex items-center md:pl-7 order-2 md:order-3">
            <ul className="flex items-center justify-end gap-1 md:gap-3 w-full">
              {!contest.isLogin ? (
                <li className="list-none">
                  <Link to="/login" className="link transition text-[14px] md:text-[15px] font-[500]">
                    Login
                  </Link>{" "}
                  | &nbsp;
                  <Link to="/register" className="link transition text-[14px] md:text-[15px] font-[500]">
                    Register
                  </Link>
                </li>
              ) : (
                <>
                  <Button
                    className="!text-[#000] myAccountWrap flex items-center gap-3 cursor-pointer"
                    onClick={handleClick}>
                    <span className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-[#f1f1f1] flex items-center justify-center overflow-hidden">
                      {user?.avatar ? (
                        <img src={user.avatar} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <FaRegUser className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                      )}
                    </span>
                    <div className="info hidden lg:flex flex-col">
                      <h4 className="leading-3 text-[14px] font-[500] text-[rgba(0,0,0,0.6)] mb-0 capitalize text-left justify-start">
                        {user?.name}
                      </h4>
                      <span className="text-[13px] text-[rgba(0,0,0,0.6)] font-[400] text-left justify-start">
                        {user?.email}
                      </span>
                    </div>
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    slotProps={{
                      paper: {
                        elevation: 0,
                        sx: {
                          overflow: "visible",
                          mt: 1.5,
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
                    <Link to="/my-account">
                      <MenuItem onClick={handleClose} className="flex gap-3 !py-2">
                        <FaRegUser className="text-[18px]" /> <span className="text-[14px]"> my account</span>
                      </MenuItem>
                    </Link>
                    <Link to="/my-orders">
                      <MenuItem onClick={handleClose} className="flex gap-3 !py-2">
                        <IoBagCheckOutline className="text-[18px]" /> <span className="text-[14px]"> orders</span>
                      </MenuItem>
                    </Link>
                    <Link to="/my-list">
                      <MenuItem onClick={handleClose} className="flex gap-3 !py-2">
                        <IoMdHeartEmpty className="text-[18px]" /> <span className="text-[14px]"> my list</span>
                      </MenuItem>
                    </Link>
                    <MenuItem onClick={handleLogout} className="flex gap-3 !py-2">
                      <IoIosLogOut className="text-[18px]" />
                      <span className="text-[14px]"> log out</span>
                    </MenuItem>
                  </Menu>
                </>
              )}

              <li className="list-none">
                <Tooltip title="Wishlist">
                  <Link to="/my-list">
                    <IconButton aria-label="wishlist">
                      <StyledBadge badgeContent={contest.wishlist.length} color="secondary" showZero={false}>
                        <FaRegHeart />
                      </StyledBadge>
                    </IconButton>
                  </Link>
                </Tooltip>
              </li>

              <li className="list-none">
                <Tooltip title="Cart">
                  <IconButton
                    aria-label="cart"
                    onClick={() =>
                      contest.isLogin ? contest.setOpenCartPanel(true) : navigate("/login")
                    }>
                    <StyledBadge badgeContent={contest.cart.count} color="secondary" showZero={false}>
                      <MdOutlineShoppingCart />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Navigation />
    </header>
  );
};

export default Header;
