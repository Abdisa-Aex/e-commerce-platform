import React, { useContext, useEffect, useState } from "react";
import { Tabs, Tab, CircularProgress } from "@mui/material";
import { LiaShippingFastSolid } from "react-icons/lia";
import HomeSlider from "../../components/HomeSlider";
import HomeCatSlider from "../../components/HomeCatSlider";
import ProductsSlider from "../../components/productsSlider";
import { MyContest } from "../../App";
import api from "../../api";

const Home = () => {
  const { categories } = useContext(MyContest);
  const [slides, setSlides] = useState([]);
  const [latest, setLatest] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState(0); // 0 = all, n = categories[n-1]
  const [tabLoading, setTabLoading] = useState(false);

  useEffect(() => {
    let alive = true;
    Promise.allSettled([
      api.get("/slides"),
      api.get("/products?sort=newest&limit=12"),
      api.get("/products?featured=true&limit=12"),
    ]).then(([s, l, f]) => {
      if (!alive) return;
      if (s.status === "fulfilled") setSlides(s.value.slides);
      if (l.status === "fulfilled") setLatest(l.value.products);
      if (f.status === "fulfilled") setFeatured(f.value.products);
      setLoading(false);
    });
    return () => {
      alive = false;
    };
  }, []);

  // Popular products, filtered by the selected category tab
  useEffect(() => {
    let alive = true;
    setTabLoading(true);
    const cat = tab > 0 ? `&category=${categories[tab - 1]?._id}` : "";
    api
      .get(`/products?sort=popular&limit=12${cat}`)
      .then((d) => alive && setPopular(d.products))
      .catch(() => alive && setPopular([]))
      .finally(() => alive && setTabLoading(false));
    return () => {
      alive = false;
    };
  }, [tab, categories]);

  return (
    <>
      <HomeSlider slides={slides} />
      <HomeCatSlider categories={categories} />

      <section className="bg-white py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="leftsec">
              <h2 className="text-[20px] font-[600]">Popular Products</h2>
              <p className="text-[14px] font-[400] mb-0">Our customers' favourites</p>
            </div>
            <div className="rightSec w-full md:w-[60%]">
              <Tabs
                value={tab}
                onChange={(e, v) => setTab(v)}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="category tabs">
                <Tab label="All" />
                {categories.map((c) => (
                  <Tab key={c._id} label={c.name} />
                ))}
              </Tabs>
            </div>
          </div>
          {tabLoading || loading ? (
            <div className="flex justify-center py-10">
              <CircularProgress />
            </div>
          ) : (
            <ProductsSlider products={popular} items={5} />
          )}
        </div>
      </section>

      <section className="py-4 pt-2 bg-white">
        <div className="container">
          <div className="freeShipping w-full md:w-[80%] m-auto py-4 p-4 border-2 border-[#ff5252] flex flex-col md:flex-row items-center justify-between gap-2 rounded-md mb-7">
            <div className="col1 flex items-center gap-4">
              <LiaShippingFastSolid className="text-[50px]" />
              <span className="text-[20px] font-[600] uppercase">fast delivery</span>
            </div>
            <p className="mb-0 font-[500] text-center">
              Order today and pay cash on delivery, or pay online
            </p>
          </div>
        </div>
      </section>

      {latest.length > 0 && (
        <section className="py-5 bg-white pt-0">
          <div className="container">
            <h2 className="text-[20px] font-[600]">Latest Products</h2>
            <ProductsSlider products={latest} items={5} />
          </div>
        </section>
      )}

      {featured.length > 0 && (
        <section className="py-5 pb-8 bg-white pt-0">
          <div className="container">
            <h2 className="text-[20px] font-[600]">Featured Products</h2>
            <ProductsSlider products={featured} items={5} />
          </div>
        </section>
      )}

      {!loading && !latest.length && (
        <section className="py-16 bg-white text-center">
          <h2 className="text-[20px] font-[600]">The store is being stocked</h2>
          <p>No products have been added yet. Please check back soon.</p>
        </section>
      )}
    </>
  );
};

export default Home;
