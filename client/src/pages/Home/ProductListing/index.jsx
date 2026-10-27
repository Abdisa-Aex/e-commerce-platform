import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Breadcrumbs, Button, CircularProgress, Pagination, Drawer } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IoGridSharp } from "react-icons/io5";
import { LuMenu } from "react-icons/lu";
import { FiFilter } from "react-icons/fi";
import Sidebar from "../../../components/SideBar";
import ProductItem from "../../../components/productItem";
import ProductItemListView from "../../../components/productItemListView";
import { MyContest } from "../../../App";
import api from "../../../api";

const SORTS = [
  { value: "newest", label: "Newest" },
  { value: "popular", label: "Best selling" },
  { value: "name-asc", label: "Name, A to Z" },
  { value: "name-desc", label: "Name, Z to A" },
  { value: "price-asc", label: "Price, low to high" },
  { value: "price-desc", label: "Price, high to low" },
];

const LIMIT = 12;

const ProductListing = () => {
  const { categories } = useContext(MyContest);
  const [params, setParams] = useSearchParams();
  const [itemView, setItemView] = useState("grid");
  const [anchorEl, setAnchorEl] = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [data, setData] = useState({ products: [], total: 0, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const sort = params.get("sort") || "newest";
  const page = Number(params.get("page")) || 1;
  const search = params.get("search") || "";
  const query = params.toString();

  // merge changes into the URL; null removes a key; filters reset the page
  const update = useCallback(
    (changes, keepPage = false) => {
      const next = new URLSearchParams(params);
      Object.entries(changes).forEach(([k, v]) => {
        if (v === null || v === undefined || v === "") next.delete(k);
        else next.set(k, v);
      });
      if (!keepPage) next.delete("page");
      setParams(next);
    },
    [params, setParams]
  );

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError("");
    const q = new URLSearchParams(query);
    q.set("limit", LIMIT);
    api
      .get(`/products?${q.toString()}`)
      .then((d) => alive && setData(d))
      .catch((e) => alive && setError(e.message))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [query]);

  const cat = categories.find((c) => c._id === params.get("category"));
  const sub = cat?.children?.find((s) => s._id === params.get("subCategory"));

  return (
    <section className="py-5 pb-0">
      <div className="container">
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/" className="link">Home</Link>
          {cat && <Link to={`/ProductListing?category=${cat._id}`} className="link">{cat.name}</Link>}
          {sub && <span>{sub.name}</span>}
          {search && <span>Search: "{search}"</span>}
        </Breadcrumbs>
      </div>

      <div className="p-2 bg-white mt-4">
        <div className="container flex gap-3">
          <div className="sidebarWrapper w-[20%] h-full bg-white hidden md:block">
            <Sidebar params={params} onChange={update} />
          </div>

          <Drawer open={filtersOpen} onClose={() => setFiltersOpen(false)}>
            <div className="w-[280px] p-4">
              <Sidebar params={params} onChange={(c) => { update(c); setFiltersOpen(false); }} />
            </div>
          </Drawer>

          <div className="rightContent w-full md:w-[80%] py-3">
            <div className="bg-[#f1f1f1] p-2 w-full mb-4 flex flex-wrap gap-2 items-center justify-between rounded-sm">
              <div className="col1 flex items-center itemViewAction">
                <Button className="md:!hidden !text-[#000] !mr-1" onClick={() => setFiltersOpen(true)}>
                  <FiFilter className="mr-1" /> Filters
                </Button>
                <Button
                  className={`!rounded-full !w-[40px] !h-[40px] !min-w-[40px] !text-[#000] ${itemView === "list" && "active"}`}
                  onClick={() => setItemView("list")}>
                  <LuMenu className="text-[rgba(0,0,0,0.7)]" />
                </Button>
                <Button
                  className={`!rounded-full !w-[40px] !h-[40px] !min-w-[40px] !text-[#000] ${itemView === "grid" && "active"}`}
                  onClick={() => setItemView("grid")}>
                  <IoGridSharp className="text-[rgba(0,0,0,0.7)]" />
                </Button>
                <span className="text-[14px] font-[500] pl-3 text-[rgba(0,0,0,0.7)]">
                  {data.total} product{data.total === 1 ? "" : "s"}
                </span>
              </div>

              <div className="col2 ml-auto flex items-center justify-end gap-3 pr-2">
                <span className="text-[14px] font-[500] text-[rgba(0,0,0,0.7)] hidden sm:inline">Sort by</span>
                <Button
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  className="!bg-white !text-[12px] !text-[#000] !capitalize !border-2 !border-[#000]">
                  {SORTS.find((s) => s.value === sort)?.label}
                </Button>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                  {SORTS.map((s) => (
                    <MenuItem
                      key={s.value}
                      selected={s.value === sort}
                      className="!text-[13px]"
                      onClick={() => {
                        setAnchorEl(null);
                        update({ sort: s.value });
                      }}>
                      {s.label}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <CircularProgress />
              </div>
            ) : error ? (
              <p className="text-center py-16 text-red-600">{error}</p>
            ) : data.products.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-[18px] font-[600]">No products found</h3>
                <p>Try changing or clearing your filters.</p>
                <Button className="btn-org" onClick={() => setParams(new URLSearchParams())}>Clear filters</Button>
              </div>
            ) : (
              <div
                className={`grid gap-4 ${
                  itemView === "grid" ? "grid-cols-2 md:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
                }`}>
                {data.products.map((p) =>
                  itemView === "grid" ? (
                    <ProductItem key={p._id} product={p} />
                  ) : (
                    <ProductItemListView key={p._id} product={p} />
                  )
                )}
              </div>
            )}

            {data.pages > 1 && (
              <div className="flex items-center justify-center mt-10 pb-6">
                <Pagination
                  count={data.pages}
                  page={page}
                  onChange={(e, v) => update({ page: v }, true)}
                  showFirstButton
                  showLastButton
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductListing;
