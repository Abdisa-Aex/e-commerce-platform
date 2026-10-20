// import React from "react";
import Sidebar from "../../../components/SideBar";
import {
  Breadcrumbs,
  Button,
  Link,
  Pagination,
  Typography,
} from "@mui/material";
import ProductItem from "../../../components/productItem";

import { IoGridSharp } from "react-icons/io5";
import { LuMenu } from "react-icons/lu";
import * as React from "react";
// import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ProductItemListView from "../../../components/productItemListView";
const ProductListing = () => {
  const [itemView, setItemView] = React.useState("grid");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <section className="py-5 pb-0">
      <div className="container">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/" className="link">
            Home
          </Link>
          <Link underline="hover" color="inherit" href="/" className="link">
            Fashion
          </Link>
        </Breadcrumbs>
      </div>
      <div className="p-2 bg-white mt-4">
        <div className="container flex gap-3">
          <div className="sidebarWrapper w-[20%]  h-full bg-white  ">
            <Sidebar />
          </div>

          <div className="rightContent w-[80%] py-3">
            <div className="bg-[#f1f1f1] p-2 w-full mb-4 flex items-center justify-between rounded-sm">
              <div className="col1 flex items-center  itemViewAction">
                <Button
                  className={`!rounded-full !w-[40px] !h-[40px] !min-w-[40px] !text-[#000] ${
                    itemView === "list" && "active"
                  }`}
                  onClick={() => setItemView("list")}
                >
                  <LuMenu className="text-[rgba(0,0,0,0.7)]" />
                </Button>
                <Button
                  className={`!rounded-full !w-[40px] !h-[40px] !min-w-[40px] !text-[#000] ${
                    itemView === "grid" && "active"
                  }`}
                  onClick={() => setItemView("grid")}
                >
                  <IoGridSharp className="text-[rgba(0,0,0,0.7)]" />
                </Button>
                <span className="text-[14px] font-[500] pl-3 text-[rgba(0,0,0,0.7)]">
                  There aer 27 product
                </span>
              </div>

              <div className="col2 ml-auto flex items-center justify-end gap-3 pr-4">
                <span className="text-[14px] font-[500] pl-3 text-[rgba(0,0,0,0.7)]">
                  sort by
                </span>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  className="!bg-white !text-[12px] !text-[#000] !capitalize !border-2 !border-[#000]"
                >
                  sales,lowest to highest
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  slotProps={{
                    list: {
                      "aria-labelledby": "basic-button",
                    },
                  }}
                >
                  <MenuItem
                    onClick={handleClose}
                    className="!bg-white !text-[12px] !text-[#000] !capitalize !border-2 !border-[#000]"
                  >
                    sales,highest to lowest
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    className="!bg-white !text-[12px] !text-[#000] !capitalize !border-2 !border-[#000]"
                  >
                    Relevance
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    className="!bg-white !text-[12px] !text-[#000] !capitalize !border-2 !border-[#000]"
                  >
                    Name, A to Z
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    className="!bg-white !text-[12px] !text-[#000] !capitalize !border-2 !border-[#000]"
                  >
                    Name, Z to A{" "}
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    className="!bg-white !text-[12px] !text-[#000] !capitalize !border-2 !border-[#000]"
                  >
                    price,low to high{" "}
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    className="!bg-white !text-[12px] !text-[#000] !capitalize !border-2 !border-[#000]"
                  >
                    price,high to low
                  </MenuItem>
                </Menu>
              </div>
            </div>

            <div
              className={`grid ${
                itemView === "grid"
                  ? "grid-cols-4 md:grid-cols-4 "
                  : "grid-cols-1 md:grid-cols-1"
              } gap-4`}
            >
              {itemView === "grid" ? (
                <>
                  <ProductItem />
                  <ProductItem />
                  <ProductItem />
                  <ProductItem />
                  <ProductItem />
                  <ProductItem />
                  <ProductItem />
                  <ProductItem />
                </>
              ) : (
                <>
                  <ProductItemListView />
                  <ProductItemListView />
                  <ProductItemListView />
                  <ProductItemListView />
                  <ProductItemListView />
                  <ProductItemListView />
                  <ProductItemListView />
                </>
              )}
            </div>
            <div className="flex items-center justify-center mt-10">
              <Pagination count={10} showFirstButton showLastButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductListing;
