import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineEdit } from "react-icons/ai";
import { GoTrash } from "react-icons/go";
import { MyContest } from "../../App";
import api from "../../api";
import { formatPrice, NO_IMAGE } from "../../utils";

const Products = () => {
  const { openAlertBox } = useContext(MyContest);
  const [data, setData] = useState({ products: [], total: 0, pages: 1 });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const q = new URLSearchParams({ page, limit: 10, sort: "newest" });
      if (query) q.set("search", query);
      setData(await api.get(`/products?${q}`));
    } catch (e) {
      openAlertBox("error", e.message);
    } finally {
      setLoading(false);
    }
  }, [page, query, openAlertBox]);

  useEffect(() => {
    load();
  }, [load]);

  const remove = async (p) => {
    if (!window.confirm(`Delete "${p.name}"? This cannot be undone.`)) return;
    try {
      await api.del(`/products/${p._id}`);
      openAlertBox("success", "Product deleted");
      load();
    } catch (e) {
      openAlertBox("error", e.message);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-md">
      <div className="p-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-[18px] font-[600]">Products</h2>
          <p className="mb-0 text-[13px]">{data.total} total</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setPage(1);
              setQuery(search.trim());
            }}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="border border-[rgba(0,0,0,0.2)] rounded-md h-[40px] px-3 text-[14px] focus:outline-none"
            />
          </form>
          <Link to="/products/new">
            <Button className="btn-blue btn-sm flex gap-1">
              <IoMdAdd className="text-[18px]" /> Add product
            </Button>
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><CircularProgress /></div>
      ) : (
        <div className="overflow-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-xs uppercase bg-gray-50">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Sold</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((p) => (
                <tr key={p._id} className="border-b">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3 min-w-[220px]">
                      <img src={p.images?.[0] || NO_IMAGE} alt="" className="w-[55px] h-[55px] object-cover rounded-md" />
                      <div>
                        <h3 className="text-[14px] font-[600] leading-5 line-clamp-2">{p.name}</h3>
                        <span className="text-[12px]">{p.brand}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {p.category?.name || "-"}
                    {p.subCategory ? ` / ${p.subCategory.name}` : ""}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {p.oldPrice > p.price && <span className="line-through mr-2 text-gray-400">{formatPrice(p.oldPrice)}</span>}
                    <b className="text-[#3872fa]">{formatPrice(p.price)}</b>
                  </td>
                  <td className={`px-4 py-3 ${p.countInStock < 1 ? "text-red-600 font-bold" : ""}`}>{p.countInStock}</td>
                  <td className="px-4 py-3">{p.sales}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link to={`/products/${p._id}/edit`}>
                        <Button aria-label="edit" className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]">
                          <AiOutlineEdit className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                        </Button>
                      </Link>
                      <Button
                        aria-label="delete"
                        onClick={() => remove(p)}
                        className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]">
                        <GoTrash className="text-[18px] text-[rgba(0,0,0,0.7)]" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {data.products.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-10 text-center">No products found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {data.pages > 1 && (
        <div className="flex justify-center py-5">
          <Pagination count={data.pages} page={page} onChange={(e, v) => setPage(v)} />
        </div>
      )}
    </div>
  );
};

export default Products;
