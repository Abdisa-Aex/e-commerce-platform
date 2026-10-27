import Button from "@mui/material/Button";
import React, { useContext, useState } from "react";
import { GoRocket } from "react-icons/go";
import { LiaAngleDoubleDownSolid } from "react-icons/lia";
import { RiMenu2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import CatergoryPanel from "./CatergoryPanel";
import "./style.css";
import { MyContest } from "../../../App";

const linkBtn =
  "link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !py-4";

const Navigation = () => {
  const [isOpenCatPanel, setIsOpenCatPanel] = useState(false);
  const { categories } = useContext(MyContest);

  return (
    <div>
      <nav>
        <div className="container flex items-center justify-end gap-8">
          <div className="col_1 w-full md:w-[20%]">
            <Button
              className="!text-black gap-2 w-full"
              onClick={() => setIsOpenCatPanel(true)}>
              <RiMenu2Fill className="text-[18px]" />
              Shop By Categories
              <LiaAngleDoubleDownSolid className="text-[13px] ml-auto font-bold" />
            </Button>
          </div>

          <div className="col_2 w-[60%] hidden md:block">
            <ul className="flex items-center gap-3 nav flex-wrap">
              <li className="list-none">
                <Link to="/" className="link transition text-[14px] font-[500]">
                  <Button className={linkBtn}>Home</Button>
                </Link>
              </li>

              {categories.map((cat) => (
                <li className="list-none relative" key={cat._id}>
                  <Link
                    to={`/ProductListing?category=${cat._id}`}
                    className="link transition text-[14px] font-[500]">
                    <Button className={linkBtn}>{cat.name}</Button>
                  </Link>

                  {cat.children?.length > 0 && (
                    <div className="submenu absolute top-[120%] left-[0%] min-w-[150px] bg-white shadow-md opacity-0 transition-all z-50">
                      <ul>
                        {cat.children.map((sub) => (
                          <li className="list-none w-full" key={sub._id}>
                            <Link to={`/ProductListing?category=${cat._id}&subCategory=${sub._id}`} className="w-full">
                              <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                                {sub.name}
                              </Button>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="col_3 w-[20%] hidden lg:block">
            <p className="text-[13px] font-[500] flex items-center gap-3 mt-0 mb-0">
              <GoRocket className="text-[18px]" />
              Fast delivery
            </p>
          </div>
        </div>
      </nav>

      <CatergoryPanel setIsOpenCatPanel={setIsOpenCatPanel} isOpenCatPanel={isOpenCatPanel} />
    </div>
  );
};

export default Navigation;
