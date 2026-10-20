import { CheckBox } from "@mui/icons-material";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import React, { useContext  } from "react";
import { AiOutlineYahoo, AiOutlineYoutube } from "react-icons/ai";
import { BiSupport } from "react-icons/bi";
import { BsWallet2 } from "react-icons/bs";
import { FaFacebookF, FaInstagram, FaPinterest } from "react-icons/fa";

import { IoChatboxOutline, IoCloseSharp } from "react-icons/io5";
import { LiaGiftSolid, LiaShippingFastSolid } from "react-icons/lia";
import { PiKeyReturnLight } from "react-icons/pi";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer"
// import CartPanel from "./CartPanel";
import { MyContest } from "../../App";
import CartPanel from "../CartPanel";
// import "/src/index.css"
const Footer = () => {

  // const [openCartPanel,setOpenCartPanel]=useState(false);
  const contest =useContext(MyContest);


  return (
    <>
      <footer className="py-6 bg-[#fafafa] borde borde-[rgba(0,0,0,0.1)]">
        <div className="container">
          <div className="flex items-center justify-center gap-5 py-8 pb-8">
            <div className="col flex items-center justify-center flex-col group w-[15%]">
              <LiaShippingFastSolid className="text-[40px] transition-all duration-300 group-hover:-translate-y-1 group-hover:text-red-500" />
              <h3 className="text-[16px] font-[600]  ">free shipping</h3>
              <p className="text-[12px] font-[500]">for All orders over $100</p>
            </div>
            <div className="col flex items-center justify-center flex-col group w-[15%]">
              <PiKeyReturnLight className="text-[40px] transition-all duration-300 group-hover:-translate-y-1 group-hover:text-red-500" />
              <h3 className="text-[16px] font-[600]  ">30 days return </h3>
              <p className="text-[12px] font-[500]">for an Exchange product</p>
            </div>
            <div className="col flex items-center justify-center flex-col group w-[15%]">
              <BsWallet2 className="text-[40px] transition-all duration-300 group-hover:-translate-y-1 group-hover:text-red-500" />
              <h3 className="text-[16px] font-[600]  ">secured Payment</h3>
              <p className="text-[12px] font-[500]"> payment cards accepted</p>
            </div>
            <div className="col flex items-center justify-center flex-col group w-[15%]">
              <LiaGiftSolid className="text-[40px] transition-all duration-300 group-hover:-translate-y-1 group-hover:text-red-500" />
              <h3 className="text-[16px] font-[600]  ">Special gift</h3>
              <p className="text-[12px] font-[500]">our first Product Order</p>
            </div>
            <div className="col flex items-center justify-center flex-col group w-[15%]">
              <BiSupport className="text-[40px] transition-all duration-300 group-hover:-translate-y-1 group-hover:text-red-500" />
              <h3 className="text-[16px] font-[600]  ">Support 24/7</h3>
              <p className="text-[12px] font-[500]">Contact Us any time</p>
            </div>
          </div>
          <br />
          <hr />

          <div className="footer flex   py-8">
            <div className="part1 w-[25%] border-r border-[rgba(0,0,0,0.1)]">
              <h2 className="text-[20px] font-[600] mb-4">Contact Us</h2>
              <p className="text-[13px] font-[600] pb-4">
                Classyshop - Mega Super Store <br />
                507-union Trade centre France
              </p>
              <Link
                to="mailto:someone@eaxample.com"
                className="link text-[13px]"
              >
                sales@yourcompany.com
              </Link>

              <span className="text-[22px] font-[600] block w-full mt-3 mb-5 text-red-500">
                {" "}
                (+251)-900880099
              </span>
              <div className="flex items-center gap-2 ">
                <IoChatboxOutline className="text-[40px] text-red-500" />
                <span className="text-[16px] font-[600] ">
                  online Chat <br />
                  Get expert help
                </span>
              </div>
            </div>
            <div className="part2 w-[40%] flex  pl-8 ">
              <div className="part2_col1 w-[50%]">
                <h2 className="text-[18px] font-[600] mb-4">Products</h2>
                <ul className="list">
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link to="/" className="link">
                      Prices drop
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link to="/" className="link">
                      New products
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link to="/" className="link">
                      best sales
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link to="/" className="link">
                      Contact us
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link to="/" className="link">
                      site map
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link to="/" className="link">
                      stores
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="part2_col2 w-[50%]">
                <h2 className="text-[18px] font-[600] mb-4">Our company</h2>
                <ul className="list">
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link to="/" className="link">
                      delivery
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link to="/" className="link">
                      legal notice
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link to="/" className="link">
                      terms and conditions of use
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link to="/" className="link">
                      About us
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link to="/" className="link">
                      secure payment
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link to="/" className="link">
                      login
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="part2 w-[35%] flex  pl-8 ">
              <div className="part2_col1 w-[50%]">
                <h2 className="text-[18px] font-[600] mb-4">Products</h2>
                <ul className="list">
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link to="/" className="link">
                      Prices drop
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link to="/" className="link">
                      New products
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link to="/" className="link">
                      best sales
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link to="/" className="link">
                      Contact us
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link to="/" className="link">
                      site map
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link to="/" className="link">
                      stores
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="part2_col2 w-[50%]">
                <h2 className="text-[18px] font-[600] mb-4">Our company</h2>
                <ul className="list">
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link to="/" className="link">
                      delivery
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link to="/" className="link">
                      legal notice
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link to="/" className="link">
                      terms and conditions of use
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link to="/" className="link">
                      About us
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link to="/" className="link">
                      secure payment
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link to="/" className="link">
                      login
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="part2 w-[35%] flex  pl-8 flex-col pr-8">
              <h2 className="text-[18px] font-[600] mb-4">
                Subscribe to news letter
              </h2>
              <p className="text-[13px]">
                Subscribe to our latest newsletter to get news about special
                discount.
              </p>
              <form className="mt-5 ">
                <input
                  type="text"
                  className="w-full h-[45px] border outline-none pl-4 pr-4 rounded-sm mb-4 focus:border-[rgba(0,0,0,0.3)]"
                  placeholder="your email address"
                />
                <Button className="btn-org">SUBSCRIBE</Button>
                <br />
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="I agree to the terms and conditions and the privacy policy"
                />
              </form>
            </div>
          </div>
        </div>
      </footer>

      <div className="bottomStrip border-t border-[rgba(0,0,0,0.1)] py-1 bg-white ">
        <div className="container flex items-center  justify-between  ">
          <ul className="flex items-center gap-2">
            <li className="list-none">
              <Link
                to="/"
                target="_blank"
                className="w-[35px] h-[35px] rounded-full transition-all duration-100 border group hover:bg-primary border-[rgba(0,0,0,0.1)] flex items-center justify-center"
              >
                <FaFacebookF className="text-[20px]  group-hover:text-white" />
              </Link>
            </li>
            <li className="list-none">
              <Link
                to="/"
                target="_blank"
                className="w-[35px] h-[35px] rounded-full transition-all duration-100 border group hover:bg-primary border-[rgba(0,0,0,0.1)] flex items-center justify-center"
              >
                <AiOutlineYoutube className="text-[20px]  group-hover:text-white" />
              </Link>
            </li>{" "}
            <li className="list-none">
              <Link
                to="/"
                target="_blank"
                className="w-[35px] h-[35px] rounded-full transition-all duration-100 border group hover:bg-primary border-[rgba(0,0,0,0.1)] flex items-center justify-center"
              >
                <FaPinterest className="text-[20px]  group-hover:text-white" />
              </Link>
            </li>{" "}
            <li className="list-none">
              <Link
                to="/"
                target="_blank"
                className="w-[35px] h-[35px] rounded-full transition-all duration-100 border group hover:bg-primary border-[rgba(0,0,0,0.1)] flex items-center justify-center"
              >
                <FaInstagram className="text-[20px]  group-hover:text-white" />
              </Link>
            </li>
          </ul>
          <p className="text-[15px] text-center mb-0">
            &copy; 2025 Ecommerce software Company
          </p>
          <div className="flex items-center gap-1  ">
            <img src="payment/m2.png" width={"60px"} alt="" className="" />
            <img src="payment/me2.png" width={"50px"} alt="" className="" />
            <img src="payment/p2.png" width={"69px"}  alt="" className="" />
            <img src="payment/v2.png" width={"59px"} alt="" className=" " />
          </div>
        </div>
      </div>



      {/* {cart panel } */}

<Drawer open={contest.openCartPanel} onClose={contest.toggleCartPanel(false)} 
anchor="right"
className="cartPanel overflow-hidden"
>
 <div className="flex items-center justify-between py-3 px-4 gap-3 
 border-b border-[rgba(0,0,0,0.1)] overflow-hidden">
<h3>shopping cart(3)</h3>
<IoCloseSharp className="text-[20px] cursor-pointer" onClick={contest.toggleCartPanel(false)}/>
 </div>



<CartPanel />


</Drawer>


    </>
  );
};

export default Footer;
