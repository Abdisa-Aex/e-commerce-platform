import React, { useContext } from "react";
import { BiSupport } from "react-icons/bi";
import { BsWallet2 } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { LiaShippingFastSolid } from "react-icons/lia";
import { PiKeyReturnLight } from "react-icons/pi";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import { MyContest } from "../../App";
import CartPanel from "../CartPanel";

// Set these in client/.env (see .env.example). Nothing is shown if left empty.
const STORE_NAME = import.meta.env.VITE_STORE_NAME || "Spices Gold";
const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || "";
const CONTACT_PHONE = import.meta.env.VITE_CONTACT_PHONE || "";
const CONTACT_ADDRESS = import.meta.env.VITE_CONTACT_ADDRESS || "";

const features = [
  { Icon: LiaShippingFastSolid, title: "Fast delivery", text: "Straight to your door" },
  { Icon: PiKeyReturnLight, title: "Easy returns", text: "Contact us about any problem" },
  { Icon: BsWallet2, title: "Flexible payment", text: "Cash on delivery or online" },
  { Icon: BiSupport, title: "Support", text: "We're here to help" },
];

const Footer = () => {
  const contest = useContext(MyContest);
  const { cart, categories } = contest;

  return (
    <>
      <footer className="py-6 bg-[#fafafa] border-t border-[rgba(0,0,0,0.1)]">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 py-8 pb-8">
            {features.map(({ Icon, title, text }) => (
              <div key={title} className="col flex items-center justify-center flex-col group text-center">
                <Icon className="text-[40px] transition-all duration-300 group-hover:-translate-y-1 group-hover:text-red-500" />
                <h3 className="text-[16px] font-[600]">{title}</h3>
                <p className="text-[12px] font-[500]">{text}</p>
              </div>
            ))}
          </div>
          <hr />

          <div className="footer grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
            <div>
              <h2 className="text-[20px] font-[600] mb-4">Contact Us</h2>
              {CONTACT_ADDRESS && <p>{CONTACT_ADDRESS}</p>}
              {CONTACT_EMAIL && (
                <p>
                  <a className="link" href={`mailto:${CONTACT_EMAIL}`}>
                    {CONTACT_EMAIL}
                  </a>
                </p>
              )}
              {CONTACT_PHONE && (
                <p>
                  <a className="link text-primary font-[600]" href={`tel:${CONTACT_PHONE}`}>
                    {CONTACT_PHONE}
                  </a>
                </p>
              )}
              {!CONTACT_ADDRESS && !CONTACT_EMAIL && !CONTACT_PHONE && <p>{STORE_NAME}</p>}
            </div>

            <div>
              <h2 className="text-[18px] font-[600] mb-4">Shop</h2>
              <ul className="list-none">
                {categories.slice(0, 8).map((c) => (
                  <li key={c._id} className="mb-2">
                    <Link to={`/ProductListing?category=${c._id}`} className="link">
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-[18px] font-[600] mb-4">My account</h2>
              <ul className="list-none">
                <li className="mb-2"><Link to="/my-account" className="link">My profile</Link></li>
                <li className="mb-2"><Link to="/my-orders" className="link">My orders</Link></li>
                <li className="mb-2"><Link to="/my-list" className="link">My list</Link></li>
                <li className="mb-2"><Link to="/cart" className="link">Cart</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      <div className="bottomStrip border-t border-[rgba(0,0,0,0.1)] py-3 bg-white">
        <div className="container">
          <p className="text-[13px] text-center mb-0">
            &copy; {new Date().getFullYear()} {STORE_NAME}. All rights reserved.
          </p>
        </div>
      </div>

      {/* cart panel */}
      <Drawer
        open={contest.openCartPanel}
        onClose={contest.toggleCartPanel(false)}
        anchor="right"
        className="cartPanel overflow-hidden">
        <div className="w-[320px] sm:w-[400px] max-w-[100vw] h-full relative">
          <div className="flex items-center justify-between py-3 px-4 gap-3 border-b border-[rgba(0,0,0,0.1)] overflow-hidden">
            <h3>Shopping cart ({cart.count})</h3>
            <IoCloseSharp className="text-[20px] cursor-pointer" onClick={contest.toggleCartPanel(false)} />
          </div>
          <CartPanel onNavigate={contest.toggleCartPanel(false)} />
        </div>
      </Drawer>
    </>
  );
};

export default Footer;
