import { Menu, MenuItem } from "@mui/material";
import React, { useContext, useState } from "react";
import { GoTriangleDown } from "react-icons/go";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { MyContest } from "../../App";
import { discountPercent, formatPrice, productImage } from "../../utils";

const CartItems = ({ item }) => {
  const { updateCartItem, removeCartItem } = useContext(MyContest);
  const [anchorEl, setAnchorEl] = useState(null);
  const p = item.productId;
  const maxQty = Math.max(1, Math.min(10, p.countInStock));
  const off = discountPercent(p);

  return (
    <div className="cartItem w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)]">
      <div className="img w-[25%] sm:w-[15%] rounded-md overflow-hidden">
        <Link to={`/product/${p._id}`} className="group">
          <img src={productImage(p)} alt={p.name} className="w-full group-hover:scale-105 transition-all" />
        </Link>
      </div>

      <div className="info w-[75%] sm:w-[85%] relative pr-6">
        <IoCloseSharp
          aria-label="remove"
          className="cursor-pointer absolute top-0 right-0 link text-[22px]"
          onClick={() => removeCartItem(item._id)}
        />
        {p.brand && <span className="text-[13px]">{p.brand}</span>}
        <h3 className="text-[15px]">
          <Link className="link" to={`/product/${p._id}`}>
            {p.name}
          </Link>
        </h3>

        <div className="flex items-center gap-4 mt-2">
          <span
            className="flex items-center justify-center bg-[#f1f1f1f1] text-[11px] font-[600] py-1 px-2 rounded-md cursor-pointer"
            onClick={(e) => setAnchorEl(e.currentTarget)}>
            Qty : {item.quantity} <GoTriangleDown />
          </span>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
            {Array.from({ length: maxQty }, (_, i) => i + 1).map((n) => (
              <MenuItem
                key={n}
                selected={n === item.quantity}
                onClick={() => {
                  setAnchorEl(null);
                  if (n !== item.quantity) updateCartItem(item._id, n);
                }}>
                {n}
              </MenuItem>
            ))}
          </Menu>
          {p.countInStock < item.quantity && (
            <span className="text-red-600 text-[12px]">Only {p.countInStock} left</span>
          )}
        </div>

        <div className="flex items-center gap-4 mt-2 flex-wrap">
          <span className="price text-black text-[14px] font-[600]">{formatPrice(p.price * item.quantity)}</span>
          {p.oldPrice > p.price && (
            <span className="oldPrice line-through text-gray-500 text-[14px] font-[500]">
              {formatPrice(p.oldPrice * item.quantity)}
            </span>
          )}
          {off > 0 && <span className="price text-red-500 text-[14px] font-[600]">{off}% off</span>}
        </div>
      </div>
    </div>
  );
};

export default CartItems;
