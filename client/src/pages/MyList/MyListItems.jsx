import { Button, Rating } from "@mui/material";
import React, { useContext } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { MyContest } from "../../App";
import { discountPercent, formatPrice, productImage } from "../../utils";

const MyListItems = ({ product }) => {
  const { toggleWishlist, addToCart } = useContext(MyContest);
  const off = discountPercent(product);
  const outOfStock = product.countInStock < 1;

  return (
    <div className="cartItem w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)]">
      <div className="img w-[25%] sm:w-[15%] rounded-md overflow-hidden">
        <Link to={`/product/${product._id}`} className="group">
          <img src={productImage(product)} alt={product.name} className="w-full group-hover:scale-105 transition-all" />
        </Link>
      </div>

      <div className="info w-[75%] sm:w-[85%] relative pr-6">
        <IoCloseSharp
          aria-label="remove"
          className="cursor-pointer absolute top-0 right-0 link text-[22px]"
          onClick={() => toggleWishlist(product._id)}
        />
        {product.brand && <span className="text-[13px]">{product.brand}</span>}
        <h3 className="text-[15px]">
          <Link className="link" to={`/product/${product._id}`}>{product.name}</Link>
        </h3>
        <Rating size="small" value={product.rating || 0} readOnly />

        <div className="flex items-center gap-4 mt-2 mb-2 flex-wrap">
          <span className="price text-black text-[14px] font-[600]">{formatPrice(product.price)}</span>
          {product.oldPrice > product.price && (
            <span className="oldPrice line-through text-gray-500 text-[14px] font-[500]">
              {formatPrice(product.oldPrice)}
            </span>
          )}
          {off > 0 && <span className="price text-red-500 text-[14px] font-[600]">{off}% off</span>}
        </div>

        <Button className="btn-org btn-sm" disabled={outOfStock} onClick={() => addToCart(product._id, 1)}>
          {outOfStock ? "Out of stock" : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
};

export default MyListItems;
