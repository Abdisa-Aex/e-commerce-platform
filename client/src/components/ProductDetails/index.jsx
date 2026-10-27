import React, { useContext, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Button, Rating } from "@mui/material";
import QtyBox from "../QtyBox";
import { MyContest } from "../../App";
import { formatPrice } from "../../utils";

const ProductDetialsComponent = ({ product, onDone }) => {
  const context = useContext(MyContest);
  const [size, setSize] = useState(null);
  const [qty, setQty] = useState(1);

  if (!product) return null;
  const outOfStock = product.countInStock < 1;
  const liked = context.inWishlist(product._id);
  const brand = product.brand;

  const add = async () => {
    if (product.sizes?.length && !size) {
      context.openAlertBox("error", "Please select a size");
      return;
    }
    const ok = await context.addToCart(product._id, qty);
    if (ok && onDone) onDone();
  };

  return (
    <>
      <h1 className="text-[22px] md:text-[24px] font-[600] mb-2">{product.name}</h1>
      <div className="flex items-center gap-3 flex-wrap">
        {brand && (
          <span className="text-gray-400 text-[13px]">
            Brand : <span className="font-[500] text-black opacity-75">{brand}</span>
          </span>
        )}
        <Rating name="size-small" value={product.rating || 0} size="small" readOnly />
      </div>
      <div className="flex items-center gap-4 mt-4 flex-wrap">
        {product.oldPrice > product.price && (
          <span className="oldPrice line-through text-gray-500 text-[18px] font-[500]">
            {formatPrice(product.oldPrice)}
          </span>
        )}
        <span className="price text-primary text-[20px] font-[600]">{formatPrice(product.price)}</span>
        <span className="text-[14px]">
          Availability :{" "}
          {outOfStock ? (
            <span className="text-red-600 text-[14px] font-bold">Out of stock</span>
          ) : (
            <span className="text-green-600 text-[14px] font-bold">{product.countInStock} in stock</span>
          )}
        </span>
      </div>

      <p className="mt-4 md:pr-10 mb-5 line-clamp-5">{product.description}</p>

      {product.sizes?.length > 0 && (
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-[14px]">Size :</span>
          <div className="flex items-center gap-1 actions flex-wrap">
            {product.sizes.map((s) => (
              <Button
                key={s}
                className={size === s ? "!bg-primary !text-white" : ""}
                onClick={() => setSize(s)}>
                {s}
              </Button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-4 py-4 mt-2">
        <div className="qtyBoxWrapper w-[90px]">
          <QtyBox value={qty} onChange={setQty} max={Math.max(1, product.countInStock)} />
        </div>
        <Button className="btn-org flex gap-2" disabled={outOfStock} onClick={add}>
          <MdOutlineShoppingCart className="text-[22px]" /> {outOfStock ? "Out of stock" : "Add to Cart"}
        </Button>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <span
          className="flex items-center gap-2 link cursor-pointer text-[15px] font-[500]"
          onClick={() => context.toggleWishlist(product._id)}>
          {liked ? <FaHeart className="text-[18px] text-primary" /> : <FaRegHeart className="text-[18px]" />}
          {liked ? "In your wish list" : "Add To wish list"}
        </span>
      </div>
    </>
  );
};

export default ProductDetialsComponent;
