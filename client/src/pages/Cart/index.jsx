import { Button } from "@mui/material";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsFillBagCheckFill } from "react-icons/bs";
import CartItems from "./cartItems";
import { MyContest } from "../../App";
import { formatPrice } from "../../utils";

const CartPage = () => {
  const { cart } = useContext(MyContest);
  const navigate = useNavigate();
  const blocked = cart.items.some((i) => i.productId.countInStock < i.quantity);

  if (!cart.items.length) {
    return (
      <section className="section py-16 text-center">
        <h2 className="text-[20px] font-[600] mb-2">Your cart is empty</h2>
        <Link to="/ProductListing">
          <Button className="btn-org">Continue shopping</Button>
        </Link>
      </section>
    );
  }

  return (
    <section className="section py-10 pb-10">
      <div className="container flex flex-col lg:flex-row gap-5">
        <div className="leftPart w-full lg:w-[70%]">
          <div className="shadow-md rounded-md bg-white">
            <div className="py-2 px-3 border-b border-[rgba(0,0,0,0.1)]">
              <h2>Your Cart</h2>
              <p className="mt-0">
                There {cart.count === 1 ? "is" : "are"}{" "}
                <span className="font-bold text-primary">{cart.count}</span>{" "}
                {cart.count === 1 ? "product" : "products"} in your cart
              </p>
            </div>
            {cart.items.map((item) => (
              <CartItems key={item._id} item={item} />
            ))}
          </div>
        </div>

        <div className="rightPart w-full lg:w-[30%]">
          <div className="shadow-md rounded-md bg-white p-5">
            <h3 className="pb-3">Cart total</h3>
            <hr />
            <p className="flex items-center justify-between mt-3">
              <span className="text-[14px] font-[500]">Subtotal</span>
              <span className="text-primary font-bold">{formatPrice(cart.subTotal)}</span>
            </p>
            <p className="flex items-center justify-between">
              <span className="text-[14px] font-[500]">Shipping</span>
              <span className="font-bold">Calculated at checkout</span>
            </p>
            <br />
            {blocked && (
              <p className="text-red-600 text-[13px]">Some items exceed the available stock. Lower the quantity.</p>
            )}
            <Button
              className="btn-org btn-lg w-full flex gap-2"
              disabled={blocked}
              onClick={() => navigate("/checkout")}>
              <BsFillBagCheckFill className="text-[20px]" /> Checkout
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
