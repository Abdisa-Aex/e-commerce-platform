import { Link } from "react-router-dom";
import "../productItem/style.css";

import { Button, Rating, Tooltip } from "@mui/material";
import { MdOutlineShoppingCart, MdZoomOutMap } from "react-icons/md";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useContext } from "react";
import { MyContest } from "../../App";
import { discountPercent, formatPrice, productImage } from "../../utils";

const ProductItemListView = ({ product }) => {
  const context = useContext(MyContest);
  if (!product) return null;
  const liked = context.inWishlist(product._id);
  const off = discountPercent(product);
  const outOfStock = product.countInStock < 1;

  return (
    <div className="productItem shadow-lg rounded-md overflow-hidden border-1 border-[rgba(0,0,0,0.1)] flex flex-col sm:flex-row items-center bg-white">
      <div className="group imgWrapper w-full sm:w-[25%] rounded-md overflow-hidden relative">
        <Link to={`/product/${product._id}`}>
          <div className="img h-[220px] overflow-hidden">
            <img src={productImage(product, 0)} alt={product.name} loading="lazy" className="w-full h-full object-cover" />
          </div>
        </Link>
        {off > 0 && (
          <span className="discount flex items-center absolute top-[10px] left-[10px] z-50 bg-primary text-white rounded-lg p-1 text-[12px] font-[500]">
            {off}%
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
          <Button
            className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white hover:!bg-primary hover:text-white text-black group"
            onClick={() => context.toggleWishlist(product._id)}>
            {liked ? (
              <FaHeart className="text-[18px] !text-primary group-hover:!text-white" />
            ) : (
              <FaRegHeart className="text-[18px] !text-black group-hover:text-white hover:!text-white" />
            )}
          </Button>
        </div>
      </div>

      <div className="info p-3 py-5 px-4 sm:px-8 w-full sm:w-[75%]">
        {product.brand && <h6 className="text-[15px] text-left">{product.brand}</h6>}
        <h3 className="text-[18px] title mt-2 mb-3 font-[500] text-[#000]">
          <Link to={`/product/${product._id}`} className="link transition-all">
            {product.name}
          </Link>
        </h3>
        <p className="text-[14px] mb-3 line-clamp-3">{product.description}</p>
        <Rating name="size-small" value={product.rating || 0} size="small" readOnly />

        <div className="flex items-center gap-4">
          {product.oldPrice > product.price && (
            <span className="oldPrice line-through text-gray-500 text-[15px] font-[500]">
              {formatPrice(product.oldPrice)}
            </span>
          )}
          <span className="price text-red-500 text-[15px] font-[600]">{formatPrice(product.price)}</span>
        </div>
        <div className="mt-3">
          <Button
            className="btn-org flex gap-2"
            disabled={outOfStock}
            onClick={() => context.addToCart(product._id, 1)}>
            <MdOutlineShoppingCart className="text-[20px]" /> {outOfStock ? "Out of stock" : "Add to cart"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductItemListView;
