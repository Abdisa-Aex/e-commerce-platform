import { Button } from "@mui/material";
import React, { useContext } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { MyContest } from "../../App";
import { formatPrice, productImage } from "../../utils";

const CartPanel = ({ onNavigate }) => {
  const { cart, removeCartItem } = useContext(MyContest);

  if (!cart.items.length) {
    return (
      <div className="p-6 text-center">
        <p>Your cart is empty.</p>
        <Link to="/ProductListing" onClick={onNavigate}>
          <Button className="btn-org">Start shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col" style={{ height: "calc(100% - 56px)" }}>
      <div className="scroll w-full flex-1 overflow-y-auto overflow-x-hidden py-3 px-4">
        {cart.items.map((item) => (
          <div
            key={item._id}
            className="cartItem w-full flex items-center gap-4 border-b border-[rgba(0,0,0,0.1)] pb-4 mb-3">
            <div className="img w-[25%] overflow-hidden h-[90px] rounded-md">
              <Link to={`/product/${item.productId._id}`} className="block group" onClick={onNavigate}>
                <img src={productImage(item.productId)} alt="" className="w-full h-[90px] object-cover group-hover:scale-105" />
              </Link>
            </div>
            <div className="info w-[75%] pr-5 relative">
              <h4 className="text-[14px] font-[500] line-clamp-2">
                <Link to={`/product/${item.productId._id}`} className="link transition-all" onClick={onNavigate}>
                  {item.productId.name}
                </Link>
              </h4>
              <p className="flex items-center gap-4 mt-1 mb-0">
                <span>Qty : {item.quantity}</span>
                <span className="text-primary font-bold">{formatPrice(item.productId.price * item.quantity)}</span>
              </p>
              <MdOutlineDeleteOutline
                aria-label="remove"
                className="absolute top-[0px] right-[0px] cursor-pointer text-[20px] link transition-all"
                onClick={() => removeCartItem(item._id)}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="bottomSec w-full border-t border-[rgba(0,0,0,0.1)] p-4 bg-white">
        <div className="flex items-center justify-between w-full mb-3">
          <span className="text-[14px] font-[600]">Subtotal ({cart.count} items)</span>
          <span className="text-primary font-bold">{formatPrice(cart.subTotal)}</span>
        </div>
        <div className="flex items-center justify-between w-full gap-4">
          <Link to="/cart" className="w-[50%]" onClick={onNavigate}>
            <Button className="btn-org btn-lg w-full">View cart</Button>
          </Link>
          <Link to="/checkout" className="w-[50%]" onClick={onNavigate}>
            <Button className="btn-org btn-border btn-lg w-full">Checkout</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPanel;
