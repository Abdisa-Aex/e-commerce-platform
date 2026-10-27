import { Link } from "react-router-dom";
import "../productItem/style.css";

import { Button, Rating, Tooltip } from "@mui/material";
import { MdZoomOutMap, MdOutlineShoppingCart } from "react-icons/md";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useContext } from "react";
import { MyContest } from "../../App";
import { discountPercent, formatPrice, productImage } from "../../utils";

const ProductItem = ({ product }) => {
  const context = useContext(MyContest);
  if (!product) return null;

  const liked = context.inWishlist(product._id);
  const off = discountPercent(product);
  const outOfStock = product.countInStock < 1;
  const hasSecond = product.images?.length > 1;

  return (
    <div className="productItem shadow-lg rounded-md overflow-hidden border-1 border-[rgba(0,0,0,0.1)] bg-white h-full flex flex-col">
      <div className="group imgWrapper w-[100%] rounded-md overflow-hidden relative">
        <Link to={`/product/${product._id}`}>
          <div className="img h-[200px] sm:h-[220px] overflow-hidden">
            <img
              src={productImage(product, 0)}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            {hasSecond && (
              <img
                src={productImage(product, 1)}
                alt=""
                loading="lazy"
                className="transition-all duration-700 w-full h-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100"
              />
            )}
          </div>
        </Link>
        {off > 0 && (
          <span className="discount flex items-center absolute top-[10px] left-[10px] z-50 bg-primary text-white rounded-lg p-1 text-[12px] font-[500]">
            {off}%
          </span>
        )}
        {outOfStock && (
          <span className="absolute bottom-[10px] left-[10px] z-50 bg-black text-white rounded-lg px-2 py-1 text-[12px] font-[500]">
            Out of stock
          </span>
        )}
        <div className="actions absolute top-[-200px] right-[5px] z-50 flex items-center gap-2 flex-col w-[50px] transition-all duration-300 group-hover:top-[15px] opacity-0 group-hover:opacity-100">
          <Tooltip title="Quick view" placement="left-start">
            <Button
              className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white hover:!bg-primary hover:text-white text-black group"
              onClick={() => context.openQuickView(product)}>
              <MdZoomOutMap className="text-[18px] !text-black group-hover:text-white hover:!text-white" />
            </Button>
          </Tooltip>
          <Tooltip title={liked ? "Remove from wishlist" : "Add to wishlist"} placement="left-start">
            <Button
              className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white hover:!bg-primary hover:text-white text-black group"
              onClick={() => context.toggleWishlist(product._id)}>
              {liked ? (
                <FaHeart className="text-[18px] !text-primary group-hover:!text-white" />
              ) : (
                <FaRegHeart className="text-[18px] !text-black group-hover:text-white hover:!text-white" />
              )}
            </Button>
          </Tooltip>
        </div>
      </div>

      <div className="info p-3 py-4 flex flex-col flex-1">
        {product.brand && (
          <h6 className="text-[13px] mb-0 text-gray-500">{product.brand}</h6>
        )}
        <h3 className="text-[13px] title mt-1 mb-1 font-[500] text-[#000]">
          <Link to={`/product/${product._id}`} className="link transition-all line-clamp-2">
            {product.name}
          </Link>
        </h3>
        <Rating name="size-small" value={product.rating || 0} size="small" readOnly />
        <div className="flex items-center gap-3 flex-wrap">
          {product.oldPrice > product.price && (
            <span className="oldPrice line-through text-gray-500 text-[14px] font-[500]">
              {formatPrice(product.oldPrice)}
            </span>
          )}
          <span className="price text-red-500 text-[15px] font-[600]">{formatPrice(product.price)}</span>
        </div>
        <Button
          className="btn-org !mt-3 flex gap-2 !w-full !mt-auto"
          disabled={outOfStock}
          onClick={() => context.addToCart(product._id, 1)}>
          <MdOutlineShoppingCart className="text-[18px]" /> Add to cart
        </Button>
      </div>
    </div>
  );
};

export default ProductItem;
