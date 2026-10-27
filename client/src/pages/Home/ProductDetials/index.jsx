import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Breadcrumbs, CircularProgress } from "@mui/material";
import ProductZoom from "../../../components/ProductZoom";
import ProductsSlider from "../../../components/productsSlider";
import ProductDetialsComponent from "../../../components/ProductDetails";
import api from "../../../api";

const ProductDetials = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [state, setState] = useState("loading"); // loading | ok | notfound | error
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    let alive = true;
    setState("loading");
    setActiveTab(0);
    api
      .get(`/products/${id}`)
      .then(async (d) => {
        if (!alive) return;
        setProduct(d.product);
        setState("ok");
        if (d.product.category?._id) {
          const r = await api.get(`/products?category=${d.product.category._id}&limit=12`).catch(() => null);
          if (alive && r) setRelated(r.products.filter((p) => p._id !== d.product._id));
        }
      })
      .catch((e) => alive && setState(e.status === 404 || e.status === 400 ? "notfound" : "error"));
    return () => {
      alive = false;
    };
  }, [id]);

  if (state === "loading") {
    return (
      <div className="flex justify-center py-24">
        <CircularProgress />
      </div>
    );
  }
  if (state !== "ok") {
    return (
      <div className="container py-24 text-center">
        <h2 className="text-[20px] font-[600] mb-2">
          {state === "notfound" ? "Product not found" : "Could not load this product"}
        </h2>
        <Link to="/ProductListing" className="link">Back to products</Link>
      </div>
    );
  }

  const tabClass = (n) => `link text-[17px] cursor-pointer font-[500] ${activeTab === n ? "text-primary" : ""}`;

  return (
    <>
      <div className="py-5">
        <div className="container">
          <Breadcrumbs aria-label="breadcrumb">
            <Link to="/" className="link transition !text-[14px]">Home</Link>
            {product.category && (
              <Link to={`/ProductListing?category=${product.category._id}`} className="link transition !text-[14px]">
                {product.category.name}
              </Link>
            )}
            {product.subCategory && (
              <Link
                to={`/ProductListing?category=${product.category?._id}&subCategory=${product.subCategory._id}`}
                className="link transition !text-[14px]">
                {product.subCategory.name}
              </Link>
            )}
          </Breadcrumbs>
        </div>
      </div>

      <section className="bg-white py-5">
        <div className="container flex flex-col md:flex-row gap-8">
          <div className="productZoomContainer w-full md:w-[40%]">
            <ProductZoom images={product.images} />
          </div>
          <div className="productContent w-full md:w-[60%] md:pr-10 md:pl-10">
            <ProductDetialsComponent product={product} />
          </div>
        </div>

        <div className="container py-8">
          <div className="flex items-center gap-5 mb-4">
            <span className={tabClass(0)} onClick={() => setActiveTab(0)}>Description</span>
            <span className={tabClass(1)} onClick={() => setActiveTab(1)}>Product Details</span>
          </div>

          {activeTab === 0 && (
            <div className="shadow-md w-full px-4 md:px-8 py-5 rounded-md">
              <p className="whitespace-pre-line">{product.description || "No description yet."}</p>
            </div>
          )}

          {activeTab === 1 && (
            <div className="shadow-md w-full px-4 md:px-8 py-5 rounded-md">
              <table className="w-full text-sm text-left text-gray-600">
                <tbody>
                  {product.brand && (
                    <tr className="border-b"><th className="py-3 pr-4 w-[160px]">Brand</th><td>{product.brand}</td></tr>
                  )}
                  {product.category && (
                    <tr className="border-b"><th className="py-3 pr-4">Category</th><td>{product.category.name}</td></tr>
                  )}
                  {product.subCategory && (
                    <tr className="border-b"><th className="py-3 pr-4">Sub category</th><td>{product.subCategory.name}</td></tr>
                  )}
                  {product.sizes?.length > 0 && (
                    <tr className="border-b"><th className="py-3 pr-4">Sizes</th><td>{product.sizes.join(", ")}</td></tr>
                  )}
                  <tr><th className="py-3 pr-4">In stock</th><td>{product.countInStock}</td></tr>
                </tbody>
              </table>
            </div>
          )}

          {related.length > 0 && (
            <>
              <h2 className="text-[20px] font-[600] mt-10">Related Products</h2>
              <ProductsSlider products={related} items={5} />
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default ProductDetials;
