import Button from "@mui/material/Button";
import React, { useContext, useState } from "react";
import { FaRegSquarePlus } from "react-icons/fa6";
import { FiMinusSquare } from "react-icons/fi";
import { Link } from "react-router-dom";
import { MyContest } from "../../App";

const CategoryCollapse = ({ onNavigate }) => {
  const { categories } = useContext(MyContest);
  const [openId, setOpenId] = useState(null);

  if (!categories.length) {
    return <p className="px-3 text-[14px]">No categories yet.</p>;
  }

  return (
    <div className="scroll">
      <ul className="w-full">
        {categories.map((cat) => (
          <li className="list-none flex items-center relative flex-col" key={cat._id}>
            <Link
              to={`/ProductListing?category=${cat._id}`}
              className="w-full"
              onClick={onNavigate}>
              <Button className="w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">
                {cat.name}
              </Button>
            </Link>

            {cat.children?.length > 0 &&
              (openId === cat._id ? (
                <FiMinusSquare
                  className="absolute top-[10px] right-[15px] cursor-pointer"
                  onClick={() => setOpenId(null)}
                />
              ) : (
                <FaRegSquarePlus
                  className="absolute top-[10px] right-[15px] cursor-pointer"
                  onClick={() => setOpenId(cat._id)}
                />
              ))}

            {openId === cat._id && cat.children?.length > 0 && (
              <ul className="submenu w-full pl-3">
                {cat.children.map((sub) => (
                  <li className="list-none relative mb-1" key={sub._id}>
                    <Link
                      to={`/ProductListing?category=${cat._id}&subCategory=${sub._id}`}
                      className="w-full"
                      onClick={onNavigate}>
                      <Button className="w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">
                        {sub.name}
                      </Button>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryCollapse;
